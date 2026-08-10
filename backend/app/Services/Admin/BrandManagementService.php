<?php

namespace App\Services\Admin;

use App\Models\Brand;
use App\Models\SellerBrandAuthorization;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

class BrandManagementService
{
    public const UNSUPPORTED_REASON = 'No authoritative schema or workflow exists for this capability in this installation.';

    public function dashboard(array $filters, array $capabilities): array
    {
        $base = Brand::withTrashed();
        $allCount = (clone $base)->whereNull('deleted_at')->count();
        $activeCount = (clone $base)->whereNull('deleted_at')->where('status', 'active')->count();
        $verifiedCount = (clone $base)->whereNull('deleted_at')->where('is_verified', true)->count();
        $archivedCount = (clone $base)->whereNotNull('deleted_at')->count();
        $expiredCount = SellerBrandAuthorization::query()
            ->where(fn (Builder $q) => $q->where('status', 'expired')->orWhere(fn (Builder $dates) => $dates->where('status', 'approved')->whereNotNull('expires_at')->where('expires_at', '<', now())))
            ->distinct('brand_id')->count('brand_id');
        $duplicateGroups = Brand::query()->selectRaw('LOWER(TRIM(name)) as normalized_name, COUNT(*) as aggregate')
            ->groupByRaw('LOWER(TRIM(name))')->havingRaw('COUNT(*) > 1')->get();
        $duplicateCount = (int) $duplicateGroups->sum('aggregate');

        $query = Brand::query()->withTrashed()->with(['country:id,name,iso2', 'creator:id,name'])
            ->with(['sellerBrandAuthorizations' => fn ($q) => $q->with('supplier:id,company_name')->latest('updated_at')]);
        $this->applyFilters($query, $filters);
        $sort = $filters['sort'] ?? 'updated_at';
        $direction = $filters['direction'] ?? 'desc';
        $query->orderBy(in_array($sort, ['name', 'status', 'is_verified', 'created_at', 'updated_at'], true) ? $sort : 'updated_at', $direction === 'asc' ? 'asc' : 'desc');
        $pageSize = (int) ($filters['pageSize'] ?? 25);
        $paginator = $query->paginate($pageSize, ['*'], 'page', (int) ($filters['page'] ?? 1));

        $authorizationCounts = SellerBrandAuthorization::query()->select('status', DB::raw('COUNT(*) as aggregate'))->groupBy('status')->pluck('aggregate', 'status');
        $currentApproved = SellerBrandAuthorization::query()->where('status', 'approved')->where(fn (Builder $q) => $q->whereNull('starts_at')->orWhere('starts_at', '<=', now()))->where(fn (Builder $q) => $q->whereNull('expires_at')->orWhere('expires_at', '>=', now()));
        $authorizedBrandCount = (clone $currentApproved)->distinct('brand_id')->count('brand_id');
        $mappedBrandCount = SellerBrandAuthorization::query()->distinct('brand_id')->count('brand_id');
        $logoCount = Brand::query()->whereNotNull('logo_path')->where('logo_path', '<>', '')->count();
        $readiness = [
            'ready' => Brand::query()->where('is_verified', true)->whereHas('sellerBrandAuthorizations', fn (Builder $q) => $q->where('status', 'approved')->where(fn (Builder $x) => $x->whereNull('expires_at')->orWhere('expires_at', '>=', now())))->count(),
            'partial' => 0,
            'notReady' => 0,
        ];
        $readiness['partial'] = max(0, $verifiedCount + $authorizedBrandCount - (2 * $readiness['ready']));
        $readiness['notReady'] = max(0, $allCount - $readiness['ready'] - $readiness['partial']);

        return [
            'kpis' => [
                $this->kpi('kpi-1', 'Total Brands', $allCount, 'all'), $this->kpi('kpi-2', 'Active Brands', $activeCount, 'active'),
                $this->kpi('kpi-3', 'Verified Brands', $verifiedCount, 'verified'), $this->kpi('kpi-4', 'Pending Verification', null, 'unsupported'),
                $this->kpi('kpi-5', 'Conditional Authorizations', null, 'unsupported'), $this->kpi('kpi-6', 'Expiring Authorizations', null, 'unsupported'),
                $this->kpi('kpi-7', 'Expired Authorizations', $expiredCount, 'expired'), $this->kpi('kpi-8', 'Unauthorized Brand Use', null, 'unsupported'),
                $this->kpi('kpi-9', 'Brands Missing Owner', null, 'unsupported'), $this->kpi('kpi-10', 'Duplicate Brand Risks', $duplicateCount, 'duplicates'),
                $this->kpi('kpi-11', 'Channel Eligibility Conflicts', null, 'unsupported'), $this->kpi('kpi-12', 'Archived Brands', $archivedCount, 'archived'),
            ],
            'tabs' => [
                ['id' => 'all', 'label' => 'All Brands', 'count' => $allCount], ['id' => 'active', 'label' => 'Active', 'count' => $activeCount],
                ['id' => 'verified', 'label' => 'Verified', 'count' => $verifiedCount], ['id' => 'pending', 'label' => 'Pending', 'count' => null],
                ['id' => 'conditional', 'label' => 'Conditional', 'count' => null], ['id' => 'expiring', 'label' => 'Expiring', 'count' => null],
                ['id' => 'unauthorized', 'label' => 'Unauthorized Use', 'count' => null], ['id' => 'archived', 'label' => 'Archived', 'count' => $archivedCount],
            ],
            'brands' => ['data' => collect($paginator->items())->map(fn (Brand $brand) => $this->row($brand))->all(), 'currentPage' => $paginator->currentPage(), 'pageSize' => $paginator->perPage(), 'total' => $paginator->total(), 'lastPage' => $paginator->lastPage()],
            'options' => [
                'countries' => DB::table('countries')->where('status', 'active')->orderBy('name')->get(['id', 'name'])->map(fn ($x) => ['id' => (string) $x->id, 'name' => $x->name]),
                'suppliers' => DB::table('suppliers')->where('status', 'active')->orderBy('company_name')->get(['id', 'company_name'])->map(fn ($x) => ['id' => (string) $x->id, 'name' => $x->company_name]),
                'authorizationStatuses' => SellerBrandAuthorization::query()->distinct()->orderBy('status')->pluck('status'),
            ],
            'analytics' => [
                'health' => ['verificationCoverage' => $this->percent($verifiedCount, $allCount), 'authorizationReadiness' => $this->percent($authorizedBrandCount, $allCount), 'supplierMapping' => $this->percent($mappedBrandCount, $allCount), 'logoCoverage' => $this->percent($logoCount, $allCount)],
                'readiness' => $readiness,
                'authorizationSummary' => $authorizationCounts,
                'supplierRelationships' => $this->supplierRelationships(),
                'duplicates' => $this->duplicatePairs($duplicateGroups),
                'activities' => $this->activities(),
            ],
            'capabilities' => $capabilities + ['tenantScope' => false, 'pendingVerification' => false, 'conditionalAuthorization' => false, 'expiryWarningWindow' => false, 'ownership' => false, 'products' => false, 'categories' => false, 'channels' => false, 'compliance' => false, 'unauthorizedUse' => false, 'savedViews' => false, 'merge' => false, 'reason' => self::UNSUPPORTED_REASON],
            'lastSyncedAt' => now()->toIso8601String(),
        ];
    }

    public function applyFilters(Builder $query, array $filters): void
    {
        $scope = $filters['scope'] ?? 'all';
        if ($scope === 'archived') {
            $query->onlyTrashed();
        } else {
            $query->whereNull('deleted_at');
        }
        if ($scope === 'active') {
            $query->where('status', 'active');
        }
        if ($scope === 'verified') {
            $query->where('is_verified', true);
        }
        if ($scope === 'expired') {
            $query->whereHas('sellerBrandAuthorizations', fn (Builder $q) => $q->where('status', 'expired')->orWhere(fn (Builder $x) => $x->where('status', 'approved')->whereNotNull('expires_at')->where('expires_at', '<', now())));
        }
        if ($scope === 'duplicates') {
            $query->whereIn(DB::raw('LOWER(TRIM(name))'), Brand::query()->selectRaw('LOWER(TRIM(name))')->groupByRaw('LOWER(TRIM(name))')->havingRaw('COUNT(*) > 1'));
        }
        if ($search = trim((string) ($filters['search'] ?? ''))) {
            $query->where(fn (Builder $q) => $q->where('name', 'like', "%{$search}%")->orWhere('slug', 'like', "%{$search}%")->orWhere('uuid', 'like', "%{$search}%")->orWhereHas('sellerBrandAuthorizations.supplier', fn (Builder $s) => $s->where('company_name', 'like', "%{$search}%")));
        }
        if (isset($filters['verified'])) {
            $query->where('is_verified', filter_var($filters['verified'], FILTER_VALIDATE_BOOLEAN));
        }
        if ($status = $filters['status'] ?? null) {
            $query->where('status', $status);
        }
        if ($auth = $filters['authorization'] ?? null) {
            $query->whereHas('sellerBrandAuthorizations', fn (Builder $q) => $q->where('status', $auth));
        }
        if ($supplier = $filters['supplierId'] ?? null) {
            $query->whereHas('sellerBrandAuthorizations', fn (Builder $q) => $q->where('supplier_id', $supplier));
        }
        if ($country = $filters['countryId'] ?? null) {
            $query->where('country_id', $country);
        }
        if ($from = $filters['updatedFrom'] ?? null) {
            $query->whereDate('updated_at', '>=', $from);
        }
        if ($to = $filters['updatedTo'] ?? null) {
            $query->whereDate('updated_at', '<=', $to);
        }
    }

    public function row(Brand $brand): array
    {
        $auths = $brand->sellerBrandAuthorizations;
        $current = $auths->first(fn ($a) => $a->status === 'approved' && (! $a->starts_at || $a->starts_at->lte(now())) && (! $a->expires_at || $a->expires_at->gte(now())));
        $expired = $auths->first(fn ($a) => $a->status === 'expired' || ($a->status === 'approved' && $a->expires_at?->lt(now())));
        $pending = $auths->firstWhere('status', 'submitted');
        $summary = $current ? 'Valid' : ($pending ? 'Pending' : ($expired ? 'Expired' : 'Not Authorized'));

        return ['id' => (string) $brand->id, 'brandName' => $brand->name, 'brandId' => $brand->uuid, 'slug' => $brand->slug, 'initials' => Str::upper(Str::substr(collect(explode(' ', $brand->name))->map(fn ($x) => Str::substr($x, 0, 1))->join(''), 0, 3)), 'logoPath' => $brand->logo_path, 'description' => $brand->description, 'website' => $brand->website_url, 'countryId' => $brand->country_id ? (string) $brand->country_id : null, 'country' => $brand->country?->name ?? 'Unavailable', 'status' => Str::headline($brand->status), 'verificationStatus' => $brand->is_verified ? 'Verified' : 'Unverified', 'authorizationStatus' => $summary, 'authorizationCount' => $auths->count(), 'territory' => $current?->territory ?? $pending?->territory ?? 'Unavailable', 'authorizationStartDate' => $current?->starts_at?->toDateString(), 'authorizationExpiryDate' => $current?->expires_at?->toDateString() ?? $expired?->expires_at?->toDateString(), 'legalOwner' => 'Unavailable', 'manufacturer' => 'Unavailable', 'primarySupplier' => 'Unavailable', 'activeProductsCount' => null, 'categoriesCount' => null, 'channelEligibility' => 'Unavailable', 'eligibleChannelsCount' => null, 'totalChannelsCount' => null, 'complianceStatus' => 'Unavailable', 'catalogueReadinessPercent' => null, 'duplicateRisk' => 'Unavailable', 'riskLevel' => 'Unavailable', 'brandOwner' => 'Unavailable', 'createdBy' => $brand->creator?->name, 'updatedAt' => $brand->updated_at?->toIso8601String(), 'archivedAt' => $brand->deleted_at?->toIso8601String()];
    }

    private function kpi(string $id, string $label, ?int $value, string $filterKey): array
    {
        return ['id' => $id, 'label' => $label, 'value' => $value, 'trend' => null, 'filterKey' => $filterKey];
    }

    private function percent(int $part, int $whole): ?int
    {
        return $whole ? (int) round(100 * $part / $whole) : null;
    }

    private function supplierRelationships(): array
    {
        return DB::table('seller_brand_authorizations as a')->join('suppliers as s', 's.id', '=', 'a.supplier_id')->selectRaw('s.id,s.company_name,COUNT(DISTINCT a.brand_id) total_brands,SUM(CASE WHEN a.status = ? THEN 1 ELSE 0 END) approved,SUM(CASE WHEN a.status IN (?,?) THEN 1 ELSE 0 END) at_risk', ['approved', 'expired', 'suspended'])->groupBy('s.id', 's.company_name')->orderByDesc('total_brands')->limit(10)->get()->map(fn ($x) => ['id' => (string) $x->id, 'supplierName' => $x->company_name, 'totalBrands' => (int) $x->total_brands, 'approvedAuthorizations' => (int) $x->approved, 'atRiskAuthorizations' => (int) $x->at_risk])->all();
    }

    private function duplicatePairs(Collection $groups): array
    {
        $out = [];
        foreach ($groups as $g) {
            $items = Brand::query()->whereRaw('LOWER(TRIM(name)) = ?', [$g->normalized_name])->orderBy('id')->get();
            $first = $items->first();
            foreach ($items->slice(1) as $other) {
                $out[] = ['id' => $first->id.'-'.$other->id, 'brandA' => $first->name, 'brandB' => $other->name, 'similarityPercent' => 100, 'risk' => 'High', 'productsCount' => null];
            }
        }

        return $out;
    }

    private function activities(): array
    {
        if (! Schema::hasTable('activity_log')) {
            return [];
        }

        return DB::table('activity_log')->whereIn('log_name', ['brands', 'admin'])->where(fn ($q) => $q->where('description', 'like', 'brand.%')->orWhere('description', 'like', 'brand_%'))->latest('id')->limit(12)->get()->map(fn ($x) => ['id' => (string) $x->id, 'activity' => $x->description, 'brandName' => $x->subject_id ? 'Brand #'.$x->subject_id : 'Brand management', 'actionBy' => $x->causer_id ? 'Admin #'.$x->causer_id : 'System', 'dateTime' => (string) $x->created_at, 'result' => 'Success'])->all();
    }
}
