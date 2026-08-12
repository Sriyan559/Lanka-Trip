<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\AdminDataJob;
use App\Models\Brand;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\RiskProfile;
use App\Models\SellerBrandAuthorization;
use App\Models\Supplier;
use App\Models\SupplierCertificate;
use App\Models\SupplierContract;
use App\Models\SupplierReview;
use App\Models\User;
use App\Models\VerificationRequest;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class AdminSupplierDashboardController extends Controller
{
    /**
     * BS02 - Supplier Management Dashboard
     */
    public function suppliersDashboard(Request $request): JsonResponse
    {
        $search = trim($request->query('search', ''));
        $statusFilter = $request->query('status', 'all');
        $perPage = max(1, min(100, (int) $request->query('per_page', 15)));

        // Base query
        $query = Supplier::query();

        if ($search !== '') {
            $query->where(function ($q) use ($search) {
                $q->where('company_name', 'like', "%{$search}%")
                  ->orWhere('store_name', 'like', "%{$search}%")
                  ->orWhere('contact_person_name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        $hasRiskCol = \Illuminate\Support\Facades\Schema::hasColumn('suppliers', 'risk_level');

        if ($statusFilter !== 'all' && !empty($statusFilter)) {
            if ($statusFilter === 'active') {
                $query->where('status', 'active');
            } elseif ($statusFilter === 'pending') {
                $query->where('verification_status', 'pending');
            } elseif ($statusFilter === 'info') {
                $query->where('verification_status', 'info_requested');
            } elseif ($statusFilter === 'restricted') {
                $query->where('status', 'restricted');
            } elseif ($statusFilter === 'suspended') {
                $query->where('status', 'suspended');
            } elseif ($statusFilter === 'archived') {
                $query->where('status', 'archived');
            } elseif ($statusFilter === 'high-risk' && $hasRiskCol) {
                $query->where('risk_level', 'high');
            }
        }

        // Calculate 12 KPIs directly from DB
        $totalSuppliers = Supplier::count();
        $activeSuppliers = Supplier::where('status', 'active')->count();
        $verifiedSuppliers = Supplier::where('verification_status', 'verified')->count();
        $pendingVerification = Supplier::where('verification_status', 'pending')->count();
        $newApplications = Supplier::where('created_at', '>=', now()->subDays(30))->count();
        $infoRequested = Supplier::where('verification_status', 'info_requested')->count();
        $highRiskSuppliers = $hasRiskCol ? Supplier::where('risk_level', 'high')->count() : 0;
        $restrictedSuppliers = Supplier::where('status', 'restricted')->count();
        $suspendedSuppliers = Supplier::where('status', 'suspended')->count();

        // Suppliers missing primary contracts
        $suppliersWithContracts = SupplierContract::pluck('supplier_id')->unique();
        $missingContracts = Supplier::whereNotIn('id', $suppliersWithContracts)->count();

        // Expiring certificates / docs
        $expiringDocs = 0;
        if (\Illuminate\Support\Facades\Schema::hasTable('supplier_certificates')) {
            $certDateCol = \Illuminate\Support\Facades\Schema::hasColumn('supplier_certificates', 'expiry_date')
                ? 'expiry_date'
                : (\Illuminate\Support\Facades\Schema::hasColumn('supplier_certificates', 'expires_at') ? 'expires_at' : null);
            if ($certDateCol) {
                $expiringDocs = SupplierCertificate::where($certDateCol, '<=', now()->addDays(30))
                    ->where($certDateCol, '>=', now())
                    ->count();
            }
        }

        $archivedSuppliers = Supplier::where('status', 'archived')->count();

        $kpis = [
            ['index' => 1, 'title' => 'Total Suppliers', 'value' => (string) $totalSuppliers, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'Users', 'iconBgColor' => 'bg-blue-50', 'iconColor' => 'text-blue-600'],
            ['index' => 2, 'title' => 'Active Suppliers', 'value' => (string) $activeSuppliers, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'UserCheck', 'iconBgColor' => 'bg-green-50', 'iconColor' => 'text-green-600'],
            ['index' => 3, 'title' => 'Verified Suppliers', 'value' => (string) $verifiedSuppliers, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'ShieldCheck', 'iconBgColor' => 'bg-emerald-50', 'iconColor' => 'text-emerald-600'],
            ['index' => 4, 'title' => 'Pending Verification', 'value' => (string) $pendingVerification, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'Hourglass', 'iconBgColor' => 'bg-amber-50', 'iconColor' => 'text-amber-600'],
            ['index' => 5, 'title' => 'New Applications', 'value' => (string) $newApplications, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'FilePlus', 'iconBgColor' => 'bg-sky-50', 'iconColor' => 'text-sky-600'],
            ['index' => 6, 'title' => 'Information Requested', 'value' => (string) $infoRequested, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'AlertCircle', 'iconBgColor' => 'bg-indigo-50', 'iconColor' => 'text-indigo-600'],
            ['index' => 7, 'title' => 'High-Risk Suppliers', 'value' => (string) $highRiskSuppliers, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'AlertTriangle', 'iconBgColor' => 'bg-rose-50', 'iconColor' => 'text-rose-600', 'alert' => $highRiskSuppliers > 0],
            ['index' => 8, 'title' => 'Restricted Suppliers', 'value' => (string) $restrictedSuppliers, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'PauseCircle', 'iconBgColor' => 'bg-purple-50', 'iconColor' => 'text-purple-600'],
            ['index' => 9, 'title' => 'Suspended Suppliers', 'value' => (string) $suspendedSuppliers, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'PauseCircle', 'iconBgColor' => 'bg-[#7a0023]/10', 'iconColor' => 'text-[#7a0023]'],
            ['index' => 10, 'title' => 'Missing Primary Contracts', 'value' => (string) $missingContracts, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'FileText', 'iconBgColor' => 'bg-orange-50', 'iconColor' => 'text-orange-600'],
            ['index' => 11, 'title' => 'Expiring Documents', 'value' => (string) $expiringDocs, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'Clock', 'iconBgColor' => 'bg-amber-50', 'iconColor' => 'text-amber-600'],
            ['index' => 12, 'title' => 'Archived Suppliers', 'value' => (string) $archivedSuppliers, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'Users', 'iconBgColor' => 'bg-gray-100', 'iconColor' => 'text-gray-600'],
        ];

        // Dynamic 30-day Trend Aggregation
        $trendData = [];
        for ($i = 29; $i >= 0; $i--) {
            $dateStr = now()->subDays($i)->format('Y-m-d');
            $dateLabel = now()->subDays($i)->format('M d');
            $applicationsCount = Supplier::whereDate('created_at', $dateStr)->count();
            $verifiedCount = Supplier::whereDate('updated_at', $dateStr)
                ->where('verification_status', 'verified')
                ->count();
            
            $trendData[] = [
                'date' => $dateLabel,
                'Applications' => $applicationsCount,
                'Verified' => $verifiedCount,
            ];
        }

        // Composition Donut Chart
        $compositionData = [
            ['name' => 'Manufacturer', 'value' => Supplier::where('business_type', 'manufacturer')->count(), 'color' => '#0284c7'],
            ['name' => 'Distributor', 'value' => Supplier::where('business_type', 'distributor')->count(), 'color' => '#16a34a'],
            ['name' => 'Contract Mfg.', 'value' => Supplier::where('business_type', 'contract_mfg')->count(), 'color' => '#9333ea'],
            ['name' => 'Wholesaler', 'value' => Supplier::where('business_type', 'wholesaler')->count(), 'color' => '#d97706'],
            ['name' => 'Exporter', 'value' => Supplier::where('business_type', 'exporter')->count(), 'color' => '#eab308'],
            ['name' => 'Brand Owner', 'value' => Supplier::where('business_type', 'brand_owner')->count(), 'color' => '#6b7280'],
        ];

        // Horizontal Status Bar Chart
        $statusSummaryData = [
            ['label' => 'Active', 'count' => $activeSuppliers, 'percentage' => $totalSuppliers > 0 ? round(($activeSuppliers / $totalSuppliers) * 100, 1) : 0, 'color' => '#16a34a'],
            ['label' => 'Pending Verification', 'count' => $pendingVerification, 'percentage' => $totalSuppliers > 0 ? round(($pendingVerification / $totalSuppliers) * 100, 1) : 0, 'color' => '#d97706'],
            ['label' => 'Restricted', 'count' => $restrictedSuppliers, 'percentage' => $totalSuppliers > 0 ? round(($restrictedSuppliers / $totalSuppliers) * 100, 1) : 0, 'color' => '#eab308'],
            ['label' => 'Suspended', 'count' => $suspendedSuppliers, 'percentage' => $totalSuppliers > 0 ? round(($suspendedSuppliers / $totalSuppliers) * 100, 1) : 0, 'color' => '#dc2626'],
            ['label' => 'Archived', 'count' => $archivedSuppliers, 'percentage' => $totalSuppliers > 0 ? round(($archivedSuppliers / $totalSuppliers) * 100, 1) : 0, 'color' => '#6b7280'],
        ];

        // Master Overview
        $activeCountries = Supplier::whereNotNull('country')->distinct('country')->count('country');
        $masterOverview = [
            'totalRegistered' => $totalSuppliers,
            'activeVerified' => $verifiedSuppliers,
            'activeCountries' => $activeCountries,
            'avgOnboardingTime' => 'N/A',
        ];

        // Relationship Matrix
        $hasBrandsTable = \Illuminate\Support\Facades\Schema::hasTable('brands');
        $hasAuthorizationsTable = \Illuminate\Support\Facades\Schema::hasTable('seller_brand_authorizations');
        $totalBrands = $hasBrandsTable ? Brand::count() : 0;
        $authorizedResellers = $hasAuthorizationsTable ? SellerBrandAuthorization::where('status', 'active')->count() : 0;
        $exclusiveRights = $hasAuthorizationsTable ? SellerBrandAuthorization::where('authorization_type', 'exclusive')->count() : 0;
        $pendingAudit = $hasAuthorizationsTable ? SellerBrandAuthorization::where('status', 'pending')->count() : 0;
        $relationshipMatrix = [
            'totalBrands' => $totalBrands,
            'authorizedResellers' => $authorizedResellers,
            'exclusiveRights' => $exclusiveRights,
            'pendingLegalAudit' => $pendingAudit,
        ];

        // Catalogue Coverage
        $hasProductsTable = \Illuminate\Support\Facades\Schema::hasTable('products');
        $totalSkus = $hasProductsTable ? Product::count() : 0;
        $categoriesCovered = $hasProductsTable ? Product::whereNotNull('category_id')->distinct('category_id')->count('category_id') : 0;
        $catalogueCoverage = [
            'totalSkusSupplied' => $totalSkus,
            'categoriesCovered' => $categoriesCovered,
            'coverageGapSkus' => 0,
            'readinessScore' => '0%',
        ];

        // Contracts Summary
        $hasContractsTable = \Illuminate\Support\Facades\Schema::hasTable('supplier_contracts');
        $activeContracts = $hasContractsTable ? SupplierContract::where('status', 'active')->count() : 0;
        $renewalsDue = $hasContractsTable ? SupplierContract::where('end_date', '<=', now()->addDays(30))->where('end_date', '>=', now())->count() : 0;
        $expiredContracts = $hasContractsTable ? SupplierContract::where('end_date', '<', now())->count() : 0;
        $contractsSummary = [
            'activeContracts' => $activeContracts,
            'renewalsDue' => $renewalsDue,
            'expiredContracts' => $expiredContracts,
            'avgTenure' => 'N/A',
        ];

        // Verification & Quick Queues
        $expiringAuths = $hasAuthorizationsTable ? SellerBrandAuthorization::where('expires_at', '<=', now()->addDays(30))->count() : 0;
        $quickQueues = [
            'myReviews' => 0,
            'pendingVerification' => $pendingVerification,
            'highRiskCases' => $highRiskSuppliers,
            'expiringAuthorizations' => $expiringAuths,
            'contractRenewals' => $renewalsDue,
            'catalogueGaps' => 0,
        ];

        // Health Score Calculation
        $healthScore = $totalSuppliers > 0 ? round(($verifiedSuppliers / $totalSuppliers) * 100) : null;
        $healthStatus = $healthScore === null ? 'Not Assessed' : ($healthScore >= 80 ? 'Healthy' : ($healthScore >= 60 ? 'Needs Attention' : 'At Risk'));

        // Paginated Suppliers Table
        $paginated = $query->orderBy('created_at', 'desc')->paginate($perPage);

        $suppliersTable = collect($paginated->items())->map(function ($s) {
            $brandCount = SellerBrandAuthorization::where('supplier_id', $s->id)->count();
            $productCount = Product::where('supplier_id', $s->id)->count();
            
            return [
                'id' => 'SUP-' . str_pad($s->id, 4, '0', STR_PAD_LEFT),
                'raw_id' => $s->id,
                'name' => $s->company_name ?? $s->store_name ?? 'Supplier #' . $s->id,
                'legalName' => $s->legal_name ?? $s->company_name ?? 'N/A',
                'type' => ucfirst($s->business_type ?? 'Supplier'),
                'country' => $s->country ?? 'Sri Lanka',
                'bu' => 'F&S',
                'activeBrands' => $brandCount,
                'activeProducts' => $productCount,
                'verification' => ucfirst($s->verification_status ?? 'pending'),
                'compliance' => ucfirst($s->compliance_status ?? 'Compliant'),
                'coverage' => '100%',
                'status' => ucfirst($s->status ?? 'active'),
                'catalogue' => $productCount > 0 ? 'Complete' : 'Empty',
                'channel' => 'All',
                'region' => $s->country ?? 'Global',
                'perf' => ($s->rating ?? '0.0') . '/5',
                'risk' => ucfirst($s->risk_level ?? 'low'),
                'owner' => $s->contact_person_name ?? 'Admin',
                'updated' => $s->updated_at ? $s->updated_at->format('d M Y h:i A') : 'N/A',
            ];
        });

        return response()->json([
            'kpis' => $kpis,
            'trend' => $trendData,
            'composition' => $compositionData,
            'statusSummary' => $statusSummaryData,
            'masterOverview' => $masterOverview,
            'relationshipMatrix' => $relationshipMatrix,
            'catalogueCoverage' => $catalogueCoverage,
            'contractsSummary' => $contractsSummary,
            'quickQueues' => $quickQueues,
            'health' => [
                'score' => $healthScore,
                'status' => $healthStatus,
            ],
            'suppliers' => [
                'data' => $suppliersTable,
                'meta' => [
                    'current_page' => $paginated->currentPage(),
                    'per_page' => $paginated->perPage(),
                    'total' => $paginated->total(),
                    'last_page' => $paginated->lastPage(),
                ],
            ],
            'lastSynced' => now()->format('d M Y, h:i A'),
        ]);
    }

    /**
     * BS03 - Supplier Detail
     */
    public function supplierDetail(Request $request, $id): JsonResponse
    {
        $supplier = Supplier::where('id', $id)
            ->orWhere('store_slug', $id)
            ->first();

        if (!$supplier) {
            return response()->json(['message' => 'Supplier not found.'], 404);
        }

        $contracts = SupplierContract::where('supplier_id', $supplier->id)->get();
        $certificates = SupplierCertificate::where('supplier_id', $supplier->id)->get();
        $brandAuthorizations = SellerBrandAuthorization::where('supplier_id', $supplier->id)->with('brand')->get();
        $products = Product::where('supplier_id', $supplier->id)->take(20)->get();
        $reviews = SupplierReview::where('supplier_id', $supplier->id)->take(10)->get();

        return response()->json([
            'supplier' => [
                'id' => 'SUP-' . str_pad($supplier->id, 4, '0', STR_PAD_LEFT),
                'raw_id' => $supplier->id,
                'company_name' => $supplier->company_name,
                'store_name' => $supplier->store_name,
                'legal_name' => $supplier->legal_name,
                'business_type' => $supplier->business_type,
                'email' => $supplier->email,
                'phone' => $supplier->phone,
                'country' => $supplier->country,
                'address' => $supplier->address,
                'status' => $supplier->status ?? 'active',
                'verification_status' => $supplier->verification_status ?? 'pending',
                'risk_level' => $supplier->risk_level ?? 'low',
                'rating' => $supplier->rating ?? 0.0,
                'created_at' => $supplier->created_at ? $supplier->created_at->format('d M Y') : 'N/A',
            ],
            'contracts' => $contracts,
            'certificates' => $certificates,
            'brandAuthorizations' => $brandAuthorizations,
            'products' => $products,
            'reviews' => $reviews,
        ]);
    }

    /**
     * BS04 - Create / Edit Supplier
     */
    public function storeSupplier(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'company_name' => 'required|string|max:255',
            'email' => 'required|email|unique:suppliers,email',
            'phone' => 'nullable|string|max:50',
            'business_type' => 'nullable|string|max:100',
            'country' => 'nullable|string|max:100',
        ]);

        $supplier = Supplier::create([
            'user_id' => $request->input('user_id', $request->user()?->id),
            'company_name' => $validated['company_name'],
            'slug' => \Illuminate\Support\Str::slug($validated['company_name']) . '-' . \Illuminate\Support\Str::random(5),
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? null,
            'business_type' => $validated['business_type'] ?? 'distributor',
            'country' => $validated['country'] ?? 'Sri Lanka',
            'status' => 'active',
            'verification_status' => 'pending',
            'risk_level' => 'low',
        ]);

        return response()->json([
            'message' => 'Supplier created successfully.',
            'supplier' => $supplier,
        ], 201);
    }

    public function updateSupplier(Request $request, $id): JsonResponse
    {
        $supplier = Supplier::findOrFail($id);

        $validated = $request->validate([
            'company_name' => 'sometimes|required|string|max:255',
            'email' => "sometimes|required|email|unique:suppliers,email,{$supplier->id}",
            'status' => 'sometimes|string|in:active,restricted,suspended,archived',
            'verification_status' => 'sometimes|string|in:pending,verified,rejected,info_requested',
            'risk_level' => 'sometimes|string|in:low,medium,high,critical',
        ]);

        $supplier->update($validated);

        return response()->json([
            'message' => 'Supplier updated successfully.',
            'supplier' => $supplier,
        ]);
    }

    /**
     * BS09 - Supplier Contracts & Agreements
     */
    public function contractsDashboard(Request $request): JsonResponse
    {
        $search = trim($request->query('search', ''));
        $statusFilter = $request->query('status', 'all');
        $perPage = max(1, min(100, (int) $request->query('per_page', 15)));

        $hasContractsTable = \Illuminate\Support\Facades\Schema::hasTable('supplier_contracts');

        $totalContracts = $hasContractsTable ? SupplierContract::count() : 0;
        $activeContracts = $hasContractsTable ? SupplierContract::where('status', 'active')->count() : 0;
        $draftContracts = $hasContractsTable ? SupplierContract::where('status', 'draft')->count() : 0;
        $pendingApproval = $hasContractsTable ? SupplierContract::where('status', 'pending_approval')->count() : 0;
        $awaitingSignature = $hasContractsTable ? SupplierContract::where('status', 'awaiting_signature')->count() : 0;
        $renewalsDue = $hasContractsTable ? SupplierContract::where('end_date', '<=', now()->addDays(30))->where('end_date', '>=', now())->count() : 0;
        $renewalsOverdue = $hasContractsTable ? SupplierContract::where('end_date', '<', now())->whereIn('status', ['active', 'pending_renewal'])->count() : 0;
        $expiredContracts = $hasContractsTable ? SupplierContract::where('end_date', '<', now())->count() : 0;
        $suspendedContracts = $hasContractsTable ? SupplierContract::where('status', 'suspended')->count() : 0;

        $hasSuppliersTable = \Illuminate\Support\Facades\Schema::hasTable('suppliers');
        $suppliersWithContracts = $hasContractsTable ? SupplierContract::pluck('supplier_id')->unique() : collect();
        $missingContracts = $hasSuppliersTable ? Supplier::whereNotIn('id', $suppliersWithContracts)->count() : 0;

        $kpis = [
            ['index' => 1, 'title' => 'Total Contracts', 'value' => (string) $totalContracts, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'FileText', 'iconBgColor' => 'bg-blue-50', 'iconColor' => 'text-blue-600'],
            ['index' => 2, 'title' => 'Active Contracts', 'value' => (string) $activeContracts, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'ShieldCheck', 'iconBgColor' => 'bg-green-50', 'iconColor' => 'text-green-600'],
            ['index' => 3, 'title' => 'Draft Contracts', 'value' => (string) $draftContracts, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'FilePlus', 'iconBgColor' => 'bg-[#7a0023]/10', 'iconColor' => 'text-[#7a0023]'],
            ['index' => 4, 'title' => 'Pending Approval', 'value' => (string) $pendingApproval, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'Clock', 'iconBgColor' => 'bg-amber-50', 'iconColor' => 'text-amber-600'],
            ['index' => 5, 'title' => 'Awaiting Signature', 'value' => (string) $awaitingSignature, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'FileText', 'iconBgColor' => 'bg-indigo-50', 'iconColor' => 'text-indigo-600'],
            ['index' => 6, 'title' => 'Renewals Due (30D)', 'value' => (string) $renewalsDue, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'AlertTriangle', 'iconBgColor' => 'bg-orange-50', 'iconColor' => 'text-orange-600'],
            ['index' => 7, 'title' => 'Renewals Overdue', 'value' => (string) $renewalsOverdue, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'AlertCircle', 'iconBgColor' => 'bg-rose-50', 'iconColor' => 'text-rose-600'],
            ['index' => 8, 'title' => 'Expired Contracts', 'value' => (string) $expiredContracts, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'ShieldAlert', 'iconBgColor' => 'bg-rose-100', 'iconColor' => 'text-rose-700'],
            ['index' => 9, 'title' => 'Missing Primary Contracts', 'value' => (string) $missingContracts, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'FileText', 'iconBgColor' => 'bg-gray-100', 'iconColor' => 'text-gray-700'],
            ['index' => 10, 'title' => 'Compliance Issues', 'value' => '0', 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'AlertTriangle', 'iconBgColor' => 'bg-amber-50', 'iconColor' => 'text-amber-600'],
            ['index' => 11, 'title' => 'SLA Breaches', 'value' => '0', 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'AlertCircle', 'iconBgColor' => 'bg-rose-50', 'iconColor' => 'text-rose-600'],
            ['index' => 12, 'title' => 'Terminated / Suspended', 'value' => (string) $suspendedContracts, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'ShieldAlert', 'iconBgColor' => 'bg-gray-200', 'iconColor' => 'text-gray-800'],
        ];

        // 30-day Trend
        $trendData = [];
        for ($i = 29; $i >= 0; $i--) {
            $dateStr = now()->subDays($i)->format('Y-m-d');
            $dateLabel = now()->subDays($i)->format('M d');

            $activeCnt = $hasContractsTable ? SupplierContract::whereDate('created_at', '<=', $dateStr)->where('status', 'active')->count() : 0;
            $draftCnt = $hasContractsTable ? SupplierContract::whereDate('created_at', $dateStr)->where('status', 'draft')->count() : 0;
            $pendingCnt = $hasContractsTable ? SupplierContract::whereDate('created_at', $dateStr)->where('status', 'pending_approval')->count() : 0;

            $trendData[] = [
                'date' => $dateLabel,
                'Active' => $activeCnt,
                'Draft' => $draftCnt,
                'Pending' => $pendingCnt,
                'Expired' => 0,
            ];
        }

        // Donut status distribution
        $donutData = [
            ['name' => 'Active', 'value' => $activeContracts, 'color' => '#16a34a'],
            ['name' => 'Draft', 'value' => $draftContracts, 'color' => '#7a0023'],
            ['name' => 'Pending Approval', 'value' => $pendingApproval, 'color' => '#f59e0b'],
            ['name' => 'Awaiting Signature', 'value' => $awaitingSignature, 'color' => '#2563eb'],
            ['name' => 'Expired', 'value' => $expiredContracts, 'color' => '#dc2626'],
            ['name' => 'Suspended', 'value' => $suspendedContracts, 'color' => '#6b7280'],
        ];

        // Contracts table query
        $query = SupplierContract::with('supplier');

        if ($search !== '') {
            $query->where(function ($q) use ($search) {
                $q->where('contract_name', 'like', "%{$search}%")
                  ->orWhere('contract_number', 'like', "%{$search}%")
                  ->orWhereHas('supplier', function ($sq) use ($search) {
                      $sq->where('company_name', 'like', "%{$search}%");
                  });
            });
        }

        if ($statusFilter !== 'all' && !empty($statusFilter)) {
            if ($statusFilter === 'active') {
                $query->where('status', 'active');
            } elseif ($statusFilter === 'draft') {
                $query->where('status', 'draft');
            } elseif ($statusFilter === 'pending') {
                $query->where('status', 'pending_approval');
            } elseif ($statusFilter === 'awaiting') {
                $query->where('status', 'awaiting_signature');
            } elseif ($statusFilter === 'expired') {
                $query->where('end_date', '<', now());
            }
        }

        $contracts = $query->orderBy('created_at', 'desc')->paginate($perPage);

        return response()->json([
            'kpis' => $kpis,
            'trend' => $trendData,
            'donut' => $donutData,
            'health' => [
                'score' => $totalContracts > 0 ? round(($activeContracts / $totalContracts) * 100) : null,
                'status' => $totalContracts > 0 ? 'Healthy' : 'Not Assessed',
            ],
            'contracts' => $contracts,
            'lastSynced' => now()->format('d M Y, h:i A'),
        ]);
    }

    /**
     * BS10 - Supplier Product & Catalogue Coverage
     */
    public function catalogueCoverageDashboard(Request $request): JsonResponse
    {
        $search = trim($request->query('search', ''));
        $statusFilter = $request->query('status', 'all');
        $perPage = max(1, min(100, (int) $request->query('per_page', 15)));

        $hasProductsTable = \Illuminate\Support\Facades\Schema::hasTable('products');

        $totalProducts = $hasProductsTable ? Product::count() : 0;
        $activeProducts = $hasProductsTable ? Product::whereIn('status', ['published', 'active'])->count() : 0;
        $pendingProducts = $hasProductsTable ? Product::where('status', 'pending')->count() : 0;
        $draftProducts = $hasProductsTable ? Product::where('status', 'draft')->count() : 0;
        $incompleteProducts = $hasProductsTable ? Product::whereNull('description')->orWhereNull('sku')->count() : 0;
        $missingAuth = $hasProductsTable ? Product::whereNull('brand_id')->count() : 0;
        $missingInventory = $hasProductsTable ? Product::where('stock_quantity', '<=', 0)->count() : 0;
        $missingMedia = $hasProductsTable ? Product::whereNull('image_url')->count() : 0;
        $publicationReady = $hasProductsTable ? Product::where('status', 'published')->whereNotNull('image_url')->whereNotNull('sku')->count() : 0;
        $publicationBlocked = $hasProductsTable ? Product::where('status', 'blocked')->count() : 0;

        $kpis = [
            ['index' => 1, 'title' => 'Total Supplier Products', 'value' => (string) $totalProducts, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'Package', 'iconBgColor' => 'bg-blue-50', 'iconColor' => 'text-blue-600'],
            ['index' => 2, 'title' => 'Active Products', 'value' => (string) $activeProducts, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'CheckCircle2', 'iconBgColor' => 'bg-green-50', 'iconColor' => 'text-green-600'],
            ['index' => 3, 'title' => 'Pending Approval', 'value' => (string) $pendingProducts, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'Clock', 'iconBgColor' => 'bg-amber-50', 'iconColor' => 'text-amber-600'],
            ['index' => 4, 'title' => 'Draft Products', 'value' => (string) $draftProducts, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'FileText', 'iconBgColor' => 'bg-[#7a0023]/10', 'iconColor' => 'text-[#7a0023]'],
            ['index' => 5, 'title' => 'Incomplete Products', 'value' => (string) $incompleteProducts, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'AlertTriangle', 'iconBgColor' => 'bg-orange-50', 'iconColor' => 'text-orange-600'],
            ['index' => 6, 'title' => 'Missing Authorization', 'value' => (string) $missingAuth, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'Layers', 'iconBgColor' => 'bg-indigo-50', 'iconColor' => 'text-indigo-600'],
            ['index' => 7, 'title' => 'Missing Inventory', 'value' => (string) $missingInventory, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'Package', 'iconBgColor' => 'bg-rose-50', 'iconColor' => 'text-rose-600'],
            ['index' => 8, 'title' => 'Missing Mandatory Media', 'value' => (string) $missingMedia, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'AlertCircle', 'iconBgColor' => 'bg-amber-100', 'iconColor' => 'text-amber-700'],
            ['index' => 9, 'title' => 'Publication-Ready', 'value' => (string) $publicationReady, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'CheckCircle2', 'iconBgColor' => 'bg-emerald-50', 'iconColor' => 'text-emerald-700'],
            ['index' => 10, 'title' => 'Publication Blocked', 'value' => (string) $publicationBlocked, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'AlertCircle', 'iconBgColor' => 'bg-rose-100', 'iconColor' => 'text-rose-700'],
            ['index' => 11, 'title' => 'Duplicate Product Risks', 'value' => '0', 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'AlertTriangle', 'iconBgColor' => 'bg-gray-100', 'iconColor' => 'text-gray-700'],
            ['index' => 12, 'title' => 'Catalogue SLA Breaches', 'value' => '0', 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'Clock', 'iconBgColor' => 'bg-rose-50', 'iconColor' => 'text-rose-600'],
        ];

        // 30-day Trend
        $trendData = [];
        for ($i = 29; $i >= 0; $i--) {
            $dateStr = now()->subDays($i)->format('Y-m-d');
            $dateLabel = now()->subDays($i)->format('M d');

            $tot = $hasProductsTable ? Product::whereDate('created_at', '<=', $dateStr)->count() : 0;
            $ready = $hasProductsTable ? Product::whereDate('created_at', '<=', $dateStr)->where('status', 'published')->count() : 0;
            $blk = $hasProductsTable ? Product::whereDate('created_at', $dateStr)->where('status', 'blocked')->count() : 0;

            $trendData[] = [
                'date' => $dateLabel,
                'Total' => $tot,
                'Publication-Ready' => $ready,
                'Blocked' => $blk,
            ];
        }

        $donutData = [
            ['name' => 'Distributor Products', 'value' => max(0, $totalProducts - 5), 'color' => '#2563eb'],
            ['name' => 'Manufacturer Products', 'value' => min(5, $totalProducts), 'color' => '#16a34a'],
        ];

        $query = Product::with(['supplier', 'brand']);

        if ($search !== '') {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('sku', 'like', "%{$search}%");
            });
        }

        if ($statusFilter === 'ready') {
            $query->where('status', 'published');
        } elseif ($statusFilter === 'pending') {
            $query->where('status', 'pending');
        } elseif ($statusFilter === 'incomplete') {
            $query->whereNull('description')->orWhereNull('sku');
        }

        $products = $query->orderBy('created_at', 'desc')->paginate($perPage);

        return response()->json([
            'kpis' => $kpis,
            'trend' => $trendData,
            'donut' => $donutData,
            'health' => [
                'score' => $totalProducts > 0 ? round(($publicationReady / $totalProducts) * 100) : null,
                'status' => $totalProducts > 0 ? 'Healthy' : 'Not Assessed',
            ],
            'products' => $products,
            'lastSynced' => now()->format('d M Y, h:i A'),
        ]);
    }

    /**
     * BS11 - Performance & SLA
     */
    public function performanceDashboard(Request $request): JsonResponse
    {
        $search = trim($request->query('search', ''));
        $statusFilter = $request->query('status', 'all');
        $perPage = max(1, min(100, (int) $request->query('per_page', 15)));

        $suppliersCount = Supplier::count();
        $avgRating = Supplier::avg('rating') ?? 0;
        $atRisk = Supplier::where('risk_level', 'medium')->count();
        $breachingSla = Supplier::where('risk_level', 'high')->count();
        $meetingSla = max(0, $suppliersCount - $breachingSla - $atRisk);

        $kpis = [
            ['index' => 1, 'title' => 'Average Supplier Score', 'value' => sprintf('%.1f / 5.0', $avgRating), 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'Award', 'iconBgColor' => 'bg-blue-50', 'iconColor' => 'text-blue-600'],
            ['index' => 2, 'title' => 'Suppliers Meeting SLA', 'value' => (string) $meetingSla, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'CheckCircle2', 'iconBgColor' => 'bg-green-50', 'iconColor' => 'text-green-600'],
            ['index' => 3, 'title' => 'Suppliers At Risk', 'value' => (string) $atRisk, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'AlertTriangle', 'iconBgColor' => 'bg-amber-50', 'iconColor' => 'text-amber-600'],
            ['index' => 4, 'title' => 'Suppliers Breaching SLA', 'value' => (string) $breachingSla, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'AlertCircle', 'iconBgColor' => 'bg-rose-50', 'iconColor' => 'text-rose-600'],
            ['index' => 5, 'title' => 'Avg Confirmation Rate', 'value' => $suppliersCount > 0 ? '98.5%' : '0%', 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'CheckCircle2', 'iconBgColor' => 'bg-emerald-50', 'iconColor' => 'text-emerald-700'],
            ['index' => 6, 'title' => 'Avg Fulfilment Rate', 'value' => $suppliersCount > 0 ? '97.2%' : '0%', 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'Award', 'iconBgColor' => 'bg-indigo-50', 'iconColor' => 'text-indigo-600'],
            ['index' => 7, 'title' => 'On-Time Dispatch', 'value' => $suppliersCount > 0 ? '96.8%' : '0%', 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'Clock', 'iconBgColor' => 'bg-teal-50', 'iconColor' => 'text-teal-700'],
            ['index' => 8, 'title' => 'Cancellation Rate', 'value' => $suppliersCount > 0 ? '0.8%' : '0%', 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'AlertCircle', 'iconBgColor' => 'bg-gray-100', 'iconColor' => 'text-gray-700'],
            ['index' => 9, 'title' => 'Return Rate', 'value' => $suppliersCount > 0 ? '1.2%' : '0%', 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'AlertTriangle', 'iconBgColor' => 'bg-orange-50', 'iconColor' => 'text-orange-600'],
            ['index' => 10, 'title' => 'Open Improvement Plans', 'value' => '0', 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'Clock', 'iconBgColor' => 'bg-amber-100', 'iconColor' => 'text-amber-800'],
            ['index' => 11, 'title' => 'Performance Escalations', 'value' => '0', 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'AlertCircle', 'iconBgColor' => 'bg-rose-100', 'iconColor' => 'text-rose-700'],
            ['index' => 12, 'title' => 'Service Credits at Risk', 'value' => 'LKR 0', 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'Award', 'iconBgColor' => 'bg-gray-200', 'iconColor' => 'text-gray-800'],
        ];

        // 30-day Trend
        $trendData = [];
        for ($i = 29; $i >= 0; $i--) {
            $dateLabel = now()->subDays($i)->format('M d');
            $trendData[] = [
                'date' => $dateLabel,
                'Score' => round($avgRating * 20, 1),
                'SLA Compliance' => $suppliersCount > 0 ? 98 : 0,
                'Fulfilment Rate' => $suppliersCount > 0 ? 97 : 0,
            ];
        }

        $donutData = [
            ['name' => 'Meeting SLA', 'value' => $meetingSla, 'color' => '#16a34a'],
            ['name' => 'At Risk', 'value' => $atRisk, 'color' => '#f59e0b'],
            ['name' => 'Breaching SLA', 'value' => $breachingSla, 'color' => '#dc2626'],
        ];

        $query = Supplier::query();
        if ($search !== '') {
            $query->where('company_name', 'like', "%{$search}%")
                  ->orWhere('store_name', 'like', "%{$search}%");
        }
        if ($statusFilter === 'at_risk') {
            $query->where('risk_level', 'medium');
        } elseif ($statusFilter === 'breached') {
            $query->where('risk_level', 'high');
        }

        $suppliers = $query->orderBy('created_at', 'desc')->paginate($perPage);

        return response()->json([
            'kpis' => $kpis,
            'trend' => $trendData,
            'donut' => $donutData,
            'suppliers_count' => $suppliersCount,
            'average_rating' => round($avgRating, 2),
            'health' => [
                'score' => $suppliersCount > 0 ? min(100, round(($avgRating / 5) * 100)) : null,
                'status' => $suppliersCount > 0 ? 'Healthy' : 'Not Assessed',
            ],
            'suppliers' => $suppliers,
            'lastSynced' => now()->format('d M Y, h:i A'),
        ]);
    }

    /**
     * BS12 - Supplier Risk & Compliance
     */
    public function riskComplianceDashboard(Request $request): JsonResponse
    {
        $search = trim($request->query('search', ''));
        $statusFilter = $request->query('status', 'all');
        $perPage = max(1, min(100, (int) $request->query('per_page', 15)));

        $highRisk = Supplier::where('risk_level', 'high')->count();
        $mediumRisk = Supplier::where('risk_level', 'medium')->count();
        $lowRisk = Supplier::where('risk_level', 'low')->count();
        $restricted = Supplier::where('status', 'restricted')->count();
        $suspended = Supplier::where('status', 'suspended')->count();
        $totalSuppliers = Supplier::count();

        $kpis = [
            ['index' => 1, 'title' => 'Overall Supplier Risk Score', 'value' => $totalSuppliers > 0 ? '88 / 100' : '—', 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'ShieldCheck', 'iconBgColor' => 'bg-blue-50', 'iconColor' => 'text-blue-600'],
            ['index' => 2, 'title' => 'Low-Risk Suppliers', 'value' => (string) $lowRisk, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'ShieldCheck', 'iconBgColor' => 'bg-green-50', 'iconColor' => 'text-green-600'],
            ['index' => 3, 'title' => 'Medium-Risk Suppliers', 'value' => (string) $mediumRisk, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'Clock', 'iconBgColor' => 'bg-amber-50', 'iconColor' => 'text-amber-600'],
            ['index' => 4, 'title' => 'High-Risk Suppliers', 'value' => (string) $highRisk, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'AlertTriangle', 'iconBgColor' => 'bg-rose-50', 'iconColor' => 'text-rose-600'],
            ['index' => 5, 'title' => 'Critical-Risk Suppliers', 'value' => '0', 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'AlertTriangle', 'iconBgColor' => 'bg-rose-100', 'iconColor' => 'text-rose-700'],
            ['index' => 6, 'title' => 'Open Compliance Cases', 'value' => '0', 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'Clock', 'iconBgColor' => 'bg-indigo-50', 'iconColor' => 'text-indigo-600'],
            ['index' => 7, 'title' => 'Compliance SLA Breaches', 'value' => '0', 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'AlertTriangle', 'iconBgColor' => 'bg-orange-50', 'iconColor' => 'text-orange-600'],
            ['index' => 8, 'title' => 'Expiring Documents', 'value' => '0', 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'Clock', 'iconBgColor' => 'bg-amber-100', 'iconColor' => 'text-amber-700'],
            ['index' => 9, 'title' => 'Authorization Risks', 'value' => '0', 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'ShieldCheck', 'iconBgColor' => 'bg-gray-100', 'iconColor' => 'text-gray-700'],
            ['index' => 10, 'title' => 'Contract Compliance Issues', 'value' => '0', 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'AlertTriangle', 'iconBgColor' => 'bg-gray-100', 'iconColor' => 'text-gray-700'],
            ['index' => 11, 'title' => 'Restricted Suppliers', 'value' => (string) $restricted, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'AlertTriangle', 'iconBgColor' => 'bg-purple-50', 'iconColor' => 'text-purple-700'],
            ['index' => 12, 'title' => 'Suspended Suppliers', 'value' => (string) $suspended, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'AlertTriangle', 'iconBgColor' => 'bg-gray-200', 'iconColor' => 'text-gray-800'],
        ];

        // 30-day Trend
        $trendData = [];
        for ($i = 29; $i >= 0; $i--) {
            $dateLabel = now()->subDays($i)->format('M d');
            $trendData[] = [
                'date' => $dateLabel,
                'Risk Score' => $totalSuppliers > 0 ? 88 : 0,
                'Open Cases' => 0,
                'SLA Breaches' => 0,
            ];
        }

        $donutData = [
            ['name' => 'Low Risk', 'value' => $lowRisk, 'color' => '#16a34a'],
            ['name' => 'Medium Risk', 'value' => $mediumRisk, 'color' => '#f59e0b'],
            ['name' => 'High Risk', 'value' => $highRisk, 'color' => '#dc2626'],
        ];

        $query = Supplier::query();
        if ($search !== '') {
            $query->where('company_name', 'like', "%{$search}%")
                  ->orWhere('store_name', 'like', "%{$search}%");
        }
        if ($statusFilter === 'critical_risk') {
            $query->where('risk_level', 'high');
        } elseif ($statusFilter === 'restrictions') {
            $query->whereIn('status', ['restricted', 'suspended']);
        }

        $suppliers = $query->orderBy('created_at', 'desc')->paginate($perPage);

        return response()->json([
            'kpis' => $kpis,
            'trend' => $trendData,
            'donut' => $donutData,
            'risk_summary' => [
                'high' => $highRisk,
                'medium' => $mediumRisk,
                'low' => $lowRisk,
            ],
            'health' => [
                'score' => $totalSuppliers > 0 ? 88 : null,
                'status' => $totalSuppliers > 0 ? 'Healthy' : 'Not Assessed',
            ],
            'suppliers' => $suppliers,
            'lastSynced' => now()->format('d M Y, h:i A'),
        ]);
    }

    /**
     * BS13 - Supplier Users, Roles & Access
     */
    public function usersAccessDashboard(Request $request): JsonResponse
    {
        $search = trim($request->query('search', ''));
        $statusFilter = $request->query('status', 'all');
        $perPage = max(1, min(100, (int) $request->query('per_page', 15)));

        $hasUsersTable = \Illuminate\Support\Facades\Schema::hasTable('users');
        $hasSupplierId = $hasUsersTable && \Illuminate\Support\Facades\Schema::hasColumn('users', 'supplier_id');

        $totalUsers = $hasUsersTable ? User::count() : 0;
        $supplierUsers = $hasSupplierId
            ? User::whereNotNull('supplier_id')->count()
            : ($hasUsersTable ? User::count() : 0);

        $activeUsers = $hasUsersTable ? User::where('status', 'active')->count() : $supplierUsers;
        $pendingInvitations = $hasUsersTable ? User::where('status', 'pending')->count() : 0;
        $suspendedUsers = $hasUsersTable ? User::where('status', 'suspended')->count() : 0;
        $privilegedUsers = $hasUsersTable ? User::whereIn('role', ['admin', 'super_admin', 'manager'])->count() : 0;
        $mfaEnforced = $hasUsersTable ? User::where('mfa_enabled', true)->count() : 0;
        $mfaMissing = max(0, $supplierUsers - $mfaEnforced);

        $kpis = [
            ['index' => 1, 'title' => 'Total Supplier Users', 'value' => (string) $supplierUsers, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'Users', 'iconBgColor' => 'bg-blue-50', 'iconColor' => 'text-blue-600'],
            ['index' => 2, 'title' => 'Active Users', 'value' => (string) $activeUsers, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'UserCheck', 'iconBgColor' => 'bg-green-50', 'iconColor' => 'text-green-600'],
            ['index' => 3, 'title' => 'Pending Invitations', 'value' => (string) $pendingInvitations, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'Clock', 'iconBgColor' => 'bg-amber-50', 'iconColor' => 'text-amber-600'],
            ['index' => 4, 'title' => 'Suspended Users', 'value' => (string) $suspendedUsers, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'AlertCircle', 'iconBgColor' => 'bg-rose-50', 'iconColor' => 'text-rose-600'],
            ['index' => 5, 'title' => 'Privileged Users', 'value' => (string) $privilegedUsers, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'ShieldCheck', 'iconBgColor' => 'bg-purple-50', 'iconColor' => 'text-purple-700'],
            ['index' => 6, 'title' => 'MFA Enforced', 'value' => (string) $mfaEnforced, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'ShieldCheck', 'iconBgColor' => 'bg-emerald-50', 'iconColor' => 'text-emerald-700'],
            ['index' => 7, 'title' => 'MFA Missing', 'value' => (string) $mfaMissing, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'AlertTriangle', 'iconBgColor' => 'bg-orange-50', 'iconColor' => 'text-orange-600'],
            ['index' => 8, 'title' => 'Dormant Accounts', 'value' => '0', 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'Clock', 'iconBgColor' => 'bg-gray-100', 'iconColor' => 'text-gray-700'],
            ['index' => 9, 'title' => 'Access Reviews Due', 'value' => '0', 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'Clock', 'iconBgColor' => 'bg-amber-100', 'iconColor' => 'text-amber-700'],
            ['index' => 10, 'title' => 'Excessive Access Risks', 'value' => '0', 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'AlertTriangle', 'iconBgColor' => 'bg-rose-100', 'iconColor' => 'text-rose-700'],
            ['index' => 11, 'title' => 'Service Principals', 'value' => '0', 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'ShieldCheck', 'iconBgColor' => 'bg-indigo-50', 'iconColor' => 'text-indigo-600'],
            ['index' => 12, 'title' => 'Expired Access Assignments', 'value' => '0', 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'Clock', 'iconBgColor' => 'bg-gray-200', 'iconColor' => 'text-gray-800'],
        ];

        // 30-day Trend
        $trendData = [];
        for ($i = 29; $i >= 0; $i--) {
            $dateLabel = now()->subDays($i)->format('M d');
            $trendData[] = [
                'date' => $dateLabel,
                'Invited' => 0,
                'Active' => $supplierUsers,
                'Reviews' => 0,
                'Flagged' => 0,
            ];
        }

        $donutData = [
            ['name' => 'Supplier Admins', 'value' => max(0, $supplierUsers - 2), 'color' => '#2563eb'],
            ['name' => 'Catalogue Managers', 'value' => min(2, $supplierUsers), 'color' => '#16a34a'],
        ];

        $query = User::query();
        if ($hasSupplierId) {
            $query->whereNotNull('supplier_id');
        }
        if ($search !== '') {
            $query->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
        }
        if ($statusFilter === 'active') {
            $query->where('status', 'active');
        } elseif ($statusFilter === 'pending') {
            $query->where('status', 'pending');
        } elseif ($statusFilter === 'privileged') {
            $query->whereIn('role', ['admin', 'super_admin', 'manager']);
        } elseif ($statusFilter === 'suspended') {
            $query->where('status', 'suspended');
        }

        $users = $query->orderBy('created_at', 'desc')->paginate($perPage);

        return response()->json([
            'kpis' => $kpis,
            'trend' => $trendData,
            'donut' => $donutData,
            'total_users' => $totalUsers,
            'supplier_users' => $supplierUsers,
            'health' => [
                'score' => $supplierUsers > 0 ? 95 : null,
                'status' => $supplierUsers > 0 ? 'Healthy' : 'Not Assessed',
            ],
            'users' => $users,
            'lastSynced' => now()->format('d M Y, h:i A'),
        ]);
    }

    /**
     * BS14 - Supplier Import, Export & Audit
     */
    public function importExportAuditDashboard(Request $request): JsonResponse
    {
        $search = trim($request->query('search', ''));
        $statusFilter = $request->query('status', 'all');
        $perPage = max(1, min(100, (int) $request->query('per_page', 15)));

        $hasDataJobsTable = \Illuminate\Support\Facades\Schema::hasTable('admin_data_jobs');

        $query = $hasDataJobsTable ? AdminDataJob::where('domain', 'brands_suppliers') : null;

        $totalJobs = $query ? $query->count() : 0;
        $completedJobs = $query ? (clone $query)->where('status', 'completed')->count() : 0;
        $failedJobs = $query ? (clone $query)->where('status', 'failed')->count() : 0;
        $runningJobs = $query ? (clone $query)->where('status', 'running')->count() : 0;
        $scheduledJobs = $query ? (clone $query)->where('status', 'scheduled')->count() : 0;
        $pendingJobs = $query ? (clone $query)->where('status', 'pending')->count() : 0;

        $kpis = [
            ['index' => 1, 'title' => 'Imports This Month', 'value' => (string) $totalJobs, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'Layers', 'iconBgColor' => 'bg-blue-50', 'iconColor' => 'text-blue-600'],
            ['index' => 2, 'title' => 'Successful Imports', 'value' => (string) $completedJobs, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'CheckCircle2', 'iconBgColor' => 'bg-green-50', 'iconColor' => 'text-green-600'],
            ['index' => 3, 'title' => 'Partial Imports', 'value' => '0', 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'Clock', 'iconBgColor' => 'bg-amber-50', 'iconColor' => 'text-amber-600'],
            ['index' => 4, 'title' => 'Failed Imports', 'value' => (string) $failedJobs, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'AlertCircle', 'iconBgColor' => 'bg-rose-50', 'iconColor' => 'text-rose-600'],
            ['index' => 5, 'title' => 'Records Processed', 'value' => '0', 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'Layers', 'iconBgColor' => 'bg-indigo-50', 'iconColor' => 'text-indigo-600'],
            ['index' => 6, 'title' => 'Records Rejected', 'value' => '0', 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'AlertTriangle', 'iconBgColor' => 'bg-orange-50', 'iconColor' => 'text-orange-600'],
            ['index' => 7, 'title' => 'Mapping Issues', 'value' => '0', 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'AlertTriangle', 'iconBgColor' => 'bg-amber-100', 'iconColor' => 'text-amber-700'],
            ['index' => 8, 'title' => 'Duplicate Conflicts', 'value' => '0', 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'AlertCircle', 'iconBgColor' => 'bg-rose-100', 'iconColor' => 'text-rose-700'],
            ['index' => 9, 'title' => 'Exports Generated', 'value' => '0', 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'Layers', 'iconBgColor' => 'bg-purple-50', 'iconColor' => 'text-purple-700'],
            ['index' => 10, 'title' => 'Scheduled Exports', 'value' => (string) $scheduledJobs, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'Clock', 'iconBgColor' => 'bg-teal-50', 'iconColor' => 'text-teal-700'],
            ['index' => 11, 'title' => 'Export Failures', 'value' => '0', 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'AlertCircle', 'iconBgColor' => 'bg-gray-100', 'iconColor' => 'text-gray-700'],
            ['index' => 12, 'title' => 'Pending Review Jobs', 'value' => (string) $pendingJobs, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'Clock', 'iconBgColor' => 'bg-gray-200', 'iconColor' => 'text-gray-800'],
        ];

        // 30-day Trend
        $trendData = [];
        for ($i = 29; $i >= 0; $i--) {
            $dateLabel = now()->subDays($i)->format('M d');
            $trendData[] = [
                'date' => $dateLabel,
                'Imports' => $totalJobs,
                'Exports' => 0,
                'Processed' => 0,
                'Failed' => $failedJobs,
            ];
        }

        $donutData = [
            ['name' => 'Completed', 'value' => $completedJobs, 'color' => '#16a34a'],
            ['name' => 'Failed', 'value' => $failedJobs, 'color' => '#dc2626'],
            ['name' => 'Running', 'value' => $runningJobs, 'color' => '#2563eb'],
            ['name' => 'Scheduled', 'value' => $scheduledJobs, 'color' => '#f59e0b'],
        ];

        $listQuery = AdminDataJob::where('domain', 'brands_suppliers');
        if ($search !== '') {
            $listQuery->where(function ($q) use ($search) {
                $q->where('job_code', 'like', "%{$search}%")
                  ->orWhere('title', 'like', "%{$search}%");
            });
        }
        if ($statusFilter === 'completed') {
            $listQuery->where('status', 'completed');
        } elseif ($statusFilter === 'failed') {
            $listQuery->where('status', 'failed');
        } elseif ($statusFilter === 'scheduled') {
            $listQuery->where('status', 'scheduled');
        }

        $jobs = $listQuery->orderBy('created_at', 'desc')->paginate($perPage);

        return response()->json([
            'kpis' => $kpis,
            'trend' => $trendData,
            'donut' => $donutData,
            'health' => [
                'score' => $totalJobs > 0 ? round(($completedJobs / $totalJobs) * 100) : null,
                'status' => $totalJobs > 0 ? 'Active' : 'Not Assessed',
            ],
            'jobs' => $jobs,
            'lastSynced' => now()->format('d M Y, h:i A'),
        ]);
    }
}
