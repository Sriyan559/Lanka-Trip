<?php

namespace App\Services\Admin;

use App\Repositories\Admin\MarketplaceCommissionRepository;

class MarketplaceCommissionService
{
    public function __construct(private readonly MarketplaceCommissionRepository $commissions) {}

    public function index(array $filters, array $permissions): array
    {
        $capabilities = $this->commissions->capabilities();
        $currency = $filters['currency'] ?? $this->commissions->defaultCurrency();
        $currency = in_array($currency, $this->commissions->currencies(), true) ? $currency : null;
        $financial = $capabilities['settlements'] && $currency
            ? $this->commissions->financialSummary($filters['from'], $filters['to'], $currency) : null;
        $page=$currency?$this->commissions->portfolio($filters,$currency):null; $statuses=$currency?$this->commissions->statuses($filters,$currency):[]; $statusTotal=array_sum(array_column($statuses,'amount')); foreach($statuses as &$status){$status['percentage']=$statusTotal?round($status['amount']/$statusTotal*100,2):0;}
        $unavailable = fn (string $id, string $label, string $reason = 'commission_rule_domain_not_present'): array => compact('id', 'label', 'reason') + ['available' => false, 'value' => null];
        $money = fn (string $id, string $label, string $value, string $definition): array => compact('id', 'label', 'value', 'definition') + ['available' => true, 'currency' => $currency];

        return [
            'availability' => ['available' => false, 'reason' => 'commission_rule_domain_not_present', 'missingCapabilities' => [
                'commission_rules', 'rule_versions', 'rule_scopes', 'rule_precedence', 'rule_conflicts', 'rule_approvals',
                'rule_exceptions', 'commission_resolver', 'commission_audit_history', 'approval_sla',
            ]],
            'context' => ['tenant' => 'SL Beauty', 'ecosystem' => 'Beauty Marketplace', 'currency' => $currency,
                'dateFrom' => $filters['from']->toDateString(), 'dateTo' => $filters['to']->toDateString(), 'timezone' => $filters['timezone']],
            'availableCurrencies' => $this->commissions->currencies(),
            'kpis' => [
                $unavailable('active', 'Active Commission Rules'), $unavailable('scheduled', 'Scheduled Rules'),
                $unavailable('pending', 'Pending Approvals'), $unavailable('draft', 'Draft Rules'),
                $unavailable('expiring', 'Expiring Rules'), $unavailable('expired', 'Expired Rules'),
                $financial ? $money('revenue', 'Commission Revenue', $financial['commissionRevenue'], 'supplier_settlements.commission_amount_sum_by_period_end') : $unavailable('revenue', 'Commission Revenue', $currency ? 'settlement_source_unavailable' : 'currency_selection_required'),
                $unavailable('rate', 'Average Commission Rate', 'commission_rate_source_not_present'),
                $financial ? $money('settlement', 'Pending Settlement Impact', $financial['pendingSettlementImpact'], 'draft_pending_approved_supplier_settlements.net_amount_sum') : $unavailable('settlement', 'Pending Settlement Impact', $currency ? 'settlement_source_unavailable' : 'currency_selection_required'),
                $unavailable('exceptions', 'Commission Exceptions'), $unavailable('conflicts', 'Rule Conflicts'), $unavailable('expiring-month', 'Expiring This Month'),
            ],
            'financial' => $financial ? ['available' => true, 'currency' => $currency, ...$financial] : ['available' => false, 'reason' => $currency ? 'settlement_source_unavailable' : 'currency_selection_required'],
            'trend' => $financial ? ['available' => true, 'currency' => $currency, 'definition' => 'supplier_settlements_grouped_by_period_end', 'items' => $this->commissions->trend($filters['from'], $filters['to'], $currency)] : ['available' => false, 'reason' => 'currency_selection_required', 'items' => []],
            'rules' => ['available' => false, 'reason' => 'commission_rule_domain_not_present', 'items' => []],
            'approvals' => ['available' => false, 'reason' => 'commission_approval_domain_not_present', 'items' => []],
            'conflicts' => ['available' => false, 'reason' => 'commission_conflict_domain_not_present', 'items' => []],
            'distribution' => ['available' => false, 'reason' => 'commission_rule_types_not_defined', 'items' => []],
            'precedence' => ['available' => false, 'reason' => 'commission_precedence_configuration_not_present', 'items' => []],
            'health' => ['available' => false, 'reason' => 'commission_health_formula_not_defined', 'value' => null],
            'scorecard' => ['available' => false, 'reason' => 'commission_scorecard_formula_not_defined', 'items' => []],
            'alerts' => [], 'statusSummary' => ['available' => true, 'items' => $statuses],
            'sla' => ['available' => false, 'reason' => 'commission_approval_sla_not_defined', 'items' => []], 'quickQueues' => [],
            'permissions' => ['canView' => true, 'canCreate' => false, 'canUpdate' => false, 'canApprove' => false,
                'canResolveConflicts' => false, 'canSimulate' => false, 'canExport' => (bool) ($permissions['can_export'] ?? false)],
            'records'=>$page?collect($page->items())->map(fn($r)=>$this->record($r))->all():[],
            'meta' => ['page' => $page?->currentPage()??$filters['page'], 'perPage' => $page?->perPage()??$filters['perPage'], 'total' => $page?->total()??0, 'totalPages' => $page?->lastPage()??1, 'from' => $page?->firstItem(), 'to' => $page?->lastItem(),
                'generatedAt' => now()->toIso8601String(), 'dataAsOf' => now()->toIso8601String(), 'refreshIntervalSeconds' => 60],
        ];
    }

    public function show(string $id,array $permissions): ?array { $r=$this->commissions->find($id); return $r?$this->record($r)+['calculation'=>['gross'=>(string)$r->gross_amount,'commission'=>(string)$r->commission_amount,'refundAdjustment'=>(string)$r->refund_adjustment,'otherAdjustments'=>(string)$r->other_adjustments,'net'=>(string)$r->net_amount,'source'=>'supplier_settlements'],'permissions'=>$permissions]:null; }
    private function record(object $r): array{return ['id'=>(string)$r->reference,'recordType'=>'Supplier Settlement Commission','relatedOrder'=>'Not available','party'=>$r->supplier,'partyId'=>(string)$r->supplier_id,'currency'=>$r->currency,'grossSale'=>(string)$r->gross_amount,'commissionAmount'=>(string)$r->commission_amount,'netAmount'=>(string)$r->net_amount,'status'=>$r->status,'periodStart'=>$r->period_start,'periodEnd'=>$r->period_end,'updatedAt'=>$r->updated_at,'availability'=>['rule'=>false,'fees'=>false,'adjustments'=>false,'disputes'=>false,'reconciliation'=>false]];}
}
