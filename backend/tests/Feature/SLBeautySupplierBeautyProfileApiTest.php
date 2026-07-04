<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Product;
use App\Models\ProductBeautyProfile;
use App\Models\Supplier;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Tests\TestCase;

class SLBeautySupplierBeautyProfileApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_unauthenticated_user_cannot_access_supplier_beauty_profile_routes(): void
    {
        $product = $this->supplierProduct()[2];

        $this->getJson($this->profileUrl($product))->assertUnauthorized();
        $this->putJson($this->profileUrl($product), [])->assertUnauthorized();
        $this->postJson($this->profileUrl($product).'/submit-compliance')->assertUnauthorized();
    }

    public function test_non_supplier_cannot_access_supplier_beauty_profile_routes(): void
    {
        $buyer = User::factory()->create(['role' => 'buyer']);
        $product = $this->supplierProduct()[2];

        $this->actingAs($buyer)
            ->getJson($this->profileUrl($product))
            ->assertForbidden();
    }

    public function test_supplier_can_view_own_product_beauty_profile(): void
    {
        [$user, , $product] = $this->supplierProduct();
        ProductBeautyProfile::create([
            'product_id' => $product->id,
            'skin_type' => 'combination',
            'skin_concern' => 'hydration',
            'ingredients' => 'Aqua, glycerin',
            'compliance_status' => 'not_required',
        ]);

        $this->actingAs($user)
            ->getJson($this->profileUrl($product))
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('beauty_profile.product_id', $product->id)
            ->assertJsonPath('beauty_profile.skin_type', 'combination')
            ->assertJsonPath('beauty_profile.compliance_status', 'not_required');
    }

    public function test_supplier_cannot_view_another_suppliers_product_beauty_profile(): void
    {
        [$user] = $this->supplierProduct();
        [, , $otherProduct] = $this->supplierProduct();
        ProductBeautyProfile::create([
            'product_id' => $otherProduct->id,
            'skin_type' => 'oily',
        ]);

        $this->actingAs($user)
            ->getJson($this->profileUrl($otherProduct))
            ->assertNotFound();
    }

    public function test_supplier_can_create_and_update_own_product_beauty_profile(): void
    {
        [$user, , $product] = $this->supplierProduct();

        $this->actingAs($user)
            ->putJson($this->profileUrl($product), [
                'skin_type' => 'dry',
                'skin_concern' => 'hydration',
                'ingredients' => 'Aqua, shea butter',
                'expiry_required' => true,
                'batch_tracking_required' => true,
            ])
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('beauty_profile.product_id', $product->id)
            ->assertJsonPath('beauty_profile.skin_type', 'dry')
            ->assertJsonPath('beauty_profile.expiry_required', true)
            ->assertJsonPath('beauty_profile.compliance_status', 'not_required');

        $this->assertDatabaseHas('product_beauty_profiles', [
            'product_id' => $product->id,
            'skin_type' => 'dry',
            'skin_concern' => 'hydration',
            'compliance_status' => 'not_required',
        ]);

        $this->actingAs($user)
            ->putJson($this->profileUrl($product), [
                'skin_type' => 'sensitive',
                'warnings' => 'Patch test before use.',
            ])
            ->assertOk()
            ->assertJsonPath('beauty_profile.skin_type', 'sensitive')
            ->assertJsonPath('beauty_profile.warnings', 'Patch test before use.');

        $this->assertDatabaseCount('product_beauty_profiles', 1);
    }

    public function test_request_body_product_id_is_rejected(): void
    {
        [$user, , $product] = $this->supplierProduct();
        $otherProduct = $this->supplierProduct()[2];

        $this->actingAs($user)
            ->putJson($this->profileUrl($product), [
                'product_id' => $otherProduct->id,
                'skin_type' => 'normal',
            ])
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['product_id']);
    }

    public function test_supplier_cannot_set_approved_compliance_status_through_put(): void
    {
        [$user, , $product] = $this->supplierProduct();

        $this->actingAs($user)
            ->putJson($this->profileUrl($product), [
                'skin_type' => 'normal',
                'compliance_status' => 'approved',
            ])
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['compliance_status']);

        $this->assertDatabaseMissing('product_beauty_profiles', [
            'product_id' => $product->id,
            'compliance_status' => 'approved',
        ]);
    }

    public function test_submit_compliance_requires_compliance_feature_flag(): void
    {
        [$user, , $product] = $this->supplierProduct();
        ProductBeautyProfile::create([
            'product_id' => $product->id,
            'skin_type' => 'normal',
            'compliance_status' => 'not_required',
        ]);

        $this->actingAs($user)
            ->postJson($this->profileUrl($product).'/submit-compliance')
            ->assertForbidden();
    }

    public function test_submit_compliance_sets_allowed_profile_status_to_pending_review(): void
    {
        $this->enableFeatureFlag('sl_beauty.compliance_workflows');
        [$user, , $product] = $this->supplierProduct();
        ProductBeautyProfile::create([
            'product_id' => $product->id,
            'skin_type' => 'normal',
            'compliance_status' => 'not_required',
        ]);

        $this->actingAs($user)
            ->postJson($this->profileUrl($product).'/submit-compliance')
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('beauty_profile.compliance_status', 'pending_review');

        $this->assertDatabaseHas('product_beauty_profiles', [
            'product_id' => $product->id,
            'compliance_status' => 'pending_review',
        ]);
    }

    public function test_existing_public_beauty_profile_endpoint_still_returns_public_safe_response(): void
    {
        [, , $product] = $this->supplierProduct();
        ProductBeautyProfile::create([
            'product_id' => $product->id,
            'skin_type' => 'combination',
            'compliance_status' => 'pending_review',
        ]);

        $response = $this->getJson("/api/sl-beauty/products/{$product->id}/beauty-profile")
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('beauty_profile.product_id', $product->id)
            ->assertJsonPath('beauty_profile.skin_type', 'combination');

        $profile = $response->json('beauty_profile');

        $this->assertArrayNotHasKey('id', $profile);
        $this->assertArrayNotHasKey('compliance_status', $profile);
        $this->assertArrayNotHasKey('created_at', $profile);
        $this->assertArrayNotHasKey('updated_at', $profile);
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

    private function profileUrl(Product $product): string
    {
        return "/api/supplier/sl-beauty/products/{$product->id}/beauty-profile";
    }

    private function enableFeatureFlag(string $featureKey): void
    {
        DB::table('feature_flags')->insert([
            'uuid' => (string) Str::uuid(),
            'feature_key' => $featureKey,
            'name' => $featureKey,
            'is_enabled' => true,
            'status' => 'active',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
