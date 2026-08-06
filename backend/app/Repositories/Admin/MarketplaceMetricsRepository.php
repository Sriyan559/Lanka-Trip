<?php

namespace App\Repositories\Admin;

use Carbon\CarbonImmutable;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class MarketplaceMetricsRepository
{
    private const SUCCESSFUL_PAYMENT_STATUSES = ['captured', 'successful', 'completed', 'paid'];

    public function currencies(CarbonImmutable $from, CarbonImmutable $to): Collection
    {
        $orderCurrencies = DB::table('orders')->whereNull('deleted_at')
            ->whereBetween('created_at', [$from, $to])->where('status', '!=', 'cancelled')
            ->pluck('currency');
        $paymentCurrencies = Schema::hasTable('payments')
            ? DB::table('payments')->leftJoin('currencies', 'currencies.id', '=', 'payments.currency_id')
                ->whereNull('payments.deleted_at')->whereBetween(DB::raw('COALESCE(payments.paid_at, payments.created_at)'), [$from, $to])
                ->pluck('currencies.code')
            : collect();

        return $orderCurrencies->merge($paymentCurrencies)->filter()->unique()->sort()->values();
    }

    /** Gross order value uses orders.created_at, excludes soft-deleted and cancelled orders, and never combines currencies. */
    public function orderSummary(CarbonImmutable $from, CarbonImmutable $to, ?string $currency): array
    {
        $base = DB::table('orders')->whereNull('deleted_at')->whereBetween('created_at', [$from, $to]);
        if ($currency) {
            $base->where('currency', $currency);
        }
        $totalOrders = (clone $base)->count();
        $qualifying = (clone $base)->where('status', '!=', 'cancelled');
        $orderCount = $qualifying->count();
        $gmv = $currency ? (float) $qualifying->sum('total_amount') : null;

        return [
            'total_orders' => $totalOrders,
            'qualifying_orders' => $orderCount,
            'gmv' => $gmv,
            'aov' => $currency && $orderCount > 0 ? round($gmv / $orderCount, 2) : ($currency ? 0.0 : null),
        ];
    }

    /** NMV is successful payment value less completed refunds, grouped by the payment currency. */
    public function paymentSummary(CarbonImmutable $from, CarbonImmutable $to, ?string $currency): array
    {
        if (! $currency || ! Schema::hasTable('payments') || ! Schema::hasTable('currencies')) {
            return ['available' => false, 'reason' => $currency ? 'payment_source_unavailable' : 'currency_selection_required'];
        }

        $paymentQuery = DB::table('payments')->join('currencies', 'currencies.id', '=', 'payments.currency_id')
            ->whereNull('payments.deleted_at')->where('currencies.code', $currency)
            ->whereBetween(DB::raw('COALESCE(payments.paid_at, payments.created_at)'), [$from, $to])
            ->where(fn ($query) => $query->whereIn('payments.status', self::SUCCESSFUL_PAYMENT_STATUSES)
                ->orWhereIn('payments.payment_status', self::SUCCESSFUL_PAYMENT_STATUSES));
        $gross = (float) $paymentQuery->sum('payments.amount');
        $refunds = Schema::hasTable('payment_refunds')
            ? (float) DB::table('payment_refunds')->join('payments', 'payments.id', '=', 'payment_refunds.payment_id')
                ->join('currencies', 'currencies.id', '=', 'payments.currency_id')
                ->whereNull('payment_refunds.deleted_at')->where('payment_refunds.status', 'completed')
                ->where('currencies.code', $currency)
                ->whereBetween(DB::raw('COALESCE(payment_refunds.processed_at, payment_refunds.updated_at)'), [$from, $to])
                ->sum('payment_refunds.amount')
            : 0.0;

        return ['available' => true, 'gross' => round($gross, 2), 'refunds' => round($refunds, 2), 'net' => round($gross - $refunds, 2)];
    }

    /** Commission is recognized from supplier settlements by period_end; no commission rate is inferred from orders. */
    public function settlementSummary(CarbonImmutable $from, CarbonImmutable $to, ?string $currency): array
    {
        if (! $currency || ! Schema::hasTable('supplier_settlements')) {
            return ['available' => false, 'reason' => $currency ? 'settlement_source_unavailable' : 'currency_selection_required'];
        }
        $query = DB::table('supplier_settlements')->whereNull('deleted_at')->where('currency', $currency)
            ->whereDate('period_end', '>=', $from->toDateString())->whereDate('period_end', '<=', $to->toDateString());

        return [
            'available' => true,
            'commission' => round((float) (clone $query)->sum('commission_amount'), 2),
            'pending' => round((float) (clone $query)->whereIn('status', ['draft', 'pending', 'approved'])->sum('net_amount'), 2),
        ];
    }

    public function activeSellerCount(): int
    {
        return DB::table('suppliers')->where('status', 'active')->where('verification_status', 'verified')->count();
    }

    public function activeListingCount(): int
    {
        return DB::table('products')->whereNull('deleted_at')->where('status', 'active')->where('approval_status', 'approved')->count();
    }

    public function orderLifecycle(CarbonImmutable $from, CarbonImmutable $to, ?string $currency): array
    {
        $query = DB::table('orders')->whereNull('deleted_at')->whereBetween('created_at', [$from, $to]);
        if ($currency) {
            $query->where('currency', $currency);
        }

        return $query
            ->selectRaw('status, COUNT(*) AS count')->groupBy('status')->pluck('count', 'status')
            ->map(fn ($count) => (int) $count)->all();
    }

    public function trends(CarbonImmutable $from, CarbonImmutable $to, ?string $currency): array
    {
        if (! $currency) {
            return [];
        }
        $orders = DB::table('orders')->whereNull('deleted_at')->where('currency', $currency)
            ->where('status', '!=', 'cancelled')->whereBetween('created_at', [$from, $to])
            ->selectRaw('DATE(created_at) AS day, SUM(total_amount) AS gmv, COUNT(*) AS orders')
            ->groupByRaw('DATE(created_at)')->get()->keyBy(fn ($row) => (string) $row->day);
        $payments = Schema::hasTable('payments') ? DB::table('payments')
            ->join('currencies', 'currencies.id', '=', 'payments.currency_id')->whereNull('payments.deleted_at')
            ->where('currencies.code', $currency)->whereBetween(DB::raw('COALESCE(payments.paid_at, payments.created_at)'), [$from, $to])
            ->where(fn ($query) => $query->whereIn('payments.status', self::SUCCESSFUL_PAYMENT_STATUSES)
                ->orWhereIn('payments.payment_status', self::SUCCESSFUL_PAYMENT_STATUSES))
            ->selectRaw('DATE(COALESCE(payments.paid_at, payments.created_at)) AS day, SUM(payments.amount) AS revenue')
            ->groupByRaw('DATE(COALESCE(payments.paid_at, payments.created_at))')->get()->keyBy(fn ($row) => (string) $row->day) : collect();

        $items = [];
        for ($day = $from->startOfDay(); $day->lte($to); $day = $day->addDay()) {
            $key = $day->toDateString();
            $items[] = ['date' => $key, 'gmv' => round((float) ($orders[$key]->gmv ?? 0), 2), 'orders' => (int) ($orders[$key]->orders ?? 0), 'revenue' => round((float) ($payments[$key]->revenue ?? 0), 2)];
        }

        return $items;
    }

    public function composition(CarbonImmutable $from, CarbonImmutable $to): array
    {
        $category = DB::table('products')->join('categories', 'categories.id', '=', 'products.category_id')
            ->whereNull('products.deleted_at')->where('products.status', 'active')->where('products.approval_status', 'approved')
            ->groupBy('categories.id', 'categories.name')->selectRaw('categories.id, categories.name, COUNT(products.id) AS value')
            ->orderByDesc('value')->get();
        $seller = DB::table('products')->join('suppliers', 'suppliers.id', '=', 'products.supplier_id')
            ->whereNull('products.deleted_at')->where('products.status', 'active')->where('products.approval_status', 'approved')
            ->groupBy('suppliers.id', 'suppliers.company_name')->selectRaw('suppliers.id, suppliers.company_name AS name, COUNT(products.id) AS value')
            ->orderByDesc('value')->limit(8)->get();
        $channel = DB::table('orders')->whereNull('deleted_at')->whereBetween('created_at', [$from, $to])
            ->groupBy('order_source')->selectRaw("COALESCE(order_source, 'unknown') AS name, COUNT(*) AS value")
            ->orderByDesc('value')->get();

        return ['category' => $this->percentages($category), 'seller' => $this->percentages($seller), 'channel' => $this->percentages($channel)];
    }

    public function operationalQueues(): array
    {
        return [
            ['id' => 'seller_verifications', 'label' => 'Seller Verifications', 'count' => DB::table('suppliers')->where('verification_status', 'pending')->count(), 'href' => '/admin/verification/suppliers?status=pending'],
            ['id' => 'listing_approvals', 'label' => 'Listing Approvals', 'count' => DB::table('products')->whereNull('deleted_at')->where('approval_status', 'pending')->count(), 'href' => '/admin/catalogue/product-approvals?status=pending'],
            ['id' => 'returns', 'label' => 'Return Orders', 'count' => Schema::hasTable('return_cases') ? DB::table('return_cases')->whereNull('deleted_at')->whereNotIn('status', ['completed', 'rejected', 'cancelled'])->count() : 0, 'href' => '/admin/marketplace/returns'],
            ['id' => 'cancellations', 'label' => 'Cancelled Orders', 'count' => DB::table('orders')->whereNull('deleted_at')->where('status', 'cancelled')->count(), 'href' => '/admin/marketplace/orders?orderStatus=cancelled'],
        ];
    }

    public function topSellers(CarbonImmutable $from, CarbonImmutable $to, ?string $currency, int $limit = 10): array
    {
        if (! $currency) {
            return [];
        }

        return DB::table('suppliers')->leftJoin('orders', function ($join) use ($from, $to, $currency): void {
            $join->on('orders.supplier_id', '=', 'suppliers.id')->whereNull('orders.deleted_at')
                ->whereBetween('orders.created_at', [$from, $to])->where('orders.currency', $currency);
        })->where('suppliers.status', 'active')->groupBy('suppliers.id', 'suppliers.company_name', 'suppliers.rating', 'suppliers.status')
            ->selectRaw("suppliers.id, suppliers.company_name, suppliers.rating, suppliers.status, COUNT(orders.id) AS orders, COALESCE(SUM(CASE WHEN orders.status != 'cancelled' THEN orders.total_amount ELSE 0 END), 0) AS gmv, SUM(CASE WHEN orders.status = 'completed' THEN 1 ELSE 0 END) AS completed, SUM(CASE WHEN orders.status = 'cancelled' THEN 1 ELSE 0 END) AS cancelled")
            ->orderByDesc('gmv')->orderBy('suppliers.id')->limit($limit)->get()->map(function ($row): array {
                $orders = (int) $row->orders;

                return ['id' => (string) $row->id, 'name' => $row->company_name, 'orders' => $orders, 'gmv' => round((float) $row->gmv, 2), 'fulfilment_rate' => $orders ? round(((int) $row->completed / $orders) * 100, 2) : 0, 'cancellation_rate' => $orders ? round(((int) $row->cancelled / $orders) * 100, 2) : 0, 'rating' => $row->rating !== null ? (float) $row->rating : null, 'status' => $row->status];
            })->all();
    }

    public function recentActivity(CarbonImmutable $from, CarbonImmutable $to, int $limit = 10): array
    {
        if (! Schema::hasTable('activity_log')) {
            return [];
        }

        return DB::table('activity_log')->leftJoin('users', function ($join): void {
            $join->on('users.id', '=', 'activity_log.causer_id')->where('activity_log.causer_type', '=', 'App\\Models\\User');
        })->whereBetween('activity_log.created_at', [$from, $to])->whereIn('activity_log.log_name', ['orders', 'products', 'suppliers', 'quotations', 'admin'])
            ->latest('activity_log.created_at')->limit($limit)->get(['activity_log.id', 'activity_log.log_name', 'activity_log.description', 'activity_log.subject_type', 'activity_log.subject_id', 'activity_log.created_at', 'users.name as actor'])
            ->map(fn ($row): array => ['id' => (string) $row->id, 'source' => $row->log_name ?: 'marketplace', 'action' => $row->description, 'entity_type' => $row->subject_type ? class_basename($row->subject_type) : null, 'entity_id' => $row->subject_id ? (string) $row->subject_id : null, 'actor' => $row->actor ?: 'System', 'occurred_at' => (string) $row->created_at])->all();
    }

    public function alerts(): array
    {
        if (! Schema::hasTable('risk_events') || ! Schema::hasTable('risk_profiles')) {
            return [];
        }

        return DB::table('risk_events')->leftJoin('risk_profiles', 'risk_profiles.id', '=', 'risk_events.risk_profile_id')
            ->where('risk_events.status', 'open')->orderByDesc('risk_profiles.risk_score')->latest('risk_events.created_at')->limit(10)
            ->get(['risk_events.id', 'risk_events.event_type', 'risk_events.subject_type', 'risk_events.subject_id', 'risk_events.created_at', 'risk_profiles.risk_level', 'risk_profiles.risk_score'])
            ->map(fn ($row): array => ['id' => (string) $row->id, 'title' => str($row->event_type)->headline()->toString(), 'severity' => in_array($row->risk_level, ['critical', 'high'], true) ? 'danger' : 'warning', 'entity_type' => $row->subject_type ? class_basename($row->subject_type) : null, 'entity_id' => $row->subject_id ? (string) $row->subject_id : null, 'risk_score' => $row->risk_score !== null ? (float) $row->risk_score : null, 'created_at' => (string) $row->created_at])->all();
    }

    private function percentages(Collection $rows): array
    {
        $total = (int) $rows->sum('value');

        return $rows->map(fn ($row): array => ['id' => (string) ($row->id ?? $row->name), 'label' => $row->name, 'value' => (int) $row->value, 'percentage' => $total > 0 ? round(((int) $row->value / $total) * 100, 2) : 0])->all();
    }
}
