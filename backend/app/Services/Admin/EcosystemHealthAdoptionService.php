<?php

namespace App\Services\Admin;

use Illuminate\Database\Query\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EcosystemHealthAdoptionService
{
    public function dashboard(Request $request): array
    {
        $modules=$this->query($request); $total=(clone$modules)->count(); $latest=$this->latestChecks();
        $monitored=collect($latest)->count(); $states=collect($latest)->countBy(fn($x)=>$this->state($x->status));
        $usage=DB::table('ecosystem_module_usage_daily')->where('metric_date','>=',now()->subDays(30)->toDateString());
        $eligible=DB::table('ecosystem_module_assignments')->whereNull('deleted_at')->where('status','active')->distinct()->count('company_profile_id');
        $active=(clone$usage)->where('transactions','>',0)->whereNotNull('company_profile_id')->distinct()->count('company_profile_id');
        $adoption=$eligible>0?round($active/$eligible*100,1):null;
        $incidents=DB::table('ecosystem_module_incidents')->where('status','open');
        return ['context'=>['monitoringStatus'=>$monitored?'health_check_records_available':'telemetry_not_configured','telemetrySource'=>'ecosystem_module_health_checks','usageSource'=>'ecosystem_module_usage_daily','lastEvaluated'=>collect($latest)->max('checked_at')],
            'summary'=>['registered'=>$total,'operational'=>$states['operational']??0,'degraded'=>$states['degraded']??0,'critical'=>$states['critical']??0,'unknown'=>max(0,$total-$monitored),'monitored'=>$monitored,
                'availability'=>null,'errorRate'=>null,'latency'=>null,'throughput'=>null,'healthScore'=>null,'adoptionRate'=>$adoption,'eligibleTenants'=>$eligible,'activeTenants'=>$active,'openIncidents'=>(clone$incidents)->count()],
            'healthStatus'=>$monitored?($states['critical']??0?'critical':(($states['degraded']??0)?'warning':'healthy')):'not_evaluated',
            'operationalSummary'=>['operational'=>$states['operational']??0,'degraded'=>$states['degraded']??0,'critical'=>$states['critical']??0,'unknown'=>max(0,$total-$monitored),'openIncidents'=>(clone$incidents)->count()],
            'adoptionSummary'=>$this->adoptionSummary(),'environmentHealth'=>$this->environmentHealth(),'incidents'=>(clone$incidents)->latest('opened_at')->limit(10)->get(),
            'activity'=>DB::table('ecosystem_module_status_history as h')->join('ecosystem_modules as m','m.id','=','h.ecosystem_module_id')->leftJoin('users as u','u.id','=','h.actor_id')->latest('h.created_at')->limit(12)->get(['h.id','m.name as module','h.event_type','h.to_status','u.name as actor','h.created_at']),
            'permissions'=>['canView'=>$request->user()->hasPermission('ecosystem.modules.view'),'canExport'=>$request->user()->hasPermission('ecosystem.modules.view')], 'generatedAt'=>now()->toIso8601String()];
    }

    public function registry(Request $request): mixed
    {
        $q=$this->query($request)->select('m.id','m.module_key','m.name','m.category','m.health_status','m.primary_owner','m.technical_owner','m.environment')
            ->selectSub(fn($x)=>$x->from('ecosystem_module_health_checks')->whereColumn('ecosystem_module_id','m.id')->latest('checked_at')->limit(1)->select('status'),'latest_status')
            ->selectSub(fn($x)=>$x->from('ecosystem_module_health_checks')->whereColumn('ecosystem_module_id','m.id')->latest('checked_at')->limit(1)->select('response_time_ms'),'response_time_ms')
            ->selectSub(fn($x)=>$x->from('ecosystem_module_health_checks')->whereColumn('ecosystem_module_id','m.id')->latest('checked_at')->limit(1)->select('checked_at'),'checked_at')
            ->selectSub(fn($x)=>$x->from('ecosystem_module_usage_daily')->whereColumn('ecosystem_module_id','m.id')->where('metric_date','>=',now()->subDays(30)->toDateString())->selectRaw('SUM(transactions)'),'transactions')
            ->selectSub(fn($x)=>$x->from('ecosystem_module_usage_daily')->whereColumn('ecosystem_module_id','m.id')->where('metric_date','>=',now()->subDays(30)->toDateString())->selectRaw('SUM(active_users)'),'active_users');
        $sort=$request->validate(['sort'=>['nullable','in:name,category,health_status,updated_at'],'direction'=>['nullable','in:asc,desc'],'per_page'=>['nullable','integer','between:1,100']]);
        return $q->orderBy('m.'.($sort['sort']??'name'),$sort['direction']??'asc')->paginate($sort['per_page']??20);
    }

    public function trends(Request $request): array
    {
        $days=min(90,max(1,(int)$request->integer('days',30)));
        return DB::table('ecosystem_module_health_checks')->where('checked_at','>=',now()->subDays($days))->selectRaw('DATE(checked_at) as date, COUNT(*) as checks, SUM(CASE WHEN status IN (\'healthy\',\'operational\',\'ok\') THEN 1 ELSE 0 END) as successful, AVG(response_time_ms) as averageLatencyMs')->groupByRaw('DATE(checked_at)')->orderBy('date')->get()->map(fn($x)=>['date'=>$x->date,'checks'=>(int)$x->checks,'availability'=>$x->checks?round($x->successful/$x->checks*100,3):null,'averageLatencyMs'=>$x->averageLatencyMs!==null?round($x->averageLatencyMs,1):null,'errorRate'=>null,'throughput'=>null])->all();
    }

    private function query(Request $request): Builder
    { $q=DB::table('ecosystem_modules as m')->whereNull('m.deleted_at');if($request->filled('search')){$s='%'.$request->search.'%';$q->where(fn($x)=>$x->where('m.name','like',$s)->orWhere('m.module_key','like',$s));}foreach(['category','environment','health_status'] as $f)if($request->filled($f))$q->where('m.'.$f,$request->$f);return $q; }
    private function latestChecks(): array
    { return DB::table('ecosystem_module_health_checks as h')->joinSub(DB::table('ecosystem_module_health_checks')->selectRaw('ecosystem_module_id, MAX(checked_at) checked_at')->groupBy('ecosystem_module_id'),'latest',fn($j)=>$j->on('latest.ecosystem_module_id','=','h.ecosystem_module_id')->on('latest.checked_at','=','h.checked_at'))->get(['h.ecosystem_module_id','h.status','h.checked_at'])->all(); }
    private function state(string $status): string
    { return in_array($status,['healthy','operational','ok'],true)?'operational':(in_array($status,['critical','down','failed'],true)?'critical':'degraded'); }
    private function adoptionSummary(): array
    { $eligible=DB::table('ecosystem_module_assignments')->whereNull('deleted_at')->where('status','active')->selectRaw('ecosystem_module_id, COUNT(DISTINCT company_profile_id) eligible')->groupBy('ecosystem_module_id')->pluck('eligible','ecosystem_module_id');$active=DB::table('ecosystem_module_usage_daily')->where('metric_date','>=',now()->subDays(30)->toDateString())->where('transactions','>',0)->selectRaw('ecosystem_module_id, COUNT(DISTINCT company_profile_id) active')->groupBy('ecosystem_module_id')->pluck('active','ecosystem_module_id');$bands=['high'=>0,'healthy'=>0,'low'=>0,'dormant'=>0,'notEvaluated'=>0];foreach($eligible as$id=>$n){if(!$n){$bands['notEvaluated']++;continue;}$rate=($active[$id]??0)/$n*100;$bands[$rate>=75?'high':($rate>=40?'healthy':($rate>0?'low':'dormant'))]++;}return$bands; }
    private function environmentHealth(): array
    { return DB::table('ecosystem_module_health_checks as h')->join('ecosystem_modules as m','m.id','=','h.ecosystem_module_id')->whereNotNull('m.environment')->selectRaw('m.environment, COUNT(*) checks, MAX(h.checked_at) lastCheckedAt')->groupBy('m.environment')->get()->map(fn($x)=>['environment'=>$x->environment,'checks'=>(int)$x->checks,'lastCheckedAt'=>$x->lastCheckedAt,'status'=>'monitored'])->all(); }
}
