<?php

namespace App\Repositories\Admin;

use Carbon\CarbonImmutable;
use Illuminate\Database\Query\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

class SupplierPayablesRepository
{
    public function query(array $f): Builder
    {
        return DB::table('supplier_settlements as ss')->join('suppliers as s','s.id','=','ss.supplier_id')
            ->leftJoin('payouts as p',fn($j)=>$j->on('p.supplier_settlement_id','=','ss.id')->whereNull('p.deleted_at'))
            ->whereNull('ss.deleted_at')->where('ss.currency',$f['currency'])
            ->whereBetween('ss.period_end',[$f['from']->toDateString(),$f['to']->toDateString()])
            ->when($f['status'],fn($q,$v)=>$q->where(DB::raw('COALESCE(p.status,ss.status)'),$v))
            ->when($f['supplierId'],fn($q,$v)=>$q->where('ss.supplier_id',$v))
            ->when($f['search'],function($q,$v){$like='%'.$v.'%';$q->where(fn($x)=>$x->where('ss.settlement_number','like',$like)->orWhere('s.company_name','like',$like)->orWhere('p.payout_number','like',$like));});
    }

    public function page(array $f): LengthAwarePaginator
    {
        $sort=['reference'=>'ss.settlement_number','supplier'=>'s.company_name','grossAmount'=>'ss.gross_amount','netAmount'=>'ss.net_amount','status'=>'ss.status','dueDate'=>'ss.period_end','updatedAt'=>'ss.updated_at'][$f['sort']];
        return $this->query($f)->selectRaw("ss.id,ss.settlement_number reference,ss.supplier_id,s.company_name supplier,s.status supplier_status,ss.currency,ss.gross_amount,ss.commission_amount,ss.refund_adjustment,ss.other_adjustments,ss.net_amount,ss.status settlement_status,ss.period_start,ss.period_end,ss.created_at,ss.updated_at,p.id payout_id,p.payout_number,p.status payout_status,p.approved_at,p.paid_at,p.payment_reference")
            ->orderBy($sort,$f['direction'])->paginate($f['perPage'],['*'],'page',$f['page']);
    }

    public function find(string $reference): ?object
    {
        return DB::table('supplier_settlements as ss')->join('suppliers as s','s.id','=','ss.supplier_id')
            ->leftJoin('payouts as p',fn($j)=>$j->on('p.supplier_settlement_id','=','ss.id')->whereNull('p.deleted_at'))
            ->leftJoin('users as u','u.id','=','p.approved_by')->whereNull('ss.deleted_at')
            ->where(fn($q)=>$q->where('ss.settlement_number',$reference)->orWhere('ss.uuid',$reference)->orWhere('ss.id',$reference))
            ->selectRaw('ss.*,ss.settlement_number reference,ss.status settlement_status,s.company_name supplier,s.status supplier_status,s.country supplier_country,p.id payout_id,p.payout_number,p.status payout_status,p.approved_at,p.processed_at,p.paid_at,p.failed_at,p.failure_reason,p.payment_reference,u.name approver')->first();
    }

    public function aggregates(array $f): object
    {
        return $this->query($f)->selectRaw("COUNT(*) total_count,COALESCE(SUM(ss.gross_amount),0) gross,COALESCE(SUM(ss.net_amount),0) net,COALESCE(SUM(CASE WHEN p.status='paid' THEN ss.net_amount ELSE 0 END),0) paid,COALESCE(SUM(CASE WHEN p.status IS NULL OR p.status NOT IN ('paid','cancelled','reversed') THEN ss.net_amount ELSE 0 END),0) outstanding,SUM(CASE WHEN COALESCE(p.status,ss.status)='pending' THEN 1 ELSE 0 END) pending_count,SUM(CASE WHEN p.status='approved' THEN 1 ELSE 0 END) approved_count,SUM(CASE WHEN p.status='processing' THEN 1 ELSE 0 END) processing_count,SUM(CASE WHEN p.status='failed' THEN 1 ELSE 0 END) failed_count,SUM(CASE WHEN p.status='paid' THEN 1 ELSE 0 END) paid_count")->first();
    }

    public function daily(array $f): array
    {
        return $this->query($f)->groupBy('ss.period_end')->orderBy('ss.period_end')->selectRaw("ss.period_end date,COALESCE(SUM(ss.net_amount),0) payables,COALESCE(SUM(CASE WHEN p.status='paid' THEN ss.net_amount ELSE 0 END),0) payments,COALESCE(SUM(CASE WHEN p.status IN ('approved','processing') THEN ss.net_amount ELSE 0 END),0) scheduled")->get()->map(fn($r)=>(array)$r)->all();
    }

    public function statuses(array $f): array
    {
        return $this->query($f)->groupByRaw('COALESCE(p.status,ss.status)')->selectRaw("COALESCE(p.status,ss.status) status,COUNT(*) count,COALESCE(SUM(ss.net_amount),0) amount")->get()->map(fn($r)=>(array)$r)->all();
    }
}
