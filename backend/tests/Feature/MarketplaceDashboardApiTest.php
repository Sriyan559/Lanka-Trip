<?php

namespace Tests\Feature;

use App\Models\Order;
use App\Models\Payment;
use App\Models\Product;
use App\Models\Supplier;
use App\Models\SupplierSettlement;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class MarketplaceDashboardApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_dashboard_requires_an_authenticated_administrator(): void
    {
        $this->getJson('/api/admin/marketplace/dashboard')->assertUnauthorized();

        Sanctum::actingAs(User::factory()->create(['role' => 'buyer']));
        $this->getJson('/api/admin/marketplace/dashboard')->assertForbidden();
    }

    public function test_dashboard_reconciles_database_orders_payments_refunds_and_settlements(): void
    {
        Sanctum::actingAs($admin = User::factory()->create(['role' => 'super_admin']));
        $supplier = Supplier::factory()->create(['company_name' => 'Database Seller']);
        Product::factory()->create(['supplier_id' => $supplier->id, 'approval_status' => 'approved', 'status' => 'active']);
        $buyer = User::factory()->create(['role' => 'buyer']);
        $currencyId = DB::table('currencies')->insertGetId([
            'uuid' => (string) Str::uuid(), 'code' => 'USD', 'name' => 'US Dollar', 'symbol' => '$',
            'decimal_places' => 2, 'status' => 'active', 'created_at' => now(), 'updated_at' => now(),
        ]);
        $order = Order::create([
            'order_number' => 'MARKET-ORDER-1', 'buyer_id' => $buyer->id, 'supplier_id' => $supplier->id,
            'total_amount' => 100, 'currency' => 'USD', 'status' => 'confirmed',
        ]);
        $payment = Payment::create([
            'uuid' => (string) Str::uuid(), 'order_id' => $order->id, 'currency_id' => $currencyId,
            'payment_number' => 'MARKET-PAY-1', 'amount' => 80, 'status' => 'completed',
            'payment_status' => 'completed', 'paid_at' => now(),
        ]);
        DB::table('payment_refunds')->insert([
            'uuid' => (string) Str::uuid(), 'payment_id' => $payment->id, 'refund_number' => 'MARKET-REF-1',
            'amount' => 10, 'status' => 'completed', 'processed_at' => now(), 'created_at' => now(), 'updated_at' => now(),
        ]);
        SupplierSettlement::create([
            'uuid' => (string) Str::uuid(), 'settlement_number' => 'MARKET-SET-1', 'supplier_id' => $supplier->id,
            'currency' => 'USD', 'gross_amount' => 100, 'commission_amount' => 5, 'refund_adjustment' => 10,
            'other_adjustments' => 0, 'net_amount' => 85, 'status' => 'pending',
            'period_start' => today()->subDay(), 'period_end' => today(), 'created_by' => $admin->id,
        ]);

        $response = $this->getJson('/api/admin/marketplace/dashboard?dateFrom='.today()->subDay()->toDateString().'&dateTo='.today()->toDateString().'&currency=USD');

        $response->assertOk()
            ->assertJsonPath('data.summary.gmv.value', 100)
            ->assertJsonPath('data.summary.nmv.value', 70)
            ->assertJsonPath('data.summary.total_orders.value', 1)
            ->assertJsonPath('data.summary.aov.value', 100)
            ->assertJsonPath('data.summary.active_sellers.value', 1)
            ->assertJsonPath('data.summary.active_listings.value', 1)
            ->assertJsonPath('data.summary.commission.value', 5)
            ->assertJsonPath('data.summary.expenses.availability', 'unavailable')
            ->assertJsonPath('data.order_lifecycle.confirmed', 1)
            ->assertJsonPath('data.top_sellers.0.id', (string) $supplier->id)
            ->assertJsonPath('data.marketplace_health.availability', 'unavailable');

        $this->assertSame(
            $response->json('data.summary.total_orders.value'),
            array_sum($response->json('data.order_lifecycle')),
        );
    }

    public function test_dashboard_does_not_combine_currencies_without_an_explicit_selection(): void
    {
        Sanctum::actingAs(User::factory()->create(['role' => 'super_admin']));
        $supplier = Supplier::factory()->create();
        $buyer = User::factory()->create(['role' => 'buyer']);
        foreach (['USD', 'LKR'] as $currency) {
            Order::create(['order_number' => "ORDER-{$currency}", 'buyer_id' => $buyer->id, 'supplier_id' => $supplier->id, 'total_amount' => 100, 'currency' => $currency, 'status' => 'confirmed']);
        }

        $this->getJson('/api/admin/marketplace/dashboard')
            ->assertOk()
            ->assertJsonPath('data.filters.currency', null)
            ->assertJsonPath('data.summary.gmv.availability', 'unavailable')
            ->assertJsonPath('data.summary.gmv.reason', 'currency_selection_required');
    }

    public function test_export_is_permission_protected_and_contains_database_metrics(): void
    {
        Sanctum::actingAs(User::factory()->create(['role' => 'super_admin']));

        $response = $this->get('/api/admin/marketplace/dashboard/export');
        $response->assertOk()->assertHeader('content-type', 'text/csv; charset=UTF-8');
        $this->assertStringContainsString('Metric,Availability,Value,Currency', $response->streamedContent());
    }
}
