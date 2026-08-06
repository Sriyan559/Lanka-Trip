<?php

namespace Tests\Feature;

use App\Models\Supplier;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class MarketplaceWorkspacesApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_all_workspaces_require_admin_authentication_and_return_honest_capabilities(): void
    {
        $this->getJson('/api/admin/marketplace/workspaces/orders')->assertUnauthorized();
        Sanctum::actingAs(User::factory()->create(['role' => 'buyer']));
        $this->getJson('/api/admin/marketplace/workspaces/orders')->assertForbidden();
        Sanctum::actingAs(User::factory()->create(['role' => 'super_admin']));
        foreach (['orders', 'manual-orders', 'cancellations', 'returns', 'promotions', 'policy-violations', 'commissions', 'settings', 'channels'] as $workspace) {
            $response = $this->getJson("/api/admin/marketplace/workspaces/{$workspace}")->assertOk()->assertJsonPath('data.source', 'database')->assertJsonPath('data.workspace', $workspace);
            if (in_array($workspace, ['promotions', 'manual-orders'], true)) $response->assertJsonPath('data.capability.availability', 'unavailable');
        }
    }

    public function test_supported_workspace_values_reconcile_to_source_tables(): void
    {
        Sanctum::actingAs(User::factory()->create(['role' => 'super_admin']));
        $buyer = User::factory()->create(['role' => 'buyer', 'name' => 'Database Customer']);
        $seller = Supplier::factory()->create(['company_name' => 'Database Seller']);
        $orderId = DB::table('orders')->insertGetId(['order_number' => 'ORD-WS-001', 'buyer_id' => $buyer->id, 'supplier_id' => $seller->id, 'total_amount' => 1200, 'currency' => 'LKR', 'status' => 'pending', 'order_source' => 'mobile_app', 'created_at' => now(), 'updated_at' => now()]);
        DB::table('order_items')->insert(['order_id' => $orderId, 'product_name' => 'Serum', 'quantity' => 2, 'unit_price' => 600, 'amount' => 1200, 'created_at' => now(), 'updated_at' => now()]);
        DB::table('return_cases')->insert(['uuid' => (string) Str::uuid(), 'return_number' => 'RET-WS-001', 'order_id' => $orderId, 'customer_id' => $buyer->id, 'supplier_id' => $seller->id, 'status' => 'requested', 'reason_code' => 'damaged', 'reason' => 'Damaged item', 'created_at' => now(), 'updated_at' => now()]);
        DB::table('supplier_settlements')->insert(['uuid' => (string) Str::uuid(), 'settlement_number' => 'SET-WS-001', 'supplier_id' => $seller->id, 'currency' => 'LKR', 'gross_amount' => 1200, 'commission_amount' => 120, 'net_amount' => 1080, 'period_start' => now()->toDateString(), 'period_end' => now()->toDateString(), 'status' => 'approved', 'created_at' => now(), 'updated_at' => now()]);
        $ruleId = DB::table('compliance_rules')->insertGetId(['uuid' => (string) Str::uuid(), 'rule_key' => 'authenticity', 'name' => 'Authenticity Review', 'rule_type' => 'product', 'severity' => 'critical', 'status' => 'active', 'created_at' => now(), 'updated_at' => now()]);
        DB::table('compliance_case_files')->insert(['uuid' => (string) Str::uuid(), 'compliance_rule_id' => $ruleId, 'case_number' => 'CMP-WS-001', 'case_type' => 'review', 'status' => 'open', 'compliance_status' => 'pending', 'created_at' => now(), 'updated_at' => now()]);

        $this->getJson('/api/admin/marketplace/workspaces/orders?currency=LKR')->assertOk()->assertJsonPath('data.meta.total', 1)->assertJsonPath('data.items.0.reference', 'ORD-WS-001')->assertJsonPath('data.items.0.amount.value', '1200');
        $this->getJson('/api/admin/marketplace/workspaces/returns?currency=LKR')->assertOk()->assertJsonPath('data.meta.total', 1)->assertJsonPath('data.items.0.reference', 'RET-WS-001');
        $this->getJson('/api/admin/marketplace/workspaces/commissions?currency=LKR')->assertOk()->assertJsonPath('data.items.0.commission.value', '120');
        $this->getJson('/api/admin/marketplace/workspaces/policy-violations')->assertOk()->assertJsonPath('data.items.0.reference', 'CMP-WS-001')->assertJsonPath('data.items.0.severity', 'critical');
        $this->getJson('/api/admin/marketplace/workspaces/channels')->assertOk()->assertJsonPath('data.items.0.reference', 'mobile_app')->assertJsonPath('data.items.0.orders', 1);
    }

    public function test_order_transition_uses_concurrency_history_and_audit_note(): void
    {
        $admin = User::factory()->create(['role' => 'super_admin']); Sanctum::actingAs($admin);
        $buyer = User::factory()->create(['role' => 'buyer']); $seller = Supplier::factory()->create();
        $orderId = DB::table('orders')->insertGetId(['order_number' => 'ORD-MUT-001', 'buyer_id' => $buyer->id, 'supplier_id' => $seller->id, 'total_amount' => 500, 'currency' => 'LKR', 'status' => 'pending', 'created_at' => now(), 'updated_at' => now()]);
        $this->patchJson("/api/admin/marketplace/orders/{$orderId}/status", ['status' => 'confirmed', 'expectedStatus' => 'cancelled', 'reason' => 'Review'])->assertConflict();
        $this->patchJson("/api/admin/marketplace/orders/{$orderId}/status", ['status' => 'confirmed', 'expectedStatus' => 'pending', 'reason' => 'Payment reviewed'])->assertOk()->assertJsonPath('data.status', 'confirmed');
        $this->assertDatabaseHas('order_status_histories', ['order_id' => $orderId, 'previous_status' => 'pending', 'new_status' => 'confirmed', 'notes' => 'Payment reviewed']);
        $this->postJson("/api/admin/marketplace/orders/{$orderId}/notes", ['note' => 'Internal QA note'])->assertCreated();
        $this->assertDatabaseHas('order_notes', ['order_id' => $orderId, 'note' => 'Internal QA note', 'is_internal' => true]);
    }

    public function test_export_requires_permission_and_escapes_spreadsheet_formulas(): void
    {
        Sanctum::actingAs(User::factory()->create(['role' => 'super_admin']));
        $buyer = User::factory()->create(['role' => 'buyer']); $seller = Supplier::factory()->create();
        DB::table('orders')->insert(['order_number' => '=UNSAFE', 'buyer_id' => $buyer->id, 'supplier_id' => $seller->id, 'total_amount' => 10, 'currency' => 'LKR', 'status' => 'pending', 'created_at' => now(), 'updated_at' => now()]);
        $response = $this->get('/api/admin/marketplace/workspaces/orders/export?currency=LKR');
        $response->assertOk()->assertHeader('content-type', 'text/csv; charset=UTF-8');
        $this->assertStringContainsString("'=UNSAFE", $response->streamedContent());
    }
}
