<?php

namespace Tests\Feature;

use App\Jobs\ProcessCatalogueDataJob;
use App\Models\CatalogueDataJob;
use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Queue;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class CatalogueDataOperationsApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_dashboard_is_authenticated_database_driven_filtered_and_paginated(): void
    {
        $this->getJson('/api/admin/catalogue/import-export')->assertUnauthorized();
        Sanctum::actingAs($user = User::factory()->create(['role' => 'super_admin']));
        CatalogueDataJob::create($this->job($user, ['operation_type' => 'import', 'status' => 'completed', 'original_name' => 'products.csv']));
        CatalogueDataJob::create($this->job($user, ['operation_type' => 'export', 'status' => 'failed', 'original_name' => 'export.csv', 'idempotency_key' => 'export-key']));

        $this->getJson('/api/admin/catalogue/import-export?operationType=import&search=products&pageSize=1')
            ->assertOk()->assertJsonPath('data.jobs.total', 1)->assertJsonPath('data.jobs.data.0.fileName', 'products.csv')
            ->assertJsonPath('data.kpis.0.value', 1)->assertJsonPath('data.capabilities.tenantIsolation', false)
            ->assertJsonPath('data.meta.refreshIntervalSeconds', 30);
    }

    public function test_import_creation_is_secure_idempotent_queued_and_processes_valid_product_csv(): void
    {
        Storage::fake('local');
        Queue::fake();
        Sanctum::actingAs($user = User::factory()->create(['role' => 'super_admin']));
        $category = Category::factory()->create();
        $csv = "sku,name,category_id,price,unit\nTEST-001,Test Serum,{$category->id},19.95,unit\n";
        $file = UploadedFile::fake()->createWithContent('products.csv', $csv);
        $response = $this->withHeader('Idempotency-Key', 'stable-import-key')->post('/api/admin/catalogue/import-export/imports', ['file' => $file, 'data_type' => 'products'])->assertAccepted();
        $uuid = $response->json('data.id');
        $this->withHeader('Idempotency-Key', 'stable-import-key')->post('/api/admin/catalogue/import-export/imports', ['file' => UploadedFile::fake()->createWithContent('products.csv', $csv), 'data_type' => 'products'])->assertAccepted()->assertJsonPath('data.id', $uuid);
        $this->assertDatabaseCount('catalogue_data_jobs', 1);
        Queue::assertPushed(ProcessCatalogueDataJob::class);

        (new ProcessCatalogueDataJob(CatalogueDataJob::where('uuid', $uuid)->value('id')))->handle();
        $this->assertDatabaseHas('products', ['sku' => 'TEST-001', 'name' => 'Test Serum']);
        $this->assertDatabaseHas('catalogue_data_jobs', ['uuid' => $uuid, 'status' => 'completed', 'successful_records' => 1, 'progress' => 100]);
        $this->assertDatabaseHas('activity_log', ['log_name' => 'catalogue_data_operations', 'description' => 'catalogue.import_completed']);
    }

    public function test_invalid_schema_records_row_error_and_changes_no_products(): void
    {
        Storage::fake('local');
        Queue::fake();
        Sanctum::actingAs(User::factory()->create(['role' => 'super_admin']));
        $response = $this->post('/api/admin/catalogue/import-export/imports', ['file' => UploadedFile::fake()->createWithContent('invalid.csv', "name,price\nBroken,2\n"), 'data_type' => 'products'])->assertAccepted();
        $job = CatalogueDataJob::where('uuid', $response->json('data.id'))->firstOrFail();
        (new ProcessCatalogueDataJob($job->id))->handle();
        $this->assertSame('failed', $job->refresh()->status);
        $this->assertSame('failed', $job->validation_status);
        $this->assertDatabaseHas('catalogue_data_job_errors', ['catalogue_data_job_id' => $job->id, 'error_code' => 'invalid_headers']);
        $this->assertDatabaseMissing('products', ['name' => 'Broken']);
    }

    public function test_export_is_queued_generated_privately_and_authorized_for_download(): void
    {
        Storage::fake('local');
        Queue::fake();
        Sanctum::actingAs($user = User::factory()->create(['role' => 'super_admin']));
        Product::factory()->create(['sku' => '=FORMULA']);
        $response = $this->postJson('/api/admin/catalogue/import-export/exports', ['data_type' => 'products'])->assertAccepted();
        $job = CatalogueDataJob::where('uuid', $response->json('data.id'))->firstOrFail();
        (new ProcessCatalogueDataJob($job->id))->handle();
        $job->refresh();
        Storage::disk('local')->assertExists($job->output_path);
        $this->assertStringContainsString("'=FORMULA", Storage::disk('local')->get($job->output_path));
        $this->get("/api/admin/catalogue/import-export/jobs/{$job->uuid}/download")->assertOk()->assertHeader('x-content-type-options', 'nosniff');
    }

    public function test_cancel_retry_bulk_and_schedule_use_real_state_transitions(): void
    {
        Queue::fake();
        Sanctum::actingAs($user = User::factory()->create(['role' => 'super_admin']));
        $job = CatalogueDataJob::create($this->job($user));
        $this->postJson("/api/admin/catalogue/import-export/jobs/{$job->uuid}/cancel")->assertOk()->assertJsonPath('data.executionStatus', 'Cancelled');
        $this->postJson("/api/admin/catalogue/import-export/jobs/{$job->uuid}/retry")->assertAccepted()->assertJsonPath('data.executionStatus', 'Queued');
        $this->postJson('/api/admin/catalogue/import-export/bulk', ['ids' => [$job->uuid], 'action' => 'cancel'])->assertOk()->assertJsonPath('data.updated', 1);
        $this->postJson('/api/admin/catalogue/import-export/schedules', ['name' => 'Daily catalogue', 'data_type' => 'products', 'frequency' => 'daily', 'timezone' => 'Asia/Colombo', 'format' => 'csv'])->assertCreated();
        $this->assertDatabaseHas('catalogue_export_schedules', ['name' => 'Daily catalogue', 'enabled' => true]);
    }

    private function job(User $user, array $overrides = []): array
    {
        return $overrides + ['uuid' => fake()->uuid(), 'user_id' => $user->id, 'operation_type' => 'import', 'data_type' => 'products', 'status' => 'queued', 'validation_status' => 'pending', 'approval_status' => 'not_required', 'idempotency_key' => 'key-'.fake()->uuid(), 'current_stage' => 'queued'];
    }
}
