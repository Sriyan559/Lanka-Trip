<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\MarketplaceCancellationsIndexRequest;
use App\Services\Admin\MarketplaceCancellationService;
use Symfony\Component\HttpFoundation\StreamedResponse;

class MarketplaceCancellationsController extends Controller
{
    public function __construct(private readonly MarketplaceCancellationService $cancellations) {}

    public function index(MarketplaceCancellationsIndexRequest $request): array
    {
        return ['success' => true, 'data' => $this->cancellations->index($request->filters(), ['can_export' => $request->user()->hasPermission('analytics.export')])];
    }

    public function export(MarketplaceCancellationsIndexRequest $request): StreamedResponse
    {
        abort_unless($request->user()->hasPermission('analytics.export'), 403);
        $filters = $request->filters();
        activity('admin')->causedBy($request->user())->withProperties(['date_from' => $filters['from']->toDateString(), 'date_to' => $filters['to']->toDateString()])->log('marketplace.cancellations.exported');
        return response()->streamDownload(function () use ($filters): void {
            $out = fopen('php://output', 'wb'); fputcsv($out, ['Order Reference', 'Database Order ID', 'Customer', 'Seller', 'Order Total', 'Currency', 'Payment Status', 'Fulfilment Status', 'Delivery Status', 'Refund Count', 'Refund Amount', 'Refund Status', 'Recorded At', 'Timestamp Source']);
            $safe = fn ($value) => is_string($value) && preg_match('/^[=+\-@]/', $value) ? "'{$value}" : $value;
            foreach ($this->cancellations->export($filters) as $row) fputcsv($out, array_map($safe, [$row['orderReference'], $row['orderId'], $row['customer']['name'], $row['seller']['name'] ?? null, $row['orderTotal']['amount'], $row['orderTotal']['currency'], $row['paymentStatus'], $row['fulfilmentStatus'], $row['delivery']['status'] ?? null, $row['refund']['count'], $row['refund']['amount'], $row['refund']['status'], $row['recordedAt'], $row['timestampSource']]));
            fclose($out);
        }, 'marketplace-cancellations-'.now()->format('Y-m-d-His').'.csv', ['Content-Type' => 'text/csv; charset=UTF-8', 'X-Content-Type-Options' => 'nosniff']);
    }
}
