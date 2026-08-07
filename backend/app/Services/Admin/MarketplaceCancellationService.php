<?php

namespace App\Services\Admin;

use App\Repositories\Admin\MarketplaceCancellationRepository;
use App\Repositories\Admin\MarketplaceOrderRepository;

class MarketplaceCancellationService
{
    public function __construct(private readonly MarketplaceCancellationRepository $cancellations, private readonly MarketplaceOrderRepository $orders) {}

    public function index(array $filters, array $permissions): array
    {
        $currencies = $this->orders->currencies();
        $currency = $filters['currency'] ?? $this->orders->defaultCurrency();
        $currency = in_array($currency, $currencies, true) ? $currency : null;
        $filters['currency'] = $currency;
        $page = $this->cancellations->paginate($filters);
        $metrics = $this->cancellations->metrics($filters, $currency);
        $available = fn (string $id, string $label, int|string $value, string $definition, ?string $unit = null): array => compact('id', 'label', 'value', 'definition', 'unit') + ['available' => true];
        $unavailable = fn (string $id, string $label, string $reason): array => compact('id', 'label', 'reason') + ['available' => false, 'value' => null];
        $alerts = $this->cancellations->pendingRefundAlerts($filters);

        return [
            'availability' => ['available' => true, 'mode' => 'cancelled_order_ledger', 'reason' => 'cancellation_request_domain_not_present'],
            'context' => ['tenant' => 'SL Beauty', 'ecosystem' => 'Beauty Marketplace', 'currency' => $currency, 'dateFrom' => $filters['from']->toDateString(), 'dateTo' => $filters['to']->toDateString(), 'timezone' => $filters['timezone']],
            'availableCurrencies' => $currencies,
            'kpis' => [
                $available('cancelled-orders', 'Cancelled Orders', $metrics['cancelledOrders'], 'orders_status_cancelled_by_recorded_at'),
                $available('recorded-today', 'Recorded Today', $metrics['recordedToday'], 'cancelled_order_state_recorded_today'),
                $unavailable('pending-review', 'Pending Review', 'cancellation_request_status_not_present'),
                $unavailable('awaiting-seller', 'Awaiting Seller Response', 'cancellation_request_workflow_not_present'),
                $unavailable('payment-review', 'Awaiting Payment Review', 'cancellation_request_workflow_not_present'),
                $unavailable('shipment-stop', 'Shipment Stop Required', 'shipment_intervention_workflow_not_present'),
                $unavailable('partial', 'Partial Cancellations', 'partial_cancellation_domain_not_present'),
                $unavailable('overdue', 'Overdue Requests', 'cancellation_sla_policy_not_present'),
                $currency ? $available('refund-value', 'Refund Value Pending', $metrics['refundValuePending'], 'pending_payment_refunds_for_cancelled_orders', $currency) : $unavailable('refund-value', 'Refund Value Pending', 'currency_selection_required'),
                $unavailable('seller-liability', 'Seller Liability Pending', 'seller_liability_rules_not_present'),
                $unavailable('inventory-release', 'Inventory Release Pending', 'inventory_reservation_release_domain_not_present'),
                $available('cancelled-month', 'Cancelled This Month', $metrics['cancelledThisMonth'], 'cancelled_order_state_recorded_in_current_month'),
            ],
            'trend' => ['available' => true, 'definition' => 'cancelled_orders_grouped_by_recorded_at', 'items' => $this->cancellations->trend($filters)],
            'reasons' => ['available' => false, 'reason' => 'cancellation_reason_taxonomy_not_present', 'items' => []],
            'health' => ['available' => false, 'reason' => 'cancellation_health_formula_not_defined'],
            'scorecard' => ['available' => false, 'reason' => 'cancellation_scorecard_formula_not_defined', 'items' => []],
            'items' => array_map(fn ($row) => $this->row($row), $page->items()), 'filters' => $this->cancellations->filterOptions(),
            'alerts' => $alerts, 'statusSummary' => [['status' => 'cancelled', 'count' => $metrics['cancelledOrders']]],
            'refundImpact' => $currency ? ['available' => true, 'currency' => $currency, 'items' => $this->cancellations->refundSummary($filters, $currency)] : ['available' => false, 'reason' => 'currency_selection_required', 'items' => []],
            'inventoryRelease' => ['available' => false, 'reason' => 'inventory_reservation_release_domain_not_present'],
            'shipmentIntervention' => ['available' => false, 'reason' => 'shipment_intervention_workflow_not_present'],
            'sellerLiability' => ['available' => false, 'reason' => 'seller_liability_rules_not_present'],
            'risk' => ['available' => false, 'reason' => 'cancellation_risk_model_not_present'],
            'communication' => ['available' => false, 'reason' => 'cancellation_notification_attribution_not_present'],
            'sla' => ['available' => false, 'reason' => 'cancellation_sla_policy_not_present'],
            'eligibility' => ['available' => false, 'reason' => 'cancellation_eligibility_rules_not_present'],
            'quickQueues' => [['id' => 'refunds-pending', 'label' => 'Refunds Pending', 'count' => $metrics['refundsPending'], 'filter' => ['refundStatus' => 'pending']]],
            'capabilities' => ['review' => false, 'approve' => false, 'reject' => false, 'partialCancellation' => false, 'refundInitiation' => false, 'inventoryRelease' => false, 'shipmentIntervention' => false, 'sellerLiability' => false],
            'permissions' => ['canView' => true, 'canExport' => (bool) ($permissions['can_export'] ?? false), 'canMutate' => false],
            'meta' => ['page' => $page->currentPage(), 'perPage' => $page->perPage(), 'total' => $page->total(), 'totalPages' => max(1, $page->lastPage()), 'from' => $page->firstItem(), 'to' => $page->lastItem(),
                'generatedAt' => now()->toIso8601String(), 'dataAsOf' => now()->toIso8601String(), 'refreshIntervalSeconds' => 60],
        ];
    }

    public function export(array $filters): array
    {
        $filters['currency'] = $filters['currency'] ?? $this->orders->defaultCurrency();
        return $this->cancellations->exportRows($filters)->map(fn ($row) => $this->row($row))->all();
    }

    private function row(object $row): array
    {
        return ['id' => 'cancelled-order-'.$row->id, 'cancellationReference' => null, 'orderId' => (string) $row->id, 'orderReference' => $row->order_number,
            'customer' => ['id' => (string) $row->customer_id, 'name' => $row->customer_name], 'seller' => $row->seller_id ? ['id' => (string) $row->seller_id, 'name' => $row->seller_name] : null,
            'orderTotal' => ['amount' => number_format((float) $row->total_amount, 2, '.', ''), 'currency' => $row->currency],
            'paymentStatus' => $row->recorded_payment_status ?: $row->payment_status, 'paymentMethod' => $row->payment_method,
            'fulfilmentStatus' => $row->fulfillment_status, 'delivery' => $row->delivery_status ? ['status' => $row->delivery_status, 'carrier' => $row->carrier] : null,
            'refund' => ['count' => (int) $row->refund_count, 'amount' => number_format((float) $row->refund_amount, 2, '.', ''), 'status' => $row->refund_status],
            'status' => 'cancelled', 'recordedAt' => (string) $row->recorded_at, 'timestampSource' => $row->cancellation_recorded_at ? 'order_status_histories.created_at' : 'orders.updated_at',
            'requestType' => ['available' => false, 'reason' => 'cancellation_request_domain_not_present'], 'reason' => ['available' => false, 'reason' => 'cancellation_reason_taxonomy_not_present'],
            'source' => ['available' => false, 'reason' => 'cancellation_request_source_not_present'], 'sellerLiability' => ['available' => false, 'reason' => 'seller_liability_rules_not_present'],
            'risk' => ['available' => false, 'reason' => 'cancellation_risk_model_not_present'], 'sla' => ['available' => false, 'reason' => 'cancellation_sla_policy_not_present']];
    }
}
