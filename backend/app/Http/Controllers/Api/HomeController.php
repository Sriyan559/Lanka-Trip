<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\BannerResource;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\ProductResource;
use App\Http\Resources\SupplierResource;
use App\Http\Resources\TrendingKeywordResource;
use App\Models\Banner;
use App\Models\Category;
use App\Models\Product;
use App\Models\Supplier;
use App\Models\TrendingKeyword;
use App\Support\CacheKeys;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class HomeController extends Controller
{
    public function navMenus(Request $request): JsonResponse
    {
        $categories = Cache::remember(
            CacheKeys::versioned('categories', 'nav-menus'),
            CacheKeys::TTL_SECONDS,
            fn () => Category::query()
                ->active()
                ->whereNull('parent_id')
                ->with(['children' => fn ($query) => $query->active()->orderBy('sort_order')->orderBy('name')])
                ->orderBy('sort_order')
                ->orderBy('name')
                ->get(),
        );

        return $this->successResponse([
            'categories' => CategoryResource::collection($categories)->resolve($request),
            'menu' => [
                'Secured Trading',
                'Verified Suppliers',
                'Top Products',
                'Video Channel',
            ],
        ]);
    }

    public function trendingCategories(Request $request): JsonResponse
    {
        $categories = Cache::remember(
            CacheKeys::versioned('categories', 'trending'),
            CacheKeys::TTL_SECONDS,
            fn () => Category::query()
                ->active()
                ->whereNull('parent_id')
                ->orderBy('sort_order')
                ->orderBy('name')
                ->limit(12)
                ->get(),
        );

        return $this->successResponse([
            'data' => CategoryResource::collection($categories)->resolve($request),
        ]);
    }

    public function banners(Request $request): JsonResponse
    {
        return $this->successResponse([
            'data' => BannerResource::collection($this->homeBanners())->resolve($request),
        ]);
    }

    public function sections(Request $request): JsonResponse
    {
        return $this->successResponse([
            'banners' => BannerResource::collection($this->homeBanners())->resolve($request),
            'featured_products' => ProductResource::collection($this->homeFeaturedProducts())->resolve($request),
            'recommendations' => ProductResource::collection($this->homeRecommendations())->resolve($request),
            'trending_products' => ProductResource::collection($this->homeTrendingProducts())->resolve($request),
            'verified_suppliers' => SupplierResource::collection($this->homeVerifiedSuppliers())->resolve($request),
            'trending_keywords' => TrendingKeywordResource::collection($this->homeTrendingKeywords())->resolve($request),
        ]);
    }

    public function recommendations(Request $request): JsonResponse
    {
        return $this->productListResponse($this->homeRecommendations(), $request);
    }

    public function featuredProducts(Request $request): JsonResponse
    {
        return $this->productListResponse($this->homeFeaturedProducts(), $request);
    }

    public function trendingProducts(Request $request): JsonResponse
    {
        return $this->productListResponse($this->homeTrendingProducts(), $request);
    }

    public function verifiedSuppliers(Request $request): JsonResponse
    {
        return $this->successResponse([
            'data' => SupplierResource::collection($this->homeVerifiedSuppliers())->resolve($request),
        ]);
    }

    public function trendingKeywords(Request $request): JsonResponse
    {
        $keywords = $this->homeTrendingKeywords();

        return $this->successResponse([
            'data' => TrendingKeywordResource::collection($keywords)->resolve($request),
            'keywords' => $keywords->pluck('keyword')->values()->all(),
        ]);
    }

    private function homeBanners()
    {
        return Cache::remember(
            CacheKeys::versioned('banners', 'home'),
            CacheKeys::TTL_SECONDS,
            fn () => Banner::query()
                ->active()
                ->orderBy('sort_order')
                ->orderBy('id')
                ->get(),
        );
    }

    private function homeRecommendations()
    {
        return Cache::remember(
            CacheKeys::versioned('products', 'home-recommendations'),
            CacheKeys::TTL_SECONDS,
            fn () => $this->publicProductQuery()->latest()->limit(12)->get(),
        );
    }

    private function homeFeaturedProducts()
    {
        return Cache::remember(
            CacheKeys::versioned('products', 'home-featured'),
            CacheKeys::TTL_SECONDS,
            fn () => $this->publicProductQuery()
                ->where('is_featured', true)
                ->latest()
                ->limit(12)
                ->get(),
        );
    }

    private function homeTrendingProducts()
    {
        return Cache::remember(
            CacheKeys::versioned('products', 'home-trending'),
            CacheKeys::TTL_SECONDS,
            fn () => $this->publicProductQuery()
                ->orderByDesc('views_count')
                ->latest('id')
                ->limit(12)
                ->get(),
        );
    }

    private function homeVerifiedSuppliers()
    {
        return Cache::remember(
            CacheKeys::versioned('suppliers', 'home-verified'),
            CacheKeys::TTL_SECONDS,
            fn () => Supplier::query()
                ->active()
                ->where('verification_status', 'verified')
                ->withCount([
                    'products' => fn (Builder $query) => $query
                        ->active()
                        ->whereHas('category', fn (Builder $query) => $query->active()),
                ])
                ->orderByDesc('is_featured')
                ->orderByDesc('rating')
                ->limit(12)
                ->get(),
        );
    }

    private function homeTrendingKeywords()
    {
        return Cache::remember(
            CacheKeys::versioned('keywords', 'home-trending'),
            CacheKeys::TTL_SECONDS,
            fn () => TrendingKeyword::query()
                ->active()
                ->orderBy('sort_order')
                ->orderBy('keyword')
                ->get(),
        );
    }

    private function publicProductQuery(): Builder
    {
        return Product::query()
            ->active()
            ->whereHas('category', fn (Builder $query) => $query->active())
            ->with(['category', 'images', 'supplier']);
    }

    private function productListResponse($products, Request $request): JsonResponse
    {
        return $this->successResponse([
            'data' => ProductResource::collection($products)->resolve($request),
        ]);
    }
}
