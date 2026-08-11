<?php

namespace Tests\Feature;

use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\Upload;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class MediaAssetManagementApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_dashboard_requires_authentication_and_filters_and_paginates_real_uploads(): void
    {
        $this->getJson('/api/admin/catalogue/media')->assertUnauthorized();
        Sanctum::actingAs($user = User::factory()->create(['role' => 'super_admin']));
        $this->asset($user, ['original_name' => 'hero.jpg', 'file_type' => 'image', 'approval_status' => 'approved']);
        $this->asset($user, ['original_name' => 'certificate.pdf', 'file_type' => 'document']);

        $this->getJson('/api/admin/catalogue/media?search=hero&fileType=image&approvalStatus=approved&pageSize=1')
            ->assertOk()->assertJsonPath('data.assets.total', 1)->assertJsonPath('data.assets.data.0.filename', 'hero.jpg')
            ->assertJsonPath('data.kpis.0.value', 2)->assertJsonPath('data.capabilities.channels', false)
            ->assertJsonPath('data.meta.refreshIntervalSeconds', 30);
    }

    public function test_admin_upload_uses_real_storage_hash_dimensions_and_audit_log(): void
    {
        Storage::fake('public'); Sanctum::actingAs(User::factory()->create(['role' => 'super_admin']));
        $png = base64_decode('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=');
        $response = $this->post('/api/admin/catalogue/media', ['file' => UploadedFile::fake()->createWithContent('serum.png', $png), 'category' => 'product_image', 'alt_text' => 'Serum bottle'])
            ->assertCreated()->assertJsonPath('data.width', 1)->assertJsonPath('data.height', 1)->assertJsonPath('data.altText', 'Serum bottle');
        $upload = Upload::findOrFail($response->json('data.id')); Storage::disk('public')->assertExists($upload->file_path);
        $this->assertNotNull($upload->sha256); $this->assertDatabaseHas('activity_log', ['log_name' => 'media_assets', 'description' => 'media.uploaded']);
    }

    public function test_product_variant_link_validation_and_transactional_bulk_actions(): void
    {
        Sanctum::actingAs($user = User::factory()->create(['role' => 'super_admin']));
        $one = Product::factory()->create(); $two = Product::factory()->create();
        $variant = ProductVariant::create(['uuid' => fake()->uuid(), 'product_id' => $one->id, 'name' => '30 ml', 'slug' => fake()->slug(), 'sku' => 'SERUM-30', 'price' => 10, 'stock_quantity' => 2, 'status' => 'active']);
        $asset = $this->asset($user);
        $this->patchJson("/api/admin/catalogue/media/{$asset->id}", ['product_id' => $two->id, 'product_variant_id' => $variant->id])->assertUnprocessable();
        $this->patchJson("/api/admin/catalogue/media/{$asset->id}", ['product_id' => $one->id, 'product_variant_id' => $variant->id])->assertOk()->assertJsonPath('data.variantId', (string) $variant->id);
        $this->postJson('/api/admin/catalogue/media/bulk', ['ids' => [$asset->id], 'action' => 'approve'])->assertOk()->assertJsonPath('data.updated', 1);
        $this->postJson('/api/admin/catalogue/media/bulk', ['ids' => [$asset->id], 'action' => 'archive'])->assertOk();
        $this->assertNotNull($asset->refresh()->archived_at);
    }

    public function test_manifest_import_and_filtered_export_are_server_generated(): void
    {
        Sanctum::actingAs($user = User::factory()->create(['role' => 'super_admin'])); $asset = $this->asset($user);
        $manifest = UploadedFile::fake()->createWithContent('media.csv', "upload_id,alt_text,description\n{$asset->id},Bottle image,Primary asset\n");
        $this->post('/api/admin/catalogue/media/import', ['file' => $manifest])->assertOk()->assertJsonPath('data.updated', 1);
        $this->assertDatabaseHas('uploads', ['id' => $asset->id, 'alt_text' => 'Bottle image']);
        $this->get('/api/admin/catalogue/media/export?fileType=image')->assertOk()->assertHeader('content-type', 'text/csv; charset=UTF-8');
    }

    private function asset(User $user, array $overrides = []): Upload
    {
        return Upload::create($overrides + ['user_id' => $user->id, 'original_name' => 'asset.jpg', 'file_name' => fake()->uuid().'.jpg', 'file_path' => 'uploads/images/asset.jpg', 'file_type' => 'image', 'mime_type' => 'image/jpeg', 'file_size' => 1024, 'category' => 'product_image', 'width' => 1200, 'height' => 1200, 'approval_status' => 'draft', 'processing_status' => 'completed']);
    }
}
