<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Order;
use App\Models\ReturnCase;
use App\Models\SupportCase;
use App\Models\CustomerVerification;
use App\Models\CustomerLoyaltyAccount;
use App\Models\CustomerRisk;
use App\Models\CustomerConsent;
use App\Models\CustomerSegment;

class AdminCustomerDirectoryController extends Controller
{
    public function directory(Request $request)
    {
        $perPage = (int) $request->query('per_page', $request->query('perPage', 25));
        $search = $request->query('q', $request->query('search', ''));
        $segment = $request->query('segment', 'All');
        $verificationStatus = $request->query('verificationStatus', 'All');
        $loyaltyTier = $request->query('loyaltyTier', 'All');
        $riskLevel = $request->query('riskLevel', 'All');
        $region = $request->query('region', 'All');
        $sortBy = $request->query('sort', $request->query('sort_by', 'updated_at'));
        $direction = strtolower($request->query('direction', $request->query('order', 'desc'))) === 'asc' ? 'asc' : 'desc';

        // Base buyer metrics for status summary & health scorecard
        $totalCustomersQuery = User::where('role', 'buyer');
        $totalCount = $totalCustomersQuery->count();
        $activeCount = (clone $totalCustomersQuery)->where('updated_at', '>=', now()->subDays(30))->count();
        $dormantCount = (clone $totalCustomersQuery)->where('updated_at', '<', now()->subDays(90))->count();

        $verifiedCount = CustomerVerification::where('verification_status', 'verified')->count();
        $pendingVerificationCount = CustomerVerification::where('verification_status', 'pending')->count();
        $loyaltyCount = CustomerLoyaltyAccount::count();
        $restrictedCount = CustomerRisk::where('restriction_status', '!=', 'none')->count();
        $openSupportCount = SupportCase::whereIn('status', ['open', 'pending'])->count();
        $returnsCount = ReturnCase::whereIn('status', ['requested', 'pending'])->count();

        $statusSummary = [
            'active' => $activeCount,
            'verificationPending' => $pendingVerificationCount,
            'dormant' => $dormantCount,
            'restricted' => $restrictedCount,
            'cases' => $openSupportCount,
            'returns' => $returnsCount,
        ];

        $totalCases = SupportCase::count();
        $totalConsents = CustomerConsent::count();
        $totalRisks = CustomerRisk::count();
        $totalReturns = ReturnCase::count();

        $repeatBuyersCount = Order::select('buyer_id')
            ->groupBy('buyer_id')
            ->havingRaw('count(*) > 1')
            ->get()
            ->count();

        $buyersWithReturnsCount = ReturnCase::select('customer_id')->distinct()->count();

        $healthScorecard = [
            [
                'label' => 'Identity Verification',
                'val' => $totalCount > 0 ? round(($verifiedCount / $totalCount) * 100) : null,
                'color' => 'bg-emerald-500',
            ],
            [
                'label' => 'Profile Completeness',
                'val' => $totalCount > 0 ? round((User::where('role', 'buyer')->whereNotNull('phone')->whereNotNull('country')->count() / $totalCount) * 100) : null,
                'color' => 'bg-emerald-500',
            ],
            [
                'label' => 'Engagement',
                'val' => $totalCount > 0 ? round(($activeCount / $totalCount) * 100) : null,
                'color' => 'bg-emerald-500',
            ],
            [
                'label' => 'Purchase Frequency',
                'val' => $totalCount > 0 ? round(($repeatBuyersCount / $totalCount) * 100) : null,
                'color' => 'bg-amber-500',
            ],
            [
                'label' => 'Loyalty Participation',
                'val' => $totalCount > 0 ? round(($loyaltyCount / $totalCount) * 100) : null,
                'color' => 'bg-amber-500',
            ],
            [
                'label' => 'Service Quality',
                'val' => $totalCases > 0 ? round((SupportCase::where('status', 'resolved')->count() / $totalCases) * 100) : null,
                'color' => 'bg-emerald-500',
            ],
            [
                'label' => 'Return Risk',
                'val' => $totalCount > 0 && $totalReturns > 0 ? round((1 - ($buyersWithReturnsCount / $totalCount)) * 100) : null,
                'color' => 'bg-amber-500',
            ],
            [
                'label' => 'Privacy Compliance',
                'val' => $totalConsents > 0 ? round((CustomerConsent::where('is_granted', true)->count() / $totalConsents) * 100) : null,
                'color' => 'bg-emerald-500',
            ],
            [
                'label' => 'Fraud Risk Control',
                'val' => $totalRisks > 0 ? round((CustomerRisk::where('risk_level', 'low')->count() / $totalRisks) * 100) : null,
                'color' => 'bg-emerald-500',
            ],
            [
                'label' => 'Retention Readiness',
                'val' => $totalCount > 0 ? round((($totalCount - $dormantCount) / $totalCount) * 100) : null,
                'color' => 'bg-emerald-500',
            ],
        ];

        $query = User::where('role', 'buyer')
            ->with([
                'customerVerification',
                'customerLoyaltyAccount',
                'customerRisk',
                'customerConsents',
            ])
            ->withCount(['orders', 'sentMessages']);

        // Search query
        if (!empty($search)) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%")
                  ->orWhere('id', 'like', "%{$search}%");
            });
        }

        // Region filter
        if ($region !== 'All') {
            $query->where('country', $region);
        }

        // Verification Status filter
        if ($verificationStatus !== 'All') {
            $query->whereHas('customerVerification', function ($q) use ($verificationStatus) {
                $q->where('verification_status', strtolower($verificationStatus));
            });
        }

        // Loyalty Tier filter
        if ($loyaltyTier !== 'All') {
            $query->whereHas('customerLoyaltyAccount', function ($q) use ($loyaltyTier) {
                $q->where('tier', strtolower($loyaltyTier));
            });
        }

        // Risk Level filter
        if ($riskLevel !== 'All') {
            $query->whereHas('customerRisk', function ($q) use ($riskLevel) {
                $q->where('risk_level', strtolower($riskLevel));
            });
        }

        // Sorting
        $allowedSorts = ['name', 'email', 'created_at', 'updated_at', 'id'];
        $actualSort = in_array($sortBy, $allowedSorts, true) ? $sortBy : 'updated_at';
        $customers = $query->orderBy($actualSort, $direction)->paginate($perPage);

        $formattedCustomers = $customers->map(function ($user) {
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
                'lifetimeValue' => 0,
                'lastOrderDate' => '—',
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
            'kpis' => [],
            'statusSummary' => $statusSummary,
            'healthScorecard' => $healthScorecard,
            'customers' => $formattedCustomers,
            'pagination' => [
                'total' => $customers->total(),
                'currentPage' => $customers->currentPage(),
                'perPage' => $customers->perPage(),
                'lastPage' => $customers->lastPage(),
            ],
            'rightRail' => [],
        ]);
    }

    public function segments(Request $request)
    {
        $segments = CustomerSegment::withCount('customers')->get();
        $formatted = $segments->map(function ($seg) {
            return [
                'id' => $seg->id,
                'name' => $seg->name,
                'description' => $seg->description,
                'criteria' => $seg->criteria,
                'memberCount' => $seg->customers_count,
            ];
        })->toArray();

        return response()->json([
            'kpis' => [],
            'segments' => $formatted,
        ]);
    }

    public function show(Request $request, $id)
    {
        if (str_starts_with($id, 'CUST-')) {
            $id = (int) substr($id, 5);
        }

        $user = User::with([
            'customerVerification',
            'customerLoyaltyAccount',
            'customerRisk',
            'customerConsents',
            'customerAddresses'
        ])->where('role', 'buyer')->findOrFail($id);

        $totalOrders = $user->orders()->count();
        $completedOrders = $user->orders()->where('status', 'completed')->count();
        $cancelledOrders = $user->orders()->where('status', 'cancelled')->count();
        $failedPayments = $user->orders()->where('payment_status', 'failed')->count();
        $totalAmt = $user->orders()->where('status', 'completed')->sum('total_amount');
        $avgOrderVal = $totalOrders > 0 ? round($totalAmt / $totalOrders) : 0;

        $ver = $user->customerVerification;
        $loyalty = $user->customerLoyaltyAccount;
        $risk = $user->customerRisk;

        // Construct healthScores
        $healthScores = [
            ['label' => 'Identity Linkage', 'value' => 92],
            ['label' => 'Email Validity', 'value' => $user->email_verified_at ? 100 : 0],
            ['label' => 'Phone Validity', 'value' => $user->phone ? 100 : 0],
            ['label' => 'Address Completeness', 'value' => $user->customerAddresses()->exists() ? 100 : 0],
            ['label' => 'Address Verification', 'value' => 91],
            ['label' => 'Delivery Eligibility', 'value' => 90],
            ['label' => 'Duplicate Control', 'value' => 88],
            ['label' => 'Consent Alignment', 'value' => 95],
            ['label' => 'Revalidation Readiness', 'value' => 87],
            ['label' => 'Audit Completeness', 'value' => 97],
        ];

        // Construct lifecycleMilestones
        $lifecycleMilestones = [
            ['label' => 'Registered', 'date' => $user->created_at->format('M d, Y'), 'status' => 'completed'],
            ['label' => 'First Order', 'date' => optional($user->orders()->first())->created_at?->format('M d, Y') ?: '—', 'status' => $totalOrders > 0 ? 'completed' : 'upcoming'],
        ];

        // Construct addresses
        $addresses = $user->customerAddresses->map(function ($a) {
            return [
                'type' => $a->is_default_shipping ? 'Default Billing & Shipping' : 'Home Address',
                'address' => "{$a->address_line_1}, {$a->city}, {$a->state}, {$a->country}"
            ];
        })->toArray();

        // Construct segments
        $segments = $user->customerSegments->pluck('name')->toArray();

        // Construct recent orders
        $recentOrders = $user->orders()->latest()->limit(5)->get()->map(function ($o) {
            return [
                'id' => $o->order_number,
                'date' => $o->created_at->format('Y-m-d'),
                'amount' => (float)$o->total_amount,
                'status' => ucfirst($o->status),
                'channel' => 'Website'
            ];
        })->toArray();

        $detail = [
            'profile' => [
                'id' => 'CUST-' . str_pad($user->id, 6, '0', STR_PAD_LEFT),
                'name' => $user->name,
                'tagline' => $user->company_name ?: 'Registered Buyer',
                'avatarInitials' => strtoupper(substr($user->name, 0, 2)),
                'customerType' => $user->company_name ? 'Business' : 'Individual',
                'lifecycleSegment' => $user->created_at >= now()->subDays(30) ? 'New' : 'Active Customer',
                'verificationStatus' => $ver ? ucfirst($ver->verification_status) : 'Unverified',
                'loyaltyTier' => $loyalty ? ucfirst($loyalty->tier) : 'Standard',
                'riskLevel' => $risk ? ucfirst($risk->risk_level) : 'Low',
                'restrictionStatus' => $risk ? ucfirst($risk->restriction_status) : 'None',
                'preferredChannel' => 'Website',
                'region' => $user->country ?? 'Western',
                'owner' => 'System',
                'registeredDate' => $user->created_at->format('M d, Y'),
                'lastActivity' => $user->updated_at->format('M d, Y'),
                'lastOrderDate' => optional($user->orders()->latest()->first())->created_at?->format('M d, Y') ?: '—',
                'email' => $user->email,
                'phone' => $user->phone ?? '—',
                'dob' => '1990-01-01',
                'gender' => 'Female',
                'preferredLanguage' => 'English',
                'nationalId' => '—',
                'accountSource' => 'Website',
                'profileCompleteness' => 75,
                'verificationReadiness' => 80,
                'totalOrders' => $totalOrders,
                'lifetimeValue' => (float)$totalAmt,
                'avgOrderValue' => (float)$avgOrderVal,
                'loyaltyPoints' => $loyalty ? $loyalty->points_balance : 0,
                'returnRate' => 0,
                'openCasesCount' => 0,
                'activeAddressesCount' => count($addresses),
                'consentCoverage' => 100,
                'riskScore' => 12,
                'customerHealthScore' => 85,
            ],
            'healthScores' => $healthScores,
            'lifecycleMilestones' => $lifecycleMilestones,
            'addresses' => $addresses,
            'segments' => $segments,
            'identity' => [
                'kycStatus' => $ver ? ucfirst($ver->verification_status) : 'Pending',
                'documentType' => $ver ? $ver->document_type : 'National ID',
                'documentNumber' => $ver ? $ver->document_number : '—',
                'verifiedOn' => $ver && $ver->verified_at ? $ver->verified_at->format('M d, Y') : '—',
                'expiryDate' => '—',
                'verificationSource' => 'Admin Panel',
                'addressMatch' => 'Yes',
                'riskNotes' => 'None',
            ],
            'purchaseBehaviour' => [
                'totalOrders' => $totalOrders,
                'completed' => $completedOrders,
                'cancelled' => $cancelledOrders,
                'failedPayments' => $failedPayments,
                'avgOrderValue' => $avgOrderVal,
                'repeatPurchaseRate' => 0,
                'favouriteCategory' => 'Skincare',
                'preferredBrand' => 'L\'Oreal',
                'recentOrders' => $recentOrders,
            ],
            'returnsDisputes' => [
                'openReturns' => 0,
                'completedReturns' => 0,
                'refundsPending' => 0,
                'refundsCompletedAmount' => 0,
                'activeDisputes' => 0,
                'avgResolutionTimeDays' => 0,
                'recentReturns' => [],
            ],
            'loyalty' => [
                'tier' => $loyalty ? ucfirst($loyalty->tier) : 'Standard',
                'pointsBalance' => $loyalty ? $loyalty->points_balance : 0,
                'pointsEarnedYtd' => 0,
                'pointsRedeemedYtd' => 0,
                'nextTierPoints' => 500,
                'rewardLiabilityLkr' => 0,
                'pointsExpiring90Days' => 0,
                'recentTransactions' => [],
            ],
            'consentPrivacy' => [
                'emailConsent' => true,
                'smsConsent' => true,
                'pushConsent' => false,
                'personalisationConsent' => true,
                'dataProcessingBasis' => 'Consent',
                'consentSource' => 'Web App',
                'consentDate' => $user->created_at->format('Y-m-d'),
                'privacyRequests' => [
                    'access' => 0,
                    'correction' => 0,
                    'deletion' => 0,
                    'portability' => 0,
                ],
            ],
            'riskRestrictions' => [
                'overallRiskScore' => 12,
                'riskCategory' => $risk ? ucfirst($risk->risk_level) : 'Low',
                'chargebackRisk' => 'Low',
                'excessiveReturnRisk' => 'Low',
                'duplicateAccountRisk' => 'Low',
                'activeRestrictions' => $risk ? $risk->restriction_status : 'None',
                'riskOwner' => 'System',
            ],
            'supportComms' => [
                'openCases' => 0,
                'resolvedCases30d' => 0,
                'avgResponseTimeHours' => 0,
                'csat30d' => 0,
                'recentInteractions' => [],
            ],
            'relatedRecords' => [
                'householdAccount' => '—',
                'loyaltyCard' => $loyalty ? 'LOY-' . str_pad($loyalty->id, 6, '0', STR_PAD_LEFT) : '—',
                'marketplaceProfile' => '—',
                'supportCaseSummary' => 'No active cases',
                'lastOrder' => $recentOrders ? $recentOrders[0]['id'] : '—',
            ],
            'recordQuality' => [
                'duplicateRisk' => 'Low',
                'missingFields' => 0,
                'dataFreshness' => 'Fresh',
                'dataAccuracyScore' => 100,
                'auditCompleteness' => 100,
            ],
            'recentActivities' => [],
            'lifecycleNodes' => [
                ['id' => 'onboarded', 'label' => 'Onboarded', 'status' => 'Completed', 'stepNumber' => 1, 'date' => $user->created_at->format('Y-m-d')],
                ['id' => 'verified', 'label' => 'KYC Verified', 'status' => $ver && $ver->verification_status === 'verified' ? 'Completed' : 'Upcoming', 'stepNumber' => 2],
            ],
        ];

        return response()->json($detail);
    }

    public function update(Request $request, $id)
    {
        if (str_starts_with($id, 'CUST-')) {
            $id = (int) substr($id, 5);
        }

        $user = User::where('role', 'buyer')->findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|unique:users,email,' . $user->id,
            'phone' => 'sometimes|nullable|string|max:40',
            'company_name' => 'sometimes|nullable|string|max:255',
            'country' => 'sometimes|nullable|string|max:255',
            'status' => 'sometimes|required|string|max:50',
        ]);

        $user->update($validated);

        return response()->json([
            'message' => 'Customer updated successfully',
            'customer' => $user
        ]);
    }

    public function destroy($id)
    {
        if (str_starts_with($id, 'CUST-')) {
            $id = (int) substr($id, 5);
        }

        $user = User::where('role', 'buyer')->findOrFail($id);
        $user->delete();

        return response()->json([
            'message' => 'Customer archived/deleted successfully'
        ]);
    }
}
