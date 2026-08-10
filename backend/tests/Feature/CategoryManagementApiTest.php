<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class CategoryManagementApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_dashboard_is_permission_gated_and_uses_database_hierarchy(): void
    {
        $this->getJson('/api/admin/catalogue/categories')->assertUnauthorized();
        Sanctum::actingAs(User::factory()->create(['role' => 'super_admin']));
        $root = Category::factory()->create(['name' => 'Beauty', 'slug' => 'beauty-live', 'parent_id' => null, 'status' => 'active']);
        $child = Category::factory()->create(['name' => 'Serums', 'slug' => 'serums-live', 'parent_id' => $root->id, 'status' => 'active']);
        Product::factory()->create(['name' => 'Live Serum', 'category_id' => $child->id, 'status' => 'active']);

        $this->getJson('/api/admin/catalogue/categories?search=Serums')
            ->assertOk()->assertJsonPath('data.categories.total', 1)
            ->assertJsonPath('data.categories.data.0.hierarchyPath', 'Beauty > Serums')
            ->assertJsonPath('data.categories.data.0.activeProductsCount', 1)
            ->assertJsonPath('data.categories.data.0.channelEligibilityText', 'Unavailable')
            ->assertJsonPath('data.capabilities.channels', false);
    }

    public function test_move_rejects_a_descendant_parent(): void
    {
        Sanctum::actingAs(User::factory()->create(['role' => 'super_admin']));
        $root = Category::factory()->create(['parent_id' => null]);
        $child = Category::factory()->create(['parent_id' => $root->id]);
        $this->postJson("/api/admin/catalogue/categories/{$root->id}/move", ['parent_id' => $child->id])->assertUnprocessable()->assertJsonValidationErrors('parent_id');
        $this->assertDatabaseHas('categories', ['id' => $root->id, 'parent_id' => null]);
    }

    public function test_create_update_and_merge_change_authoritative_records(): void
    {
        Sanctum::actingAs(User::factory()->create(['role' => 'super_admin']));
        $target = Category::factory()->create(['name' => 'Target']);
        $source = Category::factory()->create(['name' => 'Source']);
        $product = Product::factory()->create(['category_id' => $source->id]);
        $this->postJson('/api/admin/catalogue/categories', ['name' => 'Created', 'slug' => 'created-live', 'description' => null, 'parent_id' => $target->id, 'sort_order' => 2, 'status' => 'active'])->assertCreated();
        $this->patchJson("/api/admin/catalogue/categories/{$source->id}", ['name' => 'Source Updated', 'slug' => $source->slug, 'description' => null, 'parent_id' => null, 'sort_order' => 0, 'status' => 'inactive'])->assertOk();
        $this->postJson("/api/admin/catalogue/categories/{$source->id}/merge", ['target_id' => $target->id])->assertOk()->assertJsonPath('data.productsReassigned', 1);
        $this->assertDatabaseMissing('categories', ['id' => $source->id]);
        $this->assertDatabaseHas('products', ['id' => $product->id, 'category_id' => $target->id]);
    }

    public function test_parent_status_level_filters_and_pagination_are_server_side(): void
    {
        Sanctum::actingAs(User::factory()->create(['role' => 'super_admin']));
        $root = Category::factory()->create(['parent_id' => null, 'status' => 'active']);
        Category::factory()->create(['parent_id' => $root->id, 'status' => 'inactive']);
        Category::factory()->create(['parent_id' => $root->id, 'status' => 'active']);

        $this->getJson("/api/admin/catalogue/categories?parentId={$root->id}&status=active&level=2&pageSize=1&page=1")
            ->assertOk()->assertJsonPath('data.categories.total', 1)->assertJsonCount(1, 'data.categories.data');
    }

    public function test_mapping_import_is_atomic_and_export_is_server_generated(): void
    {
        Sanctum::actingAs(User::factory()->create(['role' => 'super_admin']));
        $category = Category::factory()->create();
        $oldCategory = Category::factory()->create();
        $product = Product::factory()->create(['category_id' => $oldCategory->id]);
        $file = UploadedFile::fake()->createWithContent('mapping.csv', "product_id,category_id\n{$product->id},{$category->id}\n");

        $this->postJson('/api/admin/catalogue/categories/mapping-import', ['file' => $file])
            ->assertOk()->assertJsonPath('data.mapped', 1);
        $this->assertDatabaseHas('products', ['id' => $product->id, 'category_id' => $category->id]);
        $this->get('/api/admin/catalogue/categories/export')->assertOk()->assertHeader('content-type', 'text/csv; charset=UTF-8');
    }
}
