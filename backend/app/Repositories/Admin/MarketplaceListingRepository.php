<?php

namespace App\Repositories\Admin;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Query\Builder;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class MarketplaceListingRepository
{
    private const PRODUCT_SUBJECTS = ['App\\Models\\Product', 'Product', 'product'];

    public function paginate(array $filters): LengthAwarePaginator
    {
        $query = $this->baseQuery();
        $this->applyFilters($query, $filters);
        $sorts = ['listingCode' => 'products.id', 'name' => 'products.name', 'price' => 'products.price', 'stock' => 'stock', 'updatedAt' => 'products.updated_at'];
        $query->orderBy($sorts[$filters['sortBy']] ?? 'products.updated_at', $filters['sortDirection'] ?? 'desc')->orderBy('products.id');

        return $query->paginate($filters['perPage'], ['*'], 'page', $filters['page']);
    }

    public function metrics(array $filters): array
    {
        $base = DB::table('products')->leftJoin('suppliers', 'suppliers.id', '=', 'products.supplier_id')->leftJoin('currencies', 'currencies.id', '=', 'products.currency_id')->whereNull('products.deleted_at');
        $this->applyContextFilters($base, $filters);
        $count = fn (callable $scope): int => (int) $scope(clone $base)->distinct()->count('products.id');

        return [
            'all' => $count(fn ($q) => $q),
            'live' => $count(fn ($q) => $q->where('products.status', 'active')->where('products.approval_status', 'approved')),
            'pending-review' => $count(fn ($q) => $q->where('products.approval_status', 'pending')),
            'draft' => $count(fn ($q) => $q->where('products.approval_status', 'draft')),
            'rejected' => $count(fn ($q) => $q->where('products.approval_status', 'rejected')),
            'suspended' => $count(fn ($q) => $q->where('products.status', 'inactive')->where('products.approval_status', 'approved')),
            'out-of-stock' => $count(fn ($q) => $q->whereExists(fn ($v) => $v->from('product_variants')->whereColumn('product_variants.product_id', 'products.id')->whereNull('product_variants.deleted_at'))->whereNotExists(fn ($v) => $v->from('product_variants')->whereColumn('product_variants.product_id', 'products.id')->whereNull('product_variants.deleted_at')->where('stock_quantity', '>', 0))),
            'low-stock' => $count(fn ($q) => $q->whereExists(fn ($v) => $v->from('product_variants')->whereColumn('product_variants.product_id', 'products.id')->whereNull('product_variants.deleted_at')->where('stock_quantity', '>', 0)->whereNotNull('low_stock_threshold')->whereColumn('stock_quantity', '<=', 'low_stock_threshold'))),
            'high-risk' => $count(fn ($q) => $q->whereExists(fn ($r) => $r->from('risk_profiles')->whereColumn('risk_profiles.subject_id', 'products.id')->whereIn('risk_profiles.subject_type', self::PRODUCT_SUBJECTS)->whereIn('risk_profiles.risk_level', ['high', 'critical']))),
        ];
    }

    public function risks(Collection $productIds): Collection
    {
        return DB::table('risk_profiles')->whereIn('subject_type', self::PRODUCT_SUBJECTS)->whereIn('subject_id', $productIds)
            ->orderByDesc('risk_score')->get()->unique('subject_id')->keyBy('subject_id');
    }

    public function exportRows(array $filters): Collection
    {
        $query = $this->baseQuery();
        $this->applyFilters($query, $filters);

        return $query->orderBy('products.id')->limit(100000)->get();
    }

    public function find(int $id): ?object
    {
        return $this->baseQuery()->where('products.id', $id)->first();
    }

    private function baseQuery(): Builder
    {
        $stock = DB::table('product_variants')->whereNull('deleted_at')->groupBy('product_id')->selectRaw('product_id, COALESCE(SUM(stock_quantity), 0) AS stock');
        $sales = DB::table('order_items')->whereNull('order_items.deleted_at')->where('order_items.created_at', '>=', now()->subDays(30))->groupBy('product_id')->selectRaw('product_id, COALESCE(SUM(quantity), 0) AS sales_30_days');

        return DB::table('products')->leftJoin('suppliers', 'suppliers.id', '=', 'products.supplier_id')->leftJoin('categories', 'categories.id', '=', 'products.category_id')->leftJoin('currencies', 'currencies.id', '=', 'products.currency_id')->leftJoin('product_beauty_profiles', 'product_beauty_profiles.product_id', '=', 'products.id')->leftJoinSub($stock, 'variant_stock', 'variant_stock.product_id', '=', 'products.id')->leftJoinSub($sales, 'product_sales', 'product_sales.product_id', '=', 'products.id')->whereNull('products.deleted_at')
            ->select(['products.id', 'products.uuid', 'products.sku', 'products.name', 'products.short_description', 'products.featured_image', 'products.price', 'products.status', 'products.approval_status', 'products.updated_at', 'suppliers.id as supplier_id', 'suppliers.company_name as supplier_name', 'categories.id as category_id', 'categories.name as category_name', 'currencies.code as currency', 'product_beauty_profiles.compliance_status', DB::raw('COALESCE(variant_stock.stock, 0) AS stock'), DB::raw('COALESCE(product_sales.sales_30_days, 0) AS sales_30_days')]);
    }

    private function applyFilters(Builder $query, array $filters): void
    {
        $this->applyContextFilters($query, $filters);
        $status = $filters['status'] ?? null;
        match ($status) {
            'live' => $query->where('products.status', 'active')->where('products.approval_status', 'approved'),
            'pending-review' => $query->where('products.approval_status', 'pending'),
            'draft', 'rejected' => $query->where('products.approval_status', $status),
            'suspended' => $query->where('products.status', 'inactive')->where('products.approval_status', 'approved'),
            'out-of-stock' => $query->whereRaw('COALESCE(variant_stock.stock, 0) = 0'),
            'low-stock' => $query->whereExists(fn ($v) => $v->from('product_variants')->whereColumn('product_variants.product_id', 'products.id')->whereNull('product_variants.deleted_at')->where('stock_quantity', '>', 0)->whereNotNull('low_stock_threshold')->whereColumn('stock_quantity', '<=', 'low_stock_threshold')),
            'high-risk' => $query->whereExists(fn ($r) => $r->from('risk_profiles')->whereColumn('risk_profiles.subject_id', 'products.id')->whereIn('risk_profiles.subject_type', self::PRODUCT_SUBJECTS)->whereIn('risk_profiles.risk_level', ['high', 'critical'])),
            default => null,
        };
    }

    private function applyContextFilters(Builder $query, array $filters): void
    {
        if ($search = $filters['search'] ?? null) {
            $term = '%'.mb_strtolower($search).'%';
            $query->where(fn ($q) => $q->whereRaw('LOWER(products.name) LIKE ?', [$term])->orWhereRaw('LOWER(products.sku) LIKE ?', [$term])->orWhereRaw('LOWER(suppliers.company_name) LIKE ?', [$term]));
        }
        if ($seller = $filters['sellerId'] ?? null) {
            $query->where('products.supplier_id', $seller);
        }
        if ($category = $filters['categoryId'] ?? null) {
            $query->where('products.category_id', $category);
        }
        if ($currency = $filters['currency'] ?? null) {
            $query->where('currencies.code', $currency);
        }
    }
}
