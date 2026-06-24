<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Product;
use App\Models\Supplier;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SupplierApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_supplier_list_is_paginated_and_only_returns_active_suppliers(): void
    {
        Supplier::factory()->count(3)->create();
        Supplier::factory()->inactive()->create([
            'company_name' => 'Hidden Supplier',
        ]);

        $this->getJson('/api/suppliers')
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('current_page', 1)
            ->assertJsonPath('per_page', 20)
            ->assertJsonPath('total', 3)
            ->assertJsonCount(3, 'data')
            ->assertJsonStructure([
                'data' => [
                    '*' => [
                        'id',
                        'user_id',
                        'company_name',
                        'slug',
                        'logo',
                        'cover_image',
                        'description',
                        'country',
                        'city',
                        'address',
                        'phone',
                        'email',
                        'website',
                        'business_type',
                        'verification_status',
                        'is_featured',
                        'rating',
                        'status',
                        'name',
                        'image',
                        'coverImage',
                        'location',
                        'verified',
                        'productsCount',
                    ],
                ],
            ]);
    }

    public function test_supplier_detail_includes_latest_active_products(): void
    {
        $supplier = Supplier::factory()->create([
            'company_name' => 'Lanka Tea Exports',
        ]);
        $category = Category::factory()->create();
        $older = Product::factory()->create([
            'supplier_id' => $supplier->id,
            'category_id' => $category->id,
            'name' => 'Older Tea',
            'created_at' => now()->subDay(),
        ]);
        $latest = Product::factory()->create([
            'supplier_id' => $supplier->id,
            'category_id' => $category->id,
            'name' => 'Latest Tea',
            'created_at' => now(),
        ]);
        Product::factory()->inactive()->create([
            'supplier_id' => $supplier->id,
            'category_id' => $category->id,
        ]);

        $this->getJson("/api/suppliers/{$supplier->id}")
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('id', $supplier->id)
            ->assertJsonPath('name', 'Lanka Tea Exports')
            ->assertJsonPath('products_count', 2)
            ->assertJsonCount(2, 'latest_products')
            ->assertJsonPath('latest_products.0.id', $latest->id)
            ->assertJsonPath('latest_products.1.id', $older->id)
            ->assertJsonPath('contact.email', $supplier->email);
    }

    public function test_supplier_list_can_filter_by_verification_country_and_business_type(): void
    {
        Supplier::factory()->create([
            'company_name' => 'Matching Supplier',
            'verification_status' => 'verified',
            'country' => 'Sri Lanka',
            'business_type' => 'Manufacturer',
        ]);
        Supplier::factory()->pending()->create([
            'country' => 'Sri Lanka',
            'business_type' => 'Manufacturer',
        ]);
        Supplier::factory()->create([
            'verification_status' => 'verified',
            'country' => 'India',
            'business_type' => 'Manufacturer',
        ]);
        Supplier::factory()->create([
            'verification_status' => 'verified',
            'country' => 'Sri Lanka',
            'business_type' => 'Exporter',
        ]);

        $this->getJson(
            '/api/suppliers?verification_status=verified&country=Sri%20Lanka&business_type=Manufacturer',
        )
            ->assertOk()
            ->assertJsonPath('total', 1)
            ->assertJsonPath('data.0.company_name', 'Matching Supplier');

        $this->getJson('/api/suppliers?verified=1')
            ->assertOk()
            ->assertJsonPath('total', 3);
    }

    public function test_supplier_list_can_search_by_company_name(): void
    {
        Supplier::factory()->create(['company_name' => 'Ceylon Gem Exporters']);
        Supplier::factory()->create(['company_name' => 'Lanka Tea Traders']);

        $this->getJson('/api/suppliers?search=Gem')
            ->assertOk()
            ->assertJsonPath('total', 1)
            ->assertJsonPath('data.0.company_name', 'Ceylon Gem Exporters');
    }

    public function test_supplier_products_are_paginated_and_only_include_active_owned_products(): void
    {
        $supplier = Supplier::factory()->create();
        $otherSupplier = Supplier::factory()->create();
        $category = Category::factory()->create();
        Product::factory()->count(22)->create([
            'supplier_id' => $supplier->id,
            'category_id' => $category->id,
        ]);
        Product::factory()->inactive()->create([
            'supplier_id' => $supplier->id,
            'category_id' => $category->id,
        ]);
        Product::factory()->create([
            'supplier_id' => $otherSupplier->id,
            'category_id' => $category->id,
        ]);

        $response = $this->getJson("/api/suppliers/{$supplier->id}/products")
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('supplier.id', $supplier->id)
            ->assertJsonPath('total', 22)
            ->assertJsonPath('per_page', 20)
            ->assertJsonPath('last_page', 2)
            ->assertJsonCount(20, 'data');

        collect($response->json('data'))->each(
            fn (array $product) => $this->assertSame($supplier->id, $product['supplier_id']),
        );
    }

    public function test_inactive_supplier_is_not_publicly_visible(): void
    {
        $supplier = Supplier::factory()->inactive()->create();

        $this->getJson("/api/suppliers/{$supplier->id}")->assertNotFound();
        $this->getJson("/api/suppliers/{$supplier->id}/products")->assertNotFound();
    }
}
