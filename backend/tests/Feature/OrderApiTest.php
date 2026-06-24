<?php

namespace Tests\Feature;

use App\Models\Order;
use App\Models\Quotation;
use App\Models\RFQ;
use App\Models\Supplier;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;

class OrderApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_buyer_can_create_order_from_accepted_quotation(): void
    {
        [$buyer, $supplierUser, $quotation] = $this->acceptedQuotation();

        $this->withToken($buyer->createToken('test')->plainTextToken)
            ->postJson('/api/orders', ['quotation_id' => $quotation->id])
            ->assertCreated()
            ->assertJsonPath('success', true)
            ->assertJsonPath('order.order_number', 'ORD-2026-000001')
            ->assertJsonPath('order.buyer_id', $buyer->id)
            ->assertJsonPath('order.supplier_id', $supplierUser->supplier->id)
            ->assertJsonPath('order.quotation_id', $quotation->id)
            ->assertJsonPath('order.rfq_id', $quotation->rfq_id)
            ->assertJsonPath('order.total_amount', 5250)
            ->assertJsonPath('order.currency', 'USD')
            ->assertJsonPath('order.status', 'pending')
            ->assertJsonCount(1, 'order.items')
            ->assertJsonPath('order.items.0.product_name', 'Pure Ceylon Black Tea')
            ->assertJsonPath('order.items.0.amount', 5250);

        $this->assertDatabaseHas('orders', [
            'order_number' => 'ORD-2026-000001',
            'buyer_id' => $buyer->id,
            'supplier_id' => $supplierUser->supplier->id,
            'quotation_id' => $quotation->id,
            'status' => 'pending',
        ]);
        $this->assertDatabaseHas('order_items', [
            'product_name' => 'Pure Ceylon Black Tea',
            'quantity' => 1000,
            'unit_price' => 5.25,
            'amount' => 5250,
        ]);
    }

    public function test_duplicate_order_creation_is_prevented(): void
    {
        [$buyer, , $quotation] = $this->acceptedQuotation();
        $this->createOrder($quotation);

        $this->withToken($buyer->createToken('test')->plainTextToken)
            ->postJson('/api/orders', ['quotation_id' => $quotation->id])
            ->assertConflict()
            ->assertExactJson([
                'success' => false,
                'message' => 'An order has already been created for this quotation.',
            ]);

        $this->assertDatabaseCount('orders', 1);
    }

    public function test_order_list_is_scoped_by_role_and_supports_status_filter(): void
    {
        [$buyer, $supplierUser, $quotation] = $this->acceptedQuotation();
        $buyerOrder = $this->createOrder($quotation, 'confirmed');
        [$otherBuyer, $otherSupplierUser, $otherQuotation] = $this->acceptedQuotation();
        $otherOrder = $this->createOrder($otherQuotation, 'pending');
        $admin = User::factory()->create(['role' => 'admin']);

        $this->withToken($buyer->createToken('buyer')->plainTextToken)
            ->getJson('/api/orders')
            ->assertOk()
            ->assertJsonPath('total', 1)
            ->assertJsonPath('data.0.id', $buyerOrder->id);

        Auth::forgetGuards();

        $this->withToken($supplierUser->createToken('supplier')->plainTextToken)
            ->getJson('/api/orders?status=confirmed')
            ->assertOk()
            ->assertJsonPath('total', 1)
            ->assertJsonPath('data.0.id', $buyerOrder->id)
            ->assertJsonPath('data.0.status', 'confirmed');

        Auth::forgetGuards();

        $this->withToken($otherSupplierUser->createToken('other-supplier')->plainTextToken)
            ->getJson('/api/orders')
            ->assertOk()
            ->assertJsonPath('total', 1)
            ->assertJsonPath('data.0.id', $otherOrder->id);

        Auth::forgetGuards();

        $this->withToken($otherBuyer->createToken('other-buyer')->plainTextToken)
            ->getJson('/api/orders?status=pending')
            ->assertOk()
            ->assertJsonPath('total', 1)
            ->assertJsonPath('data.0.id', $otherOrder->id);

        Auth::forgetGuards();

        $this->withToken($admin->createToken('admin')->plainTextToken)
            ->getJson('/api/orders')
            ->assertOk()
            ->assertJsonPath('total', 2)
            ->assertJsonCount(2, 'data');
    }

    public function test_order_details_include_buyer_supplier_quotation_and_items(): void
    {
        [$buyer, $supplierUser, $quotation] = $this->acceptedQuotation();
        $order = $this->createOrder($quotation);

        foreach ([$buyer, $supplierUser] as $user) {
            Auth::forgetGuards();

            $this->withToken($user->createToken('details')->plainTextToken)
                ->getJson("/api/orders/{$order->id}")
                ->assertOk()
                ->assertJsonPath('success', true)
                ->assertJsonPath('order.id', $order->id)
                ->assertJsonPath('buyer.id', $buyer->id)
                ->assertJsonPath('supplier.id', $supplierUser->supplier->id)
                ->assertJsonPath('quotation.id', $quotation->id)
                ->assertJsonPath('items.0.product_name', 'Pure Ceylon Black Tea');
        }
    }

    public function test_supplier_can_follow_allowed_status_transitions(): void
    {
        [, $supplierUser, $quotation] = $this->acceptedQuotation();
        $order = $this->createOrder($quotation);
        $token = $supplierUser->createToken('supplier')->plainTextToken;

        foreach (['confirmed', 'production', 'shipped', 'completed'] as $status) {
            Auth::forgetGuards();

            $this->withToken($token)
                ->putJson("/api/orders/{$order->id}/status", ['status' => $status])
                ->assertOk()
                ->assertJsonPath('success', true)
                ->assertJsonPath('order.status', $status);

            $this->assertSame($status, $order->refresh()->status);
        }
    }

    public function test_invalid_order_status_transition_is_rejected(): void
    {
        [, $supplierUser, $quotation] = $this->acceptedQuotation();
        $order = $this->createOrder($quotation);

        $this->withToken($supplierUser->createToken('supplier')->plainTextToken)
            ->putJson("/api/orders/{$order->id}/status", ['status' => 'shipped'])
            ->assertConflict()
            ->assertExactJson([
                'success' => false,
                'message' => 'Order cannot transition from pending to shipped.',
            ]);

        $this->assertSame('pending', $order->refresh()->status);
    }

    public function test_status_updates_create_notifications_for_buyer(): void
    {
        [$buyer, $supplierUser, $quotation] = $this->acceptedQuotation();
        $order = $this->createOrder($quotation);

        $this->withToken($supplierUser->createToken('supplier')->plainTextToken)
            ->putJson("/api/orders/{$order->id}/status", ['status' => 'confirmed'])
            ->assertOk()
            ->assertJsonPath('order.status', 'confirmed');

        $this->assertDatabaseHas('notifications', [
            'user_id' => $buyer->id,
            'type' => 'order_status_changed',
            'title' => 'Order confirmed',
            'reference_type' => 'order',
            'reference_id' => $order->id,
            'is_read' => false,
        ]);

        Auth::forgetGuards();

        $this->withToken($buyer->createToken('notifications')->plainTextToken)
            ->getJson('/api/notifications')
            ->assertOk()
            ->assertJsonPath('unread_count', 1)
            ->assertJsonPath('notifications.0.title', 'Order confirmed');
    }

    public function test_admin_can_cancel_any_order_and_dashboard_counts_orders(): void
    {
        [$buyer, $supplierUser, $quotation] = $this->acceptedQuotation();
        $order = $this->createOrder($quotation, 'production');
        $admin = User::factory()->create(['role' => 'admin']);

        $this->withToken($admin->createToken('admin')->plainTextToken)
            ->putJson("/api/orders/{$order->id}/status", ['status' => 'cancelled'])
            ->assertOk()
            ->assertJsonPath('order.status', 'cancelled');

        Auth::forgetGuards();

        $this->withToken($buyer->createToken('buyer-dashboard')->plainTextToken)
            ->getJson('/api/user/dashboard')
            ->assertOk()
            ->assertJsonPath('orders_count', 1);

        Auth::forgetGuards();

        $this->withToken($supplierUser->createToken('supplier-dashboard')->plainTextToken)
            ->getJson('/api/user/dashboard')
            ->assertOk()
            ->assertJsonPath('orders_count', 1);

        Auth::forgetGuards();

        $this->withToken($admin->createToken('admin-dashboard')->plainTextToken)
            ->getJson('/api/user/dashboard')
            ->assertOk()
            ->assertJsonPath('orders_count', 1);
    }

    public function test_order_endpoints_enforce_authentication_and_ownership(): void
    {
        [$buyer, $supplierUser, $quotation] = $this->acceptedQuotation();
        $order = $this->createOrder($quotation);
        $otherBuyer = User::factory()->create(['role' => 'buyer']);
        $otherSupplier = Supplier::factory()->create();

        $this->postJson('/api/orders', ['quotation_id' => $quotation->id])->assertUnauthorized();
        $this->getJson('/api/orders')->assertUnauthorized();
        $this->getJson("/api/orders/{$order->id}")->assertUnauthorized();
        $this->putJson("/api/orders/{$order->id}/status", ['status' => 'confirmed'])->assertUnauthorized();

        $this->withToken($otherBuyer->createToken('other-buyer')->plainTextToken)
            ->postJson('/api/orders', ['quotation_id' => $quotation->id])
            ->assertForbidden();

        Auth::forgetGuards();

        $this->withToken($otherBuyer->createToken('other-buyer-view')->plainTextToken)
            ->getJson("/api/orders/{$order->id}")
            ->assertNotFound();

        Auth::forgetGuards();

        $this->withToken($buyer->createToken('buyer-status')->plainTextToken)
            ->putJson("/api/orders/{$order->id}/status", ['status' => 'confirmed'])
            ->assertForbidden();

        Auth::forgetGuards();

        $this->withToken($otherSupplier->user->createToken('other-supplier')->plainTextToken)
            ->getJson("/api/orders/{$order->id}")
            ->assertNotFound();

        Auth::forgetGuards();

        $this->withToken($supplierUser->createToken('supplier-status')->plainTextToken)
            ->putJson("/api/orders/{$order->id}/status", ['status' => 'confirmed'])
            ->assertOk();
    }

    private function acceptedQuotation(): array
    {
        $buyer = User::factory()->create(['role' => 'buyer']);
        $supplierUser = User::factory()->create(['role' => 'supplier']);
        $supplier = Supplier::factory()->create(['user_id' => $supplierUser->id]);
        $rfq = RFQ::create([
            'user_id' => $buyer->id,
            'rfq_number' => 'RFQ-2026-'.str_pad((string) (RFQ::query()->count() + 1), 6, '0', STR_PAD_LEFT),
            'title' => 'Need Ceylon Tea Suppliers',
            'description' => 'Export to Dubai',
            'destination_country' => 'UAE',
            'expected_delivery_date' => '2026-08-01',
            'status' => 'completed',
        ]);
        $rfqItem = $rfq->items()->create([
            'product_name' => 'Pure Ceylon Black Tea',
            'quantity' => 1000,
            'unit' => 'kg',
            'specifications' => 'Premium grade',
        ]);
        $quotation = Quotation::create([
            'rfq_id' => $rfq->id,
            'supplier_id' => $supplier->id,
            'quotation_number' => 'QT-2026-'.str_pad((string) (Quotation::query()->count() + 1), 6, '0', STR_PAD_LEFT),
            'total_amount' => 5250,
            'currency' => 'USD',
            'lead_time' => '15 days',
            'payment_terms' => '30% advance',
            'shipping_terms' => 'FOB Colombo',
            'remarks' => 'High quality products',
            'status' => 'accepted',
        ]);
        $quotation->items()->create([
            'rfq_item_id' => $rfqItem->id,
            'product_name' => 'Pure Ceylon Black Tea',
            'quantity' => 1000,
            'unit_price' => 5.25,
            'amount' => 5250,
        ]);

        $supplierUser->setRelation('supplier', $supplier);

        return [$buyer, $supplierUser, $quotation->load(['items', 'rfq', 'supplier'])];
    }

    private function createOrder(Quotation $quotation, string $status = 'pending'): Order
    {
        $order = Order::create([
            'order_number' => 'ORD-2026-'.str_pad((string) (Order::query()->count() + 1), 6, '0', STR_PAD_LEFT),
            'buyer_id' => $quotation->rfq->user_id,
            'supplier_id' => $quotation->supplier_id,
            'quotation_id' => $quotation->id,
            'rfq_id' => $quotation->rfq_id,
            'total_amount' => $quotation->total_amount,
            'currency' => $quotation->currency,
            'payment_terms' => $quotation->payment_terms,
            'shipping_terms' => $quotation->shipping_terms,
            'status' => $status,
        ]);
        $order->items()->createMany(
            $quotation->items->map(fn ($item): array => [
                'product_name' => $item->product_name,
                'quantity' => $item->quantity,
                'unit_price' => $item->unit_price,
                'amount' => $item->amount,
            ])->all(),
        );

        return $order;
    }
}
