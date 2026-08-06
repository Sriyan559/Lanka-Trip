<?php

namespace App\Repositories\Admin;

use Carbon\CarbonImmutable;
use Illuminate\Database\Query\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class MarketplaceSellerRepository
{
    private const SUPPLIER_TYPES = ['App\\Models\\Supplier', 'Supplier'];

    public function currencies(CarbonImmutable $from, CarbonImmutable $to): Collection
    {
        return DB::table('orders')->whereNull('deleted_at')->whereBetween('created_at', [$from, $to])
            ->where('status', '!=', 'cancelled')->pluck('currency')->filter()->unique()->sort()->values();
    }

    public function counts(CarbonImmutable $from, CarbonImmutable $to): array
    {
        $base = DB::table('suppliers');
        $highRisk = 0;
        if (Schema::hasTable('risk_profiles')) {
            $latest = DB::table('risk_profiles')->whereNull('deleted_at')->where('status', 'active')->whereIn('subject_type', self::SUPPLIER_TYPES)
                ->groupBy('subject_id')->selectRaw('subject_id, MAX(id) AS id');
            $highRisk = DB::table('risk_profiles')->joinSub($latest, 'latest_risk', 'latest_risk.id', '=', 'risk_profiles.id')
                ->whereIn('risk_profiles.risk_level', ['high', 'critical'])->count();
        }

        return [
            'total' => (clone $base)->count(),
            'active' => (clone $base)->where('status', 'active')->where('verification_status', 'verified')->whereNull('suspended_at')->count(),
            'new' => (clone $base)->whereBetween('created_at', [$from, $to])->count(),
            'under_review' => (clone $base)->where('verification_status', 'pending')->count(),
            'suspended' => (clone $base)->whereNotNull('suspended_at')->count(),
            'high_risk' => $highRisk,
        ];
    }

    public function aggregate(CarbonImmutable $from, CarbonImmutable $to, ?string $currency): array
    {
        $orders = DB::table('orders')->whereNull('deleted_at')->whereBetween('created_at', [$from, $to]);
        if ($currency) $orders->where('currency', $currency);
        $total = (clone $orders)->count();
        $qualifying = (clone $orders)->where('status', '!=', 'cancelled');
        $gmv = $currency ? round((float) $qualifying->sum('total_amount'), 2) : null;
        $returnQuery = Schema::hasTable('return_cases') ? DB::table('return_cases')->join('orders', 'orders.id', '=', 'return_cases.order_id')->whereNull('return_cases.deleted_at')->whereBetween('return_cases.created_at', [$from, $to]) : null;
        if ($returnQuery && $currency) $returnQuery->where('orders.currency', $currency);
        $returns = $returnQuery?->count() ?? 0;
        $sellerCount = DB::table('suppliers')->count();

        return [
            'gmv' => $gmv,
            'average_seller_gmv' => $currency && $sellerCount ? round($gmv / $sellerCount, 2) : ($currency ? 0.0 : null),
            'fulfilment_rate' => $total ? round(((clone $orders)->where('status', 'completed')->count() / $total) * 100, 2) : 0.0,
            'cancellation_rate' => $total ? round(((clone $orders)->where('status', 'cancelled')->count() / $total) * 100, 2) : 0.0,
            'return_rate' => $total ? round(($returns / $total) * 100, 2) : 0.0,
            'average_rating' => round((float) DB::table('suppliers')->avg('rating'), 2),
        ];
    }

    public function riskDistribution(): array
    {
        if (! Schema::hasTable('risk_profiles')) return [];
        $latest = DB::table('risk_profiles')->whereNull('deleted_at')->where('status', 'active')->whereIn('subject_type', self::SUPPLIER_TYPES)
            ->groupBy('subject_id')->selectRaw('subject_id, MAX(id) AS id');
        return DB::table('risk_profiles')->joinSub($latest, 'latest_risk', 'latest_risk.id', '=', 'risk_profiles.id')
            ->selectRaw('risk_level, COUNT(*) AS total')->groupBy('risk_level')->pluck('total', 'risk_level')->map(fn ($v) => (int) $v)->all();
    }

    public function trend(CarbonImmutable $from, CarbonImmutable $to, ?string $currency): array
    {
        $orders = DB::table('orders')->whereNull('deleted_at')->whereBetween('created_at', [$from, $to]);
        if ($currency) $orders->where('currency', $currency);
        $rows = $orders->selectRaw("DATE(created_at) AS day, COUNT(*) AS orders, SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) AS completed, SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) AS cancelled, SUM(CASE WHEN status != 'cancelled' THEN total_amount ELSE 0 END) AS gmv")
            ->groupByRaw('DATE(created_at)')->get()->keyBy(fn ($row) => (string) $row->day);
        $returns = Schema::hasTable('return_cases') ? DB::table('return_cases')->whereNull('deleted_at')->whereBetween('created_at', [$from, $to])
            ->selectRaw('DATE(created_at) AS day, COUNT(*) AS total')->groupByRaw('DATE(created_at)')->pluck('total', 'day') : collect();
        $result = [];
        for ($day = $from->startOfDay(); $day->lte($to); $day = $day->addDay()) {
            $key = $day->toDateString(); $row = $rows->get($key); $count = (int) ($row->orders ?? 0);
            $result[] = ['date' => $key, 'gmv' => $currency ? round((float) ($row->gmv ?? 0), 2) : null, 'orders' => $count,
                'fulfilmentRate' => $count ? round(((int) $row->completed / $count) * 100, 2) : 0,
                'cancellationRate' => $count ? round(((int) $row->cancelled / $count) * 100, 2) : 0,
                'returnRate' => $count ? round(((int) ($returns[$key] ?? 0) / $count) * 100, 2) : 0];
        }
        return $result;
    }

    public function paginate(array $filters, CarbonImmutable $from, CarbonImmutable $to, ?string $currency): LengthAwarePaginator
    {
        $orders = DB::table('orders')->whereNull('deleted_at')->whereBetween('created_at', [$from, $to]);
        if ($currency) $orders->where('currency', $currency);
        $orderStats = $orders->groupBy('supplier_id')->selectRaw("supplier_id, COUNT(*) AS orders, SUM(CASE WHEN status != 'cancelled' THEN total_amount ELSE 0 END) AS gmv, SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) AS completed, SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) AS cancelled, MAX(created_at) AS last_order_at");
        $products = DB::table('products')->whereNull('deleted_at')->where('status', 'active')->where('approval_status', 'approved')->groupBy('supplier_id')->selectRaw('supplier_id, COUNT(*) AS listings');
        $returns = Schema::hasTable('return_cases') ? DB::table('return_cases')->join('orders as return_orders', 'return_orders.id', '=', 'return_cases.order_id')->whereNull('return_cases.deleted_at')->whereBetween('return_cases.created_at', [$from, $to]) : null;
        if ($returns && $currency) $returns->where('return_orders.currency', $currency);
        if ($returns) $returns->groupBy('return_cases.supplier_id')->selectRaw('return_cases.supplier_id, COUNT(*) AS returns');
        $risk = Schema::hasTable('risk_profiles') ? DB::table('risk_profiles as profiles')->joinSub(
            DB::table('risk_profiles')->whereNull('deleted_at')->where('status', 'active')->whereIn('subject_type', self::SUPPLIER_TYPES)->groupBy('subject_id')->selectRaw('subject_id, MAX(id) AS id'),
            'latest_risk', 'latest_risk.id', '=', 'profiles.id'
        )->select(['profiles.subject_id', 'profiles.risk_level', 'profiles.risk_score']) : null;

        $query = DB::table('suppliers')->leftJoinSub($orderStats, 'order_stats', 'order_stats.supplier_id', '=', 'suppliers.id')->leftJoinSub($products, 'product_stats', 'product_stats.supplier_id', '=', 'suppliers.id');
        if ($returns) $query->leftJoinSub($returns, 'return_stats', 'return_stats.supplier_id', '=', 'suppliers.id');
        if ($risk) $query->leftJoinSub($risk, 'risk_stats', 'risk_stats.subject_id', '=', 'suppliers.id');
        $query->select(['suppliers.*', DB::raw('COALESCE(order_stats.orders, 0) AS order_count'), DB::raw('COALESCE(order_stats.gmv, 0) AS gmv'), DB::raw('COALESCE(order_stats.completed, 0) AS completed_count'), DB::raw('COALESCE(order_stats.cancelled, 0) AS cancelled_count'), 'order_stats.last_order_at', DB::raw('COALESCE(product_stats.listings, 0) AS listing_count'), DB::raw($returns ? 'COALESCE(return_stats.returns, 0) AS return_count' : '0 AS return_count'), DB::raw($risk ? 'risk_stats.risk_level AS risk_level' : 'NULL AS risk_level'), DB::raw($risk ? 'risk_stats.risk_score AS profile_risk_score' : 'NULL AS profile_risk_score')]);
        $this->applyFilters($query, $filters, $from, $to);
        $sorts = ['name' => 'suppliers.company_name', 'orders' => 'order_count', 'gmv' => 'gmv', 'rating' => 'suppliers.rating', 'risk' => 'profile_risk_score', 'updatedAt' => 'suppliers.updated_at'];
        return $query->orderBy($sorts[$filters['sortBy']], $filters['sortDirection'])->orderBy('suppliers.id')->paginate($filters['perPage'], ['*'], 'page', $filters['page']);
    }

    public function find(int $id, CarbonImmutable $from, CarbonImmutable $to, ?string $currency): ?object
    {
        $page = $this->paginate(['status' => 'all', 'sortBy' => 'updatedAt', 'sortDirection' => 'desc', 'perPage' => 100, 'page' => 1, 'sellerId' => $id], $from, $to, $currency);
        return collect($page->items())->first(fn ($row) => (int) $row->id === $id);
    }

    public function alerts(): array
    {
        if (! Schema::hasTable('risk_events')) return [];
        return DB::table('risk_events')->leftJoin('risk_profiles', 'risk_profiles.id', '=', 'risk_events.risk_profile_id')
            ->leftJoin('suppliers', 'suppliers.id', '=', 'risk_events.subject_id')->whereIn('risk_events.subject_type', self::SUPPLIER_TYPES)->where('risk_events.status', 'open')
            ->latest('risk_events.created_at')->limit(8)->get(['risk_events.id', 'risk_events.event_type', 'risk_events.subject_id', 'risk_events.created_at', 'risk_profiles.risk_level', 'risk_profiles.risk_score', 'suppliers.company_name'])
            ->map(fn ($row) => ['id' => (string) $row->id, 'title' => str($row->event_type)->headline()->toString(), 'sellerId' => (string) $row->subject_id, 'sellerName' => $row->company_name, 'riskLevel' => $row->risk_level, 'riskScore' => $row->risk_score === null ? null : (float) $row->risk_score, 'createdAt' => (string) $row->created_at])->all();
    }

    private function applyFilters(Builder $query, array $filters, CarbonImmutable $from, CarbonImmutable $to): void
    {
        if (! empty($filters['sellerId'])) $query->where('suppliers.id', $filters['sellerId']);
        if (! empty($filters['search'])) {
            $term = '%'.strtolower($filters['search']).'%';
            $query->where(function ($q) use ($filters, $term): void {
                $q->whereRaw('LOWER(suppliers.company_name) LIKE ?', [$term])->orWhereRaw('LOWER(suppliers.email) LIKE ?', [$term]);
                if (ctype_digit((string) $filters['search'])) $q->orWhere('suppliers.id', (int) $filters['search']);
            });
        }
        if (! empty($filters['verificationStatus'])) $query->where('suppliers.verification_status', $filters['verificationStatus']);
        if (! empty($filters['riskLevel'])) $query->where('risk_stats.risk_level', $filters['riskLevel']);
        match ($filters['status'] ?? 'all') {
            'active' => $query->where('suppliers.status', 'active')->where('suppliers.verification_status', 'verified')->whereNull('suppliers.suspended_at'),
            'under-review' => $query->where('suppliers.verification_status', 'pending'),
            'inactive' => $query->where('suppliers.status', 'inactive'),
            'suspended' => $query->whereNotNull('suppliers.suspended_at'),
            'high-risk' => $query->whereIn('risk_stats.risk_level', ['high', 'critical']),
            'new' => $query->whereBetween('suppliers.created_at', [$from, $to]),
            default => null,
        };
    }
}
