<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\RFQ\StoreRFQRequest;
use App\Http\Requests\RFQ\UpdateRFQRequest;
use App\Http\Resources\RFQCollection;
use App\Http\Resources\RFQResource;
use App\Models\RFQ;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class RFQController extends Controller
{
    public function store(StoreRFQRequest $request): JsonResponse
    {
        Gate::authorize('create', RFQ::class);

        $rfq = DB::transaction(function () use ($request): RFQ {
            $validated = $request->validated();
            $items = $validated['items'];
            unset($validated['items']);

            $rfq = $request->user()->rfqs()->create([
                ...$validated,
                'rfq_number' => 'PENDING-'.Str::uuid(),
                'status' => 'open',
            ]);

            $rfq->update([
                'rfq_number' => sprintf(
                    'RFQ-%s-%06d',
                    $rfq->created_at->format('Y'),
                    $rfq->id,
                ),
            ]);

            $rfq->items()->createMany($items);

            return $rfq;
        });

        $rfq->load('items');
        $this->attachQuotationCounts(collect([$rfq]));

        activity('rfqs')
            ->causedBy($request->user())
            ->performedOn($rfq)
            ->event('created')
            ->withProperties(['rfq_number' => $rfq->rfq_number])
            ->log('RFQ created');

        return $this->successResponse(
            RFQResource::make($rfq)->resolve($request),
            'RFQ created successfully.',
            Response::HTTP_CREATED,
        );
    }

    public function index(Request $request): RFQCollection
    {
        $this->ensureBuyer($request->user());

        $paginator = RFQ::query()
            ->where('user_id', $request->user()->id)
            ->with('items')
            ->latest()
            ->paginate(20)
            ->withQueryString();

        $this->attachQuotationCounts($paginator->getCollection());

        return new RFQCollection($paginator);
    }

    public function show(Request $request, int $id): JsonResponse
    {
        $this->ensureBuyer($request->user());

        $rfq = $this->ownedRFQ($request->user(), $id)->load('items');
        Gate::authorize('view', $rfq);
        $this->attachQuotationCounts(collect([$rfq]));

        return $this->successResponse(
            RFQResource::make($rfq)->resolve($request),
        );
    }

    public function update(UpdateRFQRequest $request, int $id): JsonResponse
    {
        $rfq = $this->ownedRFQ($request->user(), $id);
        Gate::authorize('update', $rfq);

        if ($rfq->status !== 'open') {
            return $this->errorResponse(
                'Only open RFQs can be updated.',
                Response::HTTP_CONFLICT,
            );
        }

        DB::transaction(function () use ($request, $rfq): void {
            $validated = $request->validated();
            $items = $validated['items'] ?? null;
            unset($validated['items']);

            if ($validated !== []) {
                $rfq->update($validated);
            }

            if ($items !== null) {
                $rfq->items()->delete();
                $rfq->items()->createMany($items);
            }
        });

        $rfq->refresh()->load('items');
        $this->attachQuotationCounts(collect([$rfq]));

        return $this->successResponse(
            RFQResource::make($rfq)->resolve($request),
            'RFQ updated successfully.',
        );
    }

    public function destroy(Request $request, int $id): JsonResponse
    {
        $this->ensureBuyer($request->user());

        $rfq = $this->ownedRFQ($request->user(), $id);
        Gate::authorize('delete', $rfq);
        $rfq->delete();

        return $this->successResponse(message: 'RFQ deleted successfully.');
    }

    public function supplierIndex(Request $request): RFQCollection
    {
        abort_unless($request->user()->role === 'supplier', Response::HTTP_FORBIDDEN);

        $paginator = RFQ::query()
            ->where('status', 'open')
            ->with('items')
            ->latest()
            ->paginate(20)
            ->withQueryString();

        $this->attachQuotationCounts($paginator->getCollection());

        return new RFQCollection($paginator);
    }

    private function ensureBuyer(User $user): void
    {
        abort_unless($user->role === 'buyer', Response::HTTP_FORBIDDEN);
    }

    private function ownedRFQ(User $user, int $id): RFQ
    {
        return RFQ::query()
            ->where('user_id', $user->id)
            ->findOrFail($id);
    }

    private function attachQuotationCounts(Collection $rfqs): void
    {
        if (
            $rfqs->isEmpty()
            || ! Schema::hasTable('quotations')
            || ! Schema::hasColumn('quotations', 'rfq_id')
        ) {
            $rfqs->each->setAttribute('quotations_count', 0);

            return;
        }

        $counts = DB::table('quotations')
            ->whereIn('rfq_id', $rfqs->pluck('id'))
            ->select('rfq_id', DB::raw('count(*) as aggregate'))
            ->groupBy('rfq_id')
            ->pluck('aggregate', 'rfq_id');

        $rfqs->each(
            fn (RFQ $rfq) => $rfq->setAttribute(
                'quotations_count',
                (int) ($counts[$rfq->id] ?? 0),
            ),
        );
    }
}
