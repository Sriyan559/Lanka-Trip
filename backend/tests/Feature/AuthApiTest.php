<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class AuthApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_buyer_can_register_with_the_frontend_payload_shape(): void
    {
        $response = $this->postJson('/api/auth/register', [
            'name' => 'Nimal Perera',
            'company' => 'Perera Imports',
            'email' => 'NIMAL@example.com',
            'phone' => '+94 77 123 4567',
            'role' => 'buyer',
            'password' => base64_encode('Password123!'),
            'password_confirmation' => base64_encode('Password123!'),
        ]);

        $response
            ->assertCreated()
            ->assertJsonPath('success', true)
            ->assertJsonPath('user.email', 'nimal@example.com')
            ->assertJsonPath('user.role', 'buyer')
            ->assertJsonPath('user.company_name', 'Perera Imports')
            ->assertJsonPath('user.company', 'Perera Imports')
            ->assertJsonStructure([
                'token',
                'user' => [
                    'id',
                    'name',
                    'email',
                    'role',
                    'phone',
                    'company_name',
                    'company',
                    'country',
                    'status',
                ],
            ]);

        $user = User::where('email', 'nimal@example.com')->firstOrFail();

        $this->assertTrue(Hash::check('Password123!', $user->password));
        $this->assertDatabaseCount('personal_access_tokens', 1);
        $this->assertDatabaseCount('suppliers', 0);
    }

    public function test_supplier_registration_creates_a_pending_supplier_profile(): void
    {
        $response = $this->postJson('/api/auth/register', [
            'name' => 'Saman Exporter',
            'company' => 'Ceylon Harvest Exports',
            'email' => 'supplier@example.com',
            'phone' => '+94 77 555 1212',
            'country' => 'Sri Lanka',
            'role' => 'supplier',
            'password' => base64_encode('Password123!'),
            'password_confirmation' => base64_encode('Password123!'),
        ]);

        $response
            ->assertCreated()
            ->assertJsonPath('success', true)
            ->assertJsonPath('user.role', 'supplier')
            ->assertJsonPath('supplier.company_name', 'Ceylon Harvest Exports')
            ->assertJsonPath('supplier.slug', 'ceylon-harvest-exports')
            ->assertJsonPath('supplier.verification_status', 'pending')
            ->assertJsonPath('supplier.status', 'active')
            ->assertJsonPath('supplier.is_featured', false);

        $user = User::query()->where('email', 'supplier@example.com')->firstOrFail();

        $this->assertDatabaseHas('suppliers', [
            'user_id' => $user->id,
            'company_name' => 'Ceylon Harvest Exports',
            'slug' => 'ceylon-harvest-exports',
            'country' => 'Sri Lanka',
            'email' => 'supplier@example.com',
            'verification_status' => 'pending',
            'is_featured' => false,
            'status' => 'active',
        ]);
    }

    public function test_supplier_registration_generates_a_unique_company_slug(): void
    {
        $payload = [
            'name' => 'First Supplier',
            'company' => 'Ceylon Export Company',
            'email' => 'first@example.com',
            'role' => 'supplier',
            'password' => base64_encode('Password123!'),
            'password_confirmation' => base64_encode('Password123!'),
        ];

        $this->postJson('/api/auth/register', $payload)
            ->assertCreated()
            ->assertJsonPath('supplier.slug', 'ceylon-export-company');

        $this->postJson('/api/auth/register', [
            ...$payload,
            'name' => 'Second Supplier',
            'email' => 'second@example.com',
        ])
            ->assertCreated()
            ->assertJsonPath('supplier.slug', 'ceylon-export-company-2');
    }

    public function test_active_user_can_login_with_a_frontend_encoded_password(): void
    {
        $user = User::factory()->create([
            'email' => 'buyer@example.com',
            'password' => 'Password123!',
            'role' => 'buyer',
            'status' => 'active',
        ]);

        $response = $this->postJson('/api/auth/login', [
            'email' => ' BUYER@example.com ',
            'password' => base64_encode('Password123!'),
        ]);

        $response
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('user.id', $user->id)
            ->assertJsonPath('user.email', 'buyer@example.com')
            ->assertJsonStructure(['token', 'user']);

        $this->assertDatabaseCount('personal_access_tokens', 1);
    }

    public function test_authenticated_user_can_get_their_profile(): void
    {
        $user = User::factory()->create([
            'role' => 'supplier',
            'company_name' => 'Ceylon Export Co.',
        ]);
        $token = $user->createToken('test')->plainTextToken;

        $this->withToken($token)
            ->getJson('/api/auth/me')
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('user.id', $user->id)
            ->assertJsonPath('user.role', 'supplier')
            ->assertJsonPath('user.company', 'Ceylon Export Co.');
    }

    public function test_authenticated_user_can_logout_and_revoke_the_current_token(): void
    {
        $user = User::factory()->create();
        $token = $user->createToken('test')->plainTextToken;

        $this->withToken($token)
            ->postJson('/api/auth/logout')
            ->assertOk()
            ->assertExactJson([
                'success' => true,
                'message' => 'Logged out successfully.',
            ]);

        $this->assertDatabaseCount('personal_access_tokens', 0);

        Auth::forgetGuards();

        $this->withToken($token)
            ->getJson('/api/auth/me')
            ->assertUnauthorized();
    }

    public function test_inactive_user_cannot_login(): void
    {
        User::factory()->create([
            'email' => 'inactive@example.com',
            'password' => 'Password123!',
            'status' => 'inactive',
        ]);

        $this->postJson('/api/auth/login', [
            'email' => 'inactive@example.com',
            'password' => base64_encode('Password123!'),
        ])
            ->assertForbidden()
            ->assertExactJson([
                'success' => false,
                'message' => 'Forbidden',
            ]);
    }
}
