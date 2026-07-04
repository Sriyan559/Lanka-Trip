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

class SLBeautySupplierBrandAuthorizationApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_unauthenticated_user_cannot_access_supplier_brand_authorization_routes(): void
    {
        $authorization = $this->authorization($this->supplierUser()[1]);

        $this->getJson($this->authorizationsUrl())->assertUnauthorized();
        $this->postJson($this->authorizationsUrl(), [])->assertUnauthorized();
        $this->getJson($this->authorizationUrl($authorization))->assertUnauthorized();
        $this->putJson($this->authorizationUrl($authorization), [])->assertUnauthorized();
        $this->postJson($this->authorizationUrl($authorization).'/submit')->assertUnauthorized();
        $this->deleteJson($this->authorizationUrl($authorization))->assertUnauthorized();
    }

    public function test_non_supplier_cannot_access_supplier_brand_authorization_routes(): void
    {
        $this->enableVerificationFlag();
        $buyer = User::factory()->create(['role' => 'buyer']);

        $this->actingAs($buyer)
            ->getJson($this->authorizationsUrl())
            ->assertForbidden();
    }

    public function test_supplier_can_list_only_own_authorizations(): void
    {
        $this->enableVerificationFlag();
        [$user, $supplier] = $this->supplierUser();
        $ownAuthorization = $this->authorization($supplier, [
            'territory' => 'Sri Lanka',
        ]);
        $this->authorization($this->supplierUser()[1], [
            'territory' => 'Maldives',
        ]);

        $this->actingAs($user)
            ->getJson($this->authorizationsUrl())
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('total', 1)
            ->assertJsonPath('data.0.id', $ownAuthorization->id)
            ->assertJsonPath('data.0.territory', 'Sri Lanka');
    }

    public function test_supplier_can_create_draft_authorization(): void
    {
        $this->enableVerificationFlag();
        [$user, $supplier] = $this->supplierUser();
        $brand = $this->brand();

        $this->actingAs($user)
            ->postJson($this->authorizationsUrl(), [
                'brand_id' => $brand->id,
                'authorization_type' => 'authorized_distributor',
                'territory' => 'Sri Lanka',
                'document_path' => '/storage/authorizations/auth.pdf',
                'starts_at' => '2026-07-04',
                'expires_at' => '2027-07-04',
            ])
            ->assertCreated()
            ->assertJsonPath('success', true)
            ->assertJsonPath('authorization.supplier_id', $supplier->id)
            ->assertJsonPath('authorization.brand_id', $brand->id)
            ->assertJsonPath('authorization.status', 'draft')
            ->assertJsonPath('authorization.authorization_type', 'authorized_distributor');

        $this->assertDatabaseHas('seller_brand_authorizations', [
            'supplier_id' => $supplier->id,
            'brand_id' => $brand->id,
            'status' => 'draft',
            'territory' => 'Sri Lanka',
        ]);
    }

    public function test_request_body_supplier_id_status_and_review_fields_are_rejected(): void
    {
        $this->enableVerificationFlag();
        [$user] = $this->supplierUser();
        $otherSupplier = $this->supplierUser()[1];
        $brand = $this->brand();

        $this->actingAs($user)
            ->postJson($this->authorizationsUrl(), [
                'supplier_id' => $otherSupplier->id,
                'brand_id' => $brand->id,
                'status' => 'approved',
                'reviewed_by' => User::factory()->create(['role' => 'admin'])->id,
                'reviewed_at' => now()->toDateTimeString(),
                'review_notes' => 'Unsafe approval.',
            ])
            ->assertUnprocessable()
            ->assertJsonValidationErrors([
                'supplier_id',
                'status',
                'reviewed_by',
                'reviewed_at',
                'review_notes',
            ]);

        $this->assertDatabaseMissing('seller_brand_authorizations', [
            'supplier_id' => $otherSupplier->id,
            'brand_id' => $brand->id,
            'status' => 'approved',
        ]);
    }

    public function test_supplier_can_view_own_authorization(): void
    {
        $this->enableVerificationFlag();
        [$user, $supplier] = $this->supplierUser();
        $authorization = $this->authorization($supplier, [
            'authorization_type' => 'importer',
        ]);

        $this->actingAs($user)
            ->getJson($this->authorizationUrl($authorization))
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('authorization.id', $authorization->id)
            ->assertJsonPath('authorization.authorization_type', 'importer');
    }

    public function test_supplier_cannot_view_another_suppliers_authorization(): void
    {
        $this->enableVerificationFlag();
        [$user] = $this->supplierUser();
        $otherAuthorization = $this->authorization($this->supplierUser()[1]);

        $this->actingAs($user)
            ->getJson($this->authorizationUrl($otherAuthorization))
            ->assertNotFound();
    }

    public function test_supplier_can_update_own_draft_or_rejected_authorization(): void
    {
        $this->enableVerificationFlag();
        [$user, $supplier] = $this->supplierUser();
        $draft = $this->authorization($supplier, [
            'status' => 'draft',
            'territory' => 'Sri Lanka',
        ]);
        $rejected = $this->authorization($supplier, [
            'status' => 'rejected',
            'territory' => 'Sri Lanka',
        ]);

        $this->actingAs($user)
            ->putJson($this->authorizationUrl($draft), [
                'territory' => 'Sri Lanka and Maldives',
                'authorization_type' => 'reseller',
            ])
            ->assertOk()
            ->assertJsonPath('authorization.territory', 'Sri Lanka and Maldives')
            ->assertJsonPath('authorization.authorization_type', 'reseller');

        $this->actingAs($user)
            ->putJson($this->authorizationUrl($rejected), [
                'territory' => 'South Asia',
            ])
            ->assertOk()
            ->assertJsonPath('authorization.territory', 'South Asia');
    }

    public function test_supplier_cannot_update_submitted_approved_suspended_or_expired_authorization(): void
    {
        $this->enableVerificationFlag();
        [$user, $supplier] = $this->supplierUser();

        foreach (['submitted', 'approved', 'suspended', 'expired'] as $status) {
            $authorization = $this->authorization($supplier, [
                'status' => $status,
                'territory' => 'Original',
            ]);

            $this->actingAs($user)
                ->putJson($this->authorizationUrl($authorization), ['territory' => 'Changed'])
                ->assertForbidden();

            $this->assertDatabaseHas('seller_brand_authorizations', [
                'id' => $authorization->id,
                'territory' => 'Original',
                'status' => $status,
            ]);
        }
    }

    public function test_supplier_can_submit_own_draft_or_rejected_authorization(): void
    {
        $this->enableVerificationFlag();
        [$user, $supplier] = $this->supplierUser();
        $draft = $this->authorization($supplier, ['status' => 'draft']);
        $rejected = $this->authorization($supplier, ['status' => 'rejected']);

        $this->actingAs($user)
            ->postJson($this->authorizationUrl($draft).'/submit')
            ->assertOk()
            ->assertJsonPath('authorization.status', 'submitted');

        $this->actingAs($user)
            ->postJson($this->authorizationUrl($rejected).'/submit')
            ->assertOk()
            ->assertJsonPath('authorization.status', 'submitted');

        $this->assertDatabaseHas('seller_brand_authorizations', [
            'id' => $draft->id,
            'status' => 'submitted',
        ]);
        $this->assertDatabaseHas('seller_brand_authorizations', [
            'id' => $rejected->id,
            'status' => 'submitted',
        ]);
    }

    public function test_supplier_can_delete_only_own_draft_authorization(): void
    {
        $this->enableVerificationFlag();
        [$user, $supplier] = $this->supplierUser();
        $draft = $this->authorization($supplier, ['status' => 'draft']);
        $submitted = $this->authorization($supplier, ['status' => 'submitted']);
        $otherDraft = $this->authorization($this->supplierUser()[1], ['status' => 'draft']);

        $this->actingAs($user)
            ->deleteJson($this->authorizationUrl($draft))
            ->assertOk()
            ->assertExactJson([
                'success' => true,
                'message' => 'Brand authorization deleted successfully.',
            ]);

        $this->assertDatabaseMissing('seller_brand_authorizations', ['id' => $draft->id]);

        $this->actingAs($user)
            ->deleteJson($this->authorizationUrl($submitted))
            ->assertForbidden();
        $this->assertDatabaseHas('seller_brand_authorizations', ['id' => $submitted->id]);

        $this->actingAs($user)
            ->deleteJson($this->authorizationUrl($otherDraft))
            ->assertNotFound();
        $this->assertDatabaseHas('seller_brand_authorizations', ['id' => $otherDraft->id]);
    }

    public function test_disabled_brand_seller_verification_flag_returns_forbidden(): void
    {
        $this->disableVerificationFlag();
        [$user] = $this->supplierUser();

        $this->actingAs($user)
            ->getJson($this->authorizationsUrl())
            ->assertForbidden();
    }

    /**
     * @return array{User, Supplier}
     */
    private function supplierUser(): array
    {
        $user = User::factory()->create(['role' => 'supplier']);
        $supplier = Supplier::factory()->create(['user_id' => $user->id]);

        return [$user, $supplier];
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

    /**
     * @param array<string, mixed> $overrides
     */
    private function authorization(Supplier $supplier, array $overrides = []): SellerBrandAuthorization
    {
        return SellerBrandAuthorization::create([
            'supplier_id' => $supplier->id,
            'brand_id' => $this->brand()->id,
            'authorization_type' => 'authorized_distributor',
            'territory' => 'Sri Lanka',
            'document_path' => '/storage/authorizations/auth.pdf',
            'starts_at' => '2026-07-04',
            'expires_at' => '2027-07-04',
            'status' => 'draft',
            ...$overrides,
        ]);
    }

    private function authorizationsUrl(): string
    {
        return '/api/supplier/sl-beauty/brand-authorizations';
    }

    private function authorizationUrl(SellerBrandAuthorization $authorization): string
    {
        return "{$this->authorizationsUrl()}/{$authorization->id}";
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
