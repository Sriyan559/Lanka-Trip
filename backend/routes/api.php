<?php

use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\AnalyticsController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\CheckoutController;
use App\Http\Controllers\Api\ConversationController;
use App\Http\Controllers\Api\FooterAppBadgeController;
use App\Http\Controllers\Api\HomeController;
use App\Http\Controllers\Api\InquiryCartController;
use App\Http\Controllers\Api\MessageController;
use App\Http\Controllers\Api\NotificationController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\ProductReviewController;
use App\Http\Controllers\Api\QuotationController;
use App\Http\Controllers\Api\RFQController;
use App\Http\Controllers\Api\SearchController;
use App\Http\Controllers\Api\SupplierController;
use App\Http\Controllers\Api\SupplierProductController;
use App\Http\Controllers\Api\SupplierProfileController;
use App\Http\Controllers\Api\SupplierReviewController;
use App\Http\Controllers\Api\UploadController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\WishlistController;
use App\Http\Controllers\SLBeauty\AdminBrandController;
use App\Http\Controllers\SLBeauty\PublicBeautyController;
use App\Http\Controllers\SLBeauty\SupplierBeautyProfileController;
use App\Http\Controllers\SLBeauty\SupplierBrandAuthorizationController;
use App\Http\Controllers\SLBeauty\SupplierProductVariantController;
use Illuminate\Support\Facades\Route;

Route::get('/health', fn () => response()->json([
    'status' => 'ok',
    'app' => 'EcomLanka',
    'version' => '1.0.0',
]));

Route::get('/public/footer-app-badges', [FooterAppBadgeController::class, 'index']);

Route::get('/nav/menus', [HomeController::class, 'navMenus']);
Route::get('/categories/trending', [HomeController::class, 'trendingCategories']);
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{slug}', [CategoryController::class, 'show']);
Route::get('/categories/{slug}/products', [CategoryController::class, 'products']);

Route::get('/home/banners', [HomeController::class, 'banners']);
Route::get('/home/sections', [HomeController::class, 'sections']);
Route::get('/home/recommendations', [HomeController::class, 'recommendations']);
Route::get('/home/featured-products', [HomeController::class, 'featuredProducts']);
Route::get('/home/trending-products', [HomeController::class, 'trendingProducts']);
Route::get('/home/verified-suppliers', [HomeController::class, 'verifiedSuppliers']);
Route::get('/home/trending-keywords', [HomeController::class, 'trendingKeywords']);

Route::middleware('throttle:search')->group(function () {
    Route::get('/search/products', [SearchController::class, 'products']);
    Route::get('/search/suppliers', [SearchController::class, 'suppliers']);
    Route::get('/search/global', [SearchController::class, 'global']);
});

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/featured', [ProductController::class, 'featured']);
Route::get('/products/trending', [ProductController::class, 'trending']);
Route::get('/products/{id}/reviews', [ProductReviewController::class, 'index'])->whereNumber('id');
Route::get('/products/{id}', [ProductController::class, 'show'])->whereNumber('id');

Route::get('/suppliers', [SupplierController::class, 'index']);
Route::get('/suppliers/{id}', [SupplierController::class, 'show'])->whereNumber('id');
Route::get('/suppliers/{id}/products', [SupplierController::class, 'products'])->whereNumber('id');
Route::get('/suppliers/{id}/reviews', [SupplierReviewController::class, 'index'])->whereNumber('id');
Route::get('/suppliers/{id}/company-profile', [SupplierProfileController::class, 'publicCompanyProfile'])
    ->whereNumber('id');

Route::prefix('sl-beauty')->group(function () {
    Route::get('/brands', [PublicBeautyController::class, 'brands']);
    Route::get('/brands/{slug}', [PublicBeautyController::class, 'brand']);
    Route::get('/products/{product}/beauty-profile', [PublicBeautyController::class, 'beautyProfile'])
        ->whereNumber('product');
    Route::get('/products/{product}/variants', [PublicBeautyController::class, 'variants'])
        ->whereNumber('product');
    Route::get('/products/{product}/beauty-summary', [PublicBeautyController::class, 'beautySummary'])
        ->whereNumber('product');
});

Route::post('/checkout/quote', [CheckoutController::class, 'quote']);

Route::prefix('auth')->group(function () {
    Route::middleware('throttle:auth')->group(function () {
        Route::post('/register', [AuthController::class, 'register']);
        Route::post('/login', [AuthController::class, 'login']);
        Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
        Route::post('/reset-password', [AuthController::class, 'resetPassword']);
    });

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/me', [AuthController::class, 'me']);
    });
});

Route::prefix('user')->middleware('auth:sanctum')->group(function () {
    Route::get('/dashboard', [UserController::class, 'dashboard']);
    Route::get('/profile', [UserController::class, 'profile']);
    Route::put('/profile', [UserController::class, 'updateProfile']);
    Route::put('/password', [UserController::class, 'updatePassword']);
});

Route::prefix('cart')->middleware('auth:sanctum')->group(function () {
    Route::get('/', [InquiryCartController::class, 'show']);
    Route::post('/items', [InquiryCartController::class, 'store']);
    Route::put('/items/{id}', [InquiryCartController::class, 'update'])->whereNumber('id');
    Route::delete('/items/{id}', [InquiryCartController::class, 'destroy'])->whereNumber('id');
    Route::delete('/', [InquiryCartController::class, 'clear']);
});

Route::prefix('wishlist')->middleware('auth:sanctum')->group(function () {
    Route::get('/', [WishlistController::class, 'index']);
    Route::post('/', [WishlistController::class, 'store']);
    Route::delete('/{wishlistId}', [WishlistController::class, 'destroy'])->whereNumber('wishlistId');
});

Route::prefix('rfqs')->middleware('auth:sanctum')->group(function () {
    Route::post('/', [RFQController::class, 'store']);
    Route::get('/', [RFQController::class, 'index']);
    Route::get('/{id}', [RFQController::class, 'show'])->whereNumber('id');
    Route::put('/{id}', [RFQController::class, 'update'])->whereNumber('id');
    Route::delete('/{id}', [RFQController::class, 'destroy'])->whereNumber('id');
});

Route::get('/supplier/rfqs', [RFQController::class, 'supplierIndex'])
    ->middleware('auth:sanctum');
Route::get('/supplier/rfqs/{id}', [RFQController::class, 'supplierShow'])
    ->middleware('auth:sanctum')
    ->whereNumber('id');

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/analytics/dashboard', [AnalyticsController::class, 'dashboard']);
    Route::get('/analytics/top-products', [AnalyticsController::class, 'topProducts']);
    Route::get('/analytics/top-suppliers', [AnalyticsController::class, 'topSuppliers']);
    Route::get('/analytics/top-categories', [AnalyticsController::class, 'topCategories']);
    Route::get('/analytics/rfqs', [AnalyticsController::class, 'rfqs']);
    Route::get('/analytics/quotations', [AnalyticsController::class, 'quotations']);
    Route::get('/analytics/orders', [AnalyticsController::class, 'orders']);
    Route::get('/analytics/revenue', [AnalyticsController::class, 'revenue']);

    Route::post('/products/{id}/reviews', [ProductReviewController::class, 'store'])->whereNumber('id');
    Route::post('/suppliers/{id}/reviews', [SupplierReviewController::class, 'store'])->whereNumber('id');

    Route::get('/admin/dashboard', [AdminController::class, 'dashboard']);

    Route::get('/admin/users', [AdminController::class, 'users']);
    Route::get('/admin/users/{id}', [AdminController::class, 'user'])->whereNumber('id');
    Route::put('/admin/users/{id}/status', [AdminController::class, 'updateUserStatus'])->whereNumber('id');

    Route::get('/admin/suppliers', [AdminController::class, 'suppliers']);
    Route::get('/admin/suppliers/{id}', [AdminController::class, 'supplier'])->whereNumber('id');
    Route::put('/admin/suppliers/{id}/verify', [AdminController::class, 'verifySupplier'])->whereNumber('id');

    Route::get('/admin/products', [AdminController::class, 'products']);
    Route::get('/admin/products/{id}', [AdminController::class, 'product'])->whereNumber('id');
    Route::put('/admin/products/{id}/status', [AdminController::class, 'updateProductStatus'])->whereNumber('id');
    Route::delete('/admin/products/{id}', [AdminController::class, 'deleteProduct'])->whereNumber('id');

    Route::get('/admin/rfqs', [AdminController::class, 'rfqs']);
    Route::get('/admin/quotations', [AdminController::class, 'quotations']);
    Route::get('/admin/orders', [AdminController::class, 'orders']);
    Route::get('/admin/messages', [AdminController::class, 'messages']);
    Route::get('/admin/horizon/status', [AdminController::class, 'horizonStatus']);
    Route::get('/admin/activity-logs', [AdminController::class, 'activityLogs']);
    Route::get('/admin/system', [AdminController::class, 'system']);
    Route::get('/admin/backups', [AdminController::class, 'backups']);
    Route::post('/admin/maintenance/enable', [AdminController::class, 'enableMaintenance']);
    Route::post('/admin/maintenance/disable', [AdminController::class, 'disableMaintenance']);

    Route::prefix('admin/sl-beauty')->group(function () {
        Route::get('/brands', [AdminBrandController::class, 'index']);
        Route::post('/brands', [AdminBrandController::class, 'store']);
        Route::get('/brands/{brand}', [AdminBrandController::class, 'show'])
            ->whereNumber('brand');
        Route::put('/brands/{brand}', [AdminBrandController::class, 'update'])
            ->whereNumber('brand');
        Route::patch('/brands/{brand}/status', [AdminBrandController::class, 'updateStatus'])
            ->whereNumber('brand');
        Route::delete('/brands/{brand}', [AdminBrandController::class, 'destroy'])
            ->whereNumber('brand');
    });

    Route::get('/supplier/company-profile', [SupplierProfileController::class, 'getCompanyProfile']);
    Route::put('/supplier/company-profile', [SupplierProfileController::class, 'updateCompanyProfile']);

    Route::get('/supplier/products', [SupplierProductController::class, 'index']);
    Route::post('/supplier/products', [SupplierProductController::class, 'store']);
    Route::get('/supplier/products/{id}', [SupplierProductController::class, 'show'])->whereNumber('id');
    Route::put('/supplier/products/{id}', [SupplierProductController::class, 'update'])->whereNumber('id');
    Route::delete('/supplier/products/{id}', [SupplierProductController::class, 'destroy'])->whereNumber('id');

    Route::prefix('supplier/sl-beauty')->group(function () {
        Route::get('/products/{product}/beauty-profile', [SupplierBeautyProfileController::class, 'show'])
            ->whereNumber('product');
        Route::put('/products/{product}/beauty-profile', [SupplierBeautyProfileController::class, 'upsert'])
            ->whereNumber('product');
        Route::post('/products/{product}/beauty-profile/submit-compliance', [SupplierBeautyProfileController::class, 'submitCompliance'])
            ->whereNumber('product');

        Route::get('/products/{product}/variants', [SupplierProductVariantController::class, 'index'])
            ->whereNumber('product');
        Route::post('/products/{product}/variants', [SupplierProductVariantController::class, 'store'])
            ->whereNumber('product');
        Route::get('/products/{product}/variants/{variant}', [SupplierProductVariantController::class, 'show'])
            ->whereNumber(['product', 'variant']);
        Route::put('/products/{product}/variants/{variant}', [SupplierProductVariantController::class, 'update'])
            ->whereNumber(['product', 'variant']);
        Route::patch('/products/{product}/variants/{variant}/status', [SupplierProductVariantController::class, 'updateStatus'])
            ->whereNumber(['product', 'variant']);
        Route::delete('/products/{product}/variants/{variant}', [SupplierProductVariantController::class, 'destroy'])
            ->whereNumber(['product', 'variant']);

        Route::get('/brand-authorizations', [SupplierBrandAuthorizationController::class, 'index']);
        Route::post('/brand-authorizations', [SupplierBrandAuthorizationController::class, 'store']);
        Route::get('/brand-authorizations/{authorization}', [SupplierBrandAuthorizationController::class, 'show'])
            ->whereNumber('authorization');
        Route::put('/brand-authorizations/{authorization}', [SupplierBrandAuthorizationController::class, 'update'])
            ->whereNumber('authorization');
        Route::post('/brand-authorizations/{authorization}/submit', [SupplierBrandAuthorizationController::class, 'submit'])
            ->whereNumber('authorization');
        Route::delete('/brand-authorizations/{authorization}', [SupplierBrandAuthorizationController::class, 'destroy'])
            ->whereNumber('authorization');
    });

    Route::get('/supplier/certificates', [SupplierProfileController::class, 'certificates']);
    Route::post('/supplier/certificates', [SupplierProfileController::class, 'storeCertificate']);
    Route::delete('/supplier/certificates/{id}', [SupplierProfileController::class, 'deleteCertificate'])->whereNumber('id');

    Route::get('/supplier/videos', [SupplierProfileController::class, 'videos']);
    Route::post('/supplier/videos', [SupplierProfileController::class, 'storeVideo']);
    Route::delete('/supplier/videos/{id}', [SupplierProfileController::class, 'deleteVideo'])->whereNumber('id');

    Route::get('/supplier/strengths', [SupplierProfileController::class, 'strengths']);
    Route::post('/supplier/strengths', [SupplierProfileController::class, 'storeStrength']);
    Route::put('/supplier/strengths/{id}', [SupplierProfileController::class, 'updateStrength'])->whereNumber('id');
    Route::delete('/supplier/strengths/{id}', [SupplierProfileController::class, 'deleteStrength'])->whereNumber('id');

    Route::get('/supplier/production-capacity', [SupplierProfileController::class, 'productionCapacity']);
    Route::put('/supplier/production-capacity', [SupplierProfileController::class, 'updateProductionCapacity']);

    Route::post('/rfqs/{id}/quotations', [QuotationController::class, 'store'])->whereNumber('id');
    Route::get('/rfqs/{id}/quotations', [QuotationController::class, 'rfqIndex'])->whereNumber('id');
    Route::get('/supplier/quotations', [QuotationController::class, 'supplierIndex']);
    Route::get('/quotations/{id}', [QuotationController::class, 'show'])->whereNumber('id');
    Route::put('/quotations/{id}', [QuotationController::class, 'update'])->whereNumber('id');
    Route::post('/quotations/{id}/accept', [QuotationController::class, 'accept'])->whereNumber('id');
    Route::post('/quotations/{id}/reject', [QuotationController::class, 'reject'])->whereNumber('id');

    Route::get('/conversations', [ConversationController::class, 'index']);
    Route::post('/conversations', [ConversationController::class, 'store']);
    Route::get('/conversations/{id}', [ConversationController::class, 'show'])->whereNumber('id');
    Route::post('/messages', [MessageController::class, 'store']);
    Route::put('/messages/{id}/read', [MessageController::class, 'markRead'])->whereNumber('id');

    Route::get('/notifications', [NotificationController::class, 'index']);
    Route::put('/notifications/read-all', [NotificationController::class, 'markAllRead']);
    Route::put('/notifications/{id}/read', [NotificationController::class, 'markRead'])->whereNumber('id');

    Route::post('/checkout/confirm', [CheckoutController::class, 'confirm']);
    Route::get('/orders/{reference}/tracking', [CheckoutController::class, 'tracking']);
    Route::post('/orders/{reference}/retry-payment', [CheckoutController::class, 'retryPayment']);

    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/orders', [OrderController::class, 'index']);
    Route::get('/orders/{id}', [OrderController::class, 'show'])->whereNumber('id');
    Route::put('/orders/{id}/status', [OrderController::class, 'updateStatus'])->whereNumber('id');

    Route::post('/uploads/image', [UploadController::class, 'image']);
    Route::post('/uploads/document', [UploadController::class, 'document']);
    Route::delete('/uploads/{id}', [UploadController::class, 'destroy'])->whereNumber('id');
});

// AI Beauty Advisor Endpoints
Route::prefix('beauty-advisor')->group(function () {
    Route::post('/conversations', [\App\Http\Controllers\Api\BeautyAdvisorController::class, 'startConversation']);
    Route::get('/conversations', [\App\Http\Controllers\Api\BeautyAdvisorController::class, 'listConversations']);
    Route::get('/conversations/{id}', [\App\Http\Controllers\Api\BeautyAdvisorController::class, 'showConversation'])->whereNumber('id');
    Route::post('/conversations/{id}/new', [\App\Http\Controllers\Api\BeautyAdvisorController::class, 'newConversation'])->whereNumber('id');
    Route::post('/conversations/{id}/activate', [\App\Http\Controllers\Api\BeautyAdvisorController::class, 'activateConversation'])->whereNumber('id');
    Route::patch('/conversations/{id}', [\App\Http\Controllers\Api\BeautyAdvisorController::class, 'renameConversation'])->whereNumber('id');
    Route::delete('/conversations/{id}', [\App\Http\Controllers\Api\BeautyAdvisorController::class, 'deleteConversation'])->whereNumber('id');
    Route::delete('/conversations/{id}/messages', [\App\Http\Controllers\Api\BeautyAdvisorController::class, 'clearConversation'])->whereNumber('id');
    Route::post('/conversations/{id}/messages', [\App\Http\Controllers\Api\BeautyAdvisorController::class, 'sendMessage'])->middleware('throttle:30,1')->whereNumber('id');
    Route::post('/conversations/{id}/profile', [\App\Http\Controllers\Api\BeautyAdvisorController::class, 'updateProfile'])->whereNumber('id');
    Route::post('/messages/{id}/feedback', [\App\Http\Controllers\Api\BeautyAdvisorController::class, 'feedback'])->middleware('throttle:20,1')->whereNumber('id');

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/plans', [\App\Http\Controllers\Api\BeautyAdvisorController::class, 'savePlan']);
        Route::get('/plans', [\App\Http\Controllers\Api\BeautyAdvisorController::class, 'getPlans']);
        Route::get('/plans/{id}', [\App\Http\Controllers\Api\BeautyAdvisorController::class, 'showPlan'])->whereNumber('id');
        Route::patch('/plans/{id}', [\App\Http\Controllers\Api\BeautyAdvisorController::class, 'updatePlan'])->whereNumber('id');
        Route::delete('/plans/{id}', [\App\Http\Controllers\Api\BeautyAdvisorController::class, 'deletePlan'])->whereNumber('id');
        Route::get('/plans/{id}/download', [\App\Http\Controllers\Api\BeautyAdvisorController::class, 'downloadPlan'])->whereNumber('id');
    });
});
