<?php

namespace Tests\Feature;

use App\Models\EcosystemModule;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class EcosystemModulesApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_empty_registry_returns_zero_and_null_aggregates(): void
    {
        Sanctum::actingAs(User::factory()->create(['role' => 'super_admin']));

        $this->getJson('/api/admin/ecosystem/dashboard')
            ->assertOk()
            ->assertJsonPath('dashboard.summary.total', 0)
            ->assertJsonPath('dashboard.health.overall', null)
            ->assertJsonCount(0, 'dashboard.alerts');

        $this->getJson('/api/admin/ecosystem/modules')
            ->assertOk()
            ->assertJsonPath('modules.total', 0)
            ->assertJsonCount(0, 'modules.data');
    }

    public function test_registry_create_search_filter_sort_update_and_audit_are_database_backed(): void
    {
        Sanctum::actingAs($admin = User::factory()->create(['role' => 'super_admin']));

        $created = $this->postJson('/api/admin/ecosystem/modules', $this->payload())
            ->assertCreated()
            ->assertJsonPath('module.moduleKey', 'customer-support')
            ->json('module');

        $this->assertDatabaseHas('ecosystem_modules', ['module_key' => 'customer-support', 'created_by' => $admin->id]);

        $this->getJson('/api/admin/ecosystem/modules?search=customer&category=Support&sort=name&direction=asc')
            ->assertOk()
            ->assertJsonPath('modules.total', 1)
            ->assertJsonPath('modules.data.0.moduleName', 'Customer Support');

        $module = EcosystemModule::findOrFail($created['databaseModuleId']);
        $this->patchJson("/api/admin/ecosystem/modules/{$module->id}", [...$this->payload(), 'name' => 'Customer Care'])
            ->assertOk()
            ->assertJsonPath('module.moduleName', 'Customer Care');

        $this->assertDatabaseHas('ecosystem_module_status_history', ['ecosystem_module_id' => $module->id, 'event_type' => 'registered']);
        $this->assertDatabaseHas('ecosystem_module_status_history', ['ecosystem_module_id' => $module->id, 'event_type' => 'updated']);
    }

    public function test_invalid_module_and_unauthorized_access_are_rejected(): void
    {
        Sanctum::actingAs(User::factory()->create(['role' => 'buyer']));
        $this->getJson('/api/admin/ecosystem/dashboard')->assertForbidden();

        Sanctum::actingAs(User::factory()->create(['role' => 'super_admin']));
        $this->postJson('/api/admin/ecosystem/modules', [...$this->payload(), 'module_key' => 'Invalid key'])
            ->assertUnprocessable()
            ->assertJsonValidationErrors('module_key');
        $this->getJson('/api/admin/ecosystem/modules/999999')->assertNotFound();
    }

    private function payload(): array
    {
        return [
            'module_key' => 'customer-support', 'name' => 'Customer Support', 'description' => null,
            'category' => 'Support', 'module_type' => 'core', 'lifecycle' => 'operational',
            'status' => 'operational', 'environment' => 'production', 'region' => 'Sri Lanka',
            'current_version' => '1.0.0', 'target_version' => '1.1.0', 'release_status' => 'released',
            'health_status' => 'healthy', 'risk_level' => 'low', 'primary_owner' => 'Support Team',
            'technical_owner' => 'Platform Team', 'is_enabled' => true,
        ];
    }
}
