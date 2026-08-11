<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\FinanceRefundsRequest;
use App\Services\Admin\FinanceRefundsCompensationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\StreamedResponse;

class FinanceRefundsCompensationController extends Controller
{
    public function __construct(private readonly FinanceRefundsCompensationService $service) {}

    /** GET /api/admin/finance/refunds-compensation/overview */
    public function overview(FinanceRefundsRequest $request): array
    {
        return ['success' => true, 'data' => $this->service->overview($request->filters())];
    }

    /** GET /api/admin/finance/refunds-compensation */
    public function index(FinanceRefundsRequest $request): array
    {
        $perms = $this->permissions($request);
        return ['success' => true, 'data' => $this->service->refunds($request->filters(), $perms)];
    }

    /** GET /api/admin/finance/refunds-compensation/{refundId} */
    public function show(Request $request, string $refundId): array
    {
        $detail = $this->service->detail($refundId);
        abort_if(!$detail, 404, 'Refund not found');
        return ['success' => true, 'data' => $detail];
    }

    /** GET /api/admin/finance/refunds-compensation/{refundId}/audit */
    public function audit(Request $request, int $refundId): array
    {
        return ['success' => true, 'data' => $this->service->audit($refundId)];
    }

    /** POST /api/admin/finance/refunds-compensation/{refundId}/review */
    public function review(Request $request, int $refundId): array
    {
        $data = $request->validate(['notes' => ['nullable', 'string', 'max:500']]);
        return $this->service->review($refundId, $data, $request->user()->id);
    }

    /** POST /api/admin/finance/refunds-compensation/{refundId}/approve */
    public function approve(Request $request, int $refundId): array
    {
        abort_unless($request->user()->hasPermission('admin.dashboard.view'), 403, 'You do not have permission to approve refunds.');
        $data = $request->validate(['notes' => ['nullable', 'string', 'max:500']]);
        return $this->service->approve($refundId, $data, $request->user()->id);
    }

    /** POST /api/admin/finance/refunds-compensation/{refundId}/reject */
    public function reject(Request $request, int $refundId): array
    {
        abort_unless($request->user()->hasPermission('admin.dashboard.view'), 403, 'You do not have permission to reject refunds.');
        $data = $request->validate(['reason' => ['required', 'string', 'max:500']]);
        return $this->service->reject($refundId, $data, $request->user()->id);
    }

    /** POST /api/admin/finance/refunds-compensation/{refundId}/process */
    public function process(Request $request, int $refundId): array
    {
        abort_unless($request->user()->hasPermission('admin.dashboard.view'), 403, 'You do not have permission to process refunds.');
        return $this->service->process($refundId, $request->user()->id);
    }

    /** GET /api/admin/finance/refunds-compensation/export */
    public function export(FinanceRefundsRequest $request): StreamedResponse
    {
        abort_unless($request->user()->hasPermission('analytics.export'), 403, 'You do not have permission to export refund data.');
        $rows = $this->service->export($request->filters(), $request->user()->id);

        return response()->streamDownload(function () use ($rows) {
            $out = fopen('php://output', 'wb');
            $headers = ['Refund ID', 'Order ID', 'Customer', 'Reason Code', 'Payment Method', 'Refund Type', 'Refund Amount', 'Compensation', 'Eligibility', 'Approval', 'Processing', 'Gateway', 'Region', 'Reconciliation', 'Date Requested', 'SLA'];
            fputcsv($out, $headers);
            foreach ($rows as $row) {
                fputcsv($out, [
                    $row['id'], $row['orderId'], $row['customerName'], $row['reasonCode'],
                    $row['paymentMethod'], $row['refundType'], $row['refundAmount'],
                    $row['compensationAmount'], $row['eligibility'], $row['approval'],
                    $row['processing'], $row['gateway'], $row['locationRegion'],
                    $row['reconciliationStatus'], $row['dateRequested'], $row['sla'],
                ]);
            }
            fclose($out);
        }, 'finance-refunds-' . now()->format('Y-m-d-His') . '.csv', [
            'Content-Type' => 'text/csv; charset=UTF-8',
            'X-Content-Type-Options' => 'nosniff',
        ]);
    }

    private function permissions(FinanceRefundsRequest $r): array
    {
        return [
            'canView'     => true,
            'canExport'   => $r->user()->hasPermission('analytics.export'),
            'canApprove'  => $r->user()->hasPermission('admin.dashboard.view'),
            'canReject'   => $r->user()->hasPermission('admin.dashboard.view'),
            'canProcess'  => $r->user()->hasPermission('admin.dashboard.view'),
        ];
    }
}
