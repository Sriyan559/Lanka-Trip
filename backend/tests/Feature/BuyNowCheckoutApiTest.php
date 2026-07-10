<?php

namespace Tests\Feature;

use App\Models\Product;
use App\Models\Supplier;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;

class BuyNowCheckoutApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_buyer_can_request_backend_checkout_quote(): void
    {
        [$buyer, $product] = $this->checkoutProduct();

        $this->withToken($buyer->createToken('buyer')->plainTextToken)
            ->postJson('/api/checkout/quote', [
                'product_slug' => $product->slug,
                'quantity' => 2,
            ])
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('quote.product.id', $product->id)
            ->assertJsonPath('quote.quantity', 2)
            ->assertJsonPath('quote.currency', 'LKR')
            ->assertJsonPath('quote.totals.subtotal', '6400.00')
            ->assertJsonPath('quote.totals.shipping', '250.00')
            ->assertJsonPath('quote.totals.total', '6650.00')
            ->assertJsonPath('payment_methods.0.id', 'card');
    }

    public function test_buyer_can_confirm_buy_now_order_with_pending_payment(): void
    {
        [$buyer, $product] = $this->checkoutProduct();

        $this->withToken($buyer->createToken('buyer')->plainTextToken)
            ->postJson('/api/checkout/confirm', $this->confirmPayload($product, 'cod'))
            ->assertCreated()
            ->assertJsonPath('success', true)
            ->assertJsonPath('order.status', 'confirmed')
            ->assertJsonPath('order.payment_status', 'pending')
            ->assertJsonPath('order.payment_method', 'cod')
            ->assertJsonPath('order.items.0.product_id', $product->id)
            ->assertJsonPath('order.total_amount', '3450.00');

        $this->assertDatabaseHas('orders', [
            'buyer_id' => $buyer->id,
            'supplier_id' => $product->supplier_id,
            'order_source' => 'buy_now',
            'payment_method_slug' => 'cod',
            'payment_status' => 'pending',
        ]);
        $this->assertDatabaseHas('payments', [
            'amount' => '3450.00',
            'payment_status' => 'pending',
        ]);
        $this->assertDatabaseHas('order_status_histories', [
            'new_status' => 'confirmed',
        ]);
    }

    public function test_card_confirmation_marks_demo_payment_as_paid(): void
    {
        [$buyer, $product] = $this->checkoutProduct();

        $this->withToken($buyer->createToken('buyer')->plainTextToken)
            ->postJson('/api/checkout/confirm', $this->confirmPayload($product, 'card'))
            ->assertCreated()
            ->assertJsonPath('order.status', 'confirmed')
            ->assertJsonPath('order.payment_status', 'paid')
            ->assertJsonPath('order.payment.payment_status', 'paid');

        $this->assertDatabaseHas('payments', ['payment_status' => 'paid']);
    }

    public function test_catalog_product_without_supplier_can_be_quoted_for_checkout(): void
    {
        $buyer = User::factory()->create(['role' => 'buyer']);
        $product = Product::factory()->create([
            'supplier_id' => null,
            'name' => 'Long Wear Matte Lipstick',
            'slug' => 'long-wear-matte-lipstick',
            'price' => 3200,
            'moq' => 1,
            'unit' => 'Item',
        ]);

        $this->withToken($buyer->createToken('buyer')->plainTextToken)
            ->postJson('/api/checkout/quote', [
                'product_slug' => $product->slug,
                'product_name' => $product->name,
                'quantity' => 1,
            ])
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('quote.product.name', 'Long Wear Matte Lipstick')
            ->assertJsonPath('quote.product.supplier.name', 'SL Beauty Platform Catalog');

        $this->assertDatabaseHas('suppliers', [
            'slug' => 'sl-beauty-platform-catalog',
            'status' => 'active',
            'verification_status' => 'verified',
        ]);
        $this->assertNotNull($product->refresh()->supplier_id);
    }

    public function test_missing_frontend_catalog_product_is_created_for_checkout(): void
    {
        $buyer = User::factory()->create(['role' => 'buyer']);

        $this->withToken($buyer->createToken('buyer')->plainTextToken)
            ->postJson('/api/checkout/quote', [
                'product_slug' => 'long-wear-matte-lipstick',
                'product_name' => 'Long Wear Matte Lipstick',
                'product_image' => 'https://example.test/lipstick.jpg',
                'category_slug' => 'makeup',
                'category_name' => 'Makeup',
                'unit_price' => 3200,
                'unit' => 'Item',
                'quantity' => 1,
            ])
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('quote.product.name', 'Long Wear Matte Lipstick')
            ->assertJsonPath('quote.product.supplier.name', 'SL Beauty Platform Catalog')
            ->assertJsonPath('quote.totals.total', '3450.00');

        $this->assertDatabaseHas('products', [
            'slug' => 'long-wear-matte-lipstick',
            'name' => 'Long Wear Matte Lipstick',
            'price' => '3200.00',
            'status' => 'active',
        ]);
    }

    public function test_tracking_is_scoped_to_order_owner(): void
    {
        [$buyer, $product] = $this->checkoutProduct();
        $otherBuyer = User::factory()->create(['role' => 'buyer']);

        $response = $this->withToken($buyer->createToken('buyer')->plainTextToken)
            ->postJson('/api/checkout/confirm', $this->confirmPayload($product, 'bank_transfer'))
            ->assertCreated();

        $orderNumber = $response->json('order.order_number');

        Auth::forgetGuards();

        $this->withToken($otherBuyer->createToken('other')->plainTextToken)
            ->getJson("/api/orders/{$orderNumber}/tracking")
            ->assertNotFound();

        Auth::forgetGuards();

        $this->withToken($buyer->createToken('owner')->plainTextToken)
            ->getJson("/api/orders/{$orderNumber}/tracking")
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('order.order_number', $orderNumber)
            ->assertJsonPath('order.timeline.0.key', 'confirmed');
    }

    private function checkoutProduct(): array
    {
        $buyer = User::factory()->create(['role' => 'buyer']);
        $supplier = Supplier::factory()->create();
        $product = Product::factory()->create([
            'supplier_id' => $supplier->id,
            'name' => 'Long Wear Matte Lipstick',
            'slug' => 'long-wear-matte-lipstick',
            'price' => 3200,
            'moq' => 1,
            'unit' => 'Item',
        ]);

        return [$buyer, $product->load('supplier')];
    }

    private function confirmPayload(Product $product, string $paymentMethod): array
    {
        return [
            'product_slug' => $product->slug,
            'quantity' => 1,
            'payment_method' => $paymentMethod,
            'customer' => [
                'fullName' => 'Sriya Perera',
                'email' => 'sriya@example.test',
                'phone' => '+94771234567',
            ],
            'delivery' => [
                'address1' => '12 Flower Road',
                'address2' => 'Apartment 3',
                'city' => 'Colombo',
                'province' => 'Western Province',
                'postalCode' => '00700',
                'country' => 'Sri Lanka',
            ],
            'idempotency_key' => 'test-key-'.$paymentMethod,
        ];
    }
}
