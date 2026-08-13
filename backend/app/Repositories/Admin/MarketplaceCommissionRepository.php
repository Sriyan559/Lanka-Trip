<?php

namespace App\Repositories\Admin;

use Carbon\CarbonImmutable;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Pagination\LengthAwarePaginator;

class MarketplaceCommissionRepository
{
    public function capabilities(): array
    {
        return [
            'rules' => Schema::hasTable('commission_rules') || Schema::hasTable('marketplace_commission_rules'),
            'settlements' => Schema::hasTable('supplier_settlements'),
        ];
    }

    public function defaultCurrency(): ?string
    {
        if (! Schema::hasTable('system_settings')) {
            return null;
        }
        $value = DB::table('system_settings')->where('setting_key', 'commerce.default_currency')->where('status', 'active')->value('config_value');

        return is_string($value) ? json_decode($value, true) : null;
    }

    public function currencies(): array
    {
        return Schema::hasTable('currencies')
            ? DB::table('currencies')->where('status', 'active')->orderBy('code')->pluck('code')->all()
            : [];
    }

    public function financialSummary(CarbonImmutable $from, CarbonImmutable $to, string $currency): array
    {
        $query = DB::table('supplier_settlements')->whereNull('deleted_at')->where('currency', $currency)
            ->whereDate('period_end', '>=', $from->toDateString())->whereDate('period_end', '<=', $to->toDateString());
        $row = (clone $query)->selectRaw('COALESCE(SUM(commission_amount), 0) AS commission_revenue, COUNT(*) AS settlement_count')->first();
        $pending = (clone $query)->whereIn('status', ['draft', 'pending', 'approved'])->selectRaw('COALESCE(SUM(net_amount), 0) AS amount')->first();

        return [
            'commissionRevenue' => $this->decimal($row?->commission_revenue),
            'pendingSettlementImpact' => $this->decimal($pending?->amount),
            'settlementCount' => (int) ($row?->settlement_count ?? 0),
        ];
    }

    public function trend(CarbonImmutable $from, CarbonImmutable $to, string $currency): array
    {
        return DB::table('supplier_settlements')->whereNull('deleted_at')->where('currency', $currency)
            ->whereDate('period_end', '>=', $from->toDateString())->whereDate('period_end', '<=', $to->toDateString())
            ->selectRaw('period_end AS period, SUM(commission_amount) AS commission_revenue, SUM(net_amount) AS settlement_impact')
            ->groupBy('period_end')->orderBy('period_end')->get()->map(fn (object $row): array => [
                'period' => (string) $row->period,
                'commissionRevenue' => $this->decimal($row->commission_revenue),
                'settlementImpact' => $this->decimal($row->settlement_impact),
            ])->all();
    }

    public function portfolio(array $f,string $currency): LengthAwarePaginator
    {
        $sort=['reference'=>'ss.settlement_number','supplier'=>'s.company_name','gross'=>'ss.gross_amount','commission'=>'ss.commission_amount','net'=>'ss.net_amount','status'=>'ss.status','period'=>'ss.period_end'][$f['sort']];
        return DB::table('supplier_settlements as ss')->join('suppliers as s','s.id','=','ss.supplier_id')->whereNull('ss.deleted_at')->where('ss.currency',$currency)
            ->whereBetween('ss.period_end',[$f['from']->toDateString(),$f['to']->toDateString()])->when($f['status'],fn($q,$v)=>$q->where('ss.status',$v))
            ->when($f['search'],fn($q,$v)=>$q->where(fn($x)=>$x->where('ss.settlement_number','like','%'.$v.'%')->orWhere('s.company_name','like','%'.$v.'%')))
            ->selectRaw('ss.id,ss.settlement_number reference,ss.supplier_id,s.company_name supplier,ss.currency,ss.gross_amount,ss.commission_amount,ss.refund_adjustment,ss.other_adjustments,ss.net_amount,ss.status,ss.period_start,ss.period_end,ss.updated_at')
            ->orderBy($sort,$f['direction'])->paginate($f['perPage'],['*'],'page',$f['page']);
    }

    public function statuses(array $f,string $currency): array
    {
        return DB::table('supplier_settlements')->whereNull('deleted_at')->where('currency',$currency)->whereBetween('period_end',[$f['from']->toDateString(),$f['to']->toDateString()])->groupBy('status')->selectRaw('status,COUNT(*) count,SUM(commission_amount) amount')->get()->map(fn($r)=>(array)$r)->all();
    }

    public function find(string $id): ?object { return DB::table('supplier_settlements as ss')->join('suppliers as s','s.id','=','ss.supplier_id')->whereNull('ss.deleted_at')->where(fn($q)=>$q->where('ss.id',$id)->orWhere('ss.uuid',$id)->orWhere('ss.settlement_number',$id))->selectRaw('ss.*,ss.settlement_number reference,s.company_name supplier')->first(); }

    private function decimal(mixed $value): string
    {
        return bcadd((string) ($value ?? '0'), '0', 2);
    }
}
