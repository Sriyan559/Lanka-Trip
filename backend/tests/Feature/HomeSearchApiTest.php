<?php

namespace Tests\Feature;

use App\Models\Banner;
use App\Models\Category;
use App\Models\Product;
use App\Models\Supplier;
use App\Models\TrendingKeyword;
use Database\Seeders\BannerSeeder;
use Database\Seeders\TrendingKeywordSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class HomeSearchApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_nav_menus_return_categories_and_static_menu_items(): void
    {
        $parent = Category::factory()->create([
            'name' => 'Ceylon Tea',
            'slug' => 'ceylon-tea',
            'sort_order' => 10,
        ]);
        Category::factory()->childOf($parent)->create([
            'name' => 'Black Tea',
            'slug' => 'black-tea',
            'sort_order' => 10,
        ]);
        Category::factory()->inactive()->create(['name' => 'Hidden']);

        $this->getJson('/api/nav/menus')
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('categories.0.name', 'Ceylon Tea')
            ->assertJsonPath('categories.0.children.0.name', 'Black Tea')
            ->assertJsonPath('menu.0', 'Secured Trading')
            ->assertJsonPath('menu.1', 'Verified Suppliers')
            ->assertJsonPath('menu.2', 'Top Products')
            ->assertJsonPath('menu.3', 'Video Channel');
    }

    public function test_trending_categories_are_active_and_ordered_by_sort_order(): void
    {
        Category::factory()->create(['name' => 'Cinnamon', 'sort_order' => 20]);
        Category::factory()->create(['name' => 'Ceylon Tea', 'sort_order' => 10]);
        Category::factory()->inactive()->create(['name' => 'Hidden Category', 'sort_order' => 1]);

        $this->getJson('/api/categories/trending')
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonCount(2, 'data')
            ->assertJsonPath('data.0.name', 'Ceylon Tea')
            ->assertJsonPath('data.1.name', 'Cinnamon');
    }

    public function test_homepage_banners_return_only_active_banners_ordered_by_sort_order(): void
    {
        Banner::create([
            'title' => 'Second Banner',
            'subtitle' => 'Second',
            'image' => 'https://example.com/second.jpg',
            'link' => '/suppliers',
            'sort_order' => 20,
            'status' => 'active',
        ]);
        Banner::create([
            'title' => 'First Banner',
            'subtitle' => 'First',
            'image' => 'https://example.com/first.jpg',
            'link' => '/products',
            'sort_order' => 10,
            'status' => 'active',
        ]);
        Banner::create([
            'title' => 'Inactive Banner',
            'subtitle' => 'Hidden',
            'image' => 'https://example.com/hidden.jpg',
            'sort_order' => 1,
            'status' => 'inactive',
        ]);

        $this->getJson('/api/home/banners')
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonCount(2, 'data')
            ->assertJsonPath('data.0.title', 'First Banner')
            ->assertJsonPath('data.0.link', '/products')
            ->assertJsonPath('data.1.title', 'Second Banner');
    }

    public function test_home_featured_products_return_only_active_featured_products(): void
    {
        $category = Category::factory()->create();
        $supplier = Supplier::factory()->create();
        Product::factory()->featured()->create([
            'category_id' => $category->id,
            'supplier_id' => $supplier->id,
            'name' => 'Pure Ceylon Black Tea',
        ]);
        Product::factory()->create([
            'category_id' => $category->id,
            'supplier_id' => $supplier->id,
            'name' => 'Ordinary Product',
            'is_featured' => false,
        ]);
        Product::factory()->inactive()->featured()->create([
            'category_id' => $category->id,
            'supplier_id' => $supplier->id,
            'name' => 'Inactive Featured',
        ]);

        $this->getJson('/api/home/featured-products')
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.name', 'Pure Ceylon Black Tea')
            ->assertJsonPath('data.0.is_featured', true);
    }

    public function test_home_trending_products_are_ordered_by_views_count(): void
    {
        $category = Category::factory()->create();
        $supplier = Supplier::factory()->create();
        Product::factory()->create([
            'category_id' => $category->id,
            'supplier_id' => $supplier->id,
            'name' => 'Lower Views',
            'views_count' => 25,
        ]);
        Product::factory()->create([
            'category_id' => $category->id,
            'supplier_id' => $supplier->id,
            'name' => 'Higher Views',
            'views_count' => 900,
        ]);

        $this->getJson('/api/home/trending-products')
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonCount(2, 'data')
            ->assertJsonPath('data.0.name', 'Higher Views')
            ->assertJsonPath('data.0.views_count', 900)
            ->assertJsonPath('data.1.name', 'Lower Views');
    }

    public function test_home_verified_suppliers_return_active_verified_suppliers_only(): void
    {
        Supplier::factory()->create([
            'company_name' => 'Verified Supplier',
            'verification_status' => 'verified',
            'status' => 'active',
        ]);
        Supplier::factory()->pending()->create([
            'company_name' => 'Pending Supplier',
            'status' => 'active',
        ]);
        Supplier::factory()->inactive()->create([
            'company_name' => 'Inactive Verified Supplier',
            'verification_status' => 'verified',
        ]);

        $this->getJson('/api/home/verified-suppliers')
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.company_name', 'Verified Supplier')
            ->assertJsonPath('data.0.verified', true);
    }

    public function test_home_trending_keywords_are_seeded_and_ordered(): void
    {
        $this->seed(TrendingKeywordSeeder::class);
        TrendingKeyword::where('keyword', 'Coconut Oil')->update(['status' => 'inactive']);

        $this->getJson('/api/home/trending-keywords')
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.0.keyword', 'Ceylon Tea')
            ->assertJsonPath('data.1.keyword', 'Blue Sapphire')
            ->assertJsonMissing(['keyword' => 'Coconut Oil'])
            ->assertJsonPath('keywords.0', 'Ceylon Tea')
            ->assertJsonPath('keywords.1', 'Blue Sapphire');
    }

    public function test_product_search_matches_product_text_and_category(): void
    {
        $tea = Category::factory()->create(['name' => 'Ceylon Tea', 'slug' => 'ceylon-tea']);
        $rubber = Category::factory()->create(['name' => 'Rubber Gloves', 'slug' => 'rubber-gloves']);
        $supplier = Supplier::factory()->create();
        Product::factory()->create([
            'category_id' => $tea->id,
            'supplier_id' => $supplier->id,
            'name' => 'Pure Ceylon Black Tea',
            'description' => 'Premium tea for export.',
        ]);
        Product::factory()->create([
            'category_id' => $rubber->id,
            'supplier_id' => $supplier->id,
            'name' => 'Latex Gloves',
            'description' => 'Industrial gloves.',
        ]);

        $this->getJson('/api/search/products?q=Tea')
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('total', 1)
            ->assertJsonPath('data.0.name', 'Pure Ceylon Black Tea');

        $this->getJson('/api/search/products?q=Rubber')
            ->assertOk()
            ->assertJsonPath('total', 1)
            ->assertJsonPath('data.0.name', 'Latex Gloves');
    }

    public function test_supplier_search_matches_company_business_type_and_country(): void
    {
        Supplier::factory()->create([
            'company_name' => 'Ceylon Gem Exporters',
            'business_type' => 'Miner / Exporter',
            'country' => 'Sri Lanka',
        ]);
        Supplier::factory()->create([
            'company_name' => 'Nordic Importer',
            'business_type' => 'Distributor',
            'country' => 'Norway',
        ]);

        $this->getJson('/api/search/suppliers?q=Miner')
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('total', 1)
            ->assertJsonPath('data.0.company_name', 'Ceylon Gem Exporters');

        $this->getJson('/api/search/suppliers?q=Norway')
            ->assertOk()
            ->assertJsonPath('total', 1)
            ->assertJsonPath('data.0.company_name', 'Nordic Importer');
    }

    public function test_global_search_returns_products_suppliers_and_categories(): void
    {
        $category = Category::factory()->create([
            'name' => 'Cinnamon',
            'slug' => 'cinnamon',
        ]);
        $supplier = Supplier::factory()->create([
            'company_name' => 'Ceylon Cinnamon Exporters',
            'business_type' => 'Exporter',
        ]);
        Product::factory()->create([
            'category_id' => $category->id,
            'supplier_id' => $supplier->id,
            'name' => 'Ceylon Cinnamon Sticks',
            'description' => 'True cinnamon quills.',
        ]);
        Product::factory()->create([
            'name' => 'Unrelated Tea',
        ]);

        $this->getJson('/api/search/global?q=Cinnamon')
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonCount(1, 'products')
            ->assertJsonCount(1, 'suppliers')
            ->assertJsonCount(1, 'categories')
            ->assertJsonPath('products.0.name', 'Ceylon Cinnamon Sticks')
            ->assertJsonPath('suppliers.0.company_name', 'Ceylon Cinnamon Exporters')
            ->assertJsonPath('categories.0.name', 'Cinnamon');
    }

    public function test_banner_seeder_creates_sample_banners(): void
    {
        $this->seed(BannerSeeder::class);

        $this->getJson('/api/home/banners')
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonCount(3, 'data')
            ->assertJsonPath('data.0.title', 'Source Authentic Sri Lankan Exports');
    }
}
