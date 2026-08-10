<?php

namespace App\Services\Admin;

use Carbon\CarbonImmutable;
use Illuminate\Database\Query\Builder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CatalogueCommandCenterService
{
    private const PENDING = ['pending', 'submitted', 'under_review', 'initial_review', 'brand_authorization', 'compliance_review', 'information_requested', 'final_decision'];

    public function dashboard(CarbonImmutable $from, CarbonImmutable $to, array $permissions): array
    {
        $products = DB::table('products')->whereNull('products.deleted_at');
        $total = (clone $products)->count();
        $active = (clone $products)->where('status', 'active')->count();
        $pending = (clone $products)->whereIn('approval_status', self::PENDING)->count();
        $draft = (clone $products)->where('approval_status', 'draft')->count();
        $missingMedia = (clone $products)->whereNull('featured_image')->whereNotExists(fn (Builder $q) => $q->selectRaw('1')->from('product_images')->whereColumn('product_images.product_id', 'products.id'))->count();
        $incomplete = (clone $products)->where(fn (Builder $q) => $q->whereNull('description')->orWhere('description', '')->orWhereNull('short_description')->orWhere('short_description', '')->orWhereNull('featured_image'))->count();
        $duplicate = (int) DB::table('product_variants')->whereNull('deleted_at')->whereNotNull('sku')->groupBy('sku')->havingRaw('COUNT(*) > 1')->get()->sum(fn ($row) => 1);
        $compliance = Schema::hasTable('product_beauty_profiles') ? DB::table('product_beauty_profiles')->whereNotIn('compliance_status', ['approved', 'compliant'])->count() : 0;
        $availableInventory = Schema::hasTable('product_variants') ? (int) DB::table('product_variants')->whereNull('deleted_at')->where('is_active', true)->sum('stock_quantity') : 0;
        $lowStock = Schema::hasTable('product_variants') ? DB::table('product_variants')->whereNull('deleted_at')->where('is_active', true)->whereColumn('stock_quantity', '<=', 'low_stock_threshold')->distinct('product_id')->count('product_id') : 0;

        $currentCreated = $this->createdCount($from, $to);
        $days = $from->diffInDays($to) + 1;
        $previousTo = $from->subSecond();
        $previousFrom = $previousTo->subDays($days - 1)->startOfDay();
        $previousCreated = $this->createdCount($previousFrom, $previousTo);

        $kpis = [
            $this->kpi(1, 'Total Product Masters', $total, $currentCreated, $previousCreated, true, 'Package', 'all'),
            $this->kpi(2, 'Active Products', $active, $this->createdCount($from, $to, 'active'), $this->createdCount($previousFrom, $previousTo, 'active'), true, 'CheckCircle2', 'active'),
            $this->kpi(3, 'Pending Approval', $pending, $this->statusEvents($from, $to, self::PENDING), $this->statusEvents($previousFrom, $previousTo, self::PENDING), false, 'Clock', 'pending'),
            $this->kpi(4, 'Draft Products', $draft, $this->createdApprovalCount($from, $to, ['draft']), $this->createdApprovalCount($previousFrom, $previousTo, ['draft']), false, 'FileEdit', 'draft'),
            $this->kpi(5, 'Incomplete Records', $incomplete, null, null, false, 'AlertCircle', 'incomplete', 'Completeness is evaluated from required core description and media fields.'),
            $this->kpi(6, 'Duplicate Risks', $duplicate, null, null, false, 'Copy', 'duplicate', 'Duplicate SKU groups in product_variants.'),
            $this->kpi(7, 'Missing Media', $missingMedia, null, null, false, 'ImageOff', 'missing-media'),
            $this->kpi(8, 'Compliance Issues', $compliance, null, null, false, 'ShieldAlert', 'compliance'),
            $this->kpi(9, 'Available Inventory', $availableInventory, null, null, true, 'Boxes', 'available-inventory', 'Sum of active variant stock_quantity; reservation and quarantine tables do not exist.', ' units'),
            $this->kpi(10, 'Low-Stock Products', $lowStock, null, null, false, 'AlertTriangle', 'low-stock'),
            $this->unavailableKpi(11, 'Near-Expiry Batches', 'CalendarX', 'near-expiry', 'inventory_batch_domain_not_implemented'),
            $this->unavailableKpi(12, 'Recalled or Quarantined', 'Ban', 'recalled', 'recall_quarantine_domain_not_implemented'),
        ];

        $completeness = $this->percent($total - $incomplete, $total);
        $media = $this->percent($total - $missingMedia, $total);
        $complianceReadiness = $this->percent($total - $compliance, $total);
        $approvalEfficiency = $this->approvalEfficiency($from, $to);
        $brandVerification = $this->brandVerification();
        $duplicateControl = $this->percent($total - $duplicate, $total);
        $inventoryAvailability = $this->inventoryAvailability();
        $attributeQuality = $this->attributeQuality();
        $healthMetrics = compact('completeness', 'approvalEfficiency', 'media');
        $healthMetrics['dataQuality'] = (int) round(($completeness + $attributeQuality + $duplicateControl) / 3);
        $healthMetrics['compliance'] = $complianceReadiness;
        $overall = (int) round(array_sum($healthMetrics) / count($healthMetrics));

        return [
            'context' => $this->context($from, $to),
            'kpis' => $kpis,
            'trend' => $this->trend($from, $to, 'weekly'),
            'composition' => $this->composition('category'),
            'health' => ['availability' => 'available', 'score' => $overall, 'state' => $overall >= 85 ? 'Stable' : ($overall >= 70 ? 'Needs Attention' : 'Critical'), 'metrics' => $healthMetrics],
            'healthScorecard' => [
                $this->score('Product Completeness', $completeness), $this->score('Approval Efficiency', $approvalEfficiency),
                $this->score('Brand Verification', $brandVerification), $this->score('Attribute Quality', $attributeQuality),
                $this->score('Media Readiness', $media), $this->score('Duplicate Control', $duplicateControl),
                $this->score('Inventory Availability', $inventoryAvailability), $this->score('Compliance Readiness', $complianceReadiness),
            ],
            'alerts' => $this->alerts($pending, $missingMedia, $duplicate, $compliance),
            'approvalPipeline' => $this->approvalPipeline(),
            'approvalStatusSummary' => $this->approvalSummary(),
            'slaSummary' => ['availability' => 'unavailable', 'reason' => 'catalogue_sla_policy_and_deadline_fields_not_implemented', 'items' => []],
            'inventoryRiskSummary' => [
                ['label' => 'Low Stock', 'count' => $lowStock, 'color' => '#f59e0b'],
                ['label' => 'Near Expiry', 'count' => null, 'color' => '#eab308', 'availability' => 'unavailable'],
                ['label' => 'Quarantined', 'count' => null, 'color' => '#9333ea', 'availability' => 'unavailable'],
                ['label' => 'Recalled', 'count' => null, 'color' => '#dc2626', 'availability' => 'unavailable'],
            ],
            'quickQueues' => [
                ['id' => 'pending', 'label' => 'Pending Product Approvals', 'count' => $pending, 'filterKey' => 'pending'],
                ['id' => 'incomplete', 'label' => 'Incomplete Records', 'count' => $incomplete, 'filterKey' => 'incomplete'],
                ['id' => 'duplicate', 'label' => 'Duplicate Risks', 'count' => $duplicate, 'filterKey' => 'duplicate'],
                ['id' => 'missing-media', 'label' => 'Missing Media', 'count' => $missingMedia, 'filterKey' => 'missing-media'],
            ],
            'priorityApprovals' => $this->priorityApprovals(1, 20),
            'quality' => $this->quality($total, $incomplete, $missingMedia, $duplicate, $compliance),
            'inventory' => ['availability' => 'partial', 'availableStock' => $availableInventory, 'lowStockProducts' => $lowStock, 'batches' => [], 'expiryExposure' => [], 'channels' => [], 'reason' => 'batch_reservation_and_publication_channel_domains_not_implemented'],
            'recentActivity' => $this->recentActivity(),
            'permissions' => $permissions,
            'meta' => ['generatedAt' => now()->toIso8601String(), 'timezone' => config('app.timezone'), 'refreshIntervalSeconds' => 30],
        ];
    }

    public function trend(CarbonImmutable $from, CarbonImmutable $to, string $granularity): array
    {
        $periodSql = $this->periodSql($granularity);
        $created = DB::table('products')->whereNull('deleted_at')->whereBetween('created_at', [$from, $to])->selectRaw("{$periodSql} period, count(*) count")->groupBy('period')->pluck('count', 'period');
        $events = DB::table('product_approval_histories')->whereBetween('created_at', [$from, $to])->selectRaw("{$periodSql} period, new_status, count(*) count")->groupBy('period', 'new_status')->get();
        $periods = collect($created->keys())->merge($events->pluck('period'))->unique()->sort()->values();
        return ['granularity' => $granularity, 'points' => $periods->map(function ($period) use ($created, $events) {
            $rows = $events->where('period', $period)->pluck('count', 'new_status');
            return ['date' => $period, 'created' => (int) ($created[$period] ?? 0), 'submitted' => (int) ($rows['submitted'] ?? 0), 'approved' => (int) ($rows['approved'] ?? 0), 'rejected' => (int) ($rows['rejected'] ?? 0), 'published' => (int) ($rows['published'] ?? 0)];
        })->all()];
    }

    public function composition(string $dimension): array
    {
        $query = match ($dimension) {
            'status' => DB::table('products')->whereNull('deleted_at')->selectRaw('approval_status label, count(*) count')->groupBy('approval_status'),
            'category' => DB::table('products')->join('categories', 'categories.id', '=', 'products.category_id')->whereNull('products.deleted_at')->selectRaw('categories.name label, count(*) count')->groupBy('categories.id', 'categories.name'),
            default => null,
        };
        if (! $query) return ['availability' => 'unavailable', 'dimension' => $dimension, 'total' => 0, 'items' => [], 'reason' => "{$dimension}_dimension_not_modelled_on_products"];
        $rows = $query->orderByDesc('count')->get(); $total = (int) $rows->sum('count');
        $colors = ['#741d35','#9333ea','#2563eb','#059669','#d97706','#64748b','#db2777','#0891b2'];
        return ['availability' => 'available', 'dimension' => $dimension, 'total' => $total, 'items' => $rows->values()->map(fn ($r, $index) => ['name' => $r->label ?: 'Unassigned', 'count' => (int) $r->count, 'percentage' => $this->percent((int) $r->count, $total), 'color' => $colors[$index % count($colors)]])->all()];
    }

    public function priorityApprovals(int $page, int $pageSize, ?string $search = null, ?string $stage = null, ?string $sort = null, string $direction = 'desc'): array
    {
        $q = DB::table('products')->leftJoin('categories', 'categories.id', '=', 'products.category_id')->leftJoin('suppliers', 'suppliers.id', '=', 'products.supplier_id')->whereNull('products.deleted_at')->whereIn('products.approval_status', self::PENDING);
        if ($search) { $term = '%'.mb_strtolower($search).'%'; $q->where(fn (Builder $b) => $b->whereRaw('LOWER(products.name) LIKE ?', [$term])->orWhereRaw('LOWER(products.sku) LIKE ?', [$term])); }
        if ($stage) $q->where('products.approval_status', str_replace('-', '_', $stage));
        $total = (clone $q)->count();
        $sortColumn = match ($sort) { 'productName' => 'products.name', 'submittedDate' => 'products.updated_at', default => 'products.updated_at' };
        $rows = $q->orderBy($sortColumn, $direction === 'asc' ? 'asc' : 'desc')->forPage($page, $pageSize)->select(['products.id','products.uuid','products.sku','products.name','products.approval_status','products.updated_at','products.featured_image','categories.name as category','suppliers.company_name as supplier'])->get();
        return ['items' => $rows->map(fn ($r) => ['id' => (string) $r->id, 'submissionId' => $r->sku ?: ($r->uuid ?: "PRODUCT-{$r->id}"), 'productName' => $r->name, 'brand' => 'Unavailable', 'category' => $r->category ?: 'Unassigned', 'supplier' => $r->supplier ?: 'Unassigned', 'completeness' => null, 'brandAuthStatus' => 'Pending', 'complianceStatus' => 'Pending', 'risk' => 'Unavailable', 'submittedDate' => $r->updated_at, 'slaDays' => null, 'reviewer' => 'Unassigned', 'status' => $r->approval_status, 'thumbnail' => $r->featured_image ?: ''])->all(), 'pagination' => ['page' => $page, 'pageSize' => $pageSize, 'total' => $total, 'lastPage' => max(1, (int) ceil($total / $pageSize))]];
    }

    private function context(CarbonImmutable $from, CarbonImmutable $to): array { return ['defaults' => ['tenant' => 'Platform catalogue', 'ecosystem' => 'All ecosystems', 'businessUnit' => 'All business units', 'salesChannel' => 'All channels', 'region' => 'All regions', 'currency' => null, 'dateRange' => 'Last 30 Days'], 'options' => ['tenant' => [['value' => 'platform', 'label' => 'Platform catalogue']], 'ecosystem' => [], 'businessUnit' => [], 'salesChannel' => [], 'region' => [], 'currency' => DB::table('currencies')->where('status', 'active')->orderBy('code')->get(['code as value','code as label'])->all()], 'dateFrom' => $from->toDateString(), 'dateTo' => $to->toDateString(), 'unsupportedFilters' => ['tenant','ecosystem','businessUnit','salesChannel','region']]; }
    private function createdCount($from, $to, ?string $status = null): int { return DB::table('products')->whereNull('deleted_at')->when($status, fn ($q) => $q->where('status', $status))->whereBetween('created_at', [$from, $to])->count(); }
    private function createdApprovalCount($from, $to, array $statuses): int { return DB::table('products')->whereNull('deleted_at')->whereIn('approval_status', $statuses)->whereBetween('created_at', [$from, $to])->count(); }
    private function statusEvents($from, $to, array $statuses): int { return DB::table('product_approval_histories')->whereIn('new_status', $statuses)->whereBetween('created_at', [$from, $to])->count(); }
    private function percent(int|float $part, int|float $total): int { return $total > 0 ? (int) round(($part / $total) * 100) : 0; }
    private function change(?int $current, ?int $previous): ?float { if ($current === null || $previous === null) return null; if ($previous === 0) return $current === 0 ? 0.0 : null; return round((($current - $previous) / $previous) * 100, 1); }
    private function kpi(int $seq, string $label, int $value, ?int $current, ?int $previous, bool $increaseGood, string $icon, string $filter, ?string $definition = null, string $suffix = ''): array { $change = $this->change($current, $previous); return ['id' => "kpi-{$seq}", 'seq' => $seq, 'label' => $label, 'value' => number_format($value).$suffix, 'rawValue' => $value, 'trend' => $change === null ? 'N/A' : abs($change).'%', 'changePercent' => $change, 'isPositive' => $change !== null && ($increaseGood ? $change >= 0 : $change <= 0), 'iconName' => $icon, 'filterKey' => $filter, 'availability' => 'available', 'definition' => $definition]; }
    private function unavailableKpi(int $seq, string $label, string $icon, string $filter, string $reason): array { return ['id' => "kpi-{$seq}", 'seq' => $seq, 'label' => $label, 'value' => 'Unavailable', 'rawValue' => null, 'trend' => 'N/A', 'changePercent' => null, 'isPositive' => false, 'iconName' => $icon, 'filterKey' => $filter, 'availability' => 'unavailable', 'reason' => $reason]; }
    private function approvalEfficiency($from, $to): int { $decisions = DB::table('product_approval_histories')->whereBetween('created_at', [$from, $to])->whereIn('new_status', ['approved','rejected'])->count(); $approved = DB::table('product_approval_histories')->whereBetween('created_at', [$from, $to])->where('new_status', 'approved')->count(); return $this->percent($approved, $decisions); }
    private function brandVerification(): int { $total = DB::table('brands')->whereNull('deleted_at')->count(); return $this->percent(DB::table('brands')->whereNull('deleted_at')->where('is_verified', true)->count(), $total); }
    private function attributeQuality(): int { $required = DB::table('category_attributes')->where('is_required', true)->count(); if ($required === 0) return 100; $products = DB::table('products')->whereNull('deleted_at')->count(); $expected = $products * $required; $actual = DB::table('product_attribute_values')->whereNotNull('value')->count(); return min(100, $this->percent($actual, $expected)); }
    private function inventoryAvailability(): int { $total = DB::table('product_variants')->whereNull('deleted_at')->where('is_active', true)->count(); return $this->percent(DB::table('product_variants')->whereNull('deleted_at')->where('is_active', true)->where('stock_quantity', '>', 0)->count(), $total); }
    private function score(string $label, int $percentage): array { return ['label' => $label, 'percentage' => $percentage, 'status' => $percentage >= 85 ? 'good' : ($percentage >= 70 ? 'warning' : 'alert')]; }
    private function approvalPipeline(): array { $map = ['draft'=>'Draft','submitted'=>'Submitted','initial_review'=>'Initial Review','brand_authorization'=>'Brand Auth.','compliance_review'=>'Compliance Review','information_requested'=>'Info Requested','final_decision'=>'Final Decision','approved'=>'Approved','rejected'=>'Rejected','published'=>'Published']; $counts = DB::table('products')->whereNull('deleted_at')->selectRaw('approval_status, count(*) count')->groupBy('approval_status')->pluck('count','approval_status'); return collect($map)->map(fn ($label, $id) => ['id' => str_replace('_','-',$id), 'label' => $label, 'count' => (int) ($counts[$id] ?? 0), 'iconName' => match($id){'draft'=>'FileEdit','submitted'=>'Send','approved'=>'CheckCircle','rejected'=>'XCircle','published'=>'Globe',default=>'Eye'}])->values()->all(); }
    private function approvalSummary(): array { $colors=['draft'=>'#94a3b8','submitted'=>'#3b82f6','under_review'=>'#eab308','information_requested'=>'#f97316','approved'=>'#22c55e','rejected'=>'#ef4444','published'=>'#10b981']; $counts=DB::table('products')->whereNull('deleted_at')->selectRaw('approval_status, count(*) count')->groupBy('approval_status')->pluck('count','approval_status'); return collect($colors)->map(fn($color,$status)=>['label'=>ucwords(str_replace('_',' ',$status)),'count'=>(int)($counts[$status]??0),'color'=>$color])->values()->all(); }
    private function alerts(int $pending,int $missing,int $duplicates,int $compliance): array { return collect([['id'=>'compliance','title'=>'Catalogue compliance review required','severity'=>'High','category'=>'Compliance','count'=>$compliance,'actionRoute'=>'/admin/catalogue/quality?filter=compliance'],['id'=>'duplicate','title'=>'Duplicate product candidates detected','severity'=>'Medium','category'=>'Quality','count'=>$duplicates,'actionRoute'=>'/admin/catalogue/quality?filter=duplicate'],['id'=>'media','title'=>'Missing mandatory product media','severity'=>'Medium','category'=>'Media','count'=>$missing,'actionRoute'=>'/admin/catalogue/media?filter=missing'],['id'=>'approval','title'=>'Products pending approval','severity'=>'Medium','category'=>'Approval','count'=>$pending,'actionRoute'=>'/admin/catalogue/product-approvals']])->filter(fn($a)=>$a['count']>0)->values()->all(); }
    private function quality(int $total,int $incomplete,int $missing,int $duplicate,int $compliance): array { return ['issues'=>[['id'=>'incomplete','title'=>'Incomplete Product Records','count'=>$incomplete,'severity'=>'High','iconName'=>'FileX'],['id'=>'media','title'=>'Missing Images or Media','count'=>$missing,'severity'=>'Medium','iconName'=>'Image'],['id'=>'duplicate','title'=>'Duplicate Product Risks','count'=>$duplicate,'severity'=>'Medium','iconName'=>'Copy'],['id'=>'compliance','title'=>'Compliance Issues','count'=>$compliance,'severity'=>'High','iconName'=>'ShieldAlert']],'completeness'=>[['label'=>'Complete core records','percentage'=>$this->percent($total-$incomplete,$total)],['label'=>'Media ready','percentage'=>$this->percent($total-$missing,$total)]],'categoryCoverage'=>['totalCategories'=>DB::table('categories')->count(),'activeCategories'=>DB::table('categories')->where('status','active')->count(),'emptyCategories'=>DB::table('categories')->whereNotExists(fn($q)=>$q->selectRaw('1')->from('products')->whereColumn('products.category_id','categories.id')->whereNull('products.deleted_at'))->count(),'productsMissingCategory'=>0,'categoriesRequiringReview'=>0,'topCategoryGaps'=>[]],'brandCoverage'=>['totalBrands'=>DB::table('brands')->whereNull('deleted_at')->count(),'verifiedBrands'=>DB::table('brands')->whereNull('deleted_at')->where('is_verified',true)->count(),'pendingVerification'=>DB::table('brands')->whereNull('deleted_at')->where('is_verified',false)->count(),'unauthorizedBrandUse'=>0,'productsMissingBrand'=>null,'expiringAuthorization'=>DB::table('seller_brand_authorizations')->where('status','approved')->whereBetween('expires_at',[today(),today()->addDays(30)])->count()]]; }
    private function recentActivity(): array { return DB::table('product_approval_histories')->join('products','products.id','=','product_approval_histories.product_id')->leftJoin('users','users.id','=','product_approval_histories.reviewed_by')->latest('product_approval_histories.created_at')->limit(20)->get(['product_approval_histories.id','products.name','users.name as actor','product_approval_histories.new_status','product_approval_histories.created_at'])->map(fn($r)=>['id'=>(string)$r->id,'action'=>'Product status changed','productRecord'=>$r->name,'performedBy'=>$r->actor?:'System','dateTime'=>$r->created_at,'businessContext'=>'Platform catalogue','result'=>ucfirst(str_replace('_',' ',$r->new_status))])->all(); }
    private function periodSql(string $granularity): string { if (DB::getDriverName() === 'sqlite') return match($granularity){'daily'=>"strftime('%Y-%m-%d', created_at)",'monthly'=>"strftime('%Y-%m', created_at)",'quarterly'=>"strftime('%Y', created_at) || '-Q' || (((cast(strftime('%m', created_at) as integer)-1)/3)+1)",default=>"strftime('%Y-%W', created_at)"}; return match($granularity){'daily'=>"to_char(created_at, 'YYYY-MM-DD')",'monthly'=>"to_char(created_at, 'YYYY-MM')",'quarterly'=>"to_char(created_at, 'YYYY-\"Q\"Q')",default=>"to_char(created_at, 'IYYY-IW')"}; }
}
