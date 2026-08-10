<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\CatalogueDataJob;
use App\Models\CatalogueExportSchedule;
use App\Services\Admin\CatalogueDataOperationsService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\StreamedResponse;

class CatalogueDataOperationsController extends Controller
{
    public function index(Request $request, CatalogueDataOperationsService $service): JsonResponse
    {
        $this->view($request);
        $filters = $request->validate($this->filters());

        return response()->json(['success' => true, 'data' => $service->dashboard($filters, $this->capabilities($request))]);
    }

    public function show(Request $request, CatalogueDataJob $job, CatalogueDataOperationsService $service): JsonResponse
    {
        $this->view($request);

        return response()->json(['success' => true, 'data' => $service->row($job->load('user:id,name')) + ['errors' => $job->errors()->orderBy('row_number')->paginate(100)]]);
    }

    public function import(Request $request, CatalogueDataOperationsService $service): JsonResponse
    {
        $this->manage($request);
        $data = $request->validate(['file' => ['required', 'file', 'mimes:csv,txt', 'mimetypes:text/plain,text/csv,application/csv,application/vnd.ms-excel', 'max:20480'], 'data_type' => ['required', Rule::in(['products'])]]);
        $job = $service->createImport($request->file('file'), $data, $request->user(), $request->header('Idempotency-Key'));

        return response()->json(['success' => true, 'data' => $service->row($job->load('user:id,name'))], 202);
    }

    public function export(Request $request, CatalogueDataOperationsService $service): JsonResponse
    {
        $this->exportPermission($request);
        $data = $request->validate(['data_type' => ['required', Rule::in(['products'])]]);
        $job = $service->createExport($data, $request->user(), $request->header('Idempotency-Key'));

        return response()->json(['success' => true, 'data' => $service->row($job->load('user:id,name'))], 202);
    }

    public function retry(Request $request, CatalogueDataJob $job, CatalogueDataOperationsService $service): JsonResponse
    {
        $this->manage($request);

        return response()->json(['success' => true, 'data' => $service->row($service->retry($job, $request->user())->load('user:id,name'))], 202);
    }

    public function cancel(Request $request, CatalogueDataJob $job, CatalogueDataOperationsService $service): JsonResponse
    {
        $this->manage($request);

        return response()->json(['success' => true, 'data' => $service->row($service->cancel($job, $request->user())->load('user:id,name'))]);
    }

    public function bulk(Request $request, CatalogueDataOperationsService $service): JsonResponse
    {
        $this->manage($request);
        $data = $request->validate(['ids' => ['required', 'array', 'min:1', 'max:100'], 'ids.*' => ['uuid', 'distinct', 'exists:catalogue_data_jobs,uuid'], 'action' => ['required', Rule::in(['retry', 'cancel'])]]);
        $updated = 0;
        foreach (CatalogueDataJob::whereIn('uuid', $data['ids'])->get() as $job) {
            if ($data['action'] === 'retry' && in_array($job->status, ['failed', 'cancelled'], true)) {
                $service->retry($job, $request->user());
                $updated++;
            }if ($data['action'] === 'cancel' && in_array($job->status, ['queued', 'processing'], true)) {
                $service->cancel($job, $request->user());
                $updated++;
            }
        }
        activity('catalogue_data_operations')->causedBy($request->user())->withProperties(['ids' => $data['ids'], 'action' => $data['action'], 'updated' => $updated])->log('catalogue.bulk_action');

        return response()->json(['success' => true, 'data' => ['updated' => $updated]]);
    }

    public function download(Request $request, CatalogueDataJob $job): BinaryFileResponse
    {
        $this->exportPermission($request);
        abort_unless($job->status === 'completed' && $job->output_path && Storage::disk('local')->exists($job->output_path), 404);
        activity('catalogue_data_operations')->causedBy($request->user())->performedOn($job)->log('catalogue.export_downloaded');

        return response()->download(Storage::disk('local')->path($job->output_path), basename($job->original_name ?: 'catalogue-export.csv'), ['Content-Type' => $job->mime_type ?: 'text/csv', 'X-Content-Type-Options' => 'nosniff']);
    }

    public function schedule(Request $request): JsonResponse
    {
        $this->exportPermission($request);
        $data = $request->validate(['name' => ['required', 'string', 'max:255'], 'data_type' => ['required', Rule::in(['products'])], 'frequency' => ['required', Rule::in(['daily', 'weekly', 'monthly'])], 'timezone' => ['required', 'timezone'], 'format' => ['nullable', Rule::in(['csv'])]]);
        $next = now($data['timezone'])->addDay()->startOfDay()->utc();
        if ($data['frequency'] === 'weekly') {
            $next = now($data['timezone'])->addWeek()->startOfWeek()->utc();
        }if ($data['frequency'] === 'monthly') {
            $next = now($data['timezone'])->addMonth()->startOfMonth()->utc();
        }
        $schedule = CatalogueExportSchedule::create($data + ['uuid' => (string) Str::uuid(), 'user_id' => $request->user()->id, 'format' => $data['format'] ?? 'csv', 'filters' => [], 'enabled' => true, 'next_run_at' => $next]);
        activity('catalogue_data_operations')->causedBy($request->user())->performedOn($schedule)->log('catalogue.export_scheduled');

        return response()->json(['success' => true, 'data' => $schedule], 201);
    }

    public function report(Request $request, CatalogueDataOperationsService $service): StreamedResponse
    {
        $this->exportPermission($request);
        $filters = validator($request->query(), $this->filters())->validate();
        $data = $service->dashboard($filters, $this->capabilities($request));
        activity('catalogue_data_operations')->causedBy($request->user())->log('catalogue.operations_report_exported');

        return response()->streamDownload(function () use ($data) {
            $h = fopen('php://output', 'wb');
            fputcsv($h, ['Metric', 'Value', 'Availability']);
            foreach ($data['kpis'] as $k) {
                fputcsv($h, [$this->safe($k['label']), $k['value'] ?? '', $k['available'] ? 'Available' : 'Unavailable']);
            }fclose($h);
        }, 'catalogue-data-operations-'.now()->format('Ymd-His').'.csv', ['Content-Type' => 'text/csv; charset=UTF-8', 'X-Content-Type-Options' => 'nosniff']);
    }

    private function safe(mixed $value): mixed
    {
        return is_string($value) && preg_match('/^[=+\-@]/', $value) ? "'".$value : $value;
    }

    private function filters(): array
    {
        return ['page' => ['nullable', 'integer', 'min:1'], 'pageSize' => ['nullable', 'integer', 'min:1', 'max:100'], 'search' => ['nullable', 'string', 'max:150'], 'operationType' => ['nullable', Rule::in(['import', 'export'])], 'dataType' => ['nullable', Rule::in(['products'])], 'status' => ['nullable', Rule::in(['queued', 'processing', 'completed', 'failed', 'cancelled'])], 'userId' => ['nullable', 'integer', 'exists:users,id'], 'dateFrom' => ['nullable', 'date'], 'dateTo' => ['nullable', 'date', 'after_or_equal:dateFrom'], 'scope' => ['nullable', Rule::in(['all', 'imports', 'exports', 'running', 'pending', 'scheduled', 'failed', 'completed', 'templates'])], 'granularity' => ['nullable', Rule::in(['daily', 'weekly', 'monthly'])], 'sort' => ['nullable', Rule::in(['updatedAt', 'recordsCount', 'fileName', 'operationType', 'outcome'])], 'direction' => ['nullable', Rule::in(['asc', 'desc'])]];
    }

    private function capabilities(Request $r): array
    {
        return ['canView' => true, 'canImport' => $r->user()->hasPermission('products.manage'), 'canExport' => $r->user()->hasPermission('analytics.export'), 'canManage' => $r->user()->hasPermission('products.manage'), 'canSchedule' => $r->user()->hasPermission('analytics.export')];
    }

    private function view(Request $r): void
    {
        abort_unless($r->user()->hasPermission('products.view'), 403);
    }

    private function manage(Request $r): void
    {
        abort_unless($r->user()->hasPermission('products.manage'), 403);
    }

    private function exportPermission(Request $r): void
    {
        abort_unless($r->user()->hasPermission('analytics.export'), 403);
    }
}
