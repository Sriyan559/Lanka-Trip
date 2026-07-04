<?php

namespace App\Http\Controllers\SLBeauty;

use App\Http\Controllers\Controller;
use App\Http\Resources\BrandResource;
use App\Http\Resources\ProductBeautyProfileResource;
use App\Http\Resources\ProductVariantResource;
use App\Models\Brand;
use App\Models\Product;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class PublicBeautyController extends Controller
{
    public function brands(Request $request): JsonResponse
    {
        $this->ensureTaxonomyEnabled();

        $perPage = min(max($request->integer('per_page', 20), 1), 100);
        $search = trim($request->string('search')->toString());

        $query = Brand::query()
            ->where('status', 'active')
            ->where('is_verified', true)
            ->orderBy('name');

        if ($search !== '') {
            $query->where(function (Builder $query) use ($search): void {
                $query
                    ->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        $paginator = $query->paginate($perPage)->withQueryString();
        $pagination = $paginator->toArray();
        unset($pagination['data']);

        return $this->successResponse([
            'data' => BrandResource::collection($paginator->getCollection())->resolve($request),
            ...$pagination,
        ]);
    }

    public function brand(Request $request, string $slug): JsonResponse
    {
        $this->ensureTaxonomyEnabled();

        $brand = Brand::query()
            ->where('status', 'active')
            ->where('is_verified', true)
            ->where('slug', $slug)
            ->firstOrFail();

        return $this->successResponse([
            'brand' => BrandResource::make($brand)->resolve($request),
        ]);
    }

    public function beautyProfile(Request $request, Product $product): JsonResponse
    {
        $this->ensureTaxonomyEnabled();
        $this->ensurePublicProduct($product);

        $profile = $product->beautyProfile()->firstOrFail();

        return $this->successResponse([
            'beauty_profile' => ProductBeautyProfileResource::make($profile)->resolve($request),
        ]);
    }

    public function variants(Request $request, Product $product): JsonResponse
    {
        $this->ensureTaxonomyEnabled();
        $this->ensurePublicProduct($product);

        $variants = $product->variants()
            ->where('status', 'active')
            ->where('is_active', true)
            ->orderByDesc('is_default')
            ->orderBy('name')
            ->get();

        return $this->successResponse([
            'data' => ProductVariantResource::collection($variants)->resolve($request),
        ]);
    }

    public function beautySummary(Request $request, Product $product): JsonResponse
    {
        $this->ensureTaxonomyEnabled();
        $this->ensurePublicProduct($product);

        $profile = $product->beautyProfile()->firstOrFail();
        $variants = $product->variants()
            ->where('status', 'active')
            ->where('is_active', true)
            ->orderByDesc('is_default')
            ->orderBy('name')
            ->get();

        return $this->successResponse([
            'product_id' => $product->id,
            'beauty_profile' => ProductBeautyProfileResource::make($profile)->resolve($request),
            'variants' => ProductVariantResource::collection($variants)->resolve($request),
        ]);
    }

    private function ensurePublicProduct(Product $product): void
    {
        if ($product->status !== 'active' || ! $product->category()->active()->exists()) {
            abort(Response::HTTP_NOT_FOUND);
        }
    }

    private function ensureTaxonomyEnabled(): void
    {
        if (! $this->featureEnabled('sl_beauty.taxonomy', true)) {
            abort(Response::HTTP_NOT_FOUND);
        }
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
