<?php

namespace Tests\Feature;

use App\Models\Brand;
use App\Models\SellerBrandAuthorization;
use App\Models\Supplier;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class BrandManagementApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_dashboard_is_permission_protected_and_reports_real_supported_capabilities(): void
    {
        $this->getJson('/api/admin/catalogue/brands')->assertUnauthorized();
        Sanctum::actingAs(User::factory()->create(['role' => 'super_admin']));
        $country = DB::table('countries')->insertGetId(['uuid' => (string) Str::uuid(), 'iso2' => 'LK', 'iso3' => 'LKA', 'name' => 'Sri Lanka', 'status' => 'active', 'created_at' => now(), 'updated_at' => now()]);
        $brand = $this->brand(['name' => 'Live Botanics', 'slug' => 'live-botanics', 'country_id' => $country, 'status' => 'active', 'is_verified' => true]);
        $supplier = Supplier::factory()->create(['company_name' => 'Verified Supply']);
        SellerBrandAuthorization::create(['supplier_id' => $supplier->id, 'brand_id' => $brand->id, 'status' => 'approved', 'starts_at' => now()->subDay(), 'expires_at' => now()->addYear()]);

        $this->getJson('/api/admin/catalogue/brands?search=Verified%20Supply&scope=verified&pageSize=10')
            ->assertOk()->assertJsonPath('data.brands.total', 1)
            ->assertJsonPath('data.brands.data.0.brandName', 'Live Botanics')
            ->assertJsonPath('data.brands.data.0.country', 'Sri Lanka')
            ->assertJsonPath('data.brands.data.0.authorizationStatus', 'Valid')
            ->assertJsonPath('data.brands.data.0.activeProductsCount', null)
            ->assertJsonPath('data.kpis.0.value', 1)
            ->assertJsonPath('data.capabilities.products', false)
            ->assertJsonPath('data.capabilities.tenantScope', false);
    }

    public function test_filters_sorting_pagination_and_archived_count_are_server_side(): void
    {
        Sanctum::actingAs(User::factory()->create(['role' => 'super_admin']));
        $this->brand(['name' => 'Zulu', 'slug' => 'zulu', 'is_verified' => false]);
        $matching = $this->brand(['name' => 'Alpha', 'slug' => 'alpha', 'is_verified' => true]);
        $archived = $this->brand(['name' => 'Archived', 'slug' => 'archived']);
        $archived->delete();

        $this->getJson('/api/admin/catalogue/brands?verified=1&sort=name&direction=asc&pageSize=1')
            ->assertOk()->assertJsonPath('data.brands.total', 1)->assertJsonPath('data.brands.data.0.id', (string) $matching->id)
            ->assertJsonPath('data.kpis.11.value', 1);
        $this->getJson('/api/admin/catalogue/brands?scope=archived')->assertOk()->assertJsonPath('data.brands.data.0.brandName', 'Archived');
    }

    public function test_import_is_atomic_and_export_is_server_generated(): void
    {
        Sanctum::actingAs(User::factory()->create(['role' => 'super_admin']));
        $this->enableFeature();
        $valid = UploadedFile::fake()->createWithContent('brands.csv', "name,slug,status,is_verified\nImported Brand,imported-brand,active,1\n");
        $this->postJson('/api/admin/catalogue/brands/import', ['file' => $valid])->assertOk()->assertJsonPath('data.created', 1);
        $this->assertDatabaseHas('brands', ['slug' => 'imported-brand', 'is_verified' => true]);

        $invalid = UploadedFile::fake()->createWithContent('brands.csv', "name,slug,status\nShould Rollback,should-rollback,active\nBroken,broken,invalid\n");
        $this->postJson('/api/admin/catalogue/brands/import', ['file' => $invalid])->assertUnprocessable();
        $this->assertDatabaseMissing('brands', ['slug' => 'should-rollback']);
        $this->get('/api/admin/catalogue/brands/export?search=Imported')->assertOk()->assertHeader('content-type', 'text/csv; charset=UTF-8');
    }

    public function test_authorization_list_is_brand_filtered_and_decision_is_audited(): void
    {
        $admin = User::factory()->create(['role' => 'super_admin']);
        Sanctum::actingAs($admin);
        $supplier = Supplier::factory()->create();
        $brand = $this->brand();
        $other = $this->brand();
        $authorization = SellerBrandAuthorization::create(['supplier_id' => $supplier->id, 'brand_id' => $brand->id, 'authorization_type' => 'distribution', 'territory' => 'LK', 'status' => 'submitted']);
        SellerBrandAuthorization::create(['supplier_id' => $supplier->id, 'brand_id' => $other->id, 'status' => 'submitted']);

        $this->getJson("/api/admin/brand-authorizations?brand_id={$brand->id}")
            ->assertOk()->assertJsonPath('authorizations.total', 1);
        $this->postJson("/api/admin/brand-authorizations/{$authorization->id}/decisions", ['decision' => 'approved'])
            ->assertOk()->assertJsonPath('authorization.status', 'approved');
        $this->assertDatabaseHas('brand_authorization_decisions', ['seller_brand_authorization_id' => $authorization->id, 'actor_id' => $admin->id, 'to_status' => 'approved']);
    }

    private function brand(array $values = []): Brand
    {
        return Brand::create(['uuid' => (string) Str::uuid(), 'name' => 'Brand '.Str::random(8), 'slug' => 'brand-'.Str::random(8), 'status' => 'active', 'is_verified' => false, ...$values]);
    }

    private function enableFeature(): void
    {
        DB::table('feature_flags')->insert(['uuid' => (string) Str::uuid(), 'feature_key' => 'sl_beauty.brand_seller_verification', 'name' => 'Brand Verification', 'is_enabled' => true, 'status' => 'active', 'created_at' => now(), 'updated_at' => now()]);
    }
}
