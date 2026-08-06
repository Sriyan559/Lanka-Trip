<?php

namespace App\Services\Admin;

use App\Repositories\Admin\MarketplaceWorkspaceRepository;
use Carbon\CarbonImmutable;
use Illuminate\Pagination\LengthAwarePaginator;

class MarketplaceWorkspaceService
{
    public function __construct(private readonly MarketplaceWorkspaceRepository $repository) {}

    public function index(string $workspace, array $filters, array $permissions): array
    {
        [$from, $to] = $this->dates($filters);
        $currencies = in_array($workspace, ['orders', 'cancellations', 'returns', 'commissions', 'channels'], true) ? $this->repository->currencies($workspace === 'commissions' ? 'commissions' : 'orders', $from, $to) : collect();
        $currency = $filters['currency'] ?? ($currencies->count() === 1 ? $currencies->first() : null);
        [$page, $metrics, $definition] = match ($workspace) {
            'orders' => [$this->repository->orders($filters, $from, $to), $this->repository->orderMetrics($filters, $from, $to, $currency), 'Orders and lifecycle data from the orders domain.'],
            'cancellations' => [$this->repository->orders($filters, $from, $to, true), $this->repository->orderMetrics($filters, $from, $to, $currency, true), 'Cancelled orders only; no cancellation-request workflow table exists.'],
            'returns' => [$this->repository->returns($filters, $from, $to), $this->repository->returnMetrics($filters, $from, $to), 'Return cases, items, inspections and status history from the returns domain.'],
            'policy-violations' => [$this->repository->complianceCases($filters, $from, $to), $this->repository->complianceMetrics($from, $to), 'Generic compliance cases; these records are not relabeled as confirmed policy violations.'],
            'commissions' => [$this->repository->settlements($filters, $from, $to), $this->repository->settlementMetrics($filters, $from, $to, $currency), 'Realized commission values from supplier settlements; commission-rule management is unavailable.'],
            'settings' => [$this->repository->marketplaceSettings($filters), ['total' => null], 'Admin-safe marketplace setting metadata; configuration values remain server-side.'],
            'channels' => [$this->repository->observedChannels($filters, $from, $to), ['total' => null], 'Observed order sources are analytics, not configurable sales-channel integrations.'],
            default => [$this->emptyPage($filters), [], 'The required authoritative database domain does not exist.'],
        };
        if (array_key_exists('total', $metrics) && $metrics['total'] === null) $metrics['total'] = $page->total();
        $configuration = $this->configuration($workspace);
        $items = collect($page->items())->map(fn ($row) => $this->row($workspace, $row, $currency))->all();
        return [
            'source' => 'database', 'workspace' => $workspace, 'title' => $configuration['title'], 'description' => $definition,
            'generatedAt' => now()->toIso8601String(), 'permissions' => $permissions,
            'context' => ['currency' => $currency, 'currencies' => $currencies->all(), 'dateFrom' => $from->toDateString(), 'dateTo' => $to->toDateString()],
            'capability' => $configuration['capability'], 'metrics' => $this->metrics($workspace, $metrics, $currency), 'columns' => $configuration['columns'], 'items' => $items,
            'meta' => ['page' => $page->currentPage(), 'perPage' => $page->perPage(), 'total' => $page->total(), 'lastPage' => $page->lastPage(), 'refreshIntervalSeconds' => 45],
        ];
    }

    public function orderDetail(int $id, array $permissions): ?array
    {
        $order = $this->repository->order($id);
        if (! $order) return null;
        return ['source' => 'database', 'generatedAt' => now()->toIso8601String(), 'permissions' => $permissions, 'record' => ['id' => (string) $order->id, 'reference' => $order->order_number, 'status' => $order->status, 'customer' => ['name' => $order->customer_name, 'email' => $order->customer_email], 'supplier' => $order->supplier_name, 'amount' => ['value' => (string) $order->total_amount, 'currency' => $order->currency], 'paymentStatus' => $order->payment_status, 'fulfilmentStatus' => $order->fulfillment_status, 'source' => $order->order_source, 'createdAt' => (string) $order->created_at, 'updatedAt' => (string) $order->updated_at], 'items' => $this->repository->orderItems($id), 'timeline' => $this->repository->orderTimeline($id)];
    }

    public function exportRows(string $workspace, array $filters, array $permissions): array
    {
        $items = []; $page = 1;
        do { $data = $this->index($workspace, [...$filters, 'page' => $page, 'perPage' => 100], $permissions); $items = [...$items, ...$data['items']]; $page++; } while ($page <= $data['meta']['lastPage']);
        return $items;
    }

    private function configuration(string $workspace): array
    {
        return match ($workspace) {
            'orders' => ['title' => 'Order Management', 'capability' => ['availability' => 'available'], 'columns' => $this->columns(['reference' => 'Order', 'customer' => 'Customer', 'supplier' => 'Seller', 'status' => 'Status', 'paymentStatus' => 'Payment', 'fulfilmentStatus' => 'Fulfilment', 'amount' => 'Total', 'createdAt' => 'Created'])],
            'manual-orders' => ['title' => 'Manual Order Creation', 'capability' => ['availability' => 'unavailable', 'reason' => 'manual_order_domain_and_idempotent_admin_creation_workflow_missing'], 'columns' => []],
            'cancellations' => ['title' => 'Cancellation Management', 'capability' => ['availability' => 'partial', 'reason' => 'cancellation_request_workflow_missing_cancelled_orders_are_read_only'], 'columns' => $this->columns(['reference' => 'Order', 'customer' => 'Customer', 'supplier' => 'Seller', 'amount' => 'Value', 'status' => 'Status', 'updatedAt' => 'Cancelled/Updated'])],
            'returns' => ['title' => 'Returns & Disputes', 'capability' => ['availability' => 'available', 'limitations' => ['Refund execution remains protected by the payment-refund workflow.']], 'columns' => $this->columns(['reference' => 'Return', 'orderReference' => 'Order', 'customer' => 'Customer', 'supplier' => 'Seller', 'reason' => 'Reason', 'status' => 'Status', 'amount' => 'Order Value', 'createdAt' => 'Opened'])],
            'promotions' => ['title' => 'Promotions', 'capability' => ['availability' => 'unavailable', 'reason' => 'promotion_campaign_rule_redemption_and_approval_tables_missing'], 'columns' => []],
            'policy-violations' => ['title' => 'Policy Violations', 'capability' => ['availability' => 'partial', 'reason' => 'generic_compliance_cases_exist_but_policy_violation_enforcement_domain_missing'], 'columns' => $this->columns(['reference' => 'Case', 'type' => 'Case Type', 'rule' => 'Compliance Rule', 'severity' => 'Severity', 'status' => 'Status', 'complianceStatus' => 'Compliance', 'assignedTo' => 'Assigned To', 'createdAt' => 'Opened'])],
            'commissions' => ['title' => 'Commission Management', 'capability' => ['availability' => 'partial', 'reason' => 'settlement_commission_amounts_exist_but_commission_rule_domain_missing'], 'columns' => $this->columns(['reference' => 'Settlement', 'supplier' => 'Seller', 'gross' => 'Gross', 'commission' => 'Commission', 'net' => 'Net', 'status' => 'Status', 'period' => 'Period'])],
            'settings' => ['title' => 'Marketplace Configuration', 'capability' => ['availability' => 'partial', 'reason' => 'generic_settings_exist_but_no_approved_marketplace_configuration_schema_or_update_permission'], 'columns' => $this->columns(['reference' => 'Setting Key', 'type' => 'Type', 'group' => 'Group', 'public' => 'Public', 'status' => 'Status', 'updatedAt' => 'Updated'])],
            'channels' => ['title' => 'Sales Channels', 'capability' => ['availability' => 'partial', 'reason' => 'order_source_analytics_exist_but_channel_configuration_credentials_sync_and_webhook_domain_missing'], 'columns' => $this->columns(['reference' => 'Observed Source', 'orders' => 'Orders', 'sellers' => 'Sellers', 'firstActivityAt' => 'First Activity', 'updatedAt' => 'Last Activity'])],
        };
    }

    private function row(string $workspace, object $row, ?string $currency): array
    {
        return match ($workspace) {
            'orders', 'cancellations' => ['id' => (string) $row->id, 'reference' => $row->order_number, 'customer' => $row->customer_name, 'supplier' => $row->supplier_name, 'status' => $row->status, 'paymentStatus' => $row->payment_status, 'fulfilmentStatus' => $row->fulfillment_status, 'amount' => ['value' => (string) $row->total_amount, 'currency' => $row->currency], 'createdAt' => (string) $row->created_at, 'updatedAt' => (string) $row->updated_at, 'detailHref' => "/admin/marketplace/orders/{$row->id}"],
            'returns' => ['id' => (string) $row->id, 'reference' => $row->return_number, 'orderReference' => $row->order_number, 'customer' => $row->customer_name, 'supplier' => $row->supplier_name, 'reason' => $row->reason_code, 'status' => $row->status, 'amount' => ['value' => (string) $row->total_amount, 'currency' => $row->currency], 'createdAt' => (string) $row->created_at, 'updatedAt' => (string) $row->updated_at, 'detailHref' => "/admin/marketplace/returns/{$row->id}"],
            'policy-violations' => ['id' => (string) $row->id, 'reference' => $row->case_number, 'type' => $row->case_type, 'rule' => $row->rule_name, 'severity' => $row->severity, 'status' => $row->status, 'complianceStatus' => $row->compliance_status, 'assignedTo' => $row->assigned_to, 'createdAt' => (string) $row->created_at, 'updatedAt' => (string) $row->updated_at],
            'commissions' => ['id' => (string) $row->id, 'reference' => $row->settlement_number, 'supplier' => $row->supplier_name, 'gross' => ['value' => (string) $row->gross_amount, 'currency' => $row->currency], 'commission' => ['value' => (string) $row->commission_amount, 'currency' => $row->currency], 'net' => ['value' => (string) $row->net_amount, 'currency' => $row->currency], 'status' => $row->status, 'period' => "{$row->period_start} – {$row->period_end}", 'createdAt' => (string) $row->created_at, 'updatedAt' => (string) $row->updated_at],
            'settings' => ['id' => (string) $row->id, 'reference' => $row->setting_key, 'type' => $row->setting_type, 'group' => $row->group_name, 'public' => (bool) $row->is_public, 'status' => $row->status, 'createdAt' => (string) $row->created_at, 'updatedAt' => (string) $row->updated_at],
            'channels' => ['id' => $row->source, 'reference' => $row->source, 'orders' => (int) $row->orders, 'sellers' => (int) $row->sellers, 'firstActivityAt' => (string) $row->first_order_at, 'updatedAt' => (string) $row->last_order_at],
            default => [],
        };
    }

    private function metrics(string $workspace, array $values, ?string $currency): array
    {
        $available = fn ($id, $label, $value, $unit = null) => compact('id', 'label', 'value', 'unit') + ['availability' => 'available'];
        $unavailableMoney = fn ($id, $label) => ['id' => $id, 'label' => $label, 'availability' => 'unavailable', 'reason' => 'currency_selection_required'];
        return match ($workspace) {
            'orders' => [$available('total', 'Orders', $values['total']), $currency ? $available('gmv', 'GMV', $values['gmv'], $currency) : $unavailableMoney('gmv', 'GMV'), ...collect($values['status'])->map(fn ($v, $k) => $available("status-{$k}", str($k)->headline()->toString(), $v))->values()->all()],
            'cancellations' => [$available('cancelled', 'Cancelled Orders', $values['total']), ['id' => 'requests', 'label' => 'Cancellation Requests', 'availability' => 'unavailable', 'reason' => 'cancellation_request_domain_missing']],
            'returns' => [$available('total', 'Return Cases', $values['total']), ...collect($values['status'])->map(fn ($v, $k) => $available("status-{$k}", str($k)->headline()->toString(), $v))->values()->all(), ['id' => 'sla', 'label' => 'Return SLA Breaches', 'availability' => 'unavailable', 'reason' => 'return_sla_policy_missing']],
            'policy-violations' => [$available('total', 'Compliance Cases', $values['total']), $available('open', 'Open Cases', $values['open']), $available('critical', 'Critical Cases', $values['critical']), $available('resolved', 'Resolved Cases', $values['resolved']), ['id' => 'sla', 'label' => 'SLA Breaches', 'availability' => 'unavailable', 'reason' => 'compliance_case_sla_deadline_missing']],
            'commissions' => [$available('settlements', 'Settlements', $values['total']), $currency ? $available('gross', 'Settlement Gross', $values['gross'], $currency) : $unavailableMoney('gross', 'Settlement Gross'), $currency ? $available('commission', 'Realized Commission', $values['commission'], $currency) : $unavailableMoney('commission', 'Realized Commission'), $currency ? $available('net', 'Seller Net', $values['net'], $currency) : $unavailableMoney('net', 'Seller Net'), ['id' => 'rules', 'label' => 'Commission Rules', 'availability' => 'unavailable', 'reason' => 'commission_rule_domain_missing']],
            'settings' => [$available('settings', 'Marketplace Settings', $values['total'] ?? 0), ['id' => 'version', 'label' => 'Configuration Version', 'availability' => 'unavailable', 'reason' => 'marketplace_configuration_version_domain_missing']],
            'channels' => [['id' => 'configured', 'label' => 'Configured Channels', 'availability' => 'unavailable', 'reason' => 'sales_channel_configuration_domain_missing']],
            default => [['id' => 'total', 'label' => 'Records', 'availability' => 'unavailable', 'reason' => $this->configuration($workspace)['capability']['reason']]],
        };
    }

    private function columns(array $columns): array { return collect($columns)->map(fn ($label, $key) => compact('key', 'label'))->values()->all(); }
    private function dates(array $filters): array { $to = isset($filters['dateTo']) ? CarbonImmutable::parse($filters['dateTo'])->endOfDay() : CarbonImmutable::now()->endOfDay(); $from = isset($filters['dateFrom']) ? CarbonImmutable::parse($filters['dateFrom'])->startOfDay() : $to->subDays(29)->startOfDay(); return [$from, $to]; }
    private function emptyPage(array $filters): LengthAwarePaginator { return new LengthAwarePaginator([], 0, $filters['perPage'], $filters['page']); }
}
