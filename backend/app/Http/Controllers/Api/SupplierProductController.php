<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Product\StoreSupplierProductRequest;
use App\Http\Requests\Product\UpdateSupplierProductRequest;
use App\Http\Resources\ProductCollection;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Models\Supplier;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class SupplierProductController extends Controller
{
    public function index(Request $request): ProductCollection
    {
        $supplier = $this->ownedSupplier($request);
        $query = $this->supplierProductsQuery($supplier);

        $search = trim($request->string('search')->toString());

        if ($search !== '') {
            $query->where(function (Builder $query) use ($search): void {
                $query
                    ->where('name', 'like', "%{$search}%")
                    ->orWhere('short_description', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        $status = trim($request->string('status')->toString());

        if (in_array($status, ['active', 'inactive'], true)) {
            $query->where('status', $status);
        }

        if ($request->filled('category_id')) {
            $query->where('category_id', $request->integer('category_id'));
        }

        return new ProductCollection(
            $query->latest()->paginate(20)->withQueryString(),
        );
    }

    public function store(StoreSupplierProductRequest $request): JsonResponse
    {
        Gate::authorize('create', Product::class);
        $supplier = $this->ownedSupplier($request);
        $attributes = $request->validated();
        $attributes['slug'] = $this->uniqueProductSlug($attributes['name']);

        $product = $supplier->products()->create($attributes);

        return $this->productResponse(
            $product,
            $request,
            'Product created successfully.',
            Response::HTTP_CREATED,
        );
    }

    public function show(Request $request, int $id): JsonResponse
    {
        $product = $this->ownedProduct($request, $id);
        Gate::authorize('view', $product);

        return $this->productResponse($product, $request);
    }

    public function update(
        UpdateSupplierProductRequest $request,
        int $id,
    ): JsonResponse {
        $product = $this->ownedProduct($request, $id);
        Gate::authorize('update', $product);
        $attributes = $request->validated();

        if (array_key_exists('name', $attributes) && $attributes['name'] !== $product->name) {
            $attributes['slug'] = $this->uniqueProductSlug($attributes['name'], $product->id);
        }

        $product->update($attributes);

        return $this->productResponse(
            $product->refresh(),
            $request,
            'Product updated successfully.',
        );
    }

    public function destroy(Request $request, int $id): JsonResponse
    {
        $product = $this->ownedProduct($request, $id);
        Gate::authorize('delete', $product);
        $product->delete();

        return $this->successResponse(message: 'Product deleted successfully.');
    }

    private function ownedSupplier(Request $request): Supplier
    {
        abort_unless($request->user()?->role === 'supplier', Response::HTTP_FORBIDDEN);

        return Supplier::query()
            ->where('user_id', $request->user()->id)
            ->firstOrFail();
    }

    private function ownedProduct(Request $request, int $id): Product
    {
        return $this->supplierProductsQuery($this->ownedSupplier($request))
            ->findOrFail($id);
    }

    private function supplierProductsQuery(Supplier $supplier): Builder
    {
        return Product::query()
            ->where('supplier_id', $supplier->id)
            ->with(['category', 'images', 'supplier']);
    }

    private function productResponse(
        Product $product,
        Request $request,
        ?string $message = null,
        int $status = Response::HTTP_OK,
    ): JsonResponse {
        $product->loadMissing(['category', 'images', 'supplier']);

        return $this->successResponse([
            'product' => ProductResource::make($product)->resolve($request),
        ], $message, $status);
    }

    private function uniqueProductSlug(string $name, ?int $ignoreId = null): string
    {
        $baseSlug = Str::slug($name) ?: 'product';
        $slug = $baseSlug;
        $suffix = 2;

        while (Product::withTrashed()
            ->where('slug', $slug)
            ->when($ignoreId, fn (Builder $query) => $query->whereKeyNot($ignoreId))
            ->exists()) {
            $slug = "{$baseSlug}-{$suffix}";
            $suffix++;
        }

        return $slug;
    }
}
