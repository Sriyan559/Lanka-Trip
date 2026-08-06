<?php

namespace Tests\Feature;

use App\Models\Product;
use App\Models\Supplier;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class MarketplaceListingsApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_listings_require_authentication_and_product_permission(): void
    {
        $this->getJson('/api/admin/marketplace/listings')->assertUnauthorized();
        Sanctum::actingAs(User::factory()->create(['role' => 'buyer']));
        $this->getJson('/api/admin/marketplace/listings')->assertForbidden();
    }

    public function test_listings_reconcile_products_and_server_filters(): void
    {
        Sanctum::actingAs(User::factory()->create(['role' => 'super_admin']));
        $seller = Supplier::factory()->create(['company_name' => 'Database Seller']);
        Product::factory()->create(['name' => 'Live Serum', 'supplier_id' => $seller->id, 'status' => 'active', 'approval_status' => 'approved']);
        Product::factory()->create(['name' => 'Pending Cream', 'supplier_id' => $seller->id, 'status' => 'active', 'approval_status' => 'pending']);

        $response = $this->getJson('/api/admin/marketplace/listings?search=Serum&status=live&sortBy=name&sortDirection=asc&perPage=10');
        $response->assertOk()->assertJsonPath('data.meta.total', 1)->assertJsonPath('data.items.0.name', 'Live Serum')->assertJsonPath('data.items.0.seller.name', 'Database Seller')->assertJsonPath('data.items.0.listingStatus', 'live')->assertJsonPath('data.health.availability', 'unavailable')->assertJsonPath('data.sla.availability', 'unavailable');
        $this->assertSame(2, collect($response->json('data.metrics'))->firstWhere('id', 'all')['value']);
        $this->assertSame(1, collect($response->json('data.metrics'))->firstWhere('id', 'live')['value']);
        $this->assertSame(1, collect($response->json('data.metrics'))->firstWhere('id', 'pending-review')['value']);
    }

    public function test_export_is_permission_protected_and_uses_database_rows(): void
    {
        Sanctum::actingAs(User::factory()->create(['role' => 'super_admin']));
        Product::factory()->create(['name' => '=Unsafe Listing', 'approval_status' => 'approved']);
        $response = $this->get('/api/admin/marketplace/listings/export?status=live');
        $response->assertOk()->assertHeader('content-type', 'text/csv; charset=UTF-8');
        $this->assertStringContainsString("'=Unsafe Listing", $response->streamedContent());
    }
}
