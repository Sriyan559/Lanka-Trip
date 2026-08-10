<?php

namespace Tests\Feature;

use App\Jobs\RunCatalogueQualityValidation;
use App\Models\CatalogueDuplicateCandidate;
use App\Models\CatalogueQualityIssue;
use App\Models\CatalogueQualityValidationRun;
use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use App\Services\Admin\CatalogueQualityRuleService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Queue;
use Illuminate\Support\Str;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class CatalogueQualityApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_dashboard_is_authenticated_database_driven_filtered_sorted_and_paginated(): void
    {
        $this->getJson('/api/admin/catalogue/quality')->assertUnauthorized();
        Sanctum::actingAs($user = User::factory()->create(['role' => 'super_admin']));
        $product = Product::factory()->create(['name' => 'Searchable Serum', 'sku' => 'SEARCH-1']);
        $this->issue($product, ['issue_type' => 'publication_blocker', 'severity' => 'critical', 'title' => 'Searchable blocker']);
        $this->issue($product, ['fingerprint' => hash('sha256', 'second'), 'issue_type' => 'incomplete_record', 'severity' => 'low', 'title' => 'Another issue']);

        $this->getJson('/api/admin/catalogue/quality?search=Searchable&severity=critical&pageSize=1&sort=severity&direction=asc')
            ->assertOk()->assertJsonPath('data.issues.total', 1)->assertJsonPath('data.issues.data.0.entityName', 'Searchable Serum')
            ->assertJsonPath('data.kpis.2.value', 1)->assertJsonPath('data.capabilities.tenantIsolation', false)
            ->assertJsonPath('data.meta.refreshIntervalSeconds', 30);
    }

    public function test_validation_is_queued_and_real_rules_deduplicate_then_auto_resolve(): void
    {
        Queue::fake();
        Sanctum::actingAs($user = User::factory()->create(['role' => 'super_admin']));
        $product = Product::factory()->create(['sku' => null, 'description' => null, 'supplier_id' => null, 'featured_image' => null, 'approval_status' => 'blocked']);
        $response = $this->postJson('/api/admin/catalogue/quality/validate', ['scope' => 'catalogue'])->assertAccepted();
        Queue::assertPushed(RunCatalogueQualityValidation::class);
        $run = CatalogueQualityValidationRun::where('uuid', $response->json('data.id'))->firstOrFail();
        app(CatalogueQualityRuleService::class)->execute($run);
        $this->assertDatabaseHas('catalogue_quality_validation_runs', ['id' => $run->id, 'status' => 'completed', 'products_scanned' => 1]);
        $this->assertDatabaseHas('catalogue_quality_issues', ['product_id' => $product->id, 'rule_key' => 'required_description', 'status' => 'new']);
        $count = CatalogueQualityIssue::count();
        $second = CatalogueQualityValidationRun::create(['uuid' => (string) Str::uuid(), 'requested_by' => $user->id, 'scope' => 'catalogue', 'status' => 'queued']);
        app(CatalogueQualityRuleService::class)->execute($second);
        $this->assertSame($count, CatalogueQualityIssue::count());
        $product->update(['description' => 'Complete description']);
        $third = CatalogueQualityValidationRun::create(['uuid' => (string) Str::uuid(), 'requested_by' => $user->id, 'scope' => 'catalogue', 'status' => 'queued']);
        app(CatalogueQualityRuleService::class)->execute($third);
        $this->assertDatabaseHas('catalogue_quality_issues', ['product_id' => $product->id, 'rule_key' => 'required_description', 'status' => 'resolved']);
    }

    public function test_case_creation_notes_transition_concurrency_bulk_saved_view_and_audit(): void
    {
        Sanctum::actingAs($user = User::factory()->create(['role' => 'super_admin']));
        $product = Product::factory()->create();
        $created = $this->postJson('/api/admin/catalogue/quality/cases', ['product_id' => $product->id, 'title' => 'Manual review', 'issue_type' => 'manual_quality_case', 'severity' => 'high', 'description' => 'Review required'])->assertCreated();
        $uuid = $created->json('data.id');
        $this->postJson("/api/admin/catalogue/quality/issues/$uuid/notes", ['note' => 'Auditable note'])->assertCreated();
        $this->patchJson("/api/admin/catalogue/quality/issues/$uuid", ['status' => 'in_review', 'lock_version' => 0])->assertOk()->assertJsonPath('data.status', 'In Review');
        $this->patchJson("/api/admin/catalogue/quality/issues/$uuid", ['status' => 'resolved', 'lock_version' => 0])->assertUnprocessable();
        $this->postJson('/api/admin/catalogue/quality/bulk', ['ids' => [$uuid], 'action' => 'resolve', 'reason' => 'Bulk reviewed'])->assertOk()->assertJsonPath('data.updated', 1);
        $this->postJson('/api/admin/catalogue/quality/saved-views', ['name' => 'Resolved cases', 'filters' => ['status' => 'resolved']])->assertCreated();
        $this->assertDatabaseHas('catalogue_quality_issue_notes', ['note' => 'Auditable note']);
        $this->assertDatabaseHas('catalogue_quality_issues', ['uuid' => $uuid, 'status' => 'resolved']);
        $this->assertDatabaseHas('activity_log', ['log_name' => 'catalogue_quality', 'description' => 'catalogue.quality_case_created']);
    }

    public function test_duplicate_merge_is_transactional_resolves_issue_and_archives_source(): void
    {
        Sanctum::actingAs($user = User::factory()->create(['role' => 'super_admin']));
        $category = Category::factory()->create();
        $target = Product::factory()->create(['category_id' => $category->id, 'name' => 'Duplicate Serum A']);
        $source = Product::factory()->create(['category_id' => $category->id, 'name' => 'Duplicate Serum B']);
        DB::table('product_images')->insert(['product_id' => $source->id, 'image' => 'source.jpg', 'sort_order' => 0, 'created_at' => now(), 'updated_at' => now()]);
        $candidate = CatalogueDuplicateCandidate::create(['uuid' => (string) Str::uuid(), 'fingerprint' => hash('sha256', 'candidate'), 'product_a_id' => $target->id, 'product_b_id' => $source->id, 'signal' => 'normalized_name', 'confidence_score' => 95, 'status' => 'open']);
        $issue = $this->issue($source, ['duplicate_candidate_id' => $candidate->id, 'issue_type' => 'duplicate_candidate']);
        $this->postJson("/api/admin/catalogue/quality/duplicates/{$candidate->uuid}/resolve", ['action' => 'merge', 'surviving_product_id' => $target->id, 'reason' => 'Confirmed same Product Master'])->assertOk()->assertJsonPath('data.status', 'merged');
        $this->assertSoftDeleted('products', ['id' => $source->id]);
        $this->assertDatabaseHas('product_images', ['product_id' => $target->id, 'image' => 'source.jpg']);
        $this->assertDatabaseHas('catalogue_quality_issues', ['id' => $issue->id, 'status' => 'resolved']);
        $this->postJson("/api/admin/catalogue/quality/duplicates/{$candidate->uuid}/resolve", ['action' => 'merge', 'surviving_product_id' => $target->id])->assertConflict();
    }

    public function test_report_is_authorized_filtered_and_spreadsheet_safe(): void
    {
        Sanctum::actingAs(User::factory()->create(['role' => 'super_admin']));
        $product = Product::factory()->create(['name' => '=FORMULA Product']);
        $this->issue($product, ['severity' => 'high']);
        $response = $this->get('/api/admin/catalogue/quality/report?severity=high')->assertOk()->assertHeader('x-content-type-options', 'nosniff');
        $this->assertStringContainsString("'=FORMULA Product", $response->streamedContent());
    }

    private function issue(Product $product, array $overrides = []): CatalogueQualityIssue
    {
        return CatalogueQualityIssue::create($overrides + ['uuid' => (string) Str::uuid(), 'fingerprint' => hash('sha256', fake()->uuid()), 'product_id' => $product->id, 'source' => 'manual', 'issue_type' => 'incomplete_record', 'title' => 'Quality issue', 'severity' => 'medium', 'status' => 'new']);
    }
}
