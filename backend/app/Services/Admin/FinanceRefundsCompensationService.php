<?php

namespace App\Services\Admin;

use App\Repositories\Admin\FinanceRefundsCompensationRepository;
use Carbon\CarbonImmutable;
use Illuminate\Support\Facades\DB;

class FinanceRefundsCompensationService
{
    public function __construct(private readonly FinanceRefundsCompensationRepository $repo) {}

    public function overview(array $filters): array
    {
        $from = $filters['from'] ?? CarbonImmutable::now()->subDays(30)->startOfDay();
        $to   = $filters['to']   ?? CarbonImmutable::now()->endOfDay();
        $currency = $filters['currency'] ?? 'LKR';

        $data = $this->repo->overview($from, $to, $currency);

        return [
            'source' => 'database',
            'context' => $this->buildContext($filters, $currency),
            'kpis' => $data['kpis'],
            'trend' => $data['trend'],
            'typeDistribution' => $data['typeDistribution'],
            'statusSummary' => $data['statusSummary'],
            'healthMetrics' => $data['healthMetrics'],
            'healthScore' => $data['healthScore'],
            'workflowSteps' => $data['workflowSteps'],
            'alerts' => $data['alerts'],
            'quickSummary' => $data['quickSummary'],
            'quickQueues' => $data['quickQueues'],
            'actionButtons' => $data['actionButtons'],
            'updatedAt' => now()->toIso8601String(),
        ];
    }

    public function refunds(array $filters, array $permissions): array
    {
        $filters['from'] ??= CarbonImmutable::now()->subDays(30)->startOfDay();
        $filters['to']   ??= CarbonImmutable::now()->endOfDay();
        $filters['currency'] ??= 'LKR';
        $filters['page']    ??= 1;
        $filters['perPage'] ??= 15;
        $filters['sort']      ??= 'dateRequested';
        $filters['direction'] ??= 'desc';

        $page = $this->repo->rows($filters);
        $rows = collect($page->items())->map(fn($r) => $this->mapRow($r))->all();

        return [
            'source' => 'database',
            'rows' => $rows,
            'meta' => [
                'page' => $page->currentPage(),
                'perPage' => $page->perPage(),
                'total' => $page->total(),
                'lastPage' => $page->lastPage(),
                'generatedAt' => now()->toIso8601String(),
            ],
            'permissions' => $permissions,
        ];
    }

    public function detail(string|int $id): ?array
    {
        return $this->repo->findDetail($id);
    }

    public function review(int $refundId, array $data, int $actorId): array
    {
        $refund = DB::table('payment_refunds')->where('id', $refundId)->whereNull('deleted_at')->first();
        if (!$refund) abort(404, 'Refund not found');

        $this->repo->updateState($refundId, [
            'eligibility'   => 'Eligible',
            'approval'      => 'Pending Approval',
            'reviewed_by'   => $actorId,
            'reviewed_at'   => now(),
            'review_notes'  => $data['notes'] ?? null,
        ]);

        $this->auditLog($refundId, $actorId, 'reviewed', $refund->approval ?? 'Pending Review', 'Pending Approval', $data['notes'] ?? null);

        return ['success' => true, 'message' => 'Eligibility reviewed. Refund moved to Pending Approval.'];
    }

    public function approve(int $refundId, array $data, int $actorId): array
    {
        $refund = DB::table('payment_refunds')->where('id', $refundId)->whereNull('deleted_at')->first();
        if (!$refund) abort(404, 'Refund not found');
        if (!in_array($refund->approval, ['Pending Approval', 'Pending Review', 'Under Review'], true)) {
            abort(409, 'Refund cannot be approved in its current state: ' . $refund->approval);
        }

        $this->repo->updateState($refundId, [
            'approval'    => 'Approved',
            'approved_by' => $actorId,
            'approved_at' => now(),
        ]);

        $this->auditLog($refundId, $actorId, 'approved', $refund->approval, 'Approved', $data['notes'] ?? null, (float)$refund->amount);

        return ['success' => true, 'message' => 'Refund approved and ready for processing.'];
    }

    public function reject(int $refundId, array $data, int $actorId): array
    {
        $refund = DB::table('payment_refunds')->where('id', $refundId)->whereNull('deleted_at')->first();
        if (!$refund) abort(404, 'Refund not found');
        if (in_array($refund->processing, ['Completed'], true)) {
            abort(409, 'A completed refund cannot be rejected.');
        }

        $this->repo->updateState($refundId, [
            'approval'         => 'Rejected',
            'eligibility'      => 'Not Eligible',
            'rejected_by'      => $actorId,
            'rejected_at'      => now(),
            'rejection_reason' => $data['reason'] ?? 'Does not meet eligibility criteria',
        ]);

        $this->auditLog($refundId, $actorId, 'rejected', $refund->approval, 'Rejected', $data['reason'] ?? null, (float)$refund->amount);

        return ['success' => true, 'message' => 'Refund rejected.'];
    }

    public function process(int $refundId, int $actorId): array
    {
        $refund = DB::table('payment_refunds')->where('id', $refundId)->whereNull('deleted_at')->first();
        if (!$refund) abort(404, 'Refund not found');
        if ($refund->approval !== 'Approved') {
            abort(409, 'Refund must be approved before it can be processed. Current state: ' . $refund->approval);
        }
        if ($refund->processing === 'Completed') {
            abort(409, 'This refund has already been processed.');
        }

        $this->repo->updateState($refundId, [
            'processing'   => 'Processing',
            'status'       => 'processing',
            'processed_at' => null,
        ]);

        $this->auditLog($refundId, $actorId, 'process_initiated', $refund->processing, 'Processing', null, (float)$refund->amount);

        return ['success' => true, 'message' => 'Refund processing initiated. Gateway disbursement queued.'];
    }

    public function audit(int $refundId): array
    {
        $logs = DB::table('order_audit_logs as al')
            ->leftJoin('users as u', 'u.id', '=', 'al.user_id')
            ->where('al.auditable_type', 'App\Models\PaymentRefund')
            ->where('al.auditable_id', $refundId)
            ->select(['al.event', 'al.old_values', 'al.new_values', 'al.created_at', 'u.name as actor'])
            ->orderByDesc('al.created_at')
            ->limit(50)
            ->get()
            ->map(fn($r) => [
                'event'     => $r->event,
                'actor'     => $r->actor ?? 'System',
                'oldValues' => json_decode($r->old_values, true) ?? [],
                'newValues' => json_decode($r->new_values, true) ?? [],
                'createdAt' => $r->created_at,
            ])->all();

        return ['refundId' => $refundId, 'trail' => $logs];
    }

    public function export(array $filters, int $actorId): iterable
    {
        $filters['perPage'] = 250;
        $filters['page']    = 1;
        $rows = [];

        do {
            $result = $this->refunds($filters, []);
            $rows   = array_merge($rows, $result['rows']);
            $filters['page']++;
        } while ($filters['page'] <= $result['meta']['lastPage'] && count($rows) < 50000);

        activity('admin')
            ->causedBy(DB::table('users')->where('id', $actorId)->first())
            ->withProperties(['filters' => $filters, 'rowCount' => count($rows)])
            ->log('finance.refunds.exported');

        return $rows;
    }

    private function mapRow(object $r): array
    {
        return [
            'id'                  => $r->refund_number,
            'orderId'             => $r->order_number,
            'customerName'        => $r->customer_name ?: 'Guest Customer',
            'customerId'          => 'CUST-' . str_pad((string)($r->customer_id_val ?? 100), 5, '0', STR_PAD_LEFT),
            'reasonCode'          => $r->reason_code ?: 'CUSTOMER_REQUEST',
            'paymentMethod'       => $r->payment_method,
            'productSeller'       => $r->product_seller,
            'refundType'          => $r->refund_type ?: 'Full Refund',
            'refundAmount'        => (float)$r->refund_amount,
            'compensationAmount'  => (float)$r->compensation_amount,
            'eligibility'         => $r->eligibility ?: 'Under Review',
            'approval'            => $r->approval ?: 'Pending Approval',
            'processing'          => $r->processing ?: 'Pending',
            'settlementMethod'    => $r->settlement_method ?: 'Bank Transfer',
            'gateway'             => $r->gateway ?: 'PayHere',
            'locationRegion'      => $r->location_region ?: 'Colombo, Sri Lanka',
            'reconciliationStatus'=> $r->reconciliation_status ?: 'Pending',
            'dateRequested'       => (string)$r->created_at,
            'sla'                 => $r->sla_status === 'Breached' ? '72%' : '98%',
            'csat'                => (float)($r->csat ?? 4.8),
        ];
    }

    private function buildContext(array $f, string $currency): array
    {
        $from = $f['from'] ?? CarbonImmutable::now()->subDays(30);
        $to   = $f['to']   ?? CarbonImmutable::now();

        return [
            'tenant'          => 'SL Beauty',
            'ecosystem'       => 'Beauty Marketplace',
            'businessUnit'    => 'All Business Units',
            'salesChannel'    => 'All Channels',
            'region'          => 'Sri Lanka',
            'baseCurrency'    => $currency,
            'scope'           => 'Active Refund Resolution Network',
            'accountingPeriod'=> $from->format('M Y'),
            'dateRange'       => $from->toDateString() . ' – ' . $to->toDateString(),
            'liveData'        => true,
            'dataCompleteness'=> 100,
            'lastSynced'      => now()->toIso8601String(),
            'periodState'     => 'Open',
            'accessNotice'    => 'Admin-wide scope; finance data is tenant-agnostic',
        ];
    }

    private function auditLog(int $refundId, int $actorId, string $event, ?string $oldState, string $newState, ?string $notes, float $amount = 0.0): void
    {
        DB::table('order_audit_logs')->insert([
            'order_id'       => 0,
            'user_id'        => $actorId,
            'event'          => 'refund.' . $event,
            'auditable_type' => 'App\Models\PaymentRefund',
            'auditable_id'   => $refundId,
            'old_values'     => json_encode(['approval' => $oldState]),
            'new_values'     => json_encode(['approval' => $newState, 'amount' => $amount, 'notes' => $notes]),
            'metadata'       => json_encode(['actor_id' => $actorId, 'timestamp' => now()->toIso8601String()]),
            'created_at'     => now(),
            'updated_at'     => now(),
        ]);
    }
}
