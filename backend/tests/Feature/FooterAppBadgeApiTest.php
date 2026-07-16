<?php

namespace Tests\Feature;

use App\Models\FooterAppBadge;
use Database\Seeders\FooterAppBadgeSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class FooterAppBadgeApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_seeder_is_idempotent_and_public_api_returns_enabled_badges_in_order(): void
    {
        $this->seed(FooterAppBadgeSeeder::class);
        $this->seed(FooterAppBadgeSeeder::class);

        $this->assertDatabaseCount('footer_app_badges', 2);

        FooterAppBadge::query()->where('platform', 'app_store')->update(['sort_order' => 1]);
        FooterAppBadge::query()->where('platform', 'google_play')->update(['sort_order' => 2]);

        $this->getJson('/api/public/footer-app-badges')
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonCount(2, 'appBadges')
            ->assertJsonPath('appBadges.0.platform', 'app_store')
            ->assertJsonPath('appBadges.1.platform', 'google_play')
            ->assertJsonPath('appBadges.0.storeUrl', null);
    }

    public function test_public_api_omits_disabled_badges(): void
    {
        $this->seed(FooterAppBadgeSeeder::class);
        FooterAppBadge::query()->where('platform', 'google_play')->update(['enabled' => false]);

        $this->getJson('/api/public/footer-app-badges')
            ->assertOk()
            ->assertJsonCount(1, 'appBadges')
            ->assertJsonPath('appBadges.0.platform', 'app_store');
    }
}
