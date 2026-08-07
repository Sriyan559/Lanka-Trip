<?php

use App\Http\Controllers\Api\Admin\AdminDashboardController;
use App\Http\Controllers\Api\Admin\AdminReportController;
use App\Http\Controllers\Api\Admin\BrandAuthorizationDecisionController;
use App\Http\Controllers\Api\Admin\EcosystemModuleController;
use App\Http\Controllers\Api\Admin\LogisticsController;
use App\Http\Controllers\Api\Admin\MarketplaceCommissionsController;
use App\Http\Controllers\Api\Admin\MarketplaceCancellationsController;
use App\Http\Controllers\Api\Admin\MarketplaceDashboardController;
use App\Http\Controllers\Api\Admin\MarketplaceListingsController;
use App\Http\Controllers\Api\Admin\MarketplaceOrdersController;
use App\Http\Controllers\Api\Admin\MarketplacePolicyViolationsController;
use App\Http\Controllers\Api\Admin\MarketplacePromotionsController;
use App\Http\Controllers\Api\Admin\MarketplaceReturnsController;
use App\Http\Controllers\Api\Admin\MarketplaceSellersController;
use App\Http\Controllers\Api\Admin\PayoutController;
use App\Http\Controllers\Api\Admin\ReturnCaseController;
use App\Http\Controllers\Api\Admin\SupportCaseController;
use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\AnalyticsController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BeautyAdvisorController;
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

    Route::middleware('admin')->group(function () {
        Route::get('/admin/dashboard', [AdminController::class, 'dashboard']);
        Route::get('/admin/dashboard/overview', AdminDashboardController::class);
        Route::get('/admin/marketplace/dashboard', [MarketplaceDashboardController::class, 'show']);
        Route::get('/admin/marketplace/dashboard/export', [MarketplaceDashboardController::class, 'export']);
        Route::get('/admin/marketplace/listings', [MarketplaceListingsController::class, 'index']);
        Route::get('/admin/marketplace/listings/export', [MarketplaceListingsController::class, 'export']);
        Route::get('/admin/marketplace/listings/{listing}', [MarketplaceListingsController::class, 'show'])->whereNumber('listing');
        Route::get('/admin/marketplace/sellers', [MarketplaceSellersController::class, 'index']);
        Route::get('/admin/marketplace/sellers/export', [MarketplaceSellersController::class, 'export']);
        Route::get('/admin/marketplace/sellers/{seller}', [MarketplaceSellersController::class, 'show'])->whereNumber('seller');
        Route::get('/admin/marketplace/promotions', [MarketplacePromotionsController::class, 'index']);
        Route::get('/admin/marketplace/promotions/{promotion}', [MarketplacePromotionsController::class, 'show'])->whereNumber('promotion');
        Route::get('/admin/marketplace/commissions', [MarketplaceCommissionsController::class, 'index']);
        Route::get('/admin/marketplace/commissions/export', [MarketplaceCommissionsController::class, 'export']);
        Route::get('/admin/marketplace/orders', [MarketplaceOrdersController::class, 'index']);
        Route::get('/admin/marketplace/orders/export', [MarketplaceOrdersController::class, 'export']);
        Route::get('/admin/marketplace/orders/manual-capabilities', [MarketplaceOrdersController::class, 'manualCapabilities']);
        Route::get('/admin/marketplace/orders/cancellations', [MarketplaceCancellationsController::class, 'index']);
        Route::get('/admin/marketplace/orders/cancellations/export', [MarketplaceCancellationsController::class, 'export']);
        Route::get('/admin/marketplace/orders/{order}', [MarketplaceOrdersController::class, 'show'])->whereNumber('order');
        Route::get('/admin/marketplace/policy-violations', [MarketplacePolicyViolationsController::class, 'index']);
        Route::get('/admin/marketplace/policy-violations/export', [MarketplacePolicyViolationsController::class, 'export']);
        Route::get('/admin/marketplace/policy-violations/{case}', [MarketplacePolicyViolationsController::class, 'show'])->whereNumber('case');
        Route::get('/admin/marketplace/returns', [MarketplaceReturnsController::class, 'index']);
        Route::get('/admin/marketplace/returns/export', [MarketplaceReturnsController::class, 'export']);
        Route::post('/admin/marketplace/returns/bulk-assign', [MarketplaceReturnsController::class, 'bulkAssign']);
        Route::post('/admin/marketplace/returns/{returnCase}/override-inspection', [MarketplaceReturnsController::class, 'overrideInspection'])->whereNumber('returnCase');
        Route::post('/admin/marketplace/returns/{returnCase}/approve-refund', [MarketplaceReturnsController::class, 'approveRefund'])->whereNumber('returnCase');

        Route::get('/admin/payouts/summary', [PayoutController::class, 'summary']);
        Route::get('/admin/payouts/settlements', [PayoutController::class, 'settlements']);
        Route::get('/admin/payouts', [PayoutController::class, 'index']);
        Route::get('/admin/payouts/{payout}', [PayoutController::class, 'show'])->whereNumber('payout');
        Route::patch('/admin/payouts/{payout}/status', [PayoutController::class, 'transition'])->whereNumber('payout');

        Route::get('/admin/support/dashboard', [SupportCaseController::class, 'dashboard']);
        Route::get('/admin/support/cases', [SupportCaseController::class, 'index']);
        Route::post('/admin/support/cases', [SupportCaseController::class, 'store']);
        Route::get('/admin/support/cases/{case}', [SupportCaseController::class, 'show'])->whereNumber('case');
        Route::post('/admin/support/cases/{case}/assign', [SupportCaseController::class, 'assign'])->whereNumber('case');
        Route::post('/admin/support/cases/{case}/replies', [SupportCaseController::class, 'reply'])->whereNumber('case');
        Route::post('/admin/support/cases/{case}/notes', [SupportCaseController::class, 'note'])->whereNumber('case');
        Route::patch('/admin/support/cases/{case}/status', [SupportCaseController::class, 'transition'])->whereNumber('case');
        Route::post('/admin/support/cases/{case}/escalate', [SupportCaseController::class, 'escalate'])->whereNumber('case');
        Route::get('/admin/support/cases/{case}/history', [SupportCaseController::class, 'history'])->whereNumber('case');

        Route::get('/admin/returns', [ReturnCaseController::class, 'index']);
        Route::get('/admin/returns/{returnCase}', [ReturnCaseController::class, 'show'])->whereNumber('returnCase');
        Route::patch('/admin/returns/{returnCase}/status', [ReturnCaseController::class, 'transition'])->whereNumber('returnCase');
        Route::post('/admin/returns/{returnCase}/inspections', [ReturnCaseController::class, 'inspect'])->whereNumber('returnCase');

        Route::get('/admin/ecosystem/dashboard', [EcosystemModuleController::class, 'dashboard']);
        Route::get('/admin/ecosystem/modules', [EcosystemModuleController::class, 'index']);
        Route::get('/admin/ecosystem/modules/{module}', [EcosystemModuleController::class, 'show'])->whereNumber('module');
        Route::put('/admin/ecosystem/modules/{module}/configuration', [EcosystemModuleController::class, 'configure'])->whereNumber('module');
        Route::patch('/admin/ecosystem/modules/{module}/enabled', [EcosystemModuleController::class, 'toggle'])->whereNumber('module');
        Route::get('/admin/ecosystem/modules/{module}/history', [EcosystemModuleController::class, 'audit'])->whereNumber('module');

        Route::get('/admin/brand-authorizations', [BrandAuthorizationDecisionController::class, 'index']);
        Route::get('/admin/brand-authorizations/{authorization}', [BrandAuthorizationDecisionController::class, 'show'])->whereNumber('authorization');
        Route::post('/admin/brand-authorizations/{authorization}/decisions', [BrandAuthorizationDecisionController::class, 'decide'])->whereNumber('authorization');

        Route::get('/admin/logistics/dashboard', [LogisticsController::class, 'dashboard']);
        Route::get('/admin/logistics/shipments', [LogisticsController::class, 'index']);
        Route::get('/admin/logistics/shipments/{shipment}', [LogisticsController::class, 'show'])->whereNumber('shipment');
        Route::patch('/admin/logistics/shipments/{shipment}/status', [LogisticsController::class, 'updateStatus'])->whereNumber('shipment');

        Route::get('/admin/reports', [AdminReportController::class, 'index']);
        Route::get('/admin/reports/{report}', [AdminReportController::class, 'execute']);

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
    Route::post('/conversations', [BeautyAdvisorController::class, 'startConversation']);
    Route::get('/conversations', [BeautyAdvisorController::class, 'listConversations']);
    Route::get('/conversations/{id}', [BeautyAdvisorController::class, 'showConversation'])->whereNumber('id');
    Route::post('/conversations/{id}/new', [BeautyAdvisorController::class, 'newConversation'])->whereNumber('id');
    Route::post('/conversations/{id}/activate', [BeautyAdvisorController::class, 'activateConversation'])->whereNumber('id');
    Route::patch('/conversations/{id}', [BeautyAdvisorController::class, 'renameConversation'])->whereNumber('id');
    Route::delete('/conversations/{id}', [BeautyAdvisorController::class, 'deleteConversation'])->whereNumber('id');
    Route::delete('/conversations/{id}/messages', [BeautyAdvisorController::class, 'clearConversation'])->whereNumber('id');
    Route::get('/conversations/{id}/messages', [BeautyAdvisorController::class, 'showConversation'])->whereNumber('id');
    Route::post('/conversations/{id}/messages', [BeautyAdvisorController::class, 'sendMessage'])->middleware('throttle:30,1')->whereNumber('id');
    Route::post('/conversations/{id}/profile', [BeautyAdvisorController::class, 'updateProfile'])->whereNumber('id');
    Route::post('/messages/{id}/feedback', [BeautyAdvisorController::class, 'feedback'])->middleware('throttle:20,1')->whereNumber('id');

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/plans', [BeautyAdvisorController::class, 'savePlan']);
        Route::get('/plans', [BeautyAdvisorController::class, 'getPlans']);
        Route::get('/plans/{id}', [BeautyAdvisorController::class, 'showPlan'])->whereNumber('id');
        Route::patch('/plans/{id}', [BeautyAdvisorController::class, 'updatePlan'])->whereNumber('id');
        Route::delete('/plans/{id}', [BeautyAdvisorController::class, 'deletePlan'])->whereNumber('id');
        Route::get('/plans/{id}/download', [BeautyAdvisorController::class, 'downloadPlan'])->whereNumber('id');
    });
});
