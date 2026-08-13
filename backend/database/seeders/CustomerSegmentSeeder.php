<?php

namespace Database\Seeders;

use App\Models\CustomerSegment;
use App\Models\User;
use Illuminate\Database\Seeder;

class CustomerSegmentSeeder extends Seeder
{
    public function run(): void
    {
        $segments = [
            [
                'code' => 'SEG-00101',
                'name' => 'High-Value VIP Buyers',
                'description' => 'Customers with LTV > LKR 100,000 and 5+ orders in past 90 days.',
                'type' => 'Value',
                'membership_type' => 'Inclusive',
                'customer_scope' => 'Active Customers',
                'entry_rule_summary' => 'LTV > LKR 100,000 AND Total Orders >= 5',
                'exit_rule_summary' => 'Inactivity > 120 Days OR Risk Status High',
                'avg_ltv_number' => 145000.00,
                'order_frequency' => 8.50,
                'retention_rate_pct' => 96.50,
                'consent_eligibility' => 'Eligible',
                'risk_level' => 'Low',
                'overlap_count' => 12,
                'conflict_status' => 'None',
                'recalculation_schedule' => 'Daily @ Midnight',
                'owner' => 'Marketing Ops',
                'version' => 'v2.1',
                'status' => 'Active',
                'score' => 94,
                'score_status' => 'Optimal',
                'rule_details' => 'Dynamic Rule: SELECT * FROM users WHERE lifetime_value >= 100000',
                'consent_requirement' => 'Marketing Consent + Email Opt-In',
                'risk_note' => 'Low risk segment with clean profiles.',
                'new_members_count' => 14,
                'removed_members_count' => 2,
            ],
            [
                'code' => 'SEG-00102',
                'name' => 'Skincare Enthusiasts',
                'description' => 'Buyers purchasing primarily skincare products with repeat order intervals under 30 days.',
                'type' => 'Behavioral',
                'membership_type' => 'Inclusive',
                'customer_scope' => 'Active Customers',
                'entry_rule_summary' => 'Skincare Category Purchases >= 3 IN Past 60 Days',
                'exit_rule_summary' => 'No skincare purchase IN Past 180 Days',
                'avg_ltv_number' => 48500.00,
                'order_frequency' => 4.20,
                'retention_rate_pct' => 88.20,
                'consent_eligibility' => 'Eligible',
                'risk_level' => 'Low',
                'overlap_count' => 8,
                'conflict_status' => 'None',
                'recalculation_schedule' => 'Weekly on Mon',
                'owner' => 'Category Team',
                'version' => 'v1.4',
                'status' => 'Active',
                'score' => 89,
                'score_status' => 'Good',
                'rule_details' => 'Behavioral Rule: Purchases IN Category Skincare >= 3',
                'consent_requirement' => 'General Marketing Opt-In',
                'risk_note' => 'Standard engagement cohort.',
                'new_members_count' => 32,
                'removed_members_count' => 5,
            ],
            [
                'code' => 'SEG-00103',
                'name' => 'Salon & B2B Wholesale Accounts',
                'description' => 'Verified professional beauty salons and wholesale buyers purchasing in bulk quantities.',
                'type' => 'B2B Group',
                'membership_type' => 'Exclusive',
                'customer_scope' => 'All Customers',
                'entry_rule_summary' => 'Account Type = B2B Salon AND Business Verification = Verified',
                'exit_rule_summary' => 'Business License Expired OR Verification Revoked',
                'avg_ltv_number' => 320000.00,
                'order_frequency' => 12.40,
                'retention_rate_pct' => 98.00,
                'consent_eligibility' => 'Eligible',
                'risk_level' => 'Low',
                'overlap_count' => 3,
                'conflict_status' => 'None',
                'recalculation_schedule' => 'Real-Time',
                'owner' => 'B2B Sales',
                'version' => 'v3.0',
                'status' => 'Active',
                'score' => 98,
                'score_status' => 'Excellent',
                'rule_details' => 'B2B Rule: Company Tax Verification Valid',
                'consent_requirement' => 'B2B Commercial Consent',
                'risk_note' => 'High LTV accounts with credit verification.',
                'new_members_count' => 8,
                'removed_members_count' => 0,
            ],
            [
                'code' => 'SEG-00104',
                'name' => 'At-Risk Churn Cohort',
                'description' => 'Previously active customers with no order activity in past 90 days and declining app sessions.',
                'type' => 'Lifecycle',
                'membership_type' => 'Inclusive',
                'customer_scope' => 'Active Customers',
                'entry_rule_summary' => 'Last Order Date > 90 Days AND Prev Orders >= 2',
                'exit_rule_summary' => 'New Order Completed',
                'avg_ltv_number' => 22000.00,
                'order_frequency' => 1.80,
                'retention_rate_pct' => 42.00,
                'consent_eligibility' => 'Partial',
                'risk_level' => 'Medium',
                'overlap_count' => 15,
                'conflict_status' => 'Warning',
                'recalculation_schedule' => 'Daily @ 6 AM',
                'owner' => 'Retention Team',
                'version' => 'v1.1',
                'status' => 'Active',
                'score' => 72,
                'score_status' => 'Attention Required',
                'rule_details' => 'Lifecycle Rule: Days Since Last Order >= 90',
                'consent_requirement' => 'Re-engagement Email Opt-In',
                'risk_note' => 'Requires win-back promotional offers.',
                'new_members_count' => 45,
                'removed_members_count' => 18,
            ],
            [
                'code' => 'SEG-00105',
                'name' => 'Unverified Identity Watchlist',
                'description' => 'Accounts flagged for incomplete identity verification or duplicate registration attempts.',
                'type' => 'Risk Pool',
                'membership_type' => 'Exclusive',
                'customer_scope' => 'Risk Pool',
                'entry_rule_summary' => 'Identity Verification = Unverified OR Risk Level = High',
                'exit_rule_summary' => 'Identity Document Verified AND Admin Clear',
                'avg_ltv_number' => 5400.00,
                'order_frequency' => 0.50,
                'retention_rate_pct' => 15.00,
                'consent_eligibility' => 'Not Eligible',
                'risk_level' => 'High',
                'overlap_count' => 22,
                'conflict_status' => 'Conflict',
                'recalculation_schedule' => 'Hourly',
                'owner' => 'Risk & Compliance',
                'version' => 'v1.0',
                'status' => 'Pending Approval',
                'score' => 55,
                'score_status' => 'High Risk',
                'rule_details' => 'Risk Rule: Identity Status != Verified',
                'consent_requirement' => 'Compliance Verification Required',
                'risk_note' => 'High risk account restriction queue.',
                'new_members_count' => 12,
                'removed_members_count' => 4,
            ],
        ];

        foreach ($segments as $data) {
            CustomerSegment::updateOrCreate(
                ['code' => $data['code']],
                $data
            );
        }

        // Attach sample buyers to segments if users exist
        $users = User::where('role', 'buyer')->limit(20)->get();
        if ($users->count() > 0) {
            $allSegments = CustomerSegment::all();
            foreach ($allSegments as $seg) {
                $seg->customers()->syncWithoutDetaching($users->random(min(5, $users->count()))->pluck('id')->toArray());
            }
        }
    }
}
