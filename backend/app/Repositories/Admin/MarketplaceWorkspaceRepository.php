<?php

namespace App\Repositories\Admin;

use Carbon\CarbonImmutable;
use Illuminate\Database\Query\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class MarketplaceWorkspaceRepository
{
    public function currencies(string $workspace, CarbonImmutable $from, CarbonImmutable $to): Collection
    {
        $table = $workspace === 'commissions' ? 'supplier_settlements' : 'orders';
        $query = DB::table($table)->whereNull('deleted_at');
        $workspace === 'commissions' ? $query->whereBetween('period_end', [$from->toDateString(), $to->toDateString()]) : $query->whereBetween('created_at', [$from, $to]);
        return $query->pluck('currency')->filter()->unique()->sort()->values();
    }

    public function orders(array $filters, CarbonImmutable $from, CarbonImmutable $to, bool $cancelledOnly = false): LengthAwarePaginator
    {
        $items = DB::table('order_items')->whereNull('deleted_at')->groupBy('order_id')->selectRaw('order_id, COUNT(*) AS item_count');
        $payments = DB::table('payments')->whereNull('deleted_at')->groupBy('order_id')->selectRaw('order_id, MAX(payment_status) AS payment_status');
        $shipments = DB::table('order_shipments')->whereNull('deleted_at')->groupBy('order_id')->selectRaw('order_id, MAX(status) AS shipment_status, MAX(delivered_at) AS delivered_at');
        $query = DB::table('orders')->join('users as buyers', 'buyers.id', '=', 'orders.buyer_id')->join('suppliers', 'suppliers.id', '=', 'orders.supplier_id')
            ->leftJoinSub($items, 'item_stats', 'item_stats.order_id', '=', 'orders.id')->leftJoinSub($payments, 'payment_stats', 'payment_stats.order_id', '=', 'orders.id')->leftJoinSub($shipments, 'shipment_stats', 'shipment_stats.order_id', '=', 'orders.id')
            ->whereNull('orders.deleted_at')->whereBetween('orders.created_at', [$from, $to])
            ->select(['orders.id', 'orders.order_number', 'orders.total_amount', 'orders.currency', 'orders.status', 'orders.payment_status as order_payment_status', 'orders.fulfillment_status', 'orders.order_source', 'orders.created_at', 'orders.updated_at', 'buyers.name as customer_name', 'suppliers.id as supplier_id', 'suppliers.company_name as supplier_name', DB::raw('COALESCE(item_stats.item_count, 0) AS item_count'), DB::raw('COALESCE(payment_stats.payment_status, orders.payment_status) AS payment_status'), 'shipment_stats.shipment_status', 'shipment_stats.delivered_at']);
        if ($cancelledOnly) $query->where('orders.status', 'cancelled');
        $this->orderFilters($query, $filters);
        $sort = ['reference' => 'orders.order_number', 'name' => 'buyers.name', 'status' => 'orders.status', 'amount' => 'orders.total_amount', 'createdAt' => 'orders.created_at', 'updatedAt' => 'orders.updated_at'][$filters['sortBy']];
        return $query->orderBy($sort, $filters['sortDirection'])->orderBy('orders.id')->paginate($filters['perPage'], ['*'], 'page', $filters['page']);
    }

    public function orderMetrics(array $filters, CarbonImmutable $from, CarbonImmutable $to, ?string $currency, bool $cancelledOnly = false): array
    {
        $query = DB::table('orders')->whereNull('deleted_at')->whereBetween('created_at', [$from, $to]);
        if ($cancelledOnly) $query->where('status', 'cancelled');
        if (! empty($filters['supplierId'])) $query->where('supplier_id', $filters['supplierId']);
        if ($currency) $query->where('currency', $currency);
        $counts = (clone $query)->selectRaw('status, COUNT(*) AS total')->groupBy('status')->pluck('total', 'status')->map(fn ($value) => (int) $value)->all();
        return ['total' => (clone $query)->count(), 'status' => $counts, 'gmv' => $currency ? (string) (clone $query)->where('status', '!=', 'cancelled')->sum('total_amount') : null];
    }

    public function order(int $id): ?object
    {
        return DB::table('orders')->join('users as buyers', 'buyers.id', '=', 'orders.buyer_id')->join('suppliers', 'suppliers.id', '=', 'orders.supplier_id')->whereNull('orders.deleted_at')->where('orders.id', $id)
            ->first(['orders.*', 'buyers.name as customer_name', 'buyers.email as customer_email', 'suppliers.company_name as supplier_name']);
    }

    public function orderItems(int $id): array
    {
        return DB::table('order_items')->whereNull('deleted_at')->where('order_id', $id)->get(['id', 'product_name', 'quantity', 'unit_price', 'tax_amount', 'discount_amount', 'total_amount', 'created_at'])->map(fn ($row) => (array) $row)->all();
    }

    public function orderTimeline(int $id): array
    {
        return DB::table('order_status_histories')->leftJoin('users', 'users.id', '=', 'order_status_histories.changed_by')->where('order_id', $id)->orderByDesc('order_status_histories.created_at')->get(['order_status_histories.id', 'previous_status', 'new_status', 'notes', 'order_status_histories.created_at', 'users.name as actor'])->map(fn ($row) => (array) $row)->all();
    }

    public function returns(array $filters, CarbonImmutable $from, CarbonImmutable $to): LengthAwarePaginator
    {
        $query = DB::table('return_cases')->join('orders', 'orders.id', '=', 'return_cases.order_id')->join('users as customers', 'customers.id', '=', 'return_cases.customer_id')->leftJoin('suppliers', 'suppliers.id', '=', 'return_cases.supplier_id')->whereNull('return_cases.deleted_at')->whereBetween('return_cases.created_at', [$from, $to])
            ->select(['return_cases.id', 'return_cases.return_number', 'return_cases.status', 'return_cases.reason_code', 'return_cases.resolution', 'return_cases.created_at', 'return_cases.updated_at', 'orders.id as order_id', 'orders.order_number', 'orders.currency', 'orders.total_amount', 'customers.name as customer_name', 'suppliers.id as supplier_id', 'suppliers.company_name as supplier_name']);
        $this->genericFilters($query, $filters, ['return_cases.return_number', 'orders.order_number', 'customers.name', 'suppliers.company_name'], 'return_cases.status', 'return_cases.supplier_id', 'orders.currency');
        $sort = ['reference' => 'return_cases.return_number', 'name' => 'customers.name', 'status' => 'return_cases.status', 'amount' => 'orders.total_amount', 'createdAt' => 'return_cases.created_at', 'updatedAt' => 'return_cases.updated_at'][$filters['sortBy']];
        return $query->orderBy($sort, $filters['sortDirection'])->orderBy('return_cases.id')->paginate($filters['perPage'], ['*'], 'page', $filters['page']);
    }

    public function returnMetrics(array $filters, CarbonImmutable $from, CarbonImmutable $to): array
    {
        $query = DB::table('return_cases')->whereNull('deleted_at')->whereBetween('created_at', [$from, $to]);
        if (! empty($filters['supplierId'])) $query->where('supplier_id', $filters['supplierId']);
        $status = (clone $query)->groupBy('status')->selectRaw('status, COUNT(*) AS total')->pluck('total', 'status')->map(fn ($v) => (int) $v)->all();
        return ['total' => (clone $query)->count(), 'status' => $status];
    }

    public function complianceCases(array $filters, CarbonImmutable $from, CarbonImmutable $to): LengthAwarePaginator
    {
        $query = DB::table('compliance_case_files')->leftJoin('compliance_rules', 'compliance_rules.id', '=', 'compliance_case_files.compliance_rule_id')->leftJoin('users', 'users.id', '=', 'compliance_case_files.assigned_to')->whereNull('compliance_case_files.deleted_at')->whereBetween('compliance_case_files.created_at', [$from, $to])
            ->select(['compliance_case_files.id', 'case_number', 'case_type', 'compliance_case_files.status', 'compliance_status', 'subject_type', 'subject_id', 'compliance_case_files.created_at', 'compliance_case_files.updated_at', 'compliance_rules.name as rule_name', 'compliance_rules.severity', 'users.name as assigned_to']);
        $this->genericFilters($query, $filters, ['case_number', 'case_type', 'compliance_rules.name', 'users.name'], 'compliance_case_files.status');
        $sort = ['reference' => 'case_number', 'name' => 'case_type', 'status' => 'compliance_case_files.status', 'amount' => 'compliance_case_files.id', 'createdAt' => 'compliance_case_files.created_at', 'updatedAt' => 'compliance_case_files.updated_at'][$filters['sortBy']];
        return $query->orderBy($sort, $filters['sortDirection'])->orderBy('compliance_case_files.id')->paginate($filters['perPage'], ['*'], 'page', $filters['page']);
    }

    public function complianceMetrics(CarbonImmutable $from, CarbonImmutable $to): array
    {
        $query = DB::table('compliance_case_files')->whereNull('compliance_case_files.deleted_at')->whereBetween('compliance_case_files.created_at', [$from, $to]);
        return ['total' => (clone $query)->count(), 'open' => (clone $query)->whereNotIn('status', ['resolved', 'dismissed', 'closed'])->count(), 'resolved' => (clone $query)->whereIn('status', ['resolved', 'closed'])->count(), 'critical' => (clone $query)->join('compliance_rules', 'compliance_rules.id', '=', 'compliance_case_files.compliance_rule_id')->where('compliance_rules.severity', 'critical')->count()];
    }

    public function settlements(array $filters, CarbonImmutable $from, CarbonImmutable $to): LengthAwarePaginator
    {
        $query = DB::table('supplier_settlements')->join('suppliers', 'suppliers.id', '=', 'supplier_settlements.supplier_id')->whereNull('supplier_settlements.deleted_at')->whereBetween('period_end', [$from->toDateString(), $to->toDateString()])
            ->select(['supplier_settlements.id', 'settlement_number', 'supplier_settlements.currency', 'gross_amount', 'commission_amount', 'refund_adjustment', 'net_amount', 'supplier_settlements.status', 'period_start', 'period_end', 'supplier_settlements.created_at', 'supplier_settlements.updated_at', 'suppliers.id as supplier_id', 'suppliers.company_name as supplier_name']);
        $this->genericFilters($query, $filters, ['settlement_number', 'suppliers.company_name'], 'supplier_settlements.status', 'supplier_settlements.supplier_id', 'supplier_settlements.currency');
        $sort = ['reference' => 'settlement_number', 'name' => 'suppliers.company_name', 'status' => 'supplier_settlements.status', 'amount' => 'commission_amount', 'createdAt' => 'supplier_settlements.created_at', 'updatedAt' => 'supplier_settlements.updated_at'][$filters['sortBy']];
        return $query->orderBy($sort, $filters['sortDirection'])->orderBy('supplier_settlements.id')->paginate($filters['perPage'], ['*'], 'page', $filters['page']);
    }

    public function settlementMetrics(array $filters, CarbonImmutable $from, CarbonImmutable $to, ?string $currency): array
    {
        $query = DB::table('supplier_settlements')->whereNull('deleted_at')->whereBetween('period_end', [$from->toDateString(), $to->toDateString()]);
        if ($currency) $query->where('currency', $currency);
        if (! empty($filters['supplierId'])) $query->where('supplier_id', $filters['supplierId']);
        return ['total' => (clone $query)->count(), 'commission' => $currency ? (string) (clone $query)->sum('commission_amount') : null, 'gross' => $currency ? (string) (clone $query)->sum('gross_amount') : null, 'net' => $currency ? (string) (clone $query)->sum('net_amount') : null];
    }

    public function marketplaceSettings(array $filters): LengthAwarePaginator
    {
        $query = DB::table('system_settings')->leftJoin('setting_groups', 'setting_groups.id', '=', 'system_settings.setting_group_id')->whereNull('system_settings.deleted_at')->where(fn ($q) => $q->where('setting_key', 'like', 'marketplace.%')->orWhere('setting_groups.group_key', 'marketplace'))
            ->select(['system_settings.id', 'setting_key', 'setting_type', 'is_public', 'system_settings.status', 'system_settings.created_at', 'system_settings.updated_at', 'setting_groups.name as group_name']);
        $this->genericFilters($query, $filters, ['setting_key', 'setting_groups.name'], 'system_settings.status');
        $sort = ['reference' => 'setting_key', 'name' => 'setting_key', 'status' => 'system_settings.status', 'amount' => 'system_settings.id', 'createdAt' => 'system_settings.created_at', 'updatedAt' => 'system_settings.updated_at'][$filters['sortBy']];
        return $query->orderBy($sort, $filters['sortDirection'])->paginate($filters['perPage'], ['*'], 'page', $filters['page']);
    }

    public function observedChannels(array $filters, CarbonImmutable $from, CarbonImmutable $to): LengthAwarePaginator
    {
        $query = DB::table('orders')->whereNull('deleted_at')->whereBetween('created_at', [$from, $to])->groupBy('order_source')->selectRaw("COALESCE(order_source, 'unknown') AS source, COUNT(*) AS orders, COUNT(DISTINCT supplier_id) AS sellers, MAX(created_at) AS last_order_at, MIN(created_at) AS first_order_at");
        if (! empty($filters['search'])) $query->whereRaw("LOWER(COALESCE(order_source, 'unknown')) LIKE ?", ['%'.strtolower($filters['search']).'%']);
        $rows = $query->orderBy($filters['sortBy'] === 'name' ? 'source' : 'last_order_at', $filters['sortDirection'])->get();
        $page = $filters['page']; $perPage = $filters['perPage'];
        return new LengthAwarePaginator($rows->forPage($page, $perPage)->values(), $rows->count(), $perPage, $page);
    }

    private function orderFilters(Builder $query, array $filters): void
    {
        $this->genericFilters($query, $filters, ['orders.order_number', 'buyers.name', 'buyers.email', 'suppliers.company_name'], 'orders.status', 'orders.supplier_id', 'orders.currency');
    }

    private function genericFilters(Builder $query, array $filters, array $searchColumns, string $statusColumn, ?string $supplierColumn = null, ?string $currencyColumn = null): void
    {
        if (! empty($filters['search'])) { $term = '%'.strtolower($filters['search']).'%'; $query->where(fn ($q) => collect($searchColumns)->each(fn ($column, $index) => $index ? $q->orWhereRaw("LOWER({$column}) LIKE ?", [$term]) : $q->whereRaw("LOWER({$column}) LIKE ?", [$term]))); }
        if (! empty($filters['status'])) $query->where($statusColumn, $filters['status']);
        if ($supplierColumn && ! empty($filters['supplierId'])) $query->where($supplierColumn, $filters['supplierId']);
        if ($currencyColumn && ! empty($filters['currency'])) $query->where($currencyColumn, $filters['currency']);
    }
}
