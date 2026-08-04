<?php

namespace App\Services\Admin;

use App\Models\Order;
use App\Models\Payout;
use App\Models\ReturnCase;
use App\Models\User;
use Carbon\CarbonImmutable;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class AdminDashboardService
{
    public function overview(CarbonImmutable $from, CarbonImmutable $to): array
    {
        $revenue = $this->revenue($from, $to);

        return [
            'reporting_range' => ['from' => $from->toDateString(), 'to' => $to->toDateString()],
            'revenue' => $revenue,
            'paid_payouts' => $this->paidPayouts($from, $to),
            'orders' => ['value' => Order::whereBetween('created_at', [$from, $to->endOfDay()])->count(), 'availability' => 'available'],
            'active_accounts' => [
                'value' => User::where('role', 'buyer')->where('status', 'active')->count(),
                'availability' => 'available',
                'definition' => 'active_buyer_accounts',
            ],
            'purchasing_customers' => [
                'value' => Order::whereBetween('created_at', [$from, $to->endOfDay()])->distinct('buyer_id')->count('buyer_id'),
                'availability' => 'available',
            ],
            'active_brands' => $this->countWhenAvailable('brands', fn () => DB::table('brands')
                ->where('status', 'active')
                ->where('is_verified', true)
                ->whereNull('deleted_at')
                ->count()),
            'pending_approvals' => $this->pendingApprovals(),
            'sales_trend' => $this->salesTrend($from, $to),
            'ecosystem_composition' => $this->ecosystemComposition(),
            'recent_orders' => Order::query()->with(['buyer:id,name', 'supplier:id,company_name'])
                ->latest()->limit(10)->get([
                    'id', 'order_number', 'buyer_id', 'supplier_id', 'currency',
                    'total_amount', 'payment_status', 'status', 'created_at',
                ]),
            'pending_verifications' => $this->pendingVerifications(),
            'high_risk_alerts' => $this->highRiskAlerts(),
            'data_availability_notices' => $this->availabilityNotices($revenue),
            'generated_at' => now()->toIso8601String(),
        ];
    }

    public function revenue(CarbonImmutable $from, CarbonImmutable $to): array
    {
        if (! Schema::hasTable('payments') || ! Schema::hasTable('currencies')) {
            return ['value' => null, 'availability' => 'unavailable', 'reason' => 'payment_source_unavailable'];
        }

        $gross = DB::table('payments')
            ->leftJoin('currencies', 'currencies.id', '=', 'payments.currency_id')
            ->whereNull('payments.deleted_at')
            ->whereBetween(DB::raw('COALESCE(payments.paid_at, payments.created_at)'), [$from, $to->endOfDay()])
            ->where(function ($query): void {
                $query->whereIn('payments.status', ['captured', 'successful', 'completed', 'paid'])
                    ->orWhereIn('payments.payment_status', ['captured', 'successful', 'completed', 'paid']);
            })
            ->groupBy(DB::raw("COALESCE(currencies.code, 'UNKNOWN')"))
            ->selectRaw("COALESCE(currencies.code, 'UNKNOWN') AS currency, SUM(payments.amount) AS amount")
            ->pluck('amount', 'currency');

        $refunds = collect();
        if (Schema::hasTable('payment_refunds')) {
            $refunds = DB::table('payment_refunds')
                ->join('payments', 'payments.id', '=', 'payment_refunds.payment_id')
                ->leftJoin('currencies', 'currencies.id', '=', 'payments.currency_id')
                ->whereNull('payment_refunds.deleted_at')
                ->where('payment_refunds.status', 'completed')
                ->whereBetween(DB::raw('COALESCE(payment_refunds.processed_at, payment_refunds.updated_at)'), [$from, $to->endOfDay()])
                ->groupBy(DB::raw("COALESCE(currencies.code, 'UNKNOWN')"))
                ->selectRaw("COALESCE(currencies.code, 'UNKNOWN') AS currency, SUM(payment_refunds.amount) AS amount")
                ->pluck('amount', 'currency');
        }

        $currencies = $gross->keys()->merge($refunds->keys())->unique()->sort()->values();
        $totals = $currencies->map(function (string $currency) use ($gross, $refunds): array {
            $grossAmount = (float) ($gross[$currency] ?? 0);
            $refundAmount = (float) ($refunds[$currency] ?? 0);

            return [
                'currency' => $currency,
                'gross' => round($grossAmount, 2),
                'completed_refunds' => round($refundAmount, 2),
                'net' => round($grossAmount - $refundAmount, 2),
            ];
        })->all();

        return [
            'availability' => 'available',
            'by_currency' => $totals,
            'lkr_aggregate' => $this->lkrAggregate(collect($totals), $to),
        ];
    }

    private function lkrAggregate(Collection $totals, CarbonImmutable $to): array
    {
        if ($totals->isEmpty()) {
            return ['value' => 0.0, 'gross' => 0.0, 'availability' => 'available', 'rate_sources' => []];
        }

        $currencies = DB::table('currencies')->whereIn('code', $totals->pluck('currency')->all())->pluck('id', 'code');
        $lkrId = $currencies['LKR'] ?? DB::table('currencies')->where('code', 'LKR')->value('id');
        if (! $lkrId) {
            return ['value' => null, 'availability' => 'unavailable', 'reason' => 'lkr_currency_not_configured'];
        }

        $gross = 0.0;
        $net = 0.0;
        $sources = [];
        foreach ($totals as $total) {
            if ($total['currency'] === 'LKR') {
                $rate = 1.0;
                $source = 'original_currency';
                $date = $to->toDateString();
            } else {
                $baseId = $currencies[$total['currency']] ?? null;
                $storedRate = $baseId ? DB::table('currency_exchange_rates')
                    ->where('base_currency_id', $baseId)
                    ->where('quote_currency_id', $lkrId)
                    ->where('status', 'active')
                    ->whereNotNull('source')
                    ->whereDate('rate_date', '<=', $to)
                    ->latest('rate_date')->first() : null;
                if (! $storedRate) {
                    return ['value' => null, 'availability' => 'unavailable', 'reason' => 'validated_exchange_rate_missing'];
                }
                $rate = (float) $storedRate->rate;
                $source = $storedRate->source;
                $date = $storedRate->rate_date;
            }
            $gross += $total['gross'] * $rate;
            $net += $total['net'] * $rate;
            $sources[] = ['currency' => $total['currency'], 'rate' => $rate, 'source' => $source, 'effective_date' => (string) $date];
        }

        return ['value' => round($net, 2), 'gross' => round($gross, 2), 'availability' => 'available', 'rate_sources' => $sources];
    }

    private function paidPayouts(CarbonImmutable $from, CarbonImmutable $to): array
    {
        if (! Schema::hasTable('payouts')) {
            return ['value' => null, 'availability' => 'unavailable', 'reason' => 'payout_domain_unavailable'];
        }

        return [
            'availability' => 'available',
            'by_currency' => Payout::where('status', 'paid')->whereBetween('paid_at', [$from, $to->endOfDay()])
                ->groupBy('currency')->selectRaw('currency, SUM(net_amount) AS amount, COUNT(*) AS count')->get(),
        ];
    }

    private function pendingApprovals(): array
    {
        $breakdown = [
            'supplier_verification' => $this->countWhenAvailable('suppliers', fn () => DB::table('suppliers')->where('verification_status', 'pending')->count()),
            'brand_authorization' => $this->countWhenAvailable('seller_brand_authorizations', fn () => DB::table('seller_brand_authorizations')->whereIn('status', ['submitted', 'pending'])->count()),
            'product_approval' => $this->countWhenAvailable('products', fn () => DB::table('products')->where('approval_status', 'pending')->whereNull('deleted_at')->count()),
            'return_review' => $this->countWhenAvailable('return_cases', fn () => ReturnCase::whereIn('status', ['requested', 'under_review'])->count()),
            'ecosystem_module_approval' => $this->countWhenAvailable('ecosystem_modules', fn () => DB::table('ecosystem_modules')->where('approval_status', 'pending')->whereNull('deleted_at')->count()),
        ];

        return [
            'availability' => 'available',
            'value' => collect($breakdown)->where('availability', 'available')->sum('value'),
            'breakdown' => $breakdown,
        ];
    }

    private function salesTrend(CarbonImmutable $from, CarbonImmutable $to): array
    {
        if (! Schema::hasTable('payments') || ! Schema::hasTable('currencies')) {
            return ['availability' => 'unavailable', 'reason' => 'payment_source_unavailable', 'by_currency' => []];
        }

        $payments = DB::table('payments')
            ->leftJoin('currencies', 'currencies.id', '=', 'payments.currency_id')
            ->whereNull('payments.deleted_at')
            ->whereBetween(DB::raw('COALESCE(payments.paid_at, payments.created_at)'), [$from, $to->endOfDay()])
            ->where(function ($query): void {
                $query->whereIn('payments.status', ['captured', 'successful', 'completed', 'paid'])
                    ->orWhereIn('payments.payment_status', ['captured', 'successful', 'completed', 'paid']);
            })
            ->groupByRaw("DATE(COALESCE(payments.paid_at, payments.created_at)), COALESCE(currencies.code, 'UNKNOWN')")
            ->selectRaw("DATE(COALESCE(payments.paid_at, payments.created_at)) AS date, COALESCE(currencies.code, 'UNKNOWN') AS currency, SUM(payments.amount) AS gross")
            ->get();

        $refunds = Schema::hasTable('payment_refunds')
            ? DB::table('payment_refunds')
                ->join('payments', 'payments.id', '=', 'payment_refunds.payment_id')
                ->leftJoin('currencies', 'currencies.id', '=', 'payments.currency_id')
                ->whereNull('payment_refunds.deleted_at')
                ->where('payment_refunds.status', 'completed')
                ->whereBetween(DB::raw('COALESCE(payment_refunds.processed_at, payment_refunds.updated_at)'), [$from, $to->endOfDay()])
                ->groupByRaw("DATE(COALESCE(payment_refunds.processed_at, payment_refunds.updated_at)), COALESCE(currencies.code, 'UNKNOWN')")
                ->selectRaw("DATE(COALESCE(payment_refunds.processed_at, payment_refunds.updated_at)) AS date, COALESCE(currencies.code, 'UNKNOWN') AS currency, SUM(payment_refunds.amount) AS amount")
                ->get()
            : collect();

        $currencies = $payments->pluck('currency')->merge($refunds->pluck('currency'))->unique()->sort()->values();
        $days = collect();
        for ($day = $from->startOfDay(); $day->lte($to); $day = $day->addDay()) {
            $days->push($day->toDateString());
        }

        return [
            'availability' => 'available',
            'by_currency' => $currencies->map(function (string $currency) use ($days, $payments, $refunds): array {
                $paymentRows = $payments->where('currency', $currency)->keyBy(fn ($row) => (string) $row->date);
                $refundRows = $refunds->where('currency', $currency)->keyBy(fn ($row) => (string) $row->date);

                return [
                    'currency' => $currency,
                    'items' => $days->map(function (string $date) use ($paymentRows, $refundRows): array {
                        $gross = (float) ($paymentRows[$date]->gross ?? 0);
                        $refunded = (float) ($refundRows[$date]->amount ?? 0);

                        return [
                            'date' => $date,
                            'gross' => round($gross, 2),
                            'completed_refunds' => round($refunded, 2),
                            'net' => round($gross - $refunded, 2),
                        ];
                    })->all(),
                ];
            })->all(),
        ];
    }

    private function ecosystemComposition(): array
    {
        if (! Schema::hasTable('products') || ! Schema::hasTable('categories')) {
            return ['availability' => 'unavailable', 'reason' => 'catalogue_source_unavailable', 'items' => []];
        }

        $rows = DB::table('products')
            ->join('categories', 'categories.id', '=', 'products.category_id')
            ->where('products.status', 'active')
            ->where('products.approval_status', 'approved')
            ->whereNull('products.deleted_at')
            ->where('categories.status', 'active')
            ->groupBy('categories.id', 'categories.name')
            ->selectRaw('categories.id, categories.name, COUNT(products.id) AS product_count')
            ->orderByDesc('product_count')
            ->get();
        $total = (int) $rows->sum('product_count');

        return [
            'availability' => 'available',
            'basis' => 'approved_active_products_by_category',
            'items' => $rows->map(fn ($row): array => [
                'category_id' => $row->id,
                'category_name' => $row->name,
                'product_count' => (int) $row->product_count,
                'percentage' => $total > 0 ? round(((int) $row->product_count / $total) * 100, 2) : 0,
            ])->all(),
        ];
    }

    private function pendingVerifications(): array
    {
        $items = collect();

        if (Schema::hasTable('suppliers')) {
            $items->push(...DB::table('suppliers')->where('verification_status', 'pending')
                ->latest()->limit(10)->get(['id', 'company_name', 'verification_status', 'updated_at'])
                ->map(fn ($supplier): array => [
                    'id' => (string) $supplier->id,
                    'entity_name' => $supplier->company_name,
                    'entity_type' => 'supplier',
                    'status' => $supplier->verification_status,
                    'required_action' => 'Review supplier verification',
                    'detail_route' => "/admin/verification/suppliers/{$supplier->id}",
                    'updated_at' => $supplier->updated_at,
                ]));
        }

        if (Schema::hasTable('seller_brand_authorizations')) {
            $items->push(...DB::table('seller_brand_authorizations')
                ->join('suppliers', 'suppliers.id', '=', 'seller_brand_authorizations.supplier_id')
                ->join('brands', 'brands.id', '=', 'seller_brand_authorizations.brand_id')
                ->whereIn('seller_brand_authorizations.status', ['submitted', 'pending'])
                ->latest('seller_brand_authorizations.updated_at')->limit(10)
                ->get([
                    'seller_brand_authorizations.id', 'seller_brand_authorizations.status',
                    'seller_brand_authorizations.updated_at', 'suppliers.company_name', 'brands.name as brand_name',
                ])->map(fn ($authorization): array => [
                    'id' => (string) $authorization->id,
                    'entity_name' => "{$authorization->company_name} — {$authorization->brand_name}",
                    'entity_type' => 'brand_authorization',
                    'status' => $authorization->status,
                    'required_action' => 'Review brand authorization',
                    'detail_route' => "/admin/verification/brand-authorizations/{$authorization->id}",
                    'updated_at' => $authorization->updated_at,
                ]));
        }

        return $items->sortByDesc('updated_at')->take(10)->values()->all();
    }

    private function highRiskAlerts(): array
    {
        if (! Schema::hasTable('risk_events') || ! Schema::hasTable('risk_profiles')) {
            return ['availability' => 'unavailable', 'reason' => 'risk_source_unavailable', 'items' => []];
        }

        return [
            'availability' => 'available',
            'items' => DB::table('risk_events')
                ->join('risk_profiles', 'risk_profiles.id', '=', 'risk_events.risk_profile_id')
                ->where('risk_events.status', 'open')
                ->whereIn('risk_profiles.risk_level', ['high', 'critical'])
                ->where('risk_profiles.status', 'active')
                ->whereNull('risk_profiles.deleted_at')
                ->latest('risk_events.created_at')
                ->limit(10)
                ->get([
                    'risk_events.id', 'risk_events.uuid', 'risk_events.event_type',
                    'risk_events.subject_type', 'risk_events.subject_id', 'risk_events.created_at',
                    'risk_profiles.risk_level', 'risk_profiles.risk_score',
                ]),
        ];
    }

    private function availabilityNotices(array $revenue): array
    {
        $notices = [];
        if (($revenue['lkr_aggregate']['availability'] ?? null) === 'unavailable') {
            $notices[] = ['code' => $revenue['lkr_aggregate']['reason'], 'message' => 'LKR conversion unavailable. Original currency totals are provided.'];
        }

        return $notices;
    }

    private function countWhenAvailable(string $table, callable $callback): array
    {
        return Schema::hasTable($table)
            ? ['value' => $callback(), 'availability' => 'available']
            : ['value' => null, 'availability' => 'unavailable', 'reason' => "{$table}_unavailable"];
    }
}
