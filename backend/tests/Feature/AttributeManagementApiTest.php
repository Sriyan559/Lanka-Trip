<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Product;
use App\Models\ProductAttribute;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class AttributeManagementApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_dashboard_is_protected_and_filters_database_attributes_server_side(): void
    {
        $this->getJson('/api/admin/catalogue/attributes')->assertUnauthorized();
        Sanctum::actingAs(User::factory()->create(['role' => 'super_admin']));
        $group = $this->group('Specifications');
        $this->attribute($group, ['name' => 'Shade', 'slug' => 'shade', 'data_type' => 'select', 'is_required' => true, 'is_variant_defining' => true]);
        $this->attribute($group, ['name' => 'Weight', 'slug' => 'weight', 'data_type' => 'number', 'status' => 'inactive']);

        $this->getJson("/api/admin/catalogue/attributes?search=Shade&groupId={$group}&dataType=select&required=1&variantGenerating=1&pageSize=1")
            ->assertOk()->assertJsonPath('data.attributes.total', 1)
            ->assertJsonPath('data.attributes.data.0.attributeName', 'Shade')
            ->assertJsonPath('data.kpis.0.value', 2)
            ->assertJsonPath('data.capabilities.variantRules', false)
            ->assertJsonPath('data.meta.refreshIntervalSeconds', 30);
    }

    public function test_missing_required_values_and_category_filter_use_authoritative_relationships(): void
    {
        Sanctum::actingAs(User::factory()->create(['role' => 'super_admin']));
        $category = Category::factory()->create(['status' => 'active']);
        $product = Product::factory()->create(['category_id' => $category->id, 'status' => 'active']);
        $attribute = $this->attribute($this->group('Required'), ['name' => 'Finish', 'slug' => 'finish', 'is_required' => true]);
        DB::table('category_attributes')->insert(['uuid' => (string) Str::uuid(), 'category_id' => $category->id, 'product_attribute_id' => $attribute->id, 'is_required' => true, 'is_filterable' => true, 'sort_order' => 10, 'status' => 'active', 'created_at' => now(), 'updated_at' => now()]);

        $this->getJson("/api/admin/catalogue/attributes?categoryId={$category->id}&scope=missing")
            ->assertOk()->assertJsonPath('data.attributes.total', 1)
            ->assertJsonPath('data.attributes.data.0.issuesCount', 1)
            ->assertJsonPath('data.kpis.5.value', 1);

        DB::table('product_attribute_values')->insert(['product_id' => $product->id, 'product_attribute_id' => $attribute->id, 'value_text' => 'Matte', 'status' => 'active', 'created_at' => now(), 'updated_at' => now()]);
        $this->getJson('/api/admin/catalogue/attributes?scope=missing')->assertOk()->assertJsonPath('data.attributes.total', 0);
    }

    public function test_create_update_values_bulk_and_archive_are_transactional_and_audited(): void
    {
        Sanctum::actingAs(User::factory()->create(['role' => 'super_admin']));
        $group = $this->group('Variants');
        $created = $this->postJson('/api/admin/catalogue/attributes', ['name' => 'Size Label', 'attribute_group_id' => $group, 'data_type' => 'select', 'is_required' => true, 'is_filterable' => true, 'is_variant_defining' => true, 'status' => 'active', 'allowed_values' => ['Small', 'Large']])->assertCreated()->json('data');
        $id = $created['id'];
        $this->patchJson("/api/admin/catalogue/attributes/{$id}", ['name' => 'Retail Size'])->assertOk()->assertJsonPath('data.attributeName', 'Retail Size');
        $this->putJson("/api/admin/catalogue/attributes/{$id}/values", ['values' => ['30 ml', '50 ml']])->assertOk()->assertJsonCount(2, 'data.allowedValues');
        $this->postJson('/api/admin/catalogue/attributes/bulk', ['ids' => [$id], 'action' => 'deactivate'])->assertOk()->assertJsonPath('data.updated', 1);
        $this->deleteJson("/api/admin/catalogue/attributes/{$id}")->assertOk();
        $this->assertDatabaseHas('product_attributes', ['id' => $id, 'status' => 'archived']);
        $this->assertDatabaseHas('activity_log', ['log_name' => 'product_attributes', 'description' => 'attribute.values_updated']);
    }

    public function test_import_is_atomic_and_export_is_server_generated(): void
    {
        Sanctum::actingAs(User::factory()->create(['role' => 'super_admin']));
        $group = $this->group('Import');
        $file = UploadedFile::fake()->createWithContent('attributes.csv', "name,data_type,group_id,is_required,allowed_values\nSkin Type,select,{$group},yes,Dry|Oily\n");
        $this->postJson('/api/admin/catalogue/attributes/import', ['file' => $file])->assertOk()->assertJsonPath('data.created', 1);
        $this->assertDatabaseHas('product_attributes', ['name' => 'Skin Type', 'data_type' => 'select']);
        $this->get('/api/admin/catalogue/attributes/export')->assertOk()->assertHeader('content-type', 'text/csv; charset=UTF-8');
    }

    public function test_merge_reassigns_values_and_rejects_self_merge(): void
    {
        Sanctum::actingAs(User::factory()->create(['role' => 'super_admin']));
        $group = $this->group('Merge');
        $source = $this->attribute($group, ['name' => 'Colour', 'slug' => 'colour']);
        $target = $this->attribute($group, ['name' => 'Color', 'slug' => 'color']);
        $product = Product::factory()->create();
        DB::table('product_attribute_values')->insert(['product_id' => $product->id, 'product_attribute_id' => $source->id, 'value_text' => 'Red', 'status' => 'active', 'created_at' => now(), 'updated_at' => now()]);
        $this->postJson("/api/admin/catalogue/attributes/{$source->id}/merge", ['target_id' => $source->id])->assertUnprocessable();
        $this->postJson("/api/admin/catalogue/attributes/{$source->id}/merge", ['target_id' => $target->id])->assertOk()->assertJsonPath('data.valuesReassigned', 1);
        $this->assertDatabaseMissing('product_attributes', ['id' => $source->id]);
        $this->assertDatabaseHas('product_attribute_values', ['product_attribute_id' => $target->id, 'value_text' => 'Red']);
    }

    private function group(string $name): int
    {
        return DB::table('attribute_groups')->insertGetId(['uuid' => (string) Str::uuid(), 'name' => $name, 'slug' => Str::slug($name).'-'.Str::random(5), 'sort_order' => 0, 'status' => 'active', 'created_at' => now(), 'updated_at' => now()]);
    }

    private function attribute(int $group, array $overrides = []): ProductAttribute
    {
        return ProductAttribute::create($overrides + ['uuid' => (string) Str::uuid(), 'attribute_group_id' => $group, 'name' => 'Attribute '.Str::random(5), 'slug' => 'attribute-'.Str::random(8), 'data_type' => 'text', 'is_required' => false, 'is_filterable' => true, 'is_variant_defining' => false, 'sort_order' => 0, 'status' => 'active']);
    }
}
