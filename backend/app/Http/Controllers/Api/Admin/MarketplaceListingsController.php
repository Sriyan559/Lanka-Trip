<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\MarketplaceListingsIndexRequest;
use App\Services\Admin\MarketplaceListingService;
use Symfony\Component\HttpFoundation\StreamedResponse;

class MarketplaceListingsController extends Controller
{
    public function __construct(private readonly MarketplaceListingService $listings) {}

    public function index(MarketplaceListingsIndexRequest $request): array
    {
        return ['success' => true, 'data' => $this->listings->index($request->filters(), [
            'can_update' => $request->user()->hasPermission('products.manage'),
            'can_export' => $request->user()->hasPermission('analytics.export'),
        ])];
    }

    public function show(MarketplaceListingsIndexRequest $request, int $listing): array
    {
        $data = $this->listings->show($listing);
        abort_if(! $data, 404);

        return ['success' => true, 'data' => $data];
    }

    public function export(MarketplaceListingsIndexRequest $request): StreamedResponse
    {
        abort_unless($request->user()->hasPermission('analytics.export'), 403);
        $filename = 'marketplace-listings-'.now()->format('Y-m-d-His').'.csv';

        return response()->streamDownload(function () use ($request): void {
            $out = fopen('php://output', 'wb');
            fputcsv($out, ['Listing ID', 'Name', 'Seller', 'Category', 'Price', 'Currency', 'Stock', 'Sales 30 Days', 'Policy Status', 'Risk', 'Listing Status', 'Updated At']);
            foreach ($this->listings->export($request->filters()) as $row) {
                $safe = fn ($value) => is_string($value) && preg_match('/^[=+\-@]/', $value) ? "'{$value}" : $value;
                fputcsv($out, array_map($safe, [$row['listingCode'], $row['name'], $row['seller']['name'] ?? null, $row['category']['name'] ?? null, $row['sellingPrice']['amount'], $row['sellingPrice']['currency'], $row['stock'], $row['sales30Days'], $row['policyStatus'], $row['riskLevel'], $row['listingStatus'], $row['updatedAt']]));
            }
            fclose($out);
        }, $filename, ['Content-Type' => 'text/csv; charset=UTF-8']);
    }
}
