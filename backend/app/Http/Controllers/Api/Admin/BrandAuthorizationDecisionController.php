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
        if ($request->filled('status')) {
            $query->where('status', $request->string('status'));
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
        abort_unless($authorization->canAdminTransitionTo($validated['decision']), 422, 'Invalid authorization status transition.');
        if (in_array($validated['decision'], ['rejected', 'evidence_required', 'suspended', 'revoked'], true)) {
            abort_if(blank($validated['notes'] ?? null), 422, 'Decision notes are required.');
        }
        if ($validated['decision'] === 'approved') {
            $conflict = SellerBrandAuthorization::query()
                ->whereKeyNot($authorization->id)
                ->where('supplier_id', $authorization->supplier_id)
                ->where('brand_id', $authorization->brand_id)
                ->where('authorization_type', $authorization->authorization_type)
                ->where('territory', $authorization->territory)
                ->where('status', 'approved')
                ->exists();
            abort_if($conflict, 409, 'A conflicting active authorization already exists.');
        }

        DB::transaction(function () use ($request, $authorization, $validated): void {
            $from = $authorization->status;
            $authorization->update([
                'status' => $validated['decision'], 'reviewed_by' => $request->user()->id,
                'reviewed_at' => now(), 'review_notes' => $validated['notes'] ?? null,
            ]);
            $authorization->decisions()->create([
                'actor_id' => $request->user()->id, 'decision' => $validated['decision'],
                'from_status' => $from, 'to_status' => $validated['decision'],
                'notes' => $validated['notes'] ?? null, 'findings' => $validated['findings'] ?? null,
                'decided_at' => now(),
            ]);
            activity('admin')->causedBy($request->user())->performedOn($authorization)
                ->withProperties(['from_status' => $from, 'to_status' => $validated['decision']])
                ->log('brand_authorization.decided');
        });

        return $this->successResponse(['authorization' => $authorization->refresh()->load('decisions')], 'Decision recorded.');
    }
}
