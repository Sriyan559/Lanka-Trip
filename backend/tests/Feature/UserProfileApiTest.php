<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Product;
use App\Models\Supplier;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class UserProfileApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_user_can_view_their_profile(): void
    {
        $user = User::factory()->create([
            'role' => 'supplier',
            'company_name' => 'Ceylon Spices Ltd.',
            'country' => 'Sri Lanka',
        ]);

        $this->withToken($user->createToken('test')->plainTextToken)
            ->getJson('/api/user/profile')
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('user.id', $user->id)
            ->assertJsonPath('user.email', $user->email)
            ->assertJsonPath('user.role', 'supplier')
            ->assertJsonPath('user.company_name', 'Ceylon Spices Ltd.')
            ->assertJsonPath('user.company', 'Ceylon Spices Ltd.');
    }

    public function test_authenticated_user_can_update_only_allowed_profile_fields(): void
    {
        $user = User::factory()->create([
            'name' => 'Old Name',
            'email' => 'buyer@example.com',
            'password' => 'OriginalPassword123!',
            'role' => 'buyer',
            'status' => 'active',
        ]);
        $originalPassword = $user->password;

        $this->withToken($user->createToken('test')->plainTextToken)
            ->putJson('/api/user/profile', [
                'name' => 'New Name',
                'email' => 'buyer@example.com',
                'phone' => '+94 77 555 1212',
                'company_name' => 'New Buyer Company',
                'country' => 'United Kingdom',
                'business_type' => 'Supplier',
                'website' => 'https://example.com',
            ])
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('user.name', 'New Name')
            ->assertJsonPath('user.phone', '+94 77 555 1212')
            ->assertJsonPath('user.company_name', 'New Buyer Company')
            ->assertJsonPath('user.country', 'United Kingdom');

        $user->refresh();

        $this->assertSame('buyer@example.com', $user->email);
        $this->assertSame('buyer', $user->role);
        $this->assertSame('active', $user->status);
        $this->assertSame($originalPassword, $user->password);
        $this->assertTrue(Hash::check('OriginalPassword123!', $user->password));
    }

    public function test_profile_endpoint_rejects_protected_account_fields(): void
    {
        $user = User::factory()->create([
            'email' => 'buyer@example.com',
            'role' => 'buyer',
            'status' => 'active',
        ]);

        $this->withToken($user->createToken('test')->plainTextToken)
            ->putJson('/api/user/profile', [
                'email' => 'changed@example.com',
                'role' => 'admin',
                'status' => 'inactive',
                'password' => 'ChangedPassword123!',
            ])
            ->assertUnprocessable()
            ->assertJsonValidationErrors([
                'email',
                'role',
                'status',
                'password',
            ]);

        $user->refresh();

        $this->assertSame('buyer@example.com', $user->email);
        $this->assertSame('buyer', $user->role);
        $this->assertSame('active', $user->status);
    }

    public function test_buyer_dashboard_returns_zero_for_modules_not_created_yet(): void
    {
        $user = User::factory()->create(['role' => 'buyer']);

        $this->withToken($user->createToken('test')->plainTextToken)
            ->getJson('/api/user/dashboard')
            ->assertOk()
            ->assertExactJson([
                'success' => true,
                'role' => 'buyer',
                'orders_count' => 0,
                'rfqs_count' => 0,
                'quotations_received_count' => 0,
                'wishlist_count' => 0,
                'inquiries_count' => 0,
                'messages_count' => 0,
            ]);
    }

    public function test_supplier_dashboard_returns_zero_for_modules_not_created_yet(): void
    {
        $user = User::factory()->create(['role' => 'supplier']);

        $this->withToken($user->createToken('test')->plainTextToken)
            ->getJson('/api/user/dashboard')
            ->assertOk()
            ->assertExactJson([
                'success' => true,
                'role' => 'supplier',
                'products_count' => 0,
                'quotations_count' => 0,
                'orders_count' => 0,
                'inquiries_count' => 0,
                'messages_count' => 0,
            ]);
    }

    public function test_supplier_dashboard_counts_products_through_the_supplier_profile(): void
    {
        $user = User::factory()->create(['role' => 'supplier']);
        $supplier = Supplier::factory()->create(['user_id' => $user->id]);
        $category = Category::factory()->create();
        Product::factory()->count(2)->create([
            'supplier_id' => $supplier->id,
            'category_id' => $category->id,
        ]);
        Product::factory()->inactive()->create([
            'supplier_id' => $supplier->id,
            'category_id' => $category->id,
        ]);

        $this->withToken($user->createToken('test')->plainTextToken)
            ->getJson('/api/user/dashboard')
            ->assertOk()
            ->assertJsonPath('products_count', 2);
    }

    public function test_admin_dashboard_returns_available_user_counts_and_safe_module_counts(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);
        User::factory()->create(['role' => 'buyer']);
        User::factory()->count(2)->create(['role' => 'supplier']);

        $this->withToken($admin->createToken('test')->plainTextToken)
            ->getJson('/api/user/dashboard')
            ->assertOk()
            ->assertExactJson([
                'success' => true,
                'role' => 'admin',
                'users_count' => 4,
                'products_count' => 0,
                'suppliers_count' => 2,
                'rfqs_count' => 0,
                'orders_count' => 0,
            ]);
    }

    public function test_user_profile_and_dashboard_routes_require_authentication(): void
    {
        $this->getJson('/api/user/profile')->assertUnauthorized();
        $this->putJson('/api/user/profile', ['name' => 'Blocked'])->assertUnauthorized();
        $this->getJson('/api/user/dashboard')->assertUnauthorized();
    }
}
