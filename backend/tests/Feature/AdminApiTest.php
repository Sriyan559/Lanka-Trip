<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Conversation;
use App\Models\Message;
use App\Models\Order;
use App\Models\Product;
use App\Models\Quotation;
use App\Models\RFQ;
use App\Models\Supplier;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;

class AdminApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_non_admin_access_is_denied(): void
    {
        $buyer = User::factory()->create(['role' => 'buyer']);

        $this->getJson('/api/admin/dashboard')->assertUnauthorized();

        $this->withToken($buyer->createToken('buyer')->plainTextToken)
            ->getJson('/api/admin/users')
            ->assertForbidden();
    }

    public function test_admin_dashboard_returns_required_counts(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $buyer = User::factory()->create(['role' => 'buyer']);
        $supplierUser = User::factory()->create(['role' => 'supplier']);
        $supplier = Supplier::factory()->create(['user_id' => $supplierUser->id]);
        $category = Category::factory()->create();
        Product::factory()->create([
            'category_id' => $category->id,
            'supplier_id' => $supplier->id,
            'status' => 'active',
        ]);
        Product::factory()->inactive()->create([
            'category_id' => $category->id,
            'supplier_id' => $supplier->id,
        ]);
        $rfq = $this->createRFQ($buyer, 'Open RFQ');
        $this->createRFQ($buyer, 'Closed RFQ', 'closed');
        $quotation = $this->createQuotation($rfq, $supplier, 'accepted');
        $this->createOrder($quotation);
        $conversation = Conversation::create([
            'buyer_id' => $buyer->id,
            'supplier_id' => $supplier->id,
        ]);
        Message::create([
            'conversation_id' => $conversation->id,
            'sender_id' => $buyer->id,
            'receiver_id' => $supplierUser->id,
            'message' => 'Admin visible message',
            'is_read' => false,
        ]);
        $buyer->notifyUser('new_message', 'Unread notice', 'Unread body', 'message', 1);

        $this->withToken($admin->createToken('admin')->plainTextToken)
            ->getJson('/api/admin/dashboard')
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('users_count', 3)
            ->assertJsonPath('buyers_count', 1)
            ->assertJsonPath('suppliers_count', 1)
            ->assertJsonPath('products_count', 2)
            ->assertJsonPath('active_products_count', 1)
            ->assertJsonPath('rfqs_count', 2)
            ->assertJsonPath('open_rfqs_count', 1)
            ->assertJsonPath('quotations_count', 1)
            ->assertJsonPath('orders_count', 1)
            ->assertJsonPath('pending_orders_count', 1)
            ->assertJsonPath('messages_count', 1)
            ->assertJsonPath('unread_notifications_count', 1);
    }

    public function test_admin_can_list_view_and_update_user_status(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $buyer = User::factory()->create([
            'role' => 'buyer',
            'name' => 'Nimal Buyer',
            'email' => 'nimal@example.com',
            'status' => 'active',
        ]);
        User::factory()->create(['role' => 'supplier', 'status' => 'inactive']);

        $this->withToken($admin->createToken('admin')->plainTextToken)
            ->getJson('/api/admin/users?search=Nimal&role=buyer&status=active')
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('total', 1)
            ->assertJsonPath('data.0.id', $buyer->id)
            ->assertJsonPath('data.0.email', 'nimal@example.com');

        $this->withToken($admin->createToken('admin-view')->plainTextToken)
            ->getJson("/api/admin/users/{$buyer->id}")
            ->assertOk()
            ->assertJsonPath('user.id', $buyer->id);

        $this->withToken($admin->createToken('admin-update')->plainTextToken)
            ->putJson("/api/admin/users/{$buyer->id}/status", ['status' => 'inactive'])
            ->assertOk()
            ->assertJsonPath('user.status', 'inactive');

        $this->assertSame('inactive', $buyer->refresh()->status);
    }

    public function test_admin_can_list_view_and_verify_suppliers_with_notification(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $supplierUser = User::factory()->create(['role' => 'supplier']);
        $supplier = Supplier::factory()->pending()->create([
            'user_id' => $supplierUser->id,
            'company_name' => 'Pending Tea Exporters',
            'status' => 'active',
        ]);
        $category = Category::factory()->create();
        Product::factory()->create([
            'category_id' => $category->id,
            'supplier_id' => $supplier->id,
            'name' => 'Supplier Product',
        ]);

        $this->withToken($admin->createToken('admin')->plainTextToken)
            ->getJson('/api/admin/suppliers?search=Pending&verification_status=pending&status=active')
            ->assertOk()
            ->assertJsonPath('total', 1)
            ->assertJsonPath('data.0.company_name', 'Pending Tea Exporters');

        $this->withToken($admin->createToken('admin-detail')->plainTextToken)
            ->getJson("/api/admin/suppliers/{$supplier->id}")
            ->assertOk()
            ->assertJsonPath('supplier.id', $supplier->id)
            ->assertJsonCount(1, 'supplier.latest_products');

        $this->withToken($admin->createToken('admin-verify')->plainTextToken)
            ->putJson("/api/admin/suppliers/{$supplier->id}/verify", [
                'verification_status' => 'verified',
            ])
            ->assertOk()
            ->assertJsonPath('supplier.verification_status', 'verified');

        $this->assertDatabaseHas('notifications', [
            'user_id' => $supplierUser->id,
            'type' => 'supplier_verified',
            'reference_type' => 'supplier',
            'reference_id' => $supplier->id,
            'is_read' => false,
        ]);
    }

    public function test_admin_can_list_update_and_soft_delete_products(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $category = Category::factory()->create(['slug' => 'ceylon-tea']);
        $supplier = Supplier::factory()->create();
        $product = Product::factory()->create([
            'category_id' => $category->id,
            'supplier_id' => $supplier->id,
            'name' => 'Pure Ceylon Black Tea',
            'status' => 'active',
        ]);
        Product::factory()->inactive()->create([
            'category_id' => $category->id,
            'supplier_id' => $supplier->id,
            'name' => 'Inactive Tea',
        ]);

        $this->withToken($admin->createToken('admin')->plainTextToken)
            ->getJson('/api/admin/products?search=Black&category=ceylon-tea&status=active')
            ->assertOk()
            ->assertJsonPath('total', 1)
            ->assertJsonPath('data.0.id', $product->id)
            ->assertJsonPath('data.0.status', 'active');

        $this->withToken($admin->createToken('admin-detail')->plainTextToken)
            ->getJson("/api/admin/products/{$product->id}")
            ->assertOk()
            ->assertJsonPath('product.id', $product->id);

        $this->withToken($admin->createToken('admin-status')->plainTextToken)
            ->putJson("/api/admin/products/{$product->id}/status", ['status' => 'inactive'])
            ->assertOk()
            ->assertJsonPath('product.status', 'inactive');

        $this->withToken($admin->createToken('admin-delete')->plainTextToken)
            ->deleteJson("/api/admin/products/{$product->id}")
            ->assertOk()
            ->assertExactJson([
                'success' => true,
                'message' => 'Product deleted successfully.',
            ]);

        $this->assertSoftDeleted('products', ['id' => $product->id]);
    }

    public function test_admin_can_list_rfqs_quotations_orders_and_messages(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $buyer = User::factory()->create(['role' => 'buyer', 'name' => 'Buyer User']);
        $supplierUser = User::factory()->create(['role' => 'supplier', 'name' => 'Supplier User']);
        $supplier = Supplier::factory()->create(['user_id' => $supplierUser->id]);
        $rfq = $this->createRFQ($buyer, 'Need Cinnamon Suppliers');
        $quotation = $this->createQuotation($rfq, $supplier, 'accepted');
        $order = $this->createOrder($quotation);
        $conversation = Conversation::create([
            'buyer_id' => $buyer->id,
            'supplier_id' => $supplier->id,
        ]);
        $message = Message::create([
            'conversation_id' => $conversation->id,
            'sender_id' => $buyer->id,
            'receiver_id' => $supplierUser->id,
            'message' => 'Need cinnamon shipment update',
            'is_read' => false,
        ]);

        $token = $admin->createToken('admin')->plainTextToken;

        $this->withToken($token)
            ->getJson('/api/admin/rfqs?search=Cinnamon')
            ->assertOk()
            ->assertJsonPath('total', 1)
            ->assertJsonPath('data.0.id', $rfq->id);

        Auth::forgetGuards();

        $this->withToken($token)
            ->getJson('/api/admin/quotations?search=QT-2026')
            ->assertOk()
            ->assertJsonPath('total', 1)
            ->assertJsonPath('data.0.id', $quotation->id);

        Auth::forgetGuards();

        $this->withToken($token)
            ->getJson('/api/admin/orders?search=ORD-2026')
            ->assertOk()
            ->assertJsonPath('total', 1)
            ->assertJsonPath('data.0.id', $order->id);

        Auth::forgetGuards();

        $this->withToken($token)
            ->getJson('/api/admin/messages?search=cinnamon')
            ->assertOk()
            ->assertJsonPath('total', 1)
            ->assertJsonPath('data.0.id', $message->id)
            ->assertJsonPath('data.0.sender.name', 'Buyer User');
    }

    private function createRFQ(User $buyer, string $title, string $status = 'open'): RFQ
    {
        $rfq = RFQ::create([
            'user_id' => $buyer->id,
            'rfq_number' => 'RFQ-2026-'.str_pad((string) (RFQ::query()->count() + 1), 6, '0', STR_PAD_LEFT),
            'title' => $title,
            'description' => 'Export to Dubai',
            'destination_country' => 'UAE',
            'expected_delivery_date' => '2026-08-01',
            'status' => $status,
        ]);
        $rfq->items()->create([
            'product_name' => 'Pure Ceylon Black Tea',
            'quantity' => 1000,
            'unit' => 'kg',
            'specifications' => 'Premium grade',
        ]);

        return $rfq->load('items');
    }

    private function createQuotation(RFQ $rfq, Supplier $supplier, string $status = 'pending'): Quotation
    {
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
            'status' => $status,
        ]);
        $quotation->items()->create([
            'rfq_item_id' => $rfq->items->first()->id,
            'product_name' => 'Pure Ceylon Black Tea',
            'quantity' => 1000,
            'unit_price' => 5.25,
            'amount' => 5250,
        ]);

        return $quotation->load(['items', 'rfq', 'supplier']);
    }

    private function createOrder(Quotation $quotation): Order
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
            'status' => 'pending',
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
