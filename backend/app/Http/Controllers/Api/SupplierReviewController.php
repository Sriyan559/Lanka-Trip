<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Review\StoreSupplierReviewRequest;
use App\Http\Resources\SupplierReviewResource;
use App\Models\Supplier;
use App\Models\SupplierReview;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Symfony\Component\HttpFoundation\Response;

class SupplierReviewController extends Controller
{
    public function index(Request $request, int $id): JsonResponse
    {
        $supplier = Supplier::query()->active()->findOrFail($id);
        $paginator = $supplier->reviews()
            ->with('user:id,name,role')
            ->latest()
            ->orderByDesc('id')
            ->paginate(20)
            ->withQueryString();

        $pagination = $paginator->toArray();
        unset($pagination['data']);

        return $this->successResponse([
            'average_rating' => (float) $supplier->rating,
            'total_reviews' => $supplier->reviews_count,
            'reviews' => SupplierReviewResource::collection($paginator->getCollection())->resolve($request),
            ...$pagination,
        ]);
    }

    public function store(StoreSupplierReviewRequest $request, int $id): JsonResponse
    {
        $supplier = Supplier::query()->active()->findOrFail($id);
        Gate::authorize('create', SupplierReview::class);
        $created = false;

        $review = DB::transaction(function () use ($request, $supplier, &$created): SupplierReview {
            $supplier = Supplier::query()->lockForUpdate()->findOrFail($supplier->id);
            $review = $supplier->reviews()->firstOrNew([
                'user_id' => $request->user()->id,
            ]);
            $created = ! $review->exists;

            if (! $created) {
                Gate::authorize('update', $review);
            }

            $review->fill($request->validated());
            $review->save();

            $supplier->forceFill([
                'rating' => round((float) $supplier->reviews()->avg('rating'), 2),
                'reviews_count' => $supplier->reviews()->count(),
            ])->save();

            return $review;
        });

        $supplier->refresh();

        return $this->successResponse([
            'review' => SupplierReviewResource::make(
                $review->load('user:id,name,role'),
            )->resolve($request),
            'average_rating' => (float) $supplier->rating,
            'total_reviews' => $supplier->reviews_count,
        ], $created ? 'Supplier review created successfully.' : 'Supplier review updated successfully.',
            $created ? Response::HTTP_CREATED : Response::HTTP_OK);
    }
}
