<?php

namespace App\Services\Admin;

use App\Repositories\Admin\MarketplacePromotionRepository;

class MarketplacePromotionService
{
    public function __construct(private readonly MarketplacePromotionRepository $promotions) {}

    public function index(array $filters): array
    {
        $capabilities = $this->promotions->capabilities();
        $reason = $capabilities['available'] ? 'promotion_schema_not_integrated' : 'promotion_domain_not_present';
        $unavailable = fn (string $id, string $label): array => ['id' => $id, 'label' => $label, 'available' => false, 'value' => null, 'reason' => $reason];

        return [
            'availability' => ['available' => false, 'reason' => $reason, 'missingCapabilities' => [
                'promotion_records', 'promotion_statuses', 'promotion_order_attribution', 'promotion_redemptions',
                'promotion_budgets', 'promotion_funding', 'promotion_eligibility', 'promotion_approvals',
                'promotion_conflicts', 'promotion_sla', 'promotion_audit_events',
            ]],
            'filters' => ['dateFrom' => $filters['from']->toDateString(), 'dateTo' => $filters['to']->toDateString(), 'timezone' => $filters['timezone']],
            'kpis' => collect([
                ['active', 'Active Promotions'], ['scheduled', 'Scheduled Promotions'], ['pending', 'Pending Approvals'],
                ['draft', 'Draft Promotions'], ['expiring', 'Expiring This Week'], ['participants', 'Seller Participants'],
                ['revenue', 'Promotion Revenue'], ['discount', 'Discount Cost'], ['platform-funding', 'Marketplace Funding'],
                ['seller-funding', 'Seller Funding'], ['budget-risk', 'Budget at Risk'], ['conflicts', 'Promotion Conflicts'],
            ])->map(fn (array $metric): array => $unavailable($metric[0], $metric[1]))->all(),
            'trend' => ['available' => false, 'reason' => 'promotion_order_attribution_not_present', 'items' => []],
            'typeDistribution' => ['available' => false, 'reason' => 'promotion_types_not_defined', 'items' => []],
            'health' => ['available' => false, 'value' => null, 'reason' => 'promotion_health_formula_not_defined', 'components' => []],
            'scorecard' => ['available' => false, 'reason' => 'promotion_scorecard_formula_not_defined', 'items' => []],
            'approvals' => ['available' => false, 'reason' => 'promotion_approval_domain_not_present', 'items' => []],
            'conflicts' => ['available' => false, 'reason' => 'promotion_conflict_domain_not_present', 'items' => []],
            'budget' => ['available' => false, 'reason' => 'promotion_budget_domain_not_present'],
            'participation' => ['available' => false, 'reason' => 'promotion_participation_domain_not_present'],
            'eligibility' => ['available' => false, 'reason' => 'promotion_eligibility_domain_not_present'],
            'timeline' => ['available' => false, 'reason' => 'promotion_timeline_domain_not_present', 'items' => []],
            'policyChecklist' => ['available' => false, 'reason' => 'promotion_policy_rules_not_present', 'items' => []],
            'alerts' => [], 'statusSummary' => ['available' => false, 'reason' => $reason, 'items' => []],
            'sla' => ['available' => false, 'reason' => 'promotion_approval_sla_not_defined', 'items' => []],
            'financial' => ['available' => false, 'reason' => 'promotion_financial_attribution_not_present'],
            'quickQueues' => [], 'items' => [],
            'permissions' => ['canView' => true, 'canCreate' => false, 'canUpdate' => false, 'canApprove' => false, 'canExport' => false],
            'meta' => ['page' => $filters['page'], 'perPage' => $filters['perPage'], 'total' => 0, 'totalPages' => 1,
                'from' => null, 'to' => null, 'generatedAt' => now()->toIso8601String(), 'dataAsOf' => now()->toIso8601String(), 'refreshIntervalSeconds' => 60],
        ];
    }
}
