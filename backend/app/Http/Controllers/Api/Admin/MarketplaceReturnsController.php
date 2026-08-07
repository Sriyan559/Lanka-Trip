<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\MarketplaceReturnsIndexRequest;
use App\Models\ReturnCase;
use App\Services\Admin\MarketplaceReturnService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\StreamedResponse;

class MarketplaceReturnsController extends Controller
{
    public function __construct(private readonly MarketplaceReturnService $service) {}

    public function index(MarketplaceReturnsIndexRequest $request): JsonResponse
    {
        $permissions = [
            'can_export' => $request->user()->hasPermission('analytics.export') || $request->user()->hasPermission('returns.view'),
            'can_mutate' => $request->user()->hasPermission('returns.approve') || $request->user()->hasPermission('returns.review'),
        ];

        $data = $this->service->index($request->filters(), $permissions);

        return $this->successResponse($data);
    }

    public function export(MarketplaceReturnsIndexRequest $request): StreamedResponse
    {
        abort_unless(
            $request->user()->hasPermission('analytics.export') || $request->user()->hasPermission('returns.view'),
            403,
            'Unauthorized to export returns report.'
        );

        $filters = $request->filters();
        activity('admin')
            ->causedBy($request->user())
            ->withProperties(['filters' => $filters])
            ->log('marketplace.returns.exported');

        return response()->streamDownload(function () use ($filters): void {
            $out = fopen('php://output', 'wb');
            fputcsv($out, [
                'Return Reference',
                'DB Return ID',
                'Order Reference',
                'Customer Name',
                'Customer Email',
                'Product Name',
                'Product SKU',
                'Supplier Name',
                'Qty',
                'Return Type',
                'Reason Category',
                'Eligibility Status',
                'Inspection Status',
                'Refund Status',
                'Dispute Status',
                'Risk Level',
                'SLA Status',
                'Assigned Officer',
                'Opened Date',
            ]);

            $safe = fn ($value) => is_string($value) && preg_match('/^[=+\-@]/', $value) ? "'{$value}" : $value;

            foreach ($this->service->export($filters) as $row) {
                fputcsv($out, array_map($safe, [
                    $row['returnReference'],
                    $row['dbReturnId'],
                    $row['orderReference'],
                    $row['customerName'],
                    $row['customerEmail'],
                    $row['productName'],
                    $row['productSku'],
                    $row['supplierName'],
                    $row['quantity'],
                    $row['returnType'],
                    $row['reasonCategory'],
                    $row['eligibilityStatus'],
                    $row['inspectionStatus'],
                    $row['refundStatus'],
                    $row['disputeStatus'],
                    $row['riskLevel'],
                    $row['slaStatus'],
                    $row['assignedOfficer'],
                    $row['openedDate'],
                ]));
            }

            fclose($out);
        }, 'Returns_Report_' . now()->format('Y-m-d_His') . '.csv', [
            'Content-Type' => 'text/csv; charset=UTF-8',
            'X-Content-Type-Options' => 'nosniff',
        ]);
    }

    public function bulkAssign(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'returnIds' => ['required', 'array', 'min:1'],
            'officerName' => ['required', 'string', 'max:120'],
            'reason' => ['required', 'string', 'max:1000'],
        ]);

        $res = $this->service->bulkAssign(
            $validated['returnIds'],
            $validated['officerName'],
            $validated['reason'],
            $request->user()->id
        );

        return $this->successResponse($res);
    }

    public function overrideInspection(Request $request, ReturnCase $returnCase): JsonResponse
    {
        $validated = $request->validate([
            'reason' => ['required', 'string', 'max:1000'],
        ]);

        $res = $this->service->overrideInspection($returnCase, $validated['reason'], $request->user()->id);

        return $this->successResponse($res);
    }

    public function approveRefund(Request $request, ReturnCase $returnCase): JsonResponse
    {
        $validated = $request->validate([
            'reason' => ['required', 'string', 'max:1000'],
        ]);

        $res = $this->service->approveRefund($returnCase, $validated['reason'], $request->user()->id);

        return $this->successResponse($res);
    }
}
