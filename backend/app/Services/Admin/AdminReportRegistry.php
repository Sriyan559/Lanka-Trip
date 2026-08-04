<?php

namespace App\Services\Admin;

use Illuminate\Database\Query\Builder;
use Illuminate\Support\Facades\DB;

class AdminReportRegistry
{
    public function definitions(): array
    {
        return [
            'order-performance' => ['name' => 'Order performance', 'description' => 'Order counts and value by status and currency.', 'sorts' => ['status', 'currency', 'orders', 'amount']],
            'payment-performance' => ['name' => 'Payment performance', 'description' => 'Payment counts and amount by status and currency.', 'sorts' => ['status', 'currency', 'payments', 'amount']],
            'revenue-by-currency' => ['name' => 'Revenue by currency', 'description' => 'Successful payment totals separated by ISO currency.', 'sorts' => ['currency', 'gross']],
            'product-performance' => ['name' => 'Product performance', 'description' => 'Ordered quantity and value by product.', 'sorts' => ['product_id', 'quantity', 'amount']],
            'customer-order-activity' => ['name' => 'Customer order activity', 'description' => 'Order activity by customer.', 'sorts' => ['customer_id', 'orders', 'amount']],
            'supplier-activity' => ['name' => 'Supplier activity', 'description' => 'Order activity by supplier.', 'sorts' => ['supplier_id', 'orders', 'amount']],
            'shipment-performance' => ['name' => 'Shipment performance', 'description' => 'Shipment counts by status.', 'sorts' => ['status', 'shipments']],
            'support-case-performance' => ['name' => 'Support case performance', 'description' => 'Support cases by status and priority.', 'sorts' => ['status', 'priority', 'cases']],
        ];
    }

    public function query(string $id, string $from, string $to): ?Builder
    {
        return match ($id) {
            'order-performance' => DB::table('orders')->whereBetween('created_at', [$from, $to])
                ->groupBy('status', 'currency')->selectRaw('status, currency, COUNT(*) AS orders, SUM(total_amount) AS amount'),
            'payment-performance' => DB::table('payments')->leftJoin('currencies', 'currencies.id', '=', 'payments.currency_id')
                ->whereNull('payments.deleted_at')->whereBetween('payments.created_at', [$from, $to])
                ->groupBy('payments.status', 'currencies.code')
                ->selectRaw("payments.status, COALESCE(currencies.code, 'UNKNOWN') AS currency, COUNT(*) AS payments, SUM(payments.amount) AS amount"),
            'revenue-by-currency' => DB::table('payments')->leftJoin('currencies', 'currencies.id', '=', 'payments.currency_id')
                ->whereNull('payments.deleted_at')->whereBetween(DB::raw('COALESCE(payments.paid_at, payments.created_at)'), [$from, $to])
                ->where(fn ($query) => $query->whereIn('payments.status', ['captured', 'successful', 'completed', 'paid'])
                    ->orWhereIn('payments.payment_status', ['captured', 'successful', 'completed', 'paid']))
                ->groupBy('currencies.code')->selectRaw("COALESCE(currencies.code, 'UNKNOWN') AS currency, SUM(payments.amount) AS gross"),
            'product-performance' => DB::table('order_items')->leftJoin('products', 'products.id', '=', 'order_items.product_id')
                ->leftJoin('orders', 'orders.id', '=', 'order_items.order_id')->whereBetween('orders.created_at', [$from, $to])
                ->groupBy('products.id', 'products.name')->selectRaw('products.id AS product_id, products.name, SUM(order_items.quantity) AS quantity, SUM(order_items.total_amount) AS amount'),
            'customer-order-activity' => DB::table('orders')->whereBetween('created_at', [$from, $to])
                ->groupBy('buyer_id')->selectRaw('buyer_id AS customer_id, COUNT(*) AS orders, SUM(total_amount) AS amount'),
            'supplier-activity' => DB::table('orders')->whereBetween('created_at', [$from, $to])
                ->groupBy('supplier_id')->selectRaw('supplier_id, COUNT(*) AS orders, SUM(total_amount) AS amount'),
            'shipment-performance' => DB::table('shipments')->whereNull('deleted_at')->whereBetween('created_at', [$from, $to])
                ->groupBy('status')->selectRaw('status, COUNT(*) AS shipments'),
            'support-case-performance' => DB::table('support_cases')->whereNull('deleted_at')->whereBetween('created_at', [$from, $to])
                ->groupBy('status', 'priority')->selectRaw('status, priority, COUNT(*) AS cases'),
            default => null,
        };
    }
}
