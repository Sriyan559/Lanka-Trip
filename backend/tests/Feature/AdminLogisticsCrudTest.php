<?php

namespace Tests\Feature;

use App\Models\Supplier;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class AdminLogisticsCrudTest extends TestCase
{
    use RefreshDatabase;

    public function test_unauthenticated_requests_are_rejected(): void
    {
        $this->getJson('/api/admin/logistics/dashboard')->assertUnauthorized();
        $this->getJson('/api/admin/logistics/shipments')->assertUnauthorized();
        $this->postJson('/api/admin/logistics/shipments', [])->assertUnauthorized();
    }

    public function test_non_admin_requests_are_forbidden(): void
    {
        Sanctum::actingAs(User::factory()->create(['role' => 'buyer']));

        $this->getJson('/api/admin/logistics/dashboard')->assertForbidden();
        $this->getJson('/api/admin/logistics/shipments')->assertForbidden();
        $this->postJson('/api/admin/logistics/shipments', [])->assertForbidden();
    }

    public function test_admin_can_create_and_read_shipment(): void
    {
        $admin = User::factory()->create(['role' => 'super_admin']);
        Sanctum::actingAs($admin);

        $buyer = User::factory()->create(['role' => 'buyer']);
        $supplier = Supplier::factory()->create(['status' => 'active']);

        $orderId = DB::table('orders')->insertGetId([
            'order_number' => 'ORD-LOG-001',
            'buyer_id' => $buyer->id,
            'supplier_id' => $supplier->id,
            'total_amount' => 1500,
            'currency' => 'LKR',
            'status' => 'pending',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $payload = [
            'order_id' => $orderId,
            'supplier_id' => $supplier->id,
            'tracking_number' => 'TRK-998877',
            'carrier_reference' => 'REF-001',
            'estimated_ship_date' => now()->toDateString(),
            'estimated_delivery_date' => now()->addDays(3)->toDateString(),
            'status' => 'pending',
        ];

        $response = $this->postJson('/api/admin/logistics/shipments', $payload);
        $response->assertStatus(201);

        $shipmentId = $response->json('shipment.id');

        $this->assertDatabaseHas('shipments', [
            'id' => $shipmentId,
            'order_id' => $orderId,
            'tracking_number' => 'TRK-998877',
        ]);

        // READ detail
        $this->getJson("/api/admin/logistics/shipments/{$shipmentId}")
            ->assertOk()
            ->assertJsonPath('shipment.tracking_number', 'TRK-998877');
    }

    public function test_admin_can_update_shipment_details_and_status(): void
    {
        $admin = User::factory()->create(['role' => 'super_admin']);
        Sanctum::actingAs($admin);

        $buyer = User::factory()->create(['role' => 'buyer']);
        $supplier = Supplier::factory()->create(['status' => 'active']);

        $orderId = DB::table('orders')->insertGetId([
            'order_number' => 'ORD-LOG-002',
            'buyer_id' => $buyer->id,
            'supplier_id' => $supplier->id,
            'total_amount' => 2000,
            'currency' => 'LKR',
            'status' => 'pending',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $shipmentId = DB::table('shipments')->insertGetId([
            'uuid' => (string) \Illuminate\Support\Str::uuid(),
            'order_id' => $orderId,
            'supplier_id' => $supplier->id,
            'shipment_number' => 'SHP-2026-00002',
            'tracking_number' => 'TRK-OLD',
            'status' => 'pending',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Update details
        $this->putJson("/api/admin/logistics/shipments/{$shipmentId}", [
            'tracking_number' => 'TRK-UPDATED',
        ])->assertOk();

        $this->assertDatabaseHas('shipments', [
            'id' => $shipmentId,
            'tracking_number' => 'TRK-UPDATED',
        ]);

        // Valid status transition pending -> booked
        $this->patchJson("/api/admin/logistics/shipments/{$shipmentId}/status", [
            'status' => 'booked',
        ])->assertOk();

        $this->assertDatabaseHas('shipments', [
            'id' => $shipmentId,
            'status' => 'booked',
        ]);
    }

    public function test_admin_can_delete_shipment(): void
    {
        $admin = User::factory()->create(['role' => 'super_admin']);
        Sanctum::actingAs($admin);

        $buyer = User::factory()->create(['role' => 'buyer']);
        $supplier = Supplier::factory()->create(['status' => 'active']);

        $orderId = DB::table('orders')->insertGetId([
            'order_number' => 'ORD-LOG-003',
            'buyer_id' => $buyer->id,
            'supplier_id' => $supplier->id,
            'total_amount' => 1000,
            'currency' => 'LKR',
            'status' => 'pending',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $shipmentId = DB::table('shipments')->insertGetId([
            'uuid' => (string) \Illuminate\Support\Str::uuid(),
            'order_id' => $orderId,
            'supplier_id' => $supplier->id,
            'shipment_number' => 'SHP-2026-00003',
            'status' => 'pending',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $this->deleteJson("/api/admin/logistics/shipments/{$shipmentId}")
            ->assertOk();

        $this->assertSoftDeleted('shipments', [
            'id' => $shipmentId,
        ]);
    }
}
