<?php

namespace App\Services\Admin;

use App\Jobs\RunCatalogueQualityValidation;
use App\Models\AdminCatalogueQualitySavedView;
use App\Models\CatalogueDuplicateCandidate;
use App\Models\CatalogueQualityIssue;
use App\Models\CatalogueQualityValidationRun;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class CatalogueQualityService
{
    public function __construct(private CatalogueQualityRuleService $rules) {}

    public function dashboard(array $filters, User $actor, array $capabilities): array
    {
        $query = $this->filtered($filters);
        $pageSize = min(100, max(1, (int) ($filters['pageSize'] ?? 25)));
        $page = max(1, (int) ($filters['page'] ?? 1));
        $this->sort($query, $filters['sort'] ?? 'updatedAt', $filters['direction'] ?? 'desc');
        $paginator = $query->paginate($pageSize, ['*'], 'page', $page);
        $counts = $this->counts();
        $scorecard = $this->scorecard();
        $overall = $this->averageAvailable($scorecard);

        return [
            'kpis' => $this->kpis($counts, $overall), 'tabs' => $this->tabs(),
            'trend' => $this->trend($filters['granularity'] ?? 'daily'),
            'distribution' => $this->distribution($this->filtered($filters)),
            'statusSummary' => $this->statusSummary($this->filtered($filters)), 'scorecard' => $scorecard,
            'issues' => ['data' => collect($paginator->items())->map(fn ($issue) => $this->row($issue))->all(), 'page' => $paginator->currentPage(), 'pageSize' => $paginator->perPage(), 'total' => $paginator->total(), 'totalPages' => $paginator->lastPage()],
            'lower' => $this->lower(), 'health' => $this->health($overall), 'alerts' => $this->alerts(),
            'quickQueues' => $this->quickQueues(), 'severitySummary' => $this->groupSummary('severity'),
            'resolutionSummary' => $this->resolutionSummary(), 'slaSummary' => $this->slaSummary(),
            'options' => $this->options(), 'savedViews' => AdminCatalogueQualitySavedView::where('user_id', $actor->id)->orderBy('name')->get(['uuid as id', 'name', 'filters']),
            'activeValidation' => $this->activeValidation(), 'capabilities' => $capabilities,
            'lastSyncedAt' => now()->toIso8601String(), 'meta' => ['refreshIntervalSeconds' => 30, 'tenantIsolation' => false, 'brandMapping' => false, 'channelMapping' => false],
        ];
    }

    public function row(CatalogueQualityIssue $issue): array
    {
        $issue->loadMissing(['product.category:id,name,parent_id', 'product.supplier:id,company_name', 'assignee:id,name', 'reviewer:id,name', 'candidate.productA:id,name,sku', 'candidate.productB:id,name,sku']);
        $product = $issue->product;
        $sla = $issue->sla_due_at ? ($issue->sla_due_at->isPast() && ! in_array($issue->status, ['resolved', 'dismissed'], true) ? 'Breached' : $issue->sla_due_at->diffForHumans()) : 'N/A';

        return [
            'id' => $issue->uuid, 'caseId' => 'QLT-'.str_pad((string) $issue->id, 8, '0', STR_PAD_LEFT),
            'issueType' => Str::headline($issue->issue_type), 'entityName' => $product?->name ?: $issue->title,
            'publicId' => $product ? 'PRODUCT-'.str_pad((string) $product->id, 6, '0', STR_PAD_LEFT) : 'MANUAL',
            'productId' => $product?->id ? (string) $product->id : null, 'sku' => $product?->sku ?: '—', 'brand' => null,
            'category' => $product?->category?->name, 'channels' => [], 'severity' => Str::headline($issue->severity),
            'businessImpact' => $this->impact($issue->issue_type), 'owner' => $issue->assignee?->name,
            'ownerId' => $issue->assigned_to ? (string) $issue->assigned_to : null, 'reviewer' => $issue->reviewer?->name,
            'sla' => $sla, 'slaDueAt' => $issue->sla_due_at?->toIso8601String(), 'isSlaBreached' => $issue->sla_due_at?->isPast() && ! in_array($issue->status, ['resolved', 'dismissed'], true),
            'status' => Str::headline($issue->status), 'updatedAt' => $issue->updated_at?->toIso8601String(),
            'description' => $issue->description, 'evidence' => $issue->evidence, 'title' => $issue->title,
            'lockVersion' => $issue->lock_version, 'candidateId' => $issue->candidate?->uuid,
        ];
    }

    public function detail(CatalogueQualityIssue $issue): array
    {
        return $this->row($issue) + ['notes' => $issue->notes()->with('user:id,name')->latest()->get()->map(fn ($note) => ['id' => $note->id, 'note' => $note->note, 'user' => $note->user?->name ?: 'System', 'createdAt' => $note->created_at?->toIso8601String()])];
    }

    public function startValidation(User $actor, string $scope): CatalogueQualityValidationRun
    {
        $existing = CatalogueQualityValidationRun::whereIn('status', ['queued', 'processing'])->first();
        if ($existing) {
            return $existing;
        }
        $run = CatalogueQualityValidationRun::create(['uuid' => (string) Str::uuid(), 'requested_by' => $actor->id, 'scope' => $scope, 'status' => 'queued']);
        activity('catalogue_quality')->causedBy($actor)->performedOn($run)->log('catalogue.quality_validation_requested');
        RunCatalogueQualityValidation::dispatch($run->id);

        return $run;
    }

    public function createCase(array $data, User $actor): CatalogueQualityIssue
    {
        $issue = DB::transaction(function () use ($data, $actor) {
            $issue = CatalogueQualityIssue::create([
                'uuid' => (string) Str::uuid(), 'fingerprint' => hash('sha256', 'manual|'.Str::uuid()),
                'product_id' => $data['product_id'] ?? null, 'source' => 'manual', 'issue_type' => $data['issue_type'],
                'title' => $data['title'], 'description' => $data['description'], 'evidence' => $data['evidence'] ?? null,
                'severity' => $data['severity'], 'status' => 'new', 'assigned_to' => $data['assigned_to'] ?? null,
                'reviewer_id' => $data['reviewer_id'] ?? null, 'sla_due_at' => $data['sla_due_at'] ?? null,
            ]);
            activity('catalogue_quality')->causedBy($actor)->performedOn($issue)->withProperties(['after' => $issue->toArray()])->log('catalogue.quality_case_created');

            return $issue;
        });

        return $issue->load(['product', 'assignee', 'reviewer']);
    }

    public function transition(CatalogueQualityIssue $issue, array $data, User $actor): CatalogueQualityIssue
    {
        return DB::transaction(function () use ($issue, $data, $actor) {
            $locked = CatalogueQualityIssue::whereKey($issue->id)->lockForUpdate()->firstOrFail();
            if (isset($data['lock_version']) && (int) $data['lock_version'] !== $locked->lock_version) {
                throw ValidationException::withMessages(['issue' => 'This quality issue was updated by another administrator. Refresh and retry.']);
            }
            $before = $locked->toArray();
            if (isset($data['status'])) {
                $allowed = ['new' => ['in_review', 'escalated', 'dismissed', 'resolved'], 'in_review' => ['waiting_owner', 'in_progress', 'escalated', 'resolved', 'dismissed'], 'waiting_owner' => ['in_review', 'in_progress', 'resolved'], 'in_progress' => ['in_review', 'escalated', 'resolved'], 'escalated' => ['in_review', 'resolved'], 'resolved' => ['reopened'], 'reopened' => ['in_review', 'resolved']];
                abort_unless(in_array($data['status'], $allowed[$locked->status] ?? [], true), 409, 'Invalid quality issue transition.');
                $locked->status = $data['status'];
                if ($data['status'] === 'resolved') {
                    $locked->resolved_at = now();
                    $locked->resolved_by = $actor->id;
                    $locked->resolution_reason = $data['reason'] ?? 'Resolved by administrator.';
                } elseif ($data['status'] === 'reopened') {
                    $locked->resolved_at = null;
                    $locked->resolved_by = null;
                    $locked->resolution_reason = $data['reason'] ?? null;
                }
            }
            foreach (['severity', 'assigned_to', 'reviewer_id', 'sla_due_at'] as $field) {
                if (array_key_exists($field, $data)) {
                    $locked->{$field} = $data[$field];
                }
            }
            $locked->lock_version++;
            $locked->save();
            activity('catalogue_quality')->causedBy($actor)->performedOn($locked)->withProperties(['before' => $before, 'after' => $locked->fresh()->toArray(), 'reason' => $data['reason'] ?? null])->log('catalogue.quality_issue_updated');

            return $locked->load(['product', 'assignee', 'reviewer']);
        });
    }

    public function bulk(array $ids, string $action, array $data, User $actor): int
    {
        return DB::transaction(function () use ($ids, $action, $data, $actor) {
            $issues = CatalogueQualityIssue::whereIn('uuid', $ids)->lockForUpdate()->get();
            abort_unless($issues->count() === count(array_unique($ids)), 422, 'One or more selected quality issues no longer exist.');
            foreach ($issues as $issue) {
                $payload = match ($action) {
                    'resolve' => ['status' => 'resolved', 'reason' => $data['reason'] ?? 'Bulk resolution.'],
                    'escalate' => ['status' => 'escalated', 'reason' => $data['reason'] ?? null],
                    'assign' => ['assigned_to' => $data['assigned_to']],
                    'severity' => ['severity' => $data['severity']],
                    'status' => ['status' => $data['status'], 'reason' => $data['reason'] ?? null],
                    'request_remediation' => ['status' => 'waiting_owner', 'reason' => $data['reason'] ?? null],
                    'archive' => ['status' => 'dismissed', 'reason' => $data['reason'] ?? 'Archived after resolution.'],
                    default => throw ValidationException::withMessages(['action' => 'Unsupported bulk quality action.']),
                };
                $this->transition($issue, $payload, $actor);
            }
            activity('catalogue_quality')->causedBy($actor)->withProperties(['ids' => $ids, 'action' => $action])->log('catalogue.quality_bulk_action');

            return $issues->count();
        });
    }

    public function addNote(CatalogueQualityIssue $issue, string $note, User $actor): void
    {
        $issue->notes()->create(['user_id' => $actor->id, 'note' => $note]);
        activity('catalogue_quality')->causedBy($actor)->performedOn($issue)->log('catalogue.quality_note_added');
    }

    public function resolveCandidate(CatalogueDuplicateCandidate $candidate, string $action, ?int $survivorId, ?string $reason, User $actor): CatalogueDuplicateCandidate
    {
        return DB::transaction(function () use ($candidate, $action, $survivorId, $reason, $actor) {
            $locked = CatalogueDuplicateCandidate::whereKey($candidate->id)->lockForUpdate()->firstOrFail();
            abort_unless($locked->status === 'open', 409, 'This duplicate candidate is already resolved.');
            if ($action === 'merge') {
                abort_unless(in_array($survivorId, [$locked->product_a_id, $locked->product_b_id], true), 422, 'Surviving product must belong to this candidate.');
                $sourceId = $survivorId === $locked->product_a_id ? $locked->product_b_id : $locked->product_a_id;
                $products = Product::withTrashed()->whereIn('id', [$survivorId, $sourceId])->lockForUpdate()->get()->keyBy('id');
                abort_unless($products->count() === 2 && ! $products[$survivorId]->trashed() && ! $products[$sourceId]->trashed(), 409, 'Both products must be active before merge.');
                foreach (['product_images', 'uploads', 'product_variants', 'product_attribute_values'] as $table) {
                    if (Schema::hasTable($table) && Schema::hasColumn($table, 'product_id')) {
                        DB::table($table)->where('product_id', $sourceId)->update(['product_id' => $survivorId]);
                    }
                }
                Product::whereKey($sourceId)->delete();
                $locked->status = 'merged';
                $locked->surviving_product_id = $survivorId;
            } else {
                abort_unless(in_array($action, ['ignored', 'not_duplicate'], true), 422, 'Unsupported duplicate resolution.');
                $locked->status = $action;
            }
            $locked->resolved_by = $actor->id;
            $locked->resolved_at = now();
            $locked->resolution_reason = $reason;
            $locked->lock_version++;
            $locked->save();
            $locked->issues()->whereNotIn('status', ['resolved', 'dismissed'])->update(['status' => 'resolved', 'resolved_at' => now(), 'resolved_by' => $actor->id, 'resolution_reason' => 'Duplicate candidate '.$action, 'updated_at' => now()]);
            activity('catalogue_quality')->causedBy($actor)->performedOn($locked)->withProperties(['action' => $action, 'surviving_product_id' => $survivorId, 'reason' => $reason])->log('catalogue.duplicate_resolved');

            return $locked->fresh(['productA', 'productB']);
        });
    }

    public function saveView(array $data, User $actor): AdminCatalogueQualitySavedView
    {
        return AdminCatalogueQualitySavedView::updateOrCreate(['user_id' => $actor->id, 'name' => $data['name']], ['uuid' => (string) Str::uuid(), 'filters' => $data['filters']]);
    }

    public function filtered(array $filters): Builder
    {
        $query = CatalogueQualityIssue::query()->with(['product.category:id,name,parent_id', 'product.supplier:id,company_name', 'assignee:id,name', 'reviewer:id,name', 'candidate.productA:id,name,sku', 'candidate.productB:id,name,sku']);
        $scope = $filters['scope'] ?? 'all';
        if ($scope === 'duplicates') {
            $query->where('issue_type', 'duplicate_candidate');
        } elseif ($scope === 'incomplete') {
            $query->whereIn('issue_type', ['incomplete_record', 'missing_mandatory_media']);
        } elseif ($scope === 'validation') {
            $query->where('issue_type', 'validation_failure');
        } elseif ($scope === 'publication') {
            $query->where('issue_type', 'publication_blocker');
        } elseif ($scope === 'cases') {
            $query->where('source', 'manual');
        } elseif ($scope === 'audit') {
            $query->whereRaw('1 = 0');
        }
        $query->when($filters['search'] ?? null, fn ($q, $value) => $q->where(fn ($inner) => $inner->where('title', 'like', "%$value%")->orWhere('description', 'like', "%$value%")->orWhere('uuid', 'like', "%$value%")->orWhereHas('product', fn ($product) => $product->where('name', 'like', "%$value%")->orWhere('sku', 'like', "%$value%"))));
        $query->when($filters['issueType'] ?? null, fn ($q, $value) => $q->where('issue_type', $value))->when($filters['severity'] ?? null, fn ($q, $value) => $q->where('severity', $value))->when($filters['status'] ?? null, fn ($q, $value) => $value === 'open' ? $q->whereNotIn('status', ['resolved', 'dismissed']) : $q->where('status', $value))->when($filters['categoryId'] ?? null, fn ($q, $value) => $q->whereHas('product', fn ($product) => $product->where('category_id', $value)))->when($filters['reviewerId'] ?? null, fn ($q, $value) => $q->where('reviewer_id', $value))->when($filters['ownerId'] ?? null, fn ($q, $value) => $q->where('assigned_to', $value));
        if (($filters['slaStatus'] ?? null) === 'breached') {
            $query->whereNotNull('sla_due_at')->where('sla_due_at', '<', now())->whereNotIn('status', ['resolved', 'dismissed']);
        }
        if (($filters['assignedToMe'] ?? false)) {
            $query->where('assigned_to', auth()->id());
        }
        if (($filters['unassigned'] ?? false)) {
            $query->whereNull('assigned_to');
        }
        $query->when($filters['dateFrom'] ?? null, fn ($q, $value) => $q->whereDate('updated_at', '>=', $value))->when($filters['dateTo'] ?? null, fn ($q, $value) => $q->whereDate('updated_at', '<=', $value));

        return $query;
    }

    private function sort(Builder $query, string $sort, string $direction): void
    {
        $column = ['caseId' => 'id', 'issueType' => 'issue_type', 'severity' => 'severity', 'status' => 'status', 'updatedAt' => 'updated_at', 'sla' => 'sla_due_at'][$sort] ?? 'updated_at';
        $query->orderBy($column, $direction === 'asc' ? 'asc' : 'desc')->orderByDesc('id');
    }

    private function counts(): array
    {
        $open = CatalogueQualityIssue::whereNotIn('status', ['resolved', 'dismissed']);

        return ['open' => (clone $open)->count(), 'critical' => (clone $open)->where('severity', 'critical')->count(), 'duplicates' => CatalogueDuplicateCandidate::where('status', 'open')->count(), 'duplicateSku' => 0, 'duplicateBarcode' => CatalogueDuplicateCandidate::where('status', 'open')->where('signal', 'variant_barcode')->count(), 'incomplete' => (clone $open)->where('issue_type', 'incomplete_record')->count(), 'media' => (clone $open)->where('issue_type', 'missing_mandatory_media')->count(), 'classification' => (clone $open)->where('rule_key', 'required_category')->count(), 'blockers' => (clone $open)->where('issue_type', 'publication_blocker')->count(), 'resolvedMonth' => CatalogueQualityIssue::where('status', 'resolved')->where('resolved_at', '>=', now()->startOfMonth())->count(), 'slaBreaches' => (clone $open)->whereNotNull('sla_due_at')->where('sla_due_at', '<', now())->count()];
    }

    private function kpis(array $c, ?int $overall): array
    {
        $items = [['Overall Quality Score', $overall, 'overview'], ['Open Quality Issues', $c['open'], 'open'], ['Critical Issues', $c['critical'], 'critical'], ['Duplicate Product Candidates', $c['duplicates'], 'duplicates'], ['Duplicate SKU Conflicts', $c['duplicateSku'], 'duplicates'], ['Duplicate Barcode Conflicts', $c['duplicateBarcode'], 'duplicates'], ['Incomplete Product Records', $c['incomplete'], 'incomplete'], ['Missing Mandatory Media', $c['media'], 'media'], ['Classification Conflicts', $c['classification'], 'validation'], ['Publication Blockers', $c['blockers'], 'publication'], ['Resolved This Month', $c['resolvedMonth'], 'resolved'], ['Resolution SLA Breaches', $c['slaBreaches'], 'sla']];

        return collect($items)->map(fn ($item, $index) => ['id' => 'kpi-'.($index + 1), 'label' => $item[0], 'value' => $item[1], 'trend' => null, 'available' => $item[1] !== null, 'scope' => $item[2]])->all();
    }

    private function tabs(): array
    {
        return [['label' => 'Overview', 'scope' => 'all', 'count' => CatalogueQualityIssue::count()], ['label' => 'Duplicate Products', 'scope' => 'duplicates', 'count' => CatalogueQualityIssue::where('issue_type', 'duplicate_candidate')->count()], ['label' => 'Incomplete Records', 'scope' => 'incomplete', 'count' => CatalogueQualityIssue::whereIn('issue_type', ['incomplete_record', 'missing_mandatory_media'])->count()], ['label' => 'Validation Failures', 'scope' => 'validation', 'count' => CatalogueQualityIssue::where('issue_type', 'validation_failure')->count()], ['label' => 'Publication Blockers', 'scope' => 'publication', 'count' => CatalogueQualityIssue::where('issue_type', 'publication_blocker')->count()], ['label' => 'Quality Cases', 'scope' => 'cases', 'count' => CatalogueQualityIssue::where('source', 'manual')->count()], ['label' => 'Audit Trail', 'scope' => 'audit', 'count' => DB::table('activity_log')->where('log_name', 'catalogue_quality')->count()]];
    }

    private function trend(string $granularity): array
    {
        $granularity = in_array($granularity, ['daily', 'weekly', 'monthly'], true) ? $granularity : 'daily';
        $sqlite = DB::getDriverName() === 'sqlite';
        $format = $granularity === 'monthly' ? '%Y-%m' : ($granularity === 'weekly' ? '%Y-W%W' : '%Y-%m-%d');
        $period = $sqlite ? "strftime('$format',created_at)" : "to_char(created_at,'".($granularity === 'monthly' ? 'YYYY-MM' : ($granularity === 'weekly' ? 'IYYY-IW' : 'YYYY-MM-DD'))."')";
        $created = CatalogueQualityIssue::where('created_at', '>=', now()->subDays(90))->selectRaw("$period period,sum(case when status not in ('resolved','dismissed') then 1 else 0 end) open_count,sum(case when severity='critical' then 1 else 0 end) critical,sum(case when sla_due_at is not null and sla_due_at < current_timestamp and status not in ('resolved','dismissed') then 1 else 0 end) breached")->groupBy('period')->get()->keyBy('period');
        $resolved = CatalogueQualityIssue::whereNotNull('resolved_at')->where('resolved_at', '>=', now()->subDays(90))->selectRaw(($sqlite ? "strftime('$format',resolved_at)" : str_replace('created_at', 'resolved_at', $period)).' period,count(*) count')->groupBy('period')->pluck('count', 'period');
        $points = $created->map(fn ($row, $key) => ['date' => $key, 'openIssues' => (int) $row->open_count, 'resolvedIssues' => (int) ($resolved[$key] ?? 0), 'criticalIssues' => (int) $row->critical, 'slaBreaches' => (int) $row->breached])->values();

        return ['granularity' => $granularity, 'points' => $points];
    }

    private function distribution(Builder $query): array
    {
        $rows = (clone $query)->reorder()->selectRaw('issue_type,count(*) aggregate')->groupBy('issue_type')->get();
        $total = max(1, (int) $rows->sum('aggregate'));
        $colors = ['#0284c7', '#059669', '#d97706', '#dc2626', '#8b5cf6', '#06b6d4', '#64748b'];

        return $rows->values()->map(fn ($row, $index) => ['name' => Str::headline($row->issue_type), 'value' => (int) $row->aggregate, 'percentage' => round(100 * $row->aggregate / $total, 1), 'color' => $colors[$index % count($colors)]])->all();
    }

    private function statusSummary(Builder $query): array
    {
        $rows = (clone $query)->reorder()->selectRaw('status,count(*) aggregate')->groupBy('status')->get();
        $total = max(1, (int) $rows->sum('aggregate'));
        $colors = ['#3b82f6', '#d97706', '#8b5cf6', '#059669', '#dc2626'];

        return $rows->values()->map(fn ($row, $index) => ['status' => Str::headline($row->status), 'count' => (int) $row->aggregate, 'pct' => round(100 * $row->aggregate / $total, 1), 'color' => $colors[$index % count($colors)]])->all();
    }

    private function scorecard(): array
    {
        $total = Product::count();
        if (! $total) {
            return collect(['Identity Completeness', 'Classification Quality', 'Product Attribute Quality', 'Media Readiness', 'Inventory Linkage', 'Publication Readiness', 'Compliance Readiness', 'Duplicate Control'])->map(fn ($label) => ['label' => $label, 'percentage' => null])->all();
        }
        $pct = fn (int $count) => (int) round(100 * $count / $total);
        $attributeProducts = Schema::hasTable('product_attribute_values') ? DB::table('product_attribute_values')->distinct()->count('product_id') : 0;
        $duplicateProducts = DB::table('catalogue_duplicate_candidates')->where('status', 'open')->selectRaw('product_a_id id')->union(DB::table('catalogue_duplicate_candidates')->where('status', 'open')->selectRaw('product_b_id id'))->get()->count();

        return [['label' => 'Identity Completeness', 'percentage' => $pct(Product::whereNotNull('name')->whereNotNull('sku')->count())], ['label' => 'Classification Quality', 'percentage' => $pct(Product::whereNotNull('category_id')->count())], ['label' => 'Product Attribute Quality', 'percentage' => $pct($attributeProducts)], ['label' => 'Media Readiness', 'percentage' => $pct(Product::where(fn ($q) => $q->whereNotNull('featured_image')->orHas('images'))->count())], ['label' => 'Inventory Linkage', 'percentage' => null], ['label' => 'Publication Readiness', 'percentage' => $pct(Product::whereNotNull('published_at')->count())], ['label' => 'Compliance Readiness', 'percentage' => $pct(Product::whereHas('beautyProfile', fn ($q) => $q->where('compliance_status', 'compliant'))->count())], ['label' => 'Duplicate Control', 'percentage' => max(0, $pct(max(0, $total - $duplicateProducts)))]];
    }

    private function lower(): array
    {
        $open = CatalogueQualityIssue::whereNotIn('status', ['resolved', 'dismissed']);
        $totalIncomplete = max(1, (clone $open)->whereIn('issue_type', ['incomplete_record', 'missing_mandatory_media'])->count());
        $incomplete = (clone $open)->whereIn('issue_type', ['incomplete_record', 'missing_mandatory_media'])->selectRaw('rule_key reason,count(*) aggregate')->groupBy('rule_key')->get()->map(fn ($row) => ['id' => $row->reason, 'reason' => Str::headline($row->reason), 'recordsCount' => (int) $row->aggregate, 'percentage' => round(100 * $row->aggregate / $totalIncomplete, 1)]);
        $failures = (clone $open)->where('issue_type', 'validation_failure')->selectRaw('rule_key failedRule,count(*) aggregate')->groupBy('rule_key')->get()->map(fn ($row) => ['id' => $row->failedRule, 'failedRule' => Str::headline($row->failedRule), 'failuresCount' => (int) $row->aggregate, 'percentage' => null]);
        $duplicates = CatalogueDuplicateCandidate::with(['productA.category:id,name', 'productB.category:id,name'])->where('status', 'open')->orderByDesc('confidence_score')->limit(10)->get()->map(fn ($candidate) => ['id' => $candidate->uuid, 'pairName' => $candidate->productA?->name.' vs '.$candidate->productB?->name, 'recordA' => $candidate->productA?->name, 'recordB' => $candidate->productB?->name, 'productAId' => (string) $candidate->product_a_id, 'productBId' => (string) $candidate->product_b_id, 'skuA' => $candidate->productA?->sku, 'skuB' => $candidate->productB?->sku, 'brand' => null, 'category' => $candidate->productA?->category?->name, 'confidenceScore' => $candidate->confidence_score, 'suggestedAction' => $candidate->confidence_score === 100 ? 'Merge' : 'Review', 'signal' => Str::headline($candidate->signal)]);
        $activities = DB::table('activity_log')->leftJoin('users', 'activity_log.causer_id', '=', 'users.id')->where('activity_log.log_name', 'catalogue_quality')->latest('activity_log.id')->limit(10)->get(['activity_log.id', 'activity_log.description', 'activity_log.event', 'activity_log.created_at', 'users.name'])->map(fn ($row) => ['id' => (string) $row->id, 'activity' => Str::headline(str_replace('catalogue.', '', $row->description)), 'user' => $row->name ?: 'System', 'action' => $row->event ?: $row->description, 'dateTime' => (string) $row->created_at, 'result' => 'Recorded']);

        return ['duplicates' => $duplicates, 'incompleteRecords' => $incomplete, 'validationFailures' => $failures, 'publicationReadiness' => [['id' => 'catalogue', 'channel' => 'Catalogue', 'eligible' => Product::whereNotNull('published_at')->count(), 'blocked' => (clone $open)->where('issue_type', 'publication_blocker')->count(), 'missingMedia' => (clone $open)->where('issue_type', 'missing_mandatory_media')->count(), 'policyIssues' => (clone $open)->where('rule_key', 'compliance_status')->count()]], 'resolutionPerformance' => ['avgMergeReviewTime' => null, 'autoMergeApproved' => 0, 'manualMerges' => CatalogueDuplicateCandidate::where('status', 'merged')->count(), 'rejectedMerges' => CatalogueDuplicateCandidate::whereIn('status', ['ignored', 'not_duplicate'])->count(), 'reopenedCases' => CatalogueQualityIssue::where('status', 'reopened')->count(), 'rollbackRate' => null], 'governance' => ['totalActiveRules' => 7, 'scheduledValidations' => 0, 'pendingApprovals' => CatalogueQualityIssue::whereIn('status', ['new', 'in_review'])->count(), 'openQualityCases' => CatalogueQualityIssue::where('source', 'manual')->whereNotIn('status', ['resolved', 'dismissed'])->count(), 'auditPassRate' => null, 'latestRunResult' => CatalogueQualityValidationRun::where('status', 'completed')->latest('completed_at')->value('products_scanned')], 'activities' => $activities];
    }

    private function health(?int $overall): array
    {
        return ['score' => $overall, 'status' => $overall === null ? 'No data' : ($overall >= 90 ? 'Healthy' : ($overall >= 70 ? 'Needs Attention' : 'Critical')), 'metrics' => $this->scorecard()];
    }

    private function alerts(): array
    {
        return CatalogueQualityIssue::whereNotIn('status', ['resolved', 'dismissed'])->whereIn('severity', ['critical', 'high'])->selectRaw('issue_type,severity,count(*) aggregate')->groupBy('issue_type', 'severity')->orderByDesc('aggregate')->limit(6)->get()->map(fn ($row) => ['id' => $row->issue_type.'-'.$row->severity, 'text' => Str::headline($row->issue_type), 'count' => (int) $row->aggregate, 'severity' => Str::headline($row->severity), 'scope' => $row->issue_type])->all();
    }

    private function quickQueues(): array
    {
        return [['label' => 'Unassigned', 'count' => CatalogueQualityIssue::whereNull('assigned_to')->whereNotIn('status', ['resolved', 'dismissed'])->count(), 'scope' => 'unassigned'], ['label' => 'SLA Breaches', 'count' => CatalogueQualityIssue::whereNotNull('sla_due_at')->where('sla_due_at', '<', now())->whereNotIn('status', ['resolved', 'dismissed'])->count(), 'scope' => 'sla'], ['label' => 'Duplicate Review', 'count' => CatalogueDuplicateCandidate::where('status', 'open')->count(), 'scope' => 'duplicates']];
    }

    private function groupSummary(string $field): array
    {
        return CatalogueQualityIssue::selectRaw("$field label,count(*) aggregate")->groupBy($field)->get()->map(fn ($row) => ['label' => Str::headline($row->label), 'count' => (int) $row->aggregate])->all();
    }

    private function resolutionSummary(): array
    {
        return [['label' => 'Open', 'count' => CatalogueQualityIssue::whereNotIn('status', ['resolved', 'dismissed'])->count()], ['label' => 'Resolved', 'count' => CatalogueQualityIssue::where('status', 'resolved')->count()], ['label' => 'Dismissed', 'count' => CatalogueQualityIssue::where('status', 'dismissed')->count()]];
    }

    private function slaSummary(): array
    {
        return [['label' => 'No SLA', 'count' => CatalogueQualityIssue::whereNull('sla_due_at')->count()], ['label' => 'Within SLA', 'count' => CatalogueQualityIssue::whereNotNull('sla_due_at')->where('sla_due_at', '>=', now())->whereNotIn('status', ['resolved', 'dismissed'])->count()], ['label' => 'Breached', 'count' => CatalogueQualityIssue::whereNotNull('sla_due_at')->where('sla_due_at', '<', now())->whereNotIn('status', ['resolved', 'dismissed'])->count()]];
    }

    private function options(): array
    {
        return ['categories' => DB::table('categories')->orderBy('name')->get(['id', 'name']), 'users' => User::where('status', 'active')->orderBy('name')->get(['id', 'name']), 'issueTypes' => CatalogueQualityIssue::distinct()->orderBy('issue_type')->pluck('issue_type'), 'statuses' => CatalogueQualityIssue::distinct()->orderBy('status')->pluck('status'), 'severities' => ['critical', 'high', 'medium', 'low'], 'brands' => [], 'channels' => []];
    }

    private function activeValidation(): ?array
    {
        $run = CatalogueQualityValidationRun::whereIn('status', ['queued', 'processing'])->latest()->first();

        return $run ? ['id' => $run->uuid, 'status' => $run->status, 'progress' => $run->progress, 'productsScanned' => $run->products_scanned] : null;
    }

    private function averageAvailable(array $scorecard): ?int
    {
        $values = collect($scorecard)->pluck('percentage')->filter(fn ($value) => $value !== null);

        return $values->isEmpty() ? null : (int) round($values->average());
    }

    private function impact(string $type): string
    {
        return match ($type) {
            'duplicate_candidate' => 'Customer confusion', 'publication_blocker' => 'Not publishable', 'validation_failure' => 'Compliance risk', 'missing_mandatory_media' => 'Poor conversion', default => 'Catalogue quality'
        };
    }
}
