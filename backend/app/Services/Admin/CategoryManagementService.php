<?php

namespace App\Services\Admin;

use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class CategoryManagementService
{
    private array $categoryNames = [];

    public function dashboard(array $filters, array $capabilities): array
    {
        $all = Category::query()->withCount([
            'children',
            'products',
            'products as active_products_count' => fn (Builder $q) => $q->where('status', 'active'),
            'categoryAttributes as required_attributes_count' => fn (Builder $q) => $q->where('status', 'active')->where('is_required', true),
        ])->orderBy('sort_order')->orderBy('name')->get();
        $this->categoryNames = $all->pluck('name', 'id')->all();
        $paths = $this->paths($all);
        $duplicates = $all->groupBy(fn (Category $c) => ($c->parent_id ?? 'root').'|'.Str::lower(trim($c->name)))->filter(fn (Collection $g) => $g->count() > 1);
        $duplicateIds = $duplicates->flatten()->pluck('id')->all();
        $coverage = $this->attributeCoverage();
        $query = Category::query()->withCount([
            'children',
            'products as active_products_count' => fn (Builder $q) => $q->where('status', 'active'),
            'categoryAttributes as required_attributes_count' => fn (Builder $q) => $q->where('status', 'active')->where('is_required', true),
        ]);
        if ($search = ($filters['search'] ?? null)) {
            $query->where(fn (Builder $q) => $q->where('name', 'like', "%{$search}%")->orWhere('slug', 'like', "%{$search}%"));
        }
        if (isset($filters['parentId'])) {
            $query->where('parent_id', $filters['parentId'] === 'root' ? null : $filters['parentId']);
        }
        if ($status = ($filters['status'] ?? null)) {
            $query->where('status', $status);
        }
        if (($filters['requiredAttributes'] ?? null) === 'with') {
            $query->whereHas('categoryAttributes', fn (Builder $q) => $q->where('status', 'active')->where('is_required', true));
        }
        if (($filters['requiredAttributes'] ?? null) === 'without') {
            $query->whereDoesntHave('categoryAttributes', fn (Builder $q) => $q->where('status', 'active')->where('is_required', true));
        }
        if (($filters['scope'] ?? null) === 'duplicates') {
            $query->whereIn('id', $duplicateIds ?: [-1]);
        }
        if (($filters['scope'] ?? null) === 'empty') {
            $query->whereDoesntHave('products');
        }
        $rows = $query->orderBy('sort_order')->orderBy('name')->get()->filter(fn (Category $c) => ! isset($filters['level']) || ($paths[$c->id]['level'] ?? 1) === (int) $filters['level']);
        $total = $rows->count();
        $pageSize = (int) ($filters['pageSize'] ?? 25);
        $page = (int) ($filters['page'] ?? 1);
        $items = $rows->forPage($page, $pageSize)->values()->map(fn (Category $c) => $this->row($c, $paths, $coverage))->all();
        $uncategorized = DB::table('products')->whereNull('deleted_at')->whereNull('category_id')->count();
        $active = $all->where('status', 'active')->count();
        $empty = $all->where('products_count', 0)->count();
        $hierarchyIntegrity = $all->count() ? (int) round(100 * ($all->count() - $all->filter(fn (Category $c) => $c->parent_id && ! $all->firstWhere('id', $c->parent_id))->count()) / $all->count()) : 100;
        $productCoverage = collect($paths)->groupBy('level', true)->map(function (Collection $nodes, $level) use ($all) {
            $ids = $nodes->keys();
            $count = $ids->count();
            $products = (int) $all->whereIn('id', $ids)->sum('active_products_count');

            return ['level' => (int) $level, 'categoriesCount' => $count, 'activeProductsCount' => $products, 'avgPerCategory' => $count ? round($products / $count, 1) : 0];
        })->values()->all();
        $duplicatePairs = [];
        foreach ($duplicates as $group) {
            $first = $group->first();
            foreach ($group->slice(1) as $other) {
                $duplicatePairs[] = ['id' => $first->id.'-'.$other->id, 'categoryA' => $first->name, 'categoryB' => $other->name, 'similarityPercent' => 100, 'risk' => 'High', 'productsCount' => (int) $first->active_products_count + (int) $other->active_products_count, 'sourceId' => (string) $first->id, 'targetId' => (string) $other->id];
            }
        }
        $activities = [];
        if (Schema::hasTable('activity_log')) {
            $activities = DB::table('activity_log')->where('log_name', 'categories')->latest('id')->limit(8)->get()->map(fn ($a) => ['id' => (string) $a->id, 'action' => $a->description, 'categoryName' => $a->subject_id ? ($this->categoryNames[$a->subject_id] ?? 'Deleted category') : 'Category mapping', 'user' => $a->causer_id ? 'Admin #'.$a->causer_id : 'System', 'dateTime' => (string) $a->created_at])->all();
        }

        return [
            'kpis' => [
                ['id' => 'total', 'label' => 'Total Categories', 'value' => $all->count(), 'filterKey' => 'all'], ['id' => 'active', 'label' => 'Active Categories', 'value' => $active, 'filterKey' => 'active'],
                ['id' => 'departments', 'label' => 'Departments', 'value' => 'N/A', 'filterKey' => 'unsupported'], ['id' => 'subcategories', 'label' => 'Subcategories', 'value' => $all->whereNotNull('parent_id')->count(), 'filterKey' => 'all'],
                ['id' => 'empty', 'label' => 'Empty Categories', 'value' => $empty, 'filterKey' => 'empty'], ['id' => 'uncategorized', 'label' => 'Uncategorized Products', 'value' => $uncategorized, 'filterKey' => 'uncategorized'],
                ['id' => 'review', 'label' => 'Review Required', 'value' => 'N/A', 'filterKey' => 'unsupported'], ['id' => 'missing', 'label' => 'Missing Attributes', 'value' => 'N/A', 'filterKey' => 'unsupported'],
                ['id' => 'duplicates', 'label' => 'Duplicate Risks', 'value' => $duplicates->sum(fn (Collection $g) => $g->count()), 'filterKey' => 'duplicates'], ['id' => 'channels', 'label' => 'Channel Conflicts', 'value' => 'N/A', 'filterKey' => 'unsupported'],
                ['id' => 'compliance', 'label' => 'Compliance Gaps', 'value' => 'N/A', 'filterKey' => 'unsupported'], ['id' => 'archived', 'label' => 'Archived', 'value' => 'N/A', 'filterKey' => 'unsupported'],
            ],
            'tabs' => [['id' => 'all', 'label' => 'All Categories', 'count' => $all->count()], ['id' => 'active', 'label' => 'Active', 'count' => $active], ['id' => 'inactive', 'label' => 'Inactive', 'count' => $all->count() - $active], ['id' => 'draft', 'label' => 'Draft', 'count' => null], ['id' => 'review', 'label' => 'Review Required', 'count' => null], ['id' => 'duplicates', 'label' => 'Duplicates', 'count' => $duplicates->sum(fn (Collection $g) => $g->count())], ['id' => 'uncategorized', 'label' => 'Uncategorized', 'count' => $uncategorized], ['id' => 'archived', 'label' => 'Archived', 'count' => null]],
            'tree' => $this->tree($all), 'categories' => ['data' => $items, 'currentPage' => $page, 'pageSize' => $pageSize, 'total' => $total, 'lastPage' => max(1, (int) ceil($total / $pageSize))],
            'options' => ['parents' => $all->map(fn (Category $c) => ['id' => (string) $c->id, 'name' => $c->name])->values()],
            'summary' => ['uncategorizedProducts' => $uncategorized, 'duplicateCandidates' => $duplicates->sum(fn (Collection $g) => $g->count()), 'orphanCategories' => $all->filter(fn (Category $c) => $c->parent_id && ! $all->firstWhere('id', $c->parent_id))->count(), 'attributeCoverage' => $coverage ? (int) round(collect($coverage)->avg()) : null],
            'analytics' => ['hierarchyIntegrity' => $hierarchyIntegrity, 'maxDepth' => collect($paths)->max('level') ?? 0, 'leafCategories' => $all->where('children_count', 0)->count(), 'averageProductsPerCategory' => $all->count() ? round($all->sum('active_products_count') / $all->count(), 1) : 0, 'productCoverage' => $productCoverage, 'duplicatePairs' => $duplicatePairs, 'activities' => $activities],
            'capabilities' => $capabilities + ['workflow' => false, 'archive' => false, 'departments' => false, 'channels' => false, 'compliance' => false, 'seo' => false, 'ownership' => false, 'savedViews' => false, 'reason' => 'These fields have no authoritative category schema in this installation.'],
            'lastSyncedAt' => now()->toIso8601String(),
        ];
    }

    public function row(Category $c, array $paths, array $coverage): array
    {
        return ['id' => (string) $c->id, 'categoryName' => $c->name, 'categoryId' => (string) $c->id, 'hierarchyPath' => $paths[$c->id]['path'] ?? $c->name, 'level' => $paths[$c->id]['level'] ?? 1, 'parentCategory' => $c->parent_id ? ($this->categoryNames[$c->parent_id] ?? 'Unavailable') : 'Root', 'parentId' => $c->parent_id ? (string) $c->parent_id : null, 'activeProductsCount' => (int) $c->active_products_count, 'childCategoriesCount' => (int) $c->children_count, 'requiredAttributesCount' => (int) $c->required_attributes_count, 'attributeCoveragePercent' => $coverage[$c->id] ?? null, 'channelEligibilityText' => 'Unavailable', 'seoReadinessPercent' => null, 'complianceStatus' => 'Unavailable', 'status' => $c->status === 'active' ? 'Active' : 'Inactive', 'riskLevel' => 'Unavailable', 'owner' => 'Unavailable', 'updatedDate' => $c->updated_at?->toIso8601String(), 'slug' => $c->slug, 'description' => $c->description ?? ''];
    }

    public function detail(Category $category): array
    {
        $all = Category::query()->orderBy('sort_order')->orderBy('name')->get();
        $this->categoryNames = $all->pluck('name', 'id')->all();
        $paths = $this->paths($all);
        $coverage = $this->attributeCoverage();
        $category->loadCount(['children', 'products as active_products_count' => fn (Builder $q) => $q->where('status', 'active'), 'categoryAttributes as required_attributes_count' => fn (Builder $q) => $q->where('status', 'active')->where('is_required', true)]);

        return $this->row($category, $paths, $coverage);
    }

    public function create(array $data, User $actor): Category
    {
        return DB::transaction(function () use ($data, $actor): Category {
            if (! empty($data['parent_id'])) {
                Category::lockForUpdate()->findOrFail($data['parent_id']);
            }
            $category = Category::create($data);
            activity('categories')->causedBy($actor)->performedOn($category)->withProperties(['category_id' => $category->id])->log('category.created');

            return $category;
        });
    }

    public function update(Category $category, array $data, User $actor): Category
    {
        return DB::transaction(function () use ($category, $data, $actor): Category {
            $locked = Category::lockForUpdate()->findOrFail($category->id);
            if (array_key_exists('parent_id', $data)) {
                if ((int) $data['parent_id'] === $locked->id) {
                    throw ValidationException::withMessages(['parent_id' => 'A category cannot be its own parent.']);
                }
                $cursor = $data['parent_id'];
                while ($cursor) {
                    if ((int) $cursor === $locked->id) {
                        throw ValidationException::withMessages(['parent_id' => 'A category cannot be moved under one of its descendants.']);
                    }
                    $cursor = Category::lockForUpdate()->find($cursor)?->parent_id;
                }
            }
            $before = $locked->only(array_keys($data));
            $locked->update($data);
            activity('categories')->causedBy($actor)->performedOn($locked)->withProperties(['before' => $before, 'after' => $locked->only(array_keys($data))])->log('category.updated');

            return $locked->refresh();
        });
    }

    public function move(Category $category, ?int $parentId, User $actor): void
    {
        DB::transaction(function () use ($category, $parentId, $actor) {
            $locked = Category::lockForUpdate()->findOrFail($category->id);
            if ($parentId === $locked->id) {
                throw ValidationException::withMessages(['parent_id' => 'A category cannot be its own parent.']);
            } $cursor = $parentId;
            while ($cursor) {
                if ($cursor === $locked->id) {
                    throw ValidationException::withMessages(['parent_id' => 'A category cannot be moved under one of its descendants.']);
                } $cursor = Category::lockForUpdate()->find($cursor)?->parent_id;
            } $from = $locked->parent_id;
            $locked->update(['parent_id' => $parentId]);
            activity('categories')->causedBy($actor)->performedOn($locked)->withProperties(['from_parent_id' => $from, 'to_parent_id' => $parentId])->log('category.moved');
        });
    }

    public function merge(Category $source, Category $target, User $actor): array
    {
        if ($source->is($target)) {
            throw ValidationException::withMessages(['target_id' => 'Source and target must differ.']);
        }

        return DB::transaction(function () use ($source, $target, $actor) {
            $s = Category::lockForUpdate()->findOrFail($source->id);
            $t = Category::lockForUpdate()->findOrFail($target->id);
            $cursor = $t;
            while ($cursor) {
                if ($cursor->id === $s->id) {
                    throw ValidationException::withMessages(['target_id' => 'A category cannot be merged into one of its descendants.']);
                }$cursor = $cursor->parent_id ? Category::lockForUpdate()->find($cursor->parent_id) : null;
            }$products = DB::table('products')->where('category_id', $s->id)->update(['category_id' => $t->id, 'updated_at' => now()]);
            DB::table('categories')->where('parent_id', $s->id)->update(['parent_id' => $t->id, 'updated_at' => now()]);
            DB::table('category_attributes')->where('category_id', $s->id)->get()->each(function ($a) use ($t) {
                DB::table('category_attributes')->insertOrIgnore(['uuid' => (string) Str::uuid(), 'category_id' => $t->id, 'product_attribute_id' => $a->product_attribute_id, 'is_required' => $a->is_required, 'is_filterable' => $a->is_filterable, 'sort_order' => $a->sort_order, 'status' => $a->status, 'metadata' => $a->metadata, 'updated_at' => now(), 'created_at' => now()]);
            });
            DB::table('category_attributes')->where('category_id', $s->id)->delete();
            activity('categories')->causedBy($actor)->performedOn($t)->withProperties(['source_category_id' => $s->id, 'products_reassigned' => $products])->log('category.merged');
            $s->delete();

            return ['productsReassigned' => $products];
        });
    }

    private function paths(Collection $all): array
    {
        $by = $all->keyBy('id');
        $out = [];
        foreach ($all as $c) {
            $names = [];
            $seen = [];
            $x = $c;
            while ($x && ! isset($seen[$x->id])) {
                $seen[$x->id] = true;
                array_unshift($names, $x->name);
                $x = $x->parent_id ? $by->get($x->parent_id) : null;
            }$out[$c->id] = ['path' => implode(' > ', $names), 'level' => count($names)];
        }

        return $out;
    }

    private function tree(Collection $all, ?int $parent = null, int $level = 1): array
    {
        return $all->filter(fn (Category $c) => $c->parent_id === $parent)->map(fn (Category $c) => ['id' => (string) $c->id, 'name' => $c->name, 'productCount' => (int) $c->active_products_count, 'level' => $level, 'children' => $this->tree($all, $c->id, $level + 1)])->values()->all();
    }

    private function attributeCoverage(): array
    {
        $required = DB::table('category_attributes')->where('status', 'active')->where('is_required', true)->selectRaw('category_id, count(*) as n')->groupBy('category_id')->pluck('n', 'category_id');
        $products = DB::table('products')->whereNull('deleted_at')->where('status', 'active')->whereNotNull('category_id')->selectRaw('category_id,count(*) as n')->groupBy('category_id')->pluck('n', 'category_id');
        $pairs = DB::table('product_attribute_values as pav')->join('products as p', 'p.id', '=', 'pav.product_id')->join('category_attributes as ca', fn ($j) => $j->on('ca.category_id', '=', 'p.category_id')->on('ca.product_attribute_id', '=', 'pav.product_attribute_id'))->whereNull('p.deleted_at')->where('p.status', 'active')->where('ca.status', 'active')->where('ca.is_required', true)->where('pav.status', 'active')->distinct()->get(['p.category_id', 'pav.product_id', 'pav.product_attribute_id']);
        $filled = $pairs->groupBy('category_id')->map->count();
        $out = [];
        foreach ($required as $id => $r) {
            $den = (int) $r * (int) ($products[$id] ?? 0);
            $out[$id] = $den ? min(100, (int) round(100 * (int) ($filled[$id] ?? 0) / $den)) : null;
        }

        return $out;
    }
}
