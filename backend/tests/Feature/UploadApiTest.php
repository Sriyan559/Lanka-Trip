<?php

namespace Tests\Feature;

use App\Models\Upload;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class UploadApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_user_can_upload_an_image(): void
    {
        Storage::fake('public');
        $user = User::factory()->create();

        $response = $this->withToken($user->createToken('test')->plainTextToken)
            ->postJson('/api/uploads/image', [
                'file' => UploadedFile::fake()->image('product.jpg', 800, 600)->size(1024),
                'category' => 'product_image',
            ])
            ->assertCreated()
            ->assertJsonPath('success', true)
            ->assertJsonPath('type', 'image')
            ->assertJsonPath('file_type', 'image')
            ->assertJsonPath('category', 'product_image')
            ->assertJsonStructure([
                'id',
                'url',
                'path',
                'type',
                'original_name',
                'file_name',
                'file_path',
                'mime_type',
                'file_size',
            ]);

        $path = $response->json('path');

        Storage::disk('public')->assertExists($path);
        $this->assertStringStartsWith('uploads/images/', $path);
        $this->assertDatabaseHas('uploads', [
            'id' => $response->json('id'),
            'user_id' => $user->id,
            'original_name' => 'product.jpg',
            'file_type' => 'image',
            'category' => 'product_image',
        ]);
    }

    public function test_authenticated_user_can_upload_a_document(): void
    {
        Storage::fake('public');
        $user = User::factory()->create();

        $response = $this->withToken($user->createToken('test')->plainTextToken)
            ->postJson('/api/uploads/document', [
                'file' => UploadedFile::fake()->create(
                    'supplier-certificate.pdf',
                    512,
                    'application/pdf',
                ),
                'category' => 'supplier_certificate',
            ])
            ->assertCreated()
            ->assertJsonPath('success', true)
            ->assertJsonPath('type', 'document')
            ->assertJsonPath('file_type', 'document')
            ->assertJsonPath('category', 'supplier_certificate');

        $path = $response->json('path');

        Storage::disk('public')->assertExists($path);
        $this->assertStringStartsWith('uploads/documents/', $path);
        $this->assertDatabaseHas('uploads', [
            'id' => $response->json('id'),
            'user_id' => $user->id,
            'original_name' => 'supplier-certificate.pdf',
            'file_type' => 'document',
            'category' => 'supplier_certificate',
        ]);
    }

    public function test_upload_endpoints_reject_invalid_file_types(): void
    {
        Storage::fake('public');
        $user = User::factory()->create();
        $token = $user->createToken('test')->plainTextToken;

        $this->withToken($token)
            ->postJson('/api/uploads/image', [
                'file' => UploadedFile::fake()->create('script.exe', 10, 'application/octet-stream'),
            ])
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['file']);

        $this->withToken($token)
            ->postJson('/api/uploads/document', [
                'file' => UploadedFile::fake()->image('photo.png'),
            ])
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['file']);

        $this->assertDatabaseCount('uploads', 0);
    }

    public function test_upload_endpoints_validate_file_size_limits(): void
    {
        Storage::fake('public');
        $user = User::factory()->create();
        $token = $user->createToken('test')->plainTextToken;

        $this->withToken($token)
            ->postJson('/api/uploads/image', [
                'file' => UploadedFile::fake()->image('large.jpg')->size(5121),
            ])
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['file']);

        $this->withToken($token)
            ->postJson('/api/uploads/document', [
                'file' => UploadedFile::fake()->create('large.pdf', 20481, 'application/pdf'),
            ])
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['file']);

        $this->assertDatabaseCount('uploads', 0);
    }

    public function test_owner_can_delete_upload_and_physical_file(): void
    {
        Storage::fake('public');
        $user = User::factory()->create();
        $path = UploadedFile::fake()
            ->image('logo.png')
            ->storeAs('uploads/images', 'logo.png', 'public');
        $upload = Upload::create([
            'user_id' => $user->id,
            'original_name' => 'logo.png',
            'file_name' => 'logo.png',
            'file_path' => $path,
            'file_type' => 'image',
            'mime_type' => 'image/png',
            'file_size' => 1024,
            'category' => 'supplier_logo',
        ]);

        Storage::disk('public')->assertExists($path);

        $this->withToken($user->createToken('test')->plainTextToken)
            ->deleteJson("/api/uploads/{$upload->id}")
            ->assertOk()
            ->assertExactJson([
                'success' => true,
                'message' => 'Upload deleted successfully.',
            ]);

        Storage::disk('public')->assertMissing($path);
        $this->assertDatabaseMissing('uploads', ['id' => $upload->id]);
    }

    public function test_user_cannot_delete_another_users_upload(): void
    {
        Storage::fake('public');
        $owner = User::factory()->create();
        $otherUser = User::factory()->create();
        $path = UploadedFile::fake()
            ->image('banner.png')
            ->storeAs('uploads/images', 'banner.png', 'public');
        $upload = Upload::create([
            'user_id' => $owner->id,
            'original_name' => 'banner.png',
            'file_name' => 'banner.png',
            'file_path' => $path,
            'file_type' => 'image',
            'mime_type' => 'image/png',
            'file_size' => 1024,
            'category' => 'banner_image',
        ]);

        $this->withToken($otherUser->createToken('test')->plainTextToken)
            ->deleteJson("/api/uploads/{$upload->id}")
            ->assertForbidden();

        Storage::disk('public')->assertExists($path);
        $this->assertDatabaseHas('uploads', ['id' => $upload->id]);
    }

    public function test_upload_routes_require_authentication(): void
    {
        Storage::fake('public');

        $this->postJson('/api/uploads/image', [
            'file' => UploadedFile::fake()->image('product.jpg'),
        ])->assertUnauthorized();

        $this->postJson('/api/uploads/document', [
            'file' => UploadedFile::fake()->create('document.pdf', 10, 'application/pdf'),
        ])->assertUnauthorized();

        $this->deleteJson('/api/uploads/1')->assertUnauthorized();
    }
}
