<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\FinanceCommandCenterRequest;
use App\Services\Admin\FinanceCommandCenterService;
use Symfony\Component\HttpFoundation\StreamedResponse;

class FinanceCommandCenterController extends Controller
{
    public function __construct(private readonly FinanceCommandCenterService $finance) {}

    public function dashboard(FinanceCommandCenterRequest $request): array
    {
        return ['success' => true, 'data' => $this->finance->dashboard($request->filters(), ['canExport' => $request->user()->hasPermission('analytics.export')])];
    }

    public function operations(FinanceCommandCenterRequest $request): array
    {
        return ['success' => true, 'data' => $this->finance->operations($request->filters(), ['canExport' => $request->user()->hasPermission('analytics.export')])];
    }

    public function show(FinanceCommandCenterRequest $request, string $recordKey): array
    {
        $detail = $this->finance->operation($recordKey); abort_if(!$detail, 404);
        return ['success' => true, 'data' => $detail];
    }

    public function export(FinanceCommandCenterRequest $request): StreamedResponse
    {
        abort_unless($request->user()->hasPermission('analytics.export'), 403);
        $filters = [...$request->filters(), 'page' => 1, 'perPage' => 100];
        $rows = []; do { $result = $this->finance->operations($filters, ['canExport' => true]); $rows = [...$rows, ...$result['items']]; $filters['page']++; } while ($filters['page'] <= $result['meta']['lastPage']);
        activity('admin')->causedBy($request->user())->withProperties(['filters' => $request->safe()->except(['page', 'perPage'])])->log('finance.command_center.exported');
        return response()->streamDownload(function () use ($rows): void { $out = fopen('php://output', 'wb'); fputcsv($out, ['Reference','Domain','Type','Related Reference','Party','Currency','Gross Amount','Tax','Fees','Commission','Refund','Net Amount','Status','Approval','Transaction Date','Updated At']); foreach ($rows as $row) { $values = array_values(array_intersect_key($row, array_flip(['reference','domain','type','relatedReference','party','currency','grossAmount','taxAmount','feeAmount','commissionAmount','refundAmount','netAmount','status','approvalStatus','transactionDate','updatedAt']))); $values = array_map(fn ($value) => is_string($value) && preg_match('/^[=+\-@]/', $value) ? "'".$value : $value, $values); fputcsv($out, $values); } fclose($out); }, 'finance-report-'.now()->format('Y-m-d-His').'.csv', ['Content-Type' => 'text/csv; charset=UTF-8', 'X-Content-Type-Options' => 'nosniff']);
    }
}
