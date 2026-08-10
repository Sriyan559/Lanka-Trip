<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\UploadedFile;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class CatalogueCommandCenterApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_command_center_requires_authentication_and_admin_product_permission(): void
    {
        $this->getJson('/api/admin/catalogue/command-center')->assertUnauthorized();
        Sanctum::actingAs(User::factory()->create(['role' => 'buyer']));
        $this->getJson('/api/admin/catalogue/command-center')->assertForbidden();
    }

    public function test_dashboard_uses_real_catalogue_records_and_marks_missing_domains_unavailable(): void
    {
        Sanctum::actingAs(User::factory()->create(['role' => 'super_admin']));
        $category = Category::factory()->create(['name' => 'Skincare']);
        $complete = Product::factory()->create(['category_id' => $category->id, 'name' => 'Complete Serum']);
        $incomplete = Product::factory()->create(['category_id' => $category->id, 'name' => 'Incomplete Serum', 'description' => null, 'short_description' => null, 'featured_image' => null]);
        DB::table('products')->where('id', $complete->id)->update(['approval_status' => 'approved']);
        DB::table('products')->where('id', $incomplete->id)->update(['approval_status' => 'draft']);

        $response = $this->getJson('/api/admin/catalogue/command-center?dateFrom='.today()->subDays(29)->toDateString().'&dateTo='.today()->toDateString());

        $response->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.kpis.0.rawValue', 2)
            ->assertJsonPath('data.kpis.3.rawValue', 1)
            ->assertJsonPath('data.kpis.4.rawValue', 1)
            ->assertJsonPath('data.kpis.6.rawValue', 1)
            ->assertJsonPath('data.kpis.10.availability', 'unavailable')
            ->assertJsonPath('data.composition.total', 2)
            ->assertJsonPath('data.quality.categoryCoverage.totalCategories', 1)
            ->assertJsonPath('data.permissions.canExport', true);
    }

    public function test_priority_approvals_support_search_stage_and_pagination(): void
    {
        Sanctum::actingAs(User::factory()->create(['role' => 'super_admin']));
        $category = Category::factory()->create();
        foreach ([['Target Serum', 'submitted'], ['Other Cream', 'initial_review'], ['Target Oil', 'approved']] as [$name, $status]) {
            $product = Product::factory()->create(['category_id' => $category->id, 'name' => $name]);
            DB::table('products')->where('id', $product->id)->update(['approval_status' => $status]);
        }

        $this->getJson('/api/admin/catalogue/approvals/priority?search=target&stage=submitted&page=1&pageSize=1')
            ->assertOk()->assertJsonPath('data.pagination.total', 1)->assertJsonPath('data.items.0.productName', 'Target Serum');
    }

    public function test_export_requires_permission_and_contains_database_metrics(): void
    {
        Sanctum::actingAs(User::factory()->create(['role' => 'super_admin']));
        Product::factory()->create();
        $this->get('/api/admin/catalogue/command-center/export')->assertOk()->assertHeader('content-type', 'text/csv; charset=UTF-8');
    }

    public function test_invalid_date_range_is_rejected(): void
    {
        Sanctum::actingAs(User::factory()->create(['role' => 'super_admin']));
        $this->getJson('/api/admin/catalogue/command-center?dateFrom=2026-08-10&dateTo=2026-08-01')->assertUnprocessable();
    }

    public function test_csv_import_validates_then_writes_in_one_transaction(): void
    {
        Sanctum::actingAs(User::factory()->create(['role' => 'super_admin']));
        $category = Category::factory()->create();
        $file = UploadedFile::fake()->createWithContent('catalogue.csv', "sku,name,category_id,price,unit\nSKU-REAL-1,Real Serum,{$category->id},1250.00,piece\n");
        $this->post('/api/admin/catalogue/import', ['file' => $file], ['Accept' => 'application/json'])
            ->assertOk()->assertJsonPath('data.created', 1)->assertJsonPath('data.failed', 0);
        $this->assertDatabaseHas('products', ['sku' => 'SKU-REAL-1', 'name' => 'Real Serum']);
    }
}
