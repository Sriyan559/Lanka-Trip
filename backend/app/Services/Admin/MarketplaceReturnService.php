<?php

namespace App\Services\Admin;

use App\Models\ReturnCase;
use App\Repositories\Admin\MarketplaceReturnRepository;
use Illuminate\Support\Facades\DB;

class MarketplaceReturnService
{
    public function __construct(private readonly MarketplaceReturnRepository $repository) {}

    public function index(array $filters, array $permissions = []): array
    {
        $page = $this->repository->paginate($filters);
        $metrics = $this->repository->metrics($filters);
        $operationsHealth = $this->repository->operationsHealth($filters);
        $priorityAlerts = $this->repository->priorityAlerts($filters);
        $refundPerformance = $this->repository->refundPerformance($filters);
        $quickQueue = $this->repository->quickQueue($filters);
        $liabilitySummary = $this->repository->liabilitySummary($filters);

        $items = array_map(fn (ReturnCase $case) => $this->transformRow($case), $page->items());

        return [
            'data' => $items,
            'total' => $page->total(),
            'page' => $page->currentPage(),
            'pageSize' => $page->perPage(),
            'totalPages' => max(1, $page->lastPage()),
            'metrics' => $metrics,
            'operationsHealth' => $operationsHealth,
            'priorityAlerts' => $priorityAlerts,
            'refundPerformance' => $refundPerformance,
            'quickQueue' => $quickQueue,
            'liabilitySummary' => $liabilitySummary,
            'permissions' => [
                'canView' => true,
                'canExport' => (bool) ($permissions['can_export'] ?? true),
                'canMutate' => (bool) ($permissions['can_mutate'] ?? true),
            ],
            'meta' => [
                'page' => $page->currentPage(),
                'pageSize' => $page->perPage(),
                'total' => $page->total(),
                'totalPages' => max(1, $page->lastPage()),
                'from' => $page->firstItem(),
                'to' => $page->lastItem(),
                'generatedAt' => now()->toIso8601String(),
            ],
        ];
    }

    public function export(array $filters): array
    {
        $rows = $this->repository->exportRows($filters);

        return $rows->map(fn (ReturnCase $case) => $this->transformRow($case))->all();
    }

    public function bulkAssign(array $returnIds, string $officerName, string $reason, int $actorId): array
    {
        abort_if(empty($returnIds), 422, 'At least one return case must be selected.');
        abort_if(blank($officerName), 422, 'Officer selection is required.');
        abort_if(blank($reason), 422, 'Reason is required for bulk assignment.');

        DB::transaction(function () use ($returnIds, $officerName, $reason, $actorId): void {
            foreach ($returnIds as $id) {
                $case = ReturnCase::find($id) ?: ReturnCase::where('return_number', $id)->first();
                if (!$case) {
                    continue;
                }

                $meta = $case->metadata ?? [];
                $meta['assigned_officer'] = $officerName;
                $case->update(['metadata' => $meta]);

                DB::table('return_status_history')->insert([
                    'return_case_id' => $case->id,
                    'actor_id' => $actorId,
                    'from_status' => $case->status,
                    'to_status' => $case->status,
                    'notes' => "Bulk assigned to {$officerName}: {$reason}",
                    'created_at' => now(),
                ]);
            }
        });

        return [
            'success' => true,
            'message' => "Assigned " . count($returnIds) . " return cases to {$officerName} successfully.",
        ];
    }

    public function overrideInspection(ReturnCase $case, string $reason, int $actorId): array
    {
        abort_if(blank($reason), 422, 'A mandatory reason is required to override physical inspection.');

        DB::transaction(function () use ($case, $reason, $actorId): void {
            $meta = $case->metadata ?? [];
            $meta['inspection_override'] = true;
            $meta['inspection_override_reason'] = $reason;

            $case->update([
                'status' => $case->status === 'inspection_pending' ? 'refund_pending' : $case->status,
                'metadata' => $meta,
            ]);

            DB::table('return_inspections')->insert([
                'return_case_id' => $case->id,
                'inspector_id' => $actorId,
                'result' => 'overridden',
                'notes' => "Inspection requirement overridden: {$reason}",
                'inspected_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            DB::table('return_status_history')->insert([
                'return_case_id' => $case->id,
                'actor_id' => $actorId,
                'from_status' => $case->status,
                'to_status' => $case->status,
                'notes' => "Inspection requirement overridden: {$reason}",
                'created_at' => now(),
            ]);
        });

        return [
            'success' => true,
            'message' => "Inspection requirement overridden for case {$case->return_number}.",
        ];
    }

    public function approveRefund(ReturnCase $case, string $reason, int $actorId): array
    {
        abort_if(blank($reason), 422, 'A mandatory reason is required to approve refund.');

        DB::transaction(function () use ($case, $reason, $actorId): void {
            $case->update([
                'status' => 'completed',
                'reviewed_by' => $actorId,
                'reviewed_at' => now(),
                'completed_at' => now(),
            ]);

            DB::table('return_status_history')->insert([
                'return_case_id' => $case->id,
                'actor_id' => $actorId,
                'from_status' => $case->status,
                'to_status' => 'completed',
                'notes' => "Full refund approved: {$reason}",
                'created_at' => now(),
            ]);
        });

        return [
            'success' => true,
            'message' => "Refund approved for case {$case->return_number}.",
        ];
    }

    private function transformRow(ReturnCase $case): array
    {
        $meta = $case->metadata ?? [];
        $order = $case->order;
        $customer = $case->customer;
        $supplier = $case->supplier;
        $item = $case->items->first();
        $orderItem = $item?->orderItem;

        $returnReference = $case->return_number;
        $dbReturnId = '#' . $case->id;
        $orderReference = $order ? $order->order_number : 'ORD-2026-009021';
        $dbOrderId = $order ? '#' . $order->id : '#9021';

        $customerName = $customer ? $customer->name : ($meta['customer_name'] ?? 'Elena Rodriguez');
        $customerEmail = $customer ? $customer->email : ($meta['customer_email'] ?? 'elena.r@example.com');
        $productName = $orderItem ? ($orderItem->product_name ?? 'Radiance Vitamin C Serum') : ($meta['product_name'] ?? 'Radiance Vitamin C Serum');
        $productSku = $orderItem ? ($orderItem->sku ?? 'SKU-SER-001') : ($meta['product_sku'] ?? 'SKU-SER-001');
        $supplierName = $supplier ? $supplier->company_name : ($meta['supplier_name'] ?? 'Luxe Distribution');

        $eligibilityStatus = match ($case->status) {
            'requested' => 'ELIGIBLE FOR OVERRIDE',
            'evidence_required' => 'EVIDENCE REQUIRED',
            'under_review' => 'ELIGIBILITY REVIEW',
            'approved', 'return_shipment_pending', 'item_received' => 'ELIGIBLE',
            'inspection_pending' => 'ELIGIBLE FOR INSPECTION',
            'refund_pending', 'completed' => 'ELIGIBLE',
            'rejected' => 'NOT ELIGIBLE',
            default => 'ELIGIBLE',
        };

        $inspectionStatus = match ($case->status) {
            'requested', 'under_review', 'evidence_required' => 'PENDING',
            'approved', 'return_shipment_pending' => 'PENDING',
            'item_received', 'inspection_pending' => 'REQUIRED',
            'refund_pending', 'completed' => ($meta['inspection_override'] ?? false) ? 'OVERRIDDEN' : 'PASSED',
            'rejected' => 'FAILED',
            default => 'PENDING',
        };

        $refundStatus = match ($case->status) {
            'completed' => 'APPROVED',
            'refund_pending' => 'PENDING REVIEW',
            'rejected' => 'REJECTED',
            default => 'PENDING REVIEW',
        };

        $disputeStatus = match ($case->status) {
            'under_review' => 'OPEN',
            'rejected' => 'CLOSED',
            default => 'NONE',
        };

        $riskLevel = $meta['risk_level'] ?? ($case->status === 'under_review' ? 'High' : 'Normal');
        $slaStatus = match ($case->supportCase?->sla_status) {
            'breached' => 'BREACHED',
            'within_target' => 'WITHIN SLA',
            default => 'WITHIN SLA',
        };

        return [
            'id' => (string) $case->id,
            'returnReference' => $returnReference,
            'dbReturnId' => $dbReturnId,
            'orderReference' => $orderReference,
            'dbOrderId' => $dbOrderId,
            'customerName' => $customerName,
            'customerEmail' => $customerEmail,
            'productName' => $productName,
            'productSku' => $productSku,
            'supplierName' => $supplierName,
            'quantity' => (int) ($item->quantity ?? 1),
            'returnType' => $meta['return_type'] ?? 'Product Return',
            'reasonCategory' => $case->reason_code ?: 'Defective Product',
            'conditionReported' => $case->reason ?: 'Sealed, damaged box',
            'eligibilityStatus' => $eligibilityStatus,
            'inspectionStatus' => $inspectionStatus,
            'refundStatus' => $refundStatus,
            'disputeStatus' => $disputeStatus,
            'riskLevel' => $riskLevel,
            'slaStatus' => $slaStatus,
            'assignedOfficer' => $meta['assigned_officer'] ?? 'Elena Vance',
            'openedDate' => $case->created_at ? $case->created_at->format('M d, Y, g:i a') : now()->format('M d, Y, g:i a'),
            'hasEvidenceRequired' => $case->status === 'evidence_required',
            'refundAmount' => (float) ($item->approved_refund_amount ?? 4500.00),
            'currency' => $order?->currency ?: 'LKR',
        ];
    }
}
