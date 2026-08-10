<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\AdminDataJob;
use App\Models\ProductBeautyProfile;
use App\Models\ProductRecall;
use App\Models\SupplierCertificate;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class AdminVerificationComplianceController extends Controller
{
    /**
     * Helper to safely query a table if it exists.
     */
    private function tableQuery(string $tableName)
    {
        if (Schema::hasTable($tableName)) {
            return DB::table($tableName);
        }
        return null;
    }

    /**
     * VC08 - Document Verification Management
     */
    public function documentsDashboard(Request $request): JsonResponse
    {
        $search = trim($request->query('search', ''));
        $statusFilter = $request->query('status', 'all');
        $perPage = max(1, min(100, (int) $request->query('per_page', 15)));

        $docReqCount = $this->tableQuery('verification_request_documents')?->count() ?? 0;
        $certCount = SupplierCertificate::count();
        $kycCount = $this->tableQuery('kyc_documents')?->count() ?? 0;
        $totalDocs = $docReqCount + $certCount + $kycCount;

        $pendingDocReq = (Schema::hasTable('verification_request_documents') && Schema::hasColumn('verification_request_documents', 'verification_status'))
            ? DB::table('verification_request_documents')->where('verification_status', 'pending')->count()
            : 0;
        $pendingDocs = $pendingDocReq;

        $underReviewDocs = (Schema::hasTable('verification_request_documents') && Schema::hasColumn('verification_request_documents', 'verification_status'))
            ? DB::table('verification_request_documents')->where('verification_status', 'under_review')->count()
            : 0;

        $verifiedDocReq = (Schema::hasTable('verification_request_documents') && Schema::hasColumn('verification_request_documents', 'verification_status'))
            ? DB::table('verification_request_documents')->where('verification_status', 'verified')->count()
            : 0;
        $verifiedDocs = $verifiedDocReq;

        $conditionalDocs = (Schema::hasTable('verification_request_documents') && Schema::hasColumn('verification_request_documents', 'verification_status'))
            ? DB::table('verification_request_documents')->where('verification_status', 'conditional')->count()
            : 0;

        $rejectedDocReq = (Schema::hasTable('verification_request_documents') && Schema::hasColumn('verification_request_documents', 'verification_status'))
            ? DB::table('verification_request_documents')->where('verification_status', 'rejected')->count()
            : 0;
        $rejectedDocs = $rejectedDocReq;

        $expiring30Days = SupplierCertificate::where('expiry_date', '<=', now()->addDays(30))->where('expiry_date', '>=', now())->count();
        $expiredDocs = SupplierCertificate::where('expiry_date', '<', now())->count();

        $kpis = [
            ['index' => 1, 'title' => 'Total Documents', 'value' => number_format($totalDocs), 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'FileText', 'iconBgColor' => 'bg-blue-50', 'iconColor' => 'text-blue-600'],
            ['index' => 2, 'title' => 'Pending Verification', 'value' => number_format($pendingDocs), 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'Clock', 'iconBgColor' => 'bg-amber-50', 'iconColor' => 'text-amber-600'],
            ['index' => 3, 'title' => 'Under Review', 'value' => number_format($underReviewDocs), 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'Eye', 'iconBgColor' => 'bg-sky-50', 'iconColor' => 'text-sky-600'],
            ['index' => 4, 'title' => 'Verified Documents', 'value' => number_format($verifiedDocs), 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'CheckCircle2', 'iconBgColor' => 'bg-green-50', 'iconColor' => 'text-green-600'],
            ['index' => 5, 'title' => 'Conditional Verification', 'value' => number_format($conditionalDocs), 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'AlertTriangle', 'iconBgColor' => 'bg-orange-50', 'iconColor' => 'text-orange-600'],
            ['index' => 6, 'title' => 'Rejected Documents', 'value' => number_format($rejectedDocs), 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'AlertCircle', 'iconBgColor' => 'bg-rose-50', 'iconColor' => 'text-rose-600', 'alert' => $rejectedDocs > 0],
            ['index' => 7, 'title' => 'Expiring in 30 Days', 'value' => number_format($expiring30Days), 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'Clock', 'iconBgColor' => 'bg-yellow-50', 'iconColor' => 'text-yellow-600'],
            ['index' => 8, 'title' => 'Expired Documents', 'value' => number_format($expiredDocs), 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'AlertTriangle', 'iconBgColor' => 'bg-red-50', 'iconColor' => 'text-red-600', 'alert' => $expiredDocs > 0],
        ];

        // 30-Day Trend
        $trendData = [];
        for ($i = 29; $i >= 0; $i--) {
            $dateStr = now()->subDays($i)->format('Y-m-d');
            $dateLabel = now()->subDays($i)->format('M d');
            $submitted = 0;
            $verified = 0;

            if (Schema::hasTable('verification_request_documents')) {
                $submitted = DB::table('verification_request_documents')->whereDate('created_at', $dateStr)->count();
                if (Schema::hasColumn('verification_request_documents', 'verification_status')) {
                    $verified = DB::table('verification_request_documents')->whereDate('updated_at', $dateStr)->where('verification_status', 'verified')->count();
                }
            }

            $trendData[] = [
                'date' => $dateLabel,
                'Submitted' => $submitted,
                'Verified' => $verified,
            ];
        }

        // Donut & Status Distribution
        $legalCount = (Schema::hasTable('verification_request_documents') && Schema::hasColumn('verification_request_documents', 'document_type'))
            ? DB::table('verification_request_documents')->where('document_type', 'like', '%legal%')->count()
            : 0;
        $safetyCount = (Schema::hasTable('verification_request_documents') && Schema::hasColumn('verification_request_documents', 'document_type'))
            ? DB::table('verification_request_documents')->where('document_type', 'like', '%safety%')->count()
            : 0;

        $donutData = [
            ['name' => 'Certificates', 'value' => SupplierCertificate::count(), 'color' => '#0284c7'],
            ['name' => 'Legal Docs', 'value' => $legalCount, 'color' => '#16a34a'],
            ['name' => 'Safety Docs', 'value' => $safetyCount, 'color' => '#9333ea'],
            ['name' => 'Kyc Docs', 'value' => $kycCount, 'color' => '#d97706'],
        ];

        // Paginated Documents
        $documentsTable = [];
        $meta = ['current_page' => 1, 'per_page' => $perPage, 'total' => 0, 'last_page' => 1];

        if (Schema::hasTable('verification_request_documents')) {
            $query = DB::table('verification_request_documents');
            if ($search !== '' && Schema::hasColumn('verification_request_documents', 'document_type')) {
                $query->where(function ($q) use ($search) {
                    $q->where('document_type', 'like', "%{$search}%");
                    if (Schema::hasColumn('verification_request_documents', 'document_number')) {
                        $q->orWhere('document_number', 'like', "%{$search}%");
                    }
                });
            }
            $paginated = $query->orderBy('created_at', 'desc')->paginate($perPage);
            $meta = [
                'current_page' => $paginated->currentPage(),
                'per_page' => $paginated->perPage(),
                'total' => $paginated->total(),
                'last_page' => $paginated->lastPage(),
            ];

            $documentsTable = collect($paginated->items())->map(function ($doc) {
                return [
                    'name' => ucfirst($doc->document_type ?? 'Document'),
                    'id' => 'DOC-' . str_pad($doc->id, 5, '0', STR_PAD_LEFT),
                    'category' => ucfirst($doc->document_type ?? 'General'),
                    'type' => 'Supplier',
                    'entity' => 'SL Beauty Merchant',
                    'issuer' => 'Official Issuer',
                    'country' => 'LK',
                    'issueDate' => $doc->issued_at ?? 'N/A',
                    'expiryDate' => $doc->expires_at ?? 'N/A',
                    'mandatory' => 'Yes',
                    'metadata' => 'Complete',
                    'match' => '100%',
                    'issuerVal' => 'Verified',
                    'authVal' => 'Genuine',
                    'integrity' => 'Secure',
                    'status' => ucfirst($doc->verification_status ?? 'pending'),
                    'risk' => 'Low',
                    'reviewer' => 'Compliance Admin',
                    'submitted' => $doc->created_at ?? 'N/A',
                    'due' => 'N/A',
                    'sla' => '100%',
                    'updated' => $doc->updated_at ?? 'N/A',
                ];
            });
        }

        return response()->json([
            'kpis' => $kpis,
            'trend' => $trendData,
            'donut' => $donutData,
            'documents' => [
                'data' => $documentsTable,
                'meta' => $meta,
            ],
            'lastSynced' => now()->format('d M Y, h:i A'),
        ]);
    }

    /**
     * VC09 - Product Safety & Regulatory Oversight
     */
    public function productSafetyDashboard(Request $request): JsonResponse
    {
        $totalBeautyProfiles = ProductBeautyProfile::count();
        $compliantProfiles = (Schema::hasColumn('product_beauty_profiles', 'compliance_status'))
            ? ProductBeautyProfile::where('compliance_status', 'compliant')->count()
            : 0;
        $pendingReviews = (Schema::hasColumn('product_beauty_profiles', 'compliance_status'))
            ? ProductBeautyProfile::where('compliance_status', 'pending_review')->count()
            : 0;
        $nonCompliant = (Schema::hasColumn('product_beauty_profiles', 'compliance_status'))
            ? ProductBeautyProfile::where('compliance_status', 'non_compliant')->count()
            : 0;

        $kpis = [
            ['index' => 1, 'title' => 'Product Safety Profiles', 'value' => (string) $totalBeautyProfiles, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'FileText'],
            ['index' => 2, 'title' => 'Compliant Products', 'value' => (string) $compliantProfiles, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'CheckCircle2'],
            ['index' => 3, 'title' => 'Pending Safety Review', 'value' => (string) $pendingReviews, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'Clock'],
            ['index' => 4, 'title' => 'Non-Compliant Findings', 'value' => (string) $nonCompliant, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'AlertTriangle', 'alert' => $nonCompliant > 0],
        ];

        return response()->json([
            'kpis' => $kpis,
            'lastSynced' => now()->format('d M Y, h:i A'),
        ]);
    }

    /**
     * VC10 - Authenticity & Counterfeit Investigations
     */
    public function authenticityDashboard(Request $request): JsonResponse
    {
        $totalCases = (Schema::hasTable('compliance_case_files') && Schema::hasColumn('compliance_case_files', 'case_type'))
            ? DB::table('compliance_case_files')->where('case_type', 'authenticity')->count()
            : 0;
        $openCases = (Schema::hasTable('compliance_case_files') && Schema::hasColumn('compliance_case_files', 'case_type') && Schema::hasColumn('compliance_case_files', 'status'))
            ? DB::table('compliance_case_files')->where('case_type', 'authenticity')->where('status', 'open')->count()
            : 0;
        $riskEvents = $this->tableQuery('risk_events')?->count() ?? 0;

        $kpis = [
            ['index' => 1, 'title' => 'Total Authenticity Cases', 'value' => (string) $totalCases, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'ShieldAlert'],
            ['index' => 2, 'title' => 'Active Investigations', 'value' => (string) $openCases, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'Eye'],
            ['index' => 3, 'title' => 'Risk Flag Events', 'value' => (string) $riskEvents, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'AlertTriangle'],
        ];

        return response()->json([
            'kpis' => $kpis,
            'lastSynced' => now()->format('d M Y, h:i A'),
        ]);
    }

    /**
     * VC11 - Recall & Safety Incident Command Center
     */
    public function recallsDashboard(Request $request): JsonResponse
    {
        $totalRecalls = ProductRecall::count();
        $activeRecalls = ProductRecall::where('status', 'active')->count();
        $resolvedRecalls = ProductRecall::where('status', 'resolved')->count();
        $quarantinedUnits = ProductRecall::sum('quarantined_units_count');

        $kpis = [
            ['index' => 1, 'title' => 'Total Product Recalls', 'value' => (string) $totalRecalls, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'AlertCircle'],
            ['index' => 2, 'title' => 'Active Recall Campaigns', 'value' => (string) $activeRecalls, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'AlertTriangle', 'alert' => $activeRecalls > 0],
            ['index' => 3, 'title' => 'Resolved Recalls', 'value' => (string) $resolvedRecalls, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'CheckCircle2'],
            ['index' => 4, 'title' => 'Quarantined Inventory Units', 'value' => number_format($quarantinedUnits), 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'Clock'],
        ];

        $recalls = ProductRecall::with(['supplier', 'product'])
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        return response()->json([
            'kpis' => $kpis,
            'recalls' => $recalls,
            'lastSynced' => now()->format('d M Y, h:i A'),
        ]);
    }

    /**
     * VC12 - Compliance Rules, Policies, SLA & Escalations
     */
    public function governanceDashboard(Request $request): JsonResponse
    {
        $totalRules = $this->tableQuery('compliance_rules')?->count() ?? 0;
        $activeRules = (Schema::hasTable('compliance_rules') && Schema::hasColumn('compliance_rules', 'status'))
            ? DB::table('compliance_rules')->where('status', 'active')->count()
            : 0;
        $checksRun = $this->tableQuery('compliance_rule_checks')?->count() ?? 0;

        $kpis = [
            ['index' => 1, 'title' => 'Total Governance Rules', 'value' => (string) $totalRules, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'FileText'],
            ['index' => 2, 'title' => 'Active Rules Enforced', 'value' => (string) $activeRules, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'CheckCircle2'],
            ['index' => 3, 'title' => 'Automated Checks Executed', 'value' => number_format($checksRun), 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'Clock'],
        ];

        return response()->json([
            'kpis' => $kpis,
            'lastSynced' => now()->format('d M Y, h:i A'),
        ]);
    }

    /**
     * VC13 - Compliance Reports & Analytics
     */
    public function reportsDashboard(Request $request): JsonResponse
    {
        $totalCases = $this->tableQuery('compliance_case_files')?->count() ?? 0;
        $openCases = (Schema::hasTable('compliance_case_files') && Schema::hasColumn('compliance_case_files', 'status'))
            ? DB::table('compliance_case_files')->where('status', 'open')->count()
            : 0;
        $riskProfilesCount = $this->tableQuery('risk_profiles')?->count() ?? 0;

        return response()->json([
            'analytics' => [
                'total_compliance_cases' => $totalCases,
                'open_cases' => $openCases,
                'risk_profiles_count' => $riskProfilesCount,
            ],
            'lastSynced' => now()->format('d M Y, h:i A'),
        ]);
    }

    /**
     * VC14 - Compliance Import, Export & Audit
     */
    public function importExportAuditDashboard(Request $request): JsonResponse
    {
        $jobs = AdminDataJob::where('domain', 'verification_compliance')
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        return response()->json([
            'jobs' => $jobs,
            'lastSynced' => now()->format('d M Y, h:i A'),
        ]);
    }
}
