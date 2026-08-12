<?php

namespace App\Services\Admin;

use App\Models\Payout;
use App\Models\User;
use App\Repositories\Admin\SupplierPayablesRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class SupplierPayablesService
{
    public function __construct(private readonly SupplierPayablesRepository $repo) {}

    public function overview(array $f, array $permissions): array
    {
        $now=$this->repo->aggregates($f); $days=$f['from']->diffInDays($f['to'])+1;
        $prior=[...$f,'to'=>$f['from']->subSecond(),'from'=>$f['from']->subDays($days)]; $before=$this->repo->aggregates($prior);
        foreach (['total_count','gross','net','paid','outstanding','pending_count','approved_count','processing_count','failed_count','paid_count'] as $field) { $now->{$field} ??= 0; $before->{$field} ??= 0; }
        $metric=function(string $key,string $label,float|int $value,float|int $old,array $spark=[],?string $reason=null) use($f){return ['key'=>$key,'label'=>$label,'value'=>(string)$value,'currency'=>str_contains($key,'count')?null:$f['currency'],'comparisonPercentage'=>(float)$old===0.0?null:round(((float)$value-(float)$old)/abs((float)$old)*100,2),'direction'=>(float)$value=== (float)$old?'flat':((float)$value>(float)$old?'up':'down'),'sparkline'=>$spark,'available'=>$reason===null,'reason'=>$reason,'updatedAt'=>now()->toIso8601String()];};
        $trend=$this->repo->daily($f); $spark=array_map(fn($x)=>(float)$x['payables'],$trend);
        $kpis=[
            $metric('total','Total Supplier Payable',$now->net,$before->net,$spark),
            $metric('due_this_week','Payables Due This Week',0,0,[],'supplier_payable_due_date_not_present'),
            $metric('overdue','Overdue Payables',0,0,[],'supplier_payable_due_date_not_present'),
            $metric('pending_review_count','Pending Review',0,0,[],'payable_review_workflow_not_present'),
            $metric('pending_approval_count','Pending Approval',$now->pending_count,$before->pending_count),
            $metric('scheduled','Scheduled for Payment',$now->approved_count+$now->processing_count,$before->approved_count+$before->processing_count),
            $metric('hold_count','Payables on Hold',0,0,[],'payable_hold_domain_not_present'),
            $metric('paid','Paid This Period',$now->paid,$before->paid),
            $metric('match_exception_count','Invoice Match Exceptions',0,0,[],'purchase_order_goods_receipt_domain_not_present'),
            $metric('dispute_count','Supplier Disputes Open',0,0,[],'supplier_dispute_domain_not_present'),
            $metric('reconciliation_count','Reconciliation Exceptions',0,0,[],'reconciliation_domain_not_present'),
            $metric('sla_breach_count','Payable SLA Breaches',0,0,[],'payable_sla_policy_not_present'),
        ];
        $statuses=$this->repo->statuses($f); $total=array_sum(array_column($statuses,'amount'));
        foreach($statuses as &$s){$s['percentage']=$total?(round($s['amount']/$total*100,2)):0;}
        $alerts=[]; if($now->failed_count>0)$alerts[]=['id'=>'failed','severity'=>'High','message'=>$now->failed_count.' failed supplier payouts require review','status'=>'failed'];
        return ['source'=>'database','context'=>['tenant'=>'SL Beauty','tenantScopeAvailable'=>false,'currency'=>$f['currency'],'dateFrom'=>$f['from']->toDateString(),'dateTo'=>$f['to']->toDateString()],'kpis'=>$kpis,'trend'=>['interval'=>'day','currency'=>$f['currency'],'items'=>$trend],'typeDistribution'=>['totalCount'=>(int)$now->total_count,'totalAmount'=>(string)$now->net,'items'=>[['type'=>'Supplier Settlement','count'=>(int)$now->total_count,'amount'=>(string)$now->net,'percentage'=>$now->total_count?100:0]]],'statusSummary'=>$statuses,'health'=>['score'=>null,'status'=>'unknown','reason'=>'supplier_payable_quality_rules_not_configured','items'=>[]],'alerts'=>$alerts,'financialSummary'=>['gross'=>(string)$now->gross,'net'=>(string)$now->net,'paid'=>(string)$now->paid,'outstanding'=>(string)$now->outstanding,'currency'=>$f['currency']],'queues'=>['pendingApproval'=>(int)$now->pending_count,'scheduled'=>(int)($now->approved_count+$now->processing_count),'failed'=>(int)$now->failed_count],'operationalCards'=>[],'capabilities'=>['settlements'=>true,'payouts'=>true,'approval'=>true,'scheduling'=>true,'invoiceMatching'=>false,'holds'=>false,'disputes'=>false,'reconciliation'=>false,'tenantScope'=>false],'permissions'=>$permissions,'updatedAt'=>now()->toIso8601String(),'refreshIntervalSeconds'=>30];
    }

    public function index(array $f,array $permissions): array
    {
        $p=$this->repo->page($f); return ['items'=>collect($p->items())->map(fn($r)=>$this->row($r))->all(),'meta'=>['page'=>$p->currentPage(),'perPage'=>$p->perPage(),'total'=>$p->total(),'lastPage'=>$p->lastPage()],'permissions'=>$permissions];
    }

    public function detail(string $ref,array $permissions): ?array
    {
        $r=$this->repo->find($ref); if(!$r)return null; $row=$this->row($r);
        return $row+['periodStart'=>$r->period_start,'periodEnd'=>$r->period_end,'supplierCountry'=>$r->supplier_country,'approvedBy'=>$r->approver,'approvedAt'=>$r->approved_at,'processedAt'=>$r->processed_at,'paidAt'=>$r->paid_at,'failureReason'=>$r->failure_reason,'paymentReference'=>$r->payment_reference,'calculation'=>['gross'=>(string)$r->gross_amount,'commission'=>(string)$r->commission_amount,'refundAdjustment'=>(string)$r->refund_adjustment,'otherAdjustments'=>(string)$r->other_adjustments,'net'=>(string)$r->net_amount,'authoritativeSource'=>'supplier_settlements'],'availability'=>['invoice'=>false,'purchaseOrder'=>false,'goodsReceipt'=>false,'taxWithholding'=>false,'disputes'=>false,'reconciliation'=>false],'permissions'=>$permissions];
    }

    public function transition(string $ref,string $to,int $actor,?string $reason): array
    {
        return DB::transaction(function()use($ref,$to,$actor,$reason){$settlement=DB::table('supplier_settlements')->whereNull('deleted_at')->where(fn($q)=>$q->where('settlement_number',$ref)->orWhere('uuid',$ref)->orWhere('id',$ref))->lockForUpdate()->first(); if(!$settlement)abort(404);
            $payout=Payout::where('supplier_settlement_id',$settlement->id)->lockForUpdate()->first(); if(!$payout)throw ValidationException::withMessages(['payable'=>'A payout schedule does not exist for this settlement.']);
            if(!$payout->canTransitionTo($to))abort(409,'Invalid or already completed payable transition.'); $old=$payout->status;
            $fields=['status'=>$to]; if($to==='approved')$fields+=['approved_by'=>$actor,'approved_at'=>now()]; if($to==='processing')$fields+=['processed_at'=>now()]; $payout->update($fields);
            $user=User::find($actor); $log=activity()->performedOn($payout)->withProperties(['old_status'=>$old,'new_status'=>$to,'reason'=>$reason]); if($user)$log->causedBy($user); $log->log('supplier_payable.'.$to);
            return ['success'=>true,'message'=>'Supplier payable updated.','data'=>$this->detail($ref,[])];});
    }

    private function row(object $r): array
    {
        $status=$r->payout_status??$r->settlement_status; return ['id'=>(string)$r->reference,'reference'=>(string)$r->reference,'payableType'=>'Supplier Settlement','supplierName'=>$r->supplier,'supplierId'=>(string)$r->supplier_id,'supplierTier'=>'Not available','invoiceRef'=>null,'poRef'=>null,'grRef'=>null,'businessUnit'=>'Not available','channel'=>'Not available','currency'=>$r->currency,'grossAmount'=>(string)$r->gross_amount,'discounts'=>'0.00','credits'=>'0.00','returnsDeduction'=>(string)$r->refund_adjustment,'commissionOffset'=>(string)$r->commission_amount,'marketplaceFees'=>'0.00','taxAmount'=>null,'withholdingTax'=>null,'netPayable'=>(string)$r->net_amount,'paidAmount'=>$status==='paid'?(string)$r->net_amount:'0.00','outstandingAmount'=>$status==='paid'?'0.00':(string)$r->net_amount,'matchStatus'=>'Not available','approvalStatus'=>$status==='approved'?'Approved':($status==='pending'?'Pending Approval':'Not available'),'dueStatus'=>'Not available','dueDate'=>$r->period_end,'paymentSchedule'=>in_array($status,['approved','processing','paid'])?'Scheduled':'Unscheduled','payoutStatus'=>ucfirst($status),'hold'=>'Not available','dispute'=>'Not available','reconciliationStatus'=>'Not available','exceptionReason'=>$status==='failed'?($r->failure_reason??'Payout failed'):null,'owner'=>'Not available','updatedAt'=>$r->updated_at];
    }
}
