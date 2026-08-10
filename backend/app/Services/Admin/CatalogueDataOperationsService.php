<?php

namespace App\Services\Admin;

use App\Jobs\ProcessCatalogueDataJob;
use App\Models\CatalogueDataJob;
use App\Models\CatalogueExportSchedule;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class CatalogueDataOperationsService
{
    public function dashboard(array $filters, array $permissions): array
    {
        $query = CatalogueDataJob::query()->with('user:id,name');
        $this->applyFilters($query, $filters);
        $sort = ['updatedAt' => 'updated_at', 'recordsCount' => 'total_records', 'fileName' => 'original_name', 'operationType' => 'operation_type', 'outcome' => 'status'][$filters['sort'] ?? 'updatedAt'] ?? 'updated_at';
        $query->orderBy($sort, ($filters['direction'] ?? 'desc') === 'asc' ? 'asc' : 'desc')->orderByDesc('id');
        $page = max(1, (int) ($filters['page'] ?? 1));
        $pageSize = min(100, max(1, (int) ($filters['pageSize'] ?? 25)));
        $p = $query->paginate($pageSize, ['*'], 'page', $page);
        $all = CatalogueDataJob::query();
        $month = now()->startOfMonth();
        $counts = ['imports' => (clone $all)->where('operation_type', 'import')->where('created_at', '>=', $month)->count(), 'successfulImports' => (clone $all)->where('operation_type', 'import')->where('status', 'completed')->where('created_at', '>=', $month)->count(), 'partialImports' => (clone $all)->where('operation_type', 'import')->where('warning_records', '>', 0)->where('created_at', '>=', $month)->count(), 'failedImports' => (clone $all)->where('operation_type', 'import')->where('status', 'failed')->where('created_at', '>=', $month)->count(), 'recordsProcessed' => (int) (clone $all)->sum('processed_records'), 'recordsRejected' => (int) (clone $all)->sum('failed_records'), 'mappingIssues' => DB::table('catalogue_data_job_errors')->where('error_code', 'invalid_headers')->count(), 'duplicateConflicts' => 0, 'exports' => (clone $all)->where('operation_type', 'export')->where('status', 'completed')->count(), 'scheduled' => CatalogueExportSchedule::where('enabled', true)->count(), 'exportFailures' => (clone $all)->where('operation_type', 'export')->where('status', 'failed')->count(), 'pending' => (clone $all)->whereIn('status', ['queued', 'processing'])->count()];
        $kpiLabels = [['Imports This Month', 'imports', 'imports'], ['Successful Imports', 'successfulImports', 'completed'], ['Partial Imports', 'partialImports', 'imports'], ['Failed Imports', 'failedImports', 'failed'], ['Records Processed', 'recordsProcessed', 'all'], ['Records Rejected', 'recordsRejected', 'failed'], ['Mapping Issues', 'mappingIssues', 'failed'], ['Duplicate Conflicts', 'duplicateConflicts', 'unavailable'], ['Exports Generated', 'exports', 'exports'], ['Scheduled Exports', 'scheduled', 'scheduled'], ['Export Failures', 'exportFailures', 'failed'], ['Pending Review Jobs', 'pending', 'running']];
        $kpis = collect($kpiLabels)->values()->map(fn ($x, $i) => ['id' => 'kpi-'.($i + 1), 'seqNumber' => $i + 1, 'label' => $x[0], 'value' => $x[2] === 'unavailable' ? null : $counts[$x[1]], 'trend' => null, 'available' => $x[2] !== 'unavailable', 'scope' => $x[2], 'reason' => $x[2] === 'unavailable' ? 'No duplicate-conflict staging domain exists.' : null])->all();
        $statusCounts = CatalogueDataJob::selectRaw('status,count(*) count')->groupBy('status')->pluck('count', 'status');
        $total = (int) $statusCounts->sum();
        $colors = ['completed' => '#059669', 'queued' => '#64748b', 'processing' => '#8b5cf6', 'failed' => '#dc2626', 'cancelled' => '#d97706'];
        $distribution = collect($colors)->map(fn ($color, $status) => ['name' => Str::headline($status), 'value' => (int) ($statusCounts[$status] ?? 0), 'percentage' => $total ? round(100 * (int) ($statusCounts[$status] ?? 0) / $total, 1) : 0, 'color' => $color])->values()->all();
        $tabs = collect(['All Jobs' => 'all', 'Imports' => 'imports', 'Exports' => 'exports', 'Running' => 'running', 'Pending Review' => 'pending', 'Scheduled' => 'scheduled', 'Failed' => 'failed', 'Completed' => 'completed', 'Templates' => 'templates'])->map(fn ($scope, $label) => ['label' => $label, 'scope' => $scope, 'count' => $this->scopeCount($scope)])->values()->all();
        $active = CatalogueDataJob::with('user:id,name')->whereIn('status', ['queued', 'processing'])->latest()->first();

        return ['kpis' => $kpis, 'trend' => $this->trend($filters['granularity'] ?? 'daily'), 'distribution' => $distribution, 'tabs' => $tabs, 'jobs' => ['data' => collect($p->items())->map(fn ($j) => $this->row($j))->all(), 'page' => $p->currentPage(), 'pageSize' => $p->perPage(), 'total' => $p->total(), 'totalPages' => max(1, $p->lastPage())], 'activeJob' => $active ? $this->row($active) : null, 'workflow' => $active ? $this->workflow($active) : null, 'health' => $this->health($counts, $total), 'alerts' => $this->alerts($counts), 'statusSummaries' => ['imports' => $this->summary('import'), 'exports' => $this->summary('export')], 'lower' => $this->lower(), 'options' => ['dataTypes' => [['value' => 'products', 'label' => 'Product Masters']], 'users' => User::orderBy('name')->get(['id', 'name']), 'sources' => ['Secure Upload', 'System Export'], 'statuses' => CatalogueDataJob::distinct()->pluck('status')], 'capabilities' => $permissions + ['tenantIsolation' => false, 'savedViews' => false, 'templates' => false, 'duplicateReview' => false, 'mappingEditor' => false, 'broadcasting' => false], 'lastSyncedAt' => now()->toIso8601String(), 'meta' => ['refreshIntervalSeconds' => 30, 'queueConnection' => config('queue.default')]];
    }

    public function createImport(UploadedFile $file, array $data, User $actor, ?string $requestKey): CatalogueDataJob
    {
        $hash = hash_file('sha256', $file->getRealPath());
        $key = $requestKey ?: hash('sha256', implode('|', [$actor->id, 'import', $data['data_type'], $hash]));
        if ($existing = CatalogueDataJob::where('idempotency_key', $key)->first()) {
            return $existing;
        }
        $path = $file->storeAs('catalogue-operations/imports', Str::uuid().'.csv', 'local');
        try {
            $job = DB::transaction(fn () => CatalogueDataJob::create(['uuid' => (string) Str::uuid(), 'user_id' => $actor->id, 'operation_type' => 'import', 'data_type' => $data['data_type'], 'status' => 'queued', 'validation_status' => 'pending', 'approval_status' => 'not_required', 'original_name' => basename($file->getClientOriginalName()), 'input_path' => $path, 'mime_type' => $file->getMimeType(), 'file_size' => $file->getSize(), 'file_hash' => $hash, 'idempotency_key' => $key, 'current_stage' => 'queued']));
        } catch (\Throwable $e) {
            Storage::disk('local')->delete($path);
            throw $e;
        }
        activity('catalogue_data_operations')->causedBy($actor)->performedOn($job)->log('catalogue.import_created');
        ProcessCatalogueDataJob::dispatch($job->id)->afterCommit();

        return $job;
    }

    public function createExport(array $data, User $actor, ?string $requestKey): CatalogueDataJob
    {
        $key = $requestKey ?: hash('sha256', implode('|', [$actor->id, 'export', $data['data_type'], now()->format('Y-m-d-H-i-s-u')]));
        if ($existing = CatalogueDataJob::where('idempotency_key', $key)->first()) {
            return $existing;
        }
        $job = CatalogueDataJob::create(['uuid' => (string) Str::uuid(), 'user_id' => $actor->id, 'operation_type' => 'export', 'data_type' => $data['data_type'], 'status' => 'queued', 'validation_status' => 'pending', 'approval_status' => 'not_required', 'original_name' => 'Product Master export', 'idempotency_key' => $key, 'current_stage' => 'queued']);
        activity('catalogue_data_operations')->causedBy($actor)->performedOn($job)->log('catalogue.export_requested');
        ProcessCatalogueDataJob::dispatch($job->id)->afterCommit();

        return $job;
    }

    public function retry(CatalogueDataJob $job, User $actor): CatalogueDataJob
    {
        abort_unless(in_array($job->status, ['failed', 'cancelled'], true), 409, 'Only failed or cancelled jobs can be retried.');
        $job->errors()->delete();
        $job->update(['status' => 'queued', 'validation_status' => 'pending', 'progress' => 0, 'current_stage' => 'queued', 'failure_message' => null, 'processed_records' => 0, 'successful_records' => 0, 'failed_records' => 0, 'cancelled_at' => null, 'completed_at' => null]);
        activity('catalogue_data_operations')->causedBy($actor)->performedOn($job)->log('catalogue.job_retried');
        ProcessCatalogueDataJob::dispatch($job->id)->afterCommit();

        return $job;
    }

    public function cancel(CatalogueDataJob $job, User $actor): CatalogueDataJob
    {
        abort_unless(in_array($job->status, ['queued', 'processing'], true), 409, 'Only queued or processing jobs can be cancelled.');
        $job->update(['status' => 'cancelled', 'current_stage' => 'cancelled', 'cancelled_at' => now()]);
        activity('catalogue_data_operations')->causedBy($actor)->performedOn($job)->log('catalogue.job_cancelled');

        return $job;
    }

    public function row(CatalogueDataJob $j): array
    {
        $status = match ($j->status) {
            'completed' => 'Success','failed' => 'Failed','cancelled' => 'Failed',default => 'In Progress'
        };
        $execution = match ($j->status) {
            'completed' => $j->operation_type === 'export' ? 'Delivered' : 'Reconciled','processing' => 'Running','failed' => 'Failed','cancelled' => 'Cancelled',default => 'Queued'
        };

        return ['id' => $j->uuid, 'publicId' => strtoupper(substr($j->operation_type, 0, 3)).'-'.str_pad((string) $j->id, 6, '0', STR_PAD_LEFT), 'operationType' => Str::headline($j->operation_type), 'dataType' => Str::headline($j->data_type), 'fileName' => $j->original_name ?: 'Pending generation', 'source' => $j->operation_type === 'import' ? 'Secure Upload' : 'System Export', 'scope' => Str::headline($j->data_type), 'submittedBy' => $j->user?->name ?: 'System', 'recordsCount' => $j->total_records, 'recordsFormatted' => number_format($j->total_records), 'processedRecords' => $j->processed_records, 'successfulRecords' => $j->successful_records, 'failedRecords' => $j->failed_records, 'mappingPercentage' => null, 'validationStatus' => Str::headline($j->validation_status), 'duplicatesCount' => 0, 'approvalStatus' => Str::headline($j->approval_status), 'executionStatus' => $execution, 'outcome' => $status, 'progress' => $j->progress, 'currentStage' => Str::headline($j->current_stage), 'updatedAt' => $j->updated_at?->toIso8601String(), 'canDownload' => $j->status === 'completed' && $j->output_path !== null, 'canRetry' => in_array($j->status, ['failed', 'cancelled'], true), 'canCancel' => in_array($j->status, ['queued', 'processing'], true), 'failureMessage' => $j->failure_message];
    }

    private function applyFilters(Builder $q, array $f): void
    {
        if ($s = trim((string) ($f['search'] ?? ''))) {
            $q->where(fn ($x) => $x->where('uuid', 'like', "%$s%")->orWhere('original_name', 'like', "%$s%")->orWhereHas('user', fn ($u) => $u->where('name', 'like', "%$s%")));
        }if (! empty($f['operationType'])) {
            $q->where('operation_type', $f['operationType']);
        }if (! empty($f['dataType'])) {
            $q->where('data_type', $f['dataType']);
        }if (! empty($f['status'])) {
            $q->where('status', $f['status']);
        }if (! empty($f['userId'])) {
            $q->where('user_id', $f['userId']);
        }if (! empty($f['dateFrom'])) {
            $q->whereDate('created_at', '>=', $f['dateFrom']);
        }if (! empty($f['dateTo'])) {
            $q->whereDate('created_at', '<=', $f['dateTo']);
        }$scope = $f['scope'] ?? 'all';
        if ($scope === 'imports') {
            $q->where('operation_type', 'import');
        }if ($scope === 'exports') {
            $q->where('operation_type', 'export');
        }if (in_array($scope, ['running', 'pending'], true)) {
            $q->whereIn('status', ['queued', 'processing']);
        }if (in_array($scope, ['failed', 'completed'], true)) {
            $q->where('status', $scope);
        }if (in_array($scope, ['scheduled', 'templates'], true)) {
            $q->whereRaw('1=0');
        }
    }

    private function scopeCount(string $s): int
    {
        return match ($s) {
            'all' => CatalogueDataJob::count(),'imports' => CatalogueDataJob::where('operation_type', 'import')->count(),'exports' => CatalogueDataJob::where('operation_type', 'export')->count(),'running','pending' => CatalogueDataJob::whereIn('status', ['queued', 'processing'])->count(),'failed','completed' => CatalogueDataJob::where('status', $s)->count(),'scheduled' => CatalogueExportSchedule::where('enabled', true)->count(),default => 0
        };
    }

    private function trend(string $g): array
    {
        $format = $g === 'monthly' ? '%Y-%m' : ($g === 'weekly' ? '%Y-%W' : '%Y-%m-%d');
        $period = DB::getDriverName() === 'sqlite' ? "strftime('$format',created_at)" : "to_char(created_at,'".($g === 'monthly' ? 'YYYY-MM' : ($g === 'weekly' ? 'IYYY-IW' : 'YYYY-MM-DD'))."')";
        $rows = CatalogueDataJob::where('created_at', '>=', now()->subDays(90))->selectRaw("$period period,operation_type,status,count(*) jobs,sum(processed_records) records")->groupBy('period', 'operation_type', 'status')->get();

        return ['granularity' => $g, 'points' => $rows->groupBy('period')->map(fn ($set, $p) => ['name' => $p, 'imports' => (int) $set->where('operation_type', 'import')->sum('jobs'), 'exports' => (int) $set->where('operation_type', 'export')->sum('jobs'), 'processed' => (int) $set->sum('records'), 'failures' => (int) $set->where('status', 'failed')->sum('jobs')])->values()->all()];
    }

    private function summary(string $type): array
    {
        return CatalogueDataJob::where('operation_type', $type)->selectRaw('status,count(*) count')->groupBy('status')->get()->map(fn ($x) => ['label' => Str::headline($x->status), 'count' => (int) $x->count])->all();
    }

    private function health(array $c, int $total): array
    {
        $failed = $c['failedImports'] + $c['exportFailures'];
        $score = $total ? max(0, (int) round(100 * (1 - $failed / $total))) : null;
        $validationPassRate = $total ? (int) round(100 * ($total - $failed) / $total) : null;

        return ['score' => $score, 'status' => $score === null ? 'No data' : ($score >= 90 ? 'Healthy' : ($score >= 70 ? 'Needs Attention' : 'Critical')), 'metrics' => [['label' => 'Completion reliability', 'value' => $score], ['label' => 'Validation pass rate', 'value' => $validationPassRate]]];
    }

    private function alerts(array $c): array
    {
        return collect([['id' => 'failed-imports', 'label' => 'Failed imports', 'count' => $c['failedImports'], 'severity' => 'High', 'scope' => 'failed'], ['id' => 'failed-exports', 'label' => 'Failed exports', 'count' => $c['exportFailures'], 'severity' => 'High', 'scope' => 'failed'], ['id' => 'rejected', 'label' => 'Rejected records', 'count' => $c['recordsRejected'], 'severity' => 'Medium', 'scope' => 'failed']])->filter(fn ($x) => $x['count'] > 0)->values()->all();
    }

    private function workflow(CatalogueDataJob $j): array
    {
        $stages = ['queued', 'file_inspection', 'schema_validation', 'business_validation', 'validation', 'database_commit', 'file_generation', 'completed'];
        $index = array_search($j->current_stage, $stages, true);

        return ['activeStage' => $index === false ? 1 : $index + 1, 'stage' => $j->current_stage, 'progress' => $j->progress];
    }

    private function lower(): array
    {
        return [
            'fieldMappings' => [],
            'validationIssues' => DB::table('catalogue_data_job_errors')->selectRaw('error_code label, count(*) count, severity')->groupBy('error_code', 'severity')->get(),
            'duplicateConflicts' => [],
            'schedules' => CatalogueExportSchedule::latest()->limit(10)->get()->map(fn ($schedule) => ['id' => $schedule->uuid, 'feedName' => $schedule->name, 'frequency' => Str::headline($schedule->frequency), 'destination' => 'Secure local download', 'nextRun' => $schedule->next_run_at?->toIso8601String(), 'status' => $schedule->enabled ? 'Scheduled' : 'Paused']),
            'templates' => [],
            'reconciliation' => CatalogueDataJob::where('status', 'completed')->latest('completed_at')->limit(10)->get()->map(fn ($job) => ['id' => $job->uuid, 'jobId' => 'JOB-'.$job->id, 'type' => Str::headline($job->operation_type), 'reconciledAt' => $job->completed_at?->toIso8601String(), 'variancesCount' => $job->failed_records, 'status' => $job->failed_records ? 'Variance' : 'Matched']),
            'activities' => DB::table('activity_log')->where('log_name', 'catalogue_data_operations')->latest()->limit(10)->get()->map(fn ($activity) => ['id' => (string) $activity->id, 'action' => Str::headline($activity->description), 'user' => $activity->causer_id ? 'Admin #'.$activity->causer_id : 'System', 'jobId' => $activity->subject_id ? 'Job #'.$activity->subject_id : 'Operations', 'dateTime' => $activity->created_at, 'result' => str_contains($activity->description, 'failed') ? 'Failed' : 'Success']),
        ];
    }
}
