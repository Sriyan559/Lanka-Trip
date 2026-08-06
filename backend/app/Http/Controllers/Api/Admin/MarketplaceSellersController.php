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
        return ['success' => true, 'data' => $this->sellers->index($request->filters(), $this->permissions($request))];
    }

    public function show(MarketplaceSellersIndexRequest $request, int $seller): array
    {
        $data = $this->sellers->show($seller, $request->filters(), $this->permissions($request));
        abort_if(! $data, 404);
        return ['success' => true, 'data' => $data];
    }

    public function export(MarketplaceSellersIndexRequest $request): StreamedResponse
    {
        abort_unless($request->user()->hasPermission('analytics.export'), 403);
        return response()->streamDownload(function () use ($request): void {
            $out = fopen('php://output', 'wb');
            fputcsv($out, ['Seller ID', 'Company', 'Status', 'Verification', 'Risk', 'Orders', 'GMV', 'Currency', 'Fulfilment Rate', 'Cancellation Rate', 'Return Case Rate', 'Rating', 'Updated At']);
            foreach ($this->sellers->export($request->filters()) as $row) {
                $safe = fn ($value) => is_string($value) && preg_match('/^[=+\-@]/', $value) ? "'{$value}" : $value;
                fputcsv($out, array_map($safe, [$row['sellerCode'], $row['name'], $row['status'], $row['verificationStatus'], $row['riskLevel'], $row['orders'], $row['gmv']['amount'] ?? null, $row['gmv']['currency'] ?? null, $row['fulfilmentRate'], $row['cancellationRate'], $row['returnRate'], $row['rating'], $row['updatedAt']]));
            }
            fclose($out);
        }, 'marketplace-sellers-'.now()->format('Y-m-d-His').'.csv', ['Content-Type' => 'text/csv; charset=UTF-8']);
    }

    private function permissions(MarketplaceSellersIndexRequest $request): array
    {
        return ['canView' => true, 'canExport' => $request->user()->hasPermission('analytics.export'), 'canManage' => $request->user()->hasPermission('suppliers.manage')];
    }
}
