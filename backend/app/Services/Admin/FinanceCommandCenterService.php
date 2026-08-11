<?php

namespace App\Services\Admin;

use App\Repositories\Admin\FinanceCommandCenterRepository;
use Carbon\CarbonImmutable;

class FinanceCommandCenterService
{
    private const KPI_LABELS = [
        'gmv' => ['GMV', 'Gross Merchandise Value', 'ShoppingBag'], 'gross_sales' => ['Gross Sales', 'Gross Sales', 'TrendingUp'],
        'net_revenue' => ['Net Revenue', 'Net Revenue', 'DollarSign'], 'payments_captured' => ['Payments Captured', 'Payments Captured', 'CreditCard'],
        'failed_payments' => ['Failed Payments', 'Failed Payments', 'AlertTriangle'], 'refunds' => ['Refunds This Period', 'Refunds This Period', 'RotateCcw'],
        'receivables' => ['Accounts Receivable', 'Outstanding invoice balances', 'Inbox'], 'payables' => ['Supplier Payables', 'Pending supplier settlements', 'Send'],
        'commission' => ['Commission Revenue', 'Settlement commissions', 'Percent'], 'settlements_pending' => ['Settlements Pending', 'Pending settlements', 'Clock'],
        'unreconciled' => ['Unreconciled Amount', 'Reconciliation domain unavailable', 'FileQuestion'], 'exceptions_open' => ['Finance Exceptions Open', 'Exception domain unavailable', 'ShieldAlert'],
    ];

    public function __construct(private readonly FinanceCommandCenterRepository $repository) {}

    public function dashboard(array $filters, array $permissions): array
    {
        $currency = $filters['currency'] ?? $this->repository->defaultCurrency();
        $filters['currency'] = $currency;
        $current = $this->repository->sums($filters['from'], $filters['to'], $currency);
        $days = $filters['from']->diffInDays($filters['to']) + 1;
        $previousTo = $filters['from']->subSecond(); $previousFrom = $previousTo->subDays($days - 1)->startOfDay();
        $previous = $this->repository->sums($previousFrom, $previousTo, $currency);
        $trend = $this->repository->daily($filters['from'], $filters['to'], $currency);
        $previousTrend = $this->repository->daily($previousFrom, $previousTo, $currency);
        $capabilities = $this->repository->capabilities();
        $kpis = [];
        foreach (self::KPI_LABELS as $id => [$label, $description, $icon]) {
            $available = !in_array($id, ['unreconciled', 'exceptions_open'], true);
            $value = $current[$id]; $before = $previous[$id];
            $comparison = $before == 0 ? null : round((($value - $before) / abs($before)) * 100, 2);
            $seriesKey = match ($id) { 'gmv' => 'gmv', 'gross_sales', 'net_revenue' => 'revenue', 'payments_captured' => 'collections', 'failed_payments' => 'failed', 'refunds' => 'refunds', default => null };
            $sparkline = $seriesKey ? array_map(fn ($row) => $row[$seriesKey], $trend) : [];
            $kpis[] = compact('id', 'label', 'description', 'icon', 'available', 'value', 'comparison', 'sparkline') + ['currency' => $id === 'exceptions_open' ? null : $currency, 'reason' => $available ? null : ($id === 'unreconciled' ? 'reconciliation_domain_not_present' : 'finance_exception_domain_not_present')];
        }
        $methods = $this->repository->paymentMethods($filters['from'], $filters['to'], $currency); $methodTotal = array_sum(array_column($methods, 'amount'));
        $methods = array_map(fn ($row) => $row + ['percentage' => $methodTotal > 0 ? round($row['amount'] / $methodTotal * 100, 2) : 0], $methods);
        $statuses = $this->repository->paymentStatuses($filters['from'], $filters['to'], $currency); $statusTotal = array_sum(array_column($statuses, 'amount'));
        $statuses = array_map(fn ($row) => $row + ['percentage' => $statusTotal > 0 ? round($row['amount'] / $statusTotal * 100, 2) : 0], $statuses);
        $alerts = $this->alerts($current, $currency);

        return [
            'source' => 'database',
            'context' => ['tenant' => 'SL Beauty', 'ecosystem' => 'Beauty Marketplace', 'businessUnit' => 'All Business Units', 'salesChannel' => 'All Channels', 'region' => 'Sri Lanka', 'currency' => $currency, 'currencies' => $this->repository->currencies(), 'dateFrom' => $filters['from']->toDateString(), 'dateTo' => $filters['to']->toDateString(), 'timezone' => $filters['timezone'], 'tenantScopeAvailable' => false],
            'kpis' => $kpis,
            'trend' => ['currency' => $currency, 'items' => $trend],
            'paymentMethods' => ['currency' => $currency, 'total' => $methodTotal, 'items' => $methods],
            'statusSummary' => ['currency' => $currency, 'total' => $statusTotal, 'items' => $statuses],
            'health' => ['available' => false, 'score' => null, 'reason' => 'finance_health_thresholds_not_configured', 'items' => []],
            'alerts' => $alerts,
            'queues' => ['exceptions' => 0, 'approvals' => $current['pending_approval_count'], 'receivables' => $current['invoice_count'], 'payables' => $current['payout_pending_count'], 'settlements' => $current['payout_pending_count']],
            'summaries' => $this->summaries($current, $currency, $capabilities),
            'activity' => $this->activity($filters),
            'capabilities' => $capabilities,
            'permissions' => ['canView' => true, 'canExport' => (bool) ($permissions['canExport'] ?? false), 'canCreateJournal' => false, 'canMutate' => false],
            'meta' => ['generatedAt' => now()->toIso8601String(), 'dataAsOf' => now()->toIso8601String(), 'refreshIntervalSeconds' => 30],
        ];
    }

    public function operations(array $filters, array $permissions): array
    {
        $filters['currency'] ??= $this->repository->defaultCurrency();
        $page = $this->repository->operations($filters);
        return ['items' => collect($page->items())->map(fn ($row) => (array) $row)->all(), 'meta' => ['page' => $page->currentPage(), 'perPage' => $page->perPage(), 'total' => $page->total(), 'lastPage' => $page->lastPage()], 'permissions' => ['canView' => true, 'canExport' => (bool) ($permissions['canExport'] ?? false)]];
    }

    public function operation(string $recordKey): ?array
    {
        $row = $this->repository->operation($recordKey);
        if (!$row) return null;
        return ['record' => (array) $row, 'relationships' => ['commerce' => $row->relatedReference ?: null, 'payment' => $row->domain === 'payment' ? $row->reference : null, 'refund' => $row->domain === 'refund' ? $row->reference : null, 'settlement' => $row->domain === 'settlement' ? $row->reference : null], 'activity' => [], 'audit' => [], 'capabilities' => ['reconciliation' => false, 'approvalWorkflow' => false], 'permissions' => ['canView' => true, 'canMutate' => false]];
    }

    private function alerts(array $sums, string $currency): array
    {
        $alerts = [];
        if ($sums['failed_payments'] > 0) $alerts[] = ['id' => 'failed-payments', 'severity' => 'High', 'message' => $this->money($sums['failed_payments'], $currency).' failed payments need review', 'href' => '/admin/finance?domain=payment&status=failed'];
        if ($sums['receivables'] > 0) $alerts[] = ['id' => 'receivables', 'severity' => 'Medium', 'message' => $this->money($sums['receivables'], $currency).' outstanding receivables', 'href' => '/admin/finance/revenue-receivables'];
        if ($sums['settlements_pending'] > 0) $alerts[] = ['id' => 'settlements', 'severity' => 'Medium', 'message' => $this->money($sums['settlements_pending'], $currency).' supplier settlements pending', 'href' => '/admin/finance/settlements-payouts'];
        return $alerts;
    }

    private function summaries(array $s, string $currency, array $capabilities): array
    {
        $rate = $s['payment_count'] ? round($s['payment_success_count'] / $s['payment_count'] * 100, 2) : 0;
        return [
            ['id' => 'workflow', 'title' => '1. Finance Operations Workflow', 'available' => true, 'metrics' => [['label' => 'Payments', 'value' => $s['payment_count']], ['label' => 'Invoices', 'value' => $s['invoice_count']], ['label' => 'Refunds', 'value' => $s['refund_count']]]],
            ['id' => 'sales', 'title' => '2. Sales, Revenue & Receivables', 'available' => true, 'metrics' => [['label' => 'Net Revenue', 'value' => $this->money($s['net_revenue'], $currency)], ['label' => 'AR Outstanding', 'value' => $this->money($s['receivables'], $currency)]]],
            ['id' => 'payments', 'title' => '3. Payments & Transactions', 'available' => true, 'metrics' => [['label' => 'Payments Captured', 'value' => $this->money($s['payments_captured'], $currency)], ['label' => 'Success Rate', 'value' => $rate.'%']]],
            ['id' => 'refunds', 'title' => '4. Refunds & Customer Comp.', 'available' => true, 'metrics' => [['label' => 'Refunds', 'value' => $this->money($s['refunds'], $currency)], ['label' => 'Refund Count', 'value' => $s['refund_count']]]],
            ['id' => 'payables', 'title' => '5. Supplier Payables', 'available' => true, 'metrics' => [['label' => 'Payables Outstanding', 'value' => $this->money($s['payables'], $currency)], ['label' => 'Pending Payouts', 'value' => $s['payout_pending_count']]]],
            ['id' => 'commissions', 'title' => '6. Marketplace Commissions', 'available' => true, 'metrics' => [['label' => 'Commission Earned', 'value' => $this->money($s['commission'], $currency)]]],
            ['id' => 'settlements', 'title' => '7. Settlements & Payouts', 'available' => true, 'metrics' => [['label' => 'Settlements Pending', 'value' => $this->money($s['settlements_pending'], $currency)], ['label' => 'Payouts Released', 'value' => $this->money($s['payouts_released'], $currency)]]],
            ['id' => 'invoices', 'title' => '8. Invoices, Credit & Debit Notes', 'available' => true, 'metrics' => [['label' => 'Invoices', 'value' => $s['invoice_count']]]],
            ['id' => 'reconciliation', 'title' => '9. Reconciliation & Financial Controls', 'available' => false, 'reason' => 'reconciliation_domain_not_present', 'metrics' => []],
            ['id' => 'tax', 'title' => '10. Tax, Currency & Config Summary', 'available' => true, 'metrics' => [['label' => 'Order Tax', 'value' => $this->money($s['tax_collected'], $currency)]]],
            ['id' => 'approvals', 'title' => '11. Finance Approval Queue', 'available' => true, 'metrics' => [['label' => 'Pending Approvals', 'value' => $s['pending_approval_count']]]],
            ['id' => 'holds', 'title' => '12. Financial Holds & Release Control', 'available' => false, 'reason' => 'finance_hold_domain_not_present', 'metrics' => []],
        ];
    }

    private function activity(array $filters): array
    {
        $page = $this->repository->operations([...$filters, 'page' => 1, 'perPage' => 10, 'sort' => 'updatedAt', 'direction' => 'desc']);
        return collect($page->items())->map(fn ($row) => ['id' => $row->recordKey, 'eventType' => $row->domain.'.updated', 'entity' => $row->domain, 'entityId' => $row->reference, 'actor' => null, 'timestamp' => $row->updatedAt, 'description' => $row->type.' '.$row->reference.' is '.$row->status, 'status' => $row->status])->all();
    }

    private function money(float|int $value, string $currency): string { return $currency.' '.number_format((float) $value, 2); }
}
