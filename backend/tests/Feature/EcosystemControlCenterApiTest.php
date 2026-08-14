<?php

namespace Tests\Feature;

use App\Models\EcosystemModule;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class EcosystemControlCenterApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_empty_dashboards_use_unknown_states_and_no_fabricated_scores(): void
    {
        Sanctum::actingAs(User::factory()->create(['role' => 'super_admin']));
        $this->getJson('/api/admin/ecosystem/integrations/dashboard')->assertOk()
            ->assertJsonPath('data.summary.registered', 0)->assertJsonPath('data.health.score', null)
            ->assertJsonPath('data.telemetry.available', false);
        $this->getJson('/api/admin/ecosystem/governance/dashboard')->assertOk()
            ->assertJsonPath('data.health.score', null)->assertJsonPath('data.summary.servicePrincipals', 0);
        $this->getJson('/api/admin/ecosystem/audit/dashboard')->assertOk()
            ->assertJsonPath('data.health.score', null)->assertJsonPath('data.summary.reports', 0);
    }

    public function test_integrations_are_persisted_safely_audited_and_concurrency_checked(): void
    {
        Sanctum::actingAs(User::factory()->create(['role' => 'super_admin']));
        $module = $this->module();
        $row = $this->postJson('/api/admin/ecosystem/integrations', [
            'ecosystem_module_id' => $module->id, 'name' => 'Orders Gateway', 'provider' => 'Provider A',
            'integration_type' => 'api', 'environment' => 'production', 'auth_type' => 'api_key',
            'credential_reference' => 'vault://integrations/orders', 'retry_limit' => 3,
        ])->assertCreated()->assertJsonMissing(['forbidden-secret-material'])->json('data');
        $this->assertDatabaseHas('ecosystem_module_integrations', ['id' => $row['id'], 'credential_reference' => 'vault://integrations/orders', 'health_status' => 'not_evaluated']);
        $this->assertDatabaseHas('ecosystem_integration_audits', ['integration_id' => $row['id'], 'action' => 'registered']);
        $this->patchJson('/api/admin/ecosystem/integrations/'.$row['id'], [
            'ecosystem_module_id' => $module->id, 'name' => 'Orders Gateway', 'provider' => 'Provider A',
            'integration_type' => 'api', 'environment' => 'production', 'auth_type' => 'api_key',
            'credential_reference' => 'vault://integrations/orders', 'retry_limit' => 4, 'lock_version' => 99,
        ])->assertStatus(409);
    }

    public function test_access_requests_temporary_permissions_sod_and_report_audit_are_real(): void
    {
        $admin = User::factory()->create(['role' => 'super_admin']); $target = User::factory()->create(['role' => 'buyer']);
        Sanctum::actingAs($admin);
        $roleId = DB::table('roles')->insertGetId(['uuid' => (string) Str::uuid(), 'name' => 'temporary_reviewer', 'display_name' => 'Temporary Reviewer', 'status' => 'active', 'created_at' => now(), 'updated_at' => now()]);
        $permissionId = DB::table('permissions')->insertGetId(['uuid' => (string) Str::uuid(), 'name' => 'ecosystem.review', 'display_name' => 'Review Ecosystem', 'group' => 'ecosystem', 'status' => 'active', 'created_at' => now(), 'updated_at' => now()]);
        DB::table('permission_role')->insert(['role_id' => $roleId, 'permission_id' => $permissionId, 'status' => 'active', 'created_at' => now(), 'updated_at' => now()]);
        $request = $this->postJson('/api/admin/ecosystem/governance/access-requests', [
            'target_user_id' => $target->id, 'role_id' => $roleId, 'reason' => 'Time-bound review coverage', 'risk_level' => 'high',
        ])->assertCreated()->json('data');
        $this->postJson('/api/admin/ecosystem/governance/access-requests/'.$request['id'].'/approve', [
            'lock_version' => 1, 'reason' => 'Approved for controlled review', 'expires_at' => now()->addHour()->toIso8601String(),
        ])->assertOk();
        $this->assertDatabaseHas('users', ['id' => $target->id, 'role' => 'buyer']);
        $this->assertDatabaseHas('ecosystem_temporary_access', ['user_id' => $target->id, 'status' => 'active']);
        $this->getJson('/api/admin/ecosystem/governance/dashboard')->assertOk()
            ->assertJsonFragment(['identity' => $target->name, 'source' => 'temporary']);
        activity('ecosystem')->causedBy($admin)->withProperties(['client_secret' => 'must-not-leak', 'nested' => ['api_key' => 'must-not-leak']])->log('ecosystem.secret_test');
        $this->getJson('/api/admin/ecosystem/audit/dashboard')->assertOk()
            ->assertJsonMissing(['must-not-leak'])->assertJsonFragment(['client_secret' => '[REDACTED]']);
        $this->postJson('/api/admin/ecosystem/audit/reports', ['name' => 'Ecosystem Audit', 'slug' => 'ecosystem-audit'])->assertCreated();
        $this->postJson('/api/admin/ecosystem/audit/evidence', ['name' => 'Quarterly Evidence'])->assertCreated();
        $this->assertDatabaseHas('report_runs', ['report_type' => 'ecosystem', 'status' => 'completed']);
        $this->assertDatabaseHas('ecosystem_evidence_packages', ['name' => 'Quarterly Evidence', 'status' => 'queued']);
    }

    public function test_permissions_and_secret_fields_are_enforced(): void
    {
        Sanctum::actingAs(User::factory()->create(['role' => 'buyer']));
        $this->getJson('/api/admin/ecosystem/integrations/dashboard')->assertForbidden();
        $this->getJson('/api/admin/ecosystem/governance/dashboard')->assertForbidden();
        $this->getJson('/api/admin/ecosystem/audit/dashboard')->assertForbidden();
        Sanctum::actingAs(User::factory()->create(['role' => 'super_admin']));
        $this->postJson('/api/admin/ecosystem/integrations', ['api_key' => 'forbidden'])->assertUnprocessable();
    }

    private function module(): EcosystemModule
    {
        return EcosystemModule::create(['uuid' => (string) Str::uuid(), 'module_key' => 'control-center', 'name' => 'Control Center', 'category' => 'Platform', 'status' => 'operational', 'is_enabled' => true]);
    }
}
