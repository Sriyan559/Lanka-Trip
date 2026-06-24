<?php

namespace Tests\Feature;

use App\Models\Category;
use Database\Seeders\CategorySeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CategoryApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_category_list_returns_active_roots_with_active_children(): void
    {
        $parent = Category::factory()->create([
            'name' => 'Gem Stones',
            'slug' => 'gem-stones',
            'sort_order' => 20,
        ]);
        Category::factory()->childOf($parent)->create([
            'name' => 'Blue Sapphire',
            'slug' => 'blue-sapphire',
            'sort_order' => 10,
        ]);
        Category::factory()->childOf($parent)->inactive()->create([
            'name' => 'Hidden Gem',
            'slug' => 'hidden-gem',
        ]);
        Category::factory()->inactive()->create([
            'name' => 'Inactive Root',
            'slug' => 'inactive-root',
        ]);
        Category::factory()->create([
            'name' => 'Ceylon Tea',
            'slug' => 'ceylon-tea',
            'sort_order' => 10,
        ]);

        $response = $this->getJson('/api/categories')
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonCount(2, 'data')
            ->assertJsonPath('data.0.slug', 'ceylon-tea')
            ->assertJsonPath('data.1.slug', 'gem-stones')
            ->assertJsonCount(1, 'data.1.children')
            ->assertJsonPath('data.1.children.0.slug', 'blue-sapphire');

        $slugs = collect($response->json('data'))->pluck('slug');

        $this->assertFalse($slugs->contains('inactive-root'));
    }

    public function test_active_category_can_be_shown_by_slug_with_its_parent(): void
    {
        $parent = Category::factory()->create([
            'name' => 'Gem Stones',
            'slug' => 'gem-stones',
        ]);
        Category::factory()->childOf($parent)->create([
            'name' => 'Blue Sapphire',
            'slug' => 'blue-sapphire',
        ]);

        $this->getJson('/api/categories/blue-sapphire')
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('category.name', 'Blue Sapphire')
            ->assertJsonPath('category.label', 'Blue Sapphire')
            ->assertJsonPath('category.slug', 'blue-sapphire')
            ->assertJsonPath('category.parent.slug', 'gem-stones')
            ->assertJsonCount(0, 'category.children');
    }

    public function test_inactive_category_is_not_publicly_visible(): void
    {
        Category::factory()->inactive()->create(['slug' => 'hidden-category']);

        $this->getJson('/api/categories/hidden-category')->assertNotFound();
        $this->getJson('/api/categories/hidden-category/products')->assertNotFound();
    }

    public function test_category_products_returns_empty_laravel_pagination_when_products_table_is_missing(): void
    {
        Category::factory()->create([
            'name' => 'Ceylon Tea',
            'slug' => 'ceylon-tea',
        ]);

        $this->getJson('/api/categories/ceylon-tea/products?per_page=6')
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('category.slug', 'ceylon-tea')
            ->assertJsonPath('current_page', 1)
            ->assertJsonPath('per_page', 6)
            ->assertJsonPath('total', 0)
            ->assertJsonPath('last_page', 1)
            ->assertJsonCount(0, 'data');
    }

    public function test_category_seeder_creates_required_sri_lankan_export_categories(): void
    {
        $this->seed(CategorySeeder::class);

        foreach ([
            'ceylon-tea',
            'blue-sapphire',
            'cinnamon',
            'coconut-oil',
            'batik-fabric',
            'rubber-gloves',
            'ayurvedic-oil',
            'gem-stones',
        ] as $slug) {
            $this->assertDatabaseHas('categories', [
                'slug' => $slug,
                'status' => 'active',
            ]);
        }

        $gemStones = Category::where('slug', 'gem-stones')->firstOrFail();

        $this->assertDatabaseHas('categories', [
            'slug' => 'blue-sapphire',
            'parent_id' => $gemStones->id,
        ]);
    }
}
