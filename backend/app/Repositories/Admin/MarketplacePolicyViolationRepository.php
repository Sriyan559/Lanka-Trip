<?php

namespace App\Repositories\Admin;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Query\Builder;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class MarketplacePolicyViolationRepository
{
    public function paginate(array $filters): LengthAwarePaginator
    {
        $query = $this->baseQuery();
        $this->applyFilters($query, $filters);
        $sorts = ['caseCode' => 'compliance_case_files.case_number', 'category' => 'compliance_case_files.case_type',
            'status' => 'compliance_case_files.status', 'severity' => 'compliance_rules.severity',
            'createdAt' => 'compliance_case_files.created_at', 'updatedAt' => 'compliance_case_files.updated_at'];
        $query->orderBy($sorts[$filters['sortBy'] ?? 'updatedAt'] ?? 'compliance_case_files.updated_at', $filters['sortDirection'])->orderBy('compliance_case_files.id');

        return $query->paginate($filters['perPage'], ['*'], 'page', $filters['page']);
    }

    public function find(int $id): ?object
    {
        return $this->baseQuery()->where('compliance_case_files.id', $id)->first();
    }

    public function exportRows(array $filters): Collection
    {
        $query = $this->baseQuery();
        $this->applyFilters($query, $filters);

        return $query->orderBy('compliance_case_files.id')->limit(100000)->get();
    }

    public function summary(array $filters): array
    {
        $base = $this->baseQuery();
        $this->applyFilters($base, $filters);
        $categories = (clone $base)->select('compliance_case_files.case_type', DB::raw('COUNT(*) as aggregate'))->groupBy('compliance_case_files.case_type')->orderByDesc('aggregate')->get();
        $sources = (clone $base)->select('compliance_case_files.subject_type', DB::raw('COUNT(*) as aggregate'))->groupBy('compliance_case_files.subject_type')->orderByDesc('aggregate')->get();
        $statuses = (clone $base)->select('compliance_case_files.status', DB::raw('COUNT(*) as aggregate'))->groupBy('compliance_case_files.status')->orderByDesc('aggregate')->get();
        $severities = (clone $base)->select('compliance_rules.severity', DB::raw('COUNT(*) as aggregate'))->groupBy('compliance_rules.severity')->orderByDesc('aggregate')->get();

        return ['total' => (clone $base)->count(), 'open' => (clone $base)->where('compliance_case_files.status', 'open')->count(),
            'new_today' => (clone $base)->whereDate('compliance_case_files.created_at', today())->count(),
            'categories' => $this->distribution($categories, 'case_type'), 'sources' => $this->distribution($sources, 'subject_type'),
            'statuses' => $this->distribution($statuses, 'status'), 'severities' => $this->distribution($severities, 'severity')];
    }

    public function trend(array $filters): array
    {
        $date = DB::connection()->getDriverName() === 'sqlite' ? 'date(created_at)' : 'CAST(created_at AS DATE)';

        return DB::table('compliance_case_files')->whereNull('deleted_at')->whereBetween('created_at', [$filters['from'], $filters['to']])
            ->selectRaw("{$date} as period, COUNT(*) as created_count")->groupBy(DB::raw($date))->orderBy(DB::raw($date))->get()
            ->map(fn (object $row): array => ['period' => $row->period, 'createdCount' => (int) $row->created_count])->all();
    }

    private function baseQuery(): Builder
    {
        $notes = DB::table('compliance_case_notes')->whereNull('deleted_at')->groupBy('compliance_case_file_id')->selectRaw('compliance_case_file_id, COUNT(*) as note_count');

        return DB::table('compliance_case_files')->leftJoin('compliance_rules', 'compliance_rules.id', '=', 'compliance_case_files.compliance_rule_id')
            ->leftJoin('users as reviewers', 'reviewers.id', '=', 'compliance_case_files.assigned_to')
            ->leftJoinSub($notes, 'case_notes', 'case_notes.compliance_case_file_id', '=', 'compliance_case_files.id')
            ->whereNull('compliance_case_files.deleted_at')
            ->select(['compliance_case_files.id', 'compliance_case_files.uuid', 'compliance_case_files.case_number', 'compliance_case_files.case_type',
                'compliance_case_files.subject_type', 'compliance_case_files.subject_id', 'compliance_case_files.status', 'compliance_case_files.compliance_status',
                'compliance_case_files.created_at', 'compliance_case_files.updated_at', 'compliance_rules.id as rule_id', 'compliance_rules.rule_key',
                'compliance_rules.name as rule_name', 'compliance_rules.rule_type', 'compliance_rules.severity', 'reviewers.id as reviewer_id',
                'reviewers.name as reviewer_name', DB::raw('COALESCE(case_notes.note_count, 0) as note_count')]);
    }

    private function applyFilters(Builder $query, array $filters): void
    {
        $query->whereBetween('compliance_case_files.created_at', [$filters['from'], $filters['to']]);
        if ($search = $filters['search'] ?? null) {
            $term = '%'.mb_strtolower($search).'%';
            $query->where(fn (Builder $q) => $q->whereRaw('LOWER(compliance_case_files.case_number) LIKE ?', [$term])
                ->orWhereRaw('LOWER(compliance_case_files.case_type) LIKE ?', [$term])->orWhereRaw('LOWER(compliance_rules.name) LIKE ?', [$term]));
        }
        if ($value = $filters['caseStatus'] ?? null) {
            $query->where('compliance_case_files.status', $value);
        }
        if ($value = $filters['complianceStatus'] ?? null) {
            $query->where('compliance_case_files.compliance_status', $value);
        }
        if ($value = $filters['category'] ?? null) {
            $query->where('compliance_case_files.case_type', $value);
        }
        if ($value = $filters['severity'] ?? null) {
            $query->where('compliance_rules.severity', $value);
        }
        if ($value = $filters['sourceType'] ?? null) {
            $query->where('compliance_case_files.subject_type', $value);
        }
        if ($value = $filters['assignedReviewerId'] ?? null) {
            $query->where('compliance_case_files.assigned_to', $value);
        }
    }

    private function distribution(Collection $rows, string $key): array
    {
        $total = (int) $rows->sum('aggregate');

        return $rows->map(fn (object $row): array => ['key' => $row->{$key} ?: 'unassigned', 'count' => (int) $row->aggregate,
            'percentage' => $total > 0 ? round(((int) $row->aggregate / $total) * 100, 2) : 0])->all();
    }
}
