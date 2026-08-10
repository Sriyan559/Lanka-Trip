<?php

namespace App\Services\Admin;

use App\Models\Product;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;

class ProductMasterManagementService
{
    public const UNSUPPORTED = [
        'brand' => 'Products have no direct brand relationship.',
        'businessUnit' => 'Business-unit ownership is not modeled.',
        'inventoryLinkage' => 'No product-to-inventory linkage table exists.',
        'batchEligibility' => 'No inventory batch eligibility domain exists.',
        'channelEligibility' => 'No publication-channel eligibility domain exists.',
        'assignedReviewer' => 'Reviewer assignment is not modeled.',
        'riskLevel' => 'No authoritative product risk score exists.',
        'productType' => 'Product type is not modeled separately from category.',
        'brandAuthorization' => 'Seller brand authorization is not linked to products.',
    ];

    public function dashboard(array $filters, int $page, int $pageSize, string $sort, array $permissions): array
    {
        $query = $this->query($filters);
        $this->sort($query, $sort);
        $result = $query->paginate($pageSize, ['*'], 'page', $page);

        return [
            'kpis' => $this->kpis(), 'tabs' => $this->tabs(), 'quickFilters' => $this->quickFilters(),
            'health' => $this->health(), 'filterOptions' => $this->options(),
            'products' => collect($result->items())->map(fn (Product $p) => $this->row($p))->values(),
            'pagination' => ['page' => $result->currentPage(), 'pageSize' => $result->perPage(), 'total' => $result->total(), 'lastPage' => $result->lastPage()],
            'permissions' => $permissions,
            'capabilities' => ['supportedBulkActions' => ['change-status', 'publish', 'archive', 'export-selected'], 'unsupportedFields' => self::UNSUPPORTED, 'liveTransport' => 'polling'],
            'generatedAt' => now()->toIso8601String(),
        ];
    }

    public function query(array $filters): Builder
    {
        $tab = $filters['tab'] ?? 'all';
        $q = Product::query()->when($tab === 'all', fn (Builder $b) => $b->withTrashed())->when($tab === 'archived', fn (Builder $b) => $b->onlyTrashed())
            ->with(['category.parent', 'supplier', 'beautyProfile', 'variants' => fn ($v) => $v->orderByDesc('is_default')->orderBy('id')])->withCount(['variants', 'images']);
        $search = trim((string) ($filters['search'] ?? ''));
        $q->when($search !== '', function (Builder $b) use ($search): void {
            $like = '%'.mb_strtolower($search).'%';
            $b->where(function (Builder $n) use ($like) {
                $n->whereRaw('LOWER(products.name) LIKE ?', [$like])->orWhereRaw('LOWER(COALESCE(products.sku, ?)) LIKE ?', ['', $like])->orWhereHas('variants', fn (Builder $v) => $v->whereRaw('LOWER(COALESCE(sku, ?)) LIKE ?', ['', $like])->orWhereRaw('LOWER(COALESCE(barcode, ?)) LIKE ?', ['', $like]));
            });
        });
        $q->when($tab === 'active', fn ($b) => $b->where('status', 'active'))->when($tab === 'draft', fn ($b) => $b->where('approval_status', 'draft'))
            ->when($tab === 'pending', fn ($b) => $b->whereIn('approval_status', ['pending', 'pending_approval', 'submitted']))->when($tab === 'approved', fn ($b) => $b->where('approval_status', 'approved'))
            ->when($tab === 'published', fn ($b) => $b->whereNotNull('published_at'))->when($tab === 'blocked', fn ($b) => $b->whereIn('approval_status', ['rejected', 'blocked']))
            ->when($tab === 'incomplete', fn ($b) => $b->where(fn ($n) => $n->whereNull('sku')->orWhereNull('category_id')->orWhereNull('description')->orWhereNull('featured_image')));
        $map = ['Active' => 'active', 'Inactive' => 'inactive'];
        if (isset($map[$filters['productStatus'] ?? ''])) {
            $q->where('status', $map[$filters['productStatus']]);
        }
        $approvals = ['Approved' => 'approved', 'Draft' => 'draft', 'Rejected' => 'rejected', 'Pending Approval' => 'pending'];
        if (isset($approvals[$filters['approvalStatus'] ?? ''])) {
            $q->where('approval_status', $approvals[$filters['approvalStatus']]);
        }
        $q->when(($filters['publicationStatus'] ?? 'All') === 'Published', fn ($b) => $b->whereNotNull('published_at'))->when(($filters['publicationStatus'] ?? 'All') === 'Unpublished', fn ($b) => $b->whereNull('published_at'));
        foreach (['category' => 'category_id', 'subcategory' => 'category_id', 'supplier' => 'supplier_id'] as $key => $column) {
            $value = $filters[$key] ?? 'All';
            if ($value !== 'All' && ctype_digit((string) $value)) {
                $q->where($column, (int) $value);
            }
        }
        $q->when(($filters['variantReadiness'] ?? 'All') === 'With Variants', fn ($b) => $b->has('variants'))->when(($filters['variantReadiness'] ?? 'All') === 'Missing Variants', fn ($b) => $b->doesntHave('variants'))
            ->when(($filters['mediaReadiness'] ?? 'All') === 'Ready', fn ($b) => $b->where(fn ($n) => $n->whereNotNull('featured_image')->orHas('images')))->when(($filters['mediaReadiness'] ?? 'All') === 'Missing', fn ($b) => $b->whereNull('featured_image')->doesntHave('images'));
        if (($filters['complianceStatus'] ?? 'All') !== 'All') {
            $status = strtolower(str_replace('-', '_', $filters['complianceStatus']));
            $q->whereHas('beautyProfile', fn ($b) => $b->where('compliance_status', $status));
        }

        return $q->when(! empty($filters['createdDate']), fn ($b) => $b->whereDate('created_at', '>=', $filters['createdDate']))->when(! empty($filters['updatedDate']), fn ($b) => $b->whereDate('updated_at', '>=', $filters['updatedDate']));
    }

    public function row(Product $p): array
    {
        $v = $p->variants->first();
        $fields = [$p->name, $p->sku ?: $v?->sku, $p->description, $p->category_id, $p->supplier_id, $p->featured_image ?: ($p->images_count ? 'image' : null), $p->unit, $p->price];
        $complete = (int) round(collect($fields)->filter(fn ($x) => $x !== null && $x !== '')->count() / count($fields) * 100);
        $compliance = $p->beautyProfile?->compliance_status;
        $media = (bool) ($p->featured_image || $p->images_count);

        return ['id' => (string) $p->id, 'publicId' => 'PRODUCT-'.str_pad((string) $p->id, 6, '0', STR_PAD_LEFT), 'dbProductId' => (string) $p->id, 'productName' => $p->name, 'variantInfo' => $p->variants_count.' variants', 'sku' => $p->sku ?: ($v?->sku ?: '—'), 'barcode' => $v?->barcode ?: '—',
            'brand' => 'Unavailable', 'supplier' => $p->supplier?->company_name ?: 'Unassigned', 'category' => $p->category?->parent?->name ?: ($p->category?->name ?: 'Unassigned'), 'subcategory' => $p->category?->parent ? $p->category->name : '—', 'variantCount' => $p->variants_count, 'completenessPercent' => $complete,
            'brandAuthStatus' => 'Unavailable', 'complianceStatus' => $compliance ? ucfirst(str_replace('_', '-', $compliance)) : 'Unavailable', 'mediaStatus' => $media ? 'Link' : 'Missing', 'inventoryLinkStatus' => 'Unavailable', 'publicationReadyStatus' => $p->published_at ? 'Ready' : (($complete >= 75 && $media && $compliance !== 'non_compliant') ? 'At Risk' : 'Blocked'),
            'channelAvailability' => 'Unavailable', 'duplicateRisk' => 'Unavailable', 'riskLevel' => 'Unavailable', 'approvalStatus' => match ($p->approval_status) {
                'approved' => 'Approved','rejected' => 'Rejected','draft' => 'Draft',default => 'Pending Approval'
            }, 'productStatus' => $p->trashed() ? 'Archived' : ($p->status === 'active' ? 'Active' : ($complete < 75 ? 'Incomplete' : 'Draft')),
            'updatedAt' => optional($p->updated_at)->toIso8601String(), 'reviewer' => 'Unavailable', 'thumbnail' => $p->featured_image ?: '/images/product-placeholder.svg'];
    }

    private function kpis(): array
    {
        $b = Product::query();
        $items = [['total', 'Total Product Masters', Product::withTrashed()->count(), 'Package', 'all'], ['active', 'Active Products', (clone $b)->where('status', 'active')->count(), 'CheckCircle2', 'active'], ['draft', 'Draft Products', (clone $b)->where('approval_status', 'draft')->count(), 'FileEdit', 'draft'], ['pending', 'Pending Approval', (clone $b)->whereIn('approval_status', ['pending', 'pending_approval', 'submitted'])->count(), 'Clock', 'pending'], ['incomplete', 'Incomplete Records', (clone $b)->where(fn ($q) => $q->whereNull('sku')->orWhereNull('description')->orWhereNull('featured_image'))->count(), 'AlertCircle', 'incomplete'], ['duplicates', 'Duplicate Risks', 'N/A', 'Copy', 'duplicates'], ['media', 'Missing Required Media', (clone $b)->whereNull('featured_image')->doesntHave('images')->count(), 'ImageOff', 'media'], ['compliance', 'Compliance Issues', (clone $b)->whereHas('beautyProfile', fn ($q) => $q->where('compliance_status', 'non_compliant'))->count(), 'ShieldAlert', 'compliance'], ['variants', 'Products with Variants', (clone $b)->has('variants')->count(), 'Layers', 'variants'], ['inventory', 'Inventory Linked', 'N/A', 'Boxes', 'inventory'], ['published', 'Publication Ready', (clone $b)->whereNotNull('published_at')->count(), 'Globe', 'published'], ['archived', 'Archived Products', Product::onlyTrashed()->count(), 'Archive', 'archived']];

        return collect($items)->values()->map(fn ($k, $i) => ['id' => $k[0], 'seq' => $i + 1, 'label' => $k[1], 'value' => is_numeric($k[2]) ? number_format($k[2]) : $k[2], 'trend' => '', 'isPositive' => true, 'iconName' => $k[3], 'filterKey' => $k[4], 'warningBorder' => $k[0] === 'duplicates'])->all();
    }

    private function tabs(): array
    {
        $b = Product::query();

        return [['id' => 'all', 'label' => 'All Products', 'count' => Product::withTrashed()->count()], ['id' => 'active', 'label' => 'Active', 'count' => (clone $b)->where('status', 'active')->count()], ['id' => 'draft', 'label' => 'Draft', 'count' => (clone $b)->where('approval_status', 'draft')->count()], ['id' => 'pending', 'label' => 'Pending Approval', 'count' => (clone $b)->whereIn('approval_status', ['pending', 'pending_approval', 'submitted'])->count()], ['id' => 'approved', 'label' => 'Approved', 'count' => (clone $b)->where('approval_status', 'approved')->count()], ['id' => 'published', 'label' => 'Published', 'count' => (clone $b)->whereNotNull('published_at')->count()], ['id' => 'incomplete', 'label' => 'Incomplete', 'count' => (clone $b)->where(fn ($q) => $q->whereNull('sku')->orWhereNull('description')->orWhereNull('featured_image'))->count()], ['id' => 'blocked', 'label' => 'Blocked', 'count' => (clone $b)->whereIn('approval_status', ['rejected', 'blocked'])->count()], ['id' => 'archived', 'label' => 'Archived', 'count' => Product::onlyTrashed()->count()]];
    }

    private function quickFilters(): array
    {
        return [['id' => 'qf-2', 'label' => 'Pending Approval', 'filterKey' => 'pending'], ['id' => 'qf-5', 'label' => 'Missing Media', 'filterKey' => 'media'], ['id' => 'qf-7', 'label' => 'Publication Blocked', 'filterKey' => 'blocked']];
    }

    private function health(): array
    {
        $total = max(Product::count(), 1);
        $pct = fn ($n) => (int) round($n / $total * 100);

        return [['label' => 'Identity Completeness', 'percentage' => $pct(Product::whereNotNull('name')->whereNotNull('sku')->count()), 'status' => 'good', 'tooltipText' => 'Name and SKU present.'], ['label' => 'Classification Quality', 'percentage' => $pct(Product::whereNotNull('category_id')->count()), 'status' => 'good', 'tooltipText' => 'Category assigned.'], ['label' => 'Brand Verification', 'percentage' => 0, 'status' => 'warning', 'tooltipText' => self::UNSUPPORTED['brand']], ['label' => 'Compliance Readiness', 'percentage' => $pct(Product::whereHas('beautyProfile', fn ($q) => $q->where('compliance_status', 'compliant'))->count()), 'status' => 'warning', 'tooltipText' => 'Compliant beauty profile.'], ['label' => 'Variant Readiness', 'percentage' => $pct(Product::has('variants')->count()), 'status' => 'warning', 'tooltipText' => 'At least one variant.'], ['label' => 'Media Readiness', 'percentage' => $pct(Product::where(fn ($q) => $q->whereNotNull('featured_image')->orHas('images'))->count()), 'status' => 'warning', 'tooltipText' => 'Featured image or media record.'], ['label' => 'Inventory Linkage', 'percentage' => 0, 'status' => 'warning', 'tooltipText' => self::UNSUPPORTED['inventoryLinkage']], ['label' => 'Publication Readiness', 'percentage' => $pct(Product::whereNotNull('published_at')->count()), 'status' => 'warning', 'tooltipText' => 'Published timestamp present.']];
    }

    private function options(): array
    {
        return ['categories' => DB::table('categories')->orderBy('name')->get(['id', 'name']), 'suppliers' => DB::table('suppliers')->orderBy('company_name')->get(['id', 'company_name as name']), 'countries' => DB::table('suppliers')->whereNotNull('country')->distinct()->orderBy('country')->pluck('country')];
    }

    private function sort(Builder $q, string $sort): void
    {
        match ($sort) {
            'name-asc' => $q->orderBy('name'),'completeness-desc' => $q->orderByRaw('(CASE WHEN sku IS NOT NULL THEN 1 ELSE 0 END + CASE WHEN description IS NOT NULL THEN 1 ELSE 0 END + CASE WHEN category_id IS NOT NULL THEN 1 ELSE 0 END + CASE WHEN featured_image IS NOT NULL THEN 1 ELSE 0 END) DESC'),default => $q->orderByDesc('updated_at')->orderByDesc('id')
        };
    }
}
