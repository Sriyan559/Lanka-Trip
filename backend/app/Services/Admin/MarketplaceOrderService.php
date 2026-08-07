<?php

namespace App\Services\Admin;

use App\Repositories\Admin\MarketplaceOrderRepository;

class MarketplaceOrderService
{
    public function __construct(private readonly MarketplaceOrderRepository $orders) {}

    public function index(array $filters, array $permissions): array
    {
        $currencies = $this->orders->currencies();
        $currency = $filters['currency'] ?? $this->orders->defaultCurrency();
        $currency = in_array($currency, $currencies, true) ? $currency : null;
        $filters['currency'] = $currency;
        $page = $this->orders->paginate($filters);
        $metrics = $this->orders->metrics($filters);
        $available = fn (string $id, string $label, int $value, string $definition): array => compact('id', 'label', 'value', 'definition') + ['available' => true];
        $unavailable = fn (string $id, string $label, string $reason): array => compact('id', 'label', 'reason') + ['available' => false, 'value' => null];
        $oldest = $this->orders->oldestPending();

        return [
            'context' => ['currency' => $currency, 'dateFrom' => $filters['from']->toDateString(), 'dateTo' => $filters['to']->toDateString(), 'timezone' => $filters['timezone']],
            'availableCurrencies' => $currencies,
            'kpis' => [
                $available('total-today', 'Total Today', $metrics['totalToday'], 'orders_created_today'),
                $available('pending-payment', 'Pending Payment', $metrics['pendingPayment'], 'orders_payment_status_pending'),
                $available('payment-failed', 'Payment Failed', $metrics['paymentFailed'], 'orders_payment_status_failed'),
                $available('processing', 'In Production', $metrics['processing'], 'orders_status_production'),
                $unavailable('awaiting-supplier', 'Awaiting Supplier', 'supplier_confirmation_workflow_not_present'),
                $unavailable('ready-dispatch', 'Ready for Dispatch', 'dispatch_readiness_definition_not_present'),
                $unavailable('in-transit', 'In Transit', 'shipment_status_vocabulary_not_defined'),
                $available('delivered-today', 'Delivered Today', $metrics['deliveredToday'], 'shipments_delivered_today'),
                $available('cancelled', 'Cancelled', $metrics['cancelled'], 'orders_status_cancelled'),
                $unavailable('returns-progress', 'Returns in Progress', 'return_in_progress_definition_not_present'),
                $unavailable('sla-breaches', 'SLA Breaches', 'order_sla_domain_not_present'),
                $unavailable('high-risk', 'High-Risk Orders', 'order_risk_domain_not_present'),
            ],
            'orders' => ['available' => true, 'items' => array_map(fn ($row) => $this->mapOrder($row), $page->items())],
            'filters' => $this->orders->filterOptions(),
            'health' => ['available' => false, 'reason' => 'order_operations_health_formula_not_defined'],
            'alerts' => $this->orders->failedPaymentAlerts($filters),
            'paymentSummary' => $currency
                ? ['available' => true, 'currency' => $currency, ...$this->orders->paymentSummary($filters, $currency)]
                : ['available' => false, 'reason' => 'currency_selection_required'],
            'quickQueue' => $oldest ? [['id' => (string) $oldest->id, 'label' => 'Oldest Pending Order', 'orderReference' => $oldest->order_number, 'createdAt' => (string) $oldest->created_at]] : [],
            'capabilities' => $this->capabilities(),
            'permissions' => ['canView' => true, 'canExport' => (bool) ($permissions['can_export'] ?? false), 'canAssign' => false, 'canCreateManualOrder' => false],
            'meta' => ['page' => $page->currentPage(), 'perPage' => $page->perPage(), 'total' => $page->total(), 'totalPages' => max(1, $page->lastPage()),
                'from' => $page->firstItem(), 'to' => $page->lastItem(), 'generatedAt' => now()->toIso8601String(), 'dataAsOf' => now()->toIso8601String(), 'refreshIntervalSeconds' => 60],
        ];
    }

    public function show(int $id, array $permissions): ?array
    {
        $row = $this->orders->find($id);
        if (! $row) return null;

        return $this->mapOrder($row) + [
            'items' => $this->orders->items($id), 'payments' => $this->orders->payments($id),
            'shipments' => $this->orders->shipments($id), 'returns' => $this->orders->returns($id),
            'capabilities' => $this->capabilities(),
            'permissions' => ['canView' => true, 'canExport' => (bool) ($permissions['can_export'] ?? false), 'canUpdate' => false, 'canAssign' => false],
        ];
    }

    public function manualCapabilities(): array
    {
        return ['available' => false, 'reason' => 'manual_order_workflow_not_present', 'missingCapabilities' => [
            'manual_order_drafts', 'authoritative_catalog_pricing', 'inventory_reservations', 'warehouse_allocation',
            'multi_supplier_order_split', 'manual_payment_capture', 'approval_workflow', 'idempotency_contract',
        ], 'supportedCreationPath' => 'accepted_quotation_only'];
    }

    public function export(array $filters): array
    {
        $filters['currency'] = $filters['currency'] ?? $this->orders->defaultCurrency();
        return $this->orders->exportRows($filters)->map(fn ($row) => $this->mapOrder($row))->all();
    }

    private function mapOrder(object $row): array
    {
        return [
            'id' => (string) $row->id, 'orderReference' => $row->order_number, 'databaseOrderId' => (string) $row->id,
            'customer' => ['id' => (string) $row->buyer_id, 'name' => $row->buyer_name],
            'supplier' => $row->supplier_id ? ['id' => (string) $row->supplier_id, 'name' => $row->supplier_name] : null,
            'itemsCount' => (int) $row->item_count, 'suppliersCount' => $row->supplier_id ? 1 : 0, 'splitOrder' => false,
            'total' => ['amount' => number_format((float) $row->total_amount, 2, '.', ''), 'currency' => $row->currency],
            'paymentMethod' => $row->payment_method_name ?: null, 'paymentStatus' => $row->recorded_payment_status ?: $row->payment_status,
            'orderStatus' => $row->status, 'fulfilmentStatus' => $row->fulfillment_status,
            'delivery' => $row->shipment_id ? ['status' => $row->delivery_status, 'carrier' => $row->carrier, 'estimatedDeliveryDate' => $row->estimated_delivery_date, 'deliveredAt' => $row->delivered_at] : null,
            'createdAt' => (string) $row->created_at, 'updatedAt' => (string) $row->updated_at,
            'availability' => ['assignment' => false, 'risk' => false, 'sla' => false, 'batchAllocation' => false, 'multiSupplierSplit' => false],
        ];
    }

    private function capabilities(): array
    {
        return ['assignment' => ['available' => false, 'reason' => 'order_assignment_domain_not_present'],
            'risk' => ['available' => false, 'reason' => 'order_risk_domain_not_present'], 'sla' => ['available' => false, 'reason' => 'order_sla_domain_not_present'],
            'batchAllocation' => ['available' => false, 'reason' => 'inventory_allocation_domain_not_present'],
            'multiSupplierSplit' => ['available' => false, 'reason' => 'orders_support_one_supplier'],
            'manualOrder' => $this->manualCapabilities()];
    }
}
