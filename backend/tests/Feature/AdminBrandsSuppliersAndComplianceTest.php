<?php

namespace Tests\Feature;

use App\Models\Supplier;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class AdminBrandsSuppliersAndComplianceTest extends TestCase
{
    use RefreshDatabase;

    public function test_endpoints_require_admin_authentication(): void
    {
        $this->getJson('/api/admin/brands-suppliers/suppliers/dashboard')->assertUnauthorized();
        $this->getJson('/api/admin/verification-compliance/documents/dashboard')->assertUnauthorized();

        Sanctum::actingAs(User::factory()->create(['role' => 'buyer']));
        $this->getJson('/api/admin/brands-suppliers/suppliers/dashboard')->assertForbidden();
        $this->getJson('/api/admin/verification-compliance/documents/dashboard')->assertForbidden();
    }

    public function test_brands_suppliers_read_endpoints_return_successful_response(): void
    {
        $admin = User::factory()->create(['role' => 'super_admin']);
        Sanctum::actingAs($admin);

        $routes = [
            '/api/admin/brands-suppliers/suppliers/dashboard',
            '/api/admin/brands-suppliers/contracts/dashboard',
            '/api/admin/brands-suppliers/catalogue-coverage/dashboard',
            '/api/admin/brands-suppliers/performance/dashboard',
            '/api/admin/brands-suppliers/risk-compliance/dashboard',
            '/api/admin/brands-suppliers/users-access/dashboard',
            '/api/admin/brands-suppliers/import-export-audit/dashboard',
        ];

        foreach ($routes as $route) {
            $response = $this->getJson($route);
            $response->assertOk();
        }
    }

    public function test_verification_compliance_read_endpoints_return_successful_response(): void
    {
        $admin = User::factory()->create(['role' => 'super_admin']);
        Sanctum::actingAs($admin);

        $routes = [
            '/api/admin/verification-compliance/documents/dashboard',
            '/api/admin/verification-compliance/product-safety/dashboard',
            '/api/admin/verification-compliance/authenticity/dashboard',
            '/api/admin/verification-compliance/recalls/dashboard',
            '/api/admin/verification-compliance/governance/dashboard',
            '/api/admin/verification-compliance/reports/dashboard',
            '/api/admin/verification-compliance/import-export-audit/dashboard',
        ];

        foreach ($routes as $route) {
            $response = $this->getJson($route);
            $response->assertOk();
        }
    }

    public function test_supplier_creation_persists_to_database(): void
    {
        $admin = User::factory()->create(['role' => 'super_admin']);
        Sanctum::actingAs($admin);

        $payload = [
            'company_name' => 'Enterprise Cosmetics Ltd',
            'store_name' => 'Enterprise Beauty',
            'email' => 'contact@enterprisebeauty.lk',
            'contact_person_name' => 'Ranil Perera',
            'phone' => '+94771234567',
        ];

        $response = $this->postJson('/api/admin/brands-suppliers/suppliers', $payload);
        $response->assertStatus(201);

        $this->assertDatabaseHas('suppliers', [
            'company_name' => 'Enterprise Cosmetics Ltd',
            'email' => 'contact@enterprisebeauty.lk',
        ]);
    }

    public function test_supplier_update_modifies_database_record(): void
    {
        $admin = User::factory()->create(['role' => 'super_admin']);
        Sanctum::actingAs($admin);

        $supplier = Supplier::factory()->create([
            'company_name' => 'Old Supplier Name',
            'status' => 'active',
            'verification_status' => 'pending',
        ]);

        $payload = [
            'company_name' => 'Updated Supplier Name',
            'status' => 'active',
        ];

        $response = $this->putJson("/api/admin/brands-suppliers/suppliers/{$supplier->id}", $payload);
        $response->assertOk();

        $this->assertDatabaseHas('suppliers', [
            'id' => $supplier->id,
            'company_name' => 'Updated Supplier Name',
            'status' => 'active',
        ]);
    }

    public function test_supplier_detail_returns_404_for_non_existent_supplier(): void
    {
        $admin = User::factory()->create(['role' => 'super_admin']);
        Sanctum::actingAs($admin);

        $response = $this->getJson('/api/admin/brands-suppliers/suppliers/999999');
        $response->assertNotFound();
    }
}
