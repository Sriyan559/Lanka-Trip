<?php

namespace App\Services\Admin;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class EcosystemReleaseService
{
    public const ENVIRONMENTS = ['development','test','staging','pilot','production'];

    public function readiness(int $id, bool $persist = true): array
    {
        $release = DB::table('ecosystem_release_candidates')->find($id); abort_unless($release, 404);
        $checks = [];
        $add = function (string $type, string $status, ?string $reason = null, array $evidence = []) use (&$checks): void {
            $checks[] = compact('type','status','reason','evidence');
        };
        $badDependencies = DB::table('ecosystem_module_dependencies')->where('ecosystem_module_id',$release->ecosystem_module_id)
            ->where('is_required',1)->where(fn($q)=>$q->where('compatibility_status','<>','compatible')->orWhereNull('compatibility_status'))->count();
        $add('dependencies',$badDependencies ? 'failed' : 'passed',$badDependencies ? "$badDependencies required dependencies are not compatible." : null,['blocking'=>$badDependencies]);
        $module = DB::table('ecosystem_modules')->find($release->ecosystem_module_id);
        $compat = $module?->compatibility_status;
        $add('compatibility',$compat === 'compatible' ? 'passed' : 'pending',$compat === 'compatible' ? null : 'Module compatibility has not been approved.');
        $add('security',$module?->security_status === 'compliant' ? 'passed' : 'pending',$module?->security_status === 'compliant' ? null : 'Security review is not complete.');
        $add('compliance',$module?->compliance_status === 'compliant' ? 'passed' : 'pending',$module?->compliance_status === 'compliant' ? null : 'Compliance review is not complete.');
        $previous = DB::table('ecosystem_environment_versions')->where('ecosystem_module_id',$release->ecosystem_module_id)->where('environment',$release->target_environment)->value('version');
        $add('rollback',$previous ? 'passed' : 'pending',$previous ? null : 'No previous deployed version is recorded.',['previousVersion'=>$previous]);
        $add('migrations','not_evaluated','Migration tracking is not configured.');
        $failed = collect($checks)->where('status','failed')->count(); $pending = collect($checks)->where('status','pending')->count(); $warnings = collect($checks)->where('status','not_evaluated')->count();
        $status = $failed ? 'blocked' : ($pending ? 'pending' : 'ready');
        if ($persist) DB::transaction(function () use ($id,$checks,$status): void {
            foreach ($checks as $check) DB::table('ecosystem_release_checks')->updateOrInsert(
                ['release_candidate_id'=>$id,'check_type'=>$check['type']],
                ['status'=>$check['status'],'reason'=>$check['reason'],'evidence'=>json_encode($check['evidence']),'evaluated_at'=>now()]
            );
            DB::table('ecosystem_release_candidates')->where('id',$id)->update(['readiness_status'=>$status,'updated_at'=>now()]);
        });
        return ['ready'=>$status==='ready','status'=>$status,'passed'=>collect($checks)->where('status','passed')->count(),
            'warnings'=>$warnings,'failed'=>$failed,'pending'=>$pending,'checks'=>$checks,
            'blockingReasons'=>collect($checks)->where('status','failed')->pluck('reason')->values()];
    }

    public function create(array $data, Request $request): object
    {
        return DB::transaction(function () use ($data,$request) {
            abort_if(DB::table('ecosystem_module_versions')->where('ecosystem_module_id',$data['ecosystem_module_id'])->where('version',$data['target_version'])->exists(),409,'This module version already exists.');
            $versionId = DB::table('ecosystem_module_versions')->insertGetId(['ecosystem_module_id'=>$data['ecosystem_module_id'],'version'=>$data['target_version'],'status'=>'candidate','release_channel'=>$data['release_channel']??'stable','release_notes'=>json_encode(['summary'=>$data['release_notes']??null]),'created_by'=>$request->user()->id,'created_at'=>now(),'updated_at'=>now()]);
            $id = DB::table('ecosystem_release_candidates')->insertGetId(['uuid'=>(string)Str::uuid(),'code'=>'REL-'.now()->format('YmdHis').'-'.Str::upper(Str::random(4)),
                'ecosystem_module_id'=>$data['ecosystem_module_id'],'module_version_id'=>$versionId,'source_version'=>$data['source_version']??null,
                'target_version'=>$data['target_version'],'target_environment'=>$data['target_environment'],'status'=>'draft','approval_status'=>'pending',
                'readiness_status'=>'not_evaluated','risk_level'=>$data['risk_level']??'unknown','release_notes'=>$data['release_notes']??null,
                'lock_version'=>1,'created_by'=>$request->user()->id,'created_at'=>now(),'updated_at'=>now()]);
            $this->audit($id,$request,'created',null,$data); return DB::table('ecosystem_release_candidates')->find($id);
        });
    }

    public function transition(int $id, string $action, array $data, Request $request): object
    {
        return DB::transaction(function () use ($id,$action,$data,$request) {
            $release = DB::table('ecosystem_release_candidates')->where('id',$id)->lockForUpdate()->first(); abort_unless($release,404);
            if (isset($data['lock_version'])) abort_if((int)$data['lock_version'] !== (int)$release->lock_version,409,'Release was changed by another administrator.');
            $updates=[];
            if ($action==='validate') { $before=(array)$release;$readiness=$this->readiness($id);$after=(array)DB::table('ecosystem_release_candidates')->find($id);$this->audit($id,$request,'validated',$before,$after,implode('; ',$readiness['blockingReasons']->all()));return (object)$after; }
            if ($action==='approve') { abort_unless(in_array($release->status,['draft','validated'],true),409,'Release cannot be approved from its current state.'); $updates=['status'=>'approved','approval_status'=>'approved','approved_by'=>$request->user()->id]; }
            if ($action==='reject') { $updates=['status'=>'blocked','approval_status'=>'rejected']; }
            if ($action==='schedule') { abort_unless($release->approval_status==='approved',422,'Approval is required before scheduling.'); $updates=['status'=>'scheduled','scheduled_at'=>$data['scheduled_at']]; }
            if (in_array($action,['deploy','promote'],true)) {
                $readiness=$this->readiness($id); abort_unless($readiness['ready'],422,'Release readiness gates have not passed.'); abort_unless($release->approval_status==='approved',422,'Release approval is required.');
                $environment=$action==='promote' ? $data['target_environment'] : $release->target_environment;
                $previous=DB::table('ecosystem_environment_versions')->where('ecosystem_module_id',$release->ecosystem_module_id)->where('environment',$environment)->value('version');
                $deploymentId=DB::table('ecosystem_release_deployments')->insertGetId(['uuid'=>(string)Str::uuid(),'release_candidate_id'=>$id,'environment'=>$environment,'version'=>$release->target_version,'previous_version'=>$previous,'status'=>'completed','reason'=>$data['reason']??null,'started_at'=>now(),'completed_at'=>now(),'created_by'=>$request->user()->id,'created_at'=>now(),'updated_at'=>now()]);
                DB::table('ecosystem_environment_versions')->updateOrInsert(['ecosystem_module_id'=>$release->ecosystem_module_id,'environment'=>$environment],['version'=>$release->target_version,'deployment_id'=>$deploymentId,'deployed_at'=>now(),'created_at'=>now(),'updated_at'=>now()]);
                $updates=['status'=>$environment==='production'?'released':'in_progress','started_at'=>$release->started_at??now(),'completed_at'=>$environment==='production'?now():null];
                if ($environment==='production') { DB::table('ecosystem_module_versions')->where('id',$release->module_version_id)->update(['status'=>'released','released_at'=>now(),'released_by'=>$request->user()->id,'updated_at'=>now()]); DB::table('ecosystem_modules')->where('id',$release->ecosystem_module_id)->update(['current_version'=>$release->target_version,'last_release_at'=>now(),'updated_at'=>now()]); }
            }
            if ($action==='rollback') {
                $deployment=DB::table('ecosystem_release_deployments')->where('release_candidate_id',$id)->whereNotNull('previous_version')->latest('id')->first();
                abort_unless($deployment,422,'No previous stable version is recorded for rollback.');
                DB::table('ecosystem_release_deployments')->insert(['uuid'=>(string)Str::uuid(),'release_candidate_id'=>$id,'environment'=>$deployment->environment,'version'=>$deployment->previous_version,'previous_version'=>$deployment->version,'status'=>'rolled_back','reason'=>$data['reason'],'started_at'=>now(),'completed_at'=>now(),'created_by'=>$request->user()->id,'created_at'=>now(),'updated_at'=>now()]);
                DB::table('ecosystem_environment_versions')->where('ecosystem_module_id',$release->ecosystem_module_id)->where('environment',$deployment->environment)->update(['version'=>$deployment->previous_version,'deployed_at'=>now(),'updated_at'=>now()]); $updates=['status'=>'rolled_back'];
            }
            abort_if(!$updates,422,'Unsupported transition.'); $updates['lock_version']=$release->lock_version+1; $updates['updated_at']=now();
            DB::table('ecosystem_release_candidates')->where('id',$id)->update($updates); $this->audit($id,$request,$action,(array)$release,$updates,$data['reason']??null);
            return DB::table('ecosystem_release_candidates')->find($id);
        });
    }

    public function drift(): array
    {
        $rows=DB::table('ecosystem_environment_versions as e')->join('ecosystem_modules as m','m.id','=','e.ecosystem_module_id')->orderBy('m.name')->get(['m.id','m.name','e.environment','e.version']);
        $result=[]; foreach($rows->groupBy('id') as $group){$prod=$group->firstWhere('environment','production');foreach($group as $row)if($prod&&$row->environment!=='production'&&$row->version!==$prod->version)$result[]=['component'=>$row->name,'sourceEnvironment'=>$row->environment,'targetEnvironment'=>'production','differenceType'=>'module_version','sourceValue'=>$row->version,'targetValue'=>$prod->version,'severity'=>'warning'];}
        return $result;
    }

    private function audit(int $id, Request $request, string $action, ?array $before, ?array $after, ?string $reason=null): void
    { DB::table('ecosystem_release_audits')->insert(['release_candidate_id'=>$id,'action'=>$action,'actor_id'=>$request->user()->id,'before'=>$before?json_encode($before):null,'after'=>$after?json_encode($after):null,'reason'=>$reason,'created_at'=>now()]); }
}
