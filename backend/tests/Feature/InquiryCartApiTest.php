<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\InquiryCart;
use App\Models\Product;
use App\Models\Supplier;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class InquiryCartApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_user_can_add_an_item_and_cart_is_created_automatically(): void
    {
        [$user, $product] = $this->userAndProduct();

        $this->withToken($user->createToken('test')->plainTextToken)
            ->postJson('/api/cart/items', [
                'product_id' => $product->id,
                'quantity' => 10,
                'note' => 'Need FOB Colombo price',
            ])
            ->assertCreated()
            ->assertJsonPath('success', true)
            ->assertJsonPath('items_count', 10)
            ->assertJsonCount(1, 'items')
            ->assertJsonPath('items.0.quantity', 10)
            ->assertJsonPath('items.0.note', 'Need FOB Colombo price')
            ->assertJsonPath('items.0.product.id', $product->id)
            ->assertJsonPath('items.0.product.name', $product->name)
            ->assertJsonPath('items.0.product.supplier', $product->supplier->company_name)
            ->assertJsonPath('items.0.product_id', $product->id)
            ->assertJsonPath('items.0.price', (float) $product->price);

        $this->assertDatabaseHas('inquiry_carts', ['user_id' => $user->id]);
        $this->assertDatabaseHas('inquiry_cart_items', [
            'product_id' => $product->id,
            'quantity' => 10,
            'note' => 'Need FOB Colombo price',
        ]);
    }

    public function test_adding_the_same_product_increases_existing_item_quantity(): void
    {
        [$user, $product] = $this->userAndProduct();
        $token = $user->createToken('test')->plainTextToken;

        $this->withToken($token)->postJson('/api/cart/items', [
            'product_id' => $product->id,
            'quantity' => 3,
            'note' => 'Initial note',
        ])->assertCreated();

        $this->withToken($token)
            ->postJson('/api/cart/items', [
                'product_id' => $product->id,
                'quantity' => 7,
            ])
            ->assertCreated()
            ->assertJsonPath('items_count', 10)
            ->assertJsonPath('items.0.quantity', 10)
            ->assertJsonPath('items.0.note', 'Initial note');

        $this->assertDatabaseCount('inquiry_cart_items', 1);
    }

    public function test_authenticated_user_can_add_an_item_by_product_slug(): void
    {
        [$user, $product] = $this->userAndProduct();

        $this->withToken($user->createToken('test')->plainTextToken)
            ->postJson('/api/cart/items', [
                'product_slug' => $product->slug,
                'quantity' => 2,
            ])
            ->assertCreated()
            ->assertJsonPath('success', true)
            ->assertJsonPath('items_count', 2)
            ->assertJsonPath('items.0.product_id', $product->id);

        $this->assertDatabaseHas('inquiry_cart_items', [
            'product_id' => $product->id,
            'quantity' => 2,
        ]);
    }

    public function test_authenticated_user_can_list_their_cart_with_eager_loaded_products(): void
    {
        [$user, $product] = $this->userAndProduct();
        $cart = InquiryCart::create(['user_id' => $user->id]);
        $cart->items()->create([
            'product_id' => $product->id,
            'quantity' => 4,
            'note' => null,
        ]);

        $this->withToken($user->createToken('test')->plainTextToken)
            ->getJson('/api/cart')
            ->assertOk()
            ->assertExactJson([
                'success' => true,
                'items' => [[
                    'id' => $cart->items()->first()->id,
                    'quantity' => 4,
                    'note' => null,
                    'product' => [
                        'id' => $product->id,
                        'name' => $product->name,
                        'featured_image' => $product->featured_image,
                        'price' => (float) $product->price,
                        'moq' => (float) $product->moq,
                        'unit' => $product->unit,
                        'supplier' => $product->supplier->company_name,
                    ],
                    'product_id' => $product->id,
                    'name' => $product->name,
                    'image' => $product->featured_image,
                    'price' => (float) $product->price,
                    'moq' => (float) $product->moq,
                    'unit' => $product->unit,
                    'moqUnit' => $product->unit,
                    'supplier' => $product->supplier->company_name,
                ]],
                'items_count' => 4,
            ]);
    }

    public function test_authenticated_user_can_update_quantity_and_note(): void
    {
        [$user, $product] = $this->userAndProduct();
        $cart = InquiryCart::create(['user_id' => $user->id]);
        $item = $cart->items()->create([
            'product_id' => $product->id,
            'quantity' => 2,
        ]);

        $this->withToken($user->createToken('test')->plainTextToken)
            ->putJson("/api/cart/items/{$item->id}", [
                'quantity' => 8,
                'note' => 'Include sample pricing',
            ])
            ->assertOk()
            ->assertJsonPath('items.0.quantity', 8)
            ->assertJsonPath('items.0.note', 'Include sample pricing')
            ->assertJsonPath('items_count', 8);

        $this->assertDatabaseHas('inquiry_cart_items', [
            'id' => $item->id,
            'quantity' => 8,
            'note' => 'Include sample pricing',
        ]);
    }

    public function test_authenticated_user_can_delete_a_single_item(): void
    {
        [$user, $product] = $this->userAndProduct();
        $cart = InquiryCart::create(['user_id' => $user->id]);
        $item = $cart->items()->create([
            'product_id' => $product->id,
            'quantity' => 2,
        ]);

        $this->withToken($user->createToken('test')->plainTextToken)
            ->deleteJson("/api/cart/items/{$item->id}")
            ->assertOk()
            ->assertJsonCount(0, 'items')
            ->assertJsonPath('items_count', 0);

        $this->assertDatabaseMissing('inquiry_cart_items', ['id' => $item->id]);
    }

    public function test_authenticated_user_can_clear_their_cart(): void
    {
        [$user, $product] = $this->userAndProduct();
        $secondProduct = Product::factory()->create([
            'category_id' => $product->category_id,
            'supplier_id' => $product->supplier_id,
        ]);
        $cart = InquiryCart::create(['user_id' => $user->id]);
        $cart->items()->createMany([
            ['product_id' => $product->id, 'quantity' => 2],
            ['product_id' => $secondProduct->id, 'quantity' => 3],
        ]);

        $this->withToken($user->createToken('test')->plainTextToken)
            ->deleteJson('/api/cart')
            ->assertOk()
            ->assertJsonCount(0, 'items')
            ->assertJsonPath('items_count', 0);

        $this->assertDatabaseCount('inquiry_cart_items', 0);
        $this->assertDatabaseHas('inquiry_carts', ['user_id' => $user->id]);
    }

    public function test_cart_endpoints_require_authentication(): void
    {
        $this->getJson('/api/cart')->assertUnauthorized();
        $this->postJson('/api/cart/items', [])->assertUnauthorized();
        $this->putJson('/api/cart/items/1', [])->assertUnauthorized();
        $this->deleteJson('/api/cart/items/1')->assertUnauthorized();
        $this->deleteJson('/api/cart')->assertUnauthorized();
    }

    public function test_user_cannot_update_or_delete_another_users_cart_item(): void
    {
        [$owner, $product] = $this->userAndProduct();
        $otherUser = User::factory()->create();
        $cart = InquiryCart::create(['user_id' => $owner->id]);
        $item = $cart->items()->create([
            'product_id' => $product->id,
            'quantity' => 2,
        ]);
        $token = $otherUser->createToken('test')->plainTextToken;

        $this->withToken($token)
            ->putJson("/api/cart/items/{$item->id}", ['quantity' => 5])
            ->assertNotFound();

        $this->withToken($token)
            ->deleteJson("/api/cart/items/{$item->id}")
            ->assertNotFound();

        $this->assertDatabaseHas('inquiry_cart_items', [
            'id' => $item->id,
            'quantity' => 2,
        ]);
    }

    private function userAndProduct(): array
    {
        $user = User::factory()->create();
        $supplier = Supplier::factory()->create();
        $category = Category::factory()->create();
        $product = Product::factory()->create([
            'supplier_id' => $supplier->id,
            'category_id' => $category->id,
            'price' => 12.50,
            'moq' => 50,
            'unit' => 'Kg',
        ]);

        return [$user, $product->load('supplier')];
    }
}
