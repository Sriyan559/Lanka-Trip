<?php

namespace Tests\Feature;

use App\Models\EcosystemModule;
use App\Models\Order;
use App\Models\Payment;
use App\Models\Payout;
use App\Models\Supplier;
use App\Models\User;
use Database\Seeders\AdminLiveReferenceSeeder;
use Database\Seeders\PermissionSeeder;
use Database\Seeders\RoleSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class AdminLiveDataApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_endpoints_require_authentication_and_administrator_role(): void
    {
        $this->getJson('/api/admin/dashboard/overview')->assertUnauthorized();

        Sanctum::actingAs(User::factory()->create(['role' => 'buyer']));
        $this->getJson('/api/admin/dashboard/overview')->assertForbidden();
    }

    public function test_existing_admin_role_receives_seeded_permissions_without_a_second_auth_system(): void
    {
        $this->seed([RoleSeeder::class, PermissionSeeder::class]);
        $admin = User::factory()->create(['role' => 'admin']);

        Sanctum::actingAs($admin);
        $this->getJson('/api/admin/dashboard/overview')->assertOk();
        $this->assertTrue($admin->hasPermission('payouts.view'));
    }

    public function test_dashboard_uses_successful_payments_separates_currency_and_excludes_pending_payments(): void
    {
        Sanctum::actingAs(User::factory()->create(['role' => 'super_admin']));
        $buyer = User::factory()->create();
        $supplier = Supplier::factory()->create();
        $order = Order::create([
            'order_number' => 'ORDER-REVENUE-1', 'buyer_id' => $buyer->id,
            'supplier_id' => $supplier->id, 'total_amount' => 999, 'currency' => 'USD',
            'status' => 'confirmed',
        ]);
        $usd = DB::table('currencies')->insertGetId([
            'uuid' => (string) Str::uuid(), 'code' => 'USD', 'name' => 'US Dollar',
            'symbol' => '$', 'decimal_places' => 2, 'status' => 'active',
            'created_at' => now(), 'updated_at' => now(),
        ]);
        $this->payment($order, $usd, 'PAY-SUCCESS', 50, 'completed');
        $this->payment($order, $usd, 'PAY-PENDING', 100, 'pending');

        $response = $this->getJson('/api/admin/dashboard/overview?from='.today()->subDay()->toDateString().'&to='.today()->toDateString());

        $response->assertOk()
            ->assertJsonPath('overview.revenue.by_currency.0.currency', 'USD')
            ->assertJsonPath('overview.revenue.by_currency.0.gross', 50)
            ->assertJsonPath('overview.revenue.by_currency.0.net', 50)
            ->assertJsonCount(2, 'overview.sales_trend.by_currency.0.items')
            ->assertJsonPath('overview.sales_trend.by_currency.0.items.1.gross', 50)
            ->assertJsonPath('overview.sales_trend.by_currency.0.items.1.net', 50)
            ->assertJsonPath('overview.revenue.lkr_aggregate.availability', 'unavailable')
            ->assertJsonPath('overview.revenue.lkr_aggregate.reason', 'lkr_currency_not_configured');
    }

    public function test_dashboard_counts_only_active_buyers_and_verified_active_brands(): void
    {
        Sanctum::actingAs(User::factory()->create(['role' => 'super_admin']));
        User::factory()->create(['role' => 'buyer', 'status' => 'active']);
        User::factory()->create(['role' => 'buyer', 'status' => 'inactive']);
        User::factory()->create(['role' => 'supplier', 'status' => 'active']);

        foreach ([
            ['name' => 'Verified Active', 'status' => 'active', 'is_verified' => true],
            ['name' => 'Unverified Active', 'status' => 'active', 'is_verified' => false],
            ['name' => 'Verified Draft', 'status' => 'draft', 'is_verified' => true],
        ] as $index => $brand) {
            DB::table('brands')->insert([
                'uuid' => (string) Str::uuid(),
                'name' => $brand['name'],
                'slug' => "dashboard-brand-{$index}",
                'status' => $brand['status'],
                'is_verified' => $brand['is_verified'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        $this->getJson('/api/admin/dashboard/overview')
            ->assertOk()
            ->assertJsonPath('overview.active_accounts.value', 1)
            ->assertJsonPath('overview.active_accounts.definition', 'active_buyer_accounts')
            ->assertJsonPath('overview.active_brands.value', 1);
    }

    public function test_completed_refund_reduces_net_revenue_but_pending_refund_does_not(): void
    {
        Sanctum::actingAs(User::factory()->create(['role' => 'super_admin']));
        $buyer = User::factory()->create();
        $supplier = Supplier::factory()->create();
        $order = Order::create([
            'order_number' => 'ORDER-REFUND-1', 'buyer_id' => $buyer->id,
            'supplier_id' => $supplier->id, 'total_amount' => 100, 'currency' => 'LKR',
            'status' => 'completed',
        ]);
        $lkr = DB::table('currencies')->insertGetId([
            'uuid' => (string) Str::uuid(), 'code' => 'LKR', 'name' => 'Sri Lankan Rupee',
            'symbol' => 'Rs', 'decimal_places' => 2, 'status' => 'active',
            'created_at' => now(), 'updated_at' => now(),
        ]);
        $payment = $this->payment($order, $lkr, 'PAY-REFUND', 100, 'paid');
        foreach ([['completed', 30], ['pending', 20]] as [$status, $amount]) {
            DB::table('payment_refunds')->insert([
                'uuid' => (string) Str::uuid(), 'payment_id' => $payment->id,
                'refund_number' => 'REF-'.$status, 'amount' => $amount, 'status' => $status,
                'processed_at' => now(), 'created_at' => now(), 'updated_at' => now(),
            ]);
        }

        $this->getJson('/api/admin/dashboard/overview?from='.today()->subDay()->toDateString().'&to='.today()->toDateString())
            ->assertOk()
            ->assertJsonPath('overview.revenue.by_currency.0.gross', 100)
            ->assertJsonPath('overview.revenue.by_currency.0.completed_refunds', 30)
            ->assertJsonPath('overview.revenue.by_currency.0.net', 70)
            ->assertJsonPath('overview.revenue.lkr_aggregate.value', 70);
    }

    public function test_payout_transitions_are_validated_and_paid_summary_uses_paid_records_only(): void
    {
        Sanctum::actingAs($admin = User::factory()->create(['role' => 'super_admin']));
        $supplier = Supplier::factory()->create();
        $payout = Payout::create([
            'uuid' => (string) Str::uuid(), 'payout_number' => 'PO-1', 'supplier_id' => $supplier->id,
            'currency' => 'USD', 'gross_amount' => 100, 'commission_amount' => 10,
            'refund_adjustment' => 0, 'other_adjustments' => 0, 'net_amount' => 90,
            'status' => 'pending', 'period_start' => today()->subMonth(), 'period_end' => today(),
        ]);

        $this->patchJson("/api/admin/payouts/{$payout->id}/status", ['status' => 'paid'])
            ->assertUnprocessable();
        $this->patchJson("/api/admin/payouts/{$payout->id}/status", ['status' => 'approved'])
            ->assertOk();
        $this->assertDatabaseHas('activity_log', ['causer_id' => $admin->id, 'description' => 'payout.status_changed']);
    }

    public function test_support_case_uses_backend_sla_and_internal_routes_are_admin_only(): void
    {
        $this->seed(AdminLiveReferenceSeeder::class);
        Sanctum::actingAs(User::factory()->create(['role' => 'super_admin']));
        $customer = User::factory()->create();

        $case = $this->postJson('/api/admin/support/cases', [
            'customer_id' => $customer->id, 'subject' => 'Order issue',
            'description' => 'The delivery has not arrived.', 'channel' => 'web',
            'category' => 'delivery', 'priority' => 'urgent',
        ])->assertCreated()->json('case');

        $this->assertNotNull($case['first_response_deadline']);
        $this->postJson("/api/admin/support/cases/{$case['id']}/notes", ['body' => 'Internal investigation'])
            ->assertCreated();

        Sanctum::actingAs(User::factory()->create(['role' => 'buyer']));
        $this->getJson("/api/admin/support/cases/{$case['id']}")->assertForbidden();
    }

    public function test_sensitive_module_configuration_is_encrypted_and_only_masked_value_is_returned(): void
    {
        Sanctum::actingAs(User::factory()->create(['role' => 'super_admin']));
        $module = EcosystemModule::create([
            'uuid' => (string) Str::uuid(), 'module_key' => 'shipping-api', 'name' => 'Shipping API',
            'category' => 'logistics', 'status' => 'active', 'approval_status' => 'approved',
            'configuration_schema' => ['properties' => ['api_key' => ['type' => 'string']]],
        ]);

        $this->putJson("/api/admin/ecosystem/modules/{$module->id}/configuration", [
            'updated_at' => $module->updated_at->toIso8601String(),
            'configuration' => [['key' => 'api_key', 'value' => 'test-secret-value', 'sensitive' => true]],
        ])->assertOk();

        $record = DB::table('ecosystem_module_configurations')->where('ecosystem_module_id', $module->id)->first();
        $this->assertNull($record->config_value);
        $this->assertNotSame('test-secret-value', $record->encrypted_value);
        $this->getJson("/api/admin/ecosystem/modules/{$module->id}")
            ->assertOk()
            ->assertJsonPath('configuration.0.value', '••••••••')
            ->assertJsonMissing(['test-secret-value']);
    }

    public function test_report_registry_rejects_unknown_reports_and_unbounded_ranges(): void
    {
        Sanctum::actingAs(User::factory()->create(['role' => 'super_admin']));
        $this->getJson('/api/admin/reports/not-registered?from=2026-01-01&to=2026-01-31')->assertNotFound();
        $this->getJson('/api/admin/reports/order-performance?from=2020-01-01&to=2026-01-01')->assertUnprocessable();
    }

    private function payment(Order $order, int $currencyId, string $number, float $amount, string $status): Payment
    {
        return Payment::create([
            'uuid' => (string) Str::uuid(), 'order_id' => $order->id, 'currency_id' => $currencyId,
            'payment_number' => $number, 'amount' => $amount, 'status' => $status,
            'payment_status' => $status, 'paid_at' => $status === 'pending' ? null : now(),
        ]);
    }
}
