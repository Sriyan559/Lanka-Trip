<?php

namespace App\Http\Controllers\SLBeauty;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateProductBeautyProfileRequest;
use App\Http\Resources\ProductBeautyProfileResource;
use App\Models\Product;
use App\Models\ProductBeautyProfile;
use App\Models\Supplier;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Schema;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class SupplierBeautyProfileController extends Controller
{
    public function show(Request $request, Product $product): JsonResponse
    {
        $this->ensureFeatureEnabled('sl_beauty.taxonomy', true);
        $product = $this->ownedProduct($request, $product);
        $profile = $product->beautyProfile()->firstOrFail();

        Gate::authorize('view', $profile);

        return $this->beautyProfileResponse($profile, $request);
    }

    public function upsert(UpdateProductBeautyProfileRequest $request, Product $product): JsonResponse
    {
        $this->ensureFeatureEnabled('sl_beauty.taxonomy', true);
        $product = $this->ownedProduct($request, $product);
        $profile = $product->beautyProfile()->first();

        if ($profile) {
            Gate::authorize('update', $profile);
            $profile->update($request->validated());
        } else {
            Gate::authorize('create', [ProductBeautyProfile::class, $product]);
            $profile = $product->beautyProfile()->create($request->validated());
        }

        return $this->beautyProfileResponse(
            $profile->refresh(),
            $request,
            'Beauty profile saved successfully.',
        );
    }

    public function submitCompliance(Request $request, Product $product): JsonResponse
    {
        $this->ensureFeatureEnabled('sl_beauty.compliance_workflows');
        $product = $this->ownedProduct($request, $product);
        $profile = $product->beautyProfile()->firstOrFail();

        Gate::authorize('submitCompliance', $profile);

        $profile->update(['compliance_status' => 'pending_review']);

        return $this->beautyProfileResponse(
            $profile->refresh(),
            $request,
            'Beauty profile submitted for compliance review.',
        );
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

    private function beautyProfileResponse(
        ProductBeautyProfile $profile,
        Request $request,
        ?string $message = null,
    ): JsonResponse {
        return $this->successResponse([
            'beauty_profile' => ProductBeautyProfileResource::make($profile)->resolve($request),
        ], $message);
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
