<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProductApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_products_list_is_paginated_and_only_returns_active_products(): void
    {
        $category = Category::factory()->create(['slug' => 'ceylon-tea']);
        Product::factory()->count(25)->create(['category_id' => $category->id]);
        Product::factory()->inactive()->create(['category_id' => $category->id]);

        $this->getJson('/api/products')
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('current_page', 1)
            ->assertJsonPath('per_page', 20)
            ->assertJsonPath('last_page', 2)
            ->assertJsonPath('total', 25)
            ->assertJsonCount(20, 'data')
            ->assertJsonStructure([
                'data' => [
                    '*' => [
                        'id',
                        'name',
                        'slug',
                        'price',
                        'moq',
                        'unit',
                        'featured_image',
                        'images',
                        'category',
                        'is_featured',
                        'views_count',
                    ],
                ],
            ]);
    }

    public function test_product_details_include_category_images_and_required_fields(): void
    {
        $category = Category::factory()->create([
            'name' => 'Ceylon Tea',
            'slug' => 'ceylon-tea',
        ]);
        $product = Product::factory()->create([
            'category_id' => $category->id,
            'name' => 'Pure Ceylon Black Tea',
            'price' => 8.50,
            'moq' => 100,
            'unit' => 'Kg',
        ]);
        ProductImage::create([
            'product_id' => $product->id,
            'image' => 'https://example.com/second.jpg',
            'sort_order' => 20,
        ]);
        ProductImage::create([
            'product_id' => $product->id,
            'image' => 'https://example.com/first.jpg',
            'sort_order' => 10,
        ]);

        $this->getJson("/api/products/{$product->id}")
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('id', $product->id)
            ->assertJsonPath('name', 'Pure Ceylon Black Tea')
            ->assertJsonPath('price', 8.5)
            ->assertJsonPath('moq', 100)
            ->assertJsonPath('minOrder', 100)
            ->assertJsonPath('moqUnit', 'Kg')
            ->assertJsonPath('category.slug', 'ceylon-tea')
            ->assertJsonPath('images.0', 'https://example.com/first.jpg')
            ->assertJsonPath('images.1', 'https://example.com/second.jpg')
            ->assertJsonStructure([
                'short_description',
                'description',
                'supply_ability',
                'lead_time',
                'port',
                'packaging_details',
                'featured_image',
                'is_featured',
                'views_count',
                'related_products',
            ]);
    }

    public function test_products_can_be_searched_by_keyword(): void
    {
        $category = Category::factory()->create();
        Product::factory()->create([
            'category_id' => $category->id,
            'name' => 'Pure Ceylon Black Tea',
            'short_description' => 'Export tea from Sri Lanka',
        ]);
        Product::factory()->create([
            'category_id' => $category->id,
            'name' => 'Latex Rubber Gloves',
            'short_description' => 'Industrial hand protection',
        ]);

        $this->getJson('/api/products?search=Ceylon')
            ->assertOk()
            ->assertJsonPath('total', 1)
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.name', 'Pure Ceylon Black Tea');
    }

    public function test_products_can_be_filtered_by_category_slug(): void
    {
        $tea = Category::factory()->create(['slug' => 'ceylon-tea']);
        $cinnamon = Category::factory()->create(['slug' => 'cinnamon']);
        Product::factory()->count(2)->create(['category_id' => $tea->id]);
        Product::factory()->count(3)->create(['category_id' => $cinnamon->id]);

        $response = $this->getJson('/api/products?category=cinnamon')
            ->assertOk()
            ->assertJsonPath('total', 3)
            ->assertJsonCount(3, 'data');

        collect($response->json('data'))->each(
            fn (array $product) => $this->assertSame('cinnamon', $product['category']['slug']),
        );
    }

    public function test_products_support_required_sort_options(): void
    {
        $category = Category::factory()->create();
        $oldest = Product::factory()->create([
            'category_id' => $category->id,
            'name' => 'Oldest Product',
            'price' => 30,
            'views_count' => 50,
            'created_at' => now()->subDays(2),
        ]);
        $popular = Product::factory()->create([
            'category_id' => $category->id,
            'name' => 'Popular Product',
            'price' => 20,
            'views_count' => 500,
            'created_at' => now()->subDay(),
        ]);
        $latest = Product::factory()->create([
            'category_id' => $category->id,
            'name' => 'Latest Product',
            'price' => 10,
            'views_count' => 100,
            'created_at' => now(),
        ]);

        $this->getJson('/api/products?sort=latest')
            ->assertJsonPath('data.0.id', $latest->id);
        $this->getJson('/api/products?sort=oldest')
            ->assertJsonPath('data.0.id', $oldest->id);
        $this->getJson('/api/products?sort=price_asc')
            ->assertJsonPath('data.0.id', $latest->id);
        $this->getJson('/api/products?sort=price_desc')
            ->assertJsonPath('data.0.id', $oldest->id);
        $this->getJson('/api/products?sort=popular')
            ->assertJsonPath('data.0.id', $popular->id);
    }

    public function test_featured_endpoint_only_returns_active_featured_products(): void
    {
        $category = Category::factory()->create();
        Product::factory()->count(2)->featured()->create(['category_id' => $category->id]);
        Product::factory()->create(['category_id' => $category->id, 'is_featured' => false]);
        Product::factory()->featured()->inactive()->create(['category_id' => $category->id]);

        $response = $this->getJson('/api/products/featured')
            ->assertOk()
            ->assertJsonCount(2, 'data');

        collect($response->json('data'))->each(
            fn (array $product) => $this->assertTrue($product['is_featured']),
        );
    }

    public function test_trending_endpoint_orders_products_by_views_count(): void
    {
        $category = Category::factory()->create();
        Product::factory()->create([
            'category_id' => $category->id,
            'name' => 'Low Views',
            'views_count' => 10,
        ]);
        Product::factory()->create([
            'category_id' => $category->id,
            'name' => 'Highest Views',
            'views_count' => 1000,
        ]);
        Product::factory()->create([
            'category_id' => $category->id,
            'name' => 'Medium Views',
            'views_count' => 100,
        ]);

        $this->getJson('/api/products/trending')
            ->assertOk()
            ->assertJsonPath('data.0.name', 'Highest Views')
            ->assertJsonPath('data.1.name', 'Medium Views')
            ->assertJsonPath('data.2.name', 'Low Views');
    }

    public function test_product_details_return_at_most_eight_related_products_from_the_same_category(): void
    {
        $category = Category::factory()->create();
        $otherCategory = Category::factory()->create();
        $product = Product::factory()->create(['category_id' => $category->id]);
        Product::factory()->count(10)->create(['category_id' => $category->id]);
        Product::factory()->create(['category_id' => $otherCategory->id]);

        $response = $this->getJson("/api/products/{$product->id}")
            ->assertOk()
            ->assertJsonCount(8, 'related_products');

        collect($response->json('related_products'))->each(function (array $related) use ($category, $product): void {
            $this->assertNotSame($product->id, $related['id']);
            $this->assertSame($category->slug, $related['category']['slug']);
        });
    }
}
