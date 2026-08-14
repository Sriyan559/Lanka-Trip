<?php
namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\EcosystemCapabilityAssignment;
use App\Models\EcosystemModuleAssignment;
use Illuminate\Database\Query\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;

class EcosystemAssignmentController extends Controller
{
    private const STATUSES=['pending','active','blocked','restricted','inactive','expired'];
    private const ENVIRONMENTS=['development','test','staging','production','sandbox'];

    private function authorizeView(Request $request): void { abort_unless($request->user()->hasPermission('ecosystem.modules.view'), 403); }
    private function authorizeWrite(Request $request): void { abort_unless($request->user()->hasPermission('ecosystem.modules.configure'), 403); }

    public function references(Request $request): JsonResponse
    {
        $this->authorizeView($request);
        return $this->successResponse(['references'=>[
            'tenants'=>DB::table('company_profiles')->whereNull('deleted_at')->orderBy('legal_name')->get(['id','uuid','legal_name as name','status']),
            'businessUnits'=>DB::table('ecosystem_business_units')->orderBy('name')->get(['id','uuid','company_profile_id as tenantId','name','code','status']),
            'channels'=>DB::table('ecosystem_channels')->orderBy('name')->get(['id','uuid','business_unit_id as businessUnitId','name','code','status']),
            'modules'=>DB::table('ecosystem_modules')->whereNull('deleted_at')->orderBy('name')->get(['id','uuid','module_key as key','name','category','module_type as type','status']),
            'capabilities'=>DB::table('ecosystem_capabilities')->orderBy('name')->get(['id','uuid','ecosystem_module_id as moduleId','capability_key as key','name','category','status']),
            'environments'=>self::ENVIRONMENTS,
        ]]);
    }

    public function dashboard(Request $request, string $kind): JsonResponse
    {
        $this->authorizeView($request); $capability=$kind==='capabilities'; $base=$this->filtered($request,$capability);
        $total=(clone $base)->count(); $count=fn(string $column,string $value)=>(clone $base)->where($column,$value)->count();
        $eligible=(clone $base)->where('a.production_eligible',true)->count(); $evaluated=(clone $base)->whereNotNull('a.production_eligible')->count();
        $distribution=function(string $column) use($base){ return (clone $base)->select($column.' as key',DB::raw('COUNT(*) as count'))->groupBy($column)->orderBy($column)->get(); };
        return $this->successResponse(['dashboard'=>[
            'summary'=>['total'=>$total,'active'=>$count('a.status','active'),'pending'=>$count('a.status','pending'),'blocked'=>$count('a.status','blocked'),'restricted'=>$count('a.status','restricted'),'direct'=>$count('a.assignment_type','direct'),'inherited'=>$count('a.assignment_type','inherited'),'productionEligible'=>$eligible,'notEligible'=>$evaluated-$eligible],
            'coverage'=>$distribution('a.assignment_type'),'statuses'=>$distribution('a.status'),'governance'=>$distribution('a.governance_status'),'risks'=>$distribution('a.risk_level'),
            'productionEligibility'=>['eligible'=>$eligible,'notEligible'=>$evaluated-$eligible,'notEvaluated'=>$total-$evaluated],
            'health'=>['score'=>null,'status'=>$total===0?'not_evaluated':($count('a.status','blocked')>0?'warning':'healthy'),'reason'=>'No documented numeric assignment health scoring model exists.'],
            'conflicts'=>[],'activity'=>$this->activity($capability),'permissions'=>['canCreate'=>$request->user()->hasPermission('ecosystem.modules.configure'),'canUpdate'=>$request->user()->hasPermission('ecosystem.modules.configure'),'canRevoke'=>$request->user()->hasPermission('ecosystem.modules.configure'),'canExport'=>$request->user()->hasPermission('ecosystem.modules.view')],
            'generatedAt'=>now()->toIso8601String(),'source'=>'database'
        ]]);
    }

    public function index(Request $request, string $kind): JsonResponse
    {
        $this->authorizeView($request); $capability=$kind==='capabilities'; $validated=$request->validate([
            'search'=>['nullable','string','max:160'],'tenant_id'=>['nullable','integer'],'business_unit_id'=>['nullable','integer'],'channel_id'=>['nullable','integer'],'module_id'=>['nullable','integer'],'environment'=>['nullable',Rule::in(self::ENVIRONMENTS)],'status'=>['nullable',Rule::in(self::STATUSES)],'assignment_type'=>['nullable',Rule::in(['direct','inherited','override'])],'risk'=>['nullable',Rule::in(['unknown','low','medium','high','critical'])],'sort'=>['nullable',Rule::in(['updated_at','status','assignment_type','risk_level','module_name','tenant_name'])],'direction'=>['nullable',Rule::in(['asc','desc'])],'per_page'=>['nullable','integer','min:1','max:100']]);
        $query=$this->filtered($request,$capability);
        $sort=['module_name'=>'m.name','tenant_name'=>'t.legal_name'][$validated['sort']??'']??'a.'.($validated['sort']??'updated_at');
        $page=$query->select($this->columns($capability))->orderBy($sort,$validated['direction']??'desc')->paginate($validated['per_page']??25);
        return $this->successResponse(['assignments'=>$page]);
    }

    public function store(Request $request, string $kind): JsonResponse
    {
        $this->authorizeWrite($request); $capability=$kind==='capabilities'; $data=$this->validated($request,$capability); $this->validateHierarchy($data,$capability);
        $duplicate=$capability
            ? EcosystemCapabilityAssignment::where('module_assignment_id',$data['module_assignment_id'])->where('capability_id',$data['capability_id'])->exists()
            : EcosystemModuleAssignment::where('company_profile_id',$data['company_profile_id'])->where('ecosystem_module_id',$data['ecosystem_module_id'])->where('environment',$data['environment'])
                ->where(fn($q)=>isset($data['business_unit_id'])?$q->where('business_unit_id',$data['business_unit_id']):$q->whereNull('business_unit_id'))
                ->where(fn($q)=>isset($data['channel_id'])?$q->where('channel_id',$data['channel_id']):$q->whereNull('channel_id'))->exists();
        abort_if($duplicate, Response::HTTP_CONFLICT, 'An assignment already exists for this scope.');
        $model=DB::transaction(function() use($request,$data,$capability){
            $class=$capability?EcosystemCapabilityAssignment::class:EcosystemModuleAssignment::class;
            $record=$class::create([...$data,'uuid'=>(string)Str::uuid(),'created_by'=>$request->user()->id,'updated_by'=>$request->user()->id]);
            $this->audit($request,$capability?'capability_assignment':'module_assignment',$record->id,'created',null,$record->toArray()); return $record;
        });
        return $this->successResponse(['assignment'=>$model], 'Assignment created.', Response::HTTP_CREATED);
    }

    public function update(Request $request, string $kind, int $id): JsonResponse
    {
        $this->authorizeWrite($request); $capability=$kind==='capabilities'; $class=$capability?EcosystemCapabilityAssignment::class:EcosystemModuleAssignment::class; $record=$class::findOrFail($id);
        $data=$request->validate(['status'=>['sometimes',Rule::in(self::STATUSES)],'governance_status'=>['sometimes',Rule::in(['not_evaluated','pending','passed','failed','waived'])],'risk_level'=>['sometimes',Rule::in(['unknown','low','medium','high','critical'])],'production_eligible'=>['sometimes','nullable','boolean'],'eligibility_reasons'=>['sometimes','nullable','array']]);
        DB::transaction(function() use($request,$record,$data,$capability){$before=$record->toArray();$record->update([...$data,'updated_by'=>$request->user()->id]);$this->audit($request,$capability?'capability_assignment':'module_assignment',$record->id,'updated',$before,$record->fresh()->toArray());});
        return $this->successResponse(['assignment'=>$record->fresh()],'Assignment updated.');
    }

    public function destroy(Request $request,string $kind,int $id): JsonResponse
    {
        $this->authorizeWrite($request); $capability=$kind==='capabilities'; $class=$capability?EcosystemCapabilityAssignment::class:EcosystemModuleAssignment::class; $record=$class::findOrFail($id);
        DB::transaction(function()use($request,$record,$capability){$before=$record->toArray();$record->delete();$this->audit($request,$capability?'capability_assignment':'module_assignment',$record->id,'revoked',$before,null);});
        return $this->successResponse(message:'Assignment revoked.');
    }

    public function export(Request $request,string $kind)
    {
        $this->authorizeView($request); $capability=$kind==='capabilities'; $rows=$this->filtered($request,$capability)->select($this->columns($capability))->orderBy('a.updated_at','desc')->get();
        return response()->streamDownload(function()use($rows){$out=fopen('php://output','w');fputcsv($out,['ID','Tenant','Business Unit','Channel','Module','Capability','Environment','Type','Status','Governance','Risk','Production Eligible','Updated']);foreach($rows as $r)fputcsv($out,[$r->id,$r->tenant_name,$r->business_unit_name,$r->channel_name,$r->module_name,$r->capability_name??'', $r->environment,$r->assignment_type,$r->status,$r->governance_status,$r->risk_level,is_null($r->production_eligible)?'Not evaluated':($r->production_eligible?'Yes':'No'),$r->updated_at]);fclose($out);},$kind.'-assignment-matrix.csv',['Content-Type'=>'text/csv']);
    }

    private function filtered(Request $request,bool $capability): Builder
    {
        $q=DB::table(($capability?'ecosystem_capability_assignments':'ecosystem_module_assignments').' as a')->whereNull('a.deleted_at');
        if($capability)$q->join('ecosystem_module_assignments as ma','ma.id','=','a.module_assignment_id')->whereNull('ma.deleted_at')->join('ecosystem_capabilities as cap','cap.id','=','a.capability_id');
        $scope=$capability?'ma':'a'; $q->join('company_profiles as t','t.id','=',$scope.'.company_profile_id')->join('ecosystem_modules as m','m.id','=',$scope.'.ecosystem_module_id')->leftJoin('ecosystem_business_units as bu','bu.id','=',$scope.'.business_unit_id')->leftJoin('ecosystem_channels as ch','ch.id','=',$scope.'.channel_id');
        foreach(['tenant_id'=>'company_profile_id','business_unit_id'=>'business_unit_id','channel_id'=>'channel_id','module_id'=>'ecosystem_module_id','environment'=>'environment'] as $param=>$column)if($request->filled($param))$q->where($scope.'.'.$column,$request->input($param));
        foreach(['status','assignment_type'] as $column)if($request->filled($column))$q->where('a.'.$column,$request->input($column)); if($request->filled('risk'))$q->where('a.risk_level',$request->risk);
        if($search=trim((string)$request->search))$q->where(fn($x)=>$x->where('m.name','like',"%$search%")->orWhere('m.module_key','like',"%$search%")->orWhere('t.legal_name','like',"%$search%")); return $q;
    }
    private function columns(bool $capability): array { $scope=$capability?'ma':'a';return ['a.id','a.uuid','t.id as tenant_id','t.legal_name as tenant_name','bu.id as business_unit_id','bu.name as business_unit_name','ch.id as channel_id','ch.name as channel_name','m.id as module_id','m.module_key','m.name as module_name','m.category','m.module_type',...($capability?['cap.id as capability_id','cap.capability_key','cap.name as capability_name']:[]),$scope.'.environment','a.assignment_type','a.status','a.governance_status','a.risk_level','a.production_eligible','a.eligibility_reasons','a.updated_at']; }
    private function validated(Request $request,bool $capability): array { return $request->validate($capability?['module_assignment_id'=>['required','integer','exists:ecosystem_module_assignments,id'],'capability_id'=>['required','integer','exists:ecosystem_capabilities,id'],'assignment_type'=>['required',Rule::in(['direct','inherited','override'])],'status'=>['required',Rule::in(self::STATUSES)]]:['company_profile_id'=>['required','integer','exists:company_profiles,id'],'business_unit_id'=>['nullable','integer','exists:ecosystem_business_units,id'],'channel_id'=>['nullable','integer','exists:ecosystem_channels,id'],'ecosystem_module_id'=>['required','integer','exists:ecosystem_modules,id'],'environment'=>['required',Rule::in(self::ENVIRONMENTS)],'assignment_type'=>['required',Rule::in(['direct','inherited','override'])],'status'=>['required',Rule::in(self::STATUSES)]]); }
    private function validateHierarchy(array $data,bool $capability): void { if($capability){$module=DB::table('ecosystem_module_assignments')->where('id',$data['module_assignment_id'])->value('ecosystem_module_id');$supported=DB::table('ecosystem_capabilities')->where('id',$data['capability_id'])->where('ecosystem_module_id',$module)->exists();if(!$supported)throw ValidationException::withMessages(['capability_id'=>'Capability is not supported by the assigned module.']);return;} if(!empty($data['business_unit_id'])&&!DB::table('ecosystem_business_units')->where('id',$data['business_unit_id'])->where('company_profile_id',$data['company_profile_id'])->exists())throw ValidationException::withMessages(['business_unit_id'=>'Business unit does not belong to the selected tenant.']);if(!empty($data['channel_id'])&&!DB::table('ecosystem_channels')->where('id',$data['channel_id'])->where('business_unit_id',$data['business_unit_id'])->exists())throw ValidationException::withMessages(['channel_id'=>'Channel does not belong to the selected business unit.']); }
    private function audit(Request $r,string $type,int $id,string $action,?array $before,?array $after): void { DB::table('ecosystem_assignment_audits')->insert(['entity_type'=>$type,'entity_id'=>$id,'action'=>$action,'actor_id'=>$r->user()->id,'before'=>$before?json_encode($before):null,'after'=>$after?json_encode($after):null,'ip_address'=>$r->ip(),'created_at'=>now()]); }
    private function activity(bool $capability){return DB::table('ecosystem_assignment_audits')->where('entity_type',$capability?'capability_assignment':'module_assignment')->leftJoin('users','users.id','=','ecosystem_assignment_audits.actor_id')->orderByDesc('ecosystem_assignment_audits.created_at')->limit(10)->get(['ecosystem_assignment_audits.id','action','entity_id','users.name as actor','ecosystem_assignment_audits.created_at']);}
}
