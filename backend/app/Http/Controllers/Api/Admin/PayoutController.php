<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Payout;
use App\Models\SupplierSettlement;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class PayoutController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $this->authorize('viewAny', Payout::class);
        $validated = $request->validate([
            'status' => ['nullable', Rule::in(Payout::STATUSES)],
            'currency' => ['nullable', 'string', 'size:3'],
            'supplier_id' => ['nullable', 'integer'],
            'per_page' => ['nullable', 'integer', 'between:1,100'],
        ]);
        $query = Payout::with('supplier:id,company_name')->latest();
        foreach (['status', 'currency', 'supplier_id'] as $field) {
            if (isset($validated[$field])) {
                $query->where($field, $field === 'currency' ? strtoupper($validated[$field]) : $validated[$field]);
            }
        }

        return $this->successResponse(['payouts' => $query->paginate($validated['per_page'] ?? 25)]);
    }

    public function summary(Request $request): JsonResponse
    {
        $this->authorize('viewAny', Payout::class);

        return $this->successResponse([
            'summary' => Payout::query()->groupBy('currency', 'status')
                ->selectRaw('currency, status, COUNT(*) AS count, SUM(net_amount) AS amount')
                ->orderBy('currency')->orderBy('status')->get(),
        ]);
    }

    public function show(Payout $payout): JsonResponse
    {
        $this->authorize('view', $payout);

        return $this->successResponse(['payout' => $payout->load(['supplier', 'settlement.items', 'items.orderItem', 'approver:id,name'])]);
    }

    public function settlements(Request $request): JsonResponse
    {
        $this->authorize('viewAny', Payout::class);

        return $this->successResponse([
            'settlements' => SupplierSettlement::with('supplier:id,company_name')
                ->latest()->paginate($request->integer('per_page', 25)),
        ]);
    }

    public function transition(Request $request, Payout $payout): JsonResponse
    {
        $validated = $request->validate([
            'status' => ['required', Rule::in(Payout::STATUSES)],
            'payment_reference' => ['nullable', 'string', 'max:255'],
            'failure_reason' => ['nullable', 'string', 'max:2000'],
        ]);
        $ability = in_array($validated['status'], ['approved'], true) ? 'approve' : 'process';
        $this->authorize($ability, $payout);
        abort_unless($payout->canTransitionTo($validated['status']), 422, 'Invalid payout status transition.');
        if ($validated['status'] === 'paid') {
            abort_if(blank($validated['payment_reference'] ?? null), 422, 'A payment reference is required.');
        }
        if ($validated['status'] === 'failed') {
            abort_if(blank($validated['failure_reason'] ?? null), 422, 'A failure reason is required.');
        }

        DB::transaction(function () use ($request, $payout, $validated): void {
            $from = $payout->status;
            $timestamps = match ($validated['status']) {
                'approved' => ['approved_by' => $request->user()->id, 'approved_at' => now()],
                'processing' => ['processed_at' => now()],
                'paid' => ['paid_at' => now(), 'payment_reference' => $validated['payment_reference']],
                'failed' => ['failed_at' => now(), 'failure_reason' => $validated['failure_reason']],
                default => [],
            };
            $payout->update(['status' => $validated['status'], ...$timestamps]);
            activity('admin')
                ->causedBy($request->user())
                ->performedOn($payout)
                ->withProperties(['from_status' => $from, 'to_status' => $validated['status']])
                ->log('payout.status_changed');
        });

        return $this->successResponse(['payout' => $payout->refresh()], 'Payout status updated.');
    }
}
