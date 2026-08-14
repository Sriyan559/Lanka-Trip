<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Services\Admin\EcosystemReleaseService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class EcosystemReleaseController extends Controller
{
    public function __construct(private EcosystemReleaseService $service) {}
    private function view(Request $r): void { abort_unless($r->user()->hasPermission('ecosystem.modules.view'),403); }
    private function write(Request $r): void { abort_unless($r->user()->hasPermission('ecosystem.modules.configure'),403); }

    public function dashboard(Request $r): JsonResponse
    {
        $this->view($r); $q=$this->filtered($r); $count=fn($c,$v)=>(clone$q)->where($c,$v)->count();
        $versions=DB::table('ecosystem_module_versions'); $drift=$this->service->drift();
        $environments=DB::table('ecosystem_environment_versions')->selectRaw('environment, COUNT(*) components, MAX(deployed_at) last_deployed_at')->groupBy('environment')->get();
        $calendar=(clone$q)->whereNotNull('r.scheduled_at')->orderBy('r.scheduled_at')->limit(12)->get($this->columns());
        return response()->json(['success'=>true,'dashboard'=>['context'=>['tenant'=>null,'ecosystem'=>'Ecosystem Modules','region'=>null,'timezone'=>config('app.timezone'),'registryStatus'=>'database_connected','lastUpdated'=>now()->toIso8601String()],
            'summary'=>['registeredVersions'=>(clone$versions)->count(),'releaseCandidates'=>(clone$q)->count(),'scheduled'=>$count('r.status','scheduled'),'inProgress'=>$count('r.status','in_progress'),'blocked'=>$count('r.status','blocked'),'released'=>$count('r.status','released'),'rolledBack'=>$count('r.status','rolled_back'),'pendingApprovals'=>$count('r.approval_status','pending'),'environmentDrift'=>count($drift)],
            'health'=>['score'=>null,'status'=>(clone$q)->count()?'not_evaluated':'not_evaluated','reason'=>'No approved numeric release-health formula is configured.'],
            'environmentMatrix'=>$this->matrix(),'environmentDrift'=>$drift,'environments'=>$environments,'calendar'=>$calendar,
            'readiness'=>DB::table('ecosystem_release_candidates')->selectRaw('readiness_status as status, COUNT(*) count')->groupBy('readiness_status')->get(),
            'governance'=>DB::table('ecosystem_release_checks')->selectRaw('check_type, status, COUNT(*) count')->groupBy('check_type','status')->get(),
            'promotionQueue'=>(clone$q)->whereIn('r.status',['approved','scheduled','in_progress'])->limit(10)->get($this->columns()),
            'migration'=>['status'=>'not_configured','message'=>'Migration tracking not configured.'],
            'activity'=>$this->activity(),'recommendation'=>$this->recommendation(),
            'permissions'=>['canCreate'=>$r->user()->hasPermission('ecosystem.modules.configure'),'canApprove'=>$r->user()->hasPermission('ecosystem.modules.configure'),'canDeploy'=>$r->user()->hasPermission('ecosystem.modules.configure'),'canRollback'=>$r->user()->hasPermission('ecosystem.modules.configure'),'canExport'=>$r->user()->hasPermission('ecosystem.modules.view')]]]);
    }
    public function index(Request $r): JsonResponse
    { $this->view($r);$v=$r->validate(['sort'=>['nullable',Rule::in(['code','target_version','status','scheduled_at','updated_at'])],'direction'=>['nullable',Rule::in(['asc','desc'])],'per_page'=>['nullable','integer','between:1,100']]);$rows=$this->filtered($r)->select($this->columns())->orderBy('r.'.($v['sort']??'updated_at'),$v['direction']??'desc')->paginate($v['per_page']??20);return response()->json(['success'=>true,'releases'=>$rows]); }
    public function references(Request $r): JsonResponse
    { $this->view($r);return response()->json(['success'=>true,'references'=>['modules'=>DB::table('ecosystem_modules')->whereNull('deleted_at')->orderBy('name')->get(['id','name','current_version']),'environments'=>EcosystemReleaseService::ENVIRONMENTS]]); }
    public function store(Request $r): JsonResponse
    { $this->write($r);$d=$r->validate(['ecosystem_module_id'=>['required','integer','exists:ecosystem_modules,id'],'source_version'=>['nullable','string','max:50'],'target_version'=>['required','regex:/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/','max:50'],'target_environment'=>['required',Rule::in(EcosystemReleaseService::ENVIRONMENTS)],'release_channel'=>['nullable',Rule::in(['stable','beta','canary'])],'risk_level'=>['nullable',Rule::in(['unknown','low','medium','high','critical'])],'release_notes'=>['nullable','string','max:5000']]);return response()->json(['success'=>true,'release'=>$this->service->create($d,$r)],201); }
    public function show(Request $r,int$id): JsonResponse
    { $this->view($r);$row=$this->filtered($r)->where('r.id',$id)->first($this->columns());abort_unless($row,404);return response()->json(['success'=>true,'release'=>$row,'readiness'=>$this->service->readiness($id,false),'deployments'=>DB::table('ecosystem_release_deployments')->where('release_candidate_id',$id)->latest()->get(),'checks'=>DB::table('ecosystem_release_checks')->where('release_candidate_id',$id)->get(),'activity'=>$this->activity($id)]); }
    public function transition(Request $r,int$id,string$action): JsonResponse
    { $this->write($r);abort_unless(in_array($action,['validate','approve','reject','schedule','deploy','promote','rollback'],true),404);$rules=['lock_version'=>['nullable','integer'],'reason'=>['nullable','string','max:1000']];if($action==='schedule')$rules['scheduled_at']=['required','date','after:now'];if($action==='promote')$rules['target_environment']=['required',Rule::in(EcosystemReleaseService::ENVIRONMENTS)];if(in_array($action,['reject','promote','rollback'],true))$rules['reason']=['required','string','min:10','max:1000'];$d=$r->validate($rules);return response()->json(['success'=>true,'release'=>$this->service->transition($id,$action,$d,$r)]); }
    public function export(Request $r): JsonResponse
    { $this->view($r);return response()->json(['source'=>'database','generatedAt'=>now()->toIso8601String(),'releases'=>$this->filtered($r)->select($this->columns())->get(),'environmentMatrix'=>$this->matrix(),'environmentDrift'=>$this->service->drift()]); }
    private function filtered(Request$r)
    { $q=DB::table('ecosystem_release_candidates as r')->join('ecosystem_modules as m','m.id','=','r.ecosystem_module_id')->leftJoin('users as u','u.id','=','r.created_by');if($r->filled('search')){$s='%'.$r->search.'%';$q->where(fn($x)=>$x->where('r.code','like',$s)->orWhere('m.name','like',$s)->orWhere('r.target_version','like',$s));}foreach(['status'=>'r.status','environment'=>'r.target_environment','approval'=>'r.approval_status','readiness'=>'r.readiness_status','risk'=>'r.risk_level','module_id'=>'r.ecosystem_module_id']as$k=>$c)if($r->filled($k))$q->where($c,$r->$k);return$q; }
    private function columns(): array
    { return ['r.id','r.code','r.ecosystem_module_id','m.module_key','m.name as component','m.category','r.source_version','r.target_version','r.target_environment','r.status','r.approval_status','r.readiness_status','r.risk_level','r.release_notes','r.scheduled_at','r.started_at','r.completed_at','r.lock_version','u.name as owner','r.created_at','r.updated_at']; }
    private function matrix(): array
    { $rows=DB::table('ecosystem_environment_versions as e')->join('ecosystem_modules as m','m.id','=','e.ecosystem_module_id')->get(['m.id','m.name','e.environment','e.version','e.deployed_at']);return $rows->groupBy('id')->map(fn($g)=>['moduleId'=>$g->first()->id,'component'=>$g->first()->name,'versions'=>$g->pluck('version','environment'),'lastDeployedAt'=>$g->max('deployed_at')])->values()->all(); }
    private function activity(?int$id=null): mixed
    { $q=DB::table('ecosystem_release_audits as a')->leftJoin('ecosystem_release_candidates as r','r.id','=','a.release_candidate_id')->leftJoin('ecosystem_modules as m','m.id','=','r.ecosystem_module_id')->leftJoin('users as u','u.id','=','a.actor_id');if($id)$q->where('a.release_candidate_id',$id);return$q->latest('a.created_at')->limit(15)->get(['a.id','a.release_candidate_id','r.code','m.name as component','a.action','a.reason','u.name as actor','a.created_at']); }
    private function recommendation(): array
    { if($x=DB::table('ecosystem_release_candidates')->where('status','blocked')->oldest('updated_at')->first())return['action'=>'review_blocked','releaseId'=>$x->id,'reason'=>'A blocked release requires review.'];if($x=DB::table('ecosystem_release_candidates')->where('approval_status','pending')->oldest()->first())return['action'=>'review_approval','releaseId'=>$x->id,'reason'=>'A release is awaiting approval.'];return['action'=>null,'releaseId'=>null,'reason'=>'No immediate release action is required.']; }
}
