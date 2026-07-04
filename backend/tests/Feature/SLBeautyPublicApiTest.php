<?php

namespace Tests\Feature;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductBeautyProfile;
use App\Models\ProductVariant;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Tests\TestCase;

class SLBeautyPublicApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_public_brands_list_returns_active_verified_brands_only(): void
    {
        Brand::create([
            'uuid' => (string) Str::uuid(),
            'name' => 'Ceylon Glow',
            'slug' => 'ceylon-glow',
            'description' => 'Verified beauty brand.',
            'status' => 'active',
            'is_verified' => true,
        ]);
        Brand::create([
            'uuid' => (string) Str::uuid(),
            'name' => 'Draft Beauty',
            'slug' => 'draft-beauty',
            'status' => 'draft',
            'is_verified' => true,
        ]);
        Brand::create([
            'uuid' => (string) Str::uuid(),
            'name' => 'Unverified Beauty',
            'slug' => 'unverified-beauty',
            'status' => 'active',
            'is_verified' => false,
        ]);

        $response = $this->getJson('/api/sl-beauty/brands?search=Glow&per_page=10')
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('total', 1)
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.slug', 'ceylon-glow')
            ->assertJsonPath('data.0.is_verified', true);

        $brand = $response->json('data.0');

        $this->assertArrayNotHasKey('uuid', $brand);
        $this->assertArrayNotHasKey('created_by', $brand);
        $this->assertArrayNotHasKey('deleted_at', $brand);
        $this->assertArrayNotHasKey('status', $brand);
    }

    public function test_public_brand_show_returns_not_found_for_inactive_or_unverified_brands(): void
    {
        Brand::create([
            'uuid' => (string) Str::uuid(),
            'name' => 'Hidden Brand',
            'slug' => 'hidden-brand',
            'status' => 'inactive',
            'is_verified' => true,
        ]);
        Brand::create([
            'uuid' => (string) Str::uuid(),
            'name' => 'Pending Brand',
            'slug' => 'pending-brand',
            'status' => 'active',
            'is_verified' => false,
        ]);

        $this->getJson('/api/sl-beauty/brands/hidden-brand')->assertNotFound();
        $this->getJson('/api/sl-beauty/brands/pending-brand')->assertNotFound();
    }

    public function test_public_beauty_profile_returns_public_safe_fields_for_active_product(): void
    {
        $product = $this->activeProduct();
        ProductBeautyProfile::create([
            'product_id' => $product->id,
            'skin_type' => 'combination',
            'skin_concern' => 'hydration',
            'ingredients' => 'Aqua, glycerin',
            'how_to_use' => 'Apply after cleansing.',
            'warnings' => 'Patch test before use.',
            'spf_value' => 30,
            'formulation' => 'serum',
            'expiry_required' => true,
            'batch_tracking_required' => true,
            'compliance_status' => 'pending_review',
        ]);

        $response = $this->getJson("/api/sl-beauty/products/{$product->id}/beauty-profile")
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('beauty_profile.product_id', $product->id)
            ->assertJsonPath('beauty_profile.skin_type', 'combination')
            ->assertJsonPath('beauty_profile.compliance_approved', false);

        $profile = $response->json('beauty_profile');

        $this->assertArrayNotHasKey('id', $profile);
        $this->assertArrayNotHasKey('compliance_status', $profile);
        $this->assertArrayNotHasKey('created_at', $profile);
        $this->assertArrayNotHasKey('updated_at', $profile);
    }

    public function test_public_beauty_profile_requires_active_product_and_existing_profile(): void
    {
        $activeWithoutProfile = $this->activeProduct();
        $inactiveProduct = Product::factory()->inactive()->create([
            'category_id' => Category::factory()->create()->id,
        ]);

        $this->getJson("/api/sl-beauty/products/{$activeWithoutProfile->id}/beauty-profile")->assertNotFound();
        $this->getJson("/api/sl-beauty/products/{$inactiveProduct->id}/beauty-profile")->assertNotFound();
    }

    public function test_public_variants_returns_active_variants_only_and_hides_internal_fields(): void
    {
        $product = $this->activeProduct();
        $activeVariant = $this->variant($product, [
            'name' => 'Rose Cream 50 ml',
            'variant_name' => '50 ml',
            'sku' => 'ROSE-50',
            'barcode' => '123456789',
            'stock_quantity' => 12,
            'low_stock_threshold' => 3,
            'retail_price' => 2900,
            'metadata' => ['internal' => 'hidden'],
        ]);
        $this->variant($product, [
            'name' => 'Inactive Rose Cream',
            'status' => 'inactive',
            'is_active' => false,
        ]);

        $response = $this->getJson("/api/sl-beauty/products/{$product->id}/variants")
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.id', $activeVariant->id)
            ->assertJsonPath('data.0.stock_status', 'in_stock');

        $variant = $response->json('data.0');

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
            $this->assertArrayNotHasKey($unsafeField, $variant);
        }
    }

    public function test_public_beauty_summary_combines_profile_and_active_variants(): void
    {
        $product = $this->activeProduct();
        ProductBeautyProfile::create([
            'product_id' => $product->id,
            'hair_type' => 'curly',
            'hair_concern' => 'frizz',
            'compliance_status' => 'approved',
        ]);
        $variant = $this->variant($product, [
            'name' => 'Curl Balm 100 g',
            'variant_name' => '100 g',
        ]);
        $this->variant($product, [
            'name' => 'Inactive Curl Balm',
            'status' => 'inactive',
            'is_active' => false,
        ]);

        $this->getJson("/api/sl-beauty/products/{$product->id}/beauty-summary")
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('product_id', $product->id)
            ->assertJsonPath('beauty_profile.hair_type', 'curly')
            ->assertJsonPath('beauty_profile.compliance_approved', true)
            ->assertJsonCount(1, 'variants')
            ->assertJsonPath('variants.0.id', $variant->id);
    }

    public function test_taxonomy_feature_flag_can_disable_public_sl_beauty_endpoints(): void
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

        $this->getJson('/api/sl-beauty/brands')->assertNotFound();
    }

    private function activeProduct(): Product
    {
        return Product::factory()->create([
            'category_id' => Category::factory()->create()->id,
            'status' => 'active',
        ]);
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
}
