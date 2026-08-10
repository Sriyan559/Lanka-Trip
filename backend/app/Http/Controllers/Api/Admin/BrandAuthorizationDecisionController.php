<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\SellerBrandAuthorization;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class BrandAuthorizationDecisionController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        abort_unless($request->user()->hasPermission('brand.authorizations.view'), 403);
        $query = SellerBrandAuthorization::with(['brand', 'supplier'])->latest();
        $request->validate([
            'status' => ['nullable', Rule::in(['draft', 'submitted', 'approved', 'rejected', 'evidence_required', 'suspended', 'expired', 'revoked'])],
            'brand_id' => ['nullable', 'integer', 'exists:brands,id'],
            'supplier_id' => ['nullable', 'integer', 'exists:suppliers,id'],
            'per_page' => ['nullable', 'integer', 'min:1', 'max:100'],
        ]);
        if ($request->filled('status')) {
            $query->where('status', $request->string('status'));
        }
        if ($request->filled('brand_id')) {
            $query->where('brand_id', $request->integer('brand_id'));
        }
        if ($request->filled('supplier_id')) {
            $query->where('supplier_id', $request->integer('supplier_id'));
        }

        return $this->successResponse(['authorizations' => $query->paginate($request->integer('per_page', 25))]);
    }

    public function show(Request $request, SellerBrandAuthorization $authorization): JsonResponse
    {
        abort_unless($request->user()->hasPermission('brand.authorizations.view'), 403);

        return $this->successResponse(['authorization' => $authorization->load(['brand', 'supplier', 'decisions.actor:id,name'])]);
    }

    public function decide(Request $request, SellerBrandAuthorization $authorization): JsonResponse
    {
        $this->authorize('review', $authorization);
        $validated = $request->validate([
            'decision' => ['required', Rule::in(['approved', 'rejected', 'evidence_required', 'suspended', 'expired', 'revoked'])],
            'notes' => ['nullable', 'string', 'max:4000'],
            'findings' => ['nullable', 'array'],
        ]);
        if (in_array($validated['decision'], ['rejected', 'evidence_required', 'suspended', 'revoked'], true)) {
            abort_if(blank($validated['notes'] ?? null), 422, 'Decision notes are required.');
        }
        DB::transaction(function () use ($request, $authorization, $validated): void {
            $locked = SellerBrandAuthorization::query()->lockForUpdate()->findOrFail($authorization->id);
            abort_unless($locked->canAdminTransitionTo($validated['decision']), 422, 'Invalid authorization status transition.');
            if ($validated['decision'] === 'approved') {
                $conflict = SellerBrandAuthorization::query()->lockForUpdate()
                    ->whereKeyNot($locked->id)->where('supplier_id', $locked->supplier_id)->where('brand_id', $locked->brand_id)
                    ->where('authorization_type', $locked->authorization_type)->where('territory', $locked->territory)->where('status', 'approved')->exists();
                abort_if($conflict, 409, 'A conflicting active authorization already exists.');
            }
            $from = $locked->status;
            $locked->update([
                'status' => $validated['decision'], 'reviewed_by' => $request->user()->id,
                'reviewed_at' => now(), 'review_notes' => $validated['notes'] ?? null,
            ]);
            $locked->decisions()->create([
                'actor_id' => $request->user()->id, 'decision' => $validated['decision'],
                'from_status' => $from, 'to_status' => $validated['decision'],
                'notes' => $validated['notes'] ?? null, 'findings' => $validated['findings'] ?? null,
                'decided_at' => now(),
            ]);
            activity('admin')->causedBy($request->user())->performedOn($locked)
                ->withProperties(['from_status' => $from, 'to_status' => $validated['decision']])
                ->log('brand_authorization.decided');
        });

        return $this->successResponse(['authorization' => $authorization->refresh()->load('decisions')], 'Decision recorded.');
    }
}
