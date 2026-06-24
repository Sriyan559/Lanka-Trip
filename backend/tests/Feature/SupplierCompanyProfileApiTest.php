<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Product;
use App\Models\ProductionCapacity;
use App\Models\Supplier;
use App\Models\SupplierCertificate;
use App\Models\SupplierStrength;
use App\Models\SupplierVideo;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;

class SupplierCompanyProfileApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_public_company_profile_view_includes_profile_sections_and_latest_products(): void
    {
        $supplier = Supplier::factory()->create([
            'company_name' => 'Lanka Tea Exports',
            'established_year' => 1998,
            'employee_count' => 120,
            'main_markets' => ['UAE', 'Germany'],
        ]);
        SupplierCertificate::create([
            'supplier_id' => $supplier->id,
            'certificate_name' => 'ISO 9001',
            'certificate_number' => 'ISO-123',
            'issuing_authority' => 'ISO',
            'issue_date' => '2025-01-01',
            'expiry_date' => '2028-01-01',
            'file_url' => 'https://example.com/iso.pdf',
        ]);
        SupplierVideo::create([
            'supplier_id' => $supplier->id,
            'title' => 'Factory Tour',
            'video_url' => 'https://www.youtube.com/watch?v=abc123',
        ]);
        SupplierStrength::create([
            'supplier_id' => $supplier->id,
            'strength_name' => 'OEM Service',
        ]);
        ProductionCapacity::create([
            'supplier_id' => $supplier->id,
            'monthly_output' => '20,000',
            'output_unit' => 'Kg',
            'production_lines' => 4,
            'lead_time' => '15 days',
            'factory_size' => '25,000 sqft',
        ]);
        $category = Category::factory()->create();
        $older = Product::factory()->create([
            'supplier_id' => $supplier->id,
            'category_id' => $category->id,
            'name' => 'Older Tea',
            'created_at' => now()->subDay(),
        ]);
        $latest = Product::factory()->create([
            'supplier_id' => $supplier->id,
            'category_id' => $category->id,
            'name' => 'Latest Tea',
            'created_at' => now(),
        ]);

        $this->getJson("/api/suppliers/{$supplier->id}/company-profile")
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('supplier.id', $supplier->id)
            ->assertJsonPath('supplier.company_name', 'Lanka Tea Exports')
            ->assertJsonPath('supplier.established_year', 1998)
            ->assertJsonPath('supplier.main_markets.0', 'UAE')
            ->assertJsonPath('certificates.0.certificate_name', 'ISO 9001')
            ->assertJsonPath('videos.0.title', 'Factory Tour')
            ->assertJsonPath('strengths.0.strength_name', 'OEM Service')
            ->assertJsonPath('production_capacity.monthly_output', '20,000')
            ->assertJsonCount(2, 'latest_products')
            ->assertJsonPath('latest_products.0.id', $latest->id)
            ->assertJsonPath('latest_products.1.id', $older->id);
    }

    public function test_authenticated_supplier_owner_can_update_company_profile(): void
    {
        [$supplierUser, $supplier] = $this->supplierUser();

        $this->withToken($supplierUser->createToken('test')->plainTextToken)
            ->putJson('/api/supplier/company-profile', [
                'company_name' => 'Updated Ceylon Exports',
                'description' => 'Premium Sri Lankan export supplier.',
                'city' => 'Colombo',
                'website' => 'https://updated.example.com',
                'business_type' => 'Manufacturer / Exporter',
                'established_year' => 2005,
                'employee_count' => 80,
                'factory_size' => '12,000 sqft',
                'annual_revenue' => 2500000,
                'export_percentage' => 85,
                'main_markets' => ['UAE', 'Qatar'],
            ])
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('supplier.company_name', 'Updated Ceylon Exports')
            ->assertJsonPath('supplier.established_year', 2005)
            ->assertJsonPath('supplier.main_markets.1', 'Qatar');

        $supplier->refresh();
        $this->assertSame('Updated Ceylon Exports', $supplier->company_name);
        $this->assertSame(['UAE', 'Qatar'], $supplier->main_markets);
    }

    public function test_authenticated_supplier_can_view_their_company_profile(): void
    {
        [$supplierUser, $supplier] = $this->supplierUser();
        SupplierCertificate::create([
            'supplier_id' => $supplier->id,
            'certificate_name' => 'ISO 22000',
        ]);
        ProductionCapacity::create([
            'supplier_id' => $supplier->id,
            'monthly_output' => '10,000',
            'output_unit' => 'Kg',
        ]);

        $this->withToken($supplierUser->createToken('test')->plainTextToken)
            ->getJson('/api/supplier/company-profile')
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('supplier.id', $supplier->id)
            ->assertJsonPath('supplier.company_name', $supplier->company_name)
            ->assertJsonPath('certificates.0.certificate_name', 'ISO 22000')
            ->assertJsonPath('production_capacity.monthly_output', '10,000')
            ->assertJsonStructure([
                'videos',
                'strengths',
                'production_capacity',
                'latest_products',
            ]);
    }

    public function test_supplier_can_add_and_delete_certificate(): void
    {
        [$supplierUser, $supplier] = $this->supplierUser();

        $certificateId = $this->withToken($supplierUser->createToken('test')->plainTextToken)
            ->postJson('/api/supplier/certificates', [
                'certificate_name' => 'FDA',
                'certificate_number' => 'FDA-2026',
                'issuing_authority' => 'Food and Drug Administration',
                'issue_date' => '2026-01-01',
                'expiry_date' => '2029-01-01',
                'file_url' => 'https://example.com/fda.pdf',
            ])
            ->assertCreated()
            ->assertJsonPath('success', true)
            ->assertJsonPath('certificate.certificate_name', 'FDA')
            ->json('certificate.id');

        $this->assertDatabaseHas('supplier_certificates', [
            'id' => $certificateId,
            'supplier_id' => $supplier->id,
            'certificate_name' => 'FDA',
        ]);

        Auth::forgetGuards();

        $this->withToken($supplierUser->createToken('list')->plainTextToken)
            ->getJson('/api/supplier/certificates')
            ->assertOk()
            ->assertJsonCount(1, 'data');

        Auth::forgetGuards();

        $this->withToken($supplierUser->createToken('delete')->plainTextToken)
            ->deleteJson("/api/supplier/certificates/{$certificateId}")
            ->assertOk()
            ->assertExactJson([
                'success' => true,
                'message' => 'Certificate deleted successfully.',
            ]);

        $this->assertDatabaseMissing('supplier_certificates', ['id' => $certificateId]);
    }

    public function test_supplier_can_add_video(): void
    {
        [$supplierUser, $supplier] = $this->supplierUser();

        $this->withToken($supplierUser->createToken('test')->plainTextToken)
            ->postJson('/api/supplier/videos', [
                'title' => 'Factory Tour',
                'video_url' => 'https://www.youtube.com/watch?v=factory123',
            ])
            ->assertCreated()
            ->assertJsonPath('success', true)
            ->assertJsonPath('video.title', 'Factory Tour');

        $this->assertDatabaseHas('supplier_videos', [
            'supplier_id' => $supplier->id,
            'title' => 'Factory Tour',
        ]);
    }

    public function test_supplier_can_add_strength(): void
    {
        [$supplierUser, $supplier] = $this->supplierUser();

        $this->withToken($supplierUser->createToken('test')->plainTextToken)
            ->postJson('/api/supplier/strengths', [
                'strength_name' => 'Custom Packaging',
            ])
            ->assertCreated()
            ->assertJsonPath('success', true)
            ->assertJsonPath('strength.strength_name', 'Custom Packaging');

        $this->assertDatabaseHas('supplier_strengths', [
            'supplier_id' => $supplier->id,
            'strength_name' => 'Custom Packaging',
        ]);
    }

    public function test_supplier_can_update_production_capacity(): void
    {
        [$supplierUser, $supplier] = $this->supplierUser();

        $this->withToken($supplierUser->createToken('test')->plainTextToken)
            ->putJson('/api/supplier/production-capacity', [
                'monthly_output' => '50,000',
                'output_unit' => 'Pairs',
                'production_lines' => 6,
                'lead_time' => '20 days',
                'factory_size' => '40,000 sqft',
            ])
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('production_capacity.monthly_output', '50,000')
            ->assertJsonPath('production_capacity.production_lines', 6);

        $this->assertDatabaseHas('production_capacities', [
            'supplier_id' => $supplier->id,
            'monthly_output' => '50,000',
            'output_unit' => 'Pairs',
            'production_lines' => 6,
        ]);

        Auth::forgetGuards();

        $this->withToken($supplierUser->createToken('view')->plainTextToken)
            ->getJson('/api/supplier/production-capacity')
            ->assertOk()
            ->assertJsonPath('production_capacity.factory_size', '40,000 sqft');
    }

    public function test_supplier_profile_routes_enforce_authentication_role_and_ownership(): void
    {
        [$supplierUser, $supplier] = $this->supplierUser();
        $buyer = User::factory()->create(['role' => 'buyer']);
        $otherSupplierUser = User::factory()->create(['role' => 'supplier']);
        Supplier::factory()->create(['user_id' => $otherSupplierUser->id]);
        $certificate = SupplierCertificate::create([
            'supplier_id' => $supplier->id,
            'certificate_name' => 'GMP',
        ]);
        $video = SupplierVideo::create([
            'supplier_id' => $supplier->id,
            'title' => 'Private Video',
            'video_url' => 'https://www.youtube.com/watch?v=private',
        ]);
        $strength = SupplierStrength::create([
            'supplier_id' => $supplier->id,
            'strength_name' => 'Fast Delivery',
        ]);

        $this->putJson('/api/supplier/company-profile', ['company_name' => 'Blocked'])
            ->assertUnauthorized();
        $this->getJson('/api/supplier/company-profile')
            ->assertUnauthorized();
        $this->postJson('/api/supplier/certificates', ['certificate_name' => 'Blocked'])
            ->assertUnauthorized();
        $this->postJson('/api/supplier/videos', ['title' => 'Blocked'])
            ->assertUnauthorized();
        $this->postJson('/api/supplier/strengths', ['strength_name' => 'Blocked'])
            ->assertUnauthorized();
        $this->putJson('/api/supplier/production-capacity', [])
            ->assertUnauthorized();

        $this->withToken($buyer->createToken('buyer')->plainTextToken)
            ->putJson('/api/supplier/company-profile', ['company_name' => 'Blocked'])
            ->assertForbidden();

        Auth::forgetGuards();

        $this->withToken($buyer->createToken('buyer-profile')->plainTextToken)
            ->getJson('/api/supplier/company-profile')
            ->assertForbidden();

        Auth::forgetGuards();

        $this->withToken($otherSupplierUser->createToken('other')->plainTextToken)
            ->deleteJson("/api/supplier/certificates/{$certificate->id}")
            ->assertNotFound();

        Auth::forgetGuards();

        $this->withToken($otherSupplierUser->createToken('other-video')->plainTextToken)
            ->deleteJson("/api/supplier/videos/{$video->id}")
            ->assertNotFound();

        Auth::forgetGuards();

        $this->withToken($otherSupplierUser->createToken('other-strength')->plainTextToken)
            ->deleteJson("/api/supplier/strengths/{$strength->id}")
            ->assertNotFound();

        $this->assertDatabaseHas('supplier_certificates', ['id' => $certificate->id]);
        $this->assertDatabaseHas('supplier_videos', ['id' => $video->id]);
        $this->assertDatabaseHas('supplier_strengths', ['id' => $strength->id]);
    }

    private function supplierUser(): array
    {
        $user = User::factory()->create(['role' => 'supplier']);
        $supplier = Supplier::factory()->create(['user_id' => $user->id]);

        return [$user, $supplier];
    }
}
