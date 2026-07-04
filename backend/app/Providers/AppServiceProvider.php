<?php

namespace App\Providers;

use App\Events\CatalogCacheInvalidated;
use App\Jobs\ClearCacheJob;
use App\Models\Banner;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Message;
use App\Models\Order;
use App\Models\Product;
use App\Models\ProductBeautyProfile;
use App\Models\ProductReview;
use App\Models\ProductVariant;
use App\Models\Quotation;
use App\Models\RFQ;
use App\Models\SellerBrandAuthorization;
use App\Models\Supplier;
use App\Models\SupplierReview;
use App\Policies\BrandPolicy;
use App\Policies\MessagePolicy;
use App\Policies\OrderPolicy;
use App\Policies\ProductBeautyProfilePolicy;
use App\Policies\ProductPolicy;
use App\Policies\ProductVariantPolicy;
use App\Policies\QuotationPolicy;
use App\Policies\ReviewPolicy;
use App\Policies\RFQPolicy;
use App\Policies\SellerBrandAuthorizationPolicy;
use App\Policies\SupplierPolicy;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        ResetPassword::createUrlUsing(function (mixed $notifiable, string $token): string {
            $frontendUrl = rtrim((string) config('app.frontend_url'), '/');

            return $frontendUrl.'/reset-password?'.http_build_query([
                'token' => $token,
                'email' => $notifiable->getEmailForPasswordReset(),
            ]);
        });

        Gate::policy(Product::class, ProductPolicy::class);
        Gate::policy(Brand::class, BrandPolicy::class);
        Gate::policy(ProductBeautyProfile::class, ProductBeautyProfilePolicy::class);
        Gate::policy(ProductVariant::class, ProductVariantPolicy::class);
        Gate::policy(SellerBrandAuthorization::class, SellerBrandAuthorizationPolicy::class);
        Gate::policy(Supplier::class, SupplierPolicy::class);
        Gate::policy(RFQ::class, RFQPolicy::class);
        Gate::policy(Quotation::class, QuotationPolicy::class);
        Gate::policy(Order::class, OrderPolicy::class);
        Gate::policy(Message::class, MessagePolicy::class);
        Gate::policy(ProductReview::class, ReviewPolicy::class);
        Gate::policy(SupplierReview::class, ReviewPolicy::class);

        RateLimiter::for('global', fn (Request $request) => Limit::perMinute(120)
            ->by($request->user()?->id ?: $request->ip()));
        RateLimiter::for('auth', fn (Request $request) => Limit::perMinute(5)
            ->by($request->ip()));
        RateLimiter::for('search', fn (Request $request) => Limit::perMinute(60)
            ->by($request->user()?->id ?: $request->ip()));

        Event::listen(
            CatalogCacheInvalidated::class,
            fn (CatalogCacheInvalidated $event) => ClearCacheJob::dispatch($event->groups),
        );

        $this->registerCacheInvalidation(Product::class, ['products', 'suppliers']);
        $this->registerCacheInvalidation(Category::class, ['categories', 'products']);
        $this->registerCacheInvalidation(Supplier::class, ['suppliers', 'products']);
        $this->registerCacheInvalidation(Banner::class, ['banners']);
    }

    private function registerCacheInvalidation(string $model, array $groups): void
    {
        foreach (['created', 'updated', 'deleted'] as $event) {
            $model::$event(fn () => event(new CatalogCacheInvalidated($groups)));
        }
    }
}
