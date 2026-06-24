<?php

namespace Tests\Feature;

use App\Jobs\ClearCacheJob;
use App\Jobs\GenerateAnalyticsCacheJob;
use App\Jobs\SendEmailJob;
use App\Jobs\SendNotificationJob;
use App\Models\Category;
use App\Models\Product;
use App\Models\Supplier;
use App\Models\User;
use App\Support\CacheKeys;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Queue;
use Laravel\Horizon\Contracts\MasterSupervisorRepository;
use Tests\TestCase;

class PerformanceInfrastructureApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_category_cache_is_reused_and_invalidated_after_update(): void
    {
        $category = Category::factory()->create([
            'name' => 'Cached Tea',
            'slug' => 'cached-tea',
        ]);

        $this->getJson('/api/categories')
            ->assertOk()
            ->assertJsonPath('data.0.name', 'Cached Tea');

        $this->assertTrue(Cache::has(CacheKeys::versioned('categories', 'index')));

        $category->update(['name' => 'Updated Cached Tea']);

        $this->getJson('/api/categories')
            ->assertOk()
            ->assertJsonPath('data.0.name', 'Updated Cached Tea');
    }

    public function test_required_background_jobs_are_queueable_and_notifications_are_dispatched(): void
    {
        Queue::fake();

        SendEmailJob::dispatch('buyer@example.com', 'Subject', 'Body');
        GenerateAnalyticsCacheJob::dispatch();
        ClearCacheJob::dispatch(['products']);

        $admin = User::factory()->create(['role' => 'admin']);
        $supplierUser = User::factory()->create(['role' => 'supplier']);
        $supplier = Supplier::factory()->pending()->create(['user_id' => $supplierUser->id]);

        Auth::forgetGuards();
        $this->withToken($admin->createToken('admin')->plainTextToken)
            ->putJson("/api/admin/suppliers/{$supplier->id}/verify", [
                'verification_status' => 'verified',
            ])
            ->assertOk();

        Queue::assertPushed(SendEmailJob::class, fn (SendEmailJob $job) => $job->queue === 'emails');
        Queue::assertPushed(GenerateAnalyticsCacheJob::class);
        Queue::assertPushed(ClearCacheJob::class);
        Queue::assertPushed(
            SendNotificationJob::class,
            fn (SendNotificationJob $job) => $job->userId === $supplierUser->id
                && $job->type === 'supplier_verified'
                && $job->queue === 'notifications',
        );
    }

    public function test_analytics_cache_job_warms_all_analytics_entries(): void
    {
        (new GenerateAnalyticsCacheJob)->handle();

        foreach (CacheKeys::ANALYTICS as $key) {
            $this->assertTrue(Cache::has($key), "Expected {$key} to be cached.");
        }
    }

    public function test_login_logout_and_product_mutations_are_recorded_and_admin_can_list_logs(): void
    {
        $buyer = User::factory()->create([
            'email' => 'activity@example.com',
            'password' => 'Password123!',
        ]);
        $admin = User::factory()->create(['role' => 'admin']);

        $token = $this->postJson('/api/auth/login', [
            'email' => 'activity@example.com',
            'password' => 'Password123!',
        ])->assertOk()->json('token');

        Auth::forgetGuards();
        $this->withToken($token)->postJson('/api/auth/logout')->assertOk();

        $product = Product::factory()->create(['name' => 'Activity Product']);
        $product->update(['status' => 'inactive']);
        $product->delete();

        $this->assertDatabaseHas('activity_log', ['description' => 'User logged in']);
        $this->assertDatabaseHas('activity_log', ['description' => 'User logged out']);
        $this->assertDatabaseHas('activity_log', [
            'log_name' => 'products',
            'event' => 'updated',
            'subject_id' => $product->id,
        ]);
        $this->assertDatabaseHas('activity_log', [
            'log_name' => 'products',
            'event' => 'deleted',
            'subject_id' => $product->id,
        ]);

        Auth::forgetGuards();
        $this->withToken($admin->createToken('admin')->plainTextToken)
            ->getJson('/api/admin/activity-logs')
            ->assertOk()
            ->assertJsonPath('per_page', 20)
            ->assertJsonPath('success', true);

        $this->assertSame('buyer', $buyer->role);
    }

    public function test_auth_and_search_rate_limits_are_applied(): void
    {
        foreach (range(1, 5) as $attempt) {
            $this->postJson('/api/auth/login', [
                'email' => "missing{$attempt}@example.com",
                'password' => 'invalid',
            ])->assertUnauthorized();
        }

        $this->postJson('/api/auth/login', [
            'email' => 'limited@example.com',
            'password' => 'invalid',
        ])->assertTooManyRequests();

        foreach (range(1, 60) as $attempt) {
            $this->getJson("/api/search/global?q=tea{$attempt}")->assertOk();
        }

        $this->getJson('/api/search/global?q=limited')->assertTooManyRequests();
    }

    public function test_horizon_and_activity_log_apis_are_admin_only(): void
    {
        $buyer = User::factory()->create(['role' => 'buyer']);
        $admin = User::factory()->create(['role' => 'admin']);

        $this->getJson('/api/admin/horizon/status')->assertUnauthorized();

        $this->withToken($buyer->createToken('buyer')->plainTextToken)
            ->getJson('/api/admin/activity-logs')
            ->assertForbidden();

        $repository = $this->mock(MasterSupervisorRepository::class);
        $repository->shouldReceive('all')->once()->andReturn([(object) ['status' => 'running']]);

        Auth::forgetGuards();
        $this->withToken($admin->createToken('admin')->plainTextToken)
            ->getJson('/api/admin/horizon/status')
            ->assertOk()
            ->assertJsonPath('status', 'running')
            ->assertJsonPath('queues', ['default', 'notifications', 'emails']);
    }

    public function test_global_api_rate_limit_is_applied(): void
    {
        foreach (range(1, 120) as $attempt) {
            $this->getJson('/api/health')->assertOk();
        }

        $this->getJson('/api/health')->assertTooManyRequests();
    }
}
