<?php

namespace App\Repositories\Admin;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Query\Builder;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class MarketplaceOrderRepository
{
    public function defaultCurrency(): ?string
    {
        if (! Schema::hasTable('system_settings')) return null;
        $value = DB::table('system_settings')->where('setting_key', 'commerce.default_currency')->where('status', 'active')->value('config_value');

        return is_string($value) ? json_decode($value, true) : null;
    }

    public function currencies(): array
    {
        return Schema::hasTable('currencies')
            ? DB::table('currencies')->where('status', 'active')->orderBy('code')->pluck('code')->all()
            : [];
    }

    public function paginate(array $filters): LengthAwarePaginator
    {
        $query = $this->baseQuery();
        $this->applyFilters($query, $filters);
        $sorts = ['orderReference' => 'orders.order_number', 'customer' => 'buyers.name', 'total' => 'orders.total_amount', 'status' => 'orders.status',
            'paymentStatus' => DB::raw('COALESCE(latest_payment.payment_status, orders.payment_status)'), 'createdAt' => 'orders.created_at', 'deliveryDate' => 'latest_shipment.estimated_delivery_date'];
        $query->orderBy($sorts[$filters['sortBy']], $filters['sortDirection'])->orderBy('orders.id');

        return $query->paginate($filters['perPage'], ['*'], 'page', $filters['page']);
    }

    public function find(int $id): ?object
    {
        return $this->baseQuery()->where('orders.id', $id)->first();
    }

    public function items(int $id): array
    {
        return DB::table('order_items')->leftJoin('products', 'products.id', '=', 'order_items.product_id')->where('order_items.order_id', $id)
            ->whereNull('order_items.deleted_at')->select(['order_items.id', 'order_items.product_name', 'order_items.sku', 'order_items.quantity',
                'order_items.unit', 'order_items.unit_price', 'order_items.tax_amount', 'order_items.discount_amount', 'order_items.total_amount', 'products.id as product_id'])
            ->orderBy('order_items.id')->get()->map(fn (object $row): array => (array) $row)->all();
    }

    public function payments(int $id): array
    {
        return DB::table('payments')->leftJoin('payment_methods', 'payment_methods.id', '=', 'payments.payment_method_id')->where('payments.order_id', $id)
            ->whereNull('payments.deleted_at')->select(['payments.id', 'payments.payment_number', 'payments.amount', 'payments.fee_amount',
                'payments.status', 'payments.payment_status', 'payments.authorized_at', 'payments.paid_at', 'payments.failed_at',
                'payment_methods.name as method_name', 'payment_methods.slug as method_slug'])->orderByDesc('payments.id')->get()->map(fn (object $row): array => (array) $row)->all();
    }

    public function shipments(int $id): array
    {
        return DB::table('order_shipments')->where('order_id', $id)->whereNull('deleted_at')->select(['id', 'shipment_number', 'carrier', 'shipping_method',
            'estimated_ship_date', 'estimated_delivery_date', 'shipped_at', 'delivered_at', 'status'])->orderByDesc('id')->get()->map(fn (object $row): array => (array) $row)->all();
    }

    public function returns(int $id): array
    {
        return DB::table('return_cases')->where('order_id', $id)->whereNull('deleted_at')
            ->select(['id', 'return_number', 'reason_code', 'status', 'created_at', 'updated_at'])
            ->orderByDesc('id')->get()->map(fn (object $row): array => (array) $row)->all();
    }

    public function metrics(array $filters): array
    {
        $base = DB::table('orders')->whereNull('deleted_at')->whereBetween('created_at', [$filters['from'], $filters['to']]);
        if ($filters['currency'] ?? null) $base->where('currency', $filters['currency']);
        $paymentStatus = fn (string $status): int => (int) (clone $base)->where('payment_status', $status)->count();

        return ['totalToday' => (int) (clone $base)->whereDate('created_at', today())->count(), 'pendingPayment' => $paymentStatus('pending'),
            'paymentFailed' => $paymentStatus('failed'), 'processing' => (int) (clone $base)->where('status', 'production')->count(),
            'deliveredToday' => (int) DB::table('order_shipments')->whereNull('deleted_at')->whereDate('delivered_at', today())->distinct()->count('order_id'),
            'cancelled' => (int) (clone $base)->where('status', 'cancelled')->count()];
    }

    public function paymentSummary(array $filters, string $currency): array
    {
        $payments = DB::table('payments')->join('orders', 'orders.id', '=', 'payments.order_id')->whereNull('payments.deleted_at')->whereNull('orders.deleted_at')
            ->where('orders.currency', $currency)->whereBetween('payments.created_at', [$filters['from'], $filters['to']]);
        $sum = fn (Builder $query): string => bcadd((string) $query->sum('payments.amount'), '0', 2);
        $refunds = DB::table('payment_refunds')->join('payments', 'payments.id', '=', 'payment_refunds.payment_id')->join('orders', 'orders.id', '=', 'payments.order_id')
            ->whereNull('payment_refunds.deleted_at')->whereNull('payments.deleted_at')->where('orders.currency', $currency)->where('payment_refunds.status', 'pending')
            ->whereBetween('payment_refunds.created_at', [$filters['from'], $filters['to']]);

        return ['paidToday' => $sum((clone $payments)->where('payments.payment_status', 'paid')->whereDate('payments.paid_at', today())),
            'pendingPayments' => $sum((clone $payments)->where('payments.payment_status', 'pending')),
            'failedPayments' => $sum((clone $payments)->where('payments.payment_status', 'failed')),
            'codPending' => $sum((clone $payments)->join('payment_methods', 'payment_methods.id', '=', 'payments.payment_method_id')->where('payment_methods.slug', 'cod')->where('payments.payment_status', 'pending')),
            'refundsPending' => bcadd((string) $refunds->sum('payment_refunds.amount'), '0', 2)];
    }

    public function filterOptions(): array
    {
        return ['orderStatuses' => DB::table('orders')->whereNull('deleted_at')->distinct()->orderBy('status')->pluck('status')->filter()->values()->all(),
            'paymentStatuses' => DB::table('orders')->whereNull('deleted_at')->distinct()->orderBy('payment_status')->pluck('payment_status')->filter()->values()->all(),
            'fulfilmentStatuses' => DB::table('orders')->whereNull('deleted_at')->distinct()->orderBy('fulfillment_status')->pluck('fulfillment_status')->filter()->values()->all(),
            'deliveryStatuses' => DB::table('order_shipments')->whereNull('deleted_at')->distinct()->orderBy('status')->pluck('status')->filter()->values()->all(),
            'paymentMethods' => DB::table('payment_methods')->where('status', 'active')->orderBy('name')->get(['slug', 'name'])->map(fn ($row) => (array) $row)->all(),
            'suppliers' => DB::table('suppliers')->whereNull('deleted_at')->orderBy('company_name')->get(['id', 'company_name as name'])->map(fn ($row) => (array) $row)->all()];
    }

    public function failedPaymentAlerts(array $filters): array
    {
        return DB::table('payments')->join('orders', 'orders.id', '=', 'payments.order_id')->whereNull('payments.deleted_at')->where('payments.payment_status', 'failed')
            ->whereBetween('payments.created_at', [$filters['from'], $filters['to']])->select(['payments.id', 'orders.id as order_id', 'orders.order_number', 'payments.failed_at'])
            ->orderByDesc('payments.failed_at')->limit(10)->get()->map(fn ($row): array => ['id' => 'payment-'.$row->id, 'type' => 'Failed Payment', 'orderId' => (string) $row->order_id,
                'orderReference' => $row->order_number, 'tone' => 'danger', 'createdAt' => (string) $row->failed_at])->all();
    }

    public function oldestPending(): ?object
    {
        return DB::table('orders')->whereNull('deleted_at')->where('status', 'pending')->orderBy('created_at')->first(['id', 'order_number', 'created_at']);
    }

    public function exportRows(array $filters): Collection
    {
        $query = $this->baseQuery(); $this->applyFilters($query, $filters);
        return $query->orderBy('orders.id')->limit(100000)->get();
    }

    private function baseQuery(): Builder
    {
        $latestPayments = DB::table('payments')->whereNull('deleted_at')->selectRaw('order_id, MAX(id) AS latest_payment_id')->groupBy('order_id');
        $latestShipments = DB::table('order_shipments')->whereNull('deleted_at')->selectRaw('order_id, MAX(id) AS latest_shipment_id')->groupBy('order_id');
        $itemCounts = DB::table('order_items')->whereNull('deleted_at')->selectRaw('order_id, COUNT(*) AS item_count')->groupBy('order_id');
        return DB::table('orders')->join('users as buyers', 'buyers.id', '=', 'orders.buyer_id')->leftJoin('suppliers', 'suppliers.id', '=', 'orders.supplier_id')
            ->leftJoinSub($itemCounts, 'item_counts', 'item_counts.order_id', '=', 'orders.id')->leftJoinSub($latestPayments, 'payment_ids', 'payment_ids.order_id', '=', 'orders.id')
            ->leftJoin('payments as latest_payment', 'latest_payment.id', '=', 'payment_ids.latest_payment_id')->leftJoin('payment_methods', 'payment_methods.id', '=', 'latest_payment.payment_method_id')
            ->leftJoinSub($latestShipments, 'shipment_ids', 'shipment_ids.order_id', '=', 'orders.id')->leftJoin('order_shipments as latest_shipment', 'latest_shipment.id', '=', 'shipment_ids.latest_shipment_id')
            ->whereNull('orders.deleted_at')->select(['orders.id', 'orders.order_number', 'orders.total_amount', 'orders.currency', 'orders.status', 'orders.payment_status',
                'orders.fulfillment_status', 'orders.order_source', 'orders.expected_delivery_date', 'orders.created_at', 'orders.updated_at', 'buyers.id as buyer_id', 'buyers.name as buyer_name',
                'suppliers.id as supplier_id', 'suppliers.company_name as supplier_name', DB::raw('COALESCE(item_counts.item_count, 0) AS item_count'),
                'latest_payment.payment_status as recorded_payment_status', 'payment_methods.name as payment_method_name', 'payment_methods.slug as payment_method_slug',
                'latest_shipment.id as shipment_id', 'latest_shipment.carrier', 'latest_shipment.status as delivery_status', 'latest_shipment.estimated_delivery_date', 'latest_shipment.delivered_at']);
    }

    private function applyFilters(Builder $query, array $filters): void
    {
        $query->whereBetween('orders.created_at', [$filters['from'], $filters['to']]);
        if ($value = $filters['search'] ?? null) {$term = '%'.mb_strtolower($value).'%'; $query->where(fn (Builder $q) => $q->whereRaw('LOWER(orders.order_number) LIKE ?', [$term])->orWhereRaw('LOWER(buyers.name) LIKE ?', [$term])->orWhereRaw('LOWER(buyers.email) LIKE ?', [$term]));}
        if ($value = $filters['orderStatus'] ?? null) $query->where('orders.status', $value);
        if ($value = $filters['paymentStatus'] ?? null) $query->whereRaw('COALESCE(latest_payment.payment_status, orders.payment_status) = ?', [$value]);
        if ($value = $filters['paymentMethod'] ?? null) $query->where('payment_methods.slug', $value);
        if ($value = $filters['fulfilmentStatus'] ?? null) $query->where('orders.fulfillment_status', $value);
        if ($value = $filters['deliveryStatus'] ?? null) $query->where('latest_shipment.status', $value);
        if ($value = $filters['supplierId'] ?? null) $query->where('orders.supplier_id', $value);
        if ($value = $filters['currency'] ?? null) $query->where('orders.currency', $value);
        if (($filters['quickFilter'] ?? null) === 'failed_payment') $query->whereRaw('COALESCE(latest_payment.payment_status, orders.payment_status) = ?', ['failed']);
        if (($filters['quickFilter'] ?? null) === 'cancelled') $query->where('orders.status', 'cancelled');
        if (($filters['quickFilter'] ?? null) === 'return_requested') $query->whereExists(fn (Builder $q) => $q->selectRaw('1')->from('return_cases')->whereColumn('return_cases.order_id', 'orders.id')->whereNull('return_cases.deleted_at'));
    }
}
