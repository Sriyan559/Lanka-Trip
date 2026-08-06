<?php

namespace Tests\Feature;

use App\Models\Product;
use App\Models\Supplier;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class MarketplaceSellersApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_seller_performance_requires_authentication_and_permission(): void
    {
        $this->getJson('/api/admin/marketplace/sellers')->assertUnauthorized();
        Sanctum::actingAs(User::factory()->create(['role' => 'buyer']));
        $this->getJson('/api/admin/marketplace/sellers')->assertForbidden();
    }

    public function test_metrics_and_rows_reconcile_to_database_records(): void
    {
        Sanctum::actingAs(User::factory()->create(['role' => 'super_admin']));
        $seller = Supplier::factory()->create(['company_name' => 'Database Seller', 'rating' => 4.5, 'verification_status' => 'verified']);
        $buyer = User::factory()->create(['role' => 'buyer']);
        Product::factory()->create(['supplier_id' => $seller->id, 'status' => 'active', 'approval_status' => 'approved']);
        Product::factory()->create(['supplier_id' => $seller->id, 'status' => 'draft', 'approval_status' => 'pending']);
        DB::table('orders')->insert([
            ['order_number' => 'ORD-SELLER-1', 'buyer_id' => $buyer->id, 'supplier_id' => $seller->id, 'total_amount' => 1000, 'currency' => 'LKR', 'status' => 'completed', 'created_at' => now(), 'updated_at' => now()],
            ['order_number' => 'ORD-SELLER-2', 'buyer_id' => $buyer->id, 'supplier_id' => $seller->id, 'total_amount' => 500, 'currency' => 'LKR', 'status' => 'cancelled', 'created_at' => now(), 'updated_at' => now()],
        ]);
        DB::table('risk_profiles')->insert(['uuid' => (string) Str::uuid(), 'subject_type' => 'App\\Models\\Supplier', 'subject_id' => $seller->id, 'risk_level' => 'high', 'risk_score' => 81, 'status' => 'active', 'created_at' => now(), 'updated_at' => now()]);

        $response = $this->getJson('/api/admin/marketplace/sellers?currency=LKR&status=high-risk&perPage=10');
        $response->assertOk()->assertJsonPath('data.source', 'database')->assertJsonPath('data.meta.total', 1)
            ->assertJsonPath('data.items.0.name', 'Database Seller')->assertJsonPath('data.items.0.activeListings', 1)
            ->assertJsonPath('data.items.0.orders', 2)->assertJsonPath('data.items.0.gmv.amount', 1000)
            ->assertJsonPath('data.items.0.fulfilmentRate', 50)->assertJsonPath('data.items.0.cancellationRate', 50)
            ->assertJsonPath('data.items.0.riskLevel', 'high');
        $this->assertSame(1, collect($response->json('data.metrics'))->firstWhere('id', 'active')['value']);
        $this->assertSame('unavailable', collect($response->json('data.metrics'))->firstWhere('id', 'sla')['availability']);
    }

    public function test_multiple_currencies_require_selection_and_export_sanitizes_csv(): void
    {
        Sanctum::actingAs(User::factory()->create(['role' => 'super_admin']));
        $seller = Supplier::factory()->create(['company_name' => '=Unsafe Seller']);
        $buyer = User::factory()->create(['role' => 'buyer']);
        foreach (['LKR', 'USD'] as $index => $currency) DB::table('orders')->insert(['order_number' => "ORD-CUR-{$index}", 'buyer_id' => $buyer->id, 'supplier_id' => $seller->id, 'total_amount' => 100, 'currency' => $currency, 'status' => 'completed', 'created_at' => now(), 'updated_at' => now()]);
        $this->getJson('/api/admin/marketplace/sellers')->assertOk()->assertJsonPath('data.context.currency', null)->assertJsonPath('data.items.0.gmv', null);
        $export = $this->get('/api/admin/marketplace/sellers/export?currency=LKR');
        $export->assertOk()->assertHeader('content-type', 'text/csv; charset=UTF-8');
        $this->assertStringContainsString("'=Unsafe Seller", $export->streamedContent());
    }
}
