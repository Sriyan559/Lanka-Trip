<?php

namespace App\Repositories\Admin;

use Carbon\CarbonImmutable;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

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

    private function decimal(mixed $value): string
    {
        return bcadd((string) ($value ?? '0'), '0', 2);
    }
}
