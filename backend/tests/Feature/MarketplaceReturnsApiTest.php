<?php

namespace Tests\Feature;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\ReturnCase;
use App\Models\ReturnItem;
use App\Models\Supplier;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class MarketplaceReturnsApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_marketplace_returns_requires_authentication_and_permission(): void
    {
        $this->getJson('/api/admin/marketplace/returns')->assertUnauthorized();

        $unauthorizedUser = User::factory()->create(['role' => 'buyer']);
        Sanctum::actingAs($unauthorizedUser);
        $this->getJson('/api/admin/marketplace/returns')->assertForbidden();
    }

    public function test_marketplace_returns_index_returns_paginated_cases_and_kpis(): void
    {
        $admin = User::factory()->create(['role' => 'super_admin']);
        Sanctum::actingAs($admin);

        $customer = User::factory()->create(['name' => 'Elena Rodriguez', 'email' => 'elena@example.test']);
        $supplier = Supplier::factory()->create(['company_name' => 'Luxe Distribution']);
        $order = Order::create([
            'order_number' => 'ORD-2026-009021',
            'buyer_id' => $customer->id,
            'supplier_id' => $supplier->id,
            'total_amount' => '9000.00',
            'currency' => 'LKR',
            'status' => 'delivered',
            'payment_status' => 'paid',
            'fulfillment_status' => 'fulfilled',
        ]);
        $orderItem = OrderItem::create([
            'order_id' => $order->id,
            'product_name' => 'Radiance Vitamin C Serum',
            'quantity' => 2,
            'unit_price' => '4500.00',
            'amount' => '9000.00',
        ]);

        $returnCase = ReturnCase::create([
            'uuid' => (string) Str::uuid(),
            'return_number' => 'RET-2026-045091',
            'order_id' => $order->id,
            'customer_id' => $customer->id,
            'supplier_id' => $supplier->id,
            'status' => 'requested',
            'reason_code' => 'Defective Product',
            'reason' => 'Seal broken and leaking',
            'metadata' => [
                'return_type' => 'Product Return',
                'risk_level' => 'High',
                'customer_name' => 'Elena Rodriguez',
                'supplier_name' => 'Luxe Distribution',
                'product_name' => 'Radiance Vitamin C Serum',
            ],
        ]);

        ReturnItem::create([
            'return_case_id' => $returnCase->id,
            'order_item_id' => $orderItem->id,
            'quantity' => 1,
            'condition' => 'Damaged',
            'inspection_status' => 'pending',
            'approved_refund_amount' => 4500.00,
        ]);

        $response = $this->getJson('/api/admin/marketplace/returns?search=RET-2026-045091&perPage=10');

        $response->assertOk()
            ->assertJsonPath('total', 1)
            ->assertJsonPath('data.0.returnReference', 'RET-2026-045091')
            ->assertJsonPath('data.0.customerName', 'Elena Rodriguez')
            ->assertJsonPath('data.0.productName', 'Radiance Vitamin C Serum')
            ->assertJsonPath('data.0.supplierName', 'Luxe Distribution')
            ->assertJsonPath('metrics.newReturnRequests', 1);
    }

    public function test_bulk_assign_cases_updates_assigned_officer(): void
    {
        $admin = User::factory()->create(['role' => 'super_admin']);
        Sanctum::actingAs($admin);

        $customer = User::factory()->create();
        $supplier = Supplier::factory()->create();
        $order = Order::create([
            'order_number' => 'ORD-2026-009022',
            'buyer_id' => $customer->id,
            'supplier_id' => $supplier->id,
            'total_amount' => '4500.00',
            'currency' => 'LKR',
            'status' => 'delivered',
        ]);

        $returnCase = ReturnCase::create([
            'uuid' => (string) Str::uuid(),
            'return_number' => 'RET-2026-045092',
            'order_id' => $order->id,
            'customer_id' => $customer->id,
            'supplier_id' => $supplier->id,
            'status' => 'requested',
            'reason_code' => 'Defective Product',
            'reason' => 'Defect',
        ]);

        $response = $this->postJson('/api/admin/marketplace/returns/bulk-assign', [
            'returnIds' => [$returnCase->return_number],
            'officerName' => 'Sarah Connor',
            'reason' => 'Workload rebalancing',
        ]);

        $response->assertOk()
            ->assertJsonPath('success', true);

        $returnCase->refresh();
        $this->assertSame('Sarah Connor', $returnCase->metadata['assigned_officer'] ?? null);
    }

    public function test_override_inspection_updates_return_status(): void
    {
        $admin = User::factory()->create(['role' => 'super_admin']);
        Sanctum::actingAs($admin);

        $customer = User::factory()->create();
        $supplier = Supplier::factory()->create();
        $order = Order::create([
            'order_number' => 'ORD-2026-009023',
            'buyer_id' => $customer->id,
            'supplier_id' => $supplier->id,
            'total_amount' => '4500.00',
            'currency' => 'LKR',
            'status' => 'delivered',
        ]);

        $returnCase = ReturnCase::create([
            'uuid' => (string) Str::uuid(),
            'return_number' => 'RET-2026-045093',
            'order_id' => $order->id,
            'customer_id' => $customer->id,
            'supplier_id' => $supplier->id,
            'status' => 'inspection_pending',
            'reason_code' => 'Defective Product',
            'reason' => 'Defect',
        ]);

        $response = $this->postJson("/api/admin/marketplace/returns/{$returnCase->id}/override-inspection", [
            'reason' => 'Photo evidence sufficient for exception',
        ]);

        $response->assertOk()
            ->assertJsonPath('success', true);

        $returnCase->refresh();
        $this->assertSame('refund_pending', $returnCase->status);
        $this->assertTrue($returnCase->metadata['inspection_override'] ?? false);
    }

    public function test_approve_refund_completes_return_case(): void
    {
        $admin = User::factory()->create(['role' => 'super_admin']);
        Sanctum::actingAs($admin);

        $customer = User::factory()->create();
        $supplier = Supplier::factory()->create();
        $order = Order::create([
            'order_number' => 'ORD-2026-009024',
            'buyer_id' => $customer->id,
            'supplier_id' => $supplier->id,
            'total_amount' => '4500.00',
            'currency' => 'LKR',
            'status' => 'delivered',
        ]);

        $returnCase = ReturnCase::create([
            'uuid' => (string) Str::uuid(),
            'return_number' => 'RET-2026-045094',
            'order_id' => $order->id,
            'customer_id' => $customer->id,
            'supplier_id' => $supplier->id,
            'status' => 'refund_pending',
            'reason_code' => 'Defective Product',
            'reason' => 'Defect',
        ]);

        $response = $this->postJson("/api/admin/marketplace/returns/{$returnCase->id}/approve-refund", [
            'reason' => 'Verified item return and customer eligibility',
        ]);

        $response->assertOk()
            ->assertJsonPath('success', true);

        $returnCase->refresh();
        $this->assertSame('completed', $returnCase->status);
        $this->assertNotNull($returnCase->completed_at);
    }

    public function test_export_marketplace_returns_streams_csv(): void
    {
        $admin = User::factory()->create(['role' => 'super_admin']);
        Sanctum::actingAs($admin);

        $response = $this->get('/api/admin/marketplace/returns/export');

        $response->assertOk()
            ->assertHeader('content-type', 'text/csv; charset=UTF-8');
    }
}
