<?php

namespace App\Services\Admin;

use App\Repositories\Admin\FinanceGovernanceRepository;

class FinanceGovernanceService
{
    public function __construct(private readonly FinanceGovernanceRepository $repository) {}

    public function reports(array $filters): array
    {
        $capabilities = $this->repository->capabilities();
        if (! $capabilities['dataJobs']) return $this->unavailable('admin_data_jobs_table_not_present', $capabilities);
        $page = $this->repository->jobs($filters);
        $rows = collect($page->items())->map(fn ($r) => $this->jobRow($r))->all();
        $counts = collect($rows)->countBy('status');
        return ['source'=>'database','capabilities'=>$capabilities,'context'=>['tenant'=>'SL Beauty','tenantScopeAvailable'=>false],
            'kpis'=>[['label'=>'Operations','value'=>(string)$page->total()],['label'=>'Completed','value'=>(string)($counts['completed']??0)],['label'=>'Failed','value'=>(string)($counts['failed']??0)],['label'=>'Queued / Running','value'=>(string)(($counts['queued']??0)+($counts['running']??0)+($counts['pending']??0))],['label'=>'Processed Rows','value'=>(string)collect($rows)->sum('processedRecords')],['label'=>'Rejected Rows','value'=>(string)collect($rows)->sum('rejectedRecords')]],
            'records'=>$rows,'audit'=>$this->repository->audit(),'meta'=>['page'=>$page->currentPage(),'perPage'=>$page->perPage(),'total'=>$page->total(),'lastPage'=>$page->lastPage(),'updatedAt'=>now()->toIso8601String(),'refreshIntervalSeconds'=>30]];
    }

    public function report(string $uuid): ?array { $r=$this->repository->job($uuid); return $r ? $this->jobRow($r)+['details'=>$this->json($r->details),'errorSummary'=>$r->error_summary] : null; }

    public function reconciliation(): array
    {
        return $this->unavailable('reconciliation_domain_not_present', $this->repository->capabilities()) + ['records'=>[], 'audit'=>$this->repository->audit(10)];
    }

    private function unavailable(string $reason, array $capabilities): array { return ['source'=>'database','available'=>false,'reason'=>$reason,'capabilities'=>$capabilities,'context'=>['tenant'=>'SL Beauty','tenantScopeAvailable'=>false],'kpis'=>[],'records'=>[],'audit'=>[],'meta'=>['page'=>1,'perPage'=>20,'total'=>0,'lastPage'=>1,'updatedAt'=>now()->toIso8601String(),'refreshIntervalSeconds'=>30]]; }
    private function jobRow(object $r): array { return ['id'=>(string)$r->uuid,'reference'=>$r->job_code,'operationType'=>$r->job_type,'domain'=>$r->domain,'title'=>$r->title,'status'=>$r->status,'processedRecords'=>(int)$r->processed_records,'rejectedRecords'=>(int)$r->rejected_records,'totalRecords'=>(int)$r->total_records,'initiatedBy'=>$r->initiated_by_name ?: ($r->initiated_by ? 'Admin #'.$r->initiated_by : 'System'),'createdAt'=>(string)$r->created_at,'updatedAt'=>(string)$r->updated_at]; }
    private function json(mixed $value): mixed { if (is_array($value)) return $value; return $value ? json_decode($value, true) : null; }
}
