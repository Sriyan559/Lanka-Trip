<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Order;
use App\Models\ReturnCase;
use App\Models\SupportCase;
use App\Models\CustomerVerification;
use App\Models\CustomerLoyaltyAccount;
use App\Models\CustomerLoyaltyTransaction;
use App\Models\CustomerRisk;
use App\Models\CustomerConsent;
use App\Models\CustomerAddress;
use App\Models\AdminDataJob;
use Illuminate\Http\Request;

class AdminCustomerDashboardController extends Controller
{
    public function commandCenter(Request $request)
    {
        // Base buyer query
        $totalCustomersQuery = User::where('role', 'buyer');
        $totalCount = $totalCustomersQuery->count();
        $new30dCount = (clone $totalCustomersQuery)->where('created_at', '>=', now()->subDays(30))->count();
        $activeCount = (clone $totalCustomersQuery)->where('updated_at', '>=', now()->subDays(30))->count();
        $dormantCount = (clone $totalCustomersQuery)->where('updated_at', '<', now()->subDays(90))->count();

        $verifiedCount = CustomerVerification::where('verification_status', 'verified')->count();
        $pendingVerificationCount = CustomerVerification::where('verification_status', 'pending')->count();

        $loyaltyCount = CustomerLoyaltyAccount::count();
        $restrictedCount = CustomerRisk::where('restriction_status', '!=', 'none')->count();
        $openSupportCount = SupportCase::whereIn('status', ['open', 'pending'])->count();
        $returnsCount = ReturnCase::whereIn('status', ['requested', 'pending'])->count();

        // Status Summary Aggregate Object
        $statusSummary = [
            'active' => $activeCount,
            'verificationPending' => $pendingVerificationCount,
            'dormant' => $dormantCount,
            'restricted' => $restrictedCount,
            'cases' => $openSupportCount,
            'returns' => $returnsCount,
        ];

        // 10 Customer Health Scorecard Items
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

        // 12 KPI Cards
        $kpis = [
            [
                'id' => 'kpi_total_customers',
                'seq' => 1,
                'label' => 'Total Registered Customers',
                'value' => number_format($totalCount),
                'change' => $new30dCount > 0 ? '+' . number_format($new30dCount) . ' this month' : 'No change',
                'changeDirection' => $new30dCount > 0 ? 'up' : 'neutral',
                'statusState' => 'positive',
                'iconName' => 'Users',
            ],
            [
                'id' => 'kpi_active_customers',
                'seq' => 2,
                'label' => 'Monthly Active Customers',
                'value' => number_format($activeCount),
                'change' => $totalCount > 0 ? round(($activeCount / max(1, $totalCount)) * 100, 1) . '% active' : '0%',
                'changeDirection' => 'neutral',
                'statusState' => 'positive',
                'iconName' => 'Activity',
            ],
            [
                'id' => 'kpi_new_signups',
                'seq' => 3,
                'label' => 'New Signups (30d)',
                'value' => number_format($new30dCount),
                'change' => $new30dCount > 0 ? '+' . $new30dCount : '0 vs last period',
                'changeDirection' => $new30dCount > 0 ? 'up' : 'neutral',
                'statusState' => 'info',
                'iconName' => 'UserPlus',
            ],
            [
                'id' => 'kpi_verified_identities',
                'seq' => 4,
                'label' => 'Verified Identities',
                'value' => number_format($verifiedCount),
                'change' => $pendingVerificationCount . ' pending',
                'changeDirection' => 'neutral',
                'statusState' => 'positive',
                'iconName' => 'ShieldCheck',
            ],
            [
                'id' => 'kpi_avg_lifetime_value',
                'seq' => 5,
                'label' => 'Avg Lifetime Value (LTV)',
                'value' => 'LKR 0',
                'change' => '0% vs last month',
                'changeDirection' => 'neutral',
                'statusState' => 'info',
                'iconName' => 'CreditCard',
            ],
            [
                'id' => 'kpi_loyalty_members',
                'seq' => 6,
                'label' => 'Loyalty Members (Active)',
                'value' => number_format($loyaltyCount),
                'change' => $totalCount > 0 ? round(($loyaltyCount / max(1, $totalCount)) * 100, 1) . '% penetration' : '0%',
                'changeDirection' => 'neutral',
                'statusState' => 'info',
                'iconName' => 'Award',
            ],
            [
                'id' => 'kpi_repeat_purchase',
                'seq' => 7,
                'label' => 'Repeat Purchase Rate',
                'value' => '0%',
                'change' => '0% vs last month',
                'changeDirection' => 'neutral',
                'statusState' => 'info',
                'iconName' => 'Repeat',
            ],
            [
                'id' => 'kpi_cart_abandonment',
                'seq' => 8,
                'label' => 'Cart Abandonment',
                'value' => '0%',
                'change' => '0% vs last month',
                'changeDirection' => 'warning',
                'statusState' => 'warning',
                'iconName' => 'ShoppingCart',
            ],
            [
                'id' => 'kpi_open_support_cases',
                'seq' => 9,
                'label' => 'Open Customer Cases',
                'value' => number_format($openSupportCount),
                'change' => '0 escalated',
                'changeDirection' => 'neutral',
                'statusState' => $openSupportCount > 0 ? 'warning' : 'info',
                'iconName' => 'Headset',
            ],
            [
                'id' => 'kpi_return_rate',
                'seq' => 10,
                'label' => 'Customer Return Rate',
                'value' => number_format($returnsCount),
                'change' => '0% vs last month',
                'changeDirection' => 'neutral',
                'statusState' => 'info',
                'iconName' => 'RotateCcw',
            ],
            [
                'id' => 'kpi_privacy_consent',
                'seq' => 11,
                'label' => 'Privacy Consent Rate',
                'value' => CustomerConsent::where('is_granted', true)->count() > 0 ? '100%' : '0%',
                'change' => '0 pending requests',
                'changeDirection' => 'neutral',
                'statusState' => 'info',
                'iconName' => 'Lock',
            ],
            [
                'id' => 'kpi_risk_restrictions',
                'seq' => 12,
                'label' => 'Accounts Restricted',
                'value' => number_format($restrictedCount),
                'change' => CustomerRisk::where('risk_level', 'high')->count() . ' high risk',
                'changeDirection' => $restrictedCount > 0 ? 'down' : 'neutral',
                'statusState' => $restrictedCount > 0 ? 'critical' : 'info',
                'iconName' => 'AlertOctagon',
            ],
        ];

        // Fetch recent paginated customers
        $customers = (clone $totalCustomersQuery)
            ->with(['customerVerification', 'customerLoyaltyAccount', 'customerRisk'])
            ->withCount(['orders', 'sentMessages'])
            ->orderBy('updated_at', 'desc')
            ->paginate(25);

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

        // Alerts array
        $alerts = [];
        if ($pendingVerificationCount > 0) {
            $alerts[] = [
                'id' => 'alert_verif_pending',
                'text' => 'Identity verification pending review',
                'count' => $pendingVerificationCount,
                'severity' => 'Medium',
            ];
        }
        if ($restrictedCount > 0) {
            $alerts[] = [
                'id' => 'alert_restricted',
                'text' => 'High risk accounts under restriction',
                'count' => $restrictedCount,
                'severity' => 'High',
            ];
        }

        // Right rail payload
        $rightRail = [
            'healthScore' => $totalCount > 0 ? 88 : 0,
            'healthGrade' => $totalCount > 0 ? 'Good' : 'N/A',
            'healthTitle' => 'Customer Operations Health',
            'healthBars' => [
                ['label' => 'Identity & Verification', 'val' => $totalCount > 0 ? 90 : 0],
                ['label' => 'Engagement', 'val' => $totalCount > 0 ? 85 : 0],
                ['label' => 'Purchase Behaviour', 'val' => $totalCount > 0 ? 80 : 0],
            ],
            'alertsTitle' => 'Priority Customer Alerts',
            'alerts' => $alerts,
            'summaries' => [],
            'quickQueues' => [
                ['label' => 'Pending Verifications', 'count' => $pendingVerificationCount],
                ['label' => 'High Risk Accounts', 'count' => $restrictedCount],
                ['label' => 'Escalated Cases', 'count' => $openSupportCount],
            ],
        ];

        return response()->json([
            'kpis' => $kpis,
            'statusSummary' => $statusSummary,
            'healthScorecard' => $healthScorecard,
            'customers' => $formattedCustomers,
            'pagination' => [
                'total' => $customers->total(),
                'currentPage' => $customers->currentPage(),
                'perPage' => $customers->perPage(),
                'lastPage' => $customers->lastPage(),
            ],
            'rightRail' => $rightRail,
        ]);
    }

    public function ordersDashboard(Request $request)
    {
        $totalOrders = Order::count();
        $ordersPeriod = Order::where('created_at', '>=', now()->subDays(30))->count();
        $completedOrders = Order::where('status', 'completed')->count();
        $processingOrders = Order::whereIn('status', ['pending', 'confirmed', 'production', 'shipped'])->count();
        $cancelledOrders = Order::where('status', 'cancelled')->count();
        $failedPayments = Order::where('payment_status', 'failed')->count();
        $delayedOrders = Order::where('status', '!=', 'completed')
            ->where('expected_delivery_date', '<', now())
            ->count();
        
        $activePurchasing = Order::select('buyer_id')->distinct()->count();
        $repeatBuyers = Order::select('buyer_id')
            ->groupBy('buyer_id')
            ->havingRaw('count(*) > 1')
            ->get()->count();
        $repeatRate = $activePurchasing > 0 ? round(($repeatBuyers / $activePurchasing) * 100) : 0;
        
        $avgVal = round(Order::avg('total_amount') ?: 0);
        $totalRev = Order::where('status', 'completed')->sum('total_amount');
        $buyerCount = User::where('role', 'buyer')->count();
        $clv = $buyerCount > 0 ? round($totalRev / $buyerCount) : 0;
        $ordersWithReturns = ReturnCase::select('order_id')->distinct()->count();

        $kpis = [
            ['seq' => 1, 'id' => 'total-orders', 'label' => 'Total Customer Orders', 'value' => number_format($totalOrders), 'change' => '2.6%', 'changeDirection' => 'up', 'statusState' => 'positive', 'iconName' => 'Users'],
            ['seq' => 2, 'id' => 'orders-period', 'label' => 'Orders This Period', 'value' => number_format($ordersPeriod), 'change' => '2.9%', 'changeDirection' => 'up', 'statusState' => 'positive', 'iconName' => 'UserPlus'],
            ['seq' => 3, 'id' => 'completed-orders', 'label' => 'Completed Orders', 'value' => number_format($completedOrders), 'change' => '3.1%', 'changeDirection' => 'up', 'statusState' => 'positive', 'iconName' => 'UserCheck'],
            ['seq' => 4, 'id' => 'orders-processing', 'label' => 'Orders Processing', 'value' => number_format($processingOrders), 'change' => '1.8%', 'changeDirection' => 'up', 'statusState' => 'info', 'iconName' => 'Clock'],
            ['seq' => 5, 'id' => 'cancelled-orders', 'label' => 'Cancelled Orders', 'value' => number_format($cancelledOrders), 'change' => '1.5%', 'changeDirection' => 'down', 'statusState' => 'critical', 'iconName' => 'UserX'],
            ['seq' => 6, 'id' => 'failed-payments', 'label' => 'Failed Payments', 'value' => number_format($failedPayments), 'change' => '2.4%', 'changeDirection' => 'down', 'statusState' => 'critical', 'iconName' => 'ShieldAlert'],
            ['seq' => 7, 'id' => 'orders-delayed', 'label' => 'Orders Delayed', 'value' => number_format($delayedOrders), 'change' => '4.6%', 'changeDirection' => 'down', 'statusState' => 'warning', 'iconName' => 'Clock'],
            ['seq' => 8, 'id' => 'active-customers', 'label' => 'Active Purchasing Customers', 'value' => number_format($activePurchasing), 'change' => '4.0%', 'changeDirection' => 'up', 'statusState' => 'positive', 'iconName' => 'Users'],
            ['seq' => 9, 'id' => 'repeat-rate', 'label' => 'Repeat Purchase Rate', 'value' => $repeatRate . '%', 'change' => '3.2 pts', 'changeDirection' => 'up', 'statusState' => 'positive', 'iconName' => 'RefreshCw'],
            ['seq' => 10, 'id' => 'avg-order-val', 'label' => 'Average Order Value', 'value' => 'LKR ' . number_format($avgVal), 'change' => '3.5%', 'changeDirection' => 'up', 'statusState' => 'positive', 'iconName' => 'Crown'],
            ['seq' => 11, 'id' => 'clv', 'label' => 'Customer Lifetime Value', 'value' => 'LKR ' . number_format($clv), 'change' => '4.7%', 'changeDirection' => 'up', 'statusState' => 'positive', 'iconName' => 'Award'],
            ['seq' => 12, 'id' => 'orders-returns', 'label' => 'Orders with Returns or Disputes', 'value' => number_format($ordersWithReturns), 'change' => '2.1%', 'changeDirection' => 'down', 'statusState' => 'warning', 'iconName' => 'Copy'],
        ];

        $healthItems = [
            ['label' => 'Purchase Frequency', 'val' => $repeatRate > 0 ? $repeatRate : 80, 'color' => 'bg-emerald-500'],
            ['label' => 'Order Value', 'val' => $avgVal > 0 ? 85 : 0, 'color' => 'bg-emerald-500'],
            ['label' => 'Payment Reliability', 'val' => $totalOrders > 0 ? round((($totalOrders - $failedPayments) / $totalOrders) * 100) : 100, 'color' => 'bg-emerald-500'],
            ['label' => 'Fulfilment Timeliness', 'val' => $totalOrders > 0 ? round((($totalOrders - $delayedOrders) / $totalOrders) * 100) : 100, 'color' => 'bg-emerald-500'],
            ['label' => 'Delivery Success', 'val' => 90, 'color' => 'bg-emerald-500'],
            ['label' => 'Return Control', 'val' => $totalOrders > 0 ? round((1 - ($ordersWithReturns / $totalOrders)) * 100) : 100, 'color' => 'bg-emerald-500'],
            ['label' => 'Loyalty Impact', 'val' => 85, 'color' => 'bg-emerald-500'],
            ['label' => 'Channel Coverage', 'val' => 88, 'color' => 'bg-emerald-500'],
            ['label' => 'Audit Readiness', 'val' => 90, 'color' => 'bg-emerald-500'],
        ];

        $operationCards = [
            [
                'id' => '1',
                'title' => '1. Customer Purchase Summary',
                'seq' => '1',
                'listItems' => [
                    ['label' => 'Total Orders', 'val' => number_format($totalOrders), 'pct' => '2.6%'],
                    ['label' => 'Active Customers', 'val' => number_format($activePurchasing), 'pct' => '4.0%'],
                    ['label' => 'New Customers', 'val' => number_format(User::where('role', 'buyer')->where('created_at', '>=', now()->subDays(30))->count()), 'pct' => '2.1%']
                ]
            ],
            [
                'id' => '2',
                'title' => '2. Order Value & CLV',
                'seq' => '2',
                'listItems' => [
                    ['label' => 'Avg Order Value', 'val' => 'LKR ' . number_format($avgVal), 'pct' => '3.5%'],
                    ['label' => 'Total Revenue', 'val' => 'LKR ' . number_format($totalRev), 'pct' => '4.2%'],
                    ['label' => 'CLV', 'val' => 'LKR ' . number_format($clv), 'pct' => '4.7%']
                ]
            ],
            [
                'id' => '3',
                'title' => '3. Recent Customer Orders',
                'seq' => '3',
                'listItems' => Order::latest()->limit(3)->get()->map(function($o) {
                    return [
                        'label' => $o->order_number . ' - ' . ($o->buyer?->name ?? 'Buyer'),
                        'val' => 'LKR ' . number_format($o->total_amount),
                        'badge' => ucfirst($o->status)
                    ];
                })->toArray()
            ],
            [
                'id' => '4',
                'title' => '4. Purchase Frequency & Retention',
                'seq' => '4',
                'listItems' => [
                    ['label' => 'Repeat Rate', 'val' => $repeatRate . '%'],
                    ['label' => 'Retention Rate', 'val' => '78%'],
                    ['label' => 'Avg Orders / Cust', 'val' => $buyerCount > 0 ? number_format($totalOrders / $buyerCount, 1) : '0']
                ]
            ],
            [
                'id' => '5',
                'title' => '5. Product, Category & Brand Affinity',
                'seq' => '5',
                'listItems' => [
                    ['label' => 'Skincare', 'val' => '62%', 'pct' => 'L\'Oreal'],
                    ['label' => 'Haircare', 'val' => '24%', 'pct' => 'Maybelline'],
                    ['label' => 'Makeup', 'val' => '21%', 'pct' => 'Nykaa']
                ]
            ],
            [
                'id' => '6',
                'title' => '6. Customer Payment Performance',
                'seq' => '6',
                'listItems' => [
                    ['label' => 'Success Rate', 'val' => $totalOrders > 0 ? round((Order::where('payment_status', 'paid')->count() / $totalOrders) * 100, 1) . '%' : '100%'],
                    ['label' => 'Failed Rate', 'val' => $totalOrders > 0 ? round(($failedPayments / $totalOrders) * 100, 1) . '%' : '0%'],
                    ['label' => 'Avg Payment Time', 'val' => '1.2 hrs']
                ]
            ],
            [
                'id' => '7',
                'title' => '7. Fulfilment & Delivery Performance',
                'seq' => '7',
                'listItems' => [
                    ['label' => 'On-time Fulfilment', 'val' => '95%'],
                    ['label' => 'Delivery Success', 'val' => '98%'],
                    ['label' => 'Avg Delivery Time', 'val' => '2.3 days']
                ]
            ],
            [
                'id' => '8',
                'title' => '8. Order Cancellations',
                'seq' => '8',
                'listItems' => [
                    ['label' => 'Cancelled Orders', 'val' => number_format($cancelledOrders)],
                    ['label' => 'Cancellation Rate', 'val' => $totalOrders > 0 ? round(($cancelledOrders / $totalOrders) * 100, 2) . '%' : '0%'],
                    ['label' => 'Before Fulfilment', 'val' => '92%']
                ]
            ],
            [
                'id' => '9',
                'title' => '9. Returns, Refunds & Disputes',
                'seq' => '9',
                'listItems' => [
                    ['label' => 'Return Rate', 'val' => $totalOrders > 0 ? round(($ordersWithReturns / $totalOrders) * 100, 2) . '%' : '0%'],
                    ['label' => 'Refunds Issued', 'val' => number_format(ReturnCase::where('status', 'completed')->count())],
                    ['label' => 'Open Disputes', 'val' => number_format(ReturnCase::whereIn('status', ['requested', 'under_review'])->count())]
                ]
            ],
            [
                'id' => '10',
                'title' => '10. Loyalty & Promotion Impact',
                'seq' => '10',
                'listItems' => [
                    ['label' => 'Loyalty Used Orders', 'val' => 'LKR ' . number_format(Order::where('discount_amount', '>', 0)->sum('discount_amount'))],
                    ['label' => 'Exceptions', 'val' => '0'],
                    ['label' => 'Fraud Suspicion', 'val' => '0']
                ]
            ],
            [
                'id' => '11',
                'title' => '11. Recent Order Activity',
                'seq' => '11',
                'listItems' => [
                    ['label' => 'On-Track', 'val' => '95%'],
                    ['label' => 'At Risk', 'val' => '4%'],
                    ['label' => 'Breached', 'val' => '1%']
                ]
            ]
        ];

        $lifecycleNodes = [
            ['stepNumber' => 1, 'id' => 'converted', 'label' => '1. Customer Converted', 'count' => number_format($buyerCount), 'status' => 'Completed'],
            ['stepNumber' => 2, 'id' => 'placed', 'label' => '2. Order Placed', 'count' => number_format($totalOrders), 'status' => 'Completed'],
            ['stepNumber' => 3, 'id' => 'paid', 'label' => '3. Paid', 'count' => number_format(Order::where('payment_status', 'paid')->count()), 'status' => 'Completed'],
            ['stepNumber' => 4, 'id' => 'fulfilment', 'label' => '4. Fulfilment', 'count' => number_format($processingOrders), 'status' => 'Current'],
            ['stepNumber' => 5, 'id' => 'shipped', 'label' => '5. Shipped', 'count' => number_format(Order::where('status', 'shipped')->count()), 'status' => 'Upcoming'],
            ['stepNumber' => 6, 'id' => 'delivered', 'label' => '6. Delivered', 'count' => number_format(Order::where('status', 'completed')->count()), 'status' => 'Upcoming'],
            ['stepNumber' => 7, 'id' => 'completed', 'label' => '7. Completed', 'count' => number_format($completedOrders), 'status' => 'Upcoming'],
            ['stepNumber' => 8, 'id' => 'returns-disputes', 'label' => '8. Return / Dispute', 'count' => number_format($ordersWithReturns), 'status' => 'Upcoming'],
        ];

        $rightRail = [
            'healthScore' => 89,
            'healthGrade' => 'Good / Stable',
            'healthTitle' => 'Customer Purchase Health',
            'healthBars' => $healthItems,
            'alertsTitle' => 'Priority Order Alerts',
            'alerts' => [
                ['id' => 'a1', 'text' => 'Payment failures pending', 'count' => $failedPayments, 'severity' => 'High'],
                ['id' => 'a2', 'text' => 'Orders delayed', 'count' => $delayedOrders, 'severity' => 'High'],
            ],
            'summaries' => [
                [
                    'title' => 'Order Status Summary',
                    'items' => [
                        ['label' => 'Completed', 'count' => number_format($completedOrders), 'pct' => $totalOrders > 0 ? round(($completedOrders / $totalOrders) * 100, 1) . '%' : '0%', 'color' => '#10B981'],
                        ['label' => 'Processing', 'count' => number_format($processingOrders), 'pct' => $totalOrders > 0 ? round(($processingOrders / $totalOrders) * 100, 1) . '%' : '0%', 'color' => '#3B82F6'],
                        ['label' => 'Cancelled', 'count' => number_format($cancelledOrders), 'pct' => $totalOrders > 0 ? round(($cancelledOrders / $totalOrders) * 100, 1) . '%' : '0%', 'color' => '#EF4444'],
                    ]
                ]
            ],
            'quickQueues' => [
                ['label' => 'Delayed Orders', 'count' => $delayedOrders],
                ['label' => 'Failed Payments', 'count' => $failedPayments],
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

    public function returnsDashboard(Request $request)
    {
        $totalReturns = ReturnCase::count();
        $casesCreated = ReturnCase::where('created_at', '>=', now()->subDays(30))->count();
        $evidenceCollected = ReturnCase::where('status', 'evidence_required')->count();
        $eligibilityReview = ReturnCase::where('status', 'under_review')->count();
        $decision = ReturnCase::whereIn('status', ['approved', 'rejected'])->count();
        $returnPickup = ReturnCase::where('status', 'return_shipment_pending')->count();
        $refundExchange = ReturnCase::where('status', 'refund_pending')->count();
        $disputeResolution = ReturnCase::whereHas('supportCase')->count();
        $closedCases = ReturnCase::whereIn('status', ['completed', 'cancelled'])->count();

        $approvedCount = ReturnCase::where('status', 'approved')->count();
        $rejectedCount = ReturnCase::where('status', 'rejected')->count();
        $pendingDecision = ReturnCase::where('status', 'requested')->count();
        $escalatedCount = ReturnCase::where('status', 'under_review')->count();
        $totalRefundAmount = \App\Models\ReturnItem::sum('approved_refund_amount') ?: 0;

        $kpis = [
            ['seq' => 1, 'id' => 'total-cases', 'label' => 'Total Return Cases', 'value' => number_format($totalReturns), 'change' => '1.5%', 'changeDirection' => 'down', 'statusState' => 'info', 'iconName' => 'Copy'],
            ['seq' => 2, 'id' => 'cases-created', 'label' => 'Cases Created (30d)', 'value' => number_format($casesCreated), 'change' => '2.4%', 'changeDirection' => 'down', 'statusState' => 'info', 'iconName' => 'Clock'],
            ['seq' => 3, 'id' => 'evidence-collected', 'label' => 'Evidence Collected', 'value' => number_format($evidenceCollected), 'change' => '0%', 'changeDirection' => 'neutral', 'statusState' => 'info', 'iconName' => 'UserCheck'],
            ['seq' => 4, 'id' => 'eligibility-review', 'label' => 'Eligibility Review', 'value' => number_format($eligibilityReview), 'change' => '3.1%', 'changeDirection' => 'up', 'statusState' => 'warning', 'iconName' => 'Clock'],
            ['seq' => 5, 'id' => 'decision-made', 'label' => 'Decisions Completed', 'value' => number_format($decision), 'change' => '4.2%', 'changeDirection' => 'up', 'statusState' => 'positive', 'iconName' => 'UserCheck'],
            ['seq' => 6, 'id' => 'pickup-pending', 'label' => 'Return Pickups Pending', 'value' => number_format($returnPickup), 'change' => '1.2%', 'changeDirection' => 'down', 'statusState' => 'info', 'iconName' => 'Clock'],
            ['seq' => 7, 'id' => 'refund-pending', 'label' => 'Refunds Pending', 'value' => number_format($refundExchange), 'change' => '5.6%', 'changeDirection' => 'up', 'statusState' => 'warning', 'iconName' => 'Clock'],
            ['seq' => 8, 'id' => 'disputes-open', 'label' => 'Open Disputes', 'value' => number_format($disputeResolution), 'change' => '2.1%', 'changeDirection' => 'down', 'statusState' => 'warning', 'iconName' => 'Copy'],
            ['seq' => 9, 'id' => 'closed-cases', 'label' => 'Closed Cases', 'value' => number_format($closedCases), 'change' => '3.5%', 'changeDirection' => 'up', 'statusState' => 'positive', 'iconName' => 'UserCheck'],
        ];

        $healthItems = [
            ['label' => 'Eligibility Review Quality', 'val' => 88, 'color' => 'bg-emerald-500'],
            ['label' => 'Resolution SLA', 'val' => 92, 'color' => 'bg-emerald-500'],
            ['label' => 'Evidence Validity', 'val' => 90, 'color' => 'bg-emerald-500'],
            ['label' => 'Refund Accuracy', 'val' => 95, 'color' => 'bg-emerald-500'],
        ];

        $operationCards = [
            [
                'id' => '1',
                'title' => '1. Return & Refund Case Lifecycle',
                'seq' => '1',
                'listItems' => [
                    ['label' => 'Case Created', 'val' => number_format($totalReturns)],
                    ['label' => 'Evidence Collected', 'val' => number_format($evidenceCollected)],
                    ['label' => 'Eligibility Review', 'val' => number_format($eligibilityReview)]
                ]
            ],
            [
                'id' => '2',
                'title' => '2. Case Status Summary',
                'seq' => '2',
                'listItems' => [
                    ['label' => 'Approved', 'val' => number_format($approvedCount)],
                    ['label' => 'Rejected', 'val' => number_format($rejectedCount)],
                    ['label' => 'Pending', 'val' => number_format($pendingDecision)]
                ]
            ],
            [
                'id' => '3',
                'title' => '3. Quick Queues',
                'seq' => '3',
                'listItems' => [
                    ['label' => 'Escalated Cases', 'val' => number_format($escalatedCount)],
                    ['label' => 'Total Refunded', 'val' => 'LKR ' . number_format($totalRefundAmount)]
                ]
            ]
        ];

        $lifecycleNodes = [
            ['stepNumber' => 1, 'id' => 'created', 'label' => '1. Case Created', 'count' => number_format($totalReturns), 'status' => 'Completed'],
            ['stepNumber' => 2, 'id' => 'evidence', 'label' => '2. Evidence Collected', 'count' => number_format($evidenceCollected), 'status' => 'Completed'],
            ['stepNumber' => 3, 'id' => 'review', 'label' => '3. Eligibility Review', 'count' => number_format($eligibilityReview), 'status' => 'Current'],
            ['stepNumber' => 4, 'id' => 'decision', 'label' => '4. Decision', 'count' => number_format($decision), 'status' => 'Upcoming'],
            ['stepNumber' => 5, 'id' => 'pickup', 'label' => '5. Return Pickup', 'count' => number_format($returnPickup), 'status' => 'Upcoming'],
            ['stepNumber' => 6, 'id' => 'refund', 'label' => '6. Refund / Exchange', 'count' => number_format($refundExchange), 'status' => 'Upcoming'],
            ['stepNumber' => 7, 'id' => 'dispute', 'label' => '7. Dispute Resolution', 'count' => number_format($disputeResolution), 'status' => 'Upcoming'],
            ['stepNumber' => 8, 'id' => 'closed', 'label' => '8. Closed', 'count' => number_format($closedCases), 'status' => 'Upcoming'],
        ];

        $rightRail = [
            'healthScore' => 91,
            'healthGrade' => 'Stable',
            'healthTitle' => 'Return Operations Health',
            'healthBars' => $healthItems,
            'alertsTitle' => 'Priority Case Alerts',
            'alerts' => [
                ['id' => 'a1', 'text' => 'High refund dispute open', 'count' => $disputeResolution, 'severity' => 'High']
            ],
            'summaries' => [
                [
                    'title' => 'Case Status Summary',
                    'items' => [
                        ['label' => 'Completed', 'count' => number_format($closedCases), 'pct' => $totalReturns > 0 ? round(($closedCases / $totalReturns) * 100, 1) . '%' : '0%', 'color' => '#10B981'],
                        ['label' => 'Pending Review', 'count' => number_format($eligibilityReview), 'pct' => $totalReturns > 0 ? round(($eligibilityReview / $totalReturns) * 100, 1) . '%' : '0%', 'color' => '#F59E0B'],
                    ]
                ]
            ],
            'quickQueues' => [
                ['label' => 'Under Review', 'count' => $eligibilityReview],
                ['label' => 'Disputes', 'count' => $disputeResolution]
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
                'returnsCount' => $user->returnCases()->count(),
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

    public function loyaltyDashboard(Request $request)
    {
        $totalMembers = CustomerLoyaltyAccount::count();
        $activeMembers = CustomerLoyaltyAccount::where('updated_at', '>=', now()->subDays(30))->count();
        $suspendedMembers = User::where('role', 'buyer')->whereHas('customerRisk', function($q) {
            $q->where('restriction_status', '!=', 'none');
        })->count();
        
        $bronzeCount = CustomerLoyaltyAccount::where('tier', 'bronze')->count();
        $silverCount = CustomerLoyaltyAccount::where('tier', 'silver')->count();
        $goldCount = CustomerLoyaltyAccount::where('tier', 'gold')->count();
        $platinumCount = CustomerLoyaltyAccount::where('tier', 'platinum')->count();

        $pointsBalance = CustomerLoyaltyAccount::sum('points_balance') ?: 0;
        $pointsEarned = CustomerLoyaltyTransaction::where('transaction_type', 'earn')->sum('points') ?: 0;
        $pointsRedeemed = CustomerLoyaltyTransaction::where('transaction_type', 'redeem')->sum('points') ?: 0;

        $kpis = [
            ['seq' => 1, 'id' => 'total-members', 'label' => 'Total Loyalty Members', 'value' => number_format($totalMembers), 'change' => '2.5%', 'changeDirection' => 'up', 'statusState' => 'positive', 'iconName' => 'Users'],
            ['seq' => 2, 'id' => 'points-balance', 'label' => 'Total Points Balance', 'value' => number_format($pointsBalance), 'change' => '4.2%', 'changeDirection' => 'up', 'statusState' => 'positive', 'iconName' => 'Award'],
            ['seq' => 3, 'id' => 'points-earned', 'label' => 'Points Earned YTD', 'value' => number_format($pointsEarned), 'change' => '6.1%', 'changeDirection' => 'up', 'statusState' => 'positive', 'iconName' => 'Award'],
            ['seq' => 4, 'id' => 'points-redeemed', 'label' => 'Points Redeemed YTD', 'value' => number_format($pointsRedeemed), 'change' => '5.2%', 'changeDirection' => 'up', 'statusState' => 'positive', 'iconName' => 'Award'],
            ['seq' => 5, 'id' => 'active-members', 'label' => 'Active Loyalty Members', 'value' => number_format($activeMembers), 'change' => '1.8%', 'changeDirection' => 'up', 'statusState' => 'positive', 'iconName' => 'Users'],
            ['seq' => 6, 'id' => 'suspended-members', 'label' => 'Suspended Accounts', 'value' => number_format($suspendedMembers), 'change' => '0%', 'changeDirection' => 'neutral', 'statusState' => 'critical', 'iconName' => 'AlertOctagon'],
        ];

        $healthItems = [
            ['label' => 'Points Liability Control', 'val' => 90, 'color' => 'bg-emerald-500'],
            ['label' => 'Tier Progression Activity', 'val' => 82, 'color' => 'bg-emerald-500'],
            ['label' => 'Redemption Success Rate', 'val' => 94, 'color' => 'bg-emerald-500'],
        ];

        $operationCards = [
            [
                'id' => '1',
                'title' => '1. Loyalty Programme Ops',
                'seq' => '1',
                'listItems' => [
                    ['label' => 'Total Members', 'val' => number_format($totalMembers)],
                    ['label' => 'Bronze Tier', 'val' => number_format($bronzeCount)],
                    ['label' => 'Silver Tier', 'val' => number_format($silverCount)]
                ]
            ],
            [
                'id' => '2',
                'title' => '2. Tier Management',
                'seq' => '2',
                'listItems' => [
                    ['label' => 'Gold Tier', 'val' => number_format($goldCount)],
                    ['label' => 'Platinum Tier', 'val' => number_format($platinumCount)]
                ]
            ]
        ];

        $lifecycleNodes = [
            ['stepNumber' => 1, 'id' => 'active', 'label' => '1. Active', 'count' => number_format($activeMembers), 'status' => 'Completed'],
            ['stepNumber' => 2, 'id' => 'pending', 'label' => '2. Pending Review', 'count' => '0', 'status' => 'Current'],
            ['stepNumber' => 3, 'id' => 'suspended', 'label' => '3. Suspended', 'count' => number_format($suspendedMembers), 'status' => 'Upcoming'],
            ['stepNumber' => 4, 'id' => 'closed', 'label' => '4. Closed', 'count' => '0', 'status' => 'Upcoming'],
        ];

        $rightRail = [
            'healthScore' => 88,
            'healthGrade' => 'Active',
            'healthTitle' => 'Loyalty Operations Health',
            'healthBars' => $healthItems,
            'alertsTitle' => 'Priority Loyalty Alerts',
            'alerts' => [],
            'summaries' => [
                [
                    'title' => 'Membership Status Summary',
                    'items' => [
                        ['label' => 'Active', 'count' => number_format($activeMembers), 'pct' => $totalMembers > 0 ? round(($activeMembers / $totalMembers) * 100, 1) . '%' : '0%', 'color' => '#10B981'],
                    ]
                ]
            ],
            'quickQueues' => [
                ['label' => 'Suspended Members', 'count' => $suspendedMembers]
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

    public function consentDashboard(Request $request)
    {
        $totalConsents = CustomerConsent::count();
        $grantedConsents = CustomerConsent::where('is_granted', true)->count();
        $revokedConsents = CustomerConsent::whereNotNull('revoked_at')->count();
        
        $marketingCount = CustomerConsent::where('consent_type', 'marketing')->where('is_granted', true)->count();
        $dataSharingCount = CustomerConsent::where('consent_type', 'data_sharing')->where('is_granted', true)->count();
        $termsCount = CustomerConsent::where('consent_type', 'terms')->where('is_granted', true)->count();

        $kpis = [
            ['seq' => 1, 'id' => 'total-consents', 'label' => 'Total Consent Records', 'value' => number_format($totalConsents), 'change' => '1.5%', 'changeDirection' => 'up', 'statusState' => 'positive', 'iconName' => 'Users'],
            ['seq' => 2, 'id' => 'granted-consents', 'label' => 'Granted Consents', 'value' => number_format($grantedConsents), 'change' => '2.1%', 'changeDirection' => 'up', 'statusState' => 'positive', 'iconName' => 'UserCheck'],
            ['seq' => 3, 'id' => 'revoked-consents', 'label' => 'Revoked Consents', 'value' => number_format($revokedConsents), 'change' => '0.5%', 'changeDirection' => 'down', 'statusState' => 'critical', 'iconName' => 'UserX'],
            ['seq' => 4, 'id' => 'marketing-consent', 'label' => 'Marketing Consent Granted', 'value' => number_format($marketingCount), 'change' => '1.2%', 'changeDirection' => 'up', 'statusState' => 'positive', 'iconName' => 'UserCheck'],
            ['seq' => 5, 'id' => 'data-sharing', 'label' => 'Data Sharing Granted', 'value' => number_format($dataSharingCount), 'change' => '0.8%', 'changeDirection' => 'up', 'statusState' => 'positive', 'iconName' => 'UserCheck'],
            ['seq' => 6, 'id' => 'terms-consent', 'label' => 'Terms Consent Granted', 'value' => number_format($termsCount), 'change' => '2.0%', 'changeDirection' => 'up', 'statusState' => 'positive', 'iconName' => 'UserCheck'],
        ];

        $healthItems = [
            ['label' => 'Consent Audit Compliance', 'val' => 95, 'color' => 'bg-emerald-500'],
            ['label' => 'User Preference Match', 'val' => 91, 'color' => 'bg-emerald-500'],
            ['label' => 'Revocation Response Time', 'val' => 88, 'color' => 'bg-emerald-500'],
        ];

        $operationCards = [
            [
                'id' => '1',
                'title' => '1. Consent Channel Management',
                'seq' => '1',
                'listItems' => [
                    ['label' => 'Total Consent Grantees', 'val' => number_format($grantedConsents)],
                    ['label' => 'Marketing Opt-In', 'val' => number_format($marketingCount)]
                ]
            ],
            [
                'id' => '2',
                'title' => '2. Processing Purposes & Lawful Basis',
                'seq' => '2',
                'listItems' => [
                    ['label' => 'Contractual Basis', 'val' => number_format($termsCount)],
                    ['label' => 'Legitimate Interest Basis', 'val' => number_format($dataSharingCount)]
                ]
            ]
        ];

        $lifecycleNodes = [
            ['stepNumber' => 1, 'id' => 'captured', 'label' => '1. Consent Captured', 'count' => number_format($totalConsents), 'status' => 'Completed'],
            ['stepNumber' => 2, 'id' => 'updated', 'label' => '2. Preference Updated', 'count' => '0', 'status' => 'Current'],
            ['stepNumber' => 3, 'id' => 'verified', 'label' => '3. Verification Checked', 'count' => '0', 'status' => 'Upcoming'],
            ['stepNumber' => 4, 'id' => 'archived', 'label' => '4. Audit Archived', 'count' => '0', 'status' => 'Upcoming'],
        ];

        $rightRail = [
            'healthScore' => 92,
            'healthGrade' => 'Compliant',
            'healthTitle' => 'Consent Compliance Health',
            'healthBars' => $healthItems,
            'alertsTitle' => 'Priority Consent Alerts',
            'alerts' => [],
            'summaries' => [
                [
                    'title' => 'Consent Status Summary',
                    'items' => [
                        ['label' => 'Granted', 'count' => number_format($grantedConsents), 'pct' => $totalConsents > 0 ? round(($grantedConsents / $totalConsents) * 100, 1) . '%' : '0%', 'color' => '#10B981'],
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
                'consentStatus' => $user->customerConsents()->where('is_granted', true)->exists() ? 'Granted' : 'Pending',
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

    public function riskDashboard(Request $request)
    {
        $totalRisks = CustomerRisk::count();
        $lowRiskCount = CustomerRisk::where('risk_level', 'low')->count();
        $mediumRiskCount = CustomerRisk::where('risk_level', 'medium')->count();
        $highRiskCount = CustomerRisk::where('risk_level', 'high')->count();
        $criticalRiskCount = CustomerRisk::where('risk_level', 'critical')->count();
        $restrictedCount = CustomerRisk::where('restriction_status', '!=', 'none')->count();

        $kpis = [
            ['seq' => 1, 'id' => 'total-risks', 'label' => 'Total Evaluated Accounts', 'value' => number_format($totalRisks), 'change' => '1.2%', 'changeDirection' => 'up', 'statusState' => 'info', 'iconName' => 'Users'],
            ['seq' => 2, 'id' => 'low-risk', 'label' => 'Low Risk Accounts', 'value' => number_format($lowRiskCount), 'change' => '2.1%', 'changeDirection' => 'up', 'statusState' => 'positive', 'iconName' => 'UserCheck'],
            ['seq' => 3, 'id' => 'medium-risk', 'label' => 'Medium Risk Accounts', 'value' => number_format($mediumRiskCount), 'change' => '0.5%', 'changeDirection' => 'down', 'statusState' => 'warning', 'iconName' => 'Clock'],
            ['seq' => 4, 'id' => 'high-risk', 'label' => 'High Risk Accounts', 'value' => number_format($highRiskCount), 'change' => '0.8%', 'changeDirection' => 'down', 'statusState' => 'critical', 'iconName' => 'AlertOctagon'],
            ['seq' => 5, 'id' => 'restricted-accounts', 'label' => 'Restricted Accounts', 'value' => number_format($restrictedCount), 'change' => '0%', 'changeDirection' => 'neutral', 'statusState' => 'critical', 'iconName' => 'Lock'],
        ];

        $healthItems = [
            ['label' => 'Fraud Detection Coverage', 'val' => 94, 'color' => 'bg-emerald-500'],
            ['label' => 'Chargeback Control', 'val' => 97, 'color' => 'bg-emerald-500'],
            ['label' => 'Restrict Execution SLA', 'val' => 90, 'color' => 'bg-emerald-500'],
        ];

        $operationCards = [
            [
                'id' => '1',
                'title' => '1. Customer Risk Workflow',
                'seq' => '1',
                'listItems' => [
                    ['label' => 'Low Risk', 'val' => number_format($lowRiskCount)],
                    ['label' => 'Medium Risk', 'val' => number_format($mediumRiskCount)],
                    ['label' => 'High Risk', 'val' => number_format($highRiskCount)]
                ]
            ],
            [
                'id' => '2',
                'title' => '2. Risk Score Breakdown',
                'seq' => '2',
                'listItems' => [
                    ['label' => 'Critical Risk', 'val' => number_format($criticalRiskCount)],
                    ['label' => 'Restricted', 'val' => number_format($restrictedCount)]
                ]
            ]
        ];

        $lifecycleNodes = [
            ['stepNumber' => 1, 'id' => 'detected', 'label' => '1. Detected', 'count' => number_format($highRiskCount), 'status' => 'Completed'],
            ['stepNumber' => 2, 'id' => 'triaged', 'label' => '2. Triaged', 'count' => '0', 'status' => 'Current'],
            ['stepNumber' => 3, 'id' => 'review', 'label' => '3. Restriction Applied', 'count' => number_format($restrictedCount), 'status' => 'Upcoming'],
            ['stepNumber' => 4, 'id' => 'closed', 'label' => '4. Cleared', 'count' => '0', 'status' => 'Upcoming'],
        ];

        $rightRail = [
            'healthScore' => 93,
            'healthGrade' => 'Protected',
            'healthTitle' => 'Risk & Security Health',
            'healthBars' => $healthItems,
            'alertsTitle' => 'Priority Risk Alerts',
            'alerts' => [
                ['id' => 'a1', 'text' => 'High risk accounts active', 'count' => $highRiskCount, 'severity' => 'High']
            ],
            'summaries' => [
                [
                    'title' => 'Risk Level Summary',
                    'items' => [
                        ['label' => 'Low', 'count' => number_format($lowRiskCount), 'pct' => $totalRisks > 0 ? round(($lowRiskCount / $totalRisks) * 100, 1) . '%' : '0%', 'color' => '#10B981'],
                        ['label' => 'Medium', 'count' => number_format($mediumRiskCount), 'pct' => $totalRisks > 0 ? round(($mediumRiskCount / $totalRisks) * 100, 1) . '%' : '0%', 'color' => '#F59E0B'],
                        ['label' => 'High', 'count' => number_format($highRiskCount), 'pct' => $totalRisks > 0 ? round(($highRiskCount / $totalRisks) * 100, 1) . '%' : '0%', 'color' => '#EF4444'],
                        ['label' => 'Critical', 'count' => number_format($criticalRiskCount), 'pct' => $totalRisks > 0 ? round(($criticalRiskCount / $totalRisks) * 100, 1) . '%' : '0%', 'color' => '#991B1B'],
                    ]
                ]
            ],
            'quickQueues' => [
                ['label' => 'High Risk Queue', 'count' => $highRiskCount],
                ['label' => 'Restricted Queue', 'count' => $restrictedCount],
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

    public function supportDashboard(Request $request)
    {
        $totalCases = SupportCase::count();
        $openCases = SupportCase::whereIn('status', ['open', 'assigned', 'in_progress'])->count();
        $resolvedCases = SupportCase::where('status', 'resolved')->count();
        $closedCases = SupportCase::where('status', 'closed')->count();
        $escalatedCases = SupportCase::where('escalation_level', '>', 0)->count();
        $slaBreachedCases = SupportCase::where('sla_status', 'breached')->count();

        $kpis = [
            ['seq' => 1, 'id' => 'total-cases', 'label' => 'Total Support Cases', 'value' => number_format($totalCases), 'change' => '2.1%', 'changeDirection' => 'up', 'statusState' => 'info', 'iconName' => 'Headset'],
            ['seq' => 2, 'id' => 'open-cases', 'label' => 'Open Support Cases', 'value' => number_format($openCases), 'change' => '1.5%', 'changeDirection' => 'down', 'statusState' => 'warning', 'iconName' => 'Clock'],
            ['seq' => 3, 'id' => 'resolved-cases', 'label' => 'Resolved Cases (30d)', 'value' => number_format($resolvedCases), 'change' => '3.0%', 'changeDirection' => 'up', 'statusState' => 'positive', 'iconName' => 'UserCheck'],
            ['seq' => 4, 'id' => 'escalated-cases', 'label' => 'Escalated Cases', 'value' => number_format($escalatedCases), 'change' => '0.5%', 'changeDirection' => 'down', 'statusState' => 'critical', 'iconName' => 'AlertOctagon'],
            ['seq' => 5, 'id' => 'sla-breaches', 'label' => 'SLA Breaches', 'value' => number_format($slaBreachedCases), 'change' => '1.0%', 'changeDirection' => 'down', 'statusState' => 'critical', 'iconName' => 'Clock'],
        ];

        $healthItems = [
            ['label' => 'First Response SLA', 'val' => 90, 'color' => 'bg-emerald-500'],
            ['label' => 'Resolution SLA Compliance', 'val' => 88, 'color' => 'bg-emerald-500'],
            ['label' => 'Customer Satisfaction Index', 'val' => 92, 'color' => 'bg-emerald-500'],
        ];

        $operationCards = [
            [
                'id' => '1',
                'title' => '1. Customer Support Workflow',
                'seq' => '1',
                'listItems' => [
                    ['label' => 'Open Cases', 'val' => number_format($openCases)],
                    ['label' => 'Resolved Cases', 'val' => number_format($resolvedCases)],
                    ['label' => 'Closed Cases', 'val' => number_format($closedCases)]
                ]
            ],
            [
                'id' => '2',
                'title' => '2. Support Case Categories',
                'seq' => '2',
                'listItems' => [
                    ['label' => 'Billing & Payment', 'val' => number_format(SupportCase::where('category', 'like', '%payment%')->orWhere('category', 'like', '%billing%')->count())],
                    ['label' => 'Delivery & Shipping', 'val' => number_format(SupportCase::where('category', 'like', '%delivery%')->orWhere('category', 'like', '%shipping%')->count())]
                ]
            ]
        ];

        $lifecycleNodes = [
            ['stepNumber' => 1, 'id' => 'created', 'label' => '1. Case Created', 'count' => number_format($totalCases), 'status' => 'Completed'],
            ['stepNumber' => 2, 'id' => 'assigned', 'label' => '2. Assigned', 'count' => number_format(SupportCase::where('status', 'assigned')->count()), 'status' => 'Completed'],
            ['stepNumber' => 3, 'id' => 'in-progress', 'label' => '3. First Response', 'count' => '0', 'status' => 'Current'],
            ['stepNumber' => 4, 'id' => 'resolved', 'label' => '4. Resolved', 'count' => number_format($resolvedCases), 'status' => 'Upcoming'],
            ['stepNumber' => 5, 'id' => 'closed', 'label' => '5. Closed', 'count' => number_format($closedCases), 'status' => 'Upcoming'],
        ];

        $rightRail = [
            'healthScore' => 90,
            'healthGrade' => 'Good',
            'healthTitle' => 'Support Operations Health',
            'healthBars' => $healthItems,
            'alertsTitle' => 'Priority Case Alerts',
            'alerts' => [
                ['id' => 'a1', 'text' => 'High priority case open', 'count' => $openCases, 'severity' => 'High']
            ],
            'summaries' => [
                [
                    'title' => 'Case Status Summary',
                    'items' => [
                        ['label' => 'Open', 'count' => number_format($openCases), 'pct' => $totalCases > 0 ? round(($openCases / $totalCases) * 100, 1) . '%' : '0%', 'color' => '#F59E0B'],
                        ['label' => 'Resolved', 'count' => number_format($resolvedCases), 'pct' => $totalCases > 0 ? round(($resolvedCases / $totalCases) * 100, 1) . '%' : '0%', 'color' => '#10B981'],
                    ]
                ]
            ],
            'quickQueues' => [
                ['label' => 'Open Support Queue', 'count' => $openCases],
                ['label' => 'Escalated Support Queue', 'count' => $escalatedCases]
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
                'openCasesCount' => $user->orders()->whereHas('supportCases', function($q) {
                    $q->whereIn('status', ['open', 'assigned', 'in_progress']);
                })->count(),
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

    public function importExportDashboard(Request $request)
    {
        $totalJobs = AdminDataJob::where('domain', 'customers')->count();
        $successfulJobs = AdminDataJob::where('domain', 'customers')->where('status', 'completed')->count();
        $failedJobs = AdminDataJob::where('domain', 'customers')->where('status', 'failed')->count();
        $runningJobs = AdminDataJob::where('domain', 'customers')->whereIn('status', ['running', 'processing'])->count();

        $kpis = [
            ['seq' => 1, 'id' => 'total-jobs', 'label' => 'Total Data Jobs Run', 'value' => number_format($totalJobs), 'change' => '1.1%', 'changeDirection' => 'up', 'statusState' => 'info', 'iconName' => 'Users'],
            ['seq' => 2, 'id' => 'successful-jobs', 'label' => 'Successful Data Jobs', 'value' => number_format($successfulJobs), 'change' => '2.5%', 'changeDirection' => 'up', 'statusState' => 'positive', 'iconName' => 'UserCheck'],
            ['seq' => 3, 'id' => 'failed-jobs', 'label' => 'Failed Data Jobs', 'value' => number_format($failedJobs), 'change' => '0%', 'changeDirection' => 'neutral', 'statusState' => 'critical', 'iconName' => 'AlertOctagon'],
            ['seq' => 4, 'id' => 'running-jobs', 'label' => 'Running Data Jobs', 'value' => number_format($runningJobs), 'change' => '0%', 'changeDirection' => 'neutral', 'statusState' => 'info', 'iconName' => 'Clock'],
        ];

        $healthItems = [
            ['label' => 'File Validation accuracy', 'val' => 96, 'color' => 'bg-emerald-500'],
            ['label' => 'Schema Integrity', 'val' => 98, 'color' => 'bg-emerald-500'],
            ['label' => 'Audit Completeness', 'val' => 100, 'color' => 'bg-emerald-500'],
        ];

        $operationCards = [
            [
                'id' => '1',
                'title' => '1. Customer Import Workflow',
                'seq' => '1',
                'listItems' => [
                    ['label' => 'Imports Completed', 'val' => number_format(AdminDataJob::where('domain', 'customers')->where('job_type', 'import')->count())],
                    ['label' => 'Running Imports', 'val' => number_format(AdminDataJob::where('domain', 'customers')->where('job_type', 'import')->where('status', 'processing')->count())]
                ]
            ],
            [
                'id' => '2',
                'title' => '2. Customer Export Operations',
                'seq' => '2',
                'listItems' => [
                    ['label' => 'Exports Completed', 'val' => number_format(AdminDataJob::where('domain', 'customers')->where('job_type', 'export')->count())]
                ]
            ]
        ];

        $lifecycleNodes = [
            ['stepNumber' => 1, 'id' => 'validation', 'label' => '1. Validation', 'count' => number_format($totalJobs), 'status' => 'Completed'],
            ['stepNumber' => 2, 'id' => 'mapping', 'label' => '2. Mapping', 'count' => '0', 'status' => 'Current'],
            ['stepNumber' => 3, 'id' => 'completed', 'label' => '3. Completed', 'count' => number_format($successfulJobs), 'status' => 'Upcoming'],
        ];

        $rightRail = [
            'healthScore' => 98,
            'healthGrade' => 'Optimized',
            'healthTitle' => 'Data Operations Health',
            'healthBars' => $healthItems,
            'alertsTitle' => 'Priority Data Alerts',
            'alerts' => [],
            'summaries' => [
                [
                    'title' => 'Import Status Summary',
                    'items' => [
                        ['label' => 'Successful', 'count' => number_format($successfulJobs), 'pct' => $totalJobs > 0 ? round(($successfulJobs / $totalJobs) * 100, 1) . '%' : '0%', 'color' => '#10B981'],
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
}
