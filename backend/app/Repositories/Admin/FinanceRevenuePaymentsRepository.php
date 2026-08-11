<?php

namespace App\Repositories\Admin;

use Carbon\CarbonImmutable;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

class FinanceRevenuePaymentsRepository
{
    private const SUCCESS = ['paid', 'captured', 'completed', 'success'];
    private const FAILED = ['failed', 'declined'];

    public function revenueTotals(CarbonImmutable $from, CarbonImmutable $to, string $currency): array
    {
        $orders = DB::table('orders')->whereNull('deleted_at')->where('currency', $currency)->whereBetween('created_at', [$from, $to])
            ->selectRaw('COALESCE(SUM(total_amount),0) gmv, COALESCE(SUM(subtotal),0) gross_sales, COALESCE(SUM(discount_amount),0) discounts')->first();
        $invoices = DB::table('invoices as i')->join('orders as o', 'o.id', '=', 'i.order_id')->whereNull('i.deleted_at')->whereNull('o.deleted_at')->where('o.currency', $currency)->whereBetween('i.created_at', [$from, $to])
            ->selectRaw('COALESCE(SUM(i.total_amount),0) invoiced, COALESCE(SUM(i.amount_paid),0) collected, COALESCE(SUM(i.balance_due),0) outstanding, COALESCE(SUM(CASE WHEN i.due_date < ? AND i.balance_due > 0 THEN i.balance_due ELSE 0 END),0) overdue', [now()->toDateString()])->first();
        $refunds = DB::table('payment_refunds as r')->join('payments as p', 'p.id', '=', 'r.payment_id')->join('orders as o', 'o.id', '=', 'p.order_id')->whereNull('r.deleted_at')->whereNull('p.deleted_at')->whereNull('o.deleted_at')->where('o.currency', $currency)->whereBetween('r.created_at', [$from, $to])->whereIn('r.status', ['processed','completed','approved','refunded'])->sum('r.amount');
        $activeDisputes=DB::table('order_disputes')->whereNull('deleted_at')->whereNotIn('status',['resolved','closed'])->select('order_id')->distinct();
        $disputed = DB::query()->fromSub(DB::table('invoices as i')->join('orders as o','o.id','=','i.order_id')->joinSub($activeDisputes,'d','d.order_id','=','o.id')->whereNull('i.deleted_at')->whereNull('o.deleted_at')->where('o.currency',$currency)->whereBetween('i.created_at',[$from,$to])->select(['i.id','i.balance_due'])->distinct(),'disputed_invoices')->sum('balance_due');
        return ['gmv'=>(float)$orders->gmv,'grossSales'=>(float)$orders->gross_sales,'discounts'=>(float)$orders->discounts,'refunds'=>(float)$refunds,'netSales'=>max(0,(float)$orders->gross_sales-(float)$orders->discounts-(float)$refunds),'invoiced'=>(float)$invoices->invoiced,'collections'=>(float)$invoices->collected,'outstanding'=>(float)$invoices->outstanding,'overdue'=>(float)$invoices->overdue,'disputed'=>(float)$disputed];
    }

    public function revenueRows(array $filters): LengthAwarePaginator
    {
        $activeDisputes=DB::table('order_disputes')->whereNull('deleted_at')->whereNotIn('status',['resolved','closed'])->selectRaw('order_id, MIN(id) id')->groupBy('order_id');
        $q = DB::table('invoices as i')->join('orders as o','o.id','=','i.order_id')->leftJoin('users as u','u.id','=','o.buyer_id')->leftJoinSub($activeDisputes,'d','d.order_id','=','o.id')
            ->whereNull('i.deleted_at')->whereNull('o.deleted_at')->where('o.currency',$filters['currency'])->whereBetween('i.created_at',[$filters['from'],$filters['to']])
            ->select(['i.id','i.invoice_number','i.invoice_date','i.due_date','i.total_amount','i.amount_paid','i.balance_due','i.payment_status','i.status as invoice_status','i.updated_at','o.order_number','o.order_source','o.currency','o.total_amount as gmv','o.subtotal','o.discount_amount','o.tax_amount','o.approval_status','u.name as customer','d.id as dispute_id']);
        if ($filters['search'] ?? null) { $term='%'.addcslashes($filters['search'],'%_').'%'; $q->where(fn($x)=>$x->where('i.invoice_number','like',$term)->orWhere('o.order_number','like',$term)->orWhere('u.name','like',$term)); }
        if ($filters['status'] ?? null) $q->where('i.payment_status',$filters['status']);
        return $q->distinct()->orderByDesc('i.created_at')->paginate($filters['perPage'],['*'],'page',$filters['page']);
    }

    public function paymentTotals(CarbonImmutable $from, CarbonImmutable $to, string $currency): array
    {
        $p = DB::table('payments as p')->join('orders as o','o.id','=','p.order_id')->whereNull('p.deleted_at')->whereNull('o.deleted_at')->where('o.currency',$currency)->whereBetween('p.created_at',[$from,$to])
            ->selectRaw("COUNT(*) attempts, SUM(CASE WHEN p.authorized_at IS NOT NULL OR p.payment_status='authorized' THEN 1 ELSE 0 END) authorized, SUM(CASE WHEN p.payment_status IN ('paid','captured','completed','success') THEN 1 ELSE 0 END) successful, COALESCE(SUM(CASE WHEN p.payment_status IN ('paid','captured','completed','success') THEN p.amount ELSE 0 END),0) captured, SUM(CASE WHEN p.payment_status IN ('failed','declined') THEN 1 ELSE 0 END) failed, COALESCE(SUM(CASE WHEN p.payment_status IN ('failed','declined') THEN p.amount ELSE 0 END),0) failed_value, SUM(CASE WHEN p.payment_status IN ('pending','pending_capture','authorized') THEN 1 ELSE 0 END) pending, SUM(CASE WHEN p.payment_status IN ('reversed','voided') THEN 1 ELSE 0 END) reversed, COALESCE(SUM(p.fee_amount),0) fees")->first();
        $refunds = DB::table('payment_refunds as r')->join('payments as p','p.id','=','r.payment_id')->join('orders as o','o.id','=','p.order_id')->whereNull('r.deleted_at')->whereNull('p.deleted_at')->whereNull('o.deleted_at')->where('o.currency',$currency)->whereBetween('r.created_at',[$from,$to])->whereIn('r.status',['processed','completed','approved','refunded'])->selectRaw('COUNT(*) count, COALESCE(SUM(r.amount),0) amount')->first();
        return ['attempts'=>(int)$p->attempts,'authorized'=>(int)$p->authorized,'successful'=>(int)$p->successful,'captured'=>(float)$p->captured,'failed'=>(int)$p->failed,'failedValue'=>(float)$p->failed_value,'pending'=>(int)$p->pending,'reversed'=>(int)$p->reversed,'fees'=>(float)$p->fees,'refundCount'=>(int)$refunds->count,'refundAmount'=>(float)$refunds->amount];
    }

    public function paymentRows(array $filters): LengthAwarePaginator
    {
        $q = DB::table('payments as p')->join('orders as o','o.id','=','p.order_id')->leftJoin('invoices as i','i.id','=','p.invoice_id')->leftJoin('users as u','u.id','=','p.payer_user_id')->leftJoin('payment_methods as pm','pm.id','=','p.payment_method_id')
            ->whereNull('p.deleted_at')->whereNull('o.deleted_at')->where('o.currency',$filters['currency'])->whereBetween('p.created_at',[$filters['from'],$filters['to']])
            ->select(['p.id','p.payment_number','p.amount','p.fee_amount','p.status','p.payment_status','p.gateway_reference','p.authorized_at','p.paid_at','p.failed_at','p.created_at','p.updated_at','o.order_number','o.currency','i.invoice_number','u.name as customer','pm.name as payment_method','pm.method_type as payment_method_type']);
        if ($filters['search'] ?? null) { $term='%'.addcslashes($filters['search'],'%_').'%'; $q->where(fn($x)=>$x->where('p.payment_number','like',$term)->orWhere('o.order_number','like',$term)->orWhere('i.invoice_number','like',$term)->orWhere('u.name','like',$term)); }
        if ($filters['status'] ?? null) $q->where('p.payment_status',$filters['status']);
        return $q->orderByDesc('p.created_at')->paginate($filters['perPage'],['*'],'page',$filters['page']);
    }

    public function daily(CarbonImmutable $from, CarbonImmutable $to, string $currency): array
    {
        return DB::table('payments as p')->join('orders as o','o.id','=','p.order_id')->whereNull('p.deleted_at')->whereNull('o.deleted_at')->where('o.currency',$currency)->whereBetween('p.created_at',[$from,$to])->selectRaw("DATE(p.created_at) period, COUNT(*) attempts, SUM(CASE WHEN p.payment_status IN ('paid','captured','completed','success') THEN 1 ELSE 0 END) success, SUM(CASE WHEN p.payment_status IN ('paid','captured','completed','success') THEN p.amount ELSE 0 END) amount")->groupByRaw('DATE(p.created_at)')->orderBy('period')->get()->map(fn($r)=>(array)$r)->all();
    }
}
