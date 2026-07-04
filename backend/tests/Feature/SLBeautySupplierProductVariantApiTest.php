<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\Supplier;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Tests\TestCase;

class SLBeautySupplierProductVariantApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_unauthenticated_user_cannot_access_supplier_variant_routes(): void
    {
        $product = $this->supplierProduct()[2];
        $variant = $this->variant($product);

        $this->getJson($this->variantsUrl($product))->assertUnauthorized();
        $this->postJson($this->variantsUrl($product), [])->assertUnauthorized();
        $this->getJson($this->variantUrl($product, $variant))->assertUnauthorized();
        $this->putJson($this->variantUrl($product, $variant), [])->assertUnauthorized();
        $this->patchJson($this->variantUrl($product, $variant).'/status', [])->assertUnauthorized();
        $this->deleteJson($this->variantUrl($product, $variant))->assertUnauthorized();
    }

    public function test_non_supplier_cannot_access_supplier_variant_routes(): void
    {
        $buyer = User::factory()->create(['role' => 'buyer']);
        $product = $this->supplierProduct()[2];

        $this->actingAs($buyer)
            ->getJson($this->variantsUrl($product))
            ->assertForbidden();
    }

    public function test_supplier_can_list_own_product_variants(): void
    {
        [$user, , $product] = $this->supplierProduct();
        $variant = $this->variant($product, [
            'name' => 'Rose Cream 50 ml',
            'sku' => 'ROSE-50',
            'stock_quantity' => 12,
        ]);

        $this->actingAs($user)
            ->getJson($this->variantsUrl($product))
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('total', 1)
            ->assertJsonPath('data.0.id', $variant->id)
            ->assertJsonPath('data.0.sku', 'ROSE-50')
            ->assertJsonPath('data.0.stock_quantity', 12);
    }

    public function test_supplier_cannot_list_another_suppliers_product_variants(): void
    {
        [$user] = $this->supplierProduct();
        [, , $otherProduct] = $this->supplierProduct();
        $this->variant($otherProduct);

        $this->actingAs($user)
            ->getJson($this->variantsUrl($otherProduct))
            ->assertNotFound();
    }

    public function test_supplier_can_create_variant_for_own_product(): void
    {
        [$user, , $product] = $this->supplierProduct();

        $this->actingAs($user)
            ->postJson($this->variantsUrl($product), [
                'name' => 'Hydrating Serum 30 ml',
                'variant_name' => '30 ml',
                'sku' => 'HYD-SERUM-30',
                'barcode' => '4791234567890',
                'shade_name' => 'Clear',
                'size_label' => '30 ml',
                'volume_ml' => 30,
                'retail_price' => 3200,
                'sale_price' => 2800,
                'stock_quantity' => 18,
                'low_stock_threshold' => 3,
                'status' => 'active',
                'is_active' => true,
            ])
            ->assertCreated()
            ->assertJsonPath('success', true)
            ->assertJsonPath('variant.product_id', $product->id)
            ->assertJsonPath('variant.name', 'Hydrating Serum 30 ml')
            ->assertJsonPath('variant.sku', 'HYD-SERUM-30')
            ->assertJsonPath('variant.stock_quantity', 18);

        $this->assertDatabaseHas('product_variants', [
            'product_id' => $product->id,
            'name' => 'Hydrating Serum 30 ml',
            'sku' => 'HYD-SERUM-30',
            'status' => 'active',
            'is_active' => true,
        ]);
    }

    public function test_request_body_product_id_uuid_and_currency_id_are_rejected(): void
    {
        [$user, , $product] = $this->supplierProduct();
        $otherProduct = $this->supplierProduct()[2];

        $this->actingAs($user)
            ->postJson($this->variantsUrl($product), [
                'product_id' => $otherProduct->id,
                'uuid' => (string) Str::uuid(),
                'currency_id' => 1,
                'name' => 'Unsafe Variant',
            ])
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['product_id', 'uuid', 'currency_id']);

        $this->assertDatabaseMissing('product_variants', [
            'product_id' => $otherProduct->id,
            'name' => 'Unsafe Variant',
        ]);
    }

    public function test_supplier_can_update_own_variant(): void
    {
        [$user, , $product] = $this->supplierProduct();
        $variant = $this->variant($product, [
            'name' => 'Original Variant',
            'sku' => 'ORIGINAL-SKU',
        ]);

        $this->actingAs($user)
            ->putJson($this->variantUrl($product, $variant), [
                'name' => 'Updated Variant',
                'sku' => 'UPDATED-SKU',
                'shade_name' => 'Nude Rose',
                'stock_quantity' => 7,
                'retail_price' => 4500,
            ])
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('variant.name', 'Updated Variant')
            ->assertJsonPath('variant.sku', 'UPDATED-SKU')
            ->assertJsonPath('variant.shade_name', 'Nude Rose')
            ->assertJsonPath('variant.stock_quantity', 7);

        $this->assertDatabaseHas('product_variants', [
            'id' => $variant->id,
            'name' => 'Updated Variant',
            'sku' => 'UPDATED-SKU',
            'stock_quantity' => 7,
        ]);
    }

    public function test_supplier_cannot_update_variant_from_another_product_or_supplier(): void
    {
        [$user, , $product] = $this->supplierProduct();
        [, , $otherProduct] = $this->supplierProduct();
        $otherVariant = $this->variant($otherProduct, [
            'name' => 'Other Supplier Variant',
        ]);

        $this->actingAs($user)
            ->putJson($this->variantUrl($product, $otherVariant), ['name' => 'Hijacked Variant'])
            ->assertNotFound();

        $this->assertDatabaseHas('product_variants', [
            'id' => $otherVariant->id,
            'name' => 'Other Supplier Variant',
        ]);
    }

    public function test_supplier_can_change_status_and_is_active_only(): void
    {
        [$user, , $product] = $this->supplierProduct();
        $variant = $this->variant($product, [
            'status' => 'draft',
            'is_active' => true,
        ]);

        $this->actingAs($user)
            ->patchJson($this->variantUrl($product, $variant).'/status', [
                'status' => 'inactive',
                'is_active' => false,
            ])
            ->assertOk()
            ->assertJsonPath('variant.status', 'inactive')
            ->assertJsonPath('variant.is_active', false);

        $this->assertDatabaseHas('product_variants', [
            'id' => $variant->id,
            'status' => 'inactive',
            'is_active' => false,
        ]);

        $this->actingAs($user)
            ->patchJson($this->variantUrl($product, $variant).'/status', [
                'name' => 'Not Allowed Here',
            ])
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['name']);
    }

    public function test_supplier_can_delete_own_variant_with_soft_delete(): void
    {
        [$user, , $product] = $this->supplierProduct();
        $variant = $this->variant($product);

        $this->actingAs($user)
            ->deleteJson($this->variantUrl($product, $variant))
            ->assertOk()
            ->assertExactJson([
                'success' => true,
                'message' => 'Product variant deleted successfully.',
            ]);

        $this->assertSoftDeleted('product_variants', ['id' => $variant->id]);
    }

    public function test_disabled_taxonomy_flag_returns_forbidden(): void
    {
        $this->disableTaxonomyFlag();
        [$user, , $product] = $this->supplierProduct();

        $this->actingAs($user)
            ->getJson($this->variantsUrl($product))
            ->assertForbidden();
    }

    public function test_public_variant_endpoint_still_hides_unsafe_fields(): void
    {
        $product = Product::factory()->create([
            'category_id' => Category::factory()->create()->id,
            'status' => 'active',
        ]);
        $variant = $this->variant($product, [
            'sku' => 'PUBLIC-HIDDEN-SKU',
            'barcode' => 'PUBLIC-HIDDEN-BARCODE',
            'stock_quantity' => 9,
            'retail_price' => 2500,
            'metadata' => ['internal' => 'hidden'],
            'status' => 'active',
            'is_active' => true,
        ]);

        $response = $this->getJson("/api/sl-beauty/products/{$product->id}/variants")
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.id', $variant->id);

        $publicVariant = $response->json('data.0');

        foreach ([
            'uuid',
            'sku',
            'barcode',
            'status',
            'retail_price',
            'sale_price',
            'price',
            'fob_price_min',
            'fob_price_max',
            'moq',
            'moq_unit',
            'stock_quantity',
            'low_stock_threshold',
            'lead_time_days',
            'is_default',
            'metadata',
            'created_at',
            'updated_at',
            'deleted_at',
        ] as $unsafeField) {
            $this->assertArrayNotHasKey($unsafeField, $publicVariant);
        }
    }

    /**
     * @return array{User, Supplier, Product}
     */
    private function supplierProduct(): array
    {
        $user = User::factory()->create(['role' => 'supplier']);
        $supplier = Supplier::factory()->create(['user_id' => $user->id]);
        $product = Product::factory()->create([
            'category_id' => Category::factory()->create()->id,
            'supplier_id' => $supplier->id,
            'status' => 'active',
        ]);

        return [$user, $supplier, $product];
    }

    /**
     * @param array<string, mixed> $overrides
     */
    private function variant(Product $product, array $overrides = []): ProductVariant
    {
        return ProductVariant::create([
            'uuid' => (string) Str::uuid(),
            'product_id' => $product->id,
            'sku' => 'SKU-'.Str::random(8),
            'name' => 'Beauty Variant',
            'slug' => 'beauty-variant-'.Str::random(8),
            'price' => 1500,
            'fob_price_min' => 1200,
            'fob_price_max' => 1800,
            'moq' => 10,
            'moq_unit' => 'Piece',
            'stock_quantity' => 5,
            'lead_time_days' => 7,
            'is_default' => false,
            'status' => 'active',
            'metadata' => ['note' => 'internal'],
            'variant_name' => 'Default',
            'barcode' => 'BAR-'.Str::random(8),
            'shade_name' => 'Rose',
            'shade_code' => '#cc6688',
            'size_label' => '50 ml',
            'volume_ml' => 50,
            'weight_g' => 80,
            'retail_price' => 2500,
            'sale_price' => 2200,
            'low_stock_threshold' => 2,
            'is_active' => true,
            ...$overrides,
        ]);
    }

    private function variantsUrl(Product $product): string
    {
        return "/api/supplier/sl-beauty/products/{$product->id}/variants";
    }

    private function variantUrl(Product $product, ProductVariant $variant): string
    {
        return "{$this->variantsUrl($product)}/{$variant->id}";
    }

    private function disableTaxonomyFlag(): void
    {
        DB::table('feature_flags')->insert([
            'uuid' => (string) Str::uuid(),
            'feature_key' => 'sl_beauty.taxonomy',
            'name' => 'SL Beauty Taxonomy',
            'is_enabled' => false,
            'status' => 'active',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
