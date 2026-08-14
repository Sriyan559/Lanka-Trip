<?php

namespace Tests\Feature;

use App\Models\EcosystemModule;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class EcosystemControlsApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_empty_dependency_and_flag_dashboards(): void
    {
        Sanctum::actingAs(User::factory()->create(['role' => 'super_admin']));

        $this->getJson('/api/admin/ecosystem/dependencies/dashboard')
            ->assertOk()->assertJsonPath('dashboard.summary.dependencies', 0)
            ->assertJsonPath('dashboard.health.score', null)->assertJsonCount(0, 'dashboard.graph.nodes');
        $this->getJson('/api/admin/ecosystem/feature-flags/dashboard')
            ->assertOk()->assertJsonPath('dashboard.summary.flags', 0)
            ->assertJsonPath('dashboard.health.score', null);
    }

    public function test_dependency_graph_semver_validation_cycle_detection_and_audit(): void
    {
        Sanctum::actingAs(User::factory()->create(['role' => 'super_admin']));
        $a = $this->module('a', '1.0.0'); $b = $this->module('b', '2.5.1'); $c = $this->module('c', '3.0.0');
        $ab = $this->postJson('/api/admin/ecosystem/dependencies', $this->dep($a, $b, '^2.5'))->assertCreated()->json('dependency');
        $this->postJson('/api/admin/ecosystem/dependencies', $this->dep($b, $c, null))->assertCreated();
        $this->postJson('/api/admin/ecosystem/dependencies', $this->dep($c, $a, null))
            ->assertUnprocessable()->assertJsonValidationErrors('dependency_module_id');
        $validation = $this->postJson('/api/admin/ecosystem/dependencies/'.$ab['id'].'/validate')->assertOk();
        $this->assertTrue($validation->json('validation.compatible'), $validation->getContent());
        $this->getJson('/api/admin/ecosystem/dependencies/dashboard')
            ->assertOk()->assertJsonPath('dashboard.summary.dependencies', 2)->assertJsonCount(3, 'dashboard.graph.nodes');
        $this->assertDatabaseHas('ecosystem_dependency_audits', ['dependency_id' => $ab['id'], 'action' => 'validated']);
    }

    public function test_feature_flag_environment_rollout_transitions_and_emergency_disable(): void
    {
        Sanctum::actingAs(User::factory()->create(['role' => 'super_admin']));
        $module = $this->module('flags', '1.0.0');
        $flag = $this->postJson('/api/admin/ecosystem/feature-flags', [
            'feature_key' => 'new-checkout', 'name' => 'New Checkout',
            'ecosystem_module_id' => $module->id, 'flag_type' => 'boolean', 'owner' => 'Platform',
        ])->assertCreated()->json('flag');
        $this->putJson('/api/admin/ecosystem/feature-flags/'.$flag['id'].'/environment', [
            'environment' => 'staging', 'enabled' => false, 'rollout_percentage' => 0,
        ])->assertOk();
        $roll = $this->postJson('/api/admin/ecosystem/feature-flags/'.$flag['id'].'/rollouts', [
            'environment' => 'staging', 'strategy' => 'percentage', 'target_percentage' => 50, 'stages' => [5, 10, 25, 50],
        ])->assertCreated()->json('rollout');
        $started = $this->postJson('/api/admin/ecosystem/feature-flags/'.$flag['id'].'/rollouts/'.$roll['id'].'/transition', [
            'action' => 'start', 'percentage' => 5, 'lock_version' => 1,
        ])->assertOk()->assertJsonPath('rollout.status', 'active')->json('rollout');
        $paused = $this->postJson('/api/admin/ecosystem/feature-flags/'.$flag['id'].'/rollouts/'.$roll['id'].'/transition', [
            'action' => 'pause', 'reason' => 'Observe metrics', 'lock_version' => $started['lock_version'],
        ])->assertOk()->assertJsonPath('rollout.status', 'paused')->json('rollout');
        $this->postJson('/api/admin/ecosystem/feature-flags/'.$flag['id'].'/rollouts/'.$roll['id'].'/transition', [
            'action' => 'resume', 'lock_version' => $paused['lock_version'],
        ])->assertOk()->assertJsonPath('rollout.status', 'active');
        $this->postJson('/api/admin/ecosystem/feature-flags/'.$flag['id'].'/emergency-disable', [
            'reason' => 'Critical production incident',
        ])->assertOk();
        $this->assertDatabaseHas('feature_flag_environments', [
            'feature_flag_id' => $flag['id'], 'environment' => 'staging', 'enabled' => false, 'rollout_percentage' => 0,
        ]);
        $this->assertDatabaseHas('feature_flag_audits', ['feature_flag_id' => $flag['id'], 'action' => 'emergency_disabled']);
    }

    public function test_duplicates_validation_and_permissions(): void
    {
        Sanctum::actingAs(User::factory()->create(['role' => 'buyer']));
        $this->getJson('/api/admin/ecosystem/dependencies')->assertForbidden();
        $this->getJson('/api/admin/ecosystem/feature-flags')->assertForbidden();
        Sanctum::actingAs(User::factory()->create(['role' => 'super_admin']));
        $this->postJson('/api/admin/ecosystem/feature-flags', [
            'feature_key' => 'bad key', 'name' => 'Bad', 'flag_type' => 'boolean',
        ])->assertUnprocessable()->assertJsonValidationErrors('feature_key');
    }

    private function module(string $key, string $version): EcosystemModule
    {
        return EcosystemModule::create([
            'uuid' => (string) Str::uuid(), 'module_key' => $key, 'name' => strtoupper($key),
            'category' => 'Platform', 'current_version' => $version, 'status' => 'operational', 'is_enabled' => true,
        ]);
    }

    private function dep(EcosystemModule $a, EcosystemModule $b, ?string $version): array
    {
        return ['ecosystem_module_id' => $a->id, 'dependency_module_id' => $b->id,
            'dependency_type' => 'runtime', 'environment' => 'production',
            'required_version' => $version, 'is_required' => true];
    }
}
