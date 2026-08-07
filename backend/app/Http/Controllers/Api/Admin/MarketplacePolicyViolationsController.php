<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\MarketplacePolicyViolationsIndexRequest;
use App\Services\Admin\MarketplacePolicyViolationService;
use Symfony\Component\HttpFoundation\StreamedResponse;

class MarketplacePolicyViolationsController extends Controller
{
    public function __construct(private readonly MarketplacePolicyViolationService $cases) {}

    public function index(MarketplacePolicyViolationsIndexRequest $request): array
    {
        return ['success' => true, 'data' => $this->cases->index($request->filters(), ['can_export' => $request->user()->hasPermission('analytics.export')])];
    }

    public function show(MarketplacePolicyViolationsIndexRequest $request, int $case): array
    {
        $data = $this->cases->show($case, ['can_export' => $request->user()->hasPermission('analytics.export')]);
        abort_if(! $data, 404);

        return ['success' => true, 'data' => $data];
    }

    public function export(MarketplacePolicyViolationsIndexRequest $request): StreamedResponse
    {
        abort_unless($request->user()->hasPermission('analytics.export'), 403);

        return response()->streamDownload(function () use ($request): void {
            $out = fopen('php://output', 'wb');
            fputcsv($out, ['Case ID', 'Category', 'Status', 'Compliance Status', 'Severity', 'Policy', 'Source Type', 'Source ID', 'Assigned Reviewer', 'Created At', 'Updated At']);
            foreach ($this->cases->export($request->filters()) as $row) {
                $safe = fn ($v) => is_string($v) && preg_match('/^[=+\-@]/', $v) ? "'{$v}" : $v;
                fputcsv($out, array_map($safe, [$row['caseCode'], $row['category'], $row['status'], $row['complianceStatus'], $row['severity'], $row['policy']['name'] ?? null, $row['source']['type'] ?? null, $row['source']['id'] ?? null, $row['assignedReviewer']['name'] ?? null, $row['createdAt'], $row['updatedAt']]));
            }fclose($out);
        }, 'marketplace-policy-violations-'.now()->format('Y-m-d-His').'.csv', ['Content-Type' => 'text/csv; charset=UTF-8', 'X-Content-Type-Options' => 'nosniff']);
    }
}
