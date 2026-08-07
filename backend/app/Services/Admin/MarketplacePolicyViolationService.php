<?php

namespace App\Services\Admin;

use App\Repositories\Admin\MarketplacePolicyViolationRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class MarketplacePolicyViolationService
{
    public function __construct(private readonly MarketplacePolicyViolationRepository $cases) {}

    public function index(array $filters, array $permissions): array
    {
        $page = $this->cases->paginate($filters);
        $summary = $this->cases->summary($filters);

        return ['context' => ['dateFrom' => $filters['from']->toDateString(), 'dateTo' => $filters['to']->toDateString(), 'timezone' => $filters['timezone']],
            'kpis' => [$this->metric('total', 'Total Cases', $summary['total'], 'filtered_compliance_case_files_count'), $this->metric('open', 'Open Violations', $summary['open'], 'compliance_case_files.status_equals_open'), $this->metric('new-today', 'New Today', $summary['new_today'], 'compliance_case_files.created_at_is_today'),
                $this->unavailable('investigation', 'Under Investigation', 'case_investigation_workflow_not_defined'), $this->unavailable('awaiting-seller', 'Awaiting Seller Response', 'seller_response_workflow_not_defined'), $this->unavailable('evidence', 'Awaiting Evidence', 'policy_evidence_domain_not_present'), $this->unavailable('overdue', 'Overdue Cases', 'policy_case_sla_deadline_not_present'), $this->metric('critical', 'Critical Violations', (int) (collect($summary['severities'])->firstWhere('key', 'critical')['count'] ?? 0), 'compliance_rules.severity_equals_critical'), $this->unavailable('high-risk', 'High-Risk Sellers', 'case_seller_risk_mapping_not_defined'), $this->unavailable('repeat', 'Repeat Offenders', 'repeat_offender_rule_not_defined'), $this->unavailable('enforcement', 'Pending Enforcement', 'enforcement_domain_not_present'), $this->unavailable('appeals', 'Active Appeals', 'appeal_domain_not_present'), $this->unavailable('resolved', 'Resolved This Month', 'case_resolution_timestamp_not_present')],
            'trend' => ['available' => true, 'definition' => 'compliance_cases_created_by_date', 'items' => $this->cases->trend($filters)],
            'categories' => ['available' => true, 'items' => $summary['categories']], 'sources' => ['available' => true, 'items' => collect($summary['sources'])->map(fn (array $item): array => [...$item, 'key' => class_basename($item['key'])])->all()],
            'statuses' => ['available' => true, 'items' => $summary['statuses']], 'scorecard' => ['available' => false, 'reason' => 'policy_health_formula_not_defined', 'items' => []],
            'openOverdue' => ['available' => false, 'reason' => 'policy_case_sla_deadline_not_present', 'items' => []],
            'evidence' => ['available' => false, 'reason' => 'policy_evidence_domain_not_present', 'items' => []], 'enforcement' => ['available' => false, 'reason' => 'enforcement_domain_not_present', 'items' => []],
            'repeatOffenders' => ['available' => false, 'reason' => 'repeat_offender_rule_not_defined', 'items' => []], 'appeals' => ['available' => false, 'reason' => 'appeal_domain_not_present', 'items' => []],
            'health' => ['available' => false, 'value' => null, 'reason' => 'policy_health_formula_not_defined'], 'alerts' => [],
            'sla' => ['available' => false, 'reason' => 'policy_case_sla_deadline_not_present'], 'impact' => ['available' => false, 'reason' => 'enforcement_impact_domain_not_present'], 'quickQueues' => [],
            'items' => $page->getCollection()->map(fn (object $row) => $this->row($row))->values()->all(),
            'permissions' => ['canView' => true, 'canCreate' => false, 'canUpdate' => false, 'canEnforce' => false, 'canExport' => (bool) ($permissions['can_export'] ?? false), 'canViewInternalNotes' => false],
            'meta' => $this->meta($page)];
    }

    public function show(int $id, array $permissions): ?array
    {
        $row = $this->cases->find($id);
        if (! $row) {
            return null;
        }

        return ['case' => $this->row($row), 'evidence' => ['available' => false, 'reason' => 'policy_evidence_domain_not_present'], 'enforcement' => ['available' => false, 'reason' => 'enforcement_domain_not_present'], 'appeal' => ['available' => false, 'reason' => 'appeal_domain_not_present'], 'permissions' => ['canView' => true, 'canUpdate' => false, 'canViewInternalNotes' => false, 'canExport' => (bool) ($permissions['can_export'] ?? false)], 'meta' => ['generatedAt' => now()->toIso8601String(), 'dataAsOf' => now()->toIso8601String(), 'refreshIntervalSeconds' => 60]];
    }

    public function export(array $filters): iterable
    {
        foreach ($this->cases->exportRows($filters) as $row) {
            yield $this->row($row);
        }
    }

    private function row(object $row): array
    {
        return ['id' => (string) $row->id, 'caseCode' => $row->case_number, 'category' => $row->case_type, 'status' => $row->status, 'complianceStatus' => $row->compliance_status, 'severity' => $row->severity, 'policy' => $row->rule_id ? ['id' => (string) $row->rule_id, 'key' => $row->rule_key, 'name' => $row->rule_name, 'type' => $row->rule_type] : null, 'source' => $row->subject_id ? ['type' => class_basename((string) $row->subject_type), 'id' => (string) $row->subject_id] : null, 'assignedReviewer' => $row->reviewer_id ? ['id' => (string) $row->reviewer_id, 'name' => $row->reviewer_name] : null, 'noteCount' => (int) $row->note_count, 'createdAt' => (string) $row->created_at, 'updatedAt' => (string) $row->updated_at, 'evidence' => ['available' => false, 'count' => null, 'reason' => 'policy_evidence_domain_not_present'], 'enforcement' => ['available' => false, 'reason' => 'enforcement_domain_not_present'], 'appeal' => ['available' => false, 'reason' => 'appeal_domain_not_present'], 'sla' => ['available' => false, 'reason' => 'policy_case_sla_deadline_not_present']];
    }

    private function metric(string $id, string $label, int $value, string $definition): array
    {
        return compact('id', 'label', 'value', 'definition') + ['available' => true];
    }

    private function unavailable(string $id, string $label, string $reason): array
    {
        return compact('id', 'label', 'reason') + ['available' => false, 'value' => null];
    }

    private function meta(LengthAwarePaginator $p): array
    {
        return ['page' => $p->currentPage(), 'perPage' => $p->perPage(), 'total' => $p->total(), 'totalPages' => $p->lastPage(), 'from' => $p->firstItem(), 'to' => $p->lastItem(), 'generatedAt' => now()->toIso8601String(), 'dataAsOf' => now()->toIso8601String(), 'refreshIntervalSeconds' => 60];
    }
}
