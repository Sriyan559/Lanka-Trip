<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Product;
use App\Models\Supplier;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SupplierProductApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_supplier_can_list_only_their_products(): void
    {
        [$user, $supplier] = $this->createSupplierUser();
        $otherSupplier = Supplier::factory()->create();
        $category = Category::factory()->create();
        Product::factory()->create([
            'category_id' => $category->id,
            'supplier_id' => $supplier->id,
            'name' => 'Owned Active Product',
        ]);
        Product::factory()->inactive()->create([
            'category_id' => $category->id,
            'supplier_id' => $supplier->id,
            'name' => 'Owned Inactive Product',
        ]);
        Product::factory()->create([
            'category_id' => $category->id,
            'supplier_id' => $otherSupplier->id,
            'name' => 'Other Supplier Product',
        ]);

        $this->actingAs($user)
            ->getJson('/api/supplier/products')
            ->assertOk()
            ->assertJsonPath('total', 2)
            ->assertJsonCount(2, 'data');

        $this->actingAs($user)
            ->getJson('/api/supplier/products?status=inactive')
            ->assertOk()
            ->assertJsonPath('total', 1)
            ->assertJsonPath('data.0.name', 'Owned Inactive Product');
    }

    public function test_supplier_can_create_a_product_owned_by_their_company(): void
    {
        [$user, $supplier] = $this->createSupplierUser();
        $category = Category::factory()->create();

        $this->actingAs($user)
            ->postJson('/api/supplier/products', [
                'category_id' => $category->id,
                'name' => 'Premium Ceylon Cinnamon',
                'short_description' => 'Export-grade cinnamon quills.',
                'description' => 'Produced and packed in Sri Lanka.',
                'price' => 18.75,
                'moq' => 50,
                'unit' => 'Kg',
                'supply_ability' => '5000 Kg per month',
                'lead_time' => '14 days',
                'port' => 'Colombo',
                'packaging_details' => '25 Kg cartons',
                'featured_image' => '/storage/products/cinnamon.jpg',
                'status' => 'active',
            ])
            ->assertCreated()
            ->assertJsonPath('success', true)
            ->assertJsonPath('product.name', 'Premium Ceylon Cinnamon')
            ->assertJsonPath('product.slug', 'premium-ceylon-cinnamon')
            ->assertJsonPath('product.supplier_id', $supplier->id)
            ->assertJsonPath('product.category.id', $category->id);

        $this->assertDatabaseHas('products', [
            'supplier_id' => $supplier->id,
            'category_id' => $category->id,
            'name' => 'Premium Ceylon Cinnamon',
            'slug' => 'premium-ceylon-cinnamon',
            'status' => 'active',
        ]);
    }

    public function test_supplier_can_view_update_and_delete_their_product(): void
    {
        [$user, $supplier] = $this->createSupplierUser();
        $category = Category::factory()->create();
        $product = Product::factory()->create([
            'category_id' => $category->id,
            'supplier_id' => $supplier->id,
            'name' => 'Original Product Name',
            'slug' => 'original-product-name',
        ]);

        $this->actingAs($user)
            ->getJson("/api/supplier/products/{$product->id}")
            ->assertOk()
            ->assertJsonPath('product.id', $product->id);

        $this->actingAs($user)
            ->putJson("/api/supplier/products/{$product->id}", [
                'name' => 'Updated Product Name',
                'price' => 29.50,
                'status' => 'inactive',
            ])
            ->assertOk()
            ->assertJsonPath('product.name', 'Updated Product Name')
            ->assertJsonPath('product.slug', 'updated-product-name')
            ->assertJsonPath('product.price', 29.5)
            ->assertJsonPath('product.status', 'inactive');

        $this->actingAs($user)
            ->deleteJson("/api/supplier/products/{$product->id}")
            ->assertOk()
            ->assertExactJson([
                'success' => true,
                'message' => 'Product deleted successfully.',
            ]);

        $this->assertSoftDeleted('products', ['id' => $product->id]);
    }

    public function test_supplier_cannot_access_or_mutate_another_suppliers_product(): void
    {
        [$user] = $this->createSupplierUser();
        $otherSupplier = Supplier::factory()->create();
        $product = Product::factory()->create([
            'supplier_id' => $otherSupplier->id,
        ]);

        $this->actingAs($user)
            ->getJson("/api/supplier/products/{$product->id}")
            ->assertNotFound();

        $this->actingAs($user)
            ->putJson("/api/supplier/products/{$product->id}", ['name' => 'Hijacked'])
            ->assertNotFound();

        $this->actingAs($user)
            ->deleteJson("/api/supplier/products/{$product->id}")
            ->assertNotFound();

        $this->assertDatabaseHas('products', [
            'id' => $product->id,
            'name' => $product->name,
            'deleted_at' => null,
        ]);
    }

    public function test_supplier_cannot_assign_product_ownership_or_system_fields(): void
    {
        [$user] = $this->createSupplierUser();
        $otherSupplier = Supplier::factory()->create();
        $category = Category::factory()->create();

        $this->actingAs($user)
            ->postJson('/api/supplier/products', [
                'category_id' => $category->id,
                'supplier_id' => $otherSupplier->id,
                'name' => 'Unsafe Product',
                'slug' => 'custom-slug',
                'price' => 10,
                'unit' => 'Kg',
                'is_featured' => true,
            ])
            ->assertUnprocessable()
            ->assertJsonValidationErrors([
                'supplier_id',
                'slug',
                'is_featured',
            ]);

        $this->assertDatabaseMissing('products', ['name' => 'Unsafe Product']);
    }

    public function test_supplier_product_routes_require_an_authenticated_supplier(): void
    {
        $category = Category::factory()->create();
        $payload = [
            'category_id' => $category->id,
            'name' => 'Test Product',
            'price' => 10,
            'unit' => 'Kg',
        ];

        $this->getJson('/api/supplier/products')->assertUnauthorized();
        $this->postJson('/api/supplier/products', $payload)->assertUnauthorized();

        $buyer = User::factory()->create(['role' => 'buyer']);

        $this->actingAs($buyer)
            ->getJson('/api/supplier/products')
            ->assertForbidden();

        $this->actingAs($buyer)
            ->postJson('/api/supplier/products', $payload)
            ->assertForbidden();
    }

    /**
     * @return array{User, Supplier}
     */
    private function createSupplierUser(): array
    {
        $user = User::factory()->create(['role' => 'supplier']);
        $supplier = Supplier::factory()->create(['user_id' => $user->id]);

        return [$user, $supplier];
    }
}
