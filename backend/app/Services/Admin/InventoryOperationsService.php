<?php

namespace App\Services\Admin;

use Illuminate\Database\Query\Builder;
use Illuminate\Support\Facades\DB;

class InventoryOperationsService
{
    public const BLOCKERS = [
        'batches' => 'No inventory batch or lot table exists.',
        'locations' => 'No warehouse, inventory location, or bin domain exists.',
        'reservations' => 'No inventory reservation or allocation domain exists.',
        'movements' => 'No stock ledger or inventory movement table exists.',
        'expiry' => 'Expiry and manufacturing dates are not stored against inventory.',
        'quarantine' => 'No quarantine case or quarantine balance domain exists.',
        'recalls' => 'No inventory recall workflow or recall case domain exists.',
        'brands' => 'Products have no direct brand relationship.',
        'tenancy' => 'Products and variants do not contain a tenant or business-unit key.',
    ];

    public function dashboard(array $filters, array $permissions): array
    {
        $query = $this->query($filters);
        $pageSize = (int) ($filters['pageSize'] ?? 25);
        $page = (int) ($filters['page'] ?? 1);
        $sort = $filters['sort'] ?? 'updated-desc';
        match ($sort) {
            'name-asc' => $query->orderBy('products.name'),
            'stock-asc' => $query->orderBy('product_variants.stock_quantity'),
            'stock-desc' => $query->orderByDesc('product_variants.stock_quantity'),
            default => $query->orderByDesc('product_variants.updated_at'),
        };
        $result = $query->paginate($pageSize, ['*'], 'page', $page);

        return [
            'context' => $this->context(isset($filters['productId']) ? (int) $filters['productId'] : null),
            'kpis' => $this->kpis($filters),
            'rows' => collect($result->items())->map(fn ($row) => $this->row($row))->values(),
            'pagination' => ['page' => $result->currentPage(), 'pageSize' => $result->perPage(), 'total' => $result->total(), 'lastPage' => $result->lastPage()],
            'options' => $this->options(),
            'expiryExposure' => ['availability' => 'unavailable', 'currency' => null, 'buckets' => [], 'totalValueAtRisk' => null, 'reason' => self::BLOCKERS['expiry']],
            'alerts' => $this->alerts(),
            'recallStatus' => ['availability' => 'unavailable', 'metrics' => [], 'reason' => self::BLOCKERS['recalls']],
            'quickQueue' => [],
            'inventoryHealth' => ['availability' => 'partial', 'lowStockProducts' => $this->lowStockCount($filters), 'outOfStockProducts' => $this->outOfStockCount($filters), 'accuracyPercent' => null, 'unresolvedAdjustments' => null],
            'capabilities' => ['export' => false, 'viewMovements' => false, 'manageLocations' => false, 'createBatch' => false, 'recordAdjustment' => false, 'startRecall' => false, 'supportedQuickFilters' => ['low-stock', 'out-of-stock', 'negative-stock'], 'blockers' => self::BLOCKERS],
            'permissions' => $permissions,
            'generatedAt' => now()->toIso8601String(),
        ];
    }

    public function query(array $filters): Builder
    {
        $query = DB::table('product_variants')->join('products', 'products.id', '=', 'product_variants.product_id')
            ->leftJoin('suppliers', 'suppliers.id', '=', 'products.supplier_id')->leftJoin('categories', 'categories.id', '=', 'products.category_id')
            ->whereNull('product_variants.deleted_at')->whereNull('products.deleted_at')
            ->select(['product_variants.id as variant_id', 'product_variants.uuid as variant_uuid', 'product_variants.product_id', 'product_variants.name as variant_name', 'product_variants.sku as variant_sku', 'product_variants.barcode', 'product_variants.stock_quantity', 'product_variants.low_stock_threshold', 'product_variants.is_active', 'product_variants.updated_at', 'products.uuid as product_uuid', 'products.sku as product_sku', 'products.name as product_name', 'products.featured_image', 'products.status as product_status', 'suppliers.id as supplier_id', 'suppliers.company_name as supplier_name', 'categories.id as category_id', 'categories.name as category_name']);
        if (! empty($filters['productId'])) {
            $query->where('products.id', (int) $filters['productId']);
        }
        if ($search = trim((string) ($filters['search'] ?? ''))) {
            $like = '%'.mb_strtolower($search).'%';
            $query->where(fn ($q) => $q->whereRaw('LOWER(products.name) LIKE ?', [$like])->orWhereRaw('LOWER(COALESCE(product_variants.sku, ?)) LIKE ?', ['', $like])->orWhereRaw('LOWER(COALESCE(product_variants.barcode, ?)) LIKE ?', ['', $like])->orWhereRaw('LOWER(product_variants.name) LIKE ?', [$like]));
        }
        foreach (['supplierId' => 'products.supplier_id', 'categoryId' => 'products.category_id', 'variantId' => 'product_variants.id'] as $key => $column) {
            if (! empty($filters[$key])) {
                $query->where($column, (int) $filters[$key]);
            }
        }

        return match ($filters['quickFilter'] ?? null) {
            'low-stock' => $query->where('product_variants.stock_quantity', '>', 0)->whereNotNull('product_variants.low_stock_threshold')->whereColumn('product_variants.stock_quantity', '<=', 'product_variants.low_stock_threshold'),
            'out-of-stock' => $query->where('product_variants.stock_quantity', '<=', 0),
            'negative-stock' => $query->where('product_variants.stock_quantity', '<', 0),
            default => $query,
        };
    }

    public function row(object $row): array
    {
        $stock = (int) ($row->stock_quantity ?? 0);

        return ['id' => (string) $row->variant_id, 'dbId' => (string) $row->product_id, 'publicRef' => $row->product_uuid ?: 'PRODUCT-'.str_pad((string) $row->product_id, 6, '0', STR_PAD_LEFT), 'name' => $row->product_name, 'variant' => $row->variant_name, 'brand' => 'Unavailable', 'supplier' => $row->supplier_name ?: 'Unassigned', 'category' => $row->category_name ?: 'Unassigned', 'sku' => $row->variant_sku ?: ($row->product_sku ?: '—'), 'barcode' => $row->barcode ?: '—', 'batchNumber' => 'Unavailable', 'location' => 'Unavailable', 'onHandStock' => $stock, 'availableStock' => $stock, 'reservedStock' => null, 'quarantinedStock' => null, 'mfgDate' => null, 'expDate' => null, 'shelfLife' => null, 'shelfLifeStatus' => 'Unavailable', 'batchStatus' => 'Unavailable', 'recallStatus' => 'Unavailable', 'riskScore' => 'Unavailable', 'imageUrl' => $row->featured_image ?: '/images/product-placeholder.svg', 'productId' => (string) $row->product_id, 'updatedAt' => $row->updated_at];
    }

    private function kpis(array $filters): array
    {
        $base = DB::table('product_variants')->join('products', 'products.id', '=', 'product_variants.product_id')->whereNull('product_variants.deleted_at')->whereNull('products.deleted_at');
        if (! empty($filters['productId'])) {
            $base->where('products.id', (int) $filters['productId']);
        }
        $active = (clone $base)->where('product_variants.is_active', true)->sum('product_variants.stock_quantity');

        return ['totalActiveStock' => ['value' => (int) $active, 'availability' => 'partial', 'definition' => 'Sum of active variant stock_quantity.'], 'availableStock' => ['value' => (int) $active, 'availability' => 'partial', 'definition' => 'Variant stock_quantity; reservations, quarantine, recalls and allocations are not modeled.'], 'reservedStock' => $this->unavailable('reservations'), 'lowStockProducts' => ['value' => $this->lowStockCount($filters), 'availability' => 'available'], 'outOfStockProducts' => ['value' => $this->outOfStockCount($filters), 'availability' => 'available'], 'nearExpiryUnits' => $this->unavailable('expiry'), 'expiredUnits' => $this->unavailable('expiry'), 'quarantinedStock' => $this->unavailable('quarantine'), 'recalledProducts' => $this->unavailable('recalls')];
    }

    private function lowStockCount(array $filters): int
    {
        $q = DB::table('product_variants')->join('products', 'products.id', '=', 'product_variants.product_id')->whereNull('product_variants.deleted_at')->whereNull('products.deleted_at')->where('product_variants.stock_quantity', '>', 0)->whereNotNull('product_variants.low_stock_threshold')->whereColumn('product_variants.stock_quantity', '<=', 'product_variants.low_stock_threshold');
        if (! empty($filters['productId'])) {
            $q->where('products.id', (int) $filters['productId']);
        }

        return $q->distinct()->count('products.id');
    }

    private function outOfStockCount(array $filters): int
    {
        $q = DB::table('products')->whereNull('products.deleted_at')->whereExists(fn ($v) => $v->from('product_variants')->whereColumn('product_variants.product_id', 'products.id')->whereNull('product_variants.deleted_at'))->whereNotExists(fn ($v) => $v->from('product_variants')->whereColumn('product_variants.product_id', 'products.id')->whereNull('product_variants.deleted_at')->where('stock_quantity', '>', 0));
        if (! empty($filters['productId'])) {
            $q->where('products.id', (int) $filters['productId']);
        }

        return $q->count();
    }

    private function unavailable(string $key): array
    {
        return ['value' => null, 'availability' => 'unavailable', 'reason' => self::BLOCKERS[$key]];
    }

    private function alerts(): array
    {
        $negative = DB::table('product_variants')->whereNull('deleted_at')->where('stock_quantity', '<', 0)->count();

        return [['key' => 'negative-stock', 'label' => 'Negative Stock Detected', 'count' => $negative, 'availability' => 'available'], ['key' => 'stock-mismatch', 'label' => 'Stock Mismatch', 'count' => null, 'availability' => 'unavailable', 'reason' => self::BLOCKERS['movements']], ['key' => 'missing-batch', 'label' => 'Missing Batch Number', 'count' => null, 'availability' => 'unavailable', 'reason' => self::BLOCKERS['batches']], ['key' => 'missing-expiry', 'label' => 'Missing Expiry Date', 'count' => null, 'availability' => 'unavailable', 'reason' => self::BLOCKERS['expiry']], ['key' => 'unusual-adjustment', 'label' => 'Unusual Adjustment', 'count' => null, 'availability' => 'unavailable', 'reason' => self::BLOCKERS['movements']]];
    }

    private function options(): array
    {
        return ['suppliers' => DB::table('suppliers')->orderBy('company_name')->get(['id', 'company_name as name']), 'categories' => DB::table('categories')->orderBy('name')->get(['id', 'name']), 'variants' => DB::table('product_variants')->whereNull('deleted_at')->orderBy('name')->get(['id', 'name', 'sku']), 'brands' => [], 'locations' => []];
    }

    private function context(?int $productId): ?array
    {
        if (! $productId) {
            return null;
        } $row = DB::table('products')->leftJoin('suppliers', 'suppliers.id', '=', 'products.supplier_id')->where('products.id', $productId)->whereNull('products.deleted_at')->first(['products.id', 'products.uuid', 'products.name', 'suppliers.company_name as supplier']);

        return $row ? ['id' => (string) $row->id, 'publicRef' => $row->uuid ?: 'PRODUCT-'.str_pad((string) $row->id, 6, '0', STR_PAD_LEFT), 'name' => $row->name, 'brand' => 'Unavailable', 'supplier' => $row->supplier ?: 'Unassigned'] : null;
    }
}
