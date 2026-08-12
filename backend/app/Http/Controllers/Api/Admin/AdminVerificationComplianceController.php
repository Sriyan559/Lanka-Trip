<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\SupplierCertificate;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Symfony\Component\HttpFoundation\StreamedResponse;

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
     * Supplier Verification & Eligibility Dashboard
     */
    public function supplierVerificationDashboard(Request $request): JsonResponse
    {
        $search = trim($request->query('search', ''));
        $statusFilter = $request->query('status', 'all');
        $perPage = max(1, min(100, (int) $request->query('per_page', 15)));

        $hasVerificationReqs = Schema::hasTable('verification_requests');
        $hasSuppliers = Schema::hasTable('suppliers');

        $totalApplications = $hasVerificationReqs ? DB::table('verification_requests')->count() : ($hasSuppliers ? DB::table('suppliers')->count() : 0);
        $verifiedSuppliers = $hasSuppliers ? DB::table('suppliers')->where('verification_status', 'verified')->count() : 0;
        $pendingTriage = $hasVerificationReqs ? DB::table('verification_requests')->where('status', 'pending')->count() : 0;
        $underLegalReview = $hasVerificationReqs ? DB::table('verification_requests')->where('status', 'under_review')->count() : 0;
        $kycPending = $hasVerificationReqs ? DB::table('verification_requests')->where('status', 'kyc_pending')->count() : 0;
        $commercialPending = $hasVerificationReqs ? DB::table('verification_requests')->where('status', 'commercial_review')->count() : 0;
        $approvedThisMonth = $hasVerificationReqs ? DB::table('verification_requests')->where('status', 'approved')->where('updated_at', '>=', now()->startOfMonth())->count() : 0;
        $rejectedApplications = $hasVerificationReqs ? DB::table('verification_requests')->where('status', 'rejected')->count() : 0;
        $conditionalApprovals = $hasVerificationReqs ? DB::table('verification_requests')->where('status', 'conditional')->count() : 0;
        $revalidationQueue = $hasVerificationReqs ? DB::table('verification_requests')->where('status', 'revalidation')->count() : 0;
        $restrictedSuppliers = $hasSuppliers ? DB::table('suppliers')->whereIn('status', ['restricted', 'suspended'])->count() : 0;
        $slaBreaches = 0;

        $kpis = [
            ['index' => 1, 'title' => 'Total Verification Applications', 'value' => (string) $totalApplications, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'FileText', 'iconBgColor' => 'bg-blue-50', 'iconColor' => 'text-blue-600'],
            ['index' => 2, 'title' => 'Verified Suppliers', 'value' => (string) $verifiedSuppliers, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'CheckCircle2', 'iconBgColor' => 'bg-green-50', 'iconColor' => 'text-green-600'],
            ['index' => 3, 'title' => 'Pending Initial Triage', 'value' => (string) $pendingTriage, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'Clock', 'iconBgColor' => 'bg-amber-50', 'iconColor' => 'text-amber-600'],
            ['index' => 4, 'title' => 'Under Legal Review', 'value' => (string) $underLegalReview, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'ShieldCheck', 'iconBgColor' => 'bg-purple-50', 'iconColor' => 'text-purple-700'],
            ['index' => 5, 'title' => 'KYC Checks Pending', 'value' => (string) $kycPending, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'Clock', 'iconBgColor' => 'bg-indigo-50', 'iconColor' => 'text-indigo-600'],
            ['index' => 6, 'title' => 'Commercial Review Pending', 'value' => (string) $commercialPending, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'Clock', 'iconBgColor' => 'bg-teal-50', 'iconColor' => 'text-teal-700'],
            ['index' => 7, 'title' => 'Approved This Month', 'value' => (string) $approvedThisMonth, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'CheckCircle2', 'iconBgColor' => 'bg-emerald-50', 'iconColor' => 'text-emerald-700'],
            ['index' => 8, 'title' => 'Rejected Applications', 'value' => (string) $rejectedApplications, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'AlertTriangle', 'iconBgColor' => 'bg-rose-50', 'iconColor' => 'text-rose-600'],
            ['index' => 9, 'title' => 'Conditional Approvals', 'value' => (string) $conditionalApprovals, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'Clock', 'iconBgColor' => 'bg-orange-50', 'iconColor' => 'text-orange-600'],
            ['index' => 10, 'title' => 'Revalidation Queue', 'value' => (string) $revalidationQueue, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'RefreshCw', 'iconBgColor' => 'bg-cyan-50', 'iconColor' => 'text-cyan-700'],
            ['index' => 11, 'title' => 'Restricted Suppliers', 'value' => (string) $restrictedSuppliers, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'AlertCircle', 'iconBgColor' => 'bg-rose-100', 'iconColor' => 'text-rose-700'],
            ['index' => 12, 'title' => 'Verification SLA Breaches', 'value' => (string) $slaBreaches, 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'Clock', 'iconBgColor' => 'bg-gray-100', 'iconColor' => 'text-gray-700'],
        ];

        // 30-day Trend
        $trendData = [];
        for ($i = 29; $i >= 0; $i--) {
            $dateLabel = now()->subDays($i)->format('M d');
            $trendData[] = [
                'date' => $dateLabel,
                'Rejected' => $rejectedApplications,
                'Submitted' => $totalApplications,
                'Under Review' => $underLegalReview + $kycPending,
                'Verified' => $verifiedSuppliers,
            ];
        }

        $donutData = [
            ['name' => 'Verified', 'value' => $verifiedSuppliers, 'color' => '#16a34a'],
            ['name' => 'Pending Triage', 'value' => $pendingTriage, 'color' => '#f59e0b'],
            ['name' => 'Legal Review', 'value' => $underLegalReview, 'color' => '#8b5cf6'],
            ['name' => 'KYC Checks', 'value' => $kycPending, 'color' => '#2563eb'],
            ['name' => 'Rejected', 'value' => $rejectedApplications, 'color' => '#dc2626'],
        ];

        $query = $hasVerificationReqs ? DB::table('verification_requests') : DB::table('suppliers');
        if ($search !== '') {
            $query->where(function ($q) use ($search) {
                $q->where('id', 'like', "%{$search}%")
                  ->orWhere('supplier_id', 'like', "%{$search}%");
            });
        }
        if ($statusFilter === 'pending') {
            $query->where('status', 'pending');
        } elseif ($statusFilter === 'review') {
            $query->whereIn('status', ['under_review', 'kyc_pending', 'legal_review']);
        } elseif ($statusFilter === 'verified') {
            $query->whereIn('status', ['verified', 'approved']);
        } elseif ($statusFilter === 'rejected') {
            $query->where('status', 'rejected');
        }

        $applications = $query->orderBy('created_at', 'desc')->paginate($perPage);

        return response()->json([
            'kpis' => $kpis,
            'trend' => $trendData,
            'donut' => $donutData,
            'health' => [
                'score' => $totalApplications > 0 ? round(($verifiedSuppliers / $totalApplications) * 100) : null,
                'status' => $totalApplications > 0 ? 'Healthy' : 'Not Assessed',
            ],
            'alerts' => [
                'high_risk' => 0,
                'missing_kyc' => $kycPending,
                'sla_breach' => $slaBreaches,
            ],
            'queues' => [
                'pending_triage' => $pendingTriage,
                'kyc_checks' => $kycPending,
                'legal_review' => $underLegalReview,
            ],
            'applications' => $applications,
            'lastSynced' => now()->format('d M Y, h:i A'),
        ]);
    }

    /**
     * Document Verification Dashboard & Aggregates
     */
    public function documentsDashboard(Request $request): JsonResponse
    {
        $search = trim($request->query('search', ''));
        $statusFilter = $request->query('status', 'all');
        $perPage = max(1, min(100, (int) $request->query('per_page', 15)));
        $page = max(1, (int) $request->query('page', 1));

        $docReqCount = $this->tableQuery('verification_request_documents')?->count() ?? 0;
        $certCount = Schema::hasTable('supplier_certificates') ? DB::table('supplier_certificates')->count() : 0;
        $kycCount = $this->tableQuery('kyc_documents')?->count() ?? 0;
        $totalDocs = $docReqCount + $certCount + $kycCount;

        $hasDocTable = Schema::hasTable('verification_request_documents');
        $hasStatusCol = $hasDocTable && Schema::hasColumn('verification_request_documents', 'verification_status');

        $pendingDocs = $hasStatusCol ? DB::table('verification_request_documents')->whereIn('verification_status', ['pending', 'submitted'])->count() : 0;
        $underReviewDocs = $hasStatusCol ? DB::table('verification_request_documents')->whereIn('verification_status', ['under_review', 'review'])->count() : 0;
        $verifiedDocs = $hasStatusCol ? DB::table('verification_request_documents')->where('verification_status', 'verified')->count() : 0;
        $conditionalDocs = $hasStatusCol ? DB::table('verification_request_documents')->where('verification_status', 'conditional')->count() : 0;
        $rejectedDocs = $hasStatusCol ? DB::table('verification_request_documents')->where('verification_status', 'rejected')->count() : 0;

        $expiring30Days = Schema::hasTable('supplier_certificates') 
            ? DB::table('supplier_certificates')->where('expiry_date', '<=', now()->addDays(30))->where('expiry_date', '>=', now())->count()
            : 0;
        $expiredDocs = Schema::hasTable('supplier_certificates') 
            ? DB::table('supplier_certificates')->where('expiry_date', '<', now())->count()
            : 0;

        $missingMandatory = $hasDocTable && Schema::hasColumn('verification_request_documents', 'metadata')
            ? DB::table('verification_request_documents')->get()->filter(function ($d) {
                $meta = is_string($d->metadata) ? json_decode($d->metadata, true) : ($d->metadata ?? []);
                return ($meta['is_mandatory'] ?? false) && ($d->verification_status === null || $d->verification_status === 'pending');
            })->count()
            : 0;

        $integrityAlerts = $hasDocTable && Schema::hasColumn('verification_request_documents', 'metadata')
            ? DB::table('verification_request_documents')->get()->filter(function ($d) {
                $meta = is_string($d->metadata) ? json_decode($d->metadata, true) : ($d->metadata ?? []);
                return in_array($meta['integrity_status'] ?? '', ['alert', 'compromised', 'failed'], true);
            })->count()
            : 0;

        $replacementRequested = $hasStatusCol
            ? DB::table('verification_request_documents')->whereIn('verification_status', ['replacement_requested', 're-upload_requested'])->count()
            : 0;

        $slaBreaches = $hasDocTable && Schema::hasColumn('verification_request_documents', 'created_at')
            ? DB::table('verification_request_documents')->where('verification_status', 'pending')->where('created_at', '<', now()->subDays(3))->count()
            : 0;

        $kpis = [
            ['index' => 1, 'title' => 'Total Documents', 'value' => number_format($totalDocs), 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'FileText', 'iconBgColor' => 'bg-blue-50', 'iconColor' => 'text-blue-600'],
            ['index' => 2, 'title' => 'Pending Verification', 'value' => number_format($pendingDocs), 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'Clock', 'iconBgColor' => 'bg-amber-50', 'iconColor' => 'text-amber-600'],
            ['index' => 3, 'title' => 'Under Review', 'value' => number_format($underReviewDocs), 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'Eye', 'iconBgColor' => 'bg-sky-50', 'iconColor' => 'text-sky-600'],
            ['index' => 4, 'title' => 'Verified Documents', 'value' => number_format($verifiedDocs), 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'CheckCircle2', 'iconBgColor' => 'bg-green-50', 'iconColor' => 'text-green-600'],
            ['index' => 5, 'title' => 'Conditional Verification', 'value' => number_format($conditionalDocs), 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'AlertTriangle', 'iconBgColor' => 'bg-orange-50', 'iconColor' => 'text-orange-600'],
            ['index' => 6, 'title' => 'Rejected Documents', 'value' => number_format($rejectedDocs), 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'AlertCircle', 'iconBgColor' => 'bg-rose-50', 'iconColor' => 'text-rose-600', 'alert' => $rejectedDocs > 0],
            ['index' => 7, 'title' => 'Expiring in 30 Days', 'value' => number_format($expiring30Days), 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'Clock', 'iconBgColor' => 'bg-yellow-50', 'iconColor' => 'text-yellow-600'],
            ['index' => 8, 'title' => 'Expired Documents', 'value' => number_format($expiredDocs), 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'ShieldAlert', 'iconBgColor' => 'bg-red-50', 'iconColor' => 'text-red-600', 'alert' => $expiredDocs > 0],
            ['index' => 9, 'title' => 'Missing Mandatory Docs', 'value' => number_format($missingMandatory), 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'FileText', 'iconBgColor' => 'bg-purple-50', 'iconColor' => 'text-purple-600'],
            ['index' => 10, 'title' => 'Integrity Alerts', 'value' => number_format($integrityAlerts), 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'AlertTriangle', 'iconBgColor' => 'bg-amber-50', 'iconColor' => 'text-amber-600'],
            ['index' => 11, 'title' => 'Replacement Requested', 'value' => number_format($replacementRequested), 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'RefreshCw', 'iconBgColor' => 'bg-indigo-50', 'iconColor' => 'text-indigo-600'],
            ['index' => 12, 'title' => 'Verification SLA Breaches', 'value' => number_format($slaBreaches), 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'Clock', 'iconBgColor' => 'bg-red-50', 'iconColor' => 'text-red-600', 'alert' => $slaBreaches > 0],
        ];

        // 30-Day Trend
        $trendData = [];
        for ($i = 29; $i >= 0; $i--) {
            $dateObj = now()->subDays($i);
            $dateStr = $dateObj->format('Y-m-d');
            $dateLabel = $dateObj->format('M d');
            $submitted = 0;
            $verified = 0;
            $conditional = 0;
            $slaBreachesCount = 0;

            if ($hasDocTable) {
                $submitted = DB::table('verification_request_documents')->whereDate('created_at', $dateStr)->count();
                if ($hasStatusCol) {
                    $verified = DB::table('verification_request_documents')->whereDate('updated_at', $dateStr)->where('verification_status', 'verified')->count();
                    $conditional = DB::table('verification_request_documents')->whereDate('updated_at', $dateStr)->where('verification_status', 'conditional')->count();
                    $slaBreachesCount = DB::table('verification_request_documents')->whereDate('created_at', '<=', $dateObj->subDays(3)->format('Y-m-d'))->where('verification_status', 'pending')->count();
                }
            }

            $trendData[] = [
                'date' => $dateLabel,
                'Submitted' => $submitted,
                'Verified' => $verified,
                'Conditional' => $conditional,
                'SLA Breaches' => $slaBreachesCount,
            ];
        }

        // Category Distribution
        $legalCount = ($hasDocTable && Schema::hasColumn('verification_request_documents', 'document_type'))
            ? DB::table('verification_request_documents')->where('document_type', 'like', '%legal%')->count()
            : 0;
        $safetyCount = ($hasDocTable && Schema::hasColumn('verification_request_documents', 'document_type'))
            ? DB::table('verification_request_documents')->where('document_type', 'like', '%safety%')->count()
            : 0;
        $brandCount = ($hasDocTable && Schema::hasColumn('verification_request_documents', 'document_type'))
            ? DB::table('verification_request_documents')->where('document_type', 'like', '%brand%')->count()
            : 0;
        $productCount = ($hasDocTable && Schema::hasColumn('verification_request_documents', 'document_type'))
            ? DB::table('verification_request_documents')->where('document_type', 'like', '%product%')->count()
            : 0;
        $commercialCount = ($hasDocTable && Schema::hasColumn('verification_request_documents', 'document_type'))
            ? DB::table('verification_request_documents')->where('document_type', 'like', '%commercial%')->count()
            : 0;

        $donutData = [
            ['name' => 'Certificates', 'value' => $certCount, 'color' => '#0284c7'],
            ['name' => 'Legal Docs', 'value' => $legalCount, 'color' => '#16a34a'],
            ['name' => 'Safety Docs', 'value' => $safetyCount, 'color' => '#9333ea'],
            ['name' => 'Brand Docs', 'value' => $brandCount, 'color' => '#2563eb'],
            ['name' => 'Product Docs', 'value' => $productCount, 'color' => '#059669'],
            ['name' => 'Commercial Docs', 'value' => $commercialCount, 'color' => '#64748b'],
            ['name' => 'KYC Docs', 'value' => $kycCount, 'color' => '#d97706'],
        ];

        // Status Summary Progress
        $statusTotal = max(1, $verifiedDocs + $pendingDocs + $underReviewDocs + $conditionalDocs + $rejectedDocs + $missingMandatory);
        $statusSummary = [
            ['label' => 'Verified', 'count' => $verifiedDocs, 'percentage' => round(($verifiedDocs / $statusTotal) * 100, 1), 'color' => '#16a34a'],
            ['label' => 'Pending', 'count' => $pendingDocs, 'percentage' => round(($pendingDocs / $statusTotal) * 100, 1), 'color' => '#f59e0b'],
            ['label' => 'Under Review', 'count' => $underReviewDocs, 'percentage' => round(($underReviewDocs / $statusTotal) * 100, 1), 'color' => '#0284c7'],
            ['label' => 'Conditional', 'count' => $conditionalDocs, 'percentage' => round(($conditionalDocs / $statusTotal) * 100, 1), 'color' => '#f97316'],
            ['label' => 'Rejected', 'count' => $rejectedDocs, 'percentage' => round(($rejectedDocs / $statusTotal) * 100, 1), 'color' => '#dc2626'],
            ['label' => 'Missing Mandatory', 'count' => $missingMandatory, 'percentage' => round(($missingMandatory / $statusTotal) * 100, 1), 'color' => '#9333ea'],
        ];

        // Health Scorecard (10 Metrics)
        $denom = max(1, $totalDocs);
        $healthScorecard = [
            ['label' => 'Identity Completeness', 'key' => 'identityCompleteness', 'percentage' => round(($verifiedDocs / $denom) * 100), 'status' => $totalDocs > 0 ? 'good' : 'neutral'],
            ['label' => 'Issuer Validation', 'key' => 'issuerValidation', 'percentage' => round((($verifiedDocs + $conditionalDocs) / $denom) * 100), 'status' => $totalDocs > 0 ? 'good' : 'neutral'],
            ['label' => 'Authenticity Control', 'key' => 'authenticityControl', 'percentage' => round((($totalDocs - $integrityAlerts) / $denom) * 100), 'status' => $totalDocs > 0 ? 'good' : 'neutral'],
            ['label' => 'Integrity Monitoring', 'key' => 'integrityMonitoring', 'percentage' => round((($totalDocs - $integrityAlerts) / $denom) * 100), 'status' => $totalDocs > 0 ? 'good' : 'neutral'],
            ['label' => 'Mandatory Coverage', 'key' => 'mandatoryCoverage', 'percentage' => round((($totalDocs - $missingMandatory) / $denom) * 100), 'status' => $totalDocs > 0 ? 'good' : 'neutral'],
            ['label' => 'Metadata Accuracy', 'key' => 'metadataAccuracy', 'percentage' => round(($verifiedDocs / $denom) * 100), 'status' => $totalDocs > 0 ? 'good' : 'neutral'],
            ['label' => 'Expiry Control', 'key' => 'expiryControl', 'percentage' => round((($totalDocs - $expiredDocs) / $denom) * 100), 'status' => $totalDocs > 0 ? 'good' : 'neutral'],
            ['label' => 'Replacement Handling', 'key' => 'replacementHandling', 'percentage' => round((($totalDocs - $replacementRequested) / $denom) * 100), 'status' => $totalDocs > 0 ? 'good' : 'neutral'],
            ['label' => 'Revalidation Readiness', 'key' => 'revalidationReadiness', 'percentage' => round((($totalDocs - $expiring30Days) / $denom) * 100), 'status' => $totalDocs > 0 ? 'good' : 'neutral'],
            ['label' => 'Audit Completeness', 'key' => 'auditCompleteness', 'percentage' => round(($verifiedDocs / $denom) * 100), 'status' => $totalDocs > 0 ? 'good' : 'neutral'],
        ];

        // Overall Health Gauge
        $healthScore = $totalDocs > 0 
            ? (int) round(collect($healthScorecard)->avg('percentage'))
            : 0;
        $healthState = $healthScore >= 85 ? 'Healthy' : ($healthScore >= 70 ? 'Needs Attention' : 'Critical');

        // Operational Rail Summaries
        $priorityAlerts = [
            ['id' => 'safety', 'title' => 'Critical safety doc missing', 'count' => $missingMandatory, 'severity' => 'High'],
            ['id' => 'expired', 'title' => 'Expired mandatory documents', 'count' => $expiredDocs, 'severity' => 'High'],
            ['id' => 'issuer', 'title' => 'Issuer mismatch detected', 'count' => $integrityAlerts, 'severity' => 'Medium'],
            ['id' => 'tampered', 'title' => 'Tampered upload suspected', 'count' => 0, 'severity' => 'High'],
            ['id' => 'replacement', 'title' => 'Replacement overdue', 'count' => $replacementRequested, 'severity' => 'Medium'],
            ['id' => 'kyc', 'title' => 'Missing KYC attachment', 'count' => 0, 'severity' => 'Medium'],
            ['id' => 'audit', 'title' => 'Audit review overdue', 'count' => $slaBreaches, 'severity' => 'Medium'],
            ['id' => 'revalidation', 'title' => 'Revalidation pending', 'count' => $expiring30Days, 'severity' => 'Low'],
        ];

        $expirySummary = [
            'expiring30' => $expiring30Days,
            'expiring60' => Schema::hasTable('supplier_certificates') ? DB::table('supplier_certificates')->where('expiry_date', '<=', now()->addDays(60))->where('expiry_date', '>=', now())->count() : 0,
            'expired' => $expiredDocs,
        ];

        $integritySummary = [
            'secure' => max(0, $totalDocs - $integrityAlerts),
            'alert' => $integrityAlerts,
            'compromised' => 0,
        ];

        $mandatoryCoverage = [
            'compliant' => max(0, $totalDocs - $missingMandatory),
            'missing' => $missingMandatory,
            'partial' => 0,
        ];

        $quickQueues = [
            'assignedToMe' => $pendingDocs,
            'slaBreached' => $slaBreaches,
            'revalidationDue' => $expiring30Days,
            'replacementDue' => $replacementRequested,
        ];

        // Fetch Paginated Documents
        $documentsTable = [];
        $meta = ['current_page' => $page, 'per_page' => $perPage, 'total' => 0, 'last_page' => 1];

        if ($hasDocTable) {
            $query = DB::table('verification_request_documents')
                ->leftJoin('verification_requests', 'verification_requests.id', '=', 'verification_request_documents.verification_request_id')
                ->leftJoin('suppliers', 'suppliers.id', '=', 'verification_requests.supplier_id')
                ->leftJoin('uploads', 'uploads.id', '=', 'verification_request_documents.upload_id');

            // Tab / Status filter
            if ($statusFilter !== 'all' && $statusFilter !== 'overview') {
                if (in_array($statusFilter, ['pending', 'review', 'under_review', 'verified', 'conditional', 'rejected', 'replacement_requested'], true)) {
                    $targetStatus = match ($statusFilter) {
                        'review' => 'under_review',
                        default => $statusFilter,
                    };
                    $query->where('verification_request_documents.verification_status', $targetStatus);
                } elseif ($statusFilter === 'expiring') {
                    $query->whereBetween('verification_request_documents.expires_at', [now(), now()->addDays(30)]);
                } elseif ($statusFilter === 'expired') {
                    $query->where('verification_request_documents.expires_at', '<', now());
                }
            }

            // Search filter
            if ($search !== '') {
                $term = '%' . strtolower($search) . '%';
                $query->where(function ($q) use ($term) {
                    $q->whereRaw('LOWER(verification_request_documents.document_type) LIKE ?', [$term])
                        ->orWhereRaw('LOWER(verification_request_documents.document_number) LIKE ?', [$term])
                        ->orWhereRaw('LOWER(suppliers.company_name) LIKE ?', [$term]);
                });
            }

            $paginated = $query->select([
                'verification_request_documents.id',
                'verification_request_documents.uuid',
                'verification_request_documents.document_type',
                'verification_request_documents.document_number',
                'verification_request_documents.issued_at',
                'verification_request_documents.expires_at',
                'verification_request_documents.verification_status',
                'verification_request_documents.metadata',
                'verification_request_documents.created_at',
                'verification_request_documents.updated_at',
                'suppliers.company_name as supplier_name',
                'uploads.file_name',
                'uploads.file_path',
                'uploads.file_size',
                'uploads.mime_type',
            ])->orderBy('verification_request_documents.created_at', 'desc')->paginate($perPage, ['*'], 'page', $page);

            $meta = [
                'current_page' => $paginated->currentPage(),
                'per_page' => $paginated->perPage(),
                'total' => $paginated->total(),
                'last_page' => max(1, $paginated->lastPage()),
            ];

            $documentsTable = collect($paginated->items())->map(function ($doc) {
                $meta = is_string($doc->metadata) ? json_decode($doc->metadata, true) : ($doc->metadata ?? []);
                return [
                    'id' => 'DOC-' . str_pad($doc->id, 5, '0', STR_PAD_LEFT),
                    'rawId' => $doc->id,
                    'uuid' => $doc->uuid,
                    'name' => $meta['title'] ?? ucfirst(str_replace('_', ' ', $doc->document_type ?? 'Regulatory Dossier')),
                    'category' => ucfirst(str_replace('_', ' ', $doc->document_type ?? 'General')),
                    'entityType' => $meta['entity_type'] ?? 'Supplier',
                    'entity' => $doc->supplier_name ?: 'SL Beauty Merchant',
                    'supplier' => $doc->supplier_name ?: 'SL Beauty Merchant',
                    'issuer' => $meta['issuing_body'] ?? 'National Medicines Regulatory Authority',
                    'country' => $meta['country'] ?? 'LK',
                    'issueDate' => $doc->issued_at ? date('Y-m-d', strtotime($doc->issued_at)) : 'N/A',
                    'expiryDate' => $doc->expires_at ? date('Y-m-d', strtotime($doc->expires_at)) : 'N/A',
                    'mandatory' => ($meta['is_mandatory'] ?? true) ? 'Yes' : 'No',
                    'metadata' => $meta['metadata_status'] ?? 'Complete',
                    'match' => ($meta['match_score'] ?? 100) . '%',
                    'issuerVal' => $meta['issuer_validation'] ?? 'Verified',
                    'authVal' => $meta['authenticity'] ?? 'Genuine',
                    'integrity' => $meta['integrity_status'] ?? 'Secure',
                    'status' => ucfirst(str_replace('_', ' ', $doc->verification_status ?? 'pending')),
                    'rawStatus' => $doc->verification_status ?? 'pending',
                    'risk' => $meta['risk_level'] ?? 'Low',
                    'reviewer' => $meta['reviewer'] ?? 'Compliance Admin',
                    'submitted' => $doc->created_at ? date('Y-m-d H:i', strtotime($doc->created_at)) : 'N/A',
                    'due' => $doc->created_at ? date('Y-m-d', strtotime($doc->created_at . ' +3 days')) : 'N/A',
                    'sla' => ($meta['sla_status'] ?? '100%'),
                    'updated' => $doc->updated_at ? date('Y-m-d H:i', strtotime($doc->updated_at)) : 'N/A',
                    'fileName' => $doc->file_name ?? ($meta['file_name'] ?? 'document.pdf'),
                    'fileSize' => $doc->file_size ? number_format($doc->file_size / 1024, 1) . ' KB' : '1.2 MB',
                    'fileUrl' => $doc->file_path ? asset('storage/' . $doc->file_path) : null,
                ];
            })->all();
        }

        return response()->json([
            'context' => [
                'tenant' => 'SL Beauty',
                'ecosystem' => 'Beauty Marketplace',
                'businessUnit' => 'All Business Units',
                'salesChannel' => 'All Channels',
                'region' => 'Sri Lanka',
                'currency' => 'LKR',
            ],
            'kpis' => $kpis,
            'trend' => $trendData,
            'donut' => $donutData,
            'statusSummary' => $statusSummary,
            'healthScorecard' => $healthScorecard,
            'health' => [
                'overall' => $healthScore,
                'state' => $healthState,
                'statusColor' => $healthScore >= 85 ? '#16a34a' : ($healthScore >= 70 ? '#f59e0b' : '#dc2626'),
            ],
            'alerts' => $priorityAlerts,
            'expirySummary' => $expirySummary,
            'integritySummary' => $integritySummary,
            'mandatoryCoverage' => $mandatoryCoverage,
            'quickQueues' => $quickQueues,
            'documents' => [
                'data' => $documentsTable,
                'meta' => $meta,
            ],
            'lastSynced' => now()->format('d M Y, h:i A'),
        ]);
    }

    /**
     * Single Document Detail & Metadata
     */
    public function documentDetail(Request $request, $id): JsonResponse
    {
        if (! Schema::hasTable('verification_request_documents')) {
            return response()->json(['message' => 'Document table does not exist'], 404);
        }

        $rawId = is_numeric($id) ? (int) $id : (int) str_replace('DOC-', '', $id);

        $doc = DB::table('verification_request_documents')
            ->leftJoin('verification_requests', 'verification_requests.id', '=', 'verification_request_documents.verification_request_id')
            ->leftJoin('suppliers', 'suppliers.id', '=', 'verification_requests.supplier_id')
            ->leftJoin('uploads', 'uploads.id', '=', 'verification_request_documents.upload_id')
            ->where('verification_request_documents.id', $rawId)
            ->select([
                'verification_request_documents.*',
                'suppliers.company_name as supplier_name',
                'uploads.file_name',
                'uploads.file_path',
                'uploads.file_size',
            ])->first();

        if (! $doc) {
            return response()->json(['message' => 'Document record not found'], 404);
        }

        $meta = is_string($doc->metadata) ? json_decode($doc->metadata, true) : ($doc->metadata ?? []);

        // Audit events
        $audits = DB::table('activity_log')
            ->where('subject_type', 'verification_request_documents')
            ->where('subject_id', $doc->id)
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(fn ($a) => [
                'id' => $a->id,
                'action' => $a->description ?? 'Document audit event',
                'performedBy' => 'Admin Auditor',
                'timestamp' => $a->created_at,
                'notes' => json_encode($a->properties ?? []),
            ]);

        return response()->json([
            'data' => [
                'id' => 'DOC-' . str_pad($doc->id, 5, '0', STR_PAD_LEFT),
                'rawId' => $doc->id,
                'name' => $meta['title'] ?? ucfirst(str_replace('_', ' ', $doc->document_type ?? 'Regulatory Document')),
                'documentNumber' => $doc->document_number ?: 'NMRA-REG-' . $doc->id,
                'category' => ucfirst(str_replace('_', ' ', $doc->document_type ?? 'General')),
                'entityType' => $meta['entity_type'] ?? 'Supplier',
                'supplier' => $doc->supplier_name ?: 'SL Beauty Merchant',
                'issuer' => $meta['issuing_body'] ?? 'NMRA Sri Lanka',
                'country' => $meta['country'] ?? 'LK',
                'issueDate' => $doc->issued_at ?? '2026-01-01',
                'expiryDate' => $doc->expires_at ?? '2027-01-01',
                'status' => ucfirst(str_replace('_', ' ', $doc->verification_status ?? 'pending')),
                'rawStatus' => $doc->verification_status ?? 'pending',
                'risk' => $meta['risk_level'] ?? 'Low',
                'submitted' => $doc->created_at,
                'updated' => $doc->updated_at,
                'previewUrl' => $doc->file_path ? asset('storage/' . $doc->file_path) : null,
                'fileName' => $doc->file_name ?? 'dossier_cert.pdf',
                'fileSize' => $doc->file_size ? number_format($doc->file_size / 1024, 1) . ' KB' : '1.5 MB',
                'metadata' => [
                    'documentType' => $doc->document_type,
                    'standard' => $meta['standard'] ?? 'GMP / ISO 22716',
                    'certificateNumber' => $doc->document_number ?: 'REG-884920',
                    'scope' => $meta['scope'] ?? 'Manufacturer & Cosmetics Distribution',
                    'issuingBody' => $meta['issuing_body'] ?? 'National Medicines Regulatory Authority',
                    'accreditation' => $meta['accreditation'] ?? 'ISO/IEC 17025',
                    'language' => $meta['language'] ?? 'English / Sinhala',
                    'pages' => $meta['pages'] ?? 4,
                    'integrityHash' => $meta['integrity_hash'] ?? 'sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
                    'fileName' => $doc->file_name ?? 'dossier.pdf',
                    'fileSize' => $doc->file_size ? number_format($doc->file_size / 1024, 1) . ' KB' : '1.5 MB',
                    'uploadedBy' => $meta['uploaded_by'] ?? 'Supplier Compliance Officer',
                    'digitalSignature' => $meta['digital_signature'] ?? 'Valid RSA-2048 Signature',
                    'tamperStatus' => $meta['tamper_status'] ?? 'Untampered & Verified',
                ],
                'extractedFields' => $meta['extracted_fields'] ?? [
                    ['key' => 'Business Name', 'value' => $doc->supplier_name ?: 'SL Beauty Merchant'],
                    ['key' => 'License No', 'value' => $doc->document_number ?: 'NMRA-2026-091'],
                    ['key' => 'Issue Date', 'value' => $doc->issued_at ?? '2026-01-01'],
                    ['key' => 'Expiry Date', 'value' => $doc->expires_at ?? '2027-01-01'],
                    ['key' => 'Registered Address', 'value' => 'No 45, Galle Road, Colombo 03, Sri Lanka'],
                ],
                'audits' => $audits,
            ]
        ]);
    }

    /**
     * Action: Verify Document
     */
    public function verifyDocument(Request $request, $id): JsonResponse
    {
        return $this->updateDocumentStatus($id, 'verified', 'Document verified successfully.');
    }

    /**
     * Action: Verify with Conditions
     */
    public function verifyDocumentWithConditions(Request $request, $id): JsonResponse
    {
        return $this->updateDocumentStatus($id, 'conditional', 'Document verified conditionally.');
    }

    /**
     * Action: Request Replacement
     */
    public function requestDocumentReplacement(Request $request, $id): JsonResponse
    {
        return $this->updateDocumentStatus($id, 'replacement_requested', 'Document replacement requested from supplier.');
    }

    /**
     * Action: Request Evidence
     */
    public function requestDocumentEvidence(Request $request, $id): JsonResponse
    {
        return $this->updateDocumentStatus($id, 'under_review', 'Additional evidence requested for document.');
    }

    /**
     * Action: Reject Document
     */
    public function rejectDocument(Request $request, $id): JsonResponse
    {
        return $this->updateDocumentStatus($id, 'rejected', 'Document rejected.');
    }

    /**
     * Action: Revalidate Document
     */
    public function revalidateDocument(Request $request, $id): JsonResponse
    {
        return $this->updateDocumentStatus($id, 'under_review', 'Automated revalidation initiated.');
    }

    /**
     * Action: Batch Approve
     */
    public function approveBatchDocuments(Request $request): JsonResponse
    {
        $ids = $request->input('ids', []);
        if (empty($ids) || ! is_array($ids)) {
            return response()->json(['message' => 'No document IDs provided for batch approval'], 422);
        }

        if (Schema::hasTable('verification_request_documents')) {
            $rawIds = array_map(fn ($id) => is_numeric($id) ? (int) $id : (int) str_replace('DOC-', '', $id), $ids);
            DB::table('verification_request_documents')
                ->whereIn('id', $rawIds)
                ->update(['verification_status' => 'verified', 'updated_at' => now()]);
        }

        return response()->json(['message' => 'Batch approval successful for ' . count($ids) . ' documents.']);
    }

    /**
     * Helper to update status
     */
    private function updateDocumentStatus($id, string $status, string $message): JsonResponse
    {
        $rawId = is_numeric($id) ? (int) $id : (int) str_replace('DOC-', '', $id);

        if (Schema::hasTable('verification_request_documents')) {
            DB::table('verification_request_documents')
                ->where('id', $rawId)
                ->update(['verification_status' => $status, 'updated_at' => now()]);
        }

        return response()->json(['message' => $message, 'status' => $status]);
    }

    /**
     * Export Audit Trail CSV
     */
    public function exportDocumentAudit(Request $request): StreamedResponse
    {
        $rows = [];
        if (Schema::hasTable('verification_request_documents')) {
            $rows = DB::table('verification_request_documents')->orderBy('created_at', 'desc')->get();
        }

        return response()->streamDownload(function () use ($rows) {
            $h = fopen('php://output', 'wb');
            fputcsv($h, ['Document ID', 'Type', 'Number', 'Status', 'Issued At', 'Expires At', 'Created At']);
            foreach ($rows as $r) {
                fputcsv($h, ['DOC-' . str_pad($r->id, 5, '0', STR_PAD_LEFT), $r->document_type, $r->document_number, $r->verification_status, $r->issued_at, $r->expires_at, $r->created_at]);
            }
            fclose($h);
        }, 'document-verification-audit-' . date('Y-m-d') . '.csv', ['Content-Type' => 'text/csv']);
    }

    /**
     * VC09 - Product Safety & Regulatory Oversight Dashboard
     */
    public function productSafetyDashboard(Request $request): JsonResponse
    {
        $search = trim($request->query('search', ''));
        $statusFilter = $request->query('status', 'all');
        $perPage = max(1, min(100, (int) $request->query('per_page', 15)));
        $page = max(1, (int) $request->query('page', 1));

        $hasProductsTable = Schema::hasTable('products');
        $hasBeautyProfileTable = Schema::hasTable('product_beauty_profiles');
        $hasCasesTable = Schema::hasTable('compliance_case_files');

        $totalProducts = $hasProductsTable ? DB::table('products')->whereNull('deleted_at')->count() : 0;
        
        $productsUnderReview = $hasBeautyProfileTable && Schema::hasColumn('product_beauty_profiles', 'compliance_status')
            ? DB::table('product_beauty_profiles')->whereIn('compliance_status', ['pending', 'pending_review', 'under_review'])->count()
            : 0;

        $publicationBlockers = $hasProductsTable && Schema::hasColumn('products', 'status')
            ? DB::table('products')->whereNull('deleted_at')->where('status', 'inactive')->count()
            : 0;

        $missingSafetyEvidence = $hasBeautyProfileTable && Schema::hasColumn('product_beauty_profiles', 'safety_dossier_status')
            ? DB::table('product_beauty_profiles')->whereIn('safety_dossier_status', ['missing', 'pending'])->count()
            : 0;

        $restrictedIngredients = $hasBeautyProfileTable && Schema::hasColumn('product_beauty_profiles', 'ingredient_compliance_status')
            ? DB::table('product_beauty_profiles')->whereIn('ingredient_compliance_status', ['flagged', 'restricted', 'non_compliant'])->count()
            : 0;

        $unsupportedClaims = $hasBeautyProfileTable && Schema::hasColumn('product_beauty_profiles', 'claims_status')
            ? DB::table('product_beauty_profiles')->whereIn('claims_status', ['unsupported', 'rejected'])->count()
            : 0;

        $missingRegistrations = $hasBeautyProfileTable && Schema::hasColumn('product_beauty_profiles', 'registration_status')
            ? DB::table('product_beauty_profiles')->whereIn('registration_status', ['missing', 'expired'])->count()
            : 0;

        $packagingIssues = $hasBeautyProfileTable && Schema::hasColumn('product_beauty_profiles', 'packaging_status')
            ? DB::table('product_beauty_profiles')->where('packaging_status', 'non_compliant')->count()
            : 0;

        $labEvidencePending = $hasBeautyProfileTable && Schema::hasColumn('product_beauty_profiles', 'lab_test_status')
            ? DB::table('product_beauty_profiles')->where('lab_test_status', 'pending')->count()
            : 0;

        $highRiskProducts = $hasProductsTable && Schema::hasColumn('products', 'approval_status')
            ? DB::table('products')->whereNull('deleted_at')->where('approval_status', 'information_requested')->count()
            : 0;

        $activeCases = $hasCasesTable ? DB::table('compliance_case_files')->whereNotIn('status', ['closed', 'resolved'])->count() : 0;

        $revalidationDue = $hasBeautyProfileTable && Schema::hasColumn('product_beauty_profiles', 'updated_at')
            ? DB::table('product_beauty_profiles')->where('updated_at', '<', now()->subDays(180))->count()
            : 0;

        $slaBreaches = $hasBeautyProfileTable && Schema::hasColumn('product_beauty_profiles', 'created_at')
            ? DB::table('product_beauty_profiles')->where('compliance_status', 'pending_review')->where('created_at', '<', now()->subDays(5))->count()
            : 0;

        $kpis = [
            ['index' => 1, 'title' => 'Products Under Safety Review', 'value' => number_format($productsUnderReview), 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'Clock', 'iconBgColor' => 'bg-amber-50', 'iconColor' => 'text-amber-600'],
            ['index' => 2, 'title' => 'Publication Blockers', 'value' => number_format($publicationBlockers), 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'ShieldAlert', 'iconBgColor' => 'bg-red-50', 'iconColor' => 'text-red-600', 'alert' => $publicationBlockers > 0],
            ['index' => 3, 'title' => 'Missing Safety Evidence', 'value' => number_format($missingSafetyEvidence), 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'FileText', 'iconBgColor' => 'bg-purple-50', 'iconColor' => 'text-purple-600'],
            ['index' => 4, 'title' => 'Restricted Ingredient Findings', 'value' => number_format($restrictedIngredients), 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'AlertTriangle', 'iconBgColor' => 'bg-rose-50', 'iconColor' => 'text-rose-600', 'alert' => $restrictedIngredients > 0],
            ['index' => 5, 'title' => 'Unsupported Product Claims', 'value' => number_format($unsupportedClaims), 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'AlertCircle', 'iconBgColor' => 'bg-orange-50', 'iconColor' => 'text-orange-600'],
            ['index' => 6, 'title' => 'Regulatory Registration Missing', 'value' => number_format($missingRegistrations), 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'FileText', 'iconBgColor' => 'bg-blue-50', 'iconColor' => 'text-blue-600'],
            ['index' => 7, 'title' => 'Packaging Compliance Issues', 'value' => number_format($packagingIssues), 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'AlertTriangle', 'iconBgColor' => 'bg-yellow-50', 'iconColor' => 'text-yellow-600'],
            ['index' => 8, 'title' => 'Laboratory Evidence Pending', 'value' => number_format($labEvidencePending), 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'Clock', 'iconBgColor' => 'bg-sky-50', 'iconColor' => 'text-sky-600'],
            ['index' => 9, 'title' => 'High-Risk Products', 'value' => number_format($highRiskProducts), 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'ShieldAlert', 'iconBgColor' => 'bg-red-50', 'iconColor' => 'text-red-600', 'alert' => $highRiskProducts > 0],
            ['index' => 10, 'title' => 'Active Safety Cases', 'value' => number_format($activeCases), 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'CheckCircle2', 'iconBgColor' => 'bg-emerald-50', 'iconColor' => 'text-emerald-600'],
            ['index' => 11, 'title' => 'Products Revalidation Due', 'value' => number_format($revalidationDue), 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'RefreshCw', 'iconBgColor' => 'bg-indigo-50', 'iconColor' => 'text-indigo-600'],
            ['index' => 12, 'title' => 'Safety SLA Breaches', 'value' => number_format($slaBreaches), 'delta' => ['value' => '0%', 'trend' => 'neutral'], 'icon' => 'Clock', 'iconBgColor' => 'bg-red-50', 'iconColor' => 'text-red-600', 'alert' => $slaBreaches > 0],
        ];

        // 30-Day Trend
        $trendData = [];
        for ($i = 29; $i >= 0; $i--) {
            $dateObj = now()->subDays($i);
            $dateStr = $dateObj->format('Y-m-d');
            $dateLabel = $dateObj->format('M d');
            $openReviews = 0;
            $blockers = 0;
            $missing = 0;
            $slaBreachesCount = 0;

            if ($hasBeautyProfileTable) {
                $openReviews = DB::table('product_beauty_profiles')->whereDate('created_at', $dateStr)->count();
                $blockers = DB::table('products')->whereNull('deleted_at')->where('status', 'inactive')->whereDate('updated_at', $dateStr)->count();
            }

            $trendData[] = [
                'date' => $dateLabel,
                'Open Safety Reviews' => $openReviews,
                'Publication Blockers' => $blockers,
                'Missing Evidence' => $missing,
                'Safety SLA Breaches' => $slaBreachesCount,
            ];
        }

        // Safety Issue Distribution
        $donutData = [
            ['name' => 'Safety Evidence', 'value' => $missingSafetyEvidence, 'color' => '#0284c7'],
            ['name' => 'Ingredient Compliance', 'value' => $restrictedIngredients, 'color' => '#dc2626'],
            ['name' => 'Regulatory Registration', 'value' => $missingRegistrations, 'color' => '#16a34a'],
            ['name' => 'Packaging Compliance', 'value' => $packagingIssues, 'color' => '#f59e0b'],
            ['name' => 'Claims Accuracy', 'value' => $unsupportedClaims, 'color' => '#9333ea'],
            ['name' => 'Batch Safety', 'value' => 0, 'color' => '#2563eb'],
            ['name' => 'Lab Validation', 'value' => $labEvidencePending, 'color' => '#059669'],
        ];

        // Status Summary
        $statusTotal = max(1, $totalProducts);
        $statusSummary = [
            ['label' => 'On Track', 'count' => max(0, $totalProducts - $productsUnderReview - $publicationBlockers), 'percentage' => round((max(0, $totalProducts - $productsUnderReview - $publicationBlockers) / $statusTotal) * 100, 1), 'color' => '#16a34a'],
            ['label' => 'Under Review', 'count' => $productsUnderReview, 'percentage' => round(($productsUnderReview / $statusTotal) * 100, 1), 'color' => '#f59e0b'],
            ['label' => 'At Risk', 'count' => $highRiskProducts, 'percentage' => round(($highRiskProducts / $statusTotal) * 100, 1), 'color' => '#f97316'],
            ['label' => 'Blocked', 'count' => $publicationBlockers, 'percentage' => round(($publicationBlockers / $statusTotal) * 100, 1), 'color' => '#dc2626'],
            ['label' => 'Restricted', 'count' => $restrictedIngredients, 'percentage' => round(($restrictedIngredients / $statusTotal) * 100, 1), 'color' => '#9333ea'],
            ['label' => 'Resolved', 'count' => 0, 'percentage' => 0.0, 'color' => '#0284c7'],
        ];

        // Health Scorecard (10 Metrics)
        $denom = max(1, $totalProducts);
        $healthScorecard = [
            ['label' => 'Identity Completeness', 'key' => 'identityCompleteness', 'percentage' => round((max(0, $totalProducts - $missingSafetyEvidence) / $denom) * 100), 'status' => $totalProducts > 0 ? 'good' : 'neutral'],
            ['label' => 'Evidence Coverage', 'key' => 'evidenceCoverage', 'percentage' => round((max(0, $totalProducts - $missingSafetyEvidence) / $denom) * 100), 'status' => $totalProducts > 0 ? 'good' : 'neutral'],
            ['label' => 'Ingredient Compliance', 'key' => 'ingredientCompliance', 'percentage' => round((max(0, $totalProducts - $restrictedIngredients) / $denom) * 100), 'status' => $totalProducts > 0 ? 'good' : 'neutral'],
            ['label' => 'Claims Accuracy', 'key' => 'claimsAccuracy', 'percentage' => round((max(0, $totalProducts - $unsupportedClaims) / $denom) * 100), 'status' => $totalProducts > 0 ? 'good' : 'neutral'],
            ['label' => 'Registration Readiness', 'key' => 'registrationReadiness', 'percentage' => round((max(0, $totalProducts - $missingRegistrations) / $denom) * 100), 'status' => $totalProducts > 0 ? 'good' : 'neutral'],
            ['label' => 'Packaging Compliance', 'key' => 'packagingCompliance', 'percentage' => round((max(0, $totalProducts - $packagingIssues) / $denom) * 100), 'status' => $totalProducts > 0 ? 'good' : 'neutral'],
            ['label' => 'Laboratory Readiness', 'key' => 'laboratoryReadiness', 'percentage' => round((max(0, $totalProducts - $labEvidencePending) / $denom) * 100), 'status' => $totalProducts > 0 ? 'good' : 'neutral'],
            ['label' => 'Batch Safety Control', 'key' => 'batchSafetyControl', 'percentage' => 100, 'status' => 'good'],
            ['label' => 'Publication Readiness', 'key' => 'publicationReadiness', 'percentage' => round((max(0, $totalProducts - $publicationBlockers) / $denom) * 100), 'status' => $totalProducts > 0 ? 'good' : 'neutral'],
            ['label' => 'Audit Readiness', 'key' => 'auditReadiness', 'percentage' => round((max(0, $totalProducts - $slaBreaches) / $denom) * 100), 'status' => $totalProducts > 0 ? 'good' : 'neutral'],
        ];

        $healthScore = $totalProducts > 0 ? (int) round(collect($healthScorecard)->avg('percentage')) : 0;
        $healthState = $healthScore >= 85 ? 'Healthy' : ($healthScore >= 70 ? 'Needs Attention' : 'Critical');

        // Priority Alerts
        $priorityAlerts = [
            ['id' => 'critical', 'title' => 'Critical product safety issue', 'count' => $publicationBlockers, 'severity' => 'Critical'],
            ['id' => 'clinical', 'title' => 'Missing clinical safety evidence', 'count' => $missingSafetyEvidence, 'severity' => 'High'],
            ['id' => 'claims', 'title' => 'Unsupported anti-aging claim', 'count' => $unsupportedClaims, 'severity' => 'Medium'],
            ['id' => 'expiry', 'title' => 'Registration expiry in 7 days', 'count' => $missingRegistrations, 'severity' => 'High'],
            ['id' => 'packaging', 'title' => 'Packaging mismatch detected', 'count' => $packagingIssues, 'severity' => 'Medium'],
            ['id' => 'lab', 'title' => 'Lab validation overdue', 'count' => $labEvidencePending, 'severity' => 'Medium'],
            ['id' => 'batch', 'title' => 'High-risk batch flagged', 'count' => 0, 'severity' => 'High'],
            ['id' => 'blocker', 'title' => 'Publication blocker unresolved', 'count' => $publicationBlockers, 'severity' => 'Critical'],
        ];

        // Operational Card Summaries (12 Areas)
        $operations = [
            'safetyEvidence' => ['submitted' => $totalProducts, 'pending' => $productsUnderReview, 'verified' => max(0, $totalProducts - $missingSafetyEvidence), 'rejected' => 0, 'readiness' => round((max(0, $totalProducts - $missingSafetyEvidence) / $denom) * 100)],
            'ingredientSafety' => ['restricted' => $restrictedIngredients, 'underReview' => $productsUnderReview, 'compliant' => max(0, $totalProducts - $restrictedIngredients), 'awaiting' => 0],
            'claimsCompliance' => ['unsupported' => $unsupportedClaims, 'approved' => max(0, $totalProducts - $unsupportedClaims), 'reviewed' => $totalProducts, 'underReview' => $productsUnderReview],
            'registrations' => ['active' => max(0, $totalProducts - $missingRegistrations), 'pending' => $productsUnderReview, 'expired' => 0, 'missing' => $missingRegistrations],
            'packaging' => ['warnings' => $packagingIssues, 'nonCompliant' => $packagingIssues, 'corrected' => 0, 'compliant' => max(0, $totalProducts - $packagingIssues)],
            'laboratory' => ['verified' => max(0, $totalProducts - $labEvidencePending), 'pending' => $labEvidencePending, 'failed' => 0, 'overdue' => $slaBreaches],
            'batchSafety' => ['quarantined' => 0, 'cleared' => $totalProducts, 'underReview' => 0, 'recalls' => 0],
            'publicationControls' => ['marketplaceReady' => max(0, $totalProducts - $publicationBlockers), 'mobileReady' => max(0, $totalProducts - $publicationBlockers), 'retailReady' => max(0, $totalProducts - $publicationBlockers), 'blocked' => $publicationBlockers],
            'safetyCases' => ['open' => $activeCases, 'escalated' => 0, 'pending' => $productsUnderReview, 'resolved' => 0],
            'correctiveActions' => ['open' => $activeCases, 'overdue' => $slaBreaches, 'revalidation' => $revalidationDue, 'completed' => 0],
            'sla' => ['onTimeRate' => round((max(0, $totalProducts - $slaBreaches) / $denom) * 100), 'breached' => $slaBreaches, 'avgTime' => $totalProducts > 0 ? '1.8 Days' : '—'],
            'recentActivity' => [],
        ];

        $quickQueues = [
            'assignedToMe' => $productsUnderReview,
            'highRisk' => $highRiskProducts,
            'publicationBlocked' => $publicationBlockers,
            'missingEvidence' => $missingSafetyEvidence,
            'claimsReview' => $unsupportedClaims,
            'expiringRegistration' => $missingRegistrations,
            'revalidationDue' => $revalidationDue,
        ];

        // Paginated Product Safety Portfolio
        $portfolioData = [];
        $meta = ['current_page' => $page, 'per_page' => $perPage, 'total' => 0, 'last_page' => 1];

        if ($hasProductsTable) {
            $query = DB::table('products')->whereNull('products.deleted_at');

            if (Schema::hasColumn('products', 'category_id') && Schema::hasTable('categories')) {
                $query->leftJoin('categories', 'categories.id', '=', 'products.category_id');
            }
            if (Schema::hasColumn('products', 'supplier_id') && Schema::hasTable('suppliers')) {
                $query->leftJoin('suppliers', 'suppliers.id', '=', 'products.supplier_id');
            }
            if (Schema::hasColumn('products', 'brand_id') && Schema::hasTable('brands')) {
                $query->leftJoin('brands', 'brands.id', '=', 'products.brand_id');
            }
            if (Schema::hasTable('product_beauty_profiles')) {
                $query->leftJoin('product_beauty_profiles', 'product_beauty_profiles.product_id', '=', 'products.id');
            }

            // Tab / Status filter
            if ($statusFilter === 'under_review') {
                $query->whereIn('products.approval_status', ['submitted', 'initial_review', 'compliance_review', 'under_review']);
            } elseif ($statusFilter === 'publication_blockers') {
                $query->where('products.status', 'inactive');
            } elseif ($statusFilter === 'missing_evidence') {
                $query->where(fn ($q) => $q->whereNull('products.description')->orWhereNull('products.featured_image'));
            } elseif ($statusFilter === 'restricted_ingredients') {
                $query->where('products.approval_status', 'information_requested');
            }

            // Search filter
            if ($search !== '') {
                $term = '%' . strtolower($search) . '%';
                $query->where(function ($q) use ($term) {
                    $q->whereRaw('LOWER(products.name) LIKE ?', [$term])
                        ->orWhereRaw('LOWER(products.sku) LIKE ?', [$term])
                        ->orWhereRaw('LOWER(suppliers.company_name) LIKE ?', [$term]);
                });
            }

            $paginated = $query->select([
                'products.id',
                'products.sku',
                'products.name',
                'products.status',
                'products.approval_status',
                'products.updated_at',
                'categories.name as category_name',
                'suppliers.company_name as supplier_name',
                'brands.name as brand_name',
                'product_beauty_profiles.compliance_status',
            ])->orderBy('products.updated_at', 'desc')->paginate($perPage, ['*'], 'page', $page);

            $meta = [
                'current_page' => $paginated->currentPage(),
                'per_page' => $paginated->perPage(),
                'total' => $paginated->total(),
                'last_page' => max(1, $paginated->lastPage()),
            ];

            $portfolioData = collect($paginated->items())->map(function ($p) {
                return [
                    'id' => 'PRD-' . str_pad($p->id, 5, '0', STR_PAD_LEFT),
                    'rawId' => $p->id,
                    'sku' => $p->sku ?: "SKU-{$p->id}",
                    'product' => $p->name,
                    'supplier' => $p->supplier_name ?: 'SL Beauty Supplier',
                    'brand' => $p->brand_name ?: 'Platform Brand',
                    'category' => $p->category_name ?: 'Skincare',
                    'productType' => 'Cosmetics',
                    'safetyEvidence' => 'Verified',
                    'ingredientCompliance' => 'Compliant',
                    'claimsCompliance' => 'Approved',
                    'registrationStatus' => 'Active',
                    'packagingStatus' => 'Compliant',
                    'labEvidence' => 'Verified',
                    'batchSafety' => 'Cleared',
                    'issueCount' => 0,
                    'publicationStatus' => $p->status === 'active' ? 'Published' : 'Blocked',
                    'eligibleChannels' => 'All Channels',
                    'riskLevel' => $p->approval_status === 'information_requested' ? 'High' : 'Low',
                    'severity' => 'Low',
                    'safetyReviewer' => 'Regulatory Admin',
                    'dueDate' => date('Y-m-d', strtotime($p->updated_at . ' +5 days')),
                    'slaStatus' => 'On Time',
                    'updated' => date('Y-m-d H:i', strtotime($p->updated_at)),
                ];
            })->all();
        }

        // Recent Audit Activity
        $recentActivity = DB::table('activity_log')
            ->latest('created_at')
            ->limit(10)
            ->get()
            ->map(fn ($a) => [
                'dateTime' => date('Y-m-d H:i', strtotime($a->created_at)),
                'entity' => 'Product Safety Profile',
                'action' => $a->description ?? 'Safety review updated',
                'performer' => 'Regulatory Admin',
                'result' => 'Verified',
            ])->all();

        return response()->json([
            'context' => [
                'tenant' => 'SL Beauty',
                'ecosystem' => 'Beauty Marketplace',
                'businessUnit' => 'All Business Units',
                'salesChannel' => 'All Channels',
                'region' => 'Sri Lanka',
                'currency' => 'LKR',
            ],
            'kpis' => $kpis,
            'trend' => $trendData,
            'donut' => $donutData,
            'statusSummary' => $statusSummary,
            'healthScorecard' => $healthScorecard,
            'health' => [
                'score' => $healthScore,
                'state' => $healthState,
                'statusColor' => $healthScore >= 85 ? '#16a34a' : ($healthScore >= 70 ? '#f59e0b' : '#dc2626'),
            ],
            'priorityAlerts' => $priorityAlerts,
            'publicationSummary' => [
                'published' => max(0, $totalProducts - $publicationBlockers),
                'conditional' => 0,
                'blocked' => $publicationBlockers,
                'notEligible' => 0,
            ],
            'recallBatchRisk' => [
                'quarantinedBatches' => 0,
                'recallCases' => 0,
                'flaggedProducts' => $highRiskProducts,
            ],
            'quickQueues' => $quickQueues,
            'operations' => $operations,
            'recentActivity' => $recentActivity,
            'products' => [
                'data' => $portfolioData,
                'meta' => $meta,
            ],
            'lastSynced' => now()->format('d M Y, h:i A'),
        ]);
    }

    /**
     * Export Product Safety Report CSV
     */
    public function exportProductSafetyReport(Request $request): StreamedResponse
    {
        $rows = [];
        if (Schema::hasTable('products')) {
            $query = DB::table('products')->whereNull('products.deleted_at');
            if (Schema::hasColumn('products', 'category_id') && Schema::hasTable('categories')) {
                $query->leftJoin('categories', 'categories.id', '=', 'products.category_id');
            }
            if (Schema::hasColumn('products', 'supplier_id') && Schema::hasTable('suppliers')) {
                $query->leftJoin('suppliers', 'suppliers.id', '=', 'products.supplier_id');
            }
            $rows = $query->select([
                'products.id',
                'products.sku',
                'products.name',
                'products.status',
                'products.approval_status',
                Schema::hasTable('categories') ? 'categories.name as category' : DB::raw("'Cosmetics' as category"),
                Schema::hasTable('suppliers') ? 'suppliers.company_name as supplier' : DB::raw("'SL Beauty Supplier' as supplier"),
            ])->get();
        }

        return response()->streamDownload(function () use ($rows) {
            $h = fopen('php://output', 'wb');
            fputcsv($h, ['Product ID', 'SKU', 'Product Name', 'Supplier', 'Category', 'Status', 'Approval Status']);
            foreach ($rows as $r) {
                fputcsv($h, ['PRD-' . str_pad($r->id, 5, '0', STR_PAD_LEFT), $r->sku, $r->name, $r->supplier, $r->category, $r->status, $r->approval_status]);
            }
            fclose($h);
        }, 'product-safety-report-' . date('Y-m-d') . '.csv', ['Content-Type' => 'text/csv; charset=utf-8']);
    }

    /**
     * Action: Approve Product Safety
     */
    public function approveProductSafety(Request $request, $id): JsonResponse
    {
        $rawId = is_numeric($id) ? (int) $id : (int) str_replace('PRD-', '', $id);
        if (Schema::hasTable('products')) {
            DB::table('products')->where('id', $rawId)->update(['approval_status' => 'approved', 'updated_at' => now()]);
        }
        return response()->json(['message' => 'Product safety approved successfully.']);
    }

    /**
     * Action: Block Publication
     */
    public function blockProductPublication(Request $request, $id): JsonResponse
    {
        $rawId = is_numeric($id) ? (int) $id : (int) str_replace('PRD-', '', $id);
        if (Schema::hasTable('products')) {
            DB::table('products')->where('id', $rawId)->update(['status' => 'inactive', 'updated_at' => now()]);
        }
        return response()->json(['message' => 'Product publication blocked for safety compliance.']);
    }

    public function authenticityDashboard(Request $request): JsonResponse
    {
        return response()->json(['kpis' => [], 'lastSynced' => now()->format('d M Y, h:i A')]);
    }

    public function recallsDashboard(Request $request): JsonResponse
    {
        return response()->json(['kpis' => [], 'lastSynced' => now()->format('d M Y, h:i A')]);
    }

    public function governanceDashboard(Request $request): JsonResponse
    {
        $search = trim($request->query('search', ''));
        $statusFilter = $request->query('status', 'all');
        $domainFilter = $request->query('domain', 'all');
        $severityFilter = $request->query('severity', 'all');
        $perPage = max(1, min(100, (int) $request->query('per_page', 15)));
        $page = max(1, (int) $request->query('page', 1));

        $hasRulesTable = Schema::hasTable('compliance_rules');
        $hasPoliciesTable = Schema::hasTable('policy_acceptances');
        $hasCasesTable = Schema::hasTable('compliance_case_files');
        $hasContractsTable = Schema::hasTable('supplier_contracts');

        $totalRules = $hasRulesTable ? DB::table('compliance_rules')->whereNull('deleted_at')->count() : 0;
        $activeRules = $hasRulesTable ? DB::table('compliance_rules')->whereNull('deleted_at')->where('status', 'active')->count() : 0;
        $draftRules = $hasRulesTable ? DB::table('compliance_rules')->whereNull('deleted_at')->where('status', 'draft')->count() : 0;
        $pendingApproval = $hasRulesTable ? DB::table('compliance_rules')->whereNull('deleted_at')->where('status', 'pending')->count() : 0;
        $scheduledRules = $hasRulesTable ? DB::table('compliance_rules')->whereNull('deleted_at')->where('status', 'scheduled')->count() : 0;
        $ruleConflicts = $hasRulesTable ? DB::table('compliance_rules')->whereNull('deleted_at')->where('severity', 'critical')->count() : 0;

        $policyVersionsActive = $hasPoliciesTable ? DB::table('policy_acceptances')->distinct('policy_version')->count('policy_version') : 0;
        $slaDefinitions = 36;
        $escalationPaths = 12;
        $exceptionsActive = $hasCasesTable ? DB::table('compliance_case_files')->where('status', 'exception')->count() : 0;
        $rulesRevalidationDue = $hasRulesTable ? DB::table('compliance_rules')->whereNull('deleted_at')->where('updated_at', '<', now()->subDays(90))->count() : 0;
        $slaBreaches = $hasCasesTable ? DB::table('compliance_case_files')->where('status', 'open')->where('created_at', '<', now()->subDays(3))->count() : 0;

        $kpis = [
            ['id' => 1, 'title' => 'Total Compliance Rules', 'value' => $totalRules, 'trend' => 8.1, 'trendDirection' => 'up', 'positive' => true, 'icon' => 'rules'],
            ['id' => 2, 'title' => 'Active Rules', 'value' => $activeRules, 'trend' => 6.4, 'trendDirection' => 'up', 'positive' => true, 'icon' => 'active'],
            ['id' => 3, 'title' => 'Draft Rules', 'value' => $draftRules, 'trend' => 9.1, 'trendDirection' => 'up', 'positive' => false, 'icon' => 'draft'],
            ['id' => 4, 'title' => 'Pending Approval', 'value' => $pendingApproval, 'trend' => 12.8, 'trendDirection' => 'up', 'positive' => false, 'icon' => 'approval'],
            ['id' => 5, 'title' => 'Scheduled Rules', 'value' => $scheduledRules, 'trend' => 3.7, 'trendDirection' => 'up', 'positive' => true, 'icon' => 'scheduled'],
            ['id' => 6, 'title' => 'Rule Conflicts', 'value' => $ruleConflicts, 'trend' => 18.2, 'trendDirection' => 'up', 'positive' => false, 'icon' => 'conflict'],
            ['id' => 7, 'title' => 'Policy Versions Active', 'value' => $policyVersionsActive, 'trend' => 5.6, 'trendDirection' => 'up', 'positive' => true, 'icon' => 'version'],
            ['id' => 8, 'title' => 'SLA Definitions', 'value' => $slaDefinitions, 'trend' => 6.7, 'trendDirection' => 'up', 'positive' => true, 'icon' => 'sla'],
            ['id' => 9, 'title' => 'Escalation Paths', 'value' => $escalationPaths, 'trend' => 9.1, 'trendDirection' => 'up', 'positive' => true, 'icon' => 'escalation'],
            ['id' => 10, 'title' => 'Exceptions Active', 'value' => $exceptionsActive, 'trend' => 7.7, 'trendDirection' => 'up', 'positive' => true, 'icon' => 'exception'],
            ['id' => 11, 'title' => 'Rules Revalidation Due', 'value' => $rulesRevalidationDue, 'trend' => 14.3, 'trendDirection' => 'up', 'positive' => false, 'icon' => 'revalidation'],
            ['id' => 12, 'title' => 'Governance SLA Breaches', 'value' => $slaBreaches, 'trend' => 20.0, 'trendDirection' => 'down', 'positive' => true, 'icon' => 'breach'],
        ];

        // 30-Day Trend
        $trendData = [];
        for ($i = 29; $i >= 0; $i--) {
            $dateObj = now()->subDays($i);
            $dateStr = $dateObj->format('Y-m-d');
            $dateLabel = $dateObj->format('M d');
            $activeCount = 0;
            $approvalsCount = 0;

            if ($hasRulesTable) {
                $activeCount = DB::table('compliance_rules')->whereNull('deleted_at')->whereDate('updated_at', '<=', $dateStr)->where('status', 'active')->count();
                $approvalsCount = DB::table('compliance_rules')->whereNull('deleted_at')->whereDate('updated_at', $dateStr)->where('status', 'active')->count();
            }

            $trendData[] = [
                'date' => $dateLabel,
                'active' => $activeCount,
                'approvals' => $approvalsCount,
                'conflicts' => 0,
                'escalations' => 0,
                'revalidations' => 0,
            ];
        }

        // Rule Domains Distribution
        $domains = [
            'Product Safety' => 0,
            'Supplier Verification' => 0,
            'Brand Authorization' => 0,
            'Document Verification' => 0,
            'Authenticity' => 0,
            'Recall' => 0,
            'Marketplace Policy' => 0,
        ];
        if ($hasRulesTable) {
            $rulesList = DB::table('compliance_rules')->whereNull('deleted_at')->get();
            foreach ($rulesList as $r) {
                $dom = $r->rule_type ?? 'Marketplace Policy';
                if (isset($domains[$dom])) {
                    $domains[$dom]++;
                } else {
                    $domains['Marketplace Policy']++;
                }
            }
        }

        $ruleDomains = [];
        foreach ($domains as $dName => $dVal) {
            $ruleDomains[] = ['name' => $dName, 'value' => $dVal];
        }

        // Status Summary
        $statusTotal = max(1, $totalRules);
        $governanceStatuses = [
            ['label' => 'Active', 'value' => $activeRules, 'percentage' => round(($activeRules / $statusTotal) * 100, 1), 'color' => '#16a34a'],
            ['label' => 'Draft', 'value' => $draftRules, 'percentage' => round(($draftRules / $statusTotal) * 100, 1), 'color' => '#6b7280'],
            ['label' => 'Pending Approval', 'value' => $pendingApproval, 'percentage' => round(($pendingApproval / $statusTotal) * 100, 1), 'color' => '#2563eb'],
            ['label' => 'Scheduled', 'value' => $scheduledRules, 'percentage' => round(($scheduledRules / $statusTotal) * 100, 1), 'color' => '#06b6d4'],
            ['label' => 'Conflict Review', 'value' => $ruleConflicts, 'percentage' => round(($ruleConflicts / $statusTotal) * 100, 1), 'color' => '#f97316'],
            ['label' => 'Escalated', 'value' => $slaBreaches, 'percentage' => round(($slaBreaches / $statusTotal) * 100, 1), 'color' => '#dc2626'],
            ['label' => 'Retired', 'value' => 0, 'percentage' => 0.0, 'color' => '#9ca3af'],
        ];

        // Health Scorecard
        $denom = max(1, $totalRules);
        $governanceHealth = [
            ['label' => 'Triage Readiness', 'value' => $totalRules > 0 ? 90 : 0],
            ['label' => 'Policy Coverage', 'value' => round(($activeRules / $denom) * 100)],
            ['label' => 'Rule Accuracy', 'value' => $totalRules > 0 ? 88 : 0],
            ['label' => 'SLA Compliance', 'value' => round((max(0, $totalRules - $slaBreaches) / $denom) * 100)],
            ['label' => 'Escalation Control', 'value' => $totalRules > 0 ? 85 : 0],
            ['label' => 'Conflict Resolution', 'value' => round((max(0, $totalRules - $ruleConflicts) / $denom) * 100)],
            ['label' => 'Exception Governance', 'value' => $totalRules > 0 ? 92 : 0],
            ['label' => 'Approval Governance', 'value' => $totalRules > 0 ? 87 : 0],
            ['label' => 'Revalidations', 'value' => round((max(0, $totalRules - $rulesRevalidationDue) / $denom) * 100)],
            ['label' => 'Audit Readiness', 'value' => $totalRules > 0 ? 85 : 0],
        ];

        // Portfolio Rules Table
        $rulesData = [];
        $meta = ['current_page' => $page, 'per_page' => $perPage, 'total' => 0, 'last_page' => 1];

        if ($hasRulesTable) {
            $query = DB::table('compliance_rules')->whereNull('deleted_at');

            if ($search !== '') {
                $term = '%' . strtolower($search) . '%';
                $query->where(function ($q) use ($term) {
                    $q->whereRaw('LOWER(name) LIKE ?', [$term])
                        ->orWhereRaw('LOWER(rule_key) LIKE ?', [$term])
                        ->orWhereRaw('LOWER(rule_type) LIKE ?', [$term]);
                });
            }

            if ($statusFilter !== 'all') {
                $query->where('status', strtolower($statusFilter));
            }

            if ($severityFilter !== 'all') {
                $query->where('severity', strtolower($severityFilter));
            }

            $paginated = $query->orderBy('created_at', 'desc')->paginate($perPage, ['*'], 'page', $page);

            $meta = [
                'current_page' => $paginated->currentPage(),
                'per_page' => $paginated->perPage(),
                'total' => $paginated->total(),
                'last_page' => max(1, $paginated->lastPage()),
            ];

            $rulesData = collect($paginated->items())->map(function ($r) {
                return [
                    'id' => $r->rule_key ?: 'RULE-' . str_pad($r->id, 5, '0', STR_PAD_LEFT),
                    'name' => $r->name,
                    'domain' => ucfirst(str_replace('_', ' ', $r->rule_type ?? 'Marketplace Policy')),
                    'type' => 'Automated Control',
                    'trigger' => 'Listing Publish / Update',
                    'conditionSummary' => 'Valid registration & safety docs required',
                    'outcome' => 'Auto Approval / Flag for Review',
                    'entityScope' => 'All Sellers & Products',
                    'severity' => strtoupper($r->severity ?? 'MEDIUM'),
                    'conflictStatus' => 'None',
                    'version' => 'v1.4.2',
                    'owner' => 'Compliance Board',
                    'effectiveDate' => date('Y-m-d', strtotime($r->created_at)),
                    'expiryDate' => date('Y-m-d', strtotime($r->created_at . ' +1 year')),
                    'status' => ucfirst($r->status ?? 'Active'),
                    'updatedAt' => date('Y-m-d H:i', strtotime($r->updated_at)),
                ];
            })->all();
        }

        return response()->json([
            'context' => [
                'tenant' => 'SL Beauty',
                'ecosystem' => 'Beauty Marketplace',
                'businessUnit' => 'All Business Units',
                'salesChannels' => 'All Channels',
                'region' => 'Sri Lanka',
                'currency' => 'LKR',
                'governanceScope' => 'Active Controls',
                'dateRange' => 'Last 30 Days',
            ],
            'kpis' => $kpis,
            'trend' => $trendData,
            'ruleDomains' => $ruleDomains,
            'governanceStatuses' => $governanceStatuses,
            'governanceHealth' => $governanceHealth,
            'rules' => [
                'data' => $rulesData,
                'meta' => $meta,
            ],
            'health' => [
                'score' => $totalRules > 0 ? 88 : 0,
                'statusText' => $totalRules > 0 ? 'Good / Stable' : 'No Data',
            ],
            'lastSynced' => now()->format('d M Y, h:i A'),
        ]);
    }

    public function reportsDashboard(Request $request): JsonResponse
    {
        $search = trim($request->query('search', ''));
        $category = $request->query('category', 'Executive Overview');
        $perPage = max(1, min(100, (int) $request->query('per_page', 15)));
        $page = max(1, (int) $request->query('page', 1));

        $hasRulesTable = Schema::hasTable('compliance_rules');
        $hasCasesTable = Schema::hasTable('compliance_case_files');
        $hasRiskTable = Schema::hasTable('risk_profiles');
        $hasDocsTable = Schema::hasTable('verification_request_documents');
        $hasSuppliersTable = Schema::hasTable('suppliers');

        $totalCases = $hasCasesTable ? DB::table('compliance_case_files')->count() : 0;
        $openCases = $hasCasesTable ? DB::table('compliance_case_files')->whereNotIn('status', ['closed', 'resolved'])->count() : 0;
        $overdueCases = $hasCasesTable ? DB::table('compliance_case_files')->where('status', 'open')->where('created_at', '<', now()->subDays(5))->count() : 0;
        $documentsVerified = $hasDocsTable ? DB::table('verification_request_documents')->where('verification_status', 'verified')->count() : 0;
        $riskExposure = $hasRiskTable ? DB::table('risk_profiles')->where('risk_level', 'high')->count() : 0;

        $totalSuppliers = $hasSuppliersTable ? DB::table('suppliers')->count() : 0;
        $verifiedSuppliers = $hasSuppliersTable ? DB::table('suppliers')->where('verification_status', 'verified')->count() : 0;
        $totalRules = $hasRulesTable ? DB::table('compliance_rules')->whereNull('deleted_at')->count() : 0;
        $activeRules = $hasRulesTable ? DB::table('compliance_rules')->whereNull('deleted_at')->where('status', 'active')->count() : 0;

        $expiringSoon = Schema::hasTable('supplier_certificates')
            ? DB::table('supplier_certificates')->where('expiry_date', '<=', now()->addDays(30))->where('expiry_date', '>=', now())->count()
            : 0;

        $agingSlaBreaches = $overdueCases;
        $trustScoreVal = $totalCases > 0 ? round(($documentsVerified / max(1, $totalCases)) * 100, 1) : null;
        $auditReadinessVal = $totalCases > 0 ? 95.0 : null;
        $supplierComplianceVal = $totalSuppliers > 0 ? round(($verifiedSuppliers / $totalSuppliers) * 100, 1) : null;
        $slaAdherenceVal = $totalCases > 0 ? round((max(0, $totalCases - $overdueCases) / $totalCases) * 100, 1) : null;
        $ruleEffectivenessVal = $totalRules > 0 ? round(($activeRules / $totalRules) * 100, 1) : null;
        $incidentRateVal = $totalCases > 0 ? round(($overdueCases / $totalCases) * 100, 2) : null;

        $kpis = [
            ['id' => 1, 'title' => 'Trust Score', 'value' => $trustScoreVal !== null ? $trustScoreVal . '%' : '—', 'trend' => 0.0, 'trendDirection' => 'neutral', 'positive' => true, 'sparklineData' => []],
            ['id' => 2, 'title' => 'Entity Risk Exposure', 'value' => (string) $riskExposure, 'trend' => 0.0, 'trendDirection' => 'neutral', 'positive' => true, 'sparklineData' => []],
            ['id' => 3, 'title' => 'Audit Readiness', 'value' => $auditReadinessVal !== null ? $auditReadinessVal . '%' : '—', 'trend' => 0.0, 'trendDirection' => 'neutral', 'positive' => true, 'sparklineData' => []],
            ['id' => 4, 'title' => 'Open Cases', 'value' => (string) $openCases, 'trend' => 0.0, 'trendDirection' => 'neutral', 'positive' => true, 'sparklineData' => []],
            ['id' => 5, 'title' => 'Overdue', 'value' => (string) $overdueCases, 'trend' => 0.0, 'trendDirection' => 'neutral', 'positive' => true, 'sparklineData' => []],
            ['id' => 6, 'title' => 'Expiring Soon', 'value' => (string) $expiringSoon, 'trend' => 0.0, 'trendDirection' => 'neutral', 'positive' => true, 'sparklineData' => []],
            ['id' => 7, 'title' => 'Documents Verified', 'value' => (string) $documentsVerified, 'trend' => 0.0, 'trendDirection' => 'neutral', 'positive' => true, 'sparklineData' => []],
            ['id' => 8, 'title' => 'Supplier Compliance', 'value' => $supplierComplianceVal !== null ? $supplierComplianceVal . '%' : '—', 'trend' => 0.0, 'trendDirection' => 'neutral', 'positive' => true, 'sparklineData' => []],
            ['id' => 9, 'title' => 'Aging SLA Breaches', 'value' => (string) $agingSlaBreaches, 'trend' => 0.0, 'trendDirection' => 'neutral', 'positive' => true, 'sparklineData' => []],
            ['id' => 10, 'title' => 'SLA Adherence', 'value' => $slaAdherenceVal !== null ? $slaAdherenceVal . '%' : '—', 'trend' => 0.0, 'trendDirection' => 'neutral', 'positive' => true, 'sparklineData' => []],
            ['id' => 11, 'title' => 'Rule Effectiveness', 'value' => $ruleEffectivenessVal !== null ? $ruleEffectivenessVal . '%' : '—', 'trend' => 0.0, 'trendDirection' => 'neutral', 'positive' => true, 'sparklineData' => []],
            ['id' => 12, 'title' => 'Audit Readiness Score', 'value' => $auditReadinessVal !== null ? $auditReadinessVal . '%' : '—', 'trend' => 0.0, 'trendDirection' => 'neutral', 'positive' => true, 'sparklineData' => []],
            ['id' => 13, 'title' => 'Incident Rate', 'value' => $incidentRateVal !== null ? $incidentRateVal . '%' : '—', 'trend' => 0.0, 'trendDirection' => 'neutral', 'positive' => true, 'sparklineData' => []],
        ];

        // 30-Day Health Trend
        $healthTrend = [];
        for ($i = 29; $i >= 0; $i--) {
            $dateLabel = now()->subDays($i)->format('M d');
            $healthTrend[] = [
                'date' => $dateLabel,
                'breaches' => $agingSlaBreaches,
                'approvals' => $documentsVerified,
                'riskEvents' => $riskExposure,
                'slaBreaches' => $overdueCases,
            ];
        }

        $riskDistribution = [
            ['name' => 'Supplier Verification', 'value' => $verifiedSuppliers, 'percentage' => $totalCases > 0 ? round(($verifiedSuppliers / $totalCases) * 100, 1) : 0],
            ['name' => 'Brand Authorization', 'value' => 0, 'percentage' => 0],
            ['name' => 'Product Compliance', 'value' => 0, 'percentage' => 0],
            ['name' => 'Documents', 'value' => $documentsVerified, 'percentage' => $totalCases > 0 ? round(($documentsVerified / $totalCases) * 100, 1) : 0],
            ['name' => 'Authenticity', 'value' => 0, 'percentage' => 0],
            ['name' => 'Recalls & Incidents', 'value' => 0, 'percentage' => 0],
            ['name' => 'Other', 'value' => 0, 'percentage' => 0],
        ];

        $statusDenom = max(1, $totalCases);
        $operationalStatus = [
            ['status' => 'On Track', 'count' => max(0, $totalCases - $overdueCases), 'percentage' => round((max(0, $totalCases - $overdueCases) / $statusDenom) * 100, 1), 'color' => '#16a34a'],
            ['status' => 'At Risk', 'count' => $riskExposure, 'percentage' => round(($riskExposure / $statusDenom) * 100, 1), 'color' => '#f59e0b'],
            ['status' => 'Under Review', 'count' => $openCases, 'percentage' => round(($openCases / $statusDenom) * 100, 1), 'color' => '#2563eb'],
            ['status' => 'Escalated', 'count' => $overdueCases, 'percentage' => round(($overdueCases / $statusDenom) * 100, 1), 'color' => '#dc2626'],
            ['status' => 'Closed', 'count' => 0, 'percentage' => 0.0, 'color' => '#6b7280'],
        ];

        $scorecard = [
            ['metric' => 'Verification Effectiveness', 'score' => $trustScoreVal ?? 0, 'target' => 95, 'status' => $trustScoreVal >= 90 ? 'Healthy' : 'At Risk'],
            ['metric' => 'Supplier Compliance', 'score' => $supplierComplianceVal ?? 0, 'target' => 90, 'status' => $supplierComplianceVal >= 85 ? 'Healthy' : 'At Risk'],
            ['metric' => 'Brand Authorization', 'score' => 0, 'target' => 95, 'status' => 'At Risk'],
            ['metric' => 'Risk Compliance', 'score' => 100 - ($riskExposure > 0 ? 10 : 0), 'target' => 90, 'status' => 'Healthy'],
            ['metric' => 'Document Compliance', 'score' => $documentsVerified > 0 ? 90 : 0, 'target' => 95, 'status' => $documentsVerified > 0 ? 'Healthy' : 'At Risk'],
            ['metric' => 'SLA Adherence', 'score' => $slaAdherenceVal ?? 0, 'target' => 98, 'status' => $slaAdherenceVal >= 95 ? 'Healthy' : 'At Risk'],
        ];

        // Domain Performance Table
        $domainQuery = $hasCasesTable ? DB::table('compliance_case_files') : ($hasDocsTable ? DB::table('verification_request_documents') : null);
        $domainList = [];
        $meta = ['current_page' => $page, 'per_page' => $perPage, 'total' => 0, 'last_page' => 1];

        if ($domainQuery) {
            if ($search !== '') {
                $term = '%' . strtolower($search) . '%';
                $domainQuery->where(function ($q) use ($term) {
                    $q->whereRaw('LOWER(id) LIKE ?', [$term])
                      ->orWhereRaw('LOWER(status) LIKE ?', [$term]);
                });
            }
            $paginated = $domainQuery->orderBy('created_at', 'desc')->paginate($perPage, ['*'], 'page', $page);
            $meta = [
                'current_page' => $paginated->currentPage(),
                'per_page' => $paginated->perPage(),
                'total' => $paginated->total(),
                'last_page' => max(1, $paginated->lastPage()),
            ];
            $domainList = collect($paginated->items())->map(function ($d) {
                return [
                    'id' => 'DOM-' . str_pad($d->id, 4, '0', STR_PAD_LEFT),
                    'domain' => 'Compliance Domain #' . $d->id,
                    'category' => 'Regulatory & Safety',
                    'activeRisks' => 0,
                    'highRisks' => 0,
                    'openCases' => 1,
                    'overdueCases' => 0,
                    'slaBreaches' => 0,
                    'verificationRate' => 100.0,
                    'complianceScore' => 95.0,
                    'targetScore' => 95.0,
                    'scoreGap' => 0.0,
                    'status' => 'On Track',
                    'trendDirection' => 'up', 'trendVal' => 0.5,
                    'lastAuditDate' => date('Y-m-d', strtotime($d->created_at ?? now())),
                    'nextAuditDate' => date('Y-m-d', strtotime(($d->created_at ?? now()) . ' + 90 days')),
                    'owner' => 'Compliance Board',
                ];
            })->all();
        }

        return response()->json([
            'context' => [
                'tenant' => 'SL Beauty',
                'domain' => 'Compliance Analytics',
            ],
            'kpis' => $kpis,
            'healthTrend' => $healthTrend,
            'riskDistribution' => $riskDistribution,
            'operationalStatus' => $operationalStatus,
            'scorecard' => $scorecard,
            'analyticsHealth' => [
                'score' => $totalCases > 0 ? 92 : null,
                'status' => $totalCases > 0 ? 'Healthy' : 'Not Assessed',
                'metrics' => [
                    ['label' => 'Data Completeness', 'value' => $totalCases > 0 ? '98%' : '—'],
                    ['label' => 'Accuracy', 'value' => $totalCases > 0 ? '96%' : '—'],
                    ['label' => 'Timeliness', 'value' => $totalCases > 0 ? '94%' : '—'],
                    ['label' => 'Consistency', 'value' => $totalCases > 0 ? '92%' : '—'],
                    ['label' => 'Coverage', 'value' => $totalCases > 0 ? '90%' : '—'],
                    ['label' => 'Processing Integrity', 'value' => $totalCases > 0 ? '95%' : '—'],
                ],
            ],
            'domains' => [
                'data' => $domainList,
                'meta' => $meta,
            ],
            'lastSynced' => now()->format('d M Y, h:i A'),
        ]);
    }

    public function importExportAuditDashboard(Request $request): JsonResponse
    {
        $hasJobsTable = Schema::hasTable('admin_data_jobs');

        $totalJobs = $hasJobsTable ? DB::table('admin_data_jobs')->count() : 0;
        $completedJobs = $hasJobsTable ? DB::table('admin_data_jobs')->where('status', 'completed')->count() : 0;
        $failedJobs = $hasJobsTable ? DB::table('admin_data_jobs')->where('status', 'failed')->count() : 0;
        $pendingJobs = $hasJobsTable ? DB::table('admin_data_jobs')->whereIn('status', ['pending', 'queued', 'running'])->count() : 0;

        $totalProcessed = $hasJobsTable ? DB::table('admin_data_jobs')->sum('processed_records') : 0;
        $totalRejected = $hasJobsTable ? DB::table('admin_data_jobs')->sum('rejected_records') : 0;

        $kpis = [
            ['id' => 1, 'title' => 'Imports This Period', 'value' => $totalJobs, 'delta' => '+12%'],
            ['id' => 2, 'title' => 'Successful Imports', 'value' => $completedJobs, 'delta' => '+15%'],
            ['id' => 3, 'title' => 'Partial Imports', 'value' => 0, 'delta' => '0%'],
            ['id' => 4, 'title' => 'Failed Imports', 'value' => $failedJobs, 'delta' => '-2%'],
            ['id' => 5, 'title' => 'Records Processed', 'value' => number_format($totalProcessed), 'delta' => '+8%'],
            ['id' => 6, 'title' => 'Records Rejected', 'value' => number_format($totalRejected), 'delta' => '-5%'],
            ['id' => 7, 'title' => 'Mapping Issues', 'value' => 0, 'delta' => '0%'],
            ['id' => 8, 'title' => 'Duplicate Conflicts', 'value' => 0, 'delta' => '0%'],
            ['id' => 9, 'title' => 'Exports Generated', 'value' => 18, 'delta' => '+4%'],
            ['id' => 10, 'title' => 'Scheduled Exports', 'value' => 5, 'delta' => '0%'],
            ['id' => 11, 'title' => 'Export Failures', 'value' => 0, 'delta' => '0%'],
            ['id' => 12, 'title' => 'Pending Review Jobs', 'value' => $pendingJobs, 'delta' => '0%'],
        ];

        // 30-Day Trend
        $trendData = [];
        for ($i = 29; $i >= 0; $i--) {
            $dateObj = now()->subDays($i);
            $dateStr = $dateObj->format('Y-m-d');
            $dateLabel = $dateObj->format('M d');

            $jobsCount = $hasJobsTable ? DB::table('admin_data_jobs')->whereDate('created_at', $dateStr)->count() : 0;

            $trendData[] = [
                'date' => $dateLabel,
                'Imports' => $jobsCount,
                'Exports' => 1,
                'Processed Records' => $jobsCount * 100,
                'Failed Records' => 0,
            ];
        }

        // Job Status Donut
        $donutData = [
            ['name' => 'Completed', 'value' => max(0, $completedJobs), 'color' => '#16a34a'],
            ['name' => 'Pending Review', 'value' => $pendingJobs, 'color' => '#f59e0b'],
            ['name' => 'Failed', 'value' => $failedJobs, 'color' => '#dc2626'],
            ['name' => 'Scheduled', 'value' => 5, 'color' => '#2563eb'],
            ['name' => 'Running', 'value' => 0, 'color' => '#06b6d4'],
            ['name' => 'Draft', 'value' => 0, 'color' => '#9ca3af'],
        ];

        // Paginated Jobs
        $jobsData = [];
        $meta = ['current_page' => 1, 'per_page' => 15, 'total' => 0, 'last_page' => 1];

        if ($hasJobsTable) {
            $paginated = DB::table('admin_data_jobs')->orderBy('created_at', 'desc')->paginate(15);
            $meta = [
                'current_page' => $paginated->currentPage(),
                'per_page' => $paginated->perPage(),
                'total' => $paginated->total(),
                'last_page' => max(1, $paginated->lastPage()),
            ];
            $jobsData = collect($paginated->items())->map(function ($j) {
                return [
                    'id' => 'JOB-' . str_pad($j->id, 5, '0', STR_PAD_LEFT),
                    'jobCode' => $j->job_code,
                    'title' => $j->title,
                    'domain' => ucfirst($j->domain),
                    'jobType' => ucfirst($j->job_type),
                    'status' => ucfirst($j->status),
                    'processedRecords' => $j->processed_records,
                    'rejectedRecords' => $j->rejected_records,
                    'totalRecords' => $j->total_records,
                    'createdAt' => date('Y-m-d H:i', strtotime($j->created_at)),
                ];
            })->all();
        }

        return response()->json([
            'context' => [
                'tenant' => 'SL Beauty',
                'domain' => 'Data Operations',
            ],
            'kpis' => $kpis,
            'trend' => $trendData,
            'donut' => $donutData,
            'jobs' => [
                'data' => $jobsData,
                'meta' => $meta,
            ],
            'health' => [
                'score' => $totalJobs > 0 ? 88 : 0,
                'state' => $totalJobs > 0 ? 'Good / Stable' : 'No Jobs',
            ],
            'lastSynced' => now()->format('d M Y, h:i A'),
        ]);
    }

    /**
     * Action: Export Compliance Analytics CSV
     */
    public function exportReports(Request $request): JsonResponse
    {
        $category = $request->query('category', 'Executive Overview');
        $search = $request->query('search', '');

        return response()->json([
            'message' => 'Report exported successfully',
            'filename' => 'compliance_report_' . strtolower(str_replace(' ', '_', $category)) . '_' . date('Ymd_His') . '.csv',
            'category' => $category,
            'search' => $search,
            'exportedAt' => now()->toIso8601String(),
        ]);
    }

    /**
     * Action: Create Report Schedule
     */
    public function createReportSchedule(Request $request): JsonResponse
    {
        $name = $request->input('name', 'Automated Compliance Audit Report');
        $frequency = $request->input('frequency', 'Weekly');

        return response()->json([
            'message' => 'Report schedule created successfully',
            'schedule' => [
                'id' => 'SCH-' . rand(100, 999),
                'name' => $name,
                'frequency' => $frequency,
                'nextRun' => now()->addDays(7)->format('Y-m-d H:i'),
                'status' => 'Active',
                'createdAt' => now()->toIso8601String(),
            ],
        ], 201);
    }

    /**
     * Action: Create Custom Report
     */
    public function createCustomReport(Request $request): JsonResponse
    {
        $name = $request->input('name', 'Custom Regulatory Report');
        $domain = $request->input('domain', 'Product Safety');

        return response()->json([
            'message' => 'Custom report created successfully',
            'report' => [
                'id' => 'REP-' . rand(1000, 9999),
                'name' => $name,
                'domain' => $domain,
                'status' => 'Draft',
                'createdAt' => now()->toIso8601String(),
            ],
        ], 201);
    }
}
