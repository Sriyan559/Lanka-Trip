<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Quotation\StoreQuotationRequest;
use App\Http\Requests\Quotation\UpdateQuotationRequest;
use App\Http\Resources\QuotationCollection;
use App\Http\Resources\QuotationResource;
use App\Jobs\SendNotificationJob;
use App\Models\Quotation;
use App\Models\RFQ;
use App\Models\Supplier;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;

class QuotationController extends Controller
{
    public function store(StoreQuotationRequest $request, int $id): JsonResponse
    {
        $supplier = $this->activeSupplier($request->user());
        $rfq = RFQ::query()->where('status', 'open')->findOrFail($id);
        Gate::authorize('create', [Quotation::class, $rfq]);

        if (
            Quotation::query()
                ->where('rfq_id', $rfq->id)
                ->where('supplier_id', $supplier->id)
                ->exists()
        ) {
            return $this->errorResponse(
                'A quotation has already been submitted for this RFQ.',
                Response::HTTP_CONFLICT,
            );
        }

        $validated = $request->validated();
        $this->validateRFQItemOwnership($rfq, $validated['items']);

        $quotation = DB::transaction(function () use ($validated, $rfq, $supplier): Quotation {
            $items = $this->calculateItems($validated['items']);
            unset($validated['items']);

            $quotation = Quotation::create([
                ...$validated,
                'rfq_id' => $rfq->id,
                'supplier_id' => $supplier->id,
                'quotation_number' => 'PENDING-'.Str::uuid(),
                'total_amount' => collect($items)->sum('amount'),
                'status' => 'pending',
            ]);

            $quotation->update([
                'quotation_number' => sprintf(
                    'QT-%s-%06d',
                    $quotation->created_at->format('Y'),
                    $quotation->id,
                ),
            ]);

            $quotation->items()->createMany($items);

            return $quotation;
        });

        SendNotificationJob::dispatch(
            $rfq->user_id,
            'new_quotation',
            'New quotation received',
            "{$supplier->company_name} submitted a quotation for {$rfq->title}.",
            'quotation',
            $quotation->id,
        )->afterCommit();

        return $this->quotationResponse(
            $quotation,
            $request,
            'Quotation submitted successfully.',
            Response::HTTP_CREATED,
        );
    }

    public function rfqIndex(Request $request, int $id): QuotationCollection
    {
        $this->ensureBuyer($request->user());

        $rfq = RFQ::query()
            ->where('user_id', $request->user()->id)
            ->findOrFail($id);

        $paginator = $rfq->quotations()
            ->with(['items', 'supplier'])
            ->latest()
            ->paginate(20)
            ->withQueryString();

        return (new QuotationCollection($paginator))->additional([
            'rfq_id' => $rfq->id,
            'rfq_number' => $rfq->rfq_number,
        ]);
    }

    public function supplierIndex(Request $request): QuotationCollection
    {
        $supplier = $this->activeSupplier($request->user());

        return new QuotationCollection(
            $supplier->quotations()
                ->with(['items', 'rfq.items'])
                ->latest()
                ->paginate(20)
                ->withQueryString(),
        );
    }

    public function show(Request $request, int $id): JsonResponse
    {
        $quotation = $this->accessibleQuotation($request->user(), $id);
        Gate::authorize('view', $quotation);

        return $this->quotationResponse($quotation, $request);
    }

    public function update(UpdateQuotationRequest $request, int $id): JsonResponse
    {
        $supplier = $this->activeSupplier($request->user());
        $quotation = Quotation::query()
            ->where('supplier_id', $supplier->id)
            ->findOrFail($id);
        Gate::authorize('update', $quotation);

        if ($quotation->status !== 'pending') {
            return $this->errorResponse(
                'Only pending quotations can be updated.',
                Response::HTTP_CONFLICT,
            );
        }

        $validated = $request->validated();

        if (isset($validated['items'])) {
            $this->validateRFQItemOwnership($quotation->rfq, $validated['items']);
        }

        DB::transaction(function () use ($validated, $quotation): void {
            $items = isset($validated['items'])
                ? $this->calculateItems($validated['items'])
                : null;
            unset($validated['items']);

            if ($items !== null) {
                $validated['total_amount'] = collect($items)->sum('amount');
            }

            if ($validated !== []) {
                $quotation->update($validated);
            }

            if ($items !== null) {
                $quotation->items()->delete();
                $quotation->items()->createMany($items);
            }
        });

        return $this->quotationResponse(
            $quotation->refresh(),
            $request,
            'Quotation updated successfully.',
        );
    }

    public function accept(Request $request, int $id): JsonResponse
    {
        $this->ensureBuyer($request->user());

        $quotation = DB::transaction(function () use ($request, $id): Quotation {
            $quotation = Quotation::query()->lockForUpdate()->findOrFail($id);
            $quotation->loadMissing('rfq');
            Gate::authorize('accept', $quotation);
            $rfq = RFQ::query()->lockForUpdate()->findOrFail($quotation->rfq_id);

            abort_unless($rfq->user_id === $request->user()->id, Response::HTTP_FORBIDDEN);

            if ($quotation->status !== 'pending' || $rfq->status !== 'open') {
                throw ValidationException::withMessages([
                    'quotation' => ['Only a pending quotation for an open RFQ can be accepted.'],
                ]);
            }

            $rfq->quotations()
                ->whereKeyNot($quotation->id)
                ->where('status', 'pending')
                ->update(['status' => 'rejected']);

            $quotation->update(['status' => 'accepted']);
            $rfq->update(['status' => 'completed']);

            return $quotation;
        });

        $this->notifySupplierAboutQuotation(
            $quotation,
            'quotation_accepted',
            'Quotation accepted',
            'Your quotation has been accepted.',
        );

        activity('quotations')
            ->causedBy($request->user())
            ->performedOn($quotation)
            ->event('accepted')
            ->withProperties(['rfq_id' => $quotation->rfq_id])
            ->log('Quotation accepted');

        Log::channel('quotations')->info('Quotation accepted', [
            'quotation_id' => $quotation->id,
            'rfq_id' => $quotation->rfq_id,
            'buyer_id' => $request->user()->id,
        ]);

        return $this->quotationResponse(
            $quotation,
            $request,
            'Quotation accepted successfully.',
        );
    }

    public function reject(Request $request, int $id): JsonResponse
    {
        $this->ensureBuyer($request->user());

        $quotation = Quotation::query()
            ->with('rfq')
            ->whereHas('rfq', fn ($query) => $query->where('user_id', $request->user()->id))
            ->findOrFail($id);
        Gate::authorize('reject', $quotation);

        if ($quotation->status !== 'pending') {
            return $this->errorResponse(
                'Only pending quotations can be rejected.',
                Response::HTTP_CONFLICT,
            );
        }

        $quotation->update(['status' => 'rejected']);

        $this->notifySupplierAboutQuotation(
            $quotation,
            'quotation_rejected',
            'Quotation rejected',
            'Your quotation has been rejected.',
        );

        return $this->quotationResponse(
            $quotation,
            $request,
            'Quotation rejected successfully.',
        );
    }

    private function activeSupplier(User $user): Supplier
    {
        abort_unless($user->role === 'supplier', Response::HTTP_FORBIDDEN);

        return Supplier::query()
            ->active()
            ->where('user_id', $user->id)
            ->firstOrFail();
    }

    private function ensureBuyer(User $user): void
    {
        abort_unless($user->role === 'buyer', Response::HTTP_FORBIDDEN);
    }

    private function accessibleQuotation(User $user, int $id): Quotation
    {
        return Quotation::query()
            ->where(function ($query) use ($user): void {
                $query->whereHas('rfq', fn ($query) => $query->where('user_id', $user->id));

                if ($user->role === 'supplier' && $user->supplier) {
                    $query->orWhere('supplier_id', $user->supplier->id);
                }
            })
            ->findOrFail($id);
    }

    private function validateRFQItemOwnership(RFQ $rfq, array $items): void
    {
        $rfqItemIds = collect($items)->pluck('rfq_item_id')->filter()->unique();

        if ($rfqItemIds->isEmpty()) {
            return;
        }

        $validCount = $rfq->items()->whereKey($rfqItemIds)->count();

        if ($validCount !== $rfqItemIds->count()) {
            throw ValidationException::withMessages([
                'items' => ['Every RFQ item must belong to the quoted RFQ.'],
            ]);
        }
    }

    private function calculateItems(array $items): array
    {
        return collect($items)->map(function (array $item): array {
            $item['amount'] = round(
                (float) $item['quantity'] * (float) $item['unit_price'],
                2,
            );

            return $item;
        })->all();
    }

    private function quotationResponse(
        Quotation $quotation,
        Request $request,
        ?string $message = null,
        int $status = Response::HTTP_OK,
    ): JsonResponse {
        $quotation->load([
            'items',
            'rfq.items',
            'supplier',
        ]);
        $quotation->rfq->setAttribute(
            'quotations_count',
            $quotation->rfq->quotations()->count(),
        );

        return $this->successResponse(
            QuotationResource::make($quotation)->resolve($request),
            $message,
            $status,
        );
    }

    private function notifySupplierAboutQuotation(
        Quotation $quotation,
        string $type,
        string $title,
        string $message,
    ): void {
        $quotation->loadMissing(['supplier.user', 'rfq']);

        $rfqTitle = $quotation->rfq?->title;
        $fullMessage = $rfqTitle ? "{$message} RFQ: {$rfqTitle}" : $message;

        $userId = $quotation->supplier?->user_id;

        if ($userId) {
            SendNotificationJob::dispatch(
                $userId,
                $type,
                $title,
                $fullMessage,
                'quotation',
                $quotation->id,
            )->afterCommit();
        }
    }
}
