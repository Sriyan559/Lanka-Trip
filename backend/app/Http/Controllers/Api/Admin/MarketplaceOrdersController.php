<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\MarketplaceOrdersIndexRequest;
use App\Services\Admin\MarketplaceOrderService;
use Symfony\Component\HttpFoundation\StreamedResponse;

class MarketplaceOrdersController extends Controller
{
    public function __construct(private readonly MarketplaceOrderService $orders) {}

    public function index(MarketplaceOrdersIndexRequest $request): array
    {
        return ['success' => true, 'data' => $this->orders->index($request->filters(), ['can_export' => $request->user()->hasPermission('analytics.export')])];
    }

    public function show(MarketplaceOrdersIndexRequest $request, int $order): array
    {
        $data = $this->orders->show($order, ['can_export' => $request->user()->hasPermission('analytics.export')]);
        abort_if(! $data, 404);
        return ['success' => true, 'data' => $data];
    }

    public function manualCapabilities(MarketplaceOrdersIndexRequest $request): array
    {
        return ['success' => true, 'data' => $this->orders->manualCapabilities()];
    }

    public function export(MarketplaceOrdersIndexRequest $request): StreamedResponse
    {
        abort_unless($request->user()->hasPermission('analytics.export'), 403);
        $filters = $request->filters();
        activity('admin')->causedBy($request->user())->withProperties(['date_from' => $filters['from']->toDateString(), 'date_to' => $filters['to']->toDateString()])->log('marketplace.orders.exported');

        return response()->streamDownload(function () use ($filters): void {
            $out = fopen('php://output', 'wb');
            fputcsv($out, ['Order Reference', 'Database Order ID', 'Customer', 'Supplier', 'Items', 'Total', 'Currency', 'Payment Method', 'Payment Status', 'Order Status', 'Fulfilment Status', 'Created At']);
            $safe = fn ($value) => is_string($value) && preg_match('/^[=+\-@]/', $value) ? "'{$value}" : $value;
            foreach ($this->orders->export($filters) as $row) fputcsv($out, array_map($safe, [$row['orderReference'], $row['databaseOrderId'], $row['customer']['name'], $row['supplier']['name'] ?? null, $row['itemsCount'], $row['total']['amount'], $row['total']['currency'], $row['paymentMethod'], $row['paymentStatus'], $row['orderStatus'], $row['fulfilmentStatus'], $row['createdAt']]));
            fclose($out);
        }, 'marketplace-orders-'.now()->format('Y-m-d-His').'.csv', ['Content-Type' => 'text/csv; charset=UTF-8', 'X-Content-Type-Options' => 'nosniff']);
    }
}
