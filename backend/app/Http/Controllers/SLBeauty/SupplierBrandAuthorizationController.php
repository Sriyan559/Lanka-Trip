<?php

namespace App\Http\Controllers\SLBeauty;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSellerBrandAuthorizationRequest;
use App\Http\Requests\UpdateSellerBrandAuthorizationRequest;
use App\Http\Resources\SellerBrandAuthorizationResource;
use App\Models\Brand;
use App\Models\SellerBrandAuthorization;
use App\Models\Supplier;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Schema;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class SupplierBrandAuthorizationController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $this->ensureFeatureEnabled('sl_beauty.brand_seller_verification');
        $supplier = $this->ownedSupplier($request);
        Gate::authorize('viewAny', SellerBrandAuthorization::class);

        $perPage = min(max($request->integer('per_page', 20), 1), 100);
        $paginator = SellerBrandAuthorization::query()
            ->where('supplier_id', $supplier->id)
            ->with('brand')
            ->latest()
            ->paginate($perPage)
            ->withQueryString();
        $pagination = $paginator->toArray();
        unset($pagination['data']);

        return $this->successResponse([
            'data' => SellerBrandAuthorizationResource::collection($paginator->getCollection())->resolve($request),
            ...$pagination,
        ]);
    }

    public function store(StoreSellerBrandAuthorizationRequest $request): JsonResponse
    {
        $this->ensureFeatureEnabled('sl_beauty.brand_seller_verification');
        $supplier = $this->ownedSupplier($request);
        $brand = Brand::query()
            ->whereKey($request->integer('brand_id'))
            ->where('status', 'active')
            ->firstOrFail();

        Gate::authorize('create', [SellerBrandAuthorization::class, $brand]);

        $authorization = SellerBrandAuthorization::create([
            'supplier_id' => $supplier->id,
            'status' => 'draft',
            ...$request->validated(),
        ]);

        return $this->authorizationResponse(
            $authorization->refresh()->load('brand'),
            $request,
            'Brand authorization created successfully.',
            Response::HTTP_CREATED,
        );
    }

    public function show(Request $request, SellerBrandAuthorization $authorization): JsonResponse
    {
        $this->ensureFeatureEnabled('sl_beauty.brand_seller_verification');
        $authorization = $this->ownedAuthorization($request, $authorization);
        Gate::authorize('view', $authorization);

        return $this->authorizationResponse($authorization->load('brand'), $request);
    }

    public function update(
        UpdateSellerBrandAuthorizationRequest $request,
        SellerBrandAuthorization $authorization,
    ): JsonResponse {
        $this->ensureFeatureEnabled('sl_beauty.brand_seller_verification');
        $authorization = $this->ownedAuthorization($request, $authorization);
        Gate::authorize('update', $authorization);

        $authorization->update($request->validated());

        return $this->authorizationResponse(
            $authorization->refresh()->load('brand'),
            $request,
            'Brand authorization updated successfully.',
        );
    }

    public function submit(Request $request, SellerBrandAuthorization $authorization): JsonResponse
    {
        $this->ensureFeatureEnabled('sl_beauty.brand_seller_verification');
        $authorization = $this->ownedAuthorization($request, $authorization);
        Gate::authorize('submit', $authorization);

        $authorization->update(['status' => 'submitted']);

        return $this->authorizationResponse(
            $authorization->refresh()->load('brand'),
            $request,
            'Brand authorization submitted successfully.',
        );
    }

    public function destroy(Request $request, SellerBrandAuthorization $authorization): JsonResponse
    {
        $this->ensureFeatureEnabled('sl_beauty.brand_seller_verification');
        $authorization = $this->ownedAuthorization($request, $authorization);
        Gate::authorize('delete', $authorization);

        $authorization->delete();

        return $this->successResponse(message: 'Brand authorization deleted successfully.');
    }

    private function ownedSupplier(Request $request): Supplier
    {
        abort_unless($request->user()?->role === 'supplier', Response::HTTP_FORBIDDEN);

        return Supplier::query()
            ->where('user_id', $request->user()->id)
            ->firstOrFail();
    }

    private function ownedAuthorization(
        Request $request,
        SellerBrandAuthorization $authorization,
    ): SellerBrandAuthorization {
        return SellerBrandAuthorization::query()
            ->whereKey($authorization->id)
            ->where('supplier_id', $this->ownedSupplier($request)->id)
            ->firstOrFail();
    }

    private function authorizationResponse(
        SellerBrandAuthorization $authorization,
        Request $request,
        ?string $message = null,
        int $status = Response::HTTP_OK,
    ): JsonResponse {
        return $this->successResponse([
            'authorization' => SellerBrandAuthorizationResource::make($authorization)->resolve($request),
        ], $message, $status);
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
