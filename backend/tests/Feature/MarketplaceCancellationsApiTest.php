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

class MarketplaceCancellationsApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_cancellation_ledger_requires_authentication_and_order_view_permission(): void
    {
        $this->getJson('/api/admin/marketplace/orders/cancellations')->assertUnauthorized();
        Sanctum::actingAs(User::factory()->create(['role' => 'buyer']));
        $this->getJson('/api/admin/marketplace/orders/cancellations')->assertForbidden();
    }

    public function test_cancelled_order_ledger_reconciles_order_history_and_refund_data(): void
    {
        Sanctum::actingAs(User::factory()->create(['role' => 'super_admin']));
        DB::table('currencies')->insert(['uuid' => (string) Str::uuid(), 'code' => 'LKR', 'name' => 'Sri Lankan Rupee', 'symbol' => 'Rs', 'decimal_places' => 2, 'status' => 'active', 'created_at' => now(), 'updated_at' => now()]);
        $buyer = User::factory()->create(['name' => 'Cancellation Buyer', 'email' => 'cancel@example.test']);
        $supplier = Supplier::factory()->create(['company_name' => 'Cancellation Seller']);
        $cancelled = Order::create(['order_number' => 'ORD-CANCELLED-001', 'buyer_id' => $buyer->id, 'supplier_id' => $supplier->id, 'total_amount' => '2500.75', 'currency' => 'LKR', 'status' => 'cancelled', 'payment_status' => 'paid', 'fulfillment_status' => 'pending']);
        Order::create(['order_number' => 'ORD-ACTIVE-001', 'buyer_id' => $buyer->id, 'supplier_id' => $supplier->id, 'total_amount' => '100.00', 'currency' => 'LKR', 'status' => 'confirmed']);
        DB::table('order_status_histories')->insert(['order_id' => $cancelled->id, 'changed_by' => null, 'previous_status' => 'confirmed', 'new_status' => 'cancelled', 'notes' => 'private cancellation note', 'created_at' => now(), 'updated_at' => now()]);
        $paymentId = DB::table('payments')->insertGetId(['uuid' => (string) Str::uuid(), 'order_id' => $cancelled->id, 'payment_number' => 'PAY-CANCELLED-001', 'amount' => '2500.75', 'fee_amount' => '0.00', 'status' => 'paid', 'payment_status' => 'paid', 'gateway_reference' => 'secret-gateway-reference', 'gateway_response' => json_encode(['secret' => true]), 'created_at' => now(), 'updated_at' => now()]);
        DB::table('payment_refunds')->insert(['uuid' => (string) Str::uuid(), 'payment_id' => $paymentId, 'refund_number' => 'REF-CANCELLED-001', 'amount' => '1250.25', 'reason' => 'private refund reason', 'status' => 'pending', 'gateway_response' => json_encode(['secret' => true]), 'created_at' => now(), 'updated_at' => now()]);

        $response = $this->getJson('/api/admin/marketplace/orders/cancellations?currency=LKR&search=Cancellation%20Buyer&paymentStatus=paid&sortBy=refundAmount&sortDirection=desc&perPage=10');
        $response->assertOk()->assertJsonPath('data.meta.total', 1)->assertJsonPath('data.items.0.orderReference', 'ORD-CANCELLED-001')
            ->assertJsonPath('data.items.0.refund.amount', '1250.25')->assertJsonPath('data.items.0.refund.status', 'pending')
            ->assertJsonPath('data.items.0.timestampSource', 'order_status_histories.created_at')->assertJsonPath('data.refundImpact.items.0.amount', '1250.25')
            ->assertJsonPath('data.permissions.canMutate', false)->assertJsonPath('data.reasons.available', false);
        $this->assertSame(1, collect($response->json('data.kpis'))->firstWhere('id', 'cancelled-orders')['value']);
        $this->assertSame('1250.25', collect($response->json('data.kpis'))->firstWhere('id', 'refund-value')['value']);
        $this->assertStringNotContainsString('private cancellation note', $response->getContent());
        $this->assertStringNotContainsString('secret-gateway-reference', $response->getContent());
    }

    public function test_unsupported_workflows_are_explicit_and_validation_and_export_are_secure(): void
    {
        Sanctum::actingAs(User::factory()->create(['role' => 'super_admin']));
        $response = $this->getJson('/api/admin/marketplace/orders/cancellations?perPage=10');
        $response->assertOk()->assertJsonPath('data.eligibility.available', false)->assertJsonPath('data.capabilities.approve', false)
            ->assertJsonPath('data.inventoryRelease.reason', 'inventory_reservation_release_domain_not_present')
            ->assertJsonPath('data.sla.reason', 'cancellation_sla_policy_not_present');
        $this->getJson('/api/admin/marketplace/orders/cancellations?sortBy=unsafe')->assertUnprocessable();
        $this->getJson('/api/admin/marketplace/orders/cancellations?perPage=13')->assertUnprocessable();
        $this->get('/api/admin/marketplace/orders/cancellations/export')->assertOk()->assertHeader('content-type', 'text/csv; charset=UTF-8');
        $this->assertDatabaseHas('activity_log', ['description' => 'marketplace.cancellations.exported']);
    }
}
