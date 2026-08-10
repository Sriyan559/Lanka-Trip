<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Product;
use App\Models\Supplier;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class InventoryOperationsApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_inventory_requires_admin_product_permission(): void
    {
        $this->getJson('/api/admin/catalogue/inventory')->assertUnauthorized();
        Sanctum::actingAs(User::factory()->create(['role' => 'buyer']));
        $this->getJson('/api/admin/catalogue/inventory')->assertForbidden();
    }

    public function test_inventory_uses_variant_stock_and_marks_missing_domains_unavailable(): void
    {
        Sanctum::actingAs(User::factory()->create(['role' => 'super_admin']));
        $supplier = Supplier::factory()->create(['company_name' => 'Authoritative Supplier']);
        $category = Category::factory()->create(['name' => 'Skincare']);
        $product = Product::factory()->create(['name' => 'Live Inventory Serum', 'supplier_id' => $supplier->id, 'category_id' => $category->id]);
        DB::table('product_variants')->insert(['uuid' => (string) Str::uuid(), 'product_id' => $product->id, 'sku' => 'LIVE-STOCK-1', 'name' => '30 ml', 'stock_quantity' => 7, 'low_stock_threshold' => 10, 'is_active' => true, 'status' => 'active', 'created_at' => now(), 'updated_at' => now()]);

        $this->getJson('/api/admin/catalogue/inventory?search=LIVE-STOCK-1&quickFilter=low-stock')
            ->assertOk()->assertJsonPath('data.pagination.total', 1)
            ->assertJsonPath('data.rows.0.name', 'Live Inventory Serum')
            ->assertJsonPath('data.rows.0.availableStock', 7)
            ->assertJsonPath('data.rows.0.batchNumber', 'Unavailable')
            ->assertJsonPath('data.kpis.lowStockProducts.value', 1)
            ->assertJsonPath('data.kpis.reservedStock.availability', 'unavailable')
            ->assertJsonPath('data.expiryExposure.availability', 'unavailable')
            ->assertJsonPath('data.capabilities.recordAdjustment', false);
    }

    public function test_inventory_export_is_server_generated(): void
    {
        Sanctum::actingAs(User::factory()->create(['role' => 'super_admin']));
        $product = Product::factory()->create();
        DB::table('product_variants')->insert(['uuid' => (string) Str::uuid(), 'product_id' => $product->id, 'sku' => 'EXPORT-1', 'name' => 'Default', 'stock_quantity' => 3, 'is_active' => true, 'status' => 'active', 'created_at' => now(), 'updated_at' => now()]);
        $this->get('/api/admin/catalogue/inventory/export?search=EXPORT-1')->assertOk()->assertHeader('content-type', 'text/csv; charset=UTF-8');
    }
}
