<?php

use App\Http\Controllers\Api\Admin\AdminAdministrationController;
use App\Http\Controllers\Api\Admin\AdminDashboardController;
use App\Http\Controllers\Api\Admin\AdminIdentityController;
use App\Http\Controllers\Api\Admin\AdminRolesPermissionsController;
use App\Http\Controllers\Api\Admin\AdminTenantOrgController;
use App\Http\Controllers\Api\Admin\AdminBuChannelsController;
use App\Http\Controllers\Api\Admin\AdminSystemConfigController;
use App\Http\Controllers\Api\Admin\AdminLocalizationController;
use App\Http\Controllers\Api\Admin\AdminCommunicationsController;
use App\Http\Controllers\Api\Admin\AdminSecurityController;
use App\Http\Controllers\Api\Admin\AdminWorkflowsController;
use App\Http\Controllers\Api\Admin\AdminDataGovernanceController;
use App\Http\Controllers\Api\Admin\AdminMaintenanceController;
use App\Http\Controllers\Api\Admin\AdminReportsAuditController;
use App\Http\Controllers\Api\Admin\AdminReportController;

use App\Http\Controllers\Api\Admin\AdminSupplierDashboardController;
use App\Http\Controllers\Api\Admin\AdminVerificationComplianceController;
use App\Http\Controllers\Api\Admin\AdminCustomerDashboardController;
use App\Http\Controllers\Api\Admin\AdminCustomerDirectoryController;
use App\Http\Controllers\Api\Admin\AdminCustomerSegmentController;
use App\Http\Controllers\Api\Admin\AdminCustomerVerificationController;
use App\Http\Controllers\Api\Admin\AdminCustomerAddressController;
use App\Http\Controllers\Api\Admin\AdminCustomerCreateController;
use App\Http\Controllers\Api\Admin\AttributeManagementController;
use App\Http\Controllers\Api\Admin\BrandAuthorizationDecisionController;
use App\Http\Controllers\Api\Admin\BrandManagementController;
use App\Http\Controllers\Api\Admin\CatalogueCommandCenterController;
use App\Http\Controllers\Api\Admin\CatalogueDataOperationsController;
use App\Http\Controllers\Api\Admin\CatalogueQualityController;
use App\Http\Controllers\Api\Admin\CategoryManagementController;
use App\Http\Controllers\Api\Admin\EcosystemModuleController;
use App\Http\Controllers\Api\Admin\EcosystemAssignmentController;
use App\Http\Controllers\Api\Admin\EcosystemSectorPackController;
use App\Http\Controllers\Api\Admin\EcosystemDependencyController;
use App\Http\Controllers\Api\Admin\EcosystemReleaseController;
use App\Http\Controllers\Api\Admin\EcosystemHealthAdoptionController;
use App\Http\Controllers\Api\Admin\EcosystemFeatureFlagController;
use App\Http\Controllers\Api\Admin\EcosystemControlCenterController;
use App\Http\Controllers\Api\Admin\InventoryOperationsController;
use App\Http\Controllers\Api\Admin\LogisticsController;
use App\Http\Controllers\Api\Admin\FulfilmentWarehouseController;
use App\Http\Controllers\Api\Admin\InventoryAllocationController;
use App\Http\Controllers\Api\Admin\CarrierController;
use App\Http\Controllers\Api\Admin\DeliveryConfigurationController;
use App\Http\Controllers\Api\Admin\LogisticsExceptionController;
use App\Http\Controllers\Api\Admin\LogisticsReportController;
use App\Http\Controllers\Api\Admin\MarketingController;
use App\Http\Controllers\Api\Admin\MarketingOperationsController;
use App\Http\Controllers\Api\Admin\MarketingDeliveryController;
use App\Http\Controllers\Api\Admin\MarketingControlController;
use App\Http\Controllers\Api\Admin\MarketplaceCancellationsController;
use App\Http\Controllers\Api\Admin\MarketplaceCommissionsController;
use App\Http\Controllers\Api\Admin\FinanceDocumentsConfigurationController;
use App\Http\Controllers\Api\Admin\FinanceGovernanceController;
  use App\Http\Controllers\Api\Admin\FinanceCommandCenterController;
  use App\Http\Controllers\Api\Admin\SupplierPayablesController;
  use App\Http\Controllers\Api\Admin\FinanceRevenuePaymentsController;
  use App\Http\Controllers\Api\Admin\FinanceRefundsCompensationController;
use App\Http\Controllers\Api\Admin\MarketplaceDashboardController;
use App\Http\Controllers\Api\Admin\MarketplaceListingsController;
use App\Http\Controllers\Api\Admin\MarketplaceOrdersController;
use App\Http\Controllers\Api\Admin\MarketplacePolicyViolationsController;
use App\Http\Controllers\Api\Admin\MarketplacePromotionsController;
use App\Http\Controllers\Api\Admin\MarketplaceReturnsController;
use App\Http\Controllers\Api\Admin\MarketplaceSellersController;
use App\Http\Controllers\Api\Admin\MarketplaceWorkspaceController;
use App\Http\Controllers\Api\Admin\MediaAssetManagementController;
use App\Http\Controllers\Api\Admin\PayoutController;
use App\Http\Controllers\Api\Admin\ProductMasterManagementController;
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
        // Administration Command Center & Health
        Route::get('/admin/administration/command-center', [AdminAdministrationController::class, 'commandCenter']);
        Route::get('/admin/administration/health', [AdminAdministrationController::class, 'health']);

        // Users, Accounts & Identity Management
        Route::get('/admin/administration/users', [AdminIdentityController::class, 'index']);
        Route::get('/admin/administration/users/scorecard', [AdminIdentityController::class, 'scorecard']);
        Route::get('/admin/administration/users/export', [AdminIdentityController::class, 'export']);
        Route::post('/admin/administration/users', [AdminIdentityController::class, 'store']);
        Route::get('/admin/administration/users/{id}', [AdminIdentityController::class, 'show'])->whereNumber('id');
        Route::put('/admin/administration/users/{id}', [AdminIdentityController::class, 'update'])->whereNumber('id');
        Route::patch('/admin/administration/users/{id}/status', [AdminIdentityController::class, 'updateStatus'])->whereNumber('id');
        Route::post('/admin/administration/users/{id}/reset-password', [AdminIdentityController::class, 'resetPassword'])->whereNumber('id');

        // AD04-AD14 Administration Sub-module Endpoints
        Route::get('/admin/administration/roles-permissions', [AdminRolesPermissionsController::class, 'index']);
        Route::get('/admin/administration/tenant-organization', [AdminTenantOrgController::class, 'index']);
        Route::get('/admin/administration/business-units-channels', [AdminBuChannelsController::class, 'index']);
        Route::get('/admin/administration/system-configuration', [AdminSystemConfigController::class, 'index']);
        Route::get('/admin/administration/localization-regional', [AdminLocalizationController::class, 'index']);
        Route::get('/admin/administration/communications', [AdminCommunicationsController::class, 'index']);
        Route::get('/admin/administration/security-authentication', [AdminSecurityController::class, 'index']);
        Route::get('/admin/administration/workflows', [AdminWorkflowsController::class, 'index']);
        Route::get('/admin/administration/data-governance', [AdminDataGovernanceController::class, 'index']);
        Route::get('/admin/administration/maintenance-diagnostics', [AdminMaintenanceController::class, 'index']);
        Route::get('/admin/administration/reports-audit', [AdminReportsAuditController::class, 'index']);


        Route::get('/admin/dashboard', [AdminController::class, 'dashboard']);
        Route::get('/admin/dashboard/overview', AdminDashboardController::class);
        Route::get('/admin/marketplace/dashboard', [MarketplaceDashboardController::class, 'show']);
        Route::get('/admin/catalogue/command-center', [CatalogueCommandCenterController::class, 'show']);
        Route::get('/admin/catalogue/import-export', [CatalogueDataOperationsController::class, 'index']);
        Route::get('/admin/catalogue/import-export/report', [CatalogueDataOperationsController::class, 'report']);
        Route::post('/admin/catalogue/import-export/imports', [CatalogueDataOperationsController::class, 'import']);
        Route::post('/admin/catalogue/import-export/exports', [CatalogueDataOperationsController::class, 'export']);
        Route::post('/admin/catalogue/import-export/bulk', [CatalogueDataOperationsController::class, 'bulk']);
        Route::post('/admin/catalogue/import-export/schedules', [CatalogueDataOperationsController::class, 'schedule']);
        Route::get('/admin/catalogue/import-export/jobs/{job}', [CatalogueDataOperationsController::class, 'show']);
        Route::post('/admin/catalogue/import-export/jobs/{job}/retry', [CatalogueDataOperationsController::class, 'retry']);
        Route::post('/admin/catalogue/import-export/jobs/{job}/cancel', [CatalogueDataOperationsController::class, 'cancel']);
        Route::get('/admin/catalogue/import-export/jobs/{job}/download', [CatalogueDataOperationsController::class, 'download']);

        Route::get('/admin/catalogue/quality', [CatalogueQualityController::class, 'index']);
        Route::get('/admin/catalogue/quality/report', [CatalogueQualityController::class, 'report']);
        Route::post('/admin/catalogue/quality/validate', [CatalogueQualityController::class, 'validateCatalogue']);
        Route::get('/admin/catalogue/quality/validation-runs/{run}', [CatalogueQualityController::class, 'validationRun']);
        Route::post('/admin/catalogue/quality/cases', [CatalogueQualityController::class, 'storeCase']);
        Route::post('/admin/catalogue/quality/bulk', [CatalogueQualityController::class, 'bulk']);
        Route::post('/admin/catalogue/quality/saved-views', [CatalogueQualityController::class, 'saveView']);
        Route::get('/admin/catalogue/quality/issues/{issue}', [CatalogueQualityController::class, 'show']);
        Route::patch('/admin/catalogue/quality/issues/{issue}', [CatalogueQualityController::class, 'updateIssue']);
        Route::post('/admin/catalogue/quality/issues/{issue}/notes', [CatalogueQualityController::class, 'note']);
        Route::post('/admin/catalogue/quality/duplicates/{candidate}/resolve', [CatalogueQualityController::class, 'resolveDuplicate']);
        Route::get('/admin/catalogue/attributes', [AttributeManagementController::class, 'index']);
        Route::get('/admin/catalogue/attributes/export', [AttributeManagementController::class, 'export']);
        Route::post('/admin/catalogue/attributes/import', [AttributeManagementController::class, 'import']);
        Route::post('/admin/catalogue/attributes/bulk', [AttributeManagementController::class, 'bulk']);
        Route::post('/admin/catalogue/attributes', [AttributeManagementController::class, 'store']);
        Route::get('/admin/catalogue/attributes/{attribute}', [AttributeManagementController::class, 'show'])->whereNumber('attribute');
        Route::patch('/admin/catalogue/attributes/{attribute}', [AttributeManagementController::class, 'update'])->whereNumber('attribute');
        Route::put('/admin/catalogue/attributes/{attribute}/values', [AttributeManagementController::class, 'values'])->whereNumber('attribute');
        Route::post('/admin/catalogue/attributes/{attribute}/merge', [AttributeManagementController::class, 'merge'])->whereNumber('attribute');
        Route::get('/admin/catalogue/media', [MediaAssetManagementController::class, 'index']);
        Route::get('/admin/catalogue/media/export', [MediaAssetManagementController::class, 'export']);
        Route::post('/admin/catalogue/media/import', [MediaAssetManagementController::class, 'import']);
        Route::post('/admin/catalogue/media/bulk', [MediaAssetManagementController::class, 'bulk']);
        Route::post('/admin/catalogue/media', [MediaAssetManagementController::class, 'store']);
        Route::get('/admin/catalogue/media/{media}', [MediaAssetManagementController::class, 'show'])->whereNumber('media');
        Route::patch('/admin/catalogue/media/{media}', [MediaAssetManagementController::class, 'update'])->whereNumber('media');
        Route::delete('/admin/catalogue/attributes/{attribute}', [AttributeManagementController::class, 'archive'])->whereNumber('attribute');
        Route::get('/admin/catalogue/categories', [CategoryManagementController::class, 'index']);
        Route::get('/admin/catalogue/brands', [BrandManagementController::class, 'index']);
        Route::get('/admin/catalogue/brands/export', [BrandManagementController::class, 'export']);
        Route::post('/admin/catalogue/brands/import', [BrandManagementController::class, 'import']);
        Route::get('/admin/catalogue/categories/export', [CategoryManagementController::class, 'export']);
        Route::post('/admin/catalogue/categories', [CategoryManagementController::class, 'store']);
        Route::get('/admin/catalogue/categories/{category}', [CategoryManagementController::class, 'show'])->whereNumber('category');
        Route::patch('/admin/catalogue/categories/{category}', [CategoryManagementController::class, 'update'])->whereNumber('category');
        Route::post('/admin/catalogue/categories/{category}/move', [CategoryManagementController::class, 'move'])->whereNumber('category');
        Route::post('/admin/catalogue/categories/{category}/merge', [CategoryManagementController::class, 'merge'])->whereNumber('category');
        Route::post('/admin/catalogue/categories/mapping-import', [CategoryManagementController::class, 'import']);
        Route::get('/admin/catalogue/product-masters', [ProductMasterManagementController::class, 'index']);
        Route::get('/admin/catalogue/inventory', [InventoryOperationsController::class, 'index']);
        Route::get('/admin/catalogue/inventory/export', [InventoryOperationsController::class, 'export']);
        Route::get('/admin/catalogue/product-masters/export', [ProductMasterManagementController::class, 'export']);
        Route::post('/admin/catalogue/product-masters/bulk', [ProductMasterManagementController::class, 'bulk']);
        Route::get('/admin/catalogue/product-masters/saved-views', [ProductMasterManagementController::class, 'savedViews']);
        Route::post('/admin/catalogue/product-masters/saved-views', [ProductMasterManagementController::class, 'saveView']);
        Route::get('/admin/catalogue/command-center/export', [CatalogueCommandCenterController::class, 'export']);
        Route::post('/admin/catalogue/import', [CatalogueCommandCenterController::class, 'import']);
        Route::get('/admin/catalogue/command-center/trends', [CatalogueCommandCenterController::class, 'trends']);
        Route::get('/admin/catalogue/command-center/composition', [CatalogueCommandCenterController::class, 'composition']);
        Route::get('/admin/catalogue/approvals/priority', [CatalogueCommandCenterController::class, 'approvals']);
        Route::get('/admin/marketplace/dashboard/export', [MarketplaceDashboardController::class, 'export']);
        Route::get('/admin/marketplace/workspaces/{workspace}', [MarketplaceWorkspaceController::class, 'index']);
        Route::get('/admin/marketplace/workspaces/{workspace}/export', [MarketplaceWorkspaceController::class, 'export']);
        Route::get('/admin/marketplace/workspaces/orders/{order}', [MarketplaceWorkspaceController::class, 'order'])->whereNumber('order');
        Route::patch('/admin/marketplace/orders/{order}/status', [MarketplaceWorkspaceController::class, 'transition'])->whereNumber('order');
        Route::post('/admin/marketplace/orders/{order}/notes', [MarketplaceWorkspaceController::class, 'note'])->whereNumber('order');
        Route::get('/admin/marketplace/listings', [MarketplaceListingsController::class, 'index']);
        Route::get('/admin/marketplace/listings/export', [MarketplaceListingsController::class, 'export']);
        Route::get('/admin/marketplace/listings/{listing}', [MarketplaceListingsController::class, 'show'])->whereNumber('listing');
        Route::get('/admin/marketplace/sellers', [MarketplaceSellersController::class, 'index']);
        Route::get('/admin/marketplace/sellers/export', [MarketplaceSellersController::class, 'export']);
        Route::get('/admin/marketplace/sellers/{seller}', [MarketplaceSellersController::class, 'show'])->whereNumber('seller');
        Route::get('/admin/marketplace/promotions', [MarketplacePromotionsController::class, 'index']);
        Route::get('/admin/marketplace/promotions/{promotion}', [MarketplacePromotionsController::class, 'show'])->whereNumber('promotion');
        Route::get('/admin/marketplace/commissions', [MarketplaceCommissionsController::class, 'index']);
        Route::get('/admin/finance/invoices-notes', [FinanceDocumentsConfigurationController::class, 'documents']);
        Route::get('/admin/finance/invoices-notes/{id}', [FinanceDocumentsConfigurationController::class, 'document'])->where('id','[A-Za-z0-9\-]+');
        Route::get('/admin/finance/tax-currency-configuration', [FinanceDocumentsConfigurationController::class, 'configurations']);
        Route::get('/admin/finance/reconciliation-controls', [FinanceGovernanceController::class, 'reconciliation']);
        Route::get('/admin/finance/reports-import-export-audit', [FinanceGovernanceController::class, 'reports']);
        Route::get('/admin/finance/reports-import-export-audit/{uuid}', [FinanceGovernanceController::class, 'report'])->whereUuid('uuid');
        Route::get('/admin/marketplace/commissions/export', [MarketplaceCommissionsController::class, 'export']);
        Route::get('/admin/marketplace/commissions/{id}', [MarketplaceCommissionsController::class, 'show'])->where('id','[A-Za-z0-9\-]+');
        Route::get('/admin/finance/command-center', [FinanceCommandCenterController::class, 'dashboard']);
        Route::get('/admin/finance/supplier-payables/overview', [SupplierPayablesController::class, 'overview']);
        Route::get('/admin/finance/supplier-payables/export', [SupplierPayablesController::class, 'export']);
        Route::get('/admin/finance/supplier-payables', [SupplierPayablesController::class, 'index']);
        Route::get('/admin/finance/supplier-payables/{id}', [SupplierPayablesController::class, 'show'])->where('id', '[A-Za-z0-9\-]+');
        Route::post('/admin/finance/supplier-payables/{id}/approve', [SupplierPayablesController::class, 'approve'])->where('id', '[A-Za-z0-9\-]+');
        Route::post('/admin/finance/supplier-payables/{id}/schedule-payment', [SupplierPayablesController::class, 'schedule'])->where('id', '[A-Za-z0-9\-]+');
        Route::get('/admin/finance/command-center/export', [FinanceCommandCenterController::class, 'export']);
        Route::get('/admin/finance/operations', [FinanceCommandCenterController::class, 'operations']);
          Route::get('/admin/finance/operations/{recordKey}', [FinanceCommandCenterController::class, 'show'])->where('recordKey', '[a-z]+:[0-9]+');
          Route::get('/admin/finance/revenue-receivables', [FinanceRevenuePaymentsController::class, 'revenue']);
          Route::get('/admin/finance/revenue-receivables/export', [FinanceRevenuePaymentsController::class, 'exportRevenue']);
          Route::get('/admin/finance/payments', [FinanceRevenuePaymentsController::class, 'payments']);
          Route::get('/admin/finance/payments/export', [FinanceRevenuePaymentsController::class, 'exportPayments']);
          Route::get('/admin/finance/refunds-compensation/overview', [FinanceRefundsCompensationController::class, 'overview']);
          Route::get('/admin/finance/refunds-compensation/export', [FinanceRefundsCompensationController::class, 'export']);
          Route::get('/admin/finance/refunds-compensation', [FinanceRefundsCompensationController::class, 'index']);
          Route::get('/admin/finance/refunds-compensation/{refundId}', [FinanceRefundsCompensationController::class, 'show'])->where('refundId', '[A-Za-z0-9\-]+');
          Route::get('/admin/finance/refunds-compensation/{refundId}/audit', [FinanceRefundsCompensationController::class, 'audit'])->whereNumber('refundId');
          Route::post('/admin/finance/refunds-compensation/{refundId}/review', [FinanceRefundsCompensationController::class, 'review'])->whereNumber('refundId');
          Route::post('/admin/finance/refunds-compensation/{refundId}/approve', [FinanceRefundsCompensationController::class, 'approve'])->whereNumber('refundId');
          Route::post('/admin/finance/refunds-compensation/{refundId}/reject', [FinanceRefundsCompensationController::class, 'reject'])->whereNumber('refundId');
          Route::post('/admin/finance/refunds-compensation/{refundId}/process', [FinanceRefundsCompensationController::class, 'process'])->whereNumber('refundId');
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
        Route::post('/admin/returns', [ReturnCaseController::class, 'store']);
        Route::get('/admin/returns-dashboard', [ReturnCaseController::class, 'dashboard']);
        Route::get('/admin/returns/{returnCase}', [ReturnCaseController::class, 'show']);
        Route::patch('/admin/returns/{returnCase}/status', [ReturnCaseController::class, 'transition']);
        Route::post('/admin/returns/{returnCase}/inspections', [ReturnCaseController::class, 'inspect']);

        Route::get('/admin/ecosystem/dashboard', [EcosystemModuleController::class, 'dashboard']);
        Route::get('/admin/ecosystem/modules', [EcosystemModuleController::class, 'index']);
        Route::post('/admin/ecosystem/modules', [EcosystemModuleController::class, 'store']);
        Route::get('/admin/ecosystem/modules/{module}', [EcosystemModuleController::class, 'show'])->whereNumber('module');
        Route::patch('/admin/ecosystem/modules/{module}', [EcosystemModuleController::class, 'update'])->whereNumber('module');
        Route::delete('/admin/ecosystem/modules/{module}', [EcosystemModuleController::class, 'destroy'])->whereNumber('module');
        Route::put('/admin/ecosystem/modules/{module}/configuration', [EcosystemModuleController::class, 'configure'])->whereNumber('module');
        Route::patch('/admin/ecosystem/modules/{module}/enabled', [EcosystemModuleController::class, 'toggle'])->whereNumber('module');
        Route::get('/admin/ecosystem/modules/{module}/history', [EcosystemModuleController::class, 'audit'])->whereNumber('module');
        Route::get('/admin/ecosystem/assignment-references', [EcosystemAssignmentController::class, 'references']);
        Route::get('/admin/ecosystem/{kind}/dashboard', [EcosystemAssignmentController::class, 'dashboard'])->whereIn('kind', ['assignments', 'capabilities']);
        Route::get('/admin/ecosystem/{kind}', [EcosystemAssignmentController::class, 'index'])->whereIn('kind', ['assignments', 'capabilities']);
        Route::post('/admin/ecosystem/{kind}', [EcosystemAssignmentController::class, 'store'])->whereIn('kind', ['assignments', 'capabilities']);
        Route::patch('/admin/ecosystem/{kind}/{id}', [EcosystemAssignmentController::class, 'update'])->whereIn('kind', ['assignments', 'capabilities'])->whereNumber('id');
        Route::delete('/admin/ecosystem/{kind}/{id}', [EcosystemAssignmentController::class, 'destroy'])->whereIn('kind', ['assignments', 'capabilities'])->whereNumber('id');
        Route::get('/admin/ecosystem/{kind}/export', [EcosystemAssignmentController::class, 'export'])->whereIn('kind', ['assignments', 'capabilities']);
        Route::get('/admin/ecosystem/sector-packs/dashboard', [EcosystemSectorPackController::class, 'dashboard']);
        Route::get('/admin/ecosystem/sector-packs/export', [EcosystemSectorPackController::class, 'export']);
        Route::get('/admin/ecosystem/sector-packs', [EcosystemSectorPackController::class, 'index']);
        Route::post('/admin/ecosystem/sector-packs', [EcosystemSectorPackController::class, 'store']);
        Route::get('/admin/ecosystem/sector-packs/{slug}/export', [EcosystemSectorPackController::class, 'export']);
        Route::get('/admin/ecosystem/sector-packs/{slug}', [EcosystemSectorPackController::class, 'show']);
        Route::patch('/admin/ecosystem/sector-packs/{slug}', [EcosystemSectorPackController::class, 'update']);
        Route::post('/admin/ecosystem/sector-packs/{slug}/versions', [EcosystemSectorPackController::class, 'newVersion']);
        Route::post('/admin/ecosystem/sector-packs/{slug}/release', [EcosystemSectorPackController::class, 'release']);
        Route::get('/admin/ecosystem/dependencies/dashboard', [EcosystemDependencyController::class, 'dashboard']);
        Route::get('/admin/ecosystem/dependencies/references', [EcosystemDependencyController::class, 'references']);
        Route::get('/admin/ecosystem/dependencies/export', [EcosystemDependencyController::class, 'export']);
        Route::get('/admin/ecosystem/dependencies', [EcosystemDependencyController::class, 'index']);
        Route::post('/admin/ecosystem/dependencies', [EcosystemDependencyController::class, 'store']);
        Route::post('/admin/ecosystem/dependencies/{id}/validate', [EcosystemDependencyController::class, 'validateDependency'])->whereNumber('id');
        Route::delete('/admin/ecosystem/dependencies/{id}', [EcosystemDependencyController::class, 'destroy'])->whereNumber('id');
        Route::get('/admin/ecosystem/feature-flags/dashboard', [EcosystemFeatureFlagController::class, 'dashboard']);
        Route::get('/admin/ecosystem/feature-flags/references', [EcosystemFeatureFlagController::class, 'references']);
        Route::get('/admin/ecosystem/feature-flags/export', [EcosystemFeatureFlagController::class, 'export']);
        Route::get('/admin/ecosystem/feature-flags', [EcosystemFeatureFlagController::class, 'index']);
        Route::post('/admin/ecosystem/feature-flags', [EcosystemFeatureFlagController::class, 'store']);
        Route::patch('/admin/ecosystem/feature-flags/{id}', [EcosystemFeatureFlagController::class, 'update'])->whereNumber('id');
        Route::put('/admin/ecosystem/feature-flags/{id}/environment', [EcosystemFeatureFlagController::class, 'environment'])->whereNumber('id');
        Route::post('/admin/ecosystem/feature-flags/{id}/rollouts', [EcosystemFeatureFlagController::class, 'rollout'])->whereNumber('id');
        Route::post('/admin/ecosystem/feature-flags/{id}/rollouts/{rollout}/transition', [EcosystemFeatureFlagController::class, 'transition'])->whereNumber(['id','rollout']);
        Route::post('/admin/ecosystem/feature-flags/{id}/emergency-disable', [EcosystemFeatureFlagController::class, 'emergency'])->whereNumber('id');
        Route::get('/admin/ecosystem/integrations/dashboard', [EcosystemControlCenterController::class, 'integrationDashboard']);
        Route::get('/admin/ecosystem/integrations/references', [EcosystemControlCenterController::class, 'integrationReferences']);
        Route::get('/admin/ecosystem/integrations/export', [EcosystemControlCenterController::class, 'exportIntegrations']);
        Route::get('/admin/ecosystem/integrations', [EcosystemControlCenterController::class, 'integrations']);
        Route::post('/admin/ecosystem/integrations', [EcosystemControlCenterController::class, 'storeIntegration']);
        Route::patch('/admin/ecosystem/integrations/{id}', [EcosystemControlCenterController::class, 'updateIntegration'])->whereNumber('id');
        Route::get('/admin/ecosystem/governance/dashboard', [EcosystemControlCenterController::class, 'governanceDashboard']);
        Route::get('/admin/ecosystem/governance/export', [EcosystemControlCenterController::class, 'exportGovernance']);
        Route::post('/admin/ecosystem/governance/policies', [EcosystemControlCenterController::class, 'storePolicy']);
        Route::post('/admin/ecosystem/governance/access-requests', [EcosystemControlCenterController::class, 'storeAccessRequest']);
        Route::post('/admin/ecosystem/governance/access-requests/{id}/{decision}', [EcosystemControlCenterController::class, 'decideAccessRequest'])->whereNumber('id')->whereIn('decision', ['approve', 'reject']);
        Route::get('/admin/ecosystem/audit/dashboard', [EcosystemControlCenterController::class, 'auditDashboard']);
        Route::get('/admin/ecosystem/audit/export', [EcosystemControlCenterController::class, 'exportAudit']);
        Route::post('/admin/ecosystem/audit/reports', [EcosystemControlCenterController::class, 'generateReport']);
        Route::post('/admin/ecosystem/audit/exports', [EcosystemControlCenterController::class, 'createExport']);
        Route::post('/admin/ecosystem/audit/schedules', [EcosystemControlCenterController::class, 'scheduleReport']);
        Route::post('/admin/ecosystem/audit/evidence', [EcosystemControlCenterController::class, 'createEvidence']);
        Route::get('/admin/ecosystem/releases/dashboard', [EcosystemReleaseController::class, 'dashboard']);
        Route::get('/admin/ecosystem/releases/references', [EcosystemReleaseController::class, 'references']);
        Route::get('/admin/ecosystem/releases/export', [EcosystemReleaseController::class, 'export']);
        Route::get('/admin/ecosystem/releases', [EcosystemReleaseController::class, 'index']);
        Route::post('/admin/ecosystem/releases', [EcosystemReleaseController::class, 'store']);
        Route::get('/admin/ecosystem/releases/{id}', [EcosystemReleaseController::class, 'show'])->whereNumber('id');
        Route::post('/admin/ecosystem/releases/{id}/{action}', [EcosystemReleaseController::class, 'transition'])->whereNumber('id')->whereIn('action', ['validate','approve','reject','schedule','deploy','promote','rollback']);
        Route::get('/admin/ecosystem/health-adoption/dashboard', [EcosystemHealthAdoptionController::class, 'dashboard']);
        Route::get('/admin/ecosystem/health-adoption/modules', [EcosystemHealthAdoptionController::class, 'modules']);
        Route::get('/admin/ecosystem/health-adoption/trends', [EcosystemHealthAdoptionController::class, 'trends']);
        Route::get('/admin/ecosystem/health-adoption/export', [EcosystemHealthAdoptionController::class, 'export']);

        Route::get('/admin/brand-authorizations', [BrandAuthorizationDecisionController::class, 'index']);
        Route::get('/admin/brand-authorizations/{authorization}', [BrandAuthorizationDecisionController::class, 'show'])->whereNumber('authorization');
        Route::post('/admin/brand-authorizations/{authorization}/decisions', [BrandAuthorizationDecisionController::class, 'decide'])->whereNumber('authorization');

        Route::get('/admin/logistics/dashboard', [LogisticsController::class, 'dashboard']);
        Route::get('/admin/logistics/reference-data', [LogisticsController::class, 'referenceData']);
        Route::get('/admin/logistics/shipments', [LogisticsController::class, 'index']);
        Route::post('/admin/logistics/shipments', [LogisticsController::class, 'store']);
        Route::get('/admin/logistics/shipments/{shipment}', [LogisticsController::class, 'show']);
        Route::put('/admin/logistics/shipments/{shipment}', [LogisticsController::class, 'update'])->whereNumber('shipment');
        Route::patch('/admin/logistics/shipments/{shipment}/status', [LogisticsController::class, 'updateStatus'])->whereNumber('shipment');
        Route::post('/admin/logistics/shipments/{shipment}/tracking-events', [LogisticsController::class, 'addTrackingEvent'])->whereNumber('shipment');
        Route::post('/admin/logistics/shipments/{shipment}/delivery-attempts', [LogisticsController::class, 'deliveryAttempt'])->whereNumber('shipment');
        Route::delete('/admin/logistics/shipments/{shipment}', [LogisticsController::class, 'destroy'])->whereNumber('shipment');
        Route::get('/admin/logistics/fulfilment-orders', [FulfilmentWarehouseController::class, 'fulfilments']);
        Route::get('/admin/logistics/fulfilment-orders/{order}', [FulfilmentWarehouseController::class, 'fulfilment'])->whereNumber('order');
        Route::patch('/admin/logistics/fulfilment-orders/{order}/status', [FulfilmentWarehouseController::class, 'transition'])->whereNumber('order');
        Route::get('/admin/logistics/warehouses', [FulfilmentWarehouseController::class, 'warehouses']);
        Route::post('/admin/logistics/warehouses', [FulfilmentWarehouseController::class, 'storeWarehouse']);
        Route::get('/admin/logistics/warehouses/{facility}', [FulfilmentWarehouseController::class, 'warehouse'])->whereNumber('facility');
        Route::put('/admin/logistics/warehouses/{facility}', [FulfilmentWarehouseController::class, 'updateWarehouse'])->whereNumber('facility');
        Route::get('/admin/logistics/inventory-allocations', [InventoryAllocationController::class, 'index']);
        Route::get('/admin/logistics/inventory-allocations/{allocation}', [InventoryAllocationController::class, 'show'])->whereNumber('allocation');
        Route::post('/admin/logistics/inventory-allocations/{allocation}/allocate', [InventoryAllocationController::class, 'allocate'])->whereNumber('allocation');
        Route::post('/admin/logistics/inventory-reservations/{reservation}/release', [InventoryAllocationController::class, 'release'])->whereNumber('reservation');
        Route::post('/admin/logistics/inventory-transfers', [InventoryAllocationController::class, 'transfer']);
        Route::get('/admin/logistics/carriers', [CarrierController::class, 'index']);
        Route::post('/admin/logistics/carriers', [CarrierController::class, 'store']);
        Route::get('/admin/logistics/carriers/{carrier}', [CarrierController::class, 'show']);
        Route::put('/admin/logistics/carriers/{carrier}', [CarrierController::class, 'update']);
        Route::patch('/admin/logistics/carriers/{carrier}/status', [CarrierController::class, 'status']);
        Route::get('/admin/logistics/delivery-configurations', [DeliveryConfigurationController::class, 'index']);
        Route::post('/admin/logistics/delivery-configurations', [DeliveryConfigurationController::class, 'store']);
        Route::get('/admin/logistics/delivery-configurations/{configuration}', [DeliveryConfigurationController::class, 'show']);
        Route::put('/admin/logistics/delivery-configurations/{configuration}', [DeliveryConfigurationController::class, 'update']);
        Route::patch('/admin/logistics/delivery-configurations/{configuration}/status', [DeliveryConfigurationController::class, 'status']);
        Route::get('/admin/logistics/exceptions', [LogisticsExceptionController::class, 'index']);
        Route::post('/admin/logistics/exceptions', [LogisticsExceptionController::class, 'store']);
        Route::patch('/admin/logistics/exceptions/{exception}/status', [LogisticsExceptionController::class, 'status']);
        Route::post('/admin/logistics/reconciliation-runs', [LogisticsExceptionController::class, 'reconcile']);
        Route::get('/admin/logistics/data-operations', [LogisticsReportController::class, 'index']);
        Route::post('/admin/logistics/data-operations', [LogisticsReportController::class, 'store']);
        Route::get('/admin/marketing/command-center', [MarketingController::class, 'dashboard']);
        Route::get('/admin/marketing/campaigns', [MarketingController::class, 'index']);
        Route::post('/admin/marketing/campaigns', [MarketingController::class, 'store']);
        Route::post('/admin/marketing/campaigns/bulk-action', [MarketingController::class, 'bulk']);
        Route::get('/admin/marketing/campaigns/{campaign}', [MarketingController::class, 'show']);
        Route::patch('/admin/marketing/campaigns/{campaign}', [MarketingController::class, 'update']);
        Route::post('/admin/marketing/campaigns/{campaign}/transition', [MarketingController::class, 'transition']);
        Route::get('/admin/marketing/{resource}', [MarketingOperationsController::class, 'index'])->whereIn('resource', ['audiences', 'journeys', 'content']);
        Route::post('/admin/marketing/{resource}', [MarketingOperationsController::class, 'store'])->whereIn('resource', ['audiences', 'journeys', 'content']);
        Route::get('/admin/marketing/{resource}/{id}', [MarketingOperationsController::class, 'show'])->whereIn('resource', ['audiences', 'journeys', 'content']);
        Route::patch('/admin/marketing/{resource}/{id}', [MarketingOperationsController::class, 'update'])->whereIn('resource', ['audiences', 'journeys', 'content']);
        Route::post('/admin/marketing/{resource}/{id}/transition', [MarketingOperationsController::class, 'transition'])->whereIn('resource', ['audiences', 'journeys', 'content']);
        foreach (['channels', 'web-app-campaigns', 'paid-media'] as $marketingResource) {
            Route::get("/admin/marketing/{$marketingResource}", [MarketingDeliveryController::class, 'index'])->defaults('resource', $marketingResource);
            Route::post("/admin/marketing/{$marketingResource}", [MarketingDeliveryController::class, 'store'])->defaults('resource', $marketingResource);
            Route::get("/admin/marketing/{$marketingResource}/{id}", [MarketingDeliveryController::class, 'show'])->defaults('resource', $marketingResource);
            Route::patch("/admin/marketing/{$marketingResource}/{id}", [MarketingDeliveryController::class, 'update'])->defaults('resource', $marketingResource);
            Route::post("/admin/marketing/{$marketingResource}/{id}/transition", [MarketingDeliveryController::class, 'transition'])->defaults('resource', $marketingResource);
        }
        foreach (['budgets', 'governance', 'reports-audit'] as $marketingResource) {
            Route::get("/admin/marketing/{$marketingResource}", [MarketingControlController::class, 'index'])->defaults('resource', $marketingResource);
            Route::post("/admin/marketing/{$marketingResource}", [MarketingControlController::class, 'store'])->defaults('resource', $marketingResource);
            Route::get("/admin/marketing/{$marketingResource}/{id}", [MarketingControlController::class, 'show'])->defaults('resource', $marketingResource);
            Route::patch("/admin/marketing/{$marketingResource}/{id}", [MarketingControlController::class, 'update'])->defaults('resource', $marketingResource);
            Route::post("/admin/marketing/{$marketingResource}/{id}/transition", [MarketingControlController::class, 'transition'])->defaults('resource', $marketingResource);
        }
        Route::get('/admin/marketing/attribution-analytics', [MarketingControlController::class, 'index'])->defaults('resource', 'attribution-analytics');

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
            Route::get('/brands/{brand}', [AdminBrandController::class, 'show'])->whereNumber('brand');
            Route::put('/brands/{brand}', [AdminBrandController::class, 'update'])->whereNumber('brand');
            Route::patch('/brands/{brand}/status', [AdminBrandController::class, 'updateStatus'])->whereNumber('brand');
            Route::delete('/brands/{brand}', [AdminBrandController::class, 'destroy'])->whereNumber('brand');
        });

        Route::prefix('admin/brands-suppliers')->group(function () {
            Route::get('/suppliers/dashboard', [AdminSupplierDashboardController::class, 'suppliersDashboard']);
            Route::get('/suppliers/{id}', [AdminSupplierDashboardController::class, 'supplierDetail']);
            Route::post('/suppliers', [AdminSupplierDashboardController::class, 'storeSupplier']);
            Route::put('/suppliers/{id}', [AdminSupplierDashboardController::class, 'updateSupplier']);
            Route::get('/contracts/dashboard', [AdminSupplierDashboardController::class, 'contractsDashboard']);
            Route::get('/catalogue-coverage/dashboard', [AdminSupplierDashboardController::class, 'catalogueCoverageDashboard']);
            Route::get('/performance/dashboard', [AdminSupplierDashboardController::class, 'performanceDashboard']);
            Route::get('/risk-compliance/dashboard', [AdminSupplierDashboardController::class, 'riskComplianceDashboard']);
            Route::get('/users-access/dashboard', [AdminSupplierDashboardController::class, 'usersAccessDashboard']);
            Route::get('/import-export-audit/dashboard', [AdminSupplierDashboardController::class, 'importExportAuditDashboard']);
        });

        Route::prefix('admin/verification-compliance')->group(function () {
            Route::get('/supplier-verification/dashboard', [AdminVerificationComplianceController::class, 'supplierVerificationDashboard']);
            Route::get('/documents/dashboard', [AdminVerificationComplianceController::class, 'documentsDashboard']);
            Route::get('/documents', [AdminVerificationComplianceController::class, 'documentsDashboard']);
            Route::get('/documents/export-audit', [AdminVerificationComplianceController::class, 'exportDocumentAudit']);
            Route::post('/documents/approve-batch', [AdminVerificationComplianceController::class, 'approveBatchDocuments']);
            Route::get('/documents/{id}', [AdminVerificationComplianceController::class, 'documentDetail']);
            Route::post('/documents/{id}/verify', [AdminVerificationComplianceController::class, 'verifyDocument']);
            Route::post('/documents/{id}/verify-with-conditions', [AdminVerificationComplianceController::class, 'verifyDocumentWithConditions']);
            Route::post('/documents/{id}/request-replacement', [AdminVerificationComplianceController::class, 'requestDocumentReplacement']);
            Route::post('/documents/{id}/request-evidence', [AdminVerificationComplianceController::class, 'requestDocumentEvidence']);
            Route::post('/documents/{id}/reject', [AdminVerificationComplianceController::class, 'rejectDocument']);
            Route::post('/documents/{id}/revalidate', [AdminVerificationComplianceController::class, 'revalidateDocument']);
            Route::get('/documents/{id}/audit', [AdminVerificationComplianceController::class, 'documentDetail']);
            Route::get('/product-safety/dashboard', [AdminVerificationComplianceController::class, 'productSafetyDashboard']);
            Route::get('/product-safety/export-report', [AdminVerificationComplianceController::class, 'exportProductSafetyReport']);
            Route::post('/product-safety/products/{id}/approve', [AdminVerificationComplianceController::class, 'approveProductSafety']);
            Route::post('/product-safety/products/{id}/block-publication', [AdminVerificationComplianceController::class, 'blockProductPublication']);
            Route::get('/authenticity/dashboard', [AdminVerificationComplianceController::class, 'authenticityDashboard']);
            Route::get('/recalls/dashboard', [AdminVerificationComplianceController::class, 'recallsDashboard']);
            Route::get('/governance/dashboard', [AdminVerificationComplianceController::class, 'governanceDashboard']);
            Route::get('/reports/dashboard', [AdminVerificationComplianceController::class, 'reportsDashboard']);
            Route::get('/reports/export', [AdminVerificationComplianceController::class, 'exportReports']);
            Route::post('/reports/schedules', [AdminVerificationComplianceController::class, 'createReportSchedule']);
        Route::post('/reports/custom-reports', [AdminVerificationComplianceController::class, 'createCustomReport']);
            Route::get('/import-export-audit/dashboard', [AdminVerificationComplianceController::class, 'importExportAuditDashboard']);
        });

        Route::prefix('admin/customers')->middleware('admin')->group(function () {
            Route::get('/dashboard', [AdminCustomerDashboardController::class, 'commandCenter']);
            Route::get('/directory', [AdminCustomerDirectoryController::class, 'directory']);
            Route::get('/segments', [AdminCustomerSegmentController::class, 'index']);
            Route::post('/segments', [AdminCustomerSegmentController::class, 'store']);
            Route::post('/segments/bulk-action', [AdminCustomerSegmentController::class, 'bulkAction']);
            Route::post('/segments/{id}/recalculate', [AdminCustomerSegmentController::class, 'recalculate']);
            Route::post('/segments/{id}/approve', [AdminCustomerSegmentController::class, 'approve']);
            Route::get('/verification/dashboard', [AdminCustomerVerificationController::class, 'dashboard']);
            Route::get('/verification', [AdminCustomerVerificationController::class, 'index']);
            Route::post('/verification/{id}/verify', [AdminCustomerVerificationController::class, 'verify']);
            Route::post('/verification/{id}/reject', [AdminCustomerVerificationController::class, 'reject']);
            Route::post('/verification/{id}/evidence', [AdminCustomerVerificationController::class, 'requestEvidence']);
            
            // Sub-module Dashboards
            Route::get('/addresses-contacts/dashboard', [AdminCustomerAddressController::class, 'dashboard']);
            Route::get('/orders/dashboard', [AdminCustomerDashboardController::class, 'ordersDashboard']);
            Route::get('/returns-refunds-disputes/dashboard', [AdminCustomerDashboardController::class, 'returnsDashboard']);
            Route::get('/loyalty/dashboard', [AdminCustomerDashboardController::class, 'loyaltyDashboard']);
            Route::get('/consent-privacy/dashboard', [AdminCustomerDashboardController::class, 'consentDashboard']);
            Route::get('/risk-restrictions/dashboard', [AdminCustomerDashboardController::class, 'riskDashboard']);
            Route::get('/support-communications/dashboard', [AdminCustomerDashboardController::class, 'supportDashboard']);
            Route::get('/import-export-audit/dashboard', [AdminCustomerDashboardController::class, 'importExportDashboard']);

            Route::get('/addresses-contacts', [AdminCustomerAddressController::class, 'index']);
            Route::get('/orders', [AdminCustomerDirectoryController::class, 'directory']);
            Route::get('/returns-refunds-disputes', [AdminCustomerDirectoryController::class, 'directory']);
            Route::get('/loyalty', [AdminCustomerDirectoryController::class, 'directory']);
            Route::get('/consent-privacy', [AdminCustomerDirectoryController::class, 'directory']);
            Route::get('/risk-restrictions', [AdminCustomerDirectoryController::class, 'directory']);
            Route::get('/support-communications', [AdminCustomerDirectoryController::class, 'directory']);
            Route::get('/import-export-audit', [AdminCustomerDirectoryController::class, 'directory']);
            Route::post('/', [AdminCustomerCreateController::class, 'store']);
            
            // CRUD
            Route::get('/{id}', [AdminCustomerDirectoryController::class, 'show']);
            Route::put('/{id}', [AdminCustomerDirectoryController::class, 'update']);
            Route::delete('/{id}', [AdminCustomerDirectoryController::class, 'destroy']);
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
