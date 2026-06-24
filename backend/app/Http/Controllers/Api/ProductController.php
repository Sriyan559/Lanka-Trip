<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductCollection;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Support\CacheKeys;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class ProductController extends Controller
{
    public function index(Request $request): ProductCollection
    {
        $query = $this->publicProductQuery();

        $this->applyFilters($query, $request);
        $this->applySort($query, $request->string('sort')->toString());

        return new ProductCollection(
            $query->paginate(20)->withQueryString(),
        );
    }

    public function show(Request $request, int $id): JsonResponse
    {
        $product = $this->publicProductQuery()
            ->whereKey($id)
            ->firstOrFail();

        $relatedProducts = $this->publicProductQuery()
            ->where('category_id', $product->category_id)
            ->whereKeyNot($product->id)
            ->latest()
            ->limit(8)
            ->get();

        return $this->successResponse([
            ...ProductResource::make($product)->resolve($request),
            'related_products' => ProductResource::collection($relatedProducts)->resolve($request),
        ]);
    }

    public function featured(): ProductCollection
    {
        return new ProductCollection(
            Cache::remember(
                CacheKeys::versioned('products', 'featured'),
                CacheKeys::TTL_SECONDS,
                fn () => $this->publicProductQuery()
                    ->where('is_featured', true)
                    ->latest()
                    ->limit(12)
                    ->get(),
            ),
        );
    }

    public function trending(): ProductCollection
    {
        return new ProductCollection(
            Cache::remember(
                CacheKeys::versioned('products', 'trending'),
                CacheKeys::TTL_SECONDS,
                fn () => $this->publicProductQuery()
                    ->orderByDesc('views_count')
                    ->latest('id')
                    ->limit(12)
                    ->get(),
            ),
        );
    }

    private function publicProductQuery(): Builder
    {
        return Product::query()
            ->active()
            ->whereHas('category', fn (Builder $query) => $query->active())
            ->with([
                'category',
                'images',
                'supplier',
            ]);
    }

    private function applyFilters(Builder $query, Request $request): void
    {
        $search = trim($request->string('search')->toString());

        if ($search !== '') {
            $query->where(function (Builder $query) use ($search): void {
                $query
                    ->where('name', 'like', "%{$search}%")
                    ->orWhere('short_description', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        $category = trim($request->string('category')->toString());

        if ($category !== '') {
            $query->whereHas(
                'category',
                fn (Builder $query) => $query->active()->where('slug', $category),
            );
        }

        if ($request->filled('price_min')) {
            $query->where('price', '>=', $request->float('price_min'));
        }

        if ($request->filled('price_max')) {
            $query->where('price', '<=', $request->float('price_max'));
        }

        if ($request->filled('max_order')) {
            $query->where('moq', '<=', $request->float('max_order'));
        }
    }

    private function applySort(Builder $query, string $sort): void
    {
        match ($sort) {
            'oldest' => $query->oldest(),
            'price_asc' => $query->orderBy('price'),
            'price_desc' => $query->orderByDesc('price'),
            'popular', 'trending', 'top' => $query->orderByDesc('views_count')->latest('id'),
            default => $query->latest(),
        };
    }
}
