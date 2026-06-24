<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Product;
use App\Models\Supplier;
use App\Models\User;
use App\Models\Wishlist;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class WishlistApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_user_can_add_a_wishlist_item(): void
    {
        [$user, $product] = $this->userAndProduct();

        $this->withToken($user->createToken('test')->plainTextToken)
            ->postJson('/api/wishlist', ['product_id' => $product->id])
            ->assertCreated()
            ->assertJsonPath('success', true)
            ->assertJsonPath('item.product.id', $product->id)
            ->assertJsonPath('item.product.name', $product->name)
            ->assertJsonPath('item.product.supplier', $product->supplier->company_name)
            ->assertJsonPath('items_count', 1)
            ->assertJsonCount(1, 'items')
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.id', $product->id)
            ->assertJsonPath('data.0.image', $product->featured_image);

        $this->assertDatabaseHas('wishlists', [
            'user_id' => $user->id,
            'product_id' => $product->id,
        ]);
    }

    public function test_adding_a_duplicate_returns_the_existing_item_without_creating_another_row(): void
    {
        [$user, $product] = $this->userAndProduct();
        $token = $user->createToken('test')->plainTextToken;

        $firstResponse = $this->withToken($token)
            ->postJson('/api/wishlist', ['product_id' => $product->id])
            ->assertCreated();

        $this->withToken($token)
            ->postJson('/api/wishlist', ['product_id' => $product->id])
            ->assertOk()
            ->assertJsonPath('item.id', $firstResponse->json('item.id'))
            ->assertJsonPath('items_count', 1)
            ->assertJsonCount(1, 'items');

        $this->assertDatabaseCount('wishlists', 1);
    }

    public function test_authenticated_user_can_list_their_wishlist(): void
    {
        [$user, $product] = $this->userAndProduct();
        $wishlist = Wishlist::create([
            'user_id' => $user->id,
            'product_id' => $product->id,
        ]);

        $this->withToken($user->createToken('test')->plainTextToken)
            ->getJson('/api/wishlist')
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('items_count', 1)
            ->assertJsonPath('items.0.id', $wishlist->id)
            ->assertJsonPath('items.0.product.id', $product->id)
            ->assertJsonPath('items.0.product.slug', $product->slug)
            ->assertJsonPath('items.0.product.featured_image', $product->featured_image)
            ->assertJsonPath('items.0.product.price', (float) $product->price)
            ->assertJsonPath('items.0.product.moq', 100)
            ->assertJsonPath('items.0.product.unit', $product->unit)
            ->assertJsonPath('data.0.id', $product->id)
            ->assertJsonPath('data.0.wishlist_id', $wishlist->id);
    }

    public function test_authenticated_user_can_remove_a_product_from_their_wishlist(): void
    {
        [$user, $product] = $this->userAndProduct();
        Wishlist::create([
            'user_id' => $user->id,
            'product_id' => $product->id,
        ]);

        $this->withToken($user->createToken('test')->plainTextToken)
            ->deleteJson("/api/wishlist/{$product->id}")
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('items_count', 0)
            ->assertJsonCount(0, 'items')
            ->assertJsonCount(0, 'data');

        $this->assertDatabaseMissing('wishlists', [
            'user_id' => $user->id,
            'product_id' => $product->id,
        ]);
    }

    public function test_user_cannot_remove_another_users_wishlist_item(): void
    {
        [$owner, $product] = $this->userAndProduct();
        $otherUser = User::factory()->create();
        Wishlist::create([
            'user_id' => $owner->id,
            'product_id' => $product->id,
        ]);

        $this->withToken($otherUser->createToken('test')->plainTextToken)
            ->deleteJson("/api/wishlist/{$product->id}")
            ->assertOk()
            ->assertJsonPath('items_count', 0);

        $this->assertDatabaseHas('wishlists', [
            'user_id' => $owner->id,
            'product_id' => $product->id,
        ]);
    }

    public function test_wishlist_endpoints_require_authentication(): void
    {
        $this->getJson('/api/wishlist')->assertUnauthorized();
        $this->postJson('/api/wishlist', ['product_id' => 1])->assertUnauthorized();
        $this->deleteJson('/api/wishlist/1')->assertUnauthorized();
    }

    private function userAndProduct(): array
    {
        $user = User::factory()->create();
        $supplier = Supplier::factory()->create();
        $category = Category::factory()->create();
        $product = Product::factory()->create([
            'supplier_id' => $supplier->id,
            'category_id' => $category->id,
            'price' => 18.50,
            'moq' => 100,
            'unit' => 'Kg',
        ]);

        return [$user, $product->load('supplier')];
    }
}
