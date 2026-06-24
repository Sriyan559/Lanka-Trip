<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\ProductCollection;
use App\Http\Resources\ProductResource;
use App\Http\Resources\SupplierResource;
use App\Models\Category;
use App\Models\Product;
use App\Models\Supplier;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function products(Request $request): ProductCollection
    {
        $query = $this->publicProductQuery();
        $this->applyProductSearch($query, $this->searchTerm($request));

        return new ProductCollection(
            $query
                ->latest()
                ->paginate(20)
                ->withQueryString(),
        );
    }

    public function suppliers(Request $request): JsonResponse
    {
        $query = $this->publicSupplierQuery();
        $this->applySupplierSearch($query, $this->searchTerm($request));

        $paginator = $query
            ->orderByDesc('is_featured')
            ->orderByDesc('rating')
            ->paginate(20)
            ->withQueryString();

        $pagination = $paginator->toArray();
        unset($pagination['data']);

        return $this->successResponse([
            'data' => SupplierResource::collection($paginator->getCollection())->resolve($request),
            ...$pagination,
        ]);
    }

    public function global(Request $request): JsonResponse
    {
        $term = $this->searchTerm($request);

        $products = $this->publicProductQuery();
        $this->applyProductSearch($products, $term);

        $suppliers = $this->publicSupplierQuery();
        $this->applySupplierSearch($suppliers, $term);

        $categories = Category::query()->active();
        $this->applyCategorySearch($categories, $term);

        return $this->successResponse([
            'products' => ProductResource::collection(
                $products->latest()->limit(8)->get(),
            )->resolve($request),
            'suppliers' => SupplierResource::collection(
                $suppliers
                    ->orderByDesc('is_featured')
                    ->orderByDesc('rating')
                    ->limit(8)
                    ->get(),
            )->resolve($request),
            'categories' => CategoryResource::collection(
                $categories
                    ->orderBy('sort_order')
                    ->orderBy('name')
                    ->limit(8)
                    ->get(),
            )->resolve($request),
        ]);
    }

    private function publicProductQuery(): Builder
    {
        return Product::query()
            ->active()
            ->whereHas('category', fn (Builder $query) => $query->active())
            ->with(['category', 'images', 'supplier']);
    }

    private function publicSupplierQuery(): Builder
    {
        return Supplier::query()
            ->active()
            ->withCount([
                'products' => fn (Builder $query) => $query
                    ->active()
                    ->whereHas('category', fn (Builder $query) => $query->active()),
            ]);
    }

    private function searchTerm(Request $request): string
    {
        return trim($request->string('q')->toString());
    }

    private function applyProductSearch(Builder $query, string $term): void
    {
        if ($term === '') {
            return;
        }

        $query->where(function (Builder $query) use ($term): void {
            $query
                ->where('name', 'like', "%{$term}%")
                ->orWhere('short_description', 'like', "%{$term}%")
                ->orWhere('description', 'like', "%{$term}%")
                ->orWhereHas('category', fn (Builder $query) => $query
                    ->active()
                    ->where(function (Builder $query) use ($term): void {
                        $query
                            ->where('name', 'like', "%{$term}%")
                            ->orWhere('slug', 'like', "%{$term}%");
                    }));
        });
    }

    private function applySupplierSearch(Builder $query, string $term): void
    {
        if ($term === '') {
            return;
        }

        $query->where(function (Builder $query) use ($term): void {
            $query
                ->where('company_name', 'like', "%{$term}%")
                ->orWhere('business_type', 'like', "%{$term}%")
                ->orWhere('country', 'like', "%{$term}%");
        });
    }

    private function applyCategorySearch(Builder $query, string $term): void
    {
        if ($term === '') {
            return;
        }

        $query->where(function (Builder $query) use ($term): void {
            $query
                ->where('name', 'like', "%{$term}%")
                ->orWhere('slug', 'like', "%{$term}%")
                ->orWhere('description', 'like', "%{$term}%");
        });
    }
}
