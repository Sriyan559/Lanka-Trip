<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class ProductMasterManagementApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_index_is_permission_gated_and_returns_database_products(): void
    {
        $this->getJson('/api/admin/catalogue/product-masters')->assertUnauthorized();
        Sanctum::actingAs(User::factory()->create(['role' => 'super_admin']));
        $category = Category::factory()->create(['name' => 'Skincare']);
        $product = Product::factory()->create(['category_id' => $category->id, 'name' => 'Live Serum']);
        DB::table('products')->where('id', $product->id)->update(['sku' => 'LIVE-001', 'approval_status' => 'approved']);

        $this->getJson('/api/admin/catalogue/product-masters?search=LIVE-001&pageSize=10')
            ->assertOk()->assertJsonPath('data.pagination.total', 1)
            ->assertJsonPath('data.products.0.productName', 'Live Serum')
            ->assertJsonPath('data.products.0.brand', 'Unavailable')
            ->assertJsonPath('data.capabilities.liveTransport', 'polling')
            ->assertJsonPath('data.permissions.canManage', true);
    }

    public function test_supported_bulk_archive_changes_authoritative_record(): void
    {
        Sanctum::actingAs(User::factory()->create(['role' => 'super_admin']));
        $product = Product::factory()->create();
        $this->postJson('/api/admin/catalogue/product-masters/bulk', ['action' => 'archive', 'ids' => [$product->id]])->assertOk()->assertJsonPath('data.affected', 1);
        $this->assertSoftDeleted('products', ['id' => $product->id]);
    }

    public function test_saved_view_is_persisted_per_user(): void
    {
        $user = User::factory()->create(['role' => 'super_admin']);
        Sanctum::actingAs($user);
        $this->postJson('/api/admin/catalogue/product-masters/saved-views', ['name' => 'My pending products', 'filters' => ['approvalStatus' => 'Pending Approval'], 'activeTab' => 'pending', 'isDefault' => true])->assertCreated()->assertJsonPath('data.user_id', $user->id);
        $this->assertDatabaseHas('admin_product_master_saved_views', ['user_id' => $user->id, 'name' => 'My pending products', 'is_default' => true]);
    }
}
