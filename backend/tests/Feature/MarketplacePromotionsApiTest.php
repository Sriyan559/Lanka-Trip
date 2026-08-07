<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class MarketplacePromotionsApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_promotions_require_authentication_and_admin_dashboard_permission(): void
    {
        $this->getJson('/api/admin/marketplace/promotions')->assertUnauthorized();
        Sanctum::actingAs(User::factory()->create(['role' => 'buyer']));
        $this->getJson('/api/admin/marketplace/promotions')->assertForbidden();
    }

    public function test_promotions_report_missing_domain_without_fabricating_values(): void
    {
        Sanctum::actingAs(User::factory()->create(['role' => 'super_admin']));
        $response = $this->getJson('/api/admin/marketplace/promotions?perPage=10');
        $response->assertOk()->assertJsonPath('data.availability.available', false)
            ->assertJsonPath('data.availability.reason', 'promotion_domain_not_present')
            ->assertJsonPath('data.kpis.0.available', false)->assertJsonPath('data.kpis.0.value', null)
            ->assertJsonPath('data.items', [])->assertJsonPath('data.meta.total', 0)
            ->assertJsonPath('data.permissions.canCreate', false)->assertJsonPath('data.permissions.canApprove', false);
    }

    public function test_promotions_validate_filters_and_detail_does_not_return_fixtures(): void
    {
        Sanctum::actingAs(User::factory()->create(['role' => 'super_admin']));
        $this->getJson('/api/admin/marketplace/promotions?perPage=13')->assertUnprocessable();
        $this->getJson('/api/admin/marketplace/promotions/1')->assertNotFound();
    }
}
