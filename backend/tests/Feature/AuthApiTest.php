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
