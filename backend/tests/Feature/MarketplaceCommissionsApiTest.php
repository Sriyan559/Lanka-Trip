<?php

namespace Tests\Feature;

use App\Models\Supplier;
use App\Models\SupplierSettlement;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class MarketplaceCommissionsApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_commissions_require_authentication_and_admin_permission(): void
    {
        $this->getJson('/api/admin/marketplace/commissions')->assertUnauthorized();
        Sanctum::actingAs(User::factory()->create(['role' => 'buyer']));
        $this->getJson('/api/admin/marketplace/commissions')->assertForbidden();
    }

    public function test_missing_rule_domain_is_reported_without_fabricated_rules_or_rates(): void
    {
        Sanctum::actingAs(User::factory()->create(['role' => 'super_admin']));
        $response = $this->getJson('/api/admin/marketplace/commissions?perPage=10');
        $response->assertOk()->assertJsonPath('data.availability.available', false)
            ->assertJsonPath('data.availability.reason', 'commission_rule_domain_not_present')
            ->assertJsonPath('data.rules.items', [])->assertJsonPath('data.meta.total', 0)
            ->assertJsonPath('data.permissions.canCreate', false)->assertJsonPath('data.permissions.canApprove', false);
        $rate = collect($response->json('data.kpis'))->firstWhere('id', 'rate');
        $this->assertFalse($rate['available']);
        $this->assertNull($rate['value']);
    }

    public function test_commission_financials_reconcile_decimal_settlement_rows_by_currency_and_period(): void
    {
        Sanctum::actingAs($admin = User::factory()->create(['role' => 'super_admin']));
        DB::table('currencies')->insert(['uuid' => (string) Str::uuid(), 'code' => 'LKR', 'name' => 'Sri Lankan Rupee', 'symbol' => 'Rs', 'decimal_places' => 2, 'status' => 'active', 'created_at' => now(), 'updated_at' => now()]);
        $supplier = Supplier::factory()->create();
        foreach ([['commission' => '10.10', 'net' => '89.90', 'status' => 'pending'], ['commission' => '5.25', 'net' => '44.75', 'status' => 'paid']] as $index => $values) {
            SupplierSettlement::create(['uuid' => (string) Str::uuid(), 'settlement_number' => 'COM-SET-'.$index, 'supplier_id' => $supplier->id,
                'currency' => 'LKR', 'gross_amount' => '100.00', 'commission_amount' => $values['commission'], 'refund_adjustment' => '0.00',
                'other_adjustments' => '0.00', 'net_amount' => $values['net'], 'status' => $values['status'], 'period_start' => today()->subDay(),
                'period_end' => today(), 'created_by' => $admin->id]);
        }

        $response = $this->getJson('/api/admin/marketplace/commissions?currency=LKR&perPage=10');
        $response->assertOk()->assertJsonPath('data.context.currency', 'LKR')
            ->assertJsonPath('data.financial.available', true)->assertJsonPath('data.financial.commissionRevenue', '15.35')
            ->assertJsonPath('data.financial.pendingSettlementImpact', '89.90')->assertJsonPath('data.financial.settlementCount', 2)
            ->assertJsonCount(1, 'data.trend.items')->assertJsonPath('data.trend.items.0.commissionRevenue', '15.35');
        $this->assertSame('15.35', collect($response->json('data.kpis'))->firstWhere('id', 'revenue')['value']);
        $this->assertSame('89.90', collect($response->json('data.kpis'))->firstWhere('id', 'settlement')['value']);
        $this->assertStringNotContainsString('metadata', $response->getContent());
    }

    public function test_filters_and_export_are_validated_and_permission_protected(): void
    {
        Sanctum::actingAs(User::factory()->create(['role' => 'super_admin']));
        $this->getJson('/api/admin/marketplace/commissions?perPage=13')->assertUnprocessable();
        $this->getJson('/api/admin/marketplace/commissions?currency=ZZZ')->assertUnprocessable();
        $this->get('/api/admin/marketplace/commissions/export')->assertOk()->assertHeader('content-type', 'text/csv; charset=UTF-8');
        $this->assertDatabaseHas('activity_log', ['description' => 'marketplace.commissions.exported']);
    }
}
