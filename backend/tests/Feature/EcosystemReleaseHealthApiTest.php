<?php

namespace Tests\Feature;

use App\Models\EcosystemModule;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class EcosystemReleaseHealthApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_empty_release_and_health_dashboards_preserve_unknown_states(): void
    {
        Sanctum::actingAs(User::factory()->create(['role'=>'super_admin']));
        $this->getJson('/api/admin/ecosystem/releases/dashboard')->assertOk()
            ->assertJsonPath('dashboard.summary.releaseCandidates',0)->assertJsonPath('dashboard.health.score',null)
            ->assertJsonCount(0,'dashboard.environmentMatrix');
        $this->getJson('/api/admin/ecosystem/health-adoption/dashboard')->assertOk()
            ->assertJsonPath('dashboard.summary.registered',0)->assertJsonPath('dashboard.summary.availability',null)
            ->assertJsonPath('dashboard.summary.healthScore',null)->assertJsonPath('dashboard.healthStatus','not_evaluated');
    }

    public function test_release_candidate_validation_approval_deployment_and_rollback_are_persisted_and_audited(): void
    {
        Sanctum::actingAs(User::factory()->create(['role'=>'super_admin'])); $module=$this->module('release-ready');
        DB::table('ecosystem_environment_versions')->insert(['ecosystem_module_id'=>$module->id,'environment'=>'development','version'=>'0.9.0','created_at'=>now(),'updated_at'=>now()]);
        $release=$this->postJson('/api/admin/ecosystem/releases',['ecosystem_module_id'=>$module->id,'source_version'=>'0.9.0','target_version'=>'1.0.0','target_environment'=>'development','release_notes'=>'Initial release'])->assertCreated()->json('release');
        $this->postJson("/api/admin/ecosystem/releases/{$release['id']}/validate",['lock_version'=>1])->assertOk()->assertJsonPath('release.readiness_status','ready');
        $approved=$this->postJson("/api/admin/ecosystem/releases/{$release['id']}/approve",['lock_version'=>1])->assertOk()->assertJsonPath('release.approval_status','approved')->json('release');
        $deployed=$this->postJson("/api/admin/ecosystem/releases/{$release['id']}/deploy",['lock_version'=>$approved['lock_version']])->assertOk()->json('release');
        $this->assertDatabaseHas('ecosystem_environment_versions',['ecosystem_module_id'=>$module->id,'environment'=>'development','version'=>'1.0.0']);
        $this->postJson("/api/admin/ecosystem/releases/{$release['id']}/rollback",['lock_version'=>$deployed['lock_version'],'reason'=>'Rollback after verified test regression'])->assertOk()->assertJsonPath('release.status','rolled_back');
        $this->assertDatabaseHas('ecosystem_environment_versions',['ecosystem_module_id'=>$module->id,'environment'=>'development','version'=>'0.9.0']);
        $this->assertDatabaseHas('ecosystem_release_audits',['release_candidate_id'=>$release['id'],'action'=>'rollback']);
    }

    public function test_failed_dependency_gate_blocks_deployment(): void
    {
        Sanctum::actingAs(User::factory()->create(['role'=>'super_admin'])); $source=$this->module('source');$target=$this->module('target');
        DB::table('ecosystem_module_dependencies')->insert(['ecosystem_module_id'=>$source->id,'dependency_module_id'=>$target->id,'dependency_type'=>'runtime','environment'=>'development','is_required'=>true,'status'=>'failed','compatibility_status'=>'incompatible','risk_level'=>'high','is_active'=>true,'created_at'=>now(),'updated_at'=>now()]);
        DB::table('ecosystem_environment_versions')->insert(['ecosystem_module_id'=>$source->id,'environment'=>'development','version'=>'1.0.0','created_at'=>now(),'updated_at'=>now()]);
        $release=$this->postJson('/api/admin/ecosystem/releases',['ecosystem_module_id'=>$source->id,'source_version'=>'1.0.0','target_version'=>'1.1.0','target_environment'=>'development'])->assertCreated()->json('release');
        $approved=$this->postJson("/api/admin/ecosystem/releases/{$release['id']}/approve",['lock_version'=>1])->assertOk()->json('release');
        $this->postJson("/api/admin/ecosystem/releases/{$release['id']}/deploy",['lock_version'=>$approved['lock_version']])->assertUnprocessable();
        $this->assertDatabaseMissing('ecosystem_release_deployments',['release_candidate_id'=>$release['id']]);
    }

    public function test_health_registry_uses_real_checks_and_leaves_unsupported_telemetry_null(): void
    {
        Sanctum::actingAs(User::factory()->create(['role'=>'super_admin'])); $module=$this->module('health');
        DB::table('ecosystem_module_health_checks')->insert(['ecosystem_module_id'=>$module->id,'status'=>'healthy','response_time_ms'=>125,'message'=>'HTTP health endpoint succeeded','metrics'=>json_encode(['source'=>'http-health-check']),'checked_at'=>now()]);
        $this->getJson('/api/admin/ecosystem/health-adoption/dashboard')->assertOk()
            ->assertJsonPath('dashboard.summary.monitored',1)->assertJsonPath('dashboard.summary.operational',1)
            ->assertJsonPath('dashboard.summary.errorRate',null)->assertJsonPath('dashboard.summary.throughput',null);
        $this->getJson('/api/admin/ecosystem/health-adoption/modules')->assertOk()
            ->assertJsonPath('modules.data.0.latest_status','healthy')->assertJsonPath('modules.data.0.response_time_ms',125);
        $this->getJson('/api/admin/ecosystem/health-adoption/trends')->assertOk()->assertJsonCount(1,'series');
    }

    public function test_permissions_and_validation_are_enforced(): void
    {
        Sanctum::actingAs(User::factory()->create(['role'=>'buyer']));
        $this->getJson('/api/admin/ecosystem/releases/dashboard')->assertForbidden();
        $this->getJson('/api/admin/ecosystem/health-adoption/dashboard')->assertForbidden();
        Sanctum::actingAs(User::factory()->create(['role'=>'super_admin']));$module=$this->module('validation');
        $this->postJson('/api/admin/ecosystem/releases',['ecosystem_module_id'=>$module->id,'target_version'=>'not-semver','target_environment'=>'production'])->assertUnprocessable()->assertJsonValidationErrors('target_version');
    }

    private function module(string $key): EcosystemModule
    {
        return EcosystemModule::create(['uuid'=>(string)Str::uuid(),'module_key'=>$key,'name'=>Str::headline($key),'category'=>'Platform','current_version'=>'0.9.0','status'=>'operational','is_enabled'=>true,'compatibility_status'=>'compatible','security_status'=>'compliant','compliance_status'=>'compliant','health_status'=>'unknown','environment'=>'development']);
    }
}
