<?php

namespace Tests\Feature;

use App\Models\Order;
use App\Models\Supplier;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class MarketplaceOrdersApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_orders_require_authentication_and_order_permission(): void
    {
        $this->getJson('/api/admin/marketplace/orders')->assertUnauthorized();
        Sanctum::actingAs(User::factory()->create(['role' => 'buyer']));
        $this->getJson('/api/admin/marketplace/orders')->assertForbidden();
    }

    public function test_list_and_detail_return_authoritative_order_data_without_sensitive_payment_payloads(): void
    {
        Sanctum::actingAs(User::factory()->create(['role' => 'super_admin']));
        DB::table('currencies')->insert(['uuid' => (string) Str::uuid(), 'code' => 'LKR', 'name' => 'Sri Lankan Rupee', 'symbol' => 'Rs', 'decimal_places' => 2, 'status' => 'active', 'created_at' => now(), 'updated_at' => now()]);
        $buyer = User::factory()->create(['name' => 'Real Buyer', 'email' => 'buyer@example.test']);
        $supplier = Supplier::factory()->create(['company_name' => 'Real Supplier']);
        $order = Order::create(['order_number' => 'ORD-REAL-001', 'buyer_id' => $buyer->id, 'supplier_id' => $supplier->id, 'total_amount' => '1250.50', 'currency' => 'LKR', 'status' => 'confirmed', 'payment_status' => 'failed', 'fulfillment_status' => 'pending']);
        DB::table('payment_methods')->insert(['uuid' => (string) Str::uuid(), 'name' => 'Bank Transfer', 'slug' => 'bank-transfer', 'method_type' => 'bank', 'status' => 'active', 'created_at' => now(), 'updated_at' => now()]);
        $method = DB::table('payment_methods')->value('id');
        DB::table('payments')->insert(['uuid' => (string) Str::uuid(), 'order_id' => $order->id, 'payment_method_id' => $method, 'payment_number' => 'PAY-REAL-001', 'amount' => '1250.50', 'fee_amount' => '0.00', 'status' => 'failed', 'payment_status' => 'failed', 'failed_at' => now(), 'gateway_reference' => 'secret-reference', 'gateway_response' => json_encode(['secret' => 'never-expose']), 'created_at' => now(), 'updated_at' => now()]);

        $response = $this->getJson('/api/admin/marketplace/orders?currency=LKR&paymentStatus=failed&search=Real%20Buyer&perPage=10');
        $response->assertOk()->assertJsonPath('data.meta.total', 1)->assertJsonPath('data.orders.items.0.orderReference', 'ORD-REAL-001')
            ->assertJsonPath('data.orders.items.0.total.amount', '1250.50')->assertJsonPath('data.orders.items.0.paymentStatus', 'failed')
            ->assertJsonPath('data.paymentSummary.failedPayments', '1250.50')->assertJsonPath('data.permissions.canAssign', false);
        $this->assertFalse(collect($response->json('data.kpis'))->firstWhere('id', 'high-risk')['available']);
        $this->assertStringNotContainsString('secret-reference', $response->getContent());

        $detail = $this->getJson("/api/admin/marketplace/orders/{$order->id}");
        $detail->assertOk()->assertJsonPath('data.orderReference', 'ORD-REAL-001')->assertJsonPath('data.payments.0.payment_number', 'PAY-REAL-001');
        $this->assertStringNotContainsString('gateway_response', $detail->getContent());
    }

    public function test_manual_workflow_is_explicitly_unavailable_and_filters_are_validated(): void
    {
        Sanctum::actingAs(User::factory()->create(['role' => 'super_admin']));
        $this->getJson('/api/admin/marketplace/orders/manual-capabilities')->assertOk()
            ->assertJsonPath('data.available', false)->assertJsonPath('data.reason', 'manual_order_workflow_not_present')
            ->assertJsonPath('data.supportedCreationPath', 'accepted_quotation_only');
        $this->getJson('/api/admin/marketplace/orders?orderStatus=invented')->assertUnprocessable();
        $this->getJson('/api/admin/marketplace/orders?perPage=13')->assertUnprocessable();
        $this->get('/api/admin/marketplace/orders/export')->assertOk()->assertHeader('content-type', 'text/csv; charset=UTF-8');
        $this->assertDatabaseHas('activity_log', ['description' => 'marketplace.orders.exported']);
    }
}
