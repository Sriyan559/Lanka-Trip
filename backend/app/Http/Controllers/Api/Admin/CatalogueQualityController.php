<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\CatalogueDuplicateCandidate;
use App\Models\CatalogueQualityIssue;
use App\Models\CatalogueQualityValidationRun;
use App\Services\Admin\CatalogueQualityService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Symfony\Component\HttpFoundation\StreamedResponse;

class CatalogueQualityController extends Controller
{
    public function index(Request $request, CatalogueQualityService $service): JsonResponse
    {
        $this->view($request);
        $filters = validator($request->query(), $this->filters())->validate();

        return response()->json(['success' => true, 'data' => $service->dashboard($filters, $request->user(), $this->capabilities($request))]);
    }

    public function show(Request $request, CatalogueQualityIssue $issue, CatalogueQualityService $service): JsonResponse
    {
        $this->view($request);

        return response()->json(['success' => true, 'data' => $service->detail($issue)]);
    }

    public function validateCatalogue(Request $request, CatalogueQualityService $service): JsonResponse
    {
        $this->manage($request);
        $data = $request->validate(['scope' => ['required', Rule::in(['catalogue'])]]);
        $run = $service->startValidation($request->user(), $data['scope']);

        return response()->json(['success' => true, 'data' => ['id' => $run->uuid, 'status' => $run->status, 'progress' => $run->progress]], 202);
    }

    public function validationRun(Request $request, CatalogueQualityValidationRun $run): JsonResponse
    {
        $this->view($request);

        return response()->json(['success' => true, 'data' => ['id' => $run->uuid, 'status' => $run->status, 'progress' => $run->progress, 'productsScanned' => $run->products_scanned, 'issuesCreated' => $run->issues_created, 'issuesUpdated' => $run->issues_updated, 'issuesResolved' => $run->issues_resolved, 'failureMessage' => $run->failure_message]]);
    }

    public function storeCase(Request $request, CatalogueQualityService $service): JsonResponse
    {
        $this->manage($request);
        $data = $request->validate(['product_id' => ['nullable', 'integer', 'exists:products,id'], 'title' => ['required', 'string', 'max:255'], 'issue_type' => ['required', Rule::in(['incomplete_record', 'missing_mandatory_media', 'validation_failure', 'publication_blocker', 'duplicate_candidate', 'manual_quality_case'])], 'severity' => ['required', Rule::in(['critical', 'high', 'medium', 'low'])], 'description' => ['required', 'string', 'max:10000'], 'evidence' => ['nullable', 'string', 'max:10000'], 'assigned_to' => ['nullable', 'integer', 'exists:users,id'], 'reviewer_id' => ['nullable', 'integer', 'exists:users,id'], 'sla_due_at' => ['nullable', 'date', 'after:now']]);

        return response()->json(['success' => true, 'data' => $service->row($service->createCase($data, $request->user()))], 201);
    }

    public function updateIssue(Request $request, CatalogueQualityIssue $issue, CatalogueQualityService $service): JsonResponse
    {
        $this->manage($request);
        $data = $request->validate(['status' => ['sometimes', Rule::in(['in_review', 'waiting_owner', 'in_progress', 'escalated', 'resolved', 'dismissed', 'reopened'])], 'severity' => ['sometimes', Rule::in(['critical', 'high', 'medium', 'low'])], 'assigned_to' => ['sometimes', 'nullable', 'integer', 'exists:users,id'], 'reviewer_id' => ['sometimes', 'nullable', 'integer', 'exists:users,id'], 'sla_due_at' => ['sometimes', 'nullable', 'date'], 'reason' => ['nullable', 'string', 'max:5000'], 'lock_version' => ['nullable', 'integer', 'min:0']]);

        return response()->json(['success' => true, 'data' => $service->row($service->transition($issue, $data, $request->user()))]);
    }

    public function note(Request $request, CatalogueQualityIssue $issue, CatalogueQualityService $service): JsonResponse
    {
        $this->manage($request);
        $data = $request->validate(['note' => ['required', 'string', 'max:5000']]);
        $service->addNote($issue, $data['note'], $request->user());

        return response()->json(['success' => true], 201);
    }

    public function bulk(Request $request, CatalogueQualityService $service): JsonResponse
    {
        $this->manage($request);
        $data = $request->validate(['ids' => ['required', 'array', 'min:1', 'max:100'], 'ids.*' => ['uuid'], 'action' => ['required', Rule::in(['resolve', 'escalate', 'assign', 'severity', 'status', 'request_remediation', 'archive'])], 'assigned_to' => ['required_if:action,assign', 'nullable', 'integer', 'exists:users,id'], 'severity' => ['required_if:action,severity', 'nullable', Rule::in(['critical', 'high', 'medium', 'low'])], 'status' => ['required_if:action,status', 'nullable', Rule::in(['in_review', 'waiting_owner', 'in_progress', 'escalated', 'resolved', 'dismissed', 'reopened'])], 'reason' => ['nullable', 'string', 'max:5000']]);

        return response()->json(['success' => true, 'data' => ['updated' => $service->bulk($data['ids'], $data['action'], $data, $request->user())]]);
    }

    public function resolveDuplicate(Request $request, CatalogueDuplicateCandidate $candidate, CatalogueQualityService $service): JsonResponse
    {
        $this->manage($request);
        $data = $request->validate(['action' => ['required', Rule::in(['merge', 'ignored', 'not_duplicate'])], 'surviving_product_id' => ['required_if:action,merge', 'nullable', 'integer', 'exists:products,id'], 'reason' => ['nullable', 'string', 'max:5000']]);
        $resolved = $service->resolveCandidate($candidate, $data['action'], $data['surviving_product_id'] ?? null, $data['reason'] ?? null, $request->user());

        return response()->json(['success' => true, 'data' => ['id' => $resolved->uuid, 'status' => $resolved->status]]);
    }

    public function saveView(Request $request, CatalogueQualityService $service): JsonResponse
    {
        $this->view($request);
        $data = $request->validate(['name' => ['required', 'string', 'max:100'], 'filters' => ['required', 'array']]);
        $view = $service->saveView($data, $request->user());

        return response()->json(['success' => true, 'data' => ['id' => $view->uuid, 'name' => $view->name, 'filters' => $view->filters]], 201);
    }

    public function report(Request $request, CatalogueQualityService $service): StreamedResponse
    {
        $this->export($request);
        $filters = validator($request->query(), $this->filters() + ['ids' => ['nullable', 'array'], 'ids.*' => ['uuid']])->validate();
        activity('catalogue_quality')->causedBy($request->user())->withProperties(['filters' => $filters])->log('catalogue.quality_report_exported');

        return response()->streamDownload(function () use ($service, $filters): void {
            $handle = fopen('php://output', 'wb');
            fputcsv($handle, ['Issue ID', 'Product', 'SKU', 'Issue Type', 'Severity', 'Status', 'Category', 'Assignee', 'SLA', 'Updated']);
            $query = $service->filtered($filters);
            if (! empty($filters['ids'])) {
                $query->whereIn('uuid', $filters['ids']);
            }
            $query->reorder()->chunkById(200, function ($issues) use ($handle, $service): void {
                foreach ($issues as $issue) {
                    $row = $service->row($issue);
                    fputcsv($handle, collect([$row['caseId'], $row['entityName'], $row['sku'], $row['issueType'], $row['severity'], $row['status'], $row['category'], $row['owner'], $row['sla'], $row['updatedAt']])->map(fn ($value) => is_string($value) && preg_match('/^[=+\-@]/', $value) ? "'".$value : $value)->all());
                }
            });
            fclose($handle);
        }, 'catalogue-quality-'.now()->format('Ymd-His').'.csv', ['Content-Type' => 'text/csv; charset=UTF-8', 'X-Content-Type-Options' => 'nosniff']);
    }

    private function filters(): array
    {
        return ['page' => ['nullable', 'integer', 'min:1'], 'pageSize' => ['nullable', 'integer', 'min:1', 'max:100'], 'search' => ['nullable', 'string', 'max:150'], 'scope' => ['nullable', Rule::in(['all', 'duplicates', 'incomplete', 'validation', 'publication', 'cases', 'audit'])], 'issueType' => ['nullable', 'string', 'max:60'], 'severity' => ['nullable', Rule::in(['critical', 'high', 'medium', 'low'])], 'status' => ['nullable', 'string', 'max:30'], 'categoryId' => ['nullable', 'integer', 'exists:categories,id'], 'reviewerId' => ['nullable', 'integer', 'exists:users,id'], 'ownerId' => ['nullable', 'integer', 'exists:users,id'], 'slaStatus' => ['nullable', Rule::in(['breached'])], 'assignedToMe' => ['nullable', 'boolean'], 'unassigned' => ['nullable', 'boolean'], 'dateFrom' => ['nullable', 'date'], 'dateTo' => ['nullable', 'date', 'after_or_equal:dateFrom'], 'granularity' => ['nullable', Rule::in(['daily', 'weekly', 'monthly'])], 'sort' => ['nullable', Rule::in(['caseId', 'issueType', 'severity', 'status', 'updatedAt', 'sla'])], 'direction' => ['nullable', Rule::in(['asc', 'desc'])]];
    }

    private function capabilities(Request $request): array
    {
        return ['canView' => true, 'canManage' => $request->user()->hasPermission('products.manage'), 'canValidate' => $request->user()->hasPermission('products.manage'), 'canCreateCase' => $request->user()->hasPermission('products.manage'), 'canMerge' => $request->user()->hasPermission('products.manage'), 'canExport' => $request->user()->hasPermission('analytics.export'), 'tenantIsolation' => false];
    }

    private function view(Request $request): void
    {
        abort_unless($request->user()->hasPermission('products.view'), 403);
    }

    private function manage(Request $request): void
    {
        abort_unless($request->user()->hasPermission('products.manage'), 403);
    }

    private function export(Request $request): void
    {
        abort_unless($request->user()->hasPermission('analytics.export'), 403);
    }
}
