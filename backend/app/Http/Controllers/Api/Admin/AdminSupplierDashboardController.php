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
        $totalContracts = SupplierContract::count();
        $activeContracts = SupplierContract::where('status', 'active')->count();
        $pendingApproval = SupplierContract::where('status', 'pending_approval')->count();
        $expiringSoon = SupplierContract::where('end_date', '<=', now()->addDays(30))
            ->where('end_date', '>=', now())
            ->count();
        $expiredContracts = SupplierContract::where('end_date', '<', now())->count();

        $kpis = [
            ['index' => 1, 'title' => 'Total Contracts', 'value' => (string) $totalContracts, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'FileText', 'iconBgColor' => 'bg-blue-50', 'iconColor' => 'text-blue-600'],
            ['index' => 2, 'title' => 'Active Contracts', 'value' => (string) $activeContracts, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'ShieldCheck', 'iconBgColor' => 'bg-green-50', 'iconColor' => 'text-green-600'],
            ['index' => 3, 'title' => 'Pending Approval', 'value' => (string) $pendingApproval, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'Clock', 'iconBgColor' => 'bg-amber-50', 'iconColor' => 'text-amber-600'],
            ['index' => 4, 'title' => 'Expiring in 30 Days', 'value' => (string) $expiringSoon, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'AlertTriangle', 'iconBgColor' => 'bg-orange-50', 'iconColor' => 'text-orange-600'],
            ['index' => 5, 'title' => 'Expired Contracts', 'value' => (string) $expiredContracts, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'AlertCircle', 'iconBgColor' => 'bg-rose-50', 'iconColor' => 'text-rose-600'],
        ];

        $contracts = SupplierContract::with('supplier')
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        return response()->json([
            'kpis' => $kpis,
            'contracts' => $contracts,
            'lastSynced' => now()->format('d M Y, h:i A'),
        ]);
    }

    /**
     * BS10 - Supplier Product & Catalogue Coverage
     */
    public function catalogueCoverageDashboard(Request $request): JsonResponse
    {
        $totalProducts = Product::count();
        $activeProducts = Product::where('status', 'published')->orWhere('status', 'active')->count();
        $pendingProducts = Product::where('status', 'pending')->count();
        $totalVariants = ProductVariant::count();

        $kpis = [
            ['index' => 1, 'title' => 'Total Products', 'value' => (string) $totalProducts, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'FileText'],
            ['index' => 2, 'title' => 'Active Products', 'value' => (string) $activeProducts, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'CheckCircle2'],
            ['index' => 3, 'title' => 'Pending Approval', 'value' => (string) $pendingProducts, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'Clock'],
            ['index' => 4, 'title' => 'Total SKUs / Variants', 'value' => (string) $totalVariants, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'Users'],
        ];

        return response()->json([
            'kpis' => $kpis,
            'lastSynced' => now()->format('d M Y, h:i A'),
        ]);
    }

    /**
     * BS11 - Performance & SLA
     */
    public function performanceDashboard(Request $request): JsonResponse
    {
        $suppliersCount = Supplier::count();
        $avgRating = Supplier::avg('rating') ?? 0;

        return response()->json([
            'suppliers_count' => $suppliersCount,
            'average_rating' => round($avgRating, 2),
            'lastSynced' => now()->format('d M Y, h:i A'),
        ]);
    }

    /**
     * BS12 - Supplier Risk & Compliance
     */
    public function riskComplianceDashboard(Request $request): JsonResponse
    {
        $highRisk = Supplier::where('risk_level', 'high')->count();
        $mediumRisk = Supplier::where('risk_level', 'medium')->count();
        $lowRisk = Supplier::where('risk_level', 'low')->count();

        return response()->json([
            'risk_summary' => [
                'high' => $highRisk,
                'medium' => $mediumRisk,
                'low' => $lowRisk,
            ],
            'lastSynced' => now()->format('d M Y, h:i A'),
        ]);
    }

    /**
     * BS13 - Supplier Users, Roles & Access
     */
    public function usersAccessDashboard(Request $request): JsonResponse
    {
        $totalUsers = User::count();
        $hasSupplierId = \Illuminate\Support\Facades\Schema::hasColumn('users', 'supplier_id');
        $supplierUsers = $hasSupplierId
            ? User::whereNotNull('supplier_id')->count()
            : Supplier::whereNotNull('user_id')->count();

        return response()->json([
            'total_users' => $totalUsers,
            'supplier_users' => $supplierUsers,
            'lastSynced' => now()->format('d M Y, h:i A'),
        ]);
    }

    /**
     * BS14 - Supplier Import, Export & Audit
     */
    public function importExportAuditDashboard(Request $request): JsonResponse
    {
        $jobs = AdminDataJob::where('domain', 'brands_suppliers')
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        return response()->json([
            'jobs' => $jobs,
            'lastSynced' => now()->format('d M Y, h:i A'),
        ]);
    }
}
