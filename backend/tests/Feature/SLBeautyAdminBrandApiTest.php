<?php

namespace Tests\Feature;

use App\Models\Brand;
use App\Models\SellerBrandAuthorization;
use App\Models\Supplier;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Tests\TestCase;

class SLBeautyAdminBrandApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_unauthenticated_user_cannot_access_admin_brand_routes(): void
    {
        $brand = $this->brand();

        $this->getJson($this->brandsUrl())->assertUnauthorized();
        $this->postJson($this->brandsUrl(), [])->assertUnauthorized();
        $this->getJson($this->brandUrl($brand))->assertUnauthorized();
        $this->putJson($this->brandUrl($brand), [])->assertUnauthorized();
        $this->patchJson($this->brandUrl($brand).'/status', [])->assertUnauthorized();
        $this->deleteJson($this->brandUrl($brand))->assertUnauthorized();
    }

    public function test_non_admin_cannot_access_admin_brand_routes(): void
    {
        $this->enableVerificationFlag();
        $buyer = User::factory()->create(['role' => 'buyer']);

        $this->actingAs($buyer)
            ->getJson($this->brandsUrl())
            ->assertForbidden();
    }

    public function test_admin_can_list_brands_with_safe_filters(): void
    {
        $this->enableVerificationFlag();
        $admin = $this->admin();
        $matchingBrand = $this->brand([
            'name' => 'Ceylon Glow',
            'slug' => 'ceylon-glow',
            'status' => 'active',
            'is_verified' => true,
        ]);
        $this->brand([
            'name' => 'Draft Beauty',
            'slug' => 'draft-beauty',
            'status' => 'draft',
            'is_verified' => true,
        ]);
        $this->brand([
            'name' => 'Unverified Glow',
            'slug' => 'unverified-glow',
            'status' => 'active',
            'is_verified' => false,
        ]);

        $this->actingAs($admin)
            ->getJson($this->brandsUrl().'?search=Glow&status=active&is_verified=1&per_page=10')
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('total', 1)
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.id', $matchingBrand->id)
            ->assertJsonPath('data.0.uuid', $matchingBrand->uuid)
            ->assertJsonPath('data.0.status', 'active')
            ->assertJsonPath('data.0.is_verified', true);
    }

    public function test_admin_can_create_brand(): void
    {
        $this->enableVerificationFlag();
        $admin = $this->admin();

        $this->actingAs($admin)
            ->postJson($this->brandsUrl(), [
                'name' => 'Lanka Botanics',
                'description' => 'Sri Lankan beauty brand.',
                'website_url' => 'https://example.com',
                'status' => 'active',
                'is_verified' => true,
            ])
            ->assertCreated()
            ->assertJsonPath('success', true)
            ->assertJsonPath('brand.name', 'Lanka Botanics')
            ->assertJsonPath('brand.slug', 'lanka-botanics')
            ->assertJsonPath('brand.status', 'active')
            ->assertJsonPath('brand.is_verified', true)
            ->assertJsonPath('brand.created_by', $admin->id);

        $this->assertDatabaseHas('brands', [
            'name' => 'Lanka Botanics',
            'slug' => 'lanka-botanics',
            'created_by' => $admin->id,
        ]);
    }

    public function test_admin_can_update_brand(): void
    {
        $this->enableVerificationFlag();
        $admin = $this->admin();
        $brand = $this->brand([
            'name' => 'Original Beauty',
            'description' => 'Original description.',
        ]);

        $this->actingAs($admin)
            ->putJson($this->brandUrl($brand), [
                'name' => 'Updated Beauty',
                'description' => 'Updated description.',
                'website_url' => 'https://updated.example.com',
            ])
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('brand.name', 'Updated Beauty')
            ->assertJsonPath('brand.description', 'Updated description.')
            ->assertJsonPath('brand.slug', $brand->slug);

        $this->assertDatabaseHas('brands', [
            'id' => $brand->id,
            'name' => 'Updated Beauty',
            'description' => 'Updated description.',
        ]);
    }

    public function test_admin_can_change_status_and_verification_only(): void
    {
        $this->enableVerificationFlag();
        $admin = $this->admin();
        $brand = $this->brand([
            'status' => 'draft',
            'is_verified' => false,
        ]);

        $this->actingAs($admin)
            ->patchJson($this->brandUrl($brand).'/status', [
                'status' => 'active',
                'is_verified' => true,
            ])
            ->assertOk()
            ->assertJsonPath('brand.status', 'active')
            ->assertJsonPath('brand.is_verified', true);

        $this->actingAs($admin)
            ->patchJson($this->brandUrl($brand).'/status', [
                'name' => 'Unsafe rename',
            ])
            ->assertUnprocessable()
            ->assertJsonValidationErrors('name');

        $this->assertDatabaseHas('brands', [
            'id' => $brand->id,
            'name' => $brand->name,
            'status' => 'active',
            'is_verified' => true,
        ]);
    }

    public function test_admin_can_soft_delete_brand_when_safe(): void
    {
        $this->enableVerificationFlag();
        $admin = $this->admin();
        $brand = $this->brand();

        $this->actingAs($admin)
            ->deleteJson($this->brandUrl($brand))
            ->assertOk()
            ->assertExactJson([
                'success' => true,
                'message' => 'Brand deleted successfully.',
            ]);

        $this->assertSoftDeleted('brands', ['id' => $brand->id]);
    }

    public function test_admin_brand_delete_blocks_active_authorizations(): void
    {
        $this->enableVerificationFlag();
        $admin = $this->admin();
        $brand = $this->brand();
        SellerBrandAuthorization::create([
            'supplier_id' => Supplier::factory()->create()->id,
            'brand_id' => $brand->id,
            'status' => 'approved',
        ]);

        $this->actingAs($admin)
            ->deleteJson($this->brandUrl($brand))
            ->assertStatus(409);

        $this->assertDatabaseHas('brands', [
            'id' => $brand->id,
            'deleted_at' => null,
        ]);
    }

    public function test_disabled_brand_seller_verification_flag_returns_forbidden(): void
    {
        $this->disableVerificationFlag();
        $admin = $this->admin();

        $this->actingAs($admin)
            ->getJson($this->brandsUrl())
            ->assertForbidden();
    }

    public function test_public_brand_endpoint_still_returns_active_verified_brands_only(): void
    {
        $this->enableVerificationFlag();
        $activeVerified = $this->brand([
            'name' => 'Public Beauty',
            'slug' => 'public-beauty',
            'status' => 'active',
            'is_verified' => true,
        ]);
        $this->brand([
            'name' => 'Inactive Beauty',
            'slug' => 'inactive-beauty',
            'status' => 'inactive',
            'is_verified' => true,
        ]);
        $this->brand([
            'name' => 'Unverified Beauty',
            'slug' => 'unverified-beauty',
            'status' => 'active',
            'is_verified' => false,
        ]);

        $this->getJson('/api/sl-beauty/brands?per_page=10')
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('total', 1)
            ->assertJsonPath('data.0.id', $activeVerified->id)
            ->assertJsonPath('data.0.slug', 'public-beauty');
    }

    private function admin(): User
    {
        return User::factory()->create(['role' => 'admin']);
    }

    /**
     * @param array<string, mixed> $overrides
     */
    private function brand(array $overrides = []): Brand
    {
        return Brand::create([
            'uuid' => (string) Str::uuid(),
            'name' => 'Ceylon Glow '.Str::random(6),
            'slug' => 'ceylon-glow-'.Str::random(8),
            'description' => 'Verified beauty brand.',
            'status' => 'active',
            'is_verified' => true,
            ...$overrides,
        ]);
    }

    private function brandsUrl(): string
    {
        return '/api/admin/sl-beauty/brands';
    }

    private function brandUrl(Brand $brand): string
    {
        return "{$this->brandsUrl()}/{$brand->id}";
    }

    private function enableVerificationFlag(): void
    {
        $this->setVerificationFlag(true);
    }

    private function disableVerificationFlag(): void
    {
        $this->setVerificationFlag(false);
    }

    private function setVerificationFlag(bool $enabled): void
    {
        DB::table('feature_flags')->insert([
            'uuid' => (string) Str::uuid(),
            'feature_key' => 'sl_beauty.brand_seller_verification',
            'name' => 'SL Beauty Brand Seller Verification',
            'is_enabled' => $enabled,
            'status' => 'active',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
