<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Review\StoreProductReviewRequest;
use App\Http\Resources\ProductReviewResource;
use App\Models\Product;
use App\Models\ProductReview;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Symfony\Component\HttpFoundation\Response;

class ProductReviewController extends Controller
{
    public function index(Request $request, int $id): JsonResponse
    {
        $product = Product::query()->active()->findOrFail($id);
        $paginator = $product->reviews()
            ->with('user:id,name,role')
            ->latest()
            ->orderByDesc('id')
            ->paginate(20)
            ->withQueryString();

        $pagination = $paginator->toArray();
        unset($pagination['data']);

        return $this->successResponse([
            'average_rating' => (float) $product->average_rating,
            'total_reviews' => $product->reviews_count,
            'reviews' => ProductReviewResource::collection($paginator->getCollection())->resolve($request),
            ...$pagination,
        ]);
    }

    public function store(StoreProductReviewRequest $request, int $id): JsonResponse
    {
        $product = Product::query()->active()->findOrFail($id);
        Gate::authorize('create', ProductReview::class);
        $created = false;

        $review = DB::transaction(function () use ($request, $product, &$created): ProductReview {
            $product = Product::query()->lockForUpdate()->findOrFail($product->id);
            $review = $product->reviews()->firstOrNew([
                'user_id' => $request->user()->id,
            ]);
            $created = ! $review->exists;

            if (! $created) {
                Gate::authorize('update', $review);
            }

            $review->fill($request->validated());
            $review->save();

            $product->forceFill([
                'average_rating' => round((float) $product->reviews()->avg('rating'), 2),
                'reviews_count' => $product->reviews()->count(),
            ])->save();

            return $review;
        });

        $product->refresh();

        return $this->successResponse([
            'review' => ProductReviewResource::make(
                $review->load('user:id,name,role'),
            )->resolve($request),
            'average_rating' => (float) $product->average_rating,
            'total_reviews' => $product->reviews_count,
        ], $created ? 'Product review created successfully.' : 'Product review updated successfully.',
            $created ? Response::HTTP_CREATED : Response::HTTP_OK);
    }
}
