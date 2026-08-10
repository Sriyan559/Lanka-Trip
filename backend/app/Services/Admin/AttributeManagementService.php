<?php

namespace App\Services\Admin;

use App\Models\ProductAttribute;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class AttributeManagementService
{
    public function dashboard(array $filters, array $capabilities): array
    {
        $totals = $this->totals();
        $missingByAttribute = $this->missingRequiredByAttribute();
        $duplicateNames = $this->duplicateNameGroups();
        $query = ProductAttribute::query()
            ->with('group:id,name')
            ->withCount([
                'categoryMappings as category_count' => fn (Builder $q) => $q->where('status', 'active'),
                'values as product_usage_count' => fn (Builder $q) => $q->where('status', 'active')->whereNull('product_variant_id')->select(DB::raw('count(distinct product_id)')),
                'values as variant_count' => fn (Builder $q) => $q->where('status', 'active')->whereNotNull('product_variant_id')->select(DB::raw('count(distinct product_variant_id)')),
            ]);

        $this->applyFilters($query, $filters, $missingByAttribute, $duplicateNames);
        $sort = $filters['sort'] ?? 'updatedAt';
        $direction = ($filters['direction'] ?? 'desc') === 'asc' ? 'asc' : 'desc';
        $sortColumns = ['name' => 'name', 'dataType' => 'data_type', 'status' => 'status', 'updatedAt' => 'updated_at'];
        $query->orderBy($sortColumns[$sort] ?? 'updated_at', $direction)->orderBy('id');

        $pageSize = min(100, max(1, (int) ($filters['pageSize'] ?? 25)));
        $page = max(1, (int) ($filters['page'] ?? 1));
        $paginator = $query->paginate($pageSize, ['*'], 'page', $page);
        $totalCategories = DB::table('categories')->where('status', 'active')->count();
        $rows = collect($paginator->items())->map(fn (ProductAttribute $attribute) => $this->row($attribute, $totalCategories, (int) ($missingByAttribute[$attribute->id] ?? 0)))->values()->all();

        $groups = DB::table('attribute_groups as ag')
            ->leftJoin('product_attributes as pa', 'pa.attribute_group_id', '=', 'ag.id')
            ->selectRaw('ag.id, ag.uuid, ag.name, ag.status, count(pa.id) as attribute_count, sum(case when pa.status = ? then 1 else 0 end) as active_count', ['active'])
            ->groupBy('ag.id', 'ag.uuid', 'ag.name', 'ag.status')->orderBy('ag.sort_order')->orderBy('ag.name')->get()
            ->map(fn ($g) => ['id' => (string) $g->id, 'groupName' => $g->name, 'attributeCount' => (int) $g->attribute_count, 'readinessPercent' => $g->attribute_count ? (int) round(100 * $g->active_count / $g->attribute_count) : 0, 'status' => $g->status])->all();

        $statusCounts = DB::table('product_attributes')->selectRaw('status, count(*) as aggregate')->groupBy('status')->pluck('aggregate', 'status');
        $health = $this->health($totals, $missingByAttribute, $duplicateNames);

        return [
            'kpis' => $this->kpis($totals, $missingByAttribute, $duplicateNames),
            'tabs' => $this->tabs($totals, $missingByAttribute, $duplicateNames),
            'attributes' => ['data' => $rows, 'currentPage' => $paginator->currentPage(), 'pageSize' => $paginator->perPage(), 'total' => $paginator->total(), 'lastPage' => max(1, $paginator->lastPage())],
            'groups' => $groups,
            'options' => $this->options(),
            'health' => $health,
            'alerts' => $this->alerts($missingByAttribute, $duplicateNames),
            'statusSummary' => collect($statusCounts)->map(fn ($count, $status) => ['label' => Str::headline((string) $status), 'count' => (int) $count])->values()->all(),
            'variantReadiness' => $this->variantReadiness(),
            'coverageSummary' => $this->coverageSummary(),
            'lower' => $this->lowerDashboards($health, $missingByAttribute, $duplicateNames),
            'capabilities' => $capabilities + [
                'templates' => false, 'variantRules' => false, 'dependencies' => false,
                'channelRequirements' => false, 'validationRecords' => false, 'savedViews' => false,
                'tenantIsolation' => false,
                'unsupportedReason' => 'No authoritative schema is installed for templates, variant rules, dependencies, channel requirements, validation records, saved views, or tenants.',
            ],
            'lastSyncedAt' => now()->toIso8601String(),
            'meta' => ['refreshIntervalSeconds' => 30],
        ];
    }

    public function detail(ProductAttribute $attribute): array
    {
        $attribute->load('group:id,name')->loadCount([
            'categoryMappings as category_count' => fn (Builder $q) => $q->where('status', 'active'),
            'values as product_usage_count' => fn (Builder $q) => $q->where('status', 'active')->whereNull('product_variant_id')->select(DB::raw('count(distinct product_id)')),
            'values as variant_count' => fn (Builder $q) => $q->where('status', 'active')->whereNotNull('product_variant_id')->select(DB::raw('count(distinct product_variant_id)')),
        ]);

        return $this->row($attribute, DB::table('categories')->where('status', 'active')->count(), (int) ($this->missingRequiredByAttribute()[$attribute->id] ?? 0));
    }

    public function create(array $data, User $actor): ProductAttribute
    {
        return DB::transaction(function () use ($data, $actor) {
            $metadata = $this->metadata($data);
            $attribute = ProductAttribute::create([
                ...$this->attributes($data),
                'uuid' => (string) Str::uuid(),
                'slug' => Str::slug($data['name']),
                'metadata' => $metadata ?: null,
            ]);
            $this->syncCategories($attribute, $data['category_ids'] ?? [], (bool) ($data['is_required'] ?? false));
            activity('product_attributes')->causedBy($actor)->performedOn($attribute)->withProperties(['after' => $attribute->toArray()])->log('attribute.created');

            return $attribute;
        });
    }

    public function update(ProductAttribute $attribute, array $data, User $actor): ProductAttribute
    {
        return DB::transaction(function () use ($attribute, $data, $actor) {
            $locked = ProductAttribute::lockForUpdate()->findOrFail($attribute->id);
            $before = $locked->toArray();
            $payload = $this->attributes($data, true);
            if (array_key_exists('name', $data)) $payload['slug'] = Str::slug($data['name']);
            if (array_intersect(array_keys($data), ['input_type', 'definition', 'allowed_values'])) $payload['metadata'] = array_merge($locked->metadata ?? [], $this->metadata($data));
            $locked->update($payload);
            if (array_key_exists('category_ids', $data)) $this->syncCategories($locked, $data['category_ids'], (bool) ($data['is_required'] ?? $locked->is_required));
            activity('product_attributes')->causedBy($actor)->performedOn($locked)->withProperties(['before' => $before, 'after' => $locked->fresh()->toArray()])->log('attribute.updated');

            return $locked->refresh();
        });
    }

    public function updateValues(ProductAttribute $attribute, array $values, User $actor): ProductAttribute
    {
        return DB::transaction(function () use ($attribute, $values, $actor) {
            $locked = ProductAttribute::lockForUpdate()->findOrFail($attribute->id);
            $before = $locked->metadata['allowed_values'] ?? [];
            $metadata = $locked->metadata ?? [];
            $metadata['allowed_values'] = array_values(array_unique(array_map('trim', $values)));
            $locked->update(['metadata' => $metadata]);
            activity('product_attributes')->causedBy($actor)->performedOn($locked)->withProperties(['before' => $before, 'after' => $metadata['allowed_values']])->log('attribute.values_updated');

            return $locked->refresh();
        });
    }

    public function bulk(array $ids, string $action, User $actor): int
    {
        return DB::transaction(function () use ($ids, $action, $actor) {
            $attributes = ProductAttribute::lockForUpdate()->whereIn('id', $ids)->get();
            $status = match ($action) { 'activate' => 'active', 'deactivate' => 'inactive', 'archive' => 'archived', default => throw ValidationException::withMessages(['action' => 'Unsupported bulk action.']) };
            ProductAttribute::whereIn('id', $attributes->pluck('id'))->update(['status' => $status, 'updated_at' => now()]);
            activity('product_attributes')->causedBy($actor)->withProperties(['attribute_ids' => $attributes->pluck('id')->all(), 'action' => $action])->log('attribute.bulk_updated');

            return $attributes->count();
        });
    }

    public function merge(ProductAttribute $source, ProductAttribute $target, User $actor): array
    {
        if ($source->is($target)) throw ValidationException::withMessages(['target_id' => 'Source and target attributes must differ.']);

        return DB::transaction(function () use ($source, $target, $actor) {
            $source = ProductAttribute::lockForUpdate()->findOrFail($source->id);
            $target = ProductAttribute::lockForUpdate()->findOrFail($target->id);
            $mappings = DB::table('category_attributes')->where('product_attribute_id', $source->id)->get();
            foreach ($mappings as $mapping) {
                DB::table('category_attributes')->updateOrInsert(
                    ['category_id' => $mapping->category_id, 'product_attribute_id' => $target->id],
                    ['uuid' => (string) Str::uuid(), 'is_required' => $mapping->is_required, 'is_filterable' => $mapping->is_filterable, 'sort_order' => $mapping->sort_order, 'status' => $mapping->status, 'metadata' => $mapping->metadata, 'created_at' => now(), 'updated_at' => now()]
                );
            }
            DB::table('category_attributes')->where('product_attribute_id', $source->id)->delete();
            $values = DB::table('product_attribute_values')->where('product_attribute_id', $source->id)->update(['product_attribute_id' => $target->id, 'updated_at' => now()]);
            activity('product_attributes')->causedBy($actor)->performedOn($target)->withProperties(['source_attribute_id' => $source->id, 'values_reassigned' => $values])->log('attribute.merged');
            $source->delete();

            return ['valuesReassigned' => $values, 'categoryMappingsReassigned' => $mappings->count()];
        });
    }

    private function applyFilters(Builder $query, array $filters, array $missing, array $duplicates): void
    {
        if ($search = trim((string) ($filters['search'] ?? ''))) $query->where(fn (Builder $q) => $q->where('name', 'like', "%{$search}%")->orWhere('slug', 'like', "%{$search}%")->orWhere('uuid', 'like', "%{$search}%"));
        if (! empty($filters['groupId'])) $query->where('attribute_group_id', $filters['groupId']);
        if (! empty($filters['categoryId'])) $query->whereHas('categoryMappings', fn (Builder $q) => $q->where('category_id', $filters['categoryId'])->where('status', 'active'));
        if (! empty($filters['status'])) $query->where('status', $filters['status']);
        if (! empty($filters['dataType'])) $query->where('data_type', $filters['dataType']);
        if (isset($filters['required'])) $query->where('is_required', filter_var($filters['required'], FILTER_VALIDATE_BOOLEAN));
        if (isset($filters['variantGenerating'])) $query->where('is_variant_defining', filter_var($filters['variantGenerating'], FILTER_VALIDATE_BOOLEAN));
        if (! empty($filters['updatedFrom'])) $query->whereDate('updated_at', '>=', $filters['updatedFrom']);
        $scope = $filters['scope'] ?? 'all';
        if ($scope === 'active') $query->where('status', 'active');
        if ($scope === 'required') $query->where(fn (Builder $q) => $q->where('is_required', true)->orWhereHas('categoryMappings', fn (Builder $m) => $m->where('is_required', true)->where('status', 'active')));
        if ($scope === 'variant') $query->where('is_variant_defining', true);
        if (in_array($scope, ['quality', 'missing'], true)) $query->whereIn('id', array_keys(array_filter($missing)) ?: [-1]);
        if ($scope === 'duplicates') $query->whereIn('id', array_keys($duplicates) ?: [-1]);
        if ($scope === 'invalid') $query->whereRaw('1 = 0');
    }

    private function row(ProductAttribute $a, int $totalCategories, int $missing): array
    {
        $metadata = $a->metadata ?? [];
        $allowed = is_array($metadata['allowed_values'] ?? null) ? array_values($metadata['allowed_values']) : [];
        $coverage = $totalCategories ? (int) round(100 * (int) $a->category_count / $totalCategories) : 0;
        $completenessParts = [$a->name !== '', $a->group !== null, $a->data_type !== '', $a->status !== '', ! $a->is_required || $a->category_count > 0];
        $completeness = (int) round(100 * count(array_filter($completenessParts)) / count($completenessParts));

        return [
            'id' => (string) $a->id, 'attributeName' => $a->name, 'attributeId' => $a->uuid,
            'groupName' => $a->group?->name ?? 'Ungrouped', 'groupId' => $a->attribute_group_id ? (string) $a->attribute_group_id : null,
            'dataType' => Str::headline($a->data_type), 'inputType' => $metadata['input_type'] ?? $this->defaultInput($a->data_type),
            'isRequired' => (bool) $a->is_required, 'isVariantGenerating' => (bool) $a->is_variant_defining,
            'categoryCoveragePercent' => $coverage, 'categoryCount' => (int) $a->category_count,
            'productUsageCount' => (int) $a->product_usage_count, 'allowedValueCount' => count($allowed), 'variantCount' => (int) $a->variant_count,
            'validationRuleId' => null, 'inheritance' => $a->category_count ? 'Category mapping' : 'None',
            'channelEligibilityText' => 'Unavailable', 'eligibleChannelsCount' => null, 'totalChannelsCount' => null,
            'completenessPercent' => $completeness, 'issuesCount' => $missing, 'riskLevel' => $missing > 20 ? 'High' : ($missing > 0 ? 'Medium' : 'Low'),
            'owner' => 'Unavailable', 'updatedAt' => $a->updated_at?->toIso8601String(), 'definition' => $metadata['definition'] ?? null,
            'allowedValues' => $allowed, 'validationLogic' => null, 'dependentAttributes' => [], 'unit' => $a->unit, 'status' => Str::headline($a->status),
        ];
    }

    private function totals(): array
    {
        return [
            'total' => DB::table('product_attributes')->count(), 'active' => DB::table('product_attributes')->where('status', 'active')->count(),
            'groups' => DB::table('attribute_groups')->count(), 'variant' => DB::table('product_attributes')->where('is_variant_defining', true)->count(),
            'required' => DB::table('product_attributes')->where('is_required', true)->count(),
            'products' => DB::table('products')->whereNull('deleted_at')->count(), 'variants' => DB::table('product_variants')->whereNull('deleted_at')->count(),
        ];
    }

    private function missingRequiredByAttribute(): array
    {
        return DB::table('category_attributes as ca')->join('products as p', 'p.category_id', '=', 'ca.category_id')
            ->leftJoin('product_attribute_values as pav', function ($join) { $join->on('pav.product_id', '=', 'p.id')->on('pav.product_attribute_id', '=', 'ca.product_attribute_id')->where('pav.status', 'active'); })
            ->where('ca.status', 'active')->where('ca.is_required', true)->whereNull('p.deleted_at')->whereNull('pav.id')
            ->selectRaw('ca.product_attribute_id, count(distinct p.id) as aggregate')->groupBy('ca.product_attribute_id')->pluck('aggregate', 'product_attribute_id')->map(fn ($v) => (int) $v)->all();
    }

    private function duplicateNameGroups(): array
    {
        $groups = DB::table('product_attributes')->selectRaw('lower(name) as normalized, count(*) as aggregate')->groupByRaw('lower(name)')->havingRaw('count(*) > 1')->pluck('normalized');
        return $groups->isEmpty() ? [] : DB::table('product_attributes')->whereIn(DB::raw('lower(name)'), $groups)->pluck('id')->mapWithKeys(fn ($id) => [$id => true])->all();
    }

    private function kpis(array $t, array $missing, array $duplicates): array
    {
        $missingCount = array_sum($missing);
        $withoutDefault = DB::table('products as p')->leftJoin('product_variants as pv', fn ($j) => $j->on('pv.product_id', '=', 'p.id')->where('pv.is_default', true)->whereNull('pv.deleted_at'))->whereNull('p.deleted_at')->whereNull('pv.id')->count();
        $duplicateSkus = DB::table('product_variants')->whereNull('deleted_at')->whereNotNull('sku')->select('sku')->groupBy('sku')->havingRaw('count(*) > 1')->get()->count();
        $duplicateBarcodes = Schema::hasColumn('product_variants', 'barcode') ? DB::table('product_variants')->whereNull('deleted_at')->whereNotNull('barcode')->select('barcode')->groupBy('barcode')->havingRaw('count(*) > 1')->get()->count() : null;
        $pricingGaps = DB::table('product_variants')->whereNull('deleted_at')->where(fn ($q) => $q->whereNull('price')->orWhere('price', '<=', 0))->count();
        $items = [
            ['kpi-1', 'Total Attributes', $t['total'], 'all'], ['kpi-2', 'Active Attributes', $t['active'], 'active'], ['kpi-3', 'Attribute Groups', $t['groups'], 'all'],
            ['kpi-4', 'Variant Attributes', $t['variant'], 'variant'], ['kpi-5', 'Required Attributes', $t['required'], 'required'], ['kpi-6', 'Missing Attribute Values', $missingCount, 'missing'],
            ['kpi-7', 'Invalid Variant Combos', null, 'invalid'], ['kpi-8', 'Duplicate SKUs', $duplicateSkus, 'all'], ['kpi-9', 'Duplicate Barcodes', $duplicateBarcodes, 'all'],
            ['kpi-10', 'Products w/o Default Variant', $withoutDefault, 'all'], ['kpi-11', 'Variant Media Gaps', null, 'all'], ['kpi-12', 'Variant Pricing Gaps', $pricingGaps, 'all'],
        ];
        return array_map(fn ($x) => ['id' => $x[0], 'label' => $x[1], 'value' => $x[2], 'trend' => null, 'trendUp' => null, 'filterKey' => $x[3], 'available' => $x[2] !== null, 'reason' => $x[2] === null ? 'No authoritative schema is installed for this metric.' : null], $items);
    }

    private function tabs(array $t, array $missing, array $duplicates): array
    {
        return [
            ['id' => 'all', 'label' => 'All Attributes', 'count' => $t['total'], 'scope' => 'all'], ['id' => 'active', 'label' => 'Active', 'count' => $t['active'], 'scope' => 'active'],
            ['id' => 'required', 'label' => 'Required', 'count' => $t['required'], 'scope' => 'required'], ['id' => 'variant', 'label' => 'Variant Attributes', 'count' => $t['variant'], 'scope' => 'variant'],
            ['id' => 'quality', 'label' => 'Data Quality Issues', 'count' => count(array_filter($missing)), 'scope' => 'quality'], ['id' => 'duplicates', 'label' => 'Duplicates', 'count' => count($duplicates), 'scope' => 'duplicates'],
            ['id' => 'invalid', 'label' => 'Invalid Combinations', 'count' => null, 'scope' => 'invalid', 'available' => false],
        ];
    }

    private function options(): array
    {
        return [
            'groups' => DB::table('attribute_groups')->orderBy('sort_order')->get(['id', 'name'])->map(fn ($x) => ['id' => (string) $x->id, 'name' => $x->name])->all(),
            'categories' => DB::table('categories')->where('status', 'active')->orderBy('name')->get(['id', 'name'])->map(fn ($x) => ['id' => (string) $x->id, 'name' => $x->name])->all(),
            'dataTypes' => DB::table('product_attributes')->distinct()->orderBy('data_type')->pluck('data_type')->values()->all(),
            'statuses' => DB::table('product_attributes')->distinct()->orderBy('status')->pluck('status')->values()->all(), 'owners' => [], 'channels' => [],
        ];
    }

    private function health(array $t, array $missing, array $duplicates): array
    {
        $requiredExpected = DB::table('category_attributes as ca')->join('products as p', 'p.category_id', '=', 'ca.category_id')->where('ca.status', 'active')->where('ca.is_required', true)->whereNull('p.deleted_at')->count();
        $completeness = $requiredExpected ? max(0, (int) round(100 * ($requiredExpected - array_sum($missing)) / $requiredExpected)) : 100;
        $activeRate = $t['total'] ? (int) round(100 * $t['active'] / $t['total']) : 100;
        $duplicateControl = $t['total'] ? max(0, (int) round(100 * ($t['total'] - count($duplicates)) / $t['total'])) : 100;
        $dimensions = [['label' => 'Required Value Completeness', 'value' => $completeness], ['label' => 'Active Attribute Rate', 'value' => $activeRate], ['label' => 'Duplicate Control', 'value' => $duplicateControl]];
        return ['score' => (int) round(collect($dimensions)->avg('value')), 'status' => collect($dimensions)->avg('value') >= 85 ? 'Healthy' : 'Needs Attention', 'dimensions' => $dimensions];
    }

    private function alerts(array $missing, array $duplicates): array
    {
        return array_values(array_filter([
            array_sum($missing) ? ['id' => 'missing-values', 'label' => 'Missing required attribute values', 'count' => array_sum($missing), 'severity' => 'High', 'scope' => 'missing'] : null,
            count($duplicates) ? ['id' => 'duplicates', 'label' => 'Duplicate attribute candidates', 'count' => count($duplicates), 'severity' => 'Medium', 'scope' => 'duplicates'] : null,
        ]));
    }

    private function variantReadiness(): array
    {
        $total = DB::table('product_variants')->whereNull('deleted_at')->count();
        $ready = DB::table('product_variants')->whereNull('deleted_at')->whereNotNull('sku')->whereNotNull('price')->where('price', '>', 0)->count();
        return ['ready' => $ready, 'partial' => max(0, $total - $ready), 'blocked' => 0, 'invalid' => null, 'total' => $total, 'available' => true];
    }

    private function coverageSummary(): array
    {
        $products = DB::table('products')->whereNull('deleted_at')->count();
        $withValues = DB::table('product_attribute_values')->where('status', 'active')->distinct('product_id')->count('product_id');
        $variants = DB::table('product_variants')->whereNull('deleted_at')->count();
        $withVariantValues = DB::table('product_attribute_values')->where('status', 'active')->whereNotNull('product_variant_id')->distinct('product_variant_id')->count('product_variant_id');
        return ['productCoveragePercent' => $products ? (int) round(100 * $withValues / $products) : 100, 'variantCoveragePercent' => $variants ? (int) round(100 * $withVariantValues / $variants) : 100, 'categoryCoveragePercent' => null, 'channelCoveragePercent' => null];
    }

    private function lowerDashboards(array $health, array $missing, array $duplicates): array
    {
        $missingRows = DB::table('product_attributes')->whereIn('id', array_keys(array_filter($missing)) ?: [-1])->get(['id', 'name'])->map(fn ($a) => ['id' => (string) $a->id, 'name' => $a->name, 'missing' => $missing[$a->id] ?? 0])->sortByDesc('missing')->take(5)->values()->all();
        $categoryMatrix = DB::table('categories as c')->leftJoin('category_attributes as ca', fn ($j) => $j->on('ca.category_id', '=', 'c.id')->where('ca.status', 'active'))->where('c.status', 'active')->groupBy('c.id', 'c.name')->selectRaw('c.id, c.name, sum(case when ca.is_required then 1 else 0 end) as required_count, sum(case when ca.id is not null and not ca.is_required then 1 else 0 end) as optional_count')->orderBy('c.name')->limit(10)->get()->map(fn ($x) => ['id' => (string) $x->id, 'category' => $x->name, 'required' => (int) $x->required_count, 'optional' => (int) $x->optional_count])->all();
        $duplicateRows = DB::table('product_attributes')->whereIn('id', array_keys($duplicates) ?: [-1])->orderBy('name')->get(['id', 'name', 'uuid'])->groupBy(fn ($x) => Str::lower($x->name))->map(fn ($items) => ['id' => 'duplicate-'.$items->first()->id, 'attributeName' => $items->first()->name, 'attributeIds' => $items->pluck('id')->map(fn ($id) => (string) $id)->all(), 'potentialDuplicatesCount' => $items->count() - 1, 'similarityPercent' => 100])->values()->all();
        $activities = Schema::hasTable('activity_log') ? DB::table('activity_log')->where('log_name', 'product_attributes')->latest('created_at')->limit(10)->get()->map(fn ($a) => ['id' => (string) $a->id, 'activity' => Str::headline($a->description), 'entityType' => 'Attribute', 'entityName' => $a->subject_id ? 'Attribute #'.$a->subject_id : 'Attributes', 'actionBy' => $a->causer_id ? 'Admin #'.$a->causer_id : 'System', 'dateTime' => $a->created_at, 'details' => '', 'result' => 'Success'])->all() : [];
        return ['healthScorecard' => $health['dimensions'], 'missingValues' => $missingRows, 'categoryMatrix' => $categoryMatrix, 'variantRules' => [], 'channelReadiness' => [], 'validationStatus' => [], 'dependencies' => [], 'channelRequirements' => [], 'qualityIssues' => $this->alerts($missing, $duplicates), 'duplicateCandidates' => $duplicateRows, 'activities' => $activities];
    }

    private function attributes(array $data, bool $partial = false): array
    {
        $keys = ['attribute_group_id', 'name', 'data_type', 'unit', 'is_required', 'is_filterable', 'is_variant_defining', 'sort_order', 'status'];
        $defaults = ['is_required' => false, 'is_filterable' => false, 'is_variant_defining' => false, 'sort_order' => 0, 'status' => 'active'];
        return collect($partial ? $data : $data + $defaults)->only($keys)->all();
    }

    private function metadata(array $data): array
    {
        return array_filter(['input_type' => $data['input_type'] ?? null, 'definition' => $data['definition'] ?? null, 'allowed_values' => $data['allowed_values'] ?? null], fn ($v) => $v !== null);
    }

    private function syncCategories(ProductAttribute $attribute, array $ids, bool $required): void
    {
        DB::table('category_attributes')->where('product_attribute_id', $attribute->id)->delete();
        foreach (array_values(array_unique($ids)) as $index => $categoryId) DB::table('category_attributes')->insert(['uuid' => (string) Str::uuid(), 'category_id' => $categoryId, 'product_attribute_id' => $attribute->id, 'is_required' => $required, 'is_filterable' => $attribute->is_filterable, 'sort_order' => ($index + 1) * 10, 'status' => 'active', 'created_at' => now(), 'updated_at' => now()]);
    }

    private function defaultInput(string $dataType): string
    {
        return match ($dataType) { 'boolean' => 'Checkbox', 'number' => 'Number', 'date' => 'Date', default => 'Text' };
    }
}
