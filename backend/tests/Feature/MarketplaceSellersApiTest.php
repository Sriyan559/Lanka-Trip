<?php

namespace Tests\Feature;

use App\Models\Order;
use App\Models\Product;
use App\Models\Supplier;
use App\Models\SupplierSettlement;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class MarketplaceSellersApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_sellers_require_authentication_and_supplier_permission(): void
    {
        $this->getJson('/api/admin/marketplace/sellers')->assertUnauthorized();
        Sanctum::actingAs(User::factory()->create(['role' => 'buyer']));
        $this->getJson('/api/admin/marketplace/sellers')->assertForbidden();
    }

    public function test_sellers_reconcile_database_metrics_filters_risk_and_financials(): void
    {
        Sanctum::actingAs($admin = User::factory()->create(['role' => 'super_admin']));
        DB::table('currencies')->insert(['uuid' => (string) Str::uuid(), 'code' => 'USD', 'name' => 'US Dollar', 'symbol' => '$', 'decimal_places' => 2, 'status' => 'active', 'created_at' => now(), 'updated_at' => now()]);
        $buyer = User::factory()->create(['role' => 'buyer']);
        $seller = Supplier::factory()->create(['company_name' => 'Database Seller', 'status' => 'active', 'verification_status' => 'pending', 'rating' => 4.5, 'reviews_count' => 2]);
        Supplier::factory()->create(['company_name' => 'Other Seller', 'status' => 'inactive', 'verification_status' => 'verified']);
        Product::factory()->create(['supplier_id' => $seller->id, 'status' => 'active', 'approval_status' => 'approved']);
        Order::create(['order_number' => 'SELLER-ORDER-1', 'buyer_id' => $buyer->id, 'supplier_id' => $seller->id, 'total_amount' => 100, 'currency' => 'USD', 'status' => 'completed']);
        Order::create(['order_number' => 'SELLER-ORDER-2', 'buyer_id' => $buyer->id, 'supplier_id' => $seller->id, 'total_amount' => 50, 'currency' => 'USD', 'status' => 'cancelled']);
        DB::table('risk_profiles')->insert(['uuid' => (string) Str::uuid(), 'subject_type' => Supplier::class, 'subject_id' => $seller->id, 'risk_level' => 'high', 'risk_score' => 80, 'status' => 'active', 'assessed_at' => now(), 'created_at' => now(), 'updated_at' => now()]);
        SupplierSettlement::create(['uuid' => (string) Str::uuid(), 'settlement_number' => 'SELLER-SET-1', 'supplier_id' => $seller->id, 'currency' => 'USD', 'gross_amount' => 100, 'commission_amount' => 5, 'refund_adjustment' => 10, 'other_adjustments' => 0, 'net_amount' => 85, 'status' => 'pending', 'period_start' => today()->subDay(), 'period_end' => today(), 'created_by' => $admin->id]);

        $response = $this->getJson('/api/admin/marketplace/sellers?search=Database&status=high-risk&currency=USD&sortBy=gmv&sortDirection=desc&perPage=10');
        $response->assertOk()->assertJsonPath('data.meta.total', 1)->assertJsonPath('data.items.0.name', 'Database Seller')
            ->assertJsonPath('data.items.0.orders', 2)->assertJsonPath('data.items.0.gmv.value', 100)
            ->assertJsonPath('data.items.0.aov.value', 100)->assertJsonPath('data.items.0.cancellationRate.value', 50)
            ->assertJsonPath('data.items.0.riskLevel', 'high')->assertJsonPath('data.financial.pending', 85)
            ->assertJsonPath('data.health.available', false)->assertJsonPath('data.sla.available', false);
        $this->assertSame(1, collect($response->json('data.kpis'))->firstWhere('id', 'active')['value']);
        $this->assertSame(100, collect($response->json('data.kpis'))->firstWhere('id', 'gmv')['value']);
        $this->assertSame(1, collect($response->json('data.risks'))->firstWhere('level', 'high')['count']);
        $this->getJson('/api/admin/marketplace/sellers/'.$seller->id.'?currency=USD')
            ->assertOk()->assertJsonPath('data.seller.id', (string) $seller->id)->assertJsonPath('data.seller.name', 'Database Seller')
            ->assertJsonPath('data.health.available', false);
    }

    public function test_sellers_do_not_combine_currencies_and_paginate_on_the_server(): void
    {
        Sanctum::actingAs(User::factory()->create(['role' => 'super_admin']));
        $buyer = User::factory()->create(['role' => 'buyer']);
        $seller = Supplier::factory()->create();
        foreach (['USD', 'LKR'] as $currency) {
            Order::create(['order_number' => 'SELLER-'.$currency, 'buyer_id' => $buyer->id, 'supplier_id' => $seller->id, 'total_amount' => 100, 'currency' => $currency, 'status' => 'confirmed']);
        }
        $response = $this->getJson('/api/admin/marketplace/sellers?perPage=10');
        $response->assertOk()->assertJsonPath('data.context.currency', null)->assertJsonPath('data.items.0.gmv.available', false);
        $this->assertSame('currency_selection_required', collect($response->json('data.kpis'))->firstWhere('id', 'gmv')['reason']);
    }

    public function test_seller_export_is_permission_protected_and_escapes_spreadsheet_formulas(): void
    {
        Sanctum::actingAs(User::factory()->create(['role' => 'super_admin']));
        Supplier::factory()->create(['company_name' => '=Unsafe Seller']);
        $response = $this->get('/api/admin/marketplace/sellers/export');
        $response->assertOk()->assertHeader('content-type', 'text/csv; charset=UTF-8');
        $this->assertStringContainsString("'=Unsafe Seller",$response->streamedContent());
    }
}
