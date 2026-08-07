<?php

namespace App\Repositories\Admin;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Query\Builder;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class MarketplaceCancellationRepository
{
    public function paginate(array $filters): LengthAwarePaginator
    {
        $query = $this->baseQuery();
        $this->applyFilters($query, $filters);
        $sorts = ['orderReference' => 'orders.order_number', 'customer' => 'buyers.name', 'seller' => 'suppliers.company_name',
            'total' => 'orders.total_amount', 'paymentStatus' => DB::raw('COALESCE(latest_payment.payment_status, orders.payment_status)'),
            'refundAmount' => DB::raw('COALESCE(refunds.refund_amount, 0)'), 'recordedAt' => DB::raw('COALESCE(cancel_history.created_at, orders.updated_at)')];
        return $query->orderBy($sorts[$filters['sortBy']], $filters['sortDirection'])->orderBy('orders.id')->paginate($filters['perPage'], ['*'], 'page', $filters['page']);
    }

    public function exportRows(array $filters): Collection
    {
        $query = $this->baseQuery(); $this->applyFilters($query, $filters);
        return $query->orderByDesc(DB::raw('COALESCE(cancel_history.created_at, orders.updated_at)'))->limit(100000)->get();
    }

    public function metrics(array $filters, ?string $currency): array
    {
        $query = $this->baseQuery(); $this->applyFilters($query, [...$filters, 'currency' => $currency]);
        $refunds = DB::table('payment_refunds')->join('payments', 'payments.id', '=', 'payment_refunds.payment_id')->join('orders', 'orders.id', '=', 'payments.order_id')
            ->whereNull('payment_refunds.deleted_at')->whereNull('payments.deleted_at')->whereNull('orders.deleted_at')->where('orders.status', 'cancelled')
            ->when($currency, fn (Builder $q) => $q->where('orders.currency', $currency))->whereBetween('payment_refunds.created_at', [$filters['from'], $filters['to']]);
        return ['cancelledOrders' => (int) (clone $query)->count(),
            'recordedToday' => (int) (clone $query)->whereDate(DB::raw('COALESCE(cancel_history.created_at, orders.updated_at)'), today())->count(),
            'cancelledThisMonth' => (int) (clone $query)->whereYear(DB::raw('COALESCE(cancel_history.created_at, orders.updated_at)'), today()->year)->whereMonth(DB::raw('COALESCE(cancel_history.created_at, orders.updated_at)'), today()->month)->count(),
            'refundsPending' => (int) (clone $refunds)->where('payment_refunds.status', 'pending')->count(),
            'refundValuePending' => number_format((float) (clone $refunds)->where('payment_refunds.status', 'pending')->sum('payment_refunds.amount'), 2, '.', '')];
    }

    public function trend(array $filters): array
    {
        return $this->baseQuery()->whereBetween(DB::raw('COALESCE(cancel_history.created_at, orders.updated_at)'), [$filters['from'], $filters['to']])
            ->selectRaw("DATE(COALESCE(cancel_history.created_at, orders.updated_at)) AS date, COUNT(*) AS cancelled")
            ->groupByRaw('DATE(COALESCE(cancel_history.created_at, orders.updated_at))')->orderBy('date')->get()
            ->map(fn ($row) => ['date' => $row->date, 'cancelled' => (int) $row->cancelled])->all();
    }

    public function refundSummary(array $filters, ?string $currency): array
    {
        if (! $currency) return [];
        return DB::table('payment_refunds')->join('payments', 'payments.id', '=', 'payment_refunds.payment_id')->join('orders', 'orders.id', '=', 'payments.order_id')
            ->whereNull('payment_refunds.deleted_at')->whereNull('payments.deleted_at')->whereNull('orders.deleted_at')->where('orders.status', 'cancelled')
            ->where('orders.currency', $currency)->whereBetween('payment_refunds.created_at', [$filters['from'], $filters['to']])
            ->selectRaw('payment_refunds.status, COUNT(*) AS count, COALESCE(SUM(payment_refunds.amount), 0) AS amount')->groupBy('payment_refunds.status')->orderBy('payment_refunds.status')->get()
            ->map(fn ($row) => ['status' => $row->status, 'count' => (int) $row->count, 'amount' => number_format((float) $row->amount, 2, '.', '')])->all();
    }

    public function filterOptions(): array
    {
        return ['paymentStatuses' => DB::table('orders')->where('status', 'cancelled')->whereNull('deleted_at')->distinct()->orderBy('payment_status')->pluck('payment_status')->filter()->values()->all(),
            'fulfilmentStatuses' => DB::table('orders')->where('status', 'cancelled')->whereNull('deleted_at')->distinct()->orderBy('fulfillment_status')->pluck('fulfillment_status')->filter()->values()->all(),
            'deliveryStatuses' => DB::table('order_shipments')->join('orders', 'orders.id', '=', 'order_shipments.order_id')->where('orders.status', 'cancelled')->whereNull('order_shipments.deleted_at')->distinct()->orderBy('order_shipments.status')->pluck('order_shipments.status')->filter()->values()->all(),
            'refundStatuses' => DB::table('payment_refunds')->join('payments', 'payments.id', '=', 'payment_refunds.payment_id')->join('orders', 'orders.id', '=', 'payments.order_id')->where('orders.status', 'cancelled')->whereNull('payment_refunds.deleted_at')->distinct()->orderBy('payment_refunds.status')->pluck('payment_refunds.status')->filter()->values()->all(),
            'sellers' => DB::table('suppliers')->join('orders', 'orders.supplier_id', '=', 'suppliers.id')->where('orders.status', 'cancelled')->whereNull('orders.deleted_at')->distinct()->orderBy('suppliers.company_name')->get(['suppliers.id', 'suppliers.company_name as name'])->map(fn ($row) => (array) $row)->all(),
            'customers' => DB::table('users')->join('orders', 'orders.buyer_id', '=', 'users.id')->where('orders.status', 'cancelled')->whereNull('orders.deleted_at')->distinct()->orderBy('users.name')->get(['users.id', 'users.name'])->map(fn ($row) => (array) $row)->all()];
    }

    public function pendingRefundAlerts(array $filters): array
    {
        return DB::table('payment_refunds')->join('payments', 'payments.id', '=', 'payment_refunds.payment_id')->join('orders', 'orders.id', '=', 'payments.order_id')
            ->whereNull('payment_refunds.deleted_at')->where('orders.status', 'cancelled')->where('payment_refunds.status', 'pending')
            ->whereBetween('payment_refunds.created_at', [$filters['from'], $filters['to']])->orderBy('payment_refunds.created_at')->limit(10)
            ->get(['payment_refunds.id', 'orders.id as order_id', 'orders.order_number', 'payment_refunds.refund_number', 'payment_refunds.created_at'])
            ->map(fn ($row) => ['id' => (string) $row->id, 'type' => 'Refund Pending', 'orderId' => (string) $row->order_id, 'orderReference' => $row->order_number, 'refundReference' => $row->refund_number, 'createdAt' => (string) $row->created_at])->all();
    }

    private function baseQuery(): Builder
    {
        $paymentIds = DB::table('payments')->whereNull('deleted_at')->selectRaw('order_id, MAX(id) latest_id')->groupBy('order_id');
        $shipmentIds = DB::table('order_shipments')->whereNull('deleted_at')->selectRaw('order_id, MAX(id) latest_id')->groupBy('order_id');
        $historyIds = DB::table('order_status_histories')->where('new_status', 'cancelled')->selectRaw('order_id, MAX(id) latest_id')->groupBy('order_id');
        $refunds = DB::table('payment_refunds')->join('payments', 'payments.id', '=', 'payment_refunds.payment_id')->whereNull('payment_refunds.deleted_at')->whereNull('payments.deleted_at')
            ->selectRaw("payments.order_id, COUNT(payment_refunds.id) refund_count, COALESCE(SUM(payment_refunds.amount), 0) refund_amount, MAX(payment_refunds.id) latest_refund_id")
            ->groupBy('payments.order_id');
        return DB::table('orders')->join('users as buyers', 'buyers.id', '=', 'orders.buyer_id')->leftJoin('suppliers', 'suppliers.id', '=', 'orders.supplier_id')
            ->leftJoinSub($paymentIds, 'payment_ids', 'payment_ids.order_id', '=', 'orders.id')->leftJoin('payments as latest_payment', 'latest_payment.id', '=', 'payment_ids.latest_id')
            ->leftJoin('payment_methods', 'payment_methods.id', '=', 'latest_payment.payment_method_id')->leftJoinSub($shipmentIds, 'shipment_ids', 'shipment_ids.order_id', '=', 'orders.id')
            ->leftJoin('order_shipments as latest_shipment', 'latest_shipment.id', '=', 'shipment_ids.latest_id')->leftJoinSub($historyIds, 'history_ids', 'history_ids.order_id', '=', 'orders.id')
            ->leftJoin('order_status_histories as cancel_history', 'cancel_history.id', '=', 'history_ids.latest_id')->leftJoinSub($refunds, 'refunds', 'refunds.order_id', '=', 'orders.id')
            ->leftJoin('payment_refunds as latest_refund', 'latest_refund.id', '=', 'refunds.latest_refund_id')->whereNull('orders.deleted_at')->where('orders.status', 'cancelled')
            ->select(['orders.id', 'orders.order_number', 'orders.total_amount', 'orders.currency', 'orders.payment_status', 'orders.fulfillment_status', 'orders.updated_at',
                'buyers.id as customer_id', 'buyers.name as customer_name', 'suppliers.id as seller_id', 'suppliers.company_name as seller_name',
                'latest_payment.payment_status as recorded_payment_status', 'payment_methods.name as payment_method', 'latest_shipment.status as delivery_status', 'latest_shipment.carrier',
                DB::raw('COALESCE(refunds.refund_count, 0) refund_count'), DB::raw('COALESCE(refunds.refund_amount, 0) refund_amount'), 'latest_refund.status as refund_status',
                'cancel_history.created_at as cancellation_recorded_at', DB::raw('COALESCE(cancel_history.created_at, orders.updated_at) recorded_at')]);
    }

    private function applyFilters(Builder $query, array $filters): void
    {
        $query->whereBetween(DB::raw('COALESCE(cancel_history.created_at, orders.updated_at)'), [$filters['from'], $filters['to']]);
        if ($value = $filters['search'] ?? null) {$term = '%'.mb_strtolower($value).'%'; $query->where(fn (Builder $q) => $q->whereRaw('LOWER(orders.order_number) LIKE ?', [$term])->orWhereRaw('LOWER(buyers.name) LIKE ?', [$term])->orWhereRaw('LOWER(buyers.email) LIKE ?', [$term])->orWhereRaw('LOWER(suppliers.company_name) LIKE ?', [$term]));}
        if ($value = $filters['paymentStatus'] ?? null) $query->whereRaw('COALESCE(latest_payment.payment_status, orders.payment_status) = ?', [$value]);
        if ($value = $filters['fulfilmentStatus'] ?? null) $query->where('orders.fulfillment_status', $value);
        if ($value = $filters['deliveryStatus'] ?? null) $query->where('latest_shipment.status', $value);
        if ($value = $filters['refundStatus'] ?? null) $query->where('latest_refund.status', $value);
        if ($value = $filters['sellerId'] ?? null) $query->where('orders.supplier_id', $value);
        if ($value = $filters['customerId'] ?? null) $query->where('orders.buyer_id', $value);
        if ($value = $filters['currency'] ?? null) $query->where('orders.currency', $value);
    }
}
