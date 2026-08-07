<?php

namespace App\Services\Admin;

use App\Repositories\Admin\MarketplaceSellerRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class MarketplaceSellerService
{
    public function __construct(private readonly MarketplaceSellerRepository $sellers) {}

    public function index(array $filters, array $permissions): array
    {
        $summary = $this->sellers->summary($filters);
        if (! ($filters['currency'] ?? null) && $summary['currency']) {
            $filters['currency'] = $summary['currency'];
        }
        $page = $this->sellers->paginate($filters);
        $risks = $this->sellers->risks($page->getCollection()->pluck('id'));
        $items = $page->getCollection()->map(fn ($row) => $this->row($row, $risks->get($row->id), $filters['currency'] ?? null))->values()->all();
        $riskTotal = array_sum($summary['risk_counts']);

        return [
            'context' => ['tenant' => 'SL Beauty', 'ecosystem' => 'Beauty Marketplace', 'country' => $filters['country'] ?? null,
                'currency' => $summary['currency'], 'dateFrom' => $filters['from']->toDateString(), 'dateTo' => $filters['to']->toDateString(), 'timezone' => $filters['timezone']],
            'availableCurrencies' => $summary['currencies'],
            'kpis' => [
                $this->metric('active', 'Active Marketplace Sellers', $summary['active'], 'number', 'suppliers.status_equals_active'),
                $this->metric('new', 'New Sellers This Month', $summary['new'], 'number', 'suppliers.created_at_in_current_month'),
                $this->metric('review', 'Sellers Under Review', $summary['under_review'], 'number', 'suppliers.verification_status_equals_pending'),
                $this->metric('suspended', 'Suspended Sellers', $summary['suspended'], 'number', 'suppliers.status_equals_suspended'),
                $summary['currency'] ? $this->metric('gmv', 'Total Seller GMV', $summary['gmv'], 'money', 'non_cancelled_order_total_by_created_at', $summary['currency']) : $this->unavailableMetric('gmv', 'Total Seller GMV', 'currency_selection_required'),
                $summary['currency'] ? $this->metric('avg-gmv', 'Average Seller GMV', $summary['average_gmv'], 'money', 'gmv_divided_by_active_sellers', $summary['currency']) : $this->unavailableMetric('avg-gmv', 'Average Seller GMV', 'currency_selection_required'),
                $this->unavailableMetric('fulfilment', 'Average Fulfilment Rate', 'seller_fulfilment_formula_not_approved'),
                $summary['cancellation_rate'] === null ? $this->unavailableMetric('cancel', 'Average Cancellation Rate', 'no_orders_in_period') : $this->metric('cancel', 'Average Cancellation Rate', $summary['cancellation_rate'], 'percent', 'cancelled_orders_divided_by_all_orders'),
                $this->unavailableMetric('return', 'Average Return Rate', 'seller_return_rate_formula_not_approved'),
                $summary['average_rating'] === null ? $this->unavailableMetric('rating', 'Average Customer Rating', 'no_supplier_reviews') : $this->metric('rating', 'Average Customer Rating', $summary['average_rating'], 'rating', 'average_supplier_rating_for_reviewed_sellers'),
                $this->unavailableMetric('sla', 'SLA Breaches', 'seller_sla_policy_not_defined'),
                $this->metric('risk', 'High-Risk Sellers', $summary['high_risk'], 'number', 'latest_active_supplier_risk_high_or_critical'),
            ],
            'trend' => ['available' => (bool) $summary['currency'], 'reason' => $summary['currency'] ? null : 'currency_selection_required', 'currency' => $summary['currency'], 'items' => $this->sellers->trend($filters, $summary['currency'])],
            'risks' => collect(['low', 'medium', 'high', 'critical'])->map(fn ($level) => ['level' => $level, 'count' => (int) ($summary['risk_counts'][$level] ?? 0), 'percentage' => $riskTotal ? round(((int) ($summary['risk_counts'][$level] ?? 0) / $riskTotal) * 100, 2) : 0])->all(),
            'scorecards' => collect(['sales-performance', 'fulfilment', 'cancellation-control', 'return-control', 'customer-experience', 'listing-quality', 'policy-compliance', 'financial-reliability'])->map(fn ($id) => ['id' => $id, 'label' => str($id)->headline()->toString(), 'available' => false, 'value' => null, 'reason' => 'approved_seller_scorecard_formula_not_defined'])->all(),
            'health' => ['available' => false, 'value' => null, 'reason' => 'approved_seller_health_formula_not_defined', 'components' => []],
            'alerts' => $this->alerts($summary),
            'statusSummary' => ['active' => $summary['active'], 'underReview' => $summary['under_review'], 'suspended' => $summary['suspended'], 'highRisk' => $summary['high_risk'], 'newThisMonth' => $summary['new']],
            'sla' => ['available' => false, 'reason' => 'seller_sla_policy_not_defined', 'items' => []],
            'financial' => $this->sellers->financial($filters, $summary['currency']),
            'quickQueues' => [['id' => 'high-risk', 'label' => 'High-Risk Sellers', 'count' => $summary['high_risk'], 'href' => '/admin/marketplace/sellers?status=high-risk'], ['id' => 'under-review', 'label' => 'Under Review', 'count' => $summary['under_review'], 'href' => '/admin/marketplace/sellers?status=under-review']],
            'items' => $items,
            'permissions' => ['canView' => true, 'canExport' => (bool) ($permissions['can_export'] ?? false), 'canManage' => false, 'canCompare' => true],
            'meta' => $this->meta($page),
        ];
    }

    public function export(array $filters): iterable
    {
        $summary = $this->sellers->summary($filters);
        if (! ($filters['currency'] ?? null) && $summary['currency']) {
            $filters['currency'] = $summary['currency'];
        }
        $rows = $this->sellers->allForExport($filters);
        $risks = $this->sellers->risks($rows->pluck('id'));
        foreach ($rows as $row) {
            yield $this->row($row, $risks->get($row->id), $filters['currency'] ?? null);
        }
    }

    public function show(int $id, array $filters, array $permissions): ?array
    {
        $summary = $this->sellers->summary($filters);
        if (! ($filters['currency'] ?? null) && $summary['currency']) {
            $filters['currency'] = $summary['currency'];
        }
        $record = $this->sellers->find($id, $filters);
        if (! $record) {
            return null;
        }
        $risk = $this->sellers->risks(collect([$id]))->get($id);

        return ['seller' => $this->row($record, $risk, $filters['currency'] ?? null), 'health' => ['available' => false, 'value' => null, 'reason' => 'approved_seller_health_formula_not_defined'],
            'scorecard' => ['available' => false, 'value' => null, 'reason' => 'approved_seller_scorecard_formula_not_defined'],
            'sla' => ['available' => false, 'value' => null, 'reason' => 'seller_sla_policy_not_defined'],
            'permissions' => ['canView' => true, 'canManage' => false, 'canExport' => (bool) ($permissions['can_export'] ?? false)],
            'meta' => ['generatedAt' => now()->toIso8601String(), 'dataAsOf' => now()->toIso8601String(), 'refreshIntervalSeconds' => 30]];
    }

    private function row(object $row, ?object $risk, ?string $currency): array
    {
        $orders = (int) $row->order_count;

        return ['id' => (string) $row->id, 'sellerCode' => 'SELL-'.str_pad((string) $row->id, 8, '0', STR_PAD_LEFT), 'name' => $row->company_name, 'type' => $row->business_type,
            'country' => $row->country, 'activeListings' => (int) $row->active_listings, 'orders' => $orders,
            'gmv' => $currency ? ['available' => true, 'value' => (float) $row->gmv, 'currency' => $currency] : ['available' => false, 'value' => null, 'reason' => 'currency_selection_required'],
            'aov' => $currency && (int) $row->qualifying_order_count > 0 ? ['available' => true, 'value' => round((float) $row->gmv / (int) $row->qualifying_order_count, 2), 'currency' => $currency] : ['available' => false, 'value' => null, 'reason' => $currency ? 'no_qualifying_orders_in_period' : 'currency_selection_required'],
            'fulfilmentRate' => ['available' => false, 'value' => null, 'reason' => 'seller_fulfilment_formula_not_approved'],
            'cancellationRate' => $orders > 0 ? ['available' => true, 'value' => round(((int) $row->cancelled_orders / $orders) * 100, 2)] : ['available' => false, 'value' => null, 'reason' => 'no_orders_in_period'],
            'returnRate' => ['available' => false, 'value' => null, 'reason' => 'seller_return_rate_formula_not_approved'],
            'rating' => (int) $row->reviews_count > 0 ? ['available' => true, 'value' => (float) $row->rating] : ['available' => false, 'value' => null, 'reason' => 'no_supplier_reviews'],
            'slaBreaches' => ['available' => false, 'value' => null, 'reason' => 'seller_sla_policy_not_defined'], 'policyFindings' => ['available' => false, 'value' => null, 'reason' => 'seller_policy_finding_mapping_not_defined'],
            'settlementStatus' => null, 'riskLevel' => $risk?->risk_level, 'riskScore' => $risk?->risk_score !== null ? (float) $risk->risk_score : null,
            'status' => $row->status === 'inactive' ? 'suspended' : $row->status, 'verificationStatus' => $row->verification_status, 'complianceStatus' => $row->compliance_status, 'assignedManager' => null,
            'lastActivityAt' => (string) ($row->last_order_at ?: $row->updated_at)];
    }

    private function alerts(array $summary): array
    {
        return array_values(array_filter([
            $summary['high_risk'] ? ['id' => 'high-risk', 'title' => 'High-risk sellers', 'detail' => "{$summary['high_risk']} sellers require risk review", 'severity' => 'danger', 'href' => '/admin/marketplace/sellers?status=high-risk'] : null,
            $summary['under_review'] ? ['id' => 'under-review', 'title' => 'Seller verification review', 'detail' => "{$summary['under_review']} sellers await verification", 'severity' => 'warning', 'href' => '/admin/marketplace/sellers?status=under-review'] : null,
        ]));
    }

    private function metric(string $id, string $label, int|float|null $value, string $format, string $definition, ?string $currency = null): array
    {
        return compact('id', 'label', 'value', 'format', 'definition', 'currency') + ['available' => true];
    }

    private function unavailableMetric(string $id, string $label, string $reason): array
    {
        return compact('id', 'label', 'reason') + ['available' => false, 'value' => null];
    }

    private function meta(LengthAwarePaginator $p): array
    {
        return ['page' => $p->currentPage(), 'perPage' => $p->perPage(), 'total' => $p->total(), 'totalPages' => $p->lastPage(), 'from' => $p->firstItem(), 'to' => $p->lastItem(), 'generatedAt' => now()->toIso8601String(), 'dataAsOf' => now()->toIso8601String(), 'refreshIntervalSeconds' => 30];
    }
}
