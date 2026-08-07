<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\MarketplaceSellersIndexRequest;
use App\Services\Admin\MarketplaceSellerService;
use Symfony\Component\HttpFoundation\StreamedResponse;

class MarketplaceSellersController extends Controller
{
    public function __construct(private readonly MarketplaceSellerService $sellers) {}

    public function index(MarketplaceSellersIndexRequest $request): array
    {
        return ['success' => true, 'data' => $this->sellers->index($request->filters(), ['can_export' => $request->user()->hasPermission('analytics.export')])];
    }

    public function export(MarketplaceSellersIndexRequest $request): StreamedResponse
    {
        abort_unless($request->user()->hasPermission('analytics.export'), 403);

        return response()->streamDownload(function () use ($request): void {
            $out = fopen('php://output', 'wb');
            fputcsv($out, ['Seller ID', 'Seller', 'Type', 'Country', 'Status', 'Verification', 'Risk', 'Active Listings', 'Orders', 'GMV', 'Currency', 'Cancellation Rate', 'Rating', 'Last Activity']);
            foreach ($this->sellers->export($request->filters()) as $row) {
                $safe = fn ($v) => is_string($v) && preg_match('/^[=+\-@]/', $v) ? "'{$v}" : $v;
                fputcsv($out, array_map($safe, [$row['sellerCode'], $row['name'], $row['type'], $row['country'], $row['status'], $row['verificationStatus'], $row['riskLevel'], $row['activeListings'], $row['orders'], $row['gmv']['value'], $row['gmv']['currency'] ?? null, $row['cancellationRate']['value'], $row['rating']['value'], $row['lastActivityAt']]));
            } fclose($out);
        }, 'marketplace-sellers-'.now()->format('Y-m-d-His').'.csv', ['Content-Type' => 'text/csv; charset=UTF-8', 'X-Content-Type-Options' => 'nosniff']);
    }

    public function show(MarketplaceSellersIndexRequest $request, int $seller): array
    {
        $data = $this->sellers->show($seller, $request->filters(), ['can_export' => $request->user()->hasPermission('analytics.export')]);
        abort_if(! $data, 404);

        return ['success' => true, 'data' => $data];
    }
}
