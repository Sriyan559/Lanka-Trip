<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductCollection;
use App\Http\Resources\SupplierResource;
use App\Models\Supplier;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SupplierController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Supplier::query()
            ->active()
            ->withCount([
                'products' => fn (Builder $query) => $query
                    ->active()
                    ->whereHas('category', fn (Builder $query) => $query->active()),
            ]);

        $this->applyFilters($query, $request);

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

    public function show(Request $request, int $id): JsonResponse
    {
        $supplier = Supplier::query()
            ->active()
            ->withCount([
                'products' => fn (Builder $query) => $query
                    ->active()
                    ->whereHas('category', fn (Builder $query) => $query->active()),
            ])
            ->with([
                'user:id,name',
                'products' => fn ($query) => $query
                    ->active()
                    ->whereHas('category', fn (Builder $query) => $query->active())
                    ->with(['category', 'images'])
                    ->latest()
                    ->limit(8),
            ])
            ->findOrFail($id);

        return $this->successResponse(
            SupplierResource::make($supplier)->resolve($request),
        );
    }

    public function products(Request $request, int $id): ProductCollection
    {
        $supplier = Supplier::query()
            ->active()
            ->findOrFail($id);

        $products = $supplier->products()
            ->active()
            ->whereHas('category', fn (Builder $query) => $query->active())
            ->with(['category', 'images'])
            ->latest()
            ->paginate(20)
            ->withQueryString();

        return (new ProductCollection($products))->additional([
            'supplier' => SupplierResource::make($supplier)->resolve($request),
        ]);
    }

    private function applyFilters(Builder $query, Request $request): void
    {
        $search = trim($request->string('search')->toString());

        if ($search !== '') {
            $query->where('company_name', 'like', "%{$search}%");
        }

        $verificationStatus = trim($request->string('verification_status')->toString());

        if ($verificationStatus === '' && $request->boolean('verified')) {
            $verificationStatus = 'verified';
        }

        if (in_array($verificationStatus, ['pending', 'verified', 'rejected'], true)) {
            $query->where('verification_status', $verificationStatus);
        }

        foreach (['country', 'business_type'] as $filter) {
            $value = trim($request->string($filter)->toString());

            if ($value !== '') {
                $query->where($filter, $value);
            }
        }

        $category = trim($request->string('category')->toString());

        if ($category !== '') {
            $query->whereHas('products', fn (Builder $query) => $query
                ->active()
                ->whereHas(
                    'category',
                    fn (Builder $query) => $query->active()->where('slug', $category),
                ));
        }
    }
}
