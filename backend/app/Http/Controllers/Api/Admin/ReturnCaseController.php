<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\ReturnCase;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class ReturnCaseController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $this->authorize('viewAny', ReturnCase::class);
        $validated = $request->validate([
            'status' => ['nullable', Rule::in(ReturnCase::STATUSES)],
            'supplier_id' => ['nullable', 'integer'],
            'per_page' => ['nullable', 'integer', 'between:1,100'],
        ]);
        $query = ReturnCase::with(['customer:id,name,email', 'supplier:id,company_name', 'order:id,order_number'])->latest();
        foreach (['status', 'supplier_id'] as $field) {
            if (isset($validated[$field])) {
                $query->where($field, $validated[$field]);
            }
        }

        return $this->successResponse(['returns' => $query->paginate($validated['per_page'] ?? 25)]);
    }

    public function show(ReturnCase $returnCase): JsonResponse
    {
        $this->authorize('view', $returnCase);

        return $this->successResponse(['return' => $returnCase->load([
            'customer:id,name,email', 'supplier:id,company_name', 'order',
            'items.orderItem', 'supportCase',
        ])->setAttribute('evidence', DB::table('return_evidence')
            ->where('return_case_id', $returnCase->id)
            ->where('status', 'active')
            ->get(['id', 'original_name', 'mime_type', 'size_bytes', 'created_at']))]);
    }

    public function transition(Request $request, ReturnCase $returnCase): JsonResponse
    {
        $validated = $request->validate([
            'status' => ['required', Rule::in(ReturnCase::STATUSES)],
            'notes' => ['nullable', 'string', 'max:2000'],
        ]);
        $ability = $validated['status'] === 'approved' ? 'approve' : 'review';
        $this->authorize($ability, $returnCase);
        abort_unless($returnCase->canTransitionTo($validated['status']), 422, 'Invalid return status transition.');
        if ($validated['status'] === 'rejected') {
            abort_if(blank($validated['notes'] ?? null), 422, 'Decision notes are required for rejection.');
        }

        DB::transaction(function () use ($request, $returnCase, $validated): void {
            $from = $returnCase->status;
            $dates = in_array($validated['status'], ['approved', 'rejected'], true)
                ? ['reviewed_by' => $request->user()->id, 'reviewed_at' => now()]
                : [];
            if ($validated['status'] === 'completed') {
                $dates['completed_at'] = now();
            }
            $returnCase->update(['status' => $validated['status'], ...$dates]);
            DB::table('return_status_history')->insert([
                'return_case_id' => $returnCase->id, 'actor_id' => $request->user()->id,
                'from_status' => $from, 'to_status' => $validated['status'],
                'notes' => $validated['notes'] ?? null, 'created_at' => now(),
            ]);
            activity('admin')->causedBy($request->user())->performedOn($returnCase)
                ->withProperties(['from_status' => $from, 'to_status' => $validated['status']])
                ->log('return.status_changed');
        });

        return $this->successResponse(['return' => $returnCase->refresh()], 'Return status updated.');
    }

    public function inspect(Request $request, ReturnCase $returnCase): JsonResponse
    {
        $this->authorize('review', $returnCase);
        abort_unless(in_array($returnCase->status, ['item_received', 'inspection_pending'], true), 422, 'Return is not ready for inspection.');
        $validated = $request->validate([
            'result' => ['required', Rule::in(['accepted', 'partially_accepted', 'rejected'])],
            'notes' => ['nullable', 'string', 'max:4000'],
            'findings' => ['nullable', 'array'],
        ]);
        $inspection = DB::table('return_inspections')->insertGetId([
            'return_case_id' => $returnCase->id, 'inspector_id' => $request->user()->id,
            'result' => $validated['result'], 'notes' => $validated['notes'] ?? null,
            'findings' => isset($validated['findings']) ? json_encode($validated['findings'], JSON_THROW_ON_ERROR) : null,
            'inspected_at' => now(), 'created_at' => now(), 'updated_at' => now(),
        ]);

        return $this->successResponse(['inspection_id' => $inspection], 'Inspection recorded.', 201);
    }
}
