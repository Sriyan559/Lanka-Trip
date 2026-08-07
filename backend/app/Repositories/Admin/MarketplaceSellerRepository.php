<?php

namespace App\Repositories\Admin;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Query\Builder;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class MarketplaceSellerRepository
{
    private const SUPPLIER_SUBJECTS = ['App\\Models\\Supplier', 'Supplier', 'supplier'];

    public function paginate(array $filters): LengthAwarePaginator
    {
        $query = $this->baseQuery($filters);
        $this->applyFilters($query, $filters);
        $sorts = ['sellerId' => 'suppliers.id', 'name' => 'suppliers.company_name', 'status' => 'suppliers.status',
            'orders' => 'order_count', 'gmv' => 'gmv', 'rating' => 'suppliers.rating', 'updatedAt' => 'suppliers.updated_at'];
        $column = ($filters['sortBy'] ?? 'updatedAt') === 'risk' ? 'suppliers.risk_score' : ($sorts[$filters['sortBy'] ?? 'updatedAt'] ?? 'suppliers.updated_at');

        return $query->orderBy($column, $filters['sortDirection'])->orderBy('suppliers.id')->paginate($filters['perPage'], ['*'], 'page', $filters['page']);
    }

    public function allForExport(array $filters): Collection
    {
        $query = $this->baseQuery($filters);
        $this->applyFilters($query, $filters);

        return $query->orderBy('suppliers.id')->limit(100000)->get();
    }

    public function find(int $id, array $filters): ?object
    {
        return $this->baseQuery($filters)->where('suppliers.id', $id)->first();
    }

    public function risks(Collection $ids): Collection
    {
        return DB::table('risk_profiles')->whereNull('deleted_at')->where('status', 'active')
            ->whereIn('subject_type', self::SUPPLIER_SUBJECTS)->whereIn('subject_id', $ids)
            ->orderByDesc('assessed_at')->orderByDesc('id')->get()->unique('subject_id')->keyBy('subject_id');
    }

    public function summary(array $filters): array
    {
        $supplier = DB::table('suppliers');
        $this->applyContext($supplier, $filters);
        $currencies = DB::table('orders')->whereNull('deleted_at')->whereBetween('created_at', [$filters['from'], $filters['to']])
            ->where('status', '!=', 'cancelled')->distinct()->pluck('currency')->filter()->values();
        $currency = $filters['currency'] ?? ($currencies->count() === 1 ? $currencies->first() : null);
        $orders = DB::table('orders')->whereNull('deleted_at')->whereBetween('created_at', [$filters['from'], $filters['to']]);
        if ($currency) {
            $orders->where('currency', $currency);
        }
        $totalOrders = (clone $orders)->count();
        $qualifyingOrders = (clone $orders)->where('status', '!=', 'cancelled');
        $qualifyingCount = $qualifyingOrders->count();
        $gmv = $currency ? (float) $qualifyingOrders->sum('total_amount') : null;
        $latestRisks = DB::table('risk_profiles')->whereNull('deleted_at')->where('status', 'active')->whereIn('subject_type', self::SUPPLIER_SUBJECTS)
            ->groupBy('subject_id')->selectRaw('subject_id, MAX(id) as risk_profile_id');
        $riskQuery = DB::table('risk_profiles')->joinSub($latestRisks, 'latest_risks', 'latest_risks.risk_profile_id', '=', 'risk_profiles.id')
            ->join('suppliers', 'suppliers.id', '=', 'risk_profiles.subject_id');
        $this->applyContext($riskQuery, $filters);
        $riskCounts = $riskQuery->select('risk_profiles.risk_level', DB::raw('COUNT(DISTINCT suppliers.id) as aggregate'))
            ->groupBy('risk_profiles.risk_level')->pluck('aggregate', 'risk_profiles.risk_level');
        $activeCount = (clone $supplier)->where('suppliers.status', 'active')->count();

        return [
            'seller_count' => (clone $supplier)->count(), 'active' => $activeCount,
            'new' => (clone $supplier)->whereBetween('suppliers.created_at', [now()->startOfMonth(), now()->endOfMonth()])->count(),
            'under_review' => (clone $supplier)->where('suppliers.verification_status', 'pending')->count(),
            'suspended' => (clone $supplier)->where('suppliers.status', 'inactive')->count(),
            'gmv' => $gmv, 'average_gmv' => $currency && $activeCount > 0 ? round($gmv / $activeCount, 2) : null,
            'currency' => $currency, 'currencies' => $currencies->all(), 'orders' => $totalOrders,
            'cancellation_rate' => $totalOrders > 0 ? round(((int) ((clone $orders)->where('status', 'cancelled')->count()) / $totalOrders) * 100, 2) : null,
            'average_rating' => ($value = (clone $supplier)->where('suppliers.reviews_count', '>', 0)->avg('suppliers.rating')) !== null ? round((float) $value, 2) : null,
            'risk_counts' => $riskCounts->map(fn ($v) => (int) $v)->all(),
            'high_risk' => (int) ($riskCounts['high'] ?? 0) + (int) ($riskCounts['critical'] ?? 0),
            'qualifying_orders' => $qualifyingCount,
        ];
    }

    public function trend(array $filters, ?string $currency): array
    {
        if (! $currency) {
            return [];
        }
        $date = DB::connection()->getDriverName() === 'sqlite' ? 'date(orders.created_at)' : 'CAST(orders.created_at AS DATE)';

        return DB::table('orders')->whereNull('deleted_at')->whereBetween('created_at', [$filters['from'], $filters['to']])->where('currency', $currency)
            ->groupBy(DB::raw($date))->orderBy(DB::raw($date))
            ->selectRaw("{$date} as period, SUM(CASE WHEN status != 'cancelled' THEN total_amount ELSE 0 END) as gmv, COUNT(*) as total_orders, SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) as cancelled_orders")
            ->get()->map(fn ($r) => ['period' => $r->period, 'gmv' => (float) $r->gmv,
                'cancellationRate' => (int) $r->total_orders > 0 ? round(((int) $r->cancelled_orders / (int) $r->total_orders) * 100, 2) : null,
                'fulfilmentRate' => null, 'returnRate' => null])->all();
    }

    public function financial(array $filters, ?string $currency): array
    {
        if (! $currency) {
            return ['available' => false, 'reason' => 'currency_selection_required'];
        }
        $base = DB::table('supplier_settlements')->whereNull('deleted_at')->where('currency', $currency)
            ->whereDate('period_end', '>=', $filters['from']->toDateString())->whereDate('period_end', '<=', $filters['to']->toDateString());

        return ['available' => true, 'currency' => $currency, 'total' => (float) (clone $base)->sum('net_amount'),
            'pending' => (float) (clone $base)->whereIn('status', ['draft', 'pending', 'approved'])->sum('net_amount'),
            'exceptions' => (float) (clone $base)->whereIn('status', ['failed', 'exception'])->sum('net_amount'),
            'refundLiability' => (float) (clone $base)->sum('refund_adjustment')];
    }

    private function baseQuery(array $filters): Builder
    {
        $orders = DB::table('orders')->whereNull('deleted_at')->whereBetween('created_at', [$filters['from'], $filters['to']]);
        if ($filters['currency'] ?? null) {
            $orders->where('currency', $filters['currency']);
        }
        $orders->groupBy('supplier_id')->selectRaw("supplier_id, COUNT(*) as order_count, SUM(CASE WHEN status != 'cancelled' THEN 1 ELSE 0 END) as qualifying_order_count, SUM(CASE WHEN status != 'cancelled' THEN total_amount ELSE 0 END) as gmv, SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) as cancelled_orders, MAX(updated_at) as last_order_at");
        $listings = DB::table('products')->whereNull('deleted_at')->where('status', 'active')->where('approval_status', 'approved')->groupBy('supplier_id')->selectRaw('supplier_id, COUNT(*) as active_listings');

        return DB::table('suppliers')->leftJoinSub($orders, 'seller_orders', 'seller_orders.supplier_id', '=', 'suppliers.id')
            ->leftJoinSub($listings, 'seller_listings', 'seller_listings.supplier_id', '=', 'suppliers.id')
            ->select(['suppliers.id', 'suppliers.company_name', 'suppliers.business_type', 'suppliers.country', 'suppliers.verification_status', 'suppliers.compliance_status', 'suppliers.status', 'suppliers.rating', 'suppliers.reviews_count', 'suppliers.risk_score', 'suppliers.updated_at',
                DB::raw('COALESCE(seller_listings.active_listings, 0) as active_listings'), DB::raw('COALESCE(seller_orders.order_count, 0) as order_count'), DB::raw('COALESCE(seller_orders.qualifying_order_count, 0) as qualifying_order_count'), DB::raw('COALESCE(seller_orders.gmv, 0) as gmv'), DB::raw('COALESCE(seller_orders.cancelled_orders, 0) as cancelled_orders'), 'seller_orders.last_order_at']);
    }

    private function applyFilters(Builder $query, array $filters): void
    {
        $this->applyContext($query, $filters);
        match ($filters['status'] ?? 'all') {
            'active' => $query->where('suppliers.status', 'active'), 'under-review' => $query->where('suppliers.verification_status', 'pending'),
            'suspended' => $query->where('suppliers.status', 'inactive'),
            'high-risk' => $query->whereExists(fn ($r) => $r->from('risk_profiles')->whereColumn('risk_profiles.subject_id', 'suppliers.id')->whereIn('risk_profiles.subject_type', self::SUPPLIER_SUBJECTS)->whereIn('risk_profiles.risk_level', ['high', 'critical'])->where('risk_profiles.status', 'active')->whereNull('risk_profiles.deleted_at')),
            'new' => $query->whereBetween('suppliers.created_at', [now()->startOfMonth(), now()->endOfMonth()]), default => null,
        };
        if ($risk = $filters['riskLevel'] ?? null) {
            $query->whereExists(fn ($r) => $r->from('risk_profiles')->whereColumn('risk_profiles.subject_id', 'suppliers.id')->whereIn('risk_profiles.subject_type', self::SUPPLIER_SUBJECTS)->where('risk_profiles.risk_level', $risk)->where('risk_profiles.status', 'active')->whereNull('risk_profiles.deleted_at'));
        }
    }

    private function applyContext(Builder $query, array $filters): void
    {
        if ($search = $filters['search'] ?? null) {
            $term = '%'.mb_strtolower($search).'%';
            $query->where(fn ($q) => $q->whereRaw('LOWER(suppliers.company_name) LIKE ?', [$term])->orWhereRaw('CAST(suppliers.id AS TEXT) LIKE ?', [$term]));
        }
        if ($value = $filters['verificationStatus'] ?? null) {
            $query->where('suppliers.verification_status', $value);
        }
        if ($value = $filters['businessType'] ?? null) {
            $query->where('suppliers.business_type', $value);
        }
        if ($value = $filters['country'] ?? null) {
            $query->where('suppliers.country', $value);
        }
    }
}
