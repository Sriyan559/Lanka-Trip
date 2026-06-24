<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\ProductCollection;
use App\Models\Category;
use App\Models\Product;
use App\Support\CacheKeys;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Schema;

class CategoryController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $categories = Cache::remember(
            CacheKeys::versioned('categories', 'index'),
            CacheKeys::TTL_SECONDS,
            fn () => Category::query()
                ->active()
                ->whereNull('parent_id')
                ->with([
                    'children' => fn ($query) => $query->active(),
                ])
                ->orderBy('sort_order')
                ->orderBy('name')
                ->get(),
        );

        return $this->successResponse([
            'data' => CategoryResource::collection($categories)->resolve($request),
        ]);
    }

    public function show(Request $request, string $slug): JsonResponse
    {
        $category = Cache::remember(
            CacheKeys::versioned('categories', "show.{$slug}"),
            CacheKeys::TTL_SECONDS,
            fn () => Category::query()
                ->active()
                ->where('slug', $slug)
                ->with([
                    'parent' => fn ($query) => $query->active(),
                    'children' => fn ($query) => $query->active(),
                ])
                ->firstOrFail(),
        );

        return $this->successResponse([
            'category' => CategoryResource::make($category)->resolve($request),
        ]);
    }

    public function products(Request $request, string $slug): ProductCollection
    {
        $category = Category::query()
            ->active()
            ->where('slug', $slug)
            ->firstOrFail();

        $perPage = min(max($request->integer('per_page', 12), 1), 100);
        $page = max($request->integer('page', 1), 1);

        $paginator = $this->productPaginator($category, $perPage, $page);

        return (new ProductCollection($paginator))->additional([
            'category' => CategoryResource::make($category)->resolve($request),
        ]);
    }

    private function productPaginator(Category $category, int $perPage, int $page): LengthAwarePaginator
    {
        if (! Schema::hasTable('products') || ! Schema::hasColumn('products', 'category_id')) {
            return new LengthAwarePaginator(
                items: [],
                total: 0,
                perPage: $perPage,
                currentPage: $page,
                options: [
                    'path' => request()->url(),
                    'query' => request()->query(),
                ],
            );
        }

        $query = Product::query()
            ->active()
            ->where('category_id', $category->id)
            ->with(['category', 'images', 'supplier']);

        $this->applyProductFilters($query, request());
        $this->applyProductOrdering($query, request()->string('sort')->toString());

        return $query->paginate($perPage, ['*'], 'page', $page);
    }

    private function applyProductFilters(Builder $query, Request $request): void
    {
        if ($request->filled('price_min')) {
            $query->where('price', '>=', $request->float('price_min'));
        }

        if ($request->filled('price_max')) {
            $query->where('price', '<=', $request->float('price_max'));
        }
    }

    private function applyProductOrdering(Builder $query, string $sort): void
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
