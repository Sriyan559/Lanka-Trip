<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class MarketingOperationsController extends Controller
{
    private const RESOURCES = [
        'audiences' => ['table' => 'marketing_audiences', 'prefix' => 'AUD', 'types' => ['segment', 'behavioral', 'lifecycle', 'campaign', 'suppression']],
        'journeys' => ['table' => 'marketing_journeys', 'prefix' => 'JRN', 'types' => ['automation', 'lifecycle', 'transactional', 'retention', 'conversion']],
        'content' => ['table' => 'marketing_content', 'prefix' => 'CNT', 'types' => ['image', 'video', 'email', 'social', 'web', 'sms', 'document']],
    ];

    public function index(Request $request, string $resource): JsonResponse
    {
        $this->permit($request, 'view'); $config = $this->config($resource);
        $request->validate(['per_page' => ['nullable', 'integer', 'between:1,100'], 'direction' => ['nullable', Rule::in(['asc','desc'])]]);
        $query = $this->query($request, $resource)->leftJoin('users as owners', 'owners.id', '=', $config['table'].'.owner_id')
            ->select($config['table'].'.*', 'owners.name as owner_name');
        $rows = $query->orderBy($config['table'].'.created_at', $request->input('direction', 'desc'))->paginate($request->integer('per_page', 25));
        $base = $this->query($request, $resource);
        $status = (clone $base)->selectRaw('status, count(*) as aggregate')->groupBy('status')->pluck('aggregate', 'status');
        return response()->json(['data' => ['records' => $rows, 'summary' => [
            'total' => (clone $base)->count(), 'status_counts' => $status, 'updated_at' => now()->toIso8601String(),
            'metrics' => $this->metrics($resource, $base),
        ]]]);
    }

    public function show(Request $request, string $resource, string $id): JsonResponse
    {
        $this->permit($request, 'view'); $row = $this->find($resource, $id); abort_unless($row, 404);
        $related = [];
        if ($resource === 'audiences') $related['memberships'] = DB::table('marketing_audience_memberships')->where('audience_id', $row->id)->paginate(25);
        if ($resource === 'journeys') { $related['nodes'] = DB::table('marketing_journey_nodes')->where('journey_id', $row->id)->orderBy('position')->get(); $related['edges'] = DB::table('marketing_journey_edges')->where('journey_id', $row->id)->get(); }
        if ($resource === 'content') $related['links'] = DB::table('marketing_content_links')->where('content_id', $row->id)->get();
        $related['activity'] = DB::table('activity_log')->where('subject_id', $row->id)->where('description', 'like', "marketing_{$resource}.%") ->latest()->limit(25)->get();
        return response()->json(['data' => ['record' => $row] + $related]);
    }

    public function store(Request $request, string $resource): JsonResponse { $this->permit($request, 'create'); return $this->save($request, $resource); }
    public function update(Request $request, string $resource, string $id): JsonResponse { $this->permit($request, 'update'); $row=$this->find($resource,$id); abort_unless($row,404); return $this->save($request,$resource,$row->id); }

    public function transition(Request $request, string $resource, string $id): JsonResponse
    {
        $this->permit($request, 'update'); $row=$this->find($resource,$id); abort_unless($row,404);
        $data=$request->validate(['action'=>['required',Rule::in(['activate','pause','resume','archive','submit','approve','reject','recalculate'])],'reason'=>['nullable','string','max:2000']]);
        $updates=['updated_by'=>$request->user()->id,'updated_at'=>now()];
        if ($data['action']==='recalculate' && $resource==='audiences') $updates['last_recalculated_at']=now();
        elseif (in_array($data['action'],['submit','approve','reject']) && $resource!=='audiences') { if (in_array($data['action'],['approve','reject'])) $this->permit($request,'approve'); $updates['approval_status']=['submit'=>'pending','approve'=>'approved','reject'=>'rejected'][$data['action']]; }
        else $updates['status']=['activate'=>'active','pause'=>'paused','resume'=>'active','archive'=>'archived'][$data['action']] ?? $row->status;
        DB::table(self::RESOURCES[$resource]['table'])->where('id',$row->id)->update($updates);
        activity('admin')->causedBy($request->user())->withProperties(['resource'=>$resource,'id'=>$row->id,'action'=>$data['action'],'reason'=>$data['reason']??null])->log("marketing_{$resource}.status_changed");
        return response()->json(['data'=>['record'=>$this->find($resource,(string)$row->id)]]);
    }

    private function save(Request $request,string $resource,?int $id=null): JsonResponse
    {
        $config=$this->config($resource); $data=$request->validate($this->rules($resource,$id!==null)); $creating=$id===null;
        $id=DB::transaction(function()use($request,$resource,$config,$data,$id,$creating){
            foreach(['rules','trigger_config','metadata'] as $json) if(array_key_exists($json,$data)) $data[$json]=json_encode($data[$json]);
            $data['updated_by']=$request->user()->id; $data['updated_at']=now();
            if($creating){$data['uuid']=(string)Str::uuid();$data['code']=$config['prefix'].'-'.now()->format('Y').'-'.str_pad((string)((DB::table($config['table'])->max('id')??0)+1),5,'0',STR_PAD_LEFT);$data['created_by']=$request->user()->id;$data['created_at']=now();$id=DB::table($config['table'])->insertGetId($data);}else DB::table($config['table'])->where('id',$id)->update($data);
            activity('admin')->causedBy($request->user())->withProperties(['resource'=>$resource,'id'=>$id,'fields'=>array_keys($data)])->log("marketing_{$resource}.".($creating?'created':'updated')); return $id;
        });
        return response()->json(['data'=>['record'=>$this->find($resource,(string)$id)]],$creating?201:200);
    }

    private function query(Request $request,string $resource)
    {
        $table=$this->config($resource)['table']; $q=DB::table($table)->whereNull($table.'.deleted_at');
        $filterable=['status','type','owner_id','business_unit']; if($resource!=='audiences')$filterable[]='approval_status'; if($resource==='content')$filterable[]='rights_state';
        foreach($filterable as $key) if($request->filled($key)&&$request->input($key)!=='All') $q->where($table.'.'.$key,$request->input($key));
        if($request->filled('search')){$s='%'.$request->string('search').'%';$q->where(fn($x)=>$x->where($table.'.name','like',$s)->orWhere($table.'.code','like',$s));}
        return $q;
    }
    private function metrics(string $resource,$query): array
    {
        if($resource==='audiences') return ['eligible'=>(int)(clone$query)->sum('eligible_count'),'marketable'=>(int)(clone$query)->sum('marketable_count'),'suppressed'=>(int)(clone$query)->sum('suppressed_count')];
        if($resource==='journeys') return ['active_customers'=>(int)(clone$query)->sum('active_customers'),'entries'=>(int)(clone$query)->sum('entries'),'completions'=>(int)(clone$query)->sum('completions'),'conversions'=>(int)(clone$query)->sum('conversions'),'revenue'=>(float)(clone$query)->sum('recovered_revenue')];
        return ['impressions'=>(int)(clone$query)->sum('impressions'),'clicks'=>(int)(clone$query)->sum('clicks'),'conversions'=>(int)(clone$query)->sum('conversions'),'revenue'=>(float)(clone$query)->sum('attributed_revenue')];
    }
    private function rules(string $resource,bool $updating): array
    {
        $required=$updating?'sometimes':'required'; $rules=['name'=>[$required,'string','max:180'],'type'=>[$required,'string',Rule::in(self::RESOURCES[$resource]['types'])],'owner_id'=>['nullable','integer','exists:users,id'],'business_unit'=>['nullable','string','max:80']];
        if($resource==='audiences') return $rules+['rules'=>['nullable','array'],'refresh_mode'=>['nullable',Rule::in(['automatic','daily','manual'])]];
        if($resource==='journeys') return $rules+['audience_id'=>['nullable','integer','exists:marketing_audiences,id'],'campaign_id'=>['nullable','integer','exists:marketing_campaigns,id'],'trigger_config'=>['nullable','array'],'starts_at'=>['nullable','date']];
        return $rules+['brand'=>['nullable','string','max:120'],'primary_market'=>['nullable','string','max:80'],'preview_url'=>['nullable','url','max:1000'],'metadata'=>['nullable','array'],'rights_starts_on'=>['nullable','date'],'rights_expires_on'=>['nullable','date','after_or_equal:rights_starts_on']];
    }
    private function find(string $resource,string $id){$table=$this->config($resource)['table'];return DB::table($table)->leftJoin('users as owners','owners.id','=',$table.'.owner_id')->whereNull($table.'.deleted_at')->where(fn($q)=>$q->where($table.'.code',$id)->orWhere($table.'.uuid',$id)->when(ctype_digit($id),fn($x)=>$x->orWhere($table.'.id',(int)$id)))->select($table.'.*','owners.name as owner_name')->first();}
    private function config(string $resource): array { abort_unless(isset(self::RESOURCES[$resource]),404); return self::RESOURCES[$resource]; }
    private function permit(Request $request,string $action): void { abort_unless($request->user()->hasPermission("marketing.{$action}")||$request->user()->hasPermission('admin.dashboard.view'),403); }
}
