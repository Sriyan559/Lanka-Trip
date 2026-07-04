<?php

namespace App\Http\Controllers\SLBeauty;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductVariantRequest;
use App\Http\Requests\UpdateProductVariantRequest;
use App\Http\Resources\ProductVariantResource;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\Supplier;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class SupplierProductVariantController extends Controller
{
    public function index(Request $request, Product $product): JsonResponse
    {
        $this->ensureFeatureEnabled('sl_beauty.taxonomy', true);
        $product = $this->ownedProduct($request, $product);
        Gate::authorize('viewAny', ProductVariant::class);

        $perPage = min(max($request->integer('per_page', 20), 1), 100);
        $paginator = $product->variants()
            ->latest()
            ->paginate($perPage)
            ->withQueryString();
        $pagination = $paginator->toArray();
        unset($pagination['data']);

        return $this->successResponse([
            'data' => ProductVariantResource::collection($paginator->getCollection())->resolve($request),
            ...$pagination,
        ]);
    }

    public function store(StoreProductVariantRequest $request, Product $product): JsonResponse
    {
        $this->ensureFeatureEnabled('sl_beauty.taxonomy', true);
        $product = $this->ownedProduct($request, $product);
        Gate::authorize('create', [ProductVariant::class, $product]);

        $variant = $product->variants()->create([
            'uuid' => (string) Str::uuid(),
            ...$request->validated(),
        ]);

        return $this->variantResponse(
            $variant->refresh(),
            $request,
            'Product variant created successfully.',
            Response::HTTP_CREATED,
        );
    }

    public function show(Request $request, Product $product, ProductVariant $variant): JsonResponse
    {
        $this->ensureFeatureEnabled('sl_beauty.taxonomy', true);
        $product = $this->ownedProduct($request, $product);
        $variant = $this->ownedVariant($product, $variant);
        Gate::authorize('view', $variant);

        return $this->variantResponse($variant, $request);
    }

    public function update(
        UpdateProductVariantRequest $request,
        Product $product,
        ProductVariant $variant,
    ): JsonResponse {
        $this->ensureFeatureEnabled('sl_beauty.taxonomy', true);
        $product = $this->ownedProduct($request, $product);
        $variant = $this->ownedVariant($product, $variant);
        Gate::authorize('update', $variant);

        $variant->update($request->validated());

        return $this->variantResponse(
            $variant->refresh(),
            $request,
            'Product variant updated successfully.',
        );
    }

    public function updateStatus(Request $request, Product $product, ProductVariant $variant): JsonResponse
    {
        $this->ensureFeatureEnabled('sl_beauty.taxonomy', true);
        $product = $this->ownedProduct($request, $product);
        $variant = $this->ownedVariant($product, $variant);
        Gate::authorize('changeStatus', $variant);

        $this->ensureOnlyStatusFields($request);

        $validated = $request->validate([
            'status' => ['sometimes', Rule::in(['draft', 'active', 'inactive'])],
            'is_active' => ['sometimes', 'boolean'],
        ]);

        $variant->update($validated);

        return $this->variantResponse(
            $variant->refresh(),
            $request,
            'Product variant status updated successfully.',
        );
    }

    public function destroy(Request $request, Product $product, ProductVariant $variant): JsonResponse
    {
        $this->ensureFeatureEnabled('sl_beauty.taxonomy', true);
        $product = $this->ownedProduct($request, $product);
        $variant = $this->ownedVariant($product, $variant);
        Gate::authorize('delete', $variant);

        $variant->delete();

        return $this->successResponse(message: 'Product variant deleted successfully.');
    }

    private function ownedSupplier(Request $request): Supplier
    {
        abort_unless($request->user()?->role === 'supplier', Response::HTTP_FORBIDDEN);

        return Supplier::query()
            ->where('user_id', $request->user()->id)
            ->firstOrFail();
    }

    private function ownedProduct(Request $request, Product $product): Product
    {
        return Product::query()
            ->whereKey($product->id)
            ->where('supplier_id', $this->ownedSupplier($request)->id)
            ->firstOrFail();
    }

    private function ownedVariant(Product $product, ProductVariant $variant): ProductVariant
    {
        return ProductVariant::query()
            ->whereKey($variant->id)
            ->where('product_id', $product->id)
            ->firstOrFail();
    }

    private function variantResponse(
        ProductVariant $variant,
        Request $request,
        ?string $message = null,
        int $status = Response::HTTP_OK,
    ): JsonResponse {
        return $this->successResponse([
            'variant' => ProductVariantResource::make($variant)->resolve($request),
        ], $message, $status);
    }

    private function ensureOnlyStatusFields(Request $request): void
    {
        $extraFields = collect($request->keys())
            ->diff(['status', 'is_active'])
            ->values();

        if ($extraFields->isEmpty()) {
            return;
        }

        throw ValidationException::withMessages(
            $extraFields
                ->mapWithKeys(fn (string $field): array => [
                    $field => 'Only status and is_active may be changed by this endpoint.',
                ])
                ->all(),
        );
    }

    private function ensureFeatureEnabled(string $featureKey, bool $default = false): void
    {
        abort_unless($this->featureEnabled($featureKey, $default), Response::HTTP_FORBIDDEN);
    }

    private function featureEnabled(string $featureKey, bool $default = false): bool
    {
        try {
            if (Schema::hasTable('feature_flags')) {
                $flag = DB::table('feature_flags')
                    ->where('feature_key', $featureKey)
                    ->where('status', 'active')
                    ->first();

                return $flag !== null ? (bool) $flag->is_enabled : $default;
            }
        } catch (Throwable) {
            return $default;
        }

        return $default;
    }
}
