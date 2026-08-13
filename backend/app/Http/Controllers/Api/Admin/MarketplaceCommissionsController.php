<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\MarketplaceCommissionsIndexRequest;
use App\Services\Admin\MarketplaceCommissionService;
use Symfony\Component\HttpFoundation\StreamedResponse;

class MarketplaceCommissionsController extends Controller
{
    public function __construct(private readonly MarketplaceCommissionService $commissions) {}

    public function index(MarketplaceCommissionsIndexRequest $request): array
    {
        return ['success' => true, 'data' => $this->commissions->index($request->filters(), ['can_export' => $request->user()->hasPermission('analytics.export')])];
    }

    public function show(MarketplaceCommissionsIndexRequest $request,string $id): array { $data=$this->commissions->show($id,['canExport'=>$request->user()->hasPermission('analytics.export')]); abort_if(!$data,404); return ['success'=>true,'data'=>$data]; }

    public function export(MarketplaceCommissionsIndexRequest $request): StreamedResponse
    {
        abort_unless($request->user()->hasPermission('analytics.export'), 403);
        $data = $this->commissions->index($request->filters(), ['can_export' => true]);
        activity('admin')->causedBy($request->user())->withProperties([
            'currency' => $data['context']['currency'], 'date_from' => $data['context']['dateFrom'], 'date_to' => $data['context']['dateTo'],
        ])->log('marketplace.commissions.exported');

        return response()->streamDownload(function () use ($data): void {
            $output = fopen('php://output', 'wb');
            fputcsv($output, ['Generated At', $data['meta']['generatedAt']]);
            fputcsv($output, ['Date From', $data['context']['dateFrom']]);
            fputcsv($output, ['Date To', $data['context']['dateTo']]);
            fputcsv($output, ['Currency', $data['context']['currency']]);
            fputcsv($output, []);
            fputcsv($output, ['Metric', 'Availability', 'Value', 'Currency', 'Definition / Reason']);
            foreach ($data['kpis'] as $metric) {
                $safeLabel = preg_match('/^[=+\-@]/', $metric['label']) ? "'{$metric['label']}" : $metric['label'];
                fputcsv($output, [$safeLabel, $metric['available'] ? 'available' : 'unavailable', $metric['value'], $metric['currency'] ?? null, $metric['definition'] ?? $metric['reason']]);
            }
            fclose($output);
        }, 'marketplace-commissions-'.now()->format('Y-m-d-His').'.csv', ['Content-Type' => 'text/csv; charset=UTF-8', 'X-Content-Type-Options' => 'nosniff']);
    }
}
