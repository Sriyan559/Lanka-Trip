<?php
namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\CustomerVerification;
use Illuminate\Support\Facades\DB;

class AdminCustomerVerificationController extends Controller
{
    public function dashboard(Request $request)
    {
        $baseQuery = CustomerVerification::query();

        // 1. KPI Counts
        $total = (clone $baseQuery)->count();
        $verified = (clone $baseQuery)->where('verification_status', 'verified')->count();
        $pending = (clone $baseQuery)->where('verification_status', 'pending')->count();
        $underReview = (clone $baseQuery)->where('verification_status', 'under-review')->count();
        $failed = (clone $baseQuery)->where('verification_status', 'failed')->count();
        $conditional = (clone $baseQuery)->where('verification_status', 'conditional')->count();
        $reverification = (clone $baseQuery)->where('verification_status', 'reverification')->count();
        $expiredDocs = (clone $baseQuery)->where('document_status', 'expired')->count();
        $duplicates = (clone $baseQuery)->where('duplicate_risk_level', 'high')->count();
        $manualReview = (clone $baseQuery)->where('current_stage', 'manual-review')->count();
        $slaBreaches = (clone $baseQuery)->whereNotNull('sla_percentage')->where('sla_percentage', '<', 50)->count();
        $restricted = (clone $baseQuery)->where('verification_status', 'restricted')->count();

        $kpis = [
            ['seq' => 1, 'id' => 'total-verifications', 'label' => 'Total Verification Records', 'value' => number_format($total), 'change' => '2.4%', 'changeDirection' => 'up', 'statusState' => 'positive', 'iconName' => 'Users'],
            ['seq' => 2, 'id' => 'verified-customers', 'label' => 'Verified Customers', 'value' => number_format($verified), 'change' => '2.8%', 'changeDirection' => 'up', 'statusState' => 'positive', 'iconName' => 'UserCheck'],
            ['seq' => 3, 'id' => 'pending-verification', 'label' => 'Pending Verification', 'value' => number_format($pending), 'change' => '0.8%', 'changeDirection' => 'down', 'statusState' => 'info', 'iconName' => 'Clock'],
            ['seq' => 4, 'id' => 'under-review', 'label' => 'Under Review', 'value' => number_format($underReview), 'change' => '1.1%', 'changeDirection' => 'down', 'statusState' => 'warning', 'iconName' => 'RefreshCw'],
            ['seq' => 5, 'id' => 'verification-failed', 'label' => 'Verification Failed', 'value' => number_format($failed), 'change' => '3.2%', 'changeDirection' => 'up', 'statusState' => 'critical', 'iconName' => 'UserX'],
            ['seq' => 6, 'id' => 'conditional-verification', 'label' => 'Conditional Verification', 'value' => number_format($conditional), 'change' => '1.6%', 'changeDirection' => 'up', 'statusState' => 'warning', 'iconName' => 'ShieldAlert'],
            ['seq' => 7, 'id' => 'reverification-due', 'label' => 'Reverification Due', 'value' => number_format($reverification), 'change' => '4.3%', 'changeDirection' => 'up', 'statusState' => 'warning', 'iconName' => 'RefreshCw'],
            ['seq' => 8, 'id' => 'expired-documents', 'label' => 'Expired Identity Documents', 'value' => number_format($expiredDocs), 'change' => '12.1%', 'changeDirection' => 'up', 'statusState' => 'critical', 'iconName' => 'Lock'],
            ['seq' => 9, 'id' => 'duplicate-candidates', 'label' => 'Duplicate Identity Candidates', 'value' => number_format($duplicates), 'change' => '5.2%', 'changeDirection' => 'up', 'statusState' => 'warning', 'iconName' => 'Copy'],
            ['seq' => 10, 'id' => 'manual-review-req', 'label' => 'Manual Review Required', 'value' => number_format($manualReview), 'change' => '1.5%', 'changeDirection' => 'down', 'statusState' => 'warning', 'iconName' => 'ShieldAlert'],
            ['seq' => 11, 'id' => 'sla-breaches', 'label' => 'Verification SLA Breaches', 'value' => number_format($slaBreaches), 'change' => '8.7%', 'changeDirection' => 'down', 'statusState' => 'positive', 'iconName' => 'Clock'],
            ['seq' => 12, 'id' => 'restricted-pending', 'label' => 'Restricted Pending Verification', 'value' => number_format($restricted), 'change' => '6.2%', 'changeDirection' => 'up', 'statusState' => 'critical', 'iconName' => 'Lock'],
        ];

        // Health Scorecard
        $avgCompleteness = (clone $baseQuery)->avg('evidence_completeness') ?: 0;
        $healthItems = [
            ['label' => 'Identity Completeness', 'val' => round($avgCompleteness) ?: 89, 'color' => 'bg-emerald-500'],
            ['label' => 'Contact Validity', 'val' => 92, 'color' => 'bg-emerald-500'],
            ['label' => 'Document Authenticity', 'val' => $total > 0 ? round(((clone $baseQuery)->where('authenticity_status', 'authentic')->count() / $total) * 100) : 90, 'color' => 'bg-emerald-500'],
            ['label' => 'Evidence Readiness', 'val' => 76, 'color' => 'bg-amber-500'],
            ['label' => 'Address Verification', 'val' => 85, 'color' => 'bg-emerald-500'],
            ['label' => 'Duplicate Control', 'val' => 93, 'color' => 'bg-emerald-500'],
            ['label' => 'Risk Control', 'val' => 96, 'color' => 'bg-emerald-500'],
            ['label' => 'Revalidation Readiness', 'val' => 70, 'color' => 'bg-amber-500'],
            ['label' => 'SLA Compliance', 'val' => 90, 'color' => 'bg-emerald-500'],
            ['label' => 'Audit Readiness', 'val' => 88, 'color' => 'bg-emerald-500'],
        ];

        $operationCards = [
            [
                'id' => '1',
                'title' => '1. Customer Verification Workflow',
                'seq' => '1',
                'listItems' => [
                    ['label' => 'Submitted', 'val' => number_format($total)],
                    ['label' => 'Verified', 'val' => number_format($verified)],
                    ['label' => 'Pending', 'val' => number_format($pending)]
                ]
            ]
        ];

        $lifecycleNodes = [
            ['stepNumber' => 1, 'id' => 'submitted', 'label' => '1. Submitted', 'count' => number_format($total), 'status' => 'Completed'],
            ['stepNumber' => 2, 'id' => 'contact-verified', 'label' => '2. Contact Verified', 'count' => '0', 'status' => 'Completed'],
            ['stepNumber' => 3, 'id' => 'document-check', 'label' => '3. Document Check', 'count' => '0', 'status' => 'Current'],
            ['stepNumber' => 4, 'id' => 'duplicate-review', 'label' => '4. Duplicate Review', 'count' => number_format($duplicates), 'status' => 'Upcoming'],
            ['stepNumber' => 5, 'id' => 'risk-assessment', 'label' => '5. Risk Assessment', 'count' => '0', 'status' => 'Upcoming'],
            ['stepNumber' => 6, 'id' => 'decision-review', 'label' => '6. Decision Review', 'count' => number_format($manualReview), 'status' => 'Upcoming'],
            ['stepNumber' => 7, 'id' => 'verified', 'label' => '7. Verified', 'count' => number_format($verified), 'status' => 'Upcoming'],
        ];

        $rightRail = [
            'healthScore' => 89,
            'healthGrade' => 'Good',
            'healthTitle' => 'Identity Verification Health',
            'healthBars' => $healthItems,
            'alertsTitle' => 'Priority Verification Alerts',
            'alerts' => [
                ['id' => 'a1', 'text' => 'High-risk identity pending', 'count' => $pending, 'severity' => 'High'],
                ['id' => 'a2', 'text' => 'Duplicate candidates detected', 'count' => $duplicates, 'severity' => 'High'],
            ],
            'summaries' => [
                [
                    'title' => 'Verification Status Summary',
                    'items' => [
                        ['label' => 'Verified', 'count' => number_format($verified), 'pct' => $total > 0 ? round(($verified / $total) * 100, 1) . '%' : '0%', 'color' => '#10B981'],
                        ['label' => 'Pending', 'count' => number_format($pending), 'pct' => $total > 0 ? round(($pending / $total) * 100, 1) . '%' : '0%', 'color' => '#3B82F6'],
                    ]
                ]
            ],
            'quickQueues' => [
                ['label' => 'Pending Queue', 'count' => number_format($pending)],
                ['label' => 'Under Review Queue', 'count' => number_format($underReview)],
            ]
        ];

        // Fetch directory-like customer list
        $customersQuery = User::where('role', 'buyer')
            ->with(['customerVerification', 'customerLoyaltyAccount', 'customerRisk'])
            ->withCount(['orders', 'sentMessages'])
            ->orderBy('updated_at', 'desc')
            ->paginate(25);

        $formattedCustomers = $customersQuery->map(function ($user) {
            $ver = $user->customerVerification;
            $loyalty = $user->customerLoyaltyAccount;
            $risk = $user->customerRisk;

            return [
                'id' => 'CUST-' . str_pad($user->id, 6, '0', STR_PAD_LEFT),
                'name' => $user->name,
                'avatarInitials' => strtoupper(substr($user->name, 0, 2)),
                'customerType' => $user->company_name ? 'Corporate' : 'Individual',
                'email' => $user->email,
                'phone' => $user->phone ?? '—',
                'region' => $user->country ?? 'Western',
                'preferredChannel' => 'Website',
                'verificationStatus' => $ver ? ucfirst($ver->verification_status) : 'Unverified',
                'profileCompleteness' => 75,
                'lifecycleSegment' => $user->created_at >= now()->subDays(30) ? 'New' : 'Active',
                'loyaltyTier' => $loyalty ? ucfirst($loyalty->tier) : 'Standard',
                'totalOrders' => $user->orders_count ?? 0,
                'lifetimeValue' => $user->orders()->sum('total_amount'),
                'lastOrderDate' => $user->orders()->latest()->first()?->created_at?->format('Y-m-d') ?? '—',
                'returnsCount' => 0,
                'openCasesCount' => 0,
                'consentStatus' => 'Granted',
                'riskLevel' => $risk ? ucfirst($risk->risk_level) : 'Low',
                'restrictionStatus' => $risk ? ucfirst($risk->restriction_status) : 'None',
                'owner' => 'System',
                'lastActivity' => $user->updated_at ? $user->updated_at->format('M d, Y h:i A') : '—',
                'updatedAt' => $user->updated_at ? $user->updated_at->toIso8601String() : now()->toIso8601String(),
            ];
        })->values()->toArray();

        return response()->json([
            'kpis' => $kpis,
            'healthScorecard' => $healthItems,
            'operationCards' => $operationCards,
            'lifecycleNodes' => $lifecycleNodes,
            'rightRail' => $rightRail,
            'customers' => $formattedCustomers,
            'pagination' => [
                'total' => $customersQuery->total(),
                'currentPage' => $customersQuery->currentPage(),
                'perPage' => $customersQuery->perPage(),
                'lastPage' => $customersQuery->lastPage(),
            ],
        ]);
    }

    public function index(Request $request)
    {
        $query = CustomerVerification::with(['user', 'reviewer']);

        if ($request->filled('status') && $request->status !== 'All') {
            $query->where('verification_status', strtolower($request->status));
        }

        if ($request->filled('type') && $request->type !== 'All') {
            $query->where('verification_type', $request->type);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->whereHas('user', function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        $sort = $request->input('sort', 'updated_at');
        $direction = $request->input('direction', 'desc');
        
        $query->orderBy($sort, $direction);
        $paginator = $query->paginate((int) $request->input('perPage', 25));

        return response()->json([
            'status' => 'ok',
            'data' => [
                'items' => $paginator->items(),
                'total' => $paginator->total(),
                'page' => $paginator->currentPage(),
                'lastPage' => $paginator->lastPage(),
            ],
        ]);
    }

    public function verify($id)
    {
        $verif = CustomerVerification::findOrFail($id);
        $verif->verification_status = 'verified';
        $verif->verified_at = now();
        $verif->save();

        return response()->json(['status' => 'ok', 'data' => $verif]);
    }

    public function reject($id)
    {
        $verif = CustomerVerification::findOrFail($id);
        $verif->verification_status = 'rejected';
        $verif->save();

        return response()->json(['status' => 'ok', 'data' => $verif]);
    }

    public function requestEvidence($id)
    {
        $verif = CustomerVerification::findOrFail($id);
        $verif->current_stage = 'awaiting-evidence';
        $verif->save();

        return response()->json(['status' => 'ok', 'data' => $verif]);
    }
}
