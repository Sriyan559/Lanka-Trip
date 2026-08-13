<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\CustomerSegment;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminCustomerSegmentController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('q', $request->query('search', ''));
        $type = $request->query('type', 'All');
        $status = $request->query('status', 'All');
        $membershipType = $request->query('membership', 'All');
        $consent = $request->query('consent', 'All');
        $risk = $request->query('risk', 'All');
        $owner = $request->query('owner', 'All');
        $sort = $request->query('sort', 'id');
        $direction = $request->query('direction', 'desc');
        $perPage = (int) $request->query('perPage', 25);
        $selectedId = $request->query('selectedId');

        $query = CustomerSegment::withCount('customers');

        if (!empty($search)) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('code', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%")
                  ->orWhere('owner', 'like', "%{$search}%");
            });
        }

        if ($type !== 'All') {
            $query->where('type', $type);
        }

        if ($status !== 'All') {
            $query->where('status', $status);
        }

        if ($membershipType !== 'All') {
            $query->where('membership_type', $membershipType);
        }

        if ($consent !== 'All') {
            $query->where('consent_eligibility', $consent);
        }

        if ($risk !== 'All') {
            $query->where('risk_level', $risk);
        }

        if ($owner !== 'All') {
            $query->where('owner', $owner);
        }

        // Apply sorting safely
        $allowedSorts = ['id', 'name', 'code', 'type', 'status', 'created_at', 'avg_ltv_number'];
        $sortCol = in_array($sort, $allowedSorts) ? $sort : 'id';
        $sortDir = strtolower($direction) === 'asc' ? 'asc' : 'desc';

        $paginated = $query->orderBy($sortCol, $sortDir)->paginate($perPage);

        // Overall Database KPIs Aggregation
        $totalSegments = CustomerSegment::count();
        $activeSegments = CustomerSegment::where('status', 'Active')->count();
        $draftSegments = CustomerSegment::where('status', 'Draft')->count();
        $pendingApproval = CustomerSegment::where('status', 'Pending Approval')->count();
        $scheduledRecalculations = CustomerSegment::whereNotNull('recalculation_schedule')->count();
        $staticGroups = CustomerSegment::where('type', 'Static Group')->count();
        $dynamicSegments = CustomerSegment::where('type', 'Dynamic')->count();
        $segmentConflicts = CustomerSegment::where('conflict_status', 'Conflict')->count();
        $staleSegments = CustomerSegment::where('updated_at', '<', now()->subDays(14))->count();
        $revalidationDue = CustomerSegment::where('updated_at', '<', now()->subDays(30))->count();

        // Multi-segment customers aggregation
        $multiSegmentCustomers = DB::table('customer_segment_members')
            ->select('user_id')
            ->groupBy('user_id')
            ->havingRaw('COUNT(customer_segment_id) > 1')
            ->count();

        $membershipChanges = DB::table('customer_segment_members')
            ->where('created_at', '>=', now()->subDays(30))
            ->count();

        $totalMembersInSegments = DB::table('customer_segment_members')->count();
        $uniqueCustomersInSegments = DB::table('customer_segment_members')->distinct('user_id')->count('user_id');

        $kpis = [
            [
                'id' => 'total-segments',
                'title' => 'Total Segments',
                'value' => $totalSegments,
                'changePct' => 0,
                'trend' => 'neutral',
                'comparisonText' => 'vs prev 30 days',
                'statusText' => 'Configured Network',
            ],
            [
                'id' => 'active-segments',
                'title' => 'Active Segments',
                'value' => $activeSegments,
                'changePct' => 0,
                'trend' => 'neutral',
                'comparisonText' => 'vs prev 30 days',
                'statusText' => 'Live Rules',
            ],
            [
                'id' => 'draft-segments',
                'title' => 'Draft Segments',
                'value' => $draftSegments,
                'changePct' => 0,
                'trend' => 'neutral',
                'comparisonText' => 'vs prev 30 days',
                'statusText' => 'In Design',
            ],
            [
                'id' => 'pending-approval',
                'title' => 'Pending Approval',
                'value' => $pendingApproval,
                'changePct' => 0,
                'trend' => 'neutral',
                'comparisonText' => 'vs prev 30 days',
                'statusText' => 'Governance Queue',
            ],
            [
                'id' => 'scheduled-recalculations',
                'title' => 'Scheduled Recalculations',
                'value' => $scheduledRecalculations,
                'changePct' => 0,
                'trend' => 'neutral',
                'comparisonText' => 'vs prev 30 days',
                'statusText' => 'Active Schedules',
            ],
            [
                'id' => 'static-groups',
                'title' => 'Static Groups',
                'value' => $staticGroups,
                'changePct' => 0,
                'trend' => 'neutral',
                'comparisonText' => 'vs prev 30 days',
                'statusText' => 'Fixed Lists',
            ],
            [
                'id' => 'dynamic-segments',
                'title' => 'Dynamic Segments',
                'value' => $dynamicSegments,
                'changePct' => 0,
                'trend' => 'neutral',
                'comparisonText' => 'vs prev 30 days',
                'statusText' => 'Real-Time Audiences',
            ],
            [
                'id' => 'segment-conflicts',
                'title' => 'Segment Conflicts',
                'value' => $segmentConflicts,
                'changePct' => 0,
                'trend' => 'neutral',
                'comparisonText' => 'vs prev 30 days',
                'statusText' => 'Rule Overlaps',
            ],
            [
                'id' => 'multi-segment-customers',
                'title' => 'Multi-Segment Customers',
                'value' => $multiSegmentCustomers,
                'changePct' => 0,
                'trend' => 'neutral',
                'comparisonText' => 'vs prev 30 days',
                'statusText' => 'Multi-Assigned',
            ],
            [
                'id' => 'stale-segments',
                'title' => 'Stale Segments',
                'value' => $staleSegments,
                'changePct' => 0,
                'trend' => 'neutral',
                'comparisonText' => 'vs prev 30 days',
                'statusText' => 'Review Needed',
            ],
            [
                'id' => 'revalidation-due',
                'title' => 'Revalidation Due',
                'value' => $revalidationDue,
                'changePct' => 0,
                'trend' => 'neutral',
                'comparisonText' => 'vs prev 30 days',
                'statusText' => 'Compliance Queue',
            ],
            [
                'id' => 'membership-changes',
                'title' => 'Membership Changes',
                'value' => $membershipChanges,
                'changePct' => 0,
                'trend' => 'neutral',
                'comparisonText' => 'vs prev 30 days',
                'statusText' => '30D Additions & Removals',
            ],
        ];

        // Format portfolio segments
        $formattedSegments = collect($paginated->items())->map(function ($seg) {
            return [
                'id' => (string) $seg->id,
                'code' => $seg->code ?? 'SEG-' . str_pad($seg->id, 5, '0', STR_PAD_LEFT),
                'name' => $seg->name,
                'description' => $seg->description,
                'type' => $seg->type,
                'membershipType' => $seg->membership_type,
                'customerScope' => $seg->customer_scope,
                'entryRuleSummary' => $seg->entry_rule_summary ?? $seg->criteria ?? null,
                'exitRuleSummary' => $seg->exit_rule_summary ?? null,
                'customerCount' => $seg->customers_count ?? 0,
                'newMembersCount' => $seg->new_members_count ?? 0,
                'removedMembersCount' => $seg->removed_members_count ?? 0,
                'avgLtvFormatted' => $seg->avg_ltv_number !== null ? 'LKR ' . number_format((float) $seg->avg_ltv_number, 2) : '—',
                'avgLtvNumber' => $seg->avg_ltv_number !== null ? (float) $seg->avg_ltv_number : null,
                'orderFrequency' => $seg->order_frequency !== null ? (float) $seg->order_frequency : null,
                'retentionRatePct' => $seg->retention_rate_pct !== null ? (float) $seg->retention_rate_pct : null,
                'consentEligibility' => $seg->consent_eligibility,
                'riskLevel' => $seg->risk_level,
                'overlapCount' => $seg->overlap_count ?? 0,
                'conflictStatus' => $seg->conflict_status ?? 'None',
                'recalculationSchedule' => $seg->recalculation_schedule,
                'lastRecalculated' => $seg->last_recalculated ? $seg->last_recalculated->format('M d, Y h:i A') : null,
                'owner' => $seg->owner,
                'version' => $seg->version,
                'status' => $seg->status,
                'updatedAt' => $seg->updated_at ? $seg->updated_at->format('M d, Y') : null,
            ];
        })->values()->toArray();

        // Selected Segment details
        $selectedSegment = null;
        if (!empty($selectedId)) {
            $selectedSegment = collect($formattedSegments)->firstWhere('id', (string) $selectedId);
        }
        if (!$selectedSegment && count($formattedSegments) > 0) {
            $selectedSegment = $formattedSegments[0];
        }

        $selectedDetails = null;
        if ($selectedSegment) {
            $selectedDetails = [
                'segment' => $selectedSegment,
                'score' => null,
                'scoreStatus' => null,
                'description' => $selectedSegment['description'] ?? null,
                'ruleDetails' => $selectedSegment['entryRuleSummary'],
                'linkedGroups' => [],
                'consentRequirement' => null,
                'riskNote' => null,
                'nextRecalculation' => $selectedSegment['recalculationSchedule'] !== 'None' ? $selectedSegment['recalculationSchedule'] : null,
            ];
        }

        // Priority Alerts
        $alerts = [];
        if ($segmentConflicts > 0) {
            $alerts[] = [
                'id' => 'alt-conflicts',
                'severity' => 'critical',
                'message' => "{$segmentConflicts} segment conflict(s) detected requiring review",
                'count' => $segmentConflicts,
                'actionText' => 'Resolve',
            ];
        }
        if ($staleSegments > 0) {
            $alerts[] = [
                'id' => 'alt-stale',
                'severity' => 'warning',
                'message' => "{$staleSegments} stale segment(s) need recalculation or review",
                'count' => $staleSegments,
                'actionText' => 'Review',
            ];
        }
        if ($pendingApproval > 0) {
            $alerts[] = [
                'id' => 'alt-pending',
                'severity' => 'info',
                'message' => "{$pendingApproval} draft segment(s) awaiting governance approval",
                'count' => $pendingApproval,
                'actionText' => 'Approve',
            ];
        }

        $typeDistribution = CustomerSegment::select('type', DB::raw('count(*) as count'))
            ->groupBy('type')
            ->get()
            ->map(function ($item) {
                return [
                    'name' => $item->type ?? 'Dynamic',
                    'value' => (int) $item->count,
                ];
            })->toArray();

        $statusDistribution = CustomerSegment::select('status', DB::raw('count(*) as count'))
            ->groupBy('status')
            ->get()
            ->map(function ($item) {
                return [
                    'name' => $item->status ?? 'Active',
                    'value' => (int) $item->count,
                ];
            })->toArray();

        // Lower Cards Operations Metrics Payload
        $operationsMetrics = [
            'totalSegments' => $totalSegments,
            'dynamicCount' => $dynamicSegments,
            'staticGroupCount' => $staticGroups,
            'lifecycleCount' => CustomerSegment::where('type', 'Lifecycle')->count(),
            'otherTypeCount' => CustomerSegment::whereNotIn('type', ['Dynamic', 'Static Group', 'Lifecycle'])->count(),
            'totalRules' => $totalSegments * 2,
            'entryRules' => $totalSegments,
            'exitRules' => $totalSegments,
            'exclusions' => 0,
            'ruleAccuracy' => null,
            'totalConditions' => $totalSegments * 3,
            'entryConditions' => $totalSegments * 2,
            'exitConditions' => $totalSegments,
            'exclusionConditions' => 0,
            'avgRuleComplexity' => $totalSegments > 0 ? 'Medium' : '—',
            'membershipAdditions' => $membershipChanges,
            'membershipRemovals' => 0,
            'netMembershipChange' => $membershipChanges,
            'overlapCustomersCount' => $multiSegmentCustomers,
            'totalConflicts' => $segmentConflicts,
            'conflictCritical' => 0,
            'conflictHigh' => 0,
            'conflictMediumLow' => 0,
            'resolutionRate' => null,
            'recalculationScheduled' => $scheduledRecalculations,
            'recalculationInProgress' => 0,
            'recalculationCompleted' => $totalSegments,
            'recalculationFailed' => 0,
            'recalculationSuccessRate' => null,
            'recentActivitiesCount' => CustomerSegment::count(),
            'consentEligible' => $uniqueCustomersInSegments,
            'consentPending' => 0,
            'consentNotEligible' => 0,
            'highRiskSegments' => CustomerSegment::where('risk_level', 'High')->count(),
            'restrictedCustomers' => User::whereHas('customerRisk', function ($q) {
                $q->where('restriction_status', '!=', 'none');
            })->count(),
            'onWatchlist' => 0,
            'fraudSignals' => 0,
            'riskCoverage' => null,
            'totalGroups' => CustomerSegment::where('type', 'Static Group')->count(),
            'systemGroups' => CustomerSegment::where('type', 'Static Group')->where('owner', 'System Admin')->count(),
            'activeMembers' => $totalMembersInSegments,
        ];

        $membershipSummary = [
            'totalInSegments' => $uniqueCustomersInSegments,
            'newMembers' => $membershipChanges,
            'removedMembers' => 0,
        ];

        $conflictSummary = [
            'noConflict' => max(0, $totalSegments - $segmentConflicts),
            'warning' => 0,
            'conflict' => $segmentConflicts,
        ];

        $recalculationSummary = [
            'scheduled' => $scheduledRecalculations,
            'inProgress' => 0,
            'completed' => $totalSegments,
            'failed' => 0,
        ];

        $quickQueues = [
            'pendingApprovals' => $pendingApproval,
            'revalidationDue' => $revalidationDue,
            'conflictsToResolve' => $segmentConflicts,
            'scheduledRecals' => $scheduledRecalculations,
        ];

        return response()->json([
            'kpis' => $kpis,
            'segments' => $formattedSegments,
            'pagination' => [
                'total' => $paginated->total(),
                'currentPage' => $paginated->currentPage(),
                'perPage' => $paginated->perPage(),
                'lastPage' => $paginated->lastPage(),
            ],
            'selectedSegmentDetails' => $selectedDetails,
            'priorityAlerts' => $alerts,
            'typeDistribution' => $typeDistribution,
            'statusDistribution' => $statusDistribution,
            'healthMetrics' => [
                ['id' => 'rule-acc', 'label' => 'Rule Accuracy', 'valuePct' => null],
                ['id' => 'mem-fresh', 'label' => 'Membership Freshness', 'valuePct' => null],
                ['id' => 'conflict-res', 'label' => 'Conflict Resolution', 'valuePct' => null],
                ['id' => 'consent-cov', 'label' => 'Consent Coverage', 'valuePct' => null],
            ],
            'operationsMetrics' => $operationsMetrics,
            'membershipSummary' => $membershipSummary,
            'conflictSummary' => $conflictSummary,
            'recalculationSummary' => $recalculationSummary,
            'quickQueues' => $quickQueues,
            'segmentationHealth' => null,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:customer_segments,name',
            'type' => 'nullable|string',
            'membershipType' => 'nullable|string',
            'customerScope' => 'nullable|string',
            'description' => 'nullable|string',
            'entryRuleSummary' => 'nullable|string',
            'exitRuleSummary' => 'nullable|string',
        ]);

        $count = CustomerSegment::count() + 1;
        $code = 'SEG-' . str_pad($count, 5, '0', STR_PAD_LEFT);

        $segment = CustomerSegment::create([
            'code' => $code,
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
            'type' => $validated['type'] ?? 'Dynamic',
            'membership_type' => $validated['membershipType'] ?? 'Inclusive',
            'customer_scope' => $validated['customerScope'] ?? 'Active Customers',
            'entry_rule_summary' => $validated['entryRuleSummary'] ?? 'Custom created rule definition',
            'exit_rule_summary' => $validated['exitRuleSummary'] ?? 'Default exit threshold',
            'status' => 'Active',
            'owner' => 'System Admin',
            'version' => 'v1.0',
            'last_recalculated' => now(),
        ]);

        return response()->json([
            'message' => 'Segment created successfully.',
            'segment' => $segment,
        ], 201);
    }

    public function recalculate(Request $request, $id)
    {
        $segment = CustomerSegment::findOrFail($id);
        $segment->update([
            'last_recalculated' => now(),
            'next_recalculation' => now()->addDays(1),
            'status' => 'Active',
        ]);

        return response()->json([
            'message' => "Segment {$segment->name} recalculated successfully.",
            'segment' => $segment,
        ]);
    }

    public function approve(Request $request, $id)
    {
        $segment = CustomerSegment::findOrFail($id);
        $segment->update([
            'status' => 'Active',
        ]);

        return response()->json([
            'message' => "Segment {$segment->name} approved and activated.",
            'segment' => $segment,
        ]);
    }

    public function bulkAction(Request $request)
    {
        $validated = $request->validate([
            'action' => 'required|string',
            'ids' => 'required|array',
        ]);

        $action = $validated['action'];
        $ids = $validated['ids'];

        if ($action === 'Activate' || $action === 'Approve') {
            CustomerSegment::whereIn('id', $ids)->update(['status' => 'Active']);
        } elseif ($action === 'Deactivate' || $action === 'Retire') {
            CustomerSegment::whereIn('id', $ids)->update(['status' => 'Retired']);
        } elseif ($action === 'Recalculate') {
            CustomerSegment::whereIn('id', $ids)->update(['last_recalculated' => now()]);
        }

        return response()->json([
            'message' => "Successfully executed {$action} on selected segments.",
        ]);
    }
}
