<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\CustomerAddress;
use Illuminate\Http\Request;

class AdminCustomerAddressController extends Controller
{
    public function dashboard(Request $request)
    {
        $contactRecords = User::where('role', 'buyer')->count();
        $verifiedEmails = User::where('role', 'buyer')->whereNotNull('email_verified_at')->count();
        $verifiedPhones = User::where('role', 'buyer')->whereNotNull('phone')->count();
        $validAddresses = CustomerAddress::count();
        $incompleteAddresses = CustomerAddress::whereNull('address_line_1')
            ->orWhereNull('city')
            ->count();
        
        $kpis = [
            ['seq' => 1, 'id' => 'contact-records', 'label' => 'Customers with Contact Records', 'value' => number_format($contactRecords), 'change' => '2.4%', 'changeDirection' => 'up', 'statusState' => 'positive', 'iconName' => 'Users'],
            ['seq' => 2, 'id' => 'verified-emails', 'label' => 'Verified Emails', 'value' => number_format($verifiedEmails), 'change' => '2.8%', 'changeDirection' => 'up', 'statusState' => 'positive', 'iconName' => 'UserCheck'],
            ['seq' => 3, 'id' => 'verified-phones', 'label' => 'Verified Phone Numbers', 'value' => number_format($verifiedPhones), 'change' => '2.6%', 'changeDirection' => 'up', 'statusState' => 'positive', 'iconName' => 'UserCheck'],
            ['seq' => 4, 'id' => 'valid-addresses', 'label' => 'Valid Addresses', 'value' => number_format($validAddresses), 'change' => '1.9%', 'changeDirection' => 'up', 'statusState' => 'positive', 'iconName' => 'UserCheck'],
            ['seq' => 5, 'id' => 'incomplete-addresses', 'label' => 'Incomplete Addresses', 'value' => number_format($incompleteAddresses), 'change' => '1.6%', 'changeDirection' => 'down', 'statusState' => 'warning', 'iconName' => 'Clock'],
            ['seq' => 6, 'id' => 'invalid-contacts', 'label' => 'Invalid Contacts', 'value' => '0', 'change' => '0%', 'changeDirection' => 'neutral', 'statusState' => 'info', 'iconName' => 'UserX'],
            ['seq' => 7, 'id' => 'undeliverable-addresses', 'label' => 'Undeliverable Addresses', 'value' => '0', 'change' => '0%', 'changeDirection' => 'neutral', 'statusState' => 'info', 'iconName' => 'ShieldAlert'],
            ['seq' => 8, 'id' => 'duplicate-contacts', 'label' => 'Duplicate Contact Candidates', 'value' => '0', 'change' => '0%', 'changeDirection' => 'neutral', 'statusState' => 'info', 'iconName' => 'Copy'],
            ['seq' => 9, 'id' => 'shared-contacts', 'label' => 'Shared Contact Records', 'value' => '0', 'change' => '0%', 'changeDirection' => 'neutral', 'statusState' => 'info', 'iconName' => 'Users'],
            ['seq' => 10, 'id' => 'revalidation-due', 'label' => 'Address Revalidation Due', 'value' => '0', 'change' => '0%', 'changeDirection' => 'neutral', 'statusState' => 'info', 'iconName' => 'RefreshCw'],
            ['seq' => 11, 'id' => 'sla-breaches', 'label' => 'Contact Verification SLA Breaches', 'value' => '0', 'change' => '0%', 'changeDirection' => 'neutral', 'statusState' => 'info', 'iconName' => 'Clock'],
            ['seq' => 12, 'id' => 'update-requests', 'label' => 'Customer Update Requests Open', 'value' => '0', 'change' => '0%', 'changeDirection' => 'neutral', 'statusState' => 'info', 'iconName' => 'ShieldCheck'],
        ];

        $healthItems = [
            ['label' => 'Identity Linkage', 'val' => 92, 'color' => 'bg-emerald-500'],
            ['label' => 'Email Validity', 'val' => 96, 'color' => 'bg-emerald-500'],
            ['label' => 'Phone Validity', 'val' => 93, 'color' => 'bg-emerald-500'],
            ['label' => 'Address Completeness', 'val' => 89, 'color' => 'bg-emerald-500'],
            ['label' => 'Address Verification', 'val' => 91, 'color' => 'bg-emerald-500'],
            ['label' => 'Delivery Eligibility', 'val' => 90, 'color' => 'bg-emerald-500'],
            ['label' => 'Duplicate Control', 'val' => 88, 'color' => 'bg-emerald-500'],
            ['label' => 'Consent Alignment', 'val' => 95, 'color' => 'bg-emerald-500'],
            ['label' => 'Revalidation Readiness', 'val' => 87, 'color' => 'bg-emerald-500'],
            ['label' => 'Audit Completeness', 'val' => 97, 'color' => 'bg-emerald-500'],
        ];

        $operationCards = [
            [
                'id' => '1',
                'title' => '1. Contact Verification Ops',
                'seq' => '1',
                'listItems' => [
                    ['label' => 'Email Verified', 'val' => number_format($verifiedEmails)],
                    ['label' => 'Phone Verified', 'val' => number_format($verifiedPhones)]
                ]
            ],
            [
                'id' => '2',
                'title' => '2. Address Quality Ops',
                'seq' => '2',
                'listItems' => [
                    ['label' => 'Valid Addresses', 'val' => number_format($validAddresses)],
                    ['label' => 'Incomplete Addresses', 'val' => number_format($incompleteAddresses)]
                ]
            ]
        ];

        $lifecycleNodes = [
            ['stepNumber' => 1, 'id' => 'captured', 'label' => '1. Details Captured', 'count' => number_format($contactRecords), 'status' => 'Completed'],
            ['stepNumber' => 2, 'id' => 'email-verified', 'label' => '2. Email Verified', 'count' => number_format($verifiedEmails), 'status' => 'Completed'],
            ['stepNumber' => 3, 'id' => 'phone-verified', 'label' => '3. Phone Verified', 'count' => number_format($verifiedPhones), 'status' => 'Current'],
            ['stepNumber' => 4, 'id' => 'address-added', 'label' => '4. Address Added', 'count' => number_format($validAddresses), 'status' => 'Upcoming'],
            ['stepNumber' => 5, 'id' => 'address-verified', 'label' => '5. Address Verified', 'count' => '0', 'status' => 'Upcoming'],
        ];

        $rightRail = [
            'healthScore' => 92,
            'healthGrade' => 'Valid',
            'healthTitle' => 'Contacts & Address Health',
            'healthBars' => $healthItems,
            'alertsTitle' => 'Priority Address Alerts',
            'alerts' => [],
            'summaries' => [
                [
                    'title' => 'Address Verification Summary',
                    'items' => [
                        ['label' => 'Verified', 'count' => number_format($validAddresses), 'pct' => '100%', 'color' => '#10B981'],
                    ]
                ]
            ],
            'quickQueues' => []
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
            'customers' => $formattedCustomers,
            'pagination' => [
                'total' => $customersQuery->total(),
                'currentPage' => $customersQuery->currentPage(),
                'perPage' => $customersQuery->perPage(),
                'lastPage' => $customersQuery->lastPage(),
            ],
        ]);
    }
}
