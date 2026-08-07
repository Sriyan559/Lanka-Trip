<?php

namespace Tests\Feature;

use App\Models\Supplier;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class MarketplacePolicyViolationsApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_policy_cases_require_authentication_and_admin_permission(): void
    {
        $this->getJson('/api/admin/marketplace/policy-violations')->assertUnauthorized();
        Sanctum::actingAs(User::factory()->create(['role' => 'buyer']));
        $this->getJson('/api/admin/marketplace/policy-violations')->assertForbidden();
    }

    public function test_policy_cases_reconcile_real_rows_and_do_not_expose_restricted_content(): void
    {
        Sanctum::actingAs($admin = User::factory()->create(['role' => 'super_admin', 'name' => 'Admin Reviewer']));
        $supplier = Supplier::factory()->create();
        $ruleId = DB::table('compliance_rules')->insertGetId([
            'uuid' => (string) Str::uuid(), 'rule_key' => 'AUTH-001', 'name' => 'Authenticity Rule',
            'rule_type' => 'authenticity', 'severity' => 'high', 'status' => 'active',
            'rules' => json_encode(['restricted' => true]), 'metadata' => json_encode(['secret' => 'rule secret']),
            'created_at' => now(), 'updated_at' => now(),
        ]);
        $caseId = DB::table('compliance_case_files')->insertGetId([
            'uuid' => (string) Str::uuid(), 'subject_type' => Supplier::class, 'subject_id' => $supplier->id,
            'compliance_rule_id' => $ruleId, 'assigned_to' => $admin->id, 'case_number' => '=POL-DB-001',
            'case_type' => 'counterfeit_claim', 'status' => 'open', 'compliance_status' => 'pending',
            'metadata' => json_encode(['secret' => 'case secret']), 'created_at' => now(), 'updated_at' => now(),
        ]);
        DB::table('compliance_case_notes')->insert([
            'compliance_case_file_id' => $caseId, 'user_id' => $admin->id, 'note' => 'restricted note body',
            'is_internal' => true, 'metadata' => json_encode(['secret' => 'note secret']), 'created_at' => now(), 'updated_at' => now(),
        ]);

        $response = $this->getJson('/api/admin/marketplace/policy-violations?search=counterfeit&severity=high&perPage=10');
        $response->assertOk()->assertJsonPath('data.meta.total', 1)
            ->assertJsonPath('data.items.0.id', (string) $caseId)
            ->assertJsonPath('data.items.0.caseCode', '=POL-DB-001')
            ->assertJsonPath('data.items.0.policy.name', 'Authenticity Rule')
            ->assertJsonPath('data.items.0.severity', 'high')
            ->assertJsonPath('data.items.0.source.type', 'Supplier')
            ->assertJsonPath('data.items.0.assignedReviewer.name', 'Admin Reviewer')
            ->assertJsonPath('data.items.0.noteCount', 1)
            ->assertJsonPath('data.permissions.canUpdate', false)
            ->assertJsonPath('data.evidence.available', false);
        $this->assertSame(1, collect($response->json('data.kpis'))->firstWhere('id', 'total')['value']);
        $this->assertSame(1, collect($response->json('data.kpis'))->firstWhere('id', 'open')['value']);
        $this->assertStringNotContainsString('restricted note body', $response->getContent());
        $this->assertStringNotContainsString('case secret', $response->getContent());
        $this->assertStringNotContainsString('rule secret', $response->getContent());

        $detail = $this->getJson('/api/admin/marketplace/policy-violations/'.$caseId);
        $detail->assertOk()->assertJsonPath('data.case.caseCode', '=POL-DB-001')
            ->assertJsonPath('data.case.noteCount', 1)->assertJsonPath('data.enforcement.available', false);
        $this->assertStringNotContainsString('restricted note body', $detail->getContent());
    }

    public function test_policy_case_filters_are_validated_and_export_is_formula_safe(): void
    {
        Sanctum::actingAs(User::factory()->create(['role' => 'super_admin']));
        DB::table('compliance_case_files')->insert([
            'uuid' => (string) Str::uuid(), 'case_number' => '=POL-EXPORT', 'case_type' => 'listing',
            'status' => 'open', 'compliance_status' => 'pending', 'created_at' => now(), 'updated_at' => now(),
        ]);
        $this->getJson('/api/admin/marketplace/policy-violations?perPage=13')->assertUnprocessable();
        $response = $this->get('/api/admin/marketplace/policy-violations/export');
        $response->assertOk()->assertHeader('content-type', 'text/csv; charset=UTF-8');
        $this->assertStringContainsString("'=POL-EXPORT", $response->streamedContent());
    }
}
