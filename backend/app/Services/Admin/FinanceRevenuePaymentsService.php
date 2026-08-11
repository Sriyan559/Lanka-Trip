<?php

namespace App\Services\Admin;

use App\Repositories\Admin\FinanceCommandCenterRepository;
use App\Repositories\Admin\FinanceRevenuePaymentsRepository;
use Carbon\CarbonImmutable;

class FinanceRevenuePaymentsService
{
    public function __construct(private readonly FinanceRevenuePaymentsRepository $repository, private readonly FinanceCommandCenterRepository $common) {}

    public function revenue(array $filters, array $permissions): array
    {
        $filters['currency'] ??= $this->common->defaultCurrency();
        $totals=$this->repository->revenueTotals($filters['from'],$filters['to'],$filters['currency']); $page=$this->repository->revenueRows($filters);
        $rows=collect($page->items())->map(fn($r)=>$this->revenueRow($r))->all();
        $aging=['0-7'=>0,'8-30'=>0,'31-60'=>0,'61-90'=>0,'90+'=>0]; foreach($rows as $r) $aging[$r['ageingBucket']]+=$r['outstandingAmount'];
        return ['source'=>'database','context'=>$this->context($filters,'Sales, Revenue & Receivables'),'totals'=>$totals,'rows'=>$rows,'aging'=>collect($aging)->map(fn($v,$k)=>['bucket'=>$k,'amount'=>$v])->values()->all(),'alerts'=>$this->revenueAlerts($totals,$filters['currency']),'capabilities'=>['revenueRecognition'=>false,'deferredRevenue'=>false,'reconciliation'=>false,'tenantScope'=>false,'paymentReminders'=>false],'permissions'=>$permissions,'meta'=>$this->meta($page)];
    }

    public function payments(array $filters, array $permissions): array
    {
        $filters['currency'] ??= $this->common->defaultCurrency(); $totals=$this->repository->paymentTotals($filters['from'],$filters['to'],$filters['currency']); $page=$this->repository->paymentRows($filters);
        $rows=collect($page->items())->map(fn($r)=>$this->paymentRow($r))->all(); $statuses=collect($rows)->groupBy('paymentResponse')->map(fn($g,$s)=>['status'=>$s,'count'=>$g->count(),'amount'=>$g->sum('grossAmount')])->values()->all();
        $methods=collect($rows)->groupBy('paymentMethod')->map(fn($g,$s)=>['method'=>$s,'count'=>$g->count(),'amount'=>$g->sum('grossAmount')])->values()->all();
        return ['source'=>'database','context'=>$this->context($filters,'Active Payment Network'),'totals'=>$totals,'rows'=>$rows,'trend'=>$this->repository->daily($filters['from'],$filters['to'],$filters['currency']),'statuses'=>$statuses,'methods'=>$methods,'alerts'=>$this->paymentAlerts($totals),'capabilities'=>['risk'=>false,'duplicates'=>false,'holds'=>false,'settlementLink'=>false,'reconciliation'=>false,'manualEntry'=>false,'tenantScope'=>false],'permissions'=>$permissions,'meta'=>$this->meta($page)];
    }

    private function revenueRow(object $r): array
    {
        $days=$r->due_date ? max(0,CarbonImmutable::parse($r->due_date)->diffInDays(today(),false)) : 0; $bucket=$days<=7?'0-7':($days<=30?'8-30':($days<=60?'31-60':($days<=90?'61-90':'90+')));
        $recv=$r->dispute_id?'Disputed':((float)$r->balance_due<=0?'Current':($days>0?'Overdue':((float)$r->amount_paid>0?'Partially Paid':'Due Soon')));
        return ['ref'=>'REV-'.$r->id,'relatedOrder'=>$r->order_number,'invoiceRef'=>$r->invoice_number,'customerAccount'=>$r->customer ?: 'Not available','accountType'=>'Customer','bu'=>'Marketplace','channel'=>$r->order_source ?: 'Not available','currency'=>$r->currency,'gmv'=>(float)$r->gmv,'grossSales'=>(float)$r->subtotal,'discounts'=>(float)$r->discount_amount,'tax'=>(float)$r->tax_amount,'fees'=>0,'refunds'=>0,'netSales'=>max(0,(float)$r->subtotal-(float)$r->discount_amount),'recognizedRevenue'=>null,'deferredRevenue'=>null,'receivableAmount'=>(float)$r->total_amount,'collectedAmount'=>(float)$r->amount_paid,'outstandingAmount'=>(float)$r->balance_due,'revenueStatus'=>'Not available','receivableStatus'=>$recv,'ageingBucket'=>$bucket,'dueDate'=>$r->due_date,'collectionStatus'=>(float)$r->balance_due<=0?'Collected':((float)$r->amount_paid>0?'Partially Paid':($days>0?'Overdue':'Pending')),'reconciliationStatus'=>'Not available','exceptionStatus'=>$r->dispute_id?'High':'None','approvalStatus'=>ucfirst($r->approval_status ?: 'Pending'),'owner'=>'Not assigned','operator'=>'Database'];
    }

    private function paymentRow(object $r): array
    {
        $status=strtolower((string)$r->payment_status); $success=in_array($status,['paid','captured','completed','success'],true); $failed=in_array($status,['failed','declined'],true);
        return ['id'=>(string)$r->id,'ref'=>$r->payment_number,'relatedOrder'=>$r->order_number,'invoiceRef'=>$r->invoice_number ?: 'Not linked','customer'=>$r->customer ?: 'Not available','customerId'=>'Not available','currency'=>$r->currency,'grossAmount'=>(float)$r->amount,'capturedAmount'=>$success?(float)$r->amount:0,'paymentMethod'=>$r->payment_method ?: 'Not available','gateway'=>'Not available','authStatus'=>$r->authorized_at?'Authorized':($failed?'Failed':($success?'Authorized':'Pending')),'captureStatus'=>$success?'Captured':($failed?'Failed':'Pending'),'paymentResponse'=>$success?'Success':($status==='declined'?'Declined':($failed?'Failed':'Pending')),'riskLevel'=>'Not available','duplicateStatus'=>'Not available','hold'=>'Not available','settlementStatus'=>'Not available','reconciliationStatus'=>'Not available','sla'=>'Not available','txnDate'=>(string)$r->created_at,'settlementDate'=>$r->paid_at,'owner'=>'Not assigned','reviewer'=>'Not assigned','providerRef'=>$r->gateway_reference ?: 'Not available','updatedAt'=>(string)$r->updated_at];
    }

    private function context(array $f,string $scope): array { return ['tenant'=>'SL Beauty','ecosystem'=>'Beauty Marketplace','businessUnit'=>'All Business Units','salesChannel'=>'All Channels','region'=>'Sri Lanka','baseCurrency'=>$f['currency'],'currencies'=>$this->common->currencies(),'scope'=>$scope,'accountingPeriod'=>$f['from']->format('M Y'),'dateRange'=>$f['from']->toDateString().' – '.$f['to']->toDateString(),'liveData'=>true,'dataCompleteness'=>100,'lastSynced'=>now()->toIso8601String(),'periodState'=>'Open','accessNotice'=>'Admin-wide scope; tenant ownership is not present in the finance schema']; }
    private function meta($p): array { return ['page'=>$p->currentPage(),'perPage'=>$p->perPage(),'total'=>$p->total(),'lastPage'=>$p->lastPage(),'generatedAt'=>now()->toIso8601String()]; }
    private function revenueAlerts(array $t,string $c): array { $a=[]; if($t['overdue']>0)$a[]=['id'=>'overdue','severity'=>'High','message'=>$c.' '.number_format($t['overdue'],2).' overdue receivables']; if($t['disputed']>0)$a[]=['id'=>'disputed','severity'=>'High','message'=>$c.' '.number_format($t['disputed'],2).' disputed receivables']; return $a; }
    private function paymentAlerts(array $t): array { $a=[]; if($t['failed']>0)$a[]=['id'=>'failed','severity'=>'High','message'=>number_format($t['failed']).' failed payments require review']; if($t['pending']>0)$a[]=['id'=>'pending','severity'=>'Medium','message'=>number_format($t['pending']).' payments await completion']; return $a; }
}
