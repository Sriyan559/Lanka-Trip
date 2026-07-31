<?php

namespace Tests\Feature;

use App\Models\User;
use Database\Seeders\SuperAdminSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class SuperAdminAuthTest extends TestCase
{
    use RefreshDatabase;

    private const USERNAME = 'super.admin.test';

    private const PASSWORD = 'TestOnlyPassword!42';

    private const EMAIL = 'super-admin@example.test';

    protected function setUp(): void
    {
        parent::setUp();

        $this->setSuperAdminEnvironment(self::USERNAME, self::PASSWORD);
        putenv('SUPER_ADMIN_EMAIL='.self::EMAIL);
        $_ENV['SUPER_ADMIN_EMAIL'] = self::EMAIL;
        $_SERVER['SUPER_ADMIN_EMAIL'] = self::EMAIL;
    }

    protected function tearDown(): void
    {
        $this->setSuperAdminEnvironment(null, null);
        putenv('SUPER_ADMIN_EMAIL');
        unset($_ENV['SUPER_ADMIN_EMAIL'], $_SERVER['SUPER_ADMIN_EMAIL']);

        parent::tearDown();
    }

    public function test_seeder_is_idempotent_hashes_password_and_assigns_exact_role(): void
    {
        $this->seed(SuperAdminSeeder::class);
        $firstHash = User::query()->where('username', self::USERNAME)->value('password');

        $this->seed(SuperAdminSeeder::class);

        $user = User::query()->where('username', self::USERNAME)->firstOrFail();

        $this->assertDatabaseCount('users', 1);
        $this->assertNotSame(self::PASSWORD, $user->password);
        $this->assertTrue(Hash::check(self::PASSWORD, $user->password));
        $this->assertSame($firstHash, $user->password);
        $this->assertSame('super_admin', $user->role);
        $this->assertSame('active', $user->status);
        $this->assertNotNull($user->email_verified_at);
        $this->assertDatabaseHas('roles', ['name' => 'super_admin', 'status' => 'active']);
        $this->assertDatabaseCount('role_user', 1);
        $this->assertDatabaseHas('role_user', [
            'user_id' => $user->id,
            'status' => 'active',
        ]);
    }

    public function test_super_admin_can_login_by_username_and_receives_safe_redirect(): void
    {
        $this->seed(SuperAdminSeeder::class);

        $response = $this->postJson('/api/auth/login', [
            'login' => strtoupper(self::USERNAME),
            'password' => self::PASSWORD,
        ]);

        $response
            ->assertOk()
            ->assertJsonPath('user.username', self::USERNAME)
            ->assertJsonPath('user.role', 'super_admin')
            ->assertJsonPath('redirect_to', '/admin/dashboard')
            ->assertJsonMissingPath('user.password')
            ->assertJsonMissingPath('user.remember_token')
            ->assertJsonMissingPath('user.password_hash');

        $this->assertNotEmpty($response->json('token'));
    }

    public function test_super_admin_can_login_by_configured_email_alias(): void
    {
        $this->seed(SuperAdminSeeder::class);

        $this->postJson('/api/auth/login', [
            'login' => strtoupper(self::EMAIL),
            'password' => self::PASSWORD,
        ])
            ->assertOk()
            ->assertJsonPath('user.username', self::USERNAME)
            ->assertJsonPath('user.email', self::EMAIL)
            ->assertJsonPath('user.role', 'super_admin')
            ->assertJsonPath('redirect_to', '/admin/dashboard');
    }

    public function test_invalid_password_is_rejected_with_a_generic_error(): void
    {
        $this->seed(SuperAdminSeeder::class);

        $this->postJson('/api/auth/login', [
            'login' => self::USERNAME,
            'password' => 'IncorrectTestPassword!42',
        ])
            ->assertUnauthorized()
            ->assertExactJson([
                'success' => false,
                'message' => 'Unauthorized',
            ]);
    }

    public function test_admin_routes_enforce_authentication_and_administrator_role(): void
    {
        $buyer = User::factory()->create(['role' => 'buyer']);
        $superAdmin = User::factory()->create(['role' => 'super_admin']);

        $this->getJson('/api/admin/dashboard')->assertUnauthorized();

        $this->withToken($buyer->createToken('buyer')->plainTextToken)
            ->getJson('/api/admin/dashboard')
            ->assertForbidden();

        Auth::forgetGuards();

        $this->withToken($superAdmin->createToken('super-admin')->plainTextToken)
            ->getJson('/api/admin/dashboard')
            ->assertOk()
            ->assertJsonPath('success', true);
    }

    private function setSuperAdminEnvironment(?string $username, ?string $password): void
    {
        foreach ([
            'SUPER_ADMIN_USERNAME' => $username,
            'SUPER_ADMIN_PASSWORD' => $password,
        ] as $key => $value) {
            if ($value === null) {
                putenv($key);
                unset($_ENV[$key], $_SERVER[$key]);

                continue;
            }

            putenv("{$key}={$value}");
            $_ENV[$key] = $value;
            $_SERVER[$key] = $value;
        }
    }
}
