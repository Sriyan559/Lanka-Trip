<?php

namespace App\Services\Admin;

use App\Repositories\Admin\MarketplaceMetricsRepository;
use Carbon\CarbonImmutable;

class MarketplaceDashboardService
{
    public function __construct(private readonly MarketplaceMetricsRepository $metrics) {}

    public function dashboard(CarbonImmutable $from, CarbonImmutable $to, ?string $requestedCurrency, string $timezone, array $permissions = []): array
    {
        $currencies = $this->metrics->currencies($from, $to);
        $currency = $requestedCurrency ?: ($currencies->count() === 1 ? $currencies->first() : null);
        $orders = $this->metrics->orderSummary($from, $to, $currency);
        $payments = $this->metrics->paymentSummary($from, $to, $currency);
        $settlements = $this->metrics->settlementSummary($from, $to, $currency);

        return [
            'filters' => ['date_from' => $from->toDateString(), 'date_to' => $to->toDateString(), 'timezone' => $timezone, 'currency' => $currency],
            'available_currencies' => $currencies->all(),
            'summary' => [
                'gmv' => $this->money($orders['gmv'], $currency, 'non_cancelled_order_total_by_created_at'),
                'nmv' => ($payments['available'] ?? false) ? $this->money($payments['net'], $currency, 'successful_payments_less_completed_refunds') : $this->unavailable($payments['reason'], $currency),
                'total_orders' => $this->number($orders['total_orders'], 'all_orders_by_created_at'),
                'aov' => $this->money($orders['aov'], $currency, 'gmv_divided_by_non_cancelled_orders'),
                'active_sellers' => $this->number($this->metrics->activeSellerCount(), 'verified_active_suppliers'),
                'active_listings' => $this->number($this->metrics->activeListingCount(), 'approved_active_products'),
                'commission' => ($settlements['available'] ?? false) ? $this->money($settlements['commission'], $currency, 'supplier_settlement_commission_by_period_end') : $this->unavailable($settlements['reason'], $currency),
                'expenses' => $this->unavailable('marketplace_expense_business_rule_not_defined', $currency),
            ],
            'trend' => ['availability' => $currency ? 'available' : 'unavailable', 'reason' => $currency ? null : 'currency_selection_required', 'items' => $this->metrics->trends($from, $to, $currency)],
            'composition' => $this->metrics->composition($from, $to),
            'order_lifecycle' => $this->metrics->orderLifecycle($from, $to, $currency),
            'operational_queues' => $this->metrics->operationalQueues(),
            'top_sellers' => $this->metrics->topSellers($from, $to, $currency),
            'recent_activity' => $this->metrics->recentActivity($from, $to),
            'marketplace_health' => ['availability' => 'unavailable', 'score' => null, 'reason' => 'approved_health_score_formula_not_defined', 'components' => []],
            'priority_alerts' => $this->metrics->alerts(),
            'financial_snapshot' => [
                'gmv' => $this->money($orders['gmv'], $currency, 'non_cancelled_order_total_by_created_at'),
                'nmv' => ($payments['available'] ?? false) ? $this->money($payments['net'], $currency, 'successful_payments_less_completed_refunds') : $this->unavailable($payments['reason'], $currency),
                'commission' => ($settlements['available'] ?? false) ? $this->money($settlements['commission'], $currency, 'supplier_settlement_commission_by_period_end') : $this->unavailable($settlements['reason'], $currency),
                'pending_settlements' => ($settlements['available'] ?? false) ? $this->money($settlements['pending'], $currency, 'draft_pending_approved_supplier_settlements') : $this->unavailable($settlements['reason'], $currency),
            ],
            'risk_signals' => ['availability' => 'available', 'items' => $this->metrics->alerts()],
            'permissions' => ['can_export' => (bool) ($permissions['can_export'] ?? false), 'can_manage' => (bool) ($permissions['can_manage'] ?? false)],
            'meta' => ['generated_at' => now()->toIso8601String(), 'data_as_of' => now()->toIso8601String(), 'timezone' => $timezone, 'currency' => $currency, 'refresh_interval_seconds' => 30],
        ];
    }

    private function number(int|float $value, string $definition): array
    {
        return ['availability' => 'available', 'value' => $value, 'definition' => $definition];
    }

    private function money(int|float|null $value, ?string $currency, string $definition): array
    {
        return $value === null || ! $currency ? $this->unavailable('currency_selection_required', $currency) : ['availability' => 'available', 'value' => round((float) $value, 2), 'currency' => $currency, 'definition' => $definition];
    }

    private function unavailable(string $reason, ?string $currency): array
    {
        return ['availability' => 'unavailable', 'value' => null, 'currency' => $currency, 'reason' => $reason];
    }
}
