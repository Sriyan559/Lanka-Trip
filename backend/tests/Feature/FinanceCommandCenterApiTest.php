<?php

namespace Tests\Feature;

use App\Models\Order;
use App\Models\Payment;
use App\Models\PaymentMethod;
use App\Models\Supplier;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class FinanceCommandCenterApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_authentication_and_admin_permission_are_required(): void
    {
        $this->getJson('/api/admin/finance/command-center')->assertUnauthorized();
        Sanctum::actingAs(User::factory()->create(['role' => 'buyer']));
        $this->getJson('/api/admin/finance/command-center')->assertForbidden();
    }

    public function test_empty_database_returns_structured_zero_state_without_fixtures(): void
    {
        Sanctum::actingAs(User::factory()->create(['role' => 'super_admin']));
        $response = $this->getJson('/api/admin/finance/command-center');
        $response->assertOk()->assertJsonPath('data.source', 'database')
            ->assertJsonCount(12, 'data.kpis')->assertJsonPath('data.paymentMethods.total', 0)
            ->assertJsonPath('data.paymentMethods.items', [])->assertJsonPath('data.alerts', [])
            ->assertJsonPath('data.capabilities.journal', false)->assertJsonPath('data.permissions.canCreateJournal', false);
        $this->assertSame(0, collect($response->json('data.kpis'))->firstWhere('id', 'gmv')['value']);
    }

    public function test_real_payment_aggregates_filters_and_paginates(): void
    {
        Sanctum::actingAs(User::factory()->create(['role' => 'super_admin']));
        DB::table('currencies')->insert(['uuid' => (string) Str::uuid(), 'code' => 'LKR', 'name' => 'Sri Lankan Rupee', 'symbol' => 'Rs', 'decimal_places' => 2, 'status' => 'active', 'created_at' => now(), 'updated_at' => now()]);
        $buyer = User::factory()->create(); $supplier = Supplier::factory()->create();
        $order = Order::create(['order_number' => 'ORD-FIN-001', 'buyer_id' => $buyer->id, 'supplier_id' => $supplier->id, 'total_amount' => '1200.00', 'subtotal' => '1000.00', 'tax_amount' => '200.00', 'discount_amount' => '0.00', 'currency' => 'LKR', 'status' => 'completed', 'payment_status' => 'paid', 'fulfillment_status' => 'completed', 'approval_status' => 'approved']);
        $method = PaymentMethod::create(['uuid' => (string) Str::uuid(), 'name' => 'Card', 'slug' => 'card-fin', 'method_type' => 'card', 'status' => 'active']);
        Payment::create(['uuid' => (string) Str::uuid(), 'order_id' => $order->id, 'payer_user_id' => $buyer->id, 'payment_method_id' => $method->id, 'payment_number' => 'PAY-FIN-001', 'amount' => '1200.00', 'fee_amount' => '20.00', 'status' => 'completed', 'payment_status' => 'paid', 'paid_at' => now()]);

        $dashboard = $this->getJson('/api/admin/finance/command-center?currency=LKR');
        $dashboard->assertOk()->assertJsonPath('data.paymentMethods.items.0.method', 'Card')->assertJsonPath('data.paymentMethods.items.0.amount', 1200);
        $this->assertSame(1200, collect($dashboard->json('data.kpis'))->firstWhere('id', 'payments_captured')['value']);
        $this->getJson('/api/admin/finance/operations?currency=LKR&domain=payment&search=PAY-FIN&perPage=10')->assertOk()
            ->assertJsonPath('data.meta.total', 1)->assertJsonPath('data.items.0.reference', 'PAY-FIN-001')
            ->assertJsonPath('data.items.0.relatedReference', 'ORD-FIN-001');
    }

    public function test_filters_are_validated_and_cross_domain_ids_do_not_resolve(): void
    {
        Sanctum::actingAs(User::factory()->create(['role' => 'super_admin']));
        $this->getJson('/api/admin/finance/command-center?perPage=13')->assertUnprocessable();
        $this->getJson('/api/admin/finance/command-center?dateFrom=2026-08-10&dateTo=2026-08-01')->assertUnprocessable();
        $this->getJson('/api/admin/finance/operations/payment:999999')->assertNotFound();
    }
}
