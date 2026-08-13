<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Order;
use App\Models\ReturnCase;
use App\Models\SupportCase;
use App\Models\CustomerVerification;
use App\Models\CustomerLoyaltyAccount;
use App\Models\CustomerRisk;
use App\Models\CustomerConsent;
use App\Models\CustomerAddress;
use App\Models\AdminDataJob;
use App\Models\Supplier;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class AdminCustomerApiTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        // Seed any necessary lookup values if needed
    }

    public function test_dashboards_on_empty_database(): void
    {
        Sanctum::actingAs(User::factory()->create(['role' => 'admin']));

        // Wiping all customer-related records explicitly
        CustomerVerification::query()->delete();
        CustomerLoyaltyAccount::query()->delete();
        CustomerRisk::query()->delete();
        CustomerConsent::query()->delete();
        CustomerAddress::query()->delete();
        Order::query()->delete();
        ReturnCase::query()->delete();
        SupportCase::query()->delete();
        AdminDataJob::query()->delete();
        User::where('role', 'buyer')->delete();

        $endpoints = [
            '/api/admin/customers/dashboard',
            '/api/admin/customers/directory',
            '/api/admin/customers/addresses-contacts/dashboard',
            '/api/admin/customers/orders/dashboard',
            '/api/admin/customers/returns-refunds-disputes/dashboard',
            '/api/admin/customers/loyalty/dashboard',
            '/api/admin/customers/consent-privacy/dashboard',
            '/api/admin/customers/risk-restrictions/dashboard',
            '/api/admin/customers/support-communications/dashboard',
            '/api/admin/customers/import-export-audit/dashboard',
            '/api/admin/customers/verification/dashboard',
        ];

        foreach ($endpoints as $url) {
            $response = $this->getJson($url);
            $response->assertOk();
            $response->assertJsonStructure([
                'customers',
                'pagination'
            ]);
            $response->assertJsonPath('pagination.total', 0);
        }
    }

    public function test_dashboards_on_populated_database(): void
    {
        Sanctum::actingAs(User::factory()->create(['role' => 'admin']));

        // Create a supplier
        $supplier = Supplier::factory()->create();

        // Create a buyer
        $buyer = User::factory()->create([
            'role' => 'buyer',
            'name' => 'Dilshan Perera',
            'email' => 'dilshan@slbeauty.test',
            'phone' => '+94771234567',
            'company_name' => 'Perera Distributors',
            'country' => 'Western',
        ]);

        // Create related metrics
        CustomerVerification::create([
            'user_id' => $buyer->id,
            'verification_status' => 'verified',
            'document_type' => 'National ID',
            'document_number' => '199012345V',
            'verified_at' => now(),
            'evidence_completeness' => 90,
            'sla_percentage' => 95,
        ]);

        CustomerLoyaltyAccount::create([
            'user_id' => $buyer->id,
            'points_balance' => 450,
            'tier' => 'gold',
        ]);

        CustomerRisk::create([
            'user_id' => $buyer->id,
            'risk_level' => 'low',
            'restriction_status' => 'none',
        ]);

        CustomerAddress::create([
            'user_id' => $buyer->id,
            'type' => 'Home',
            'address_line_1' => '12 Galle Rd',
            'city' => 'Colombo',
            'state' => 'Western',
            'postal_code' => '00300',
            'country' => 'Sri Lanka',
            'is_default_shipping' => true,
            'is_default_billing' => true,
        ]);

        // Create an order
        $order = Order::create([
            'order_number' => 'ORD-' . strtoupper(\Illuminate\Support\Str::random(8)),
            'uuid' => (string) \Illuminate\Support\Str::uuid(),
            'buyer_id' => $buyer->id,
            'supplier_id' => $supplier->id,
            'status' => 'completed',
            'total_amount' => 15000,
            'currency' => 'LKR',
            'payment_status' => 'paid',
            'fulfillment_status' => 'fulfilled',
            'order_source' => 'web',
        ]);

        // Create a return case
        ReturnCase::create([
            'uuid' => (string) \Illuminate\Support\Str::uuid(),
            'return_number' => 'RET-000001',
            'order_id' => $order->id,
            'customer_id' => $buyer->id,
            'status' => 'under_review',
            'reason_code' => 'damaged',
            'reason' => 'Damaged item',
        ]);

        // Create a support case
        SupportCase::create([
            'uuid' => (string) \Illuminate\Support\Str::uuid(),
            'case_number' => 'SUP-000001',
            'customer_id' => $buyer->id,
            'subject' => 'Delivery issue',
            'description' => 'Did not receive tracking info',
            'channel' => 'web',
            'category' => 'delivery',
            'priority' => 'normal',
            'status' => 'open',
            'created_by' => $buyer->id,
        ]);

        // Create a data job log
        AdminDataJob::create([
            'job_id' => 'JOB-001',
            'title' => 'Customer Import Job',
            'domain' => 'customers',
            'job_type' => 'import',
            'status' => 'completed',
            'total_rows' => 100,
            'processed_rows' => 100,
            'failed_rows' => 0,
        ]);

        // Assert all dashboards return calculated counts
        $this->getJson('/api/admin/customers/orders/dashboard')
            ->assertOk()
            ->assertJsonPath('pagination.total', 1)
            ->assertJsonFragment(['label' => 'Total Customer Orders', 'value' => '1'])
            ->assertJsonFragment(['label' => 'Repeat Purchase Rate', 'value' => '0%'])
            ->assertJsonFragment(['label' => 'Average Order Value', 'value' => 'LKR 15,000']);

        $this->getJson('/api/admin/customers/loyalty/dashboard')
            ->assertOk()
            ->assertJsonPath('pagination.total', 1)
            ->assertJsonFragment(['label' => 'Total Points Balance', 'value' => '450']);

        $this->getJson('/api/admin/customers/verification/dashboard')
            ->assertOk()
            ->assertJsonPath('pagination.total', 1)
            ->assertJsonFragment(['label' => 'Verified Customers', 'value' => '1']);
    }

    public function test_customer_crud_operations(): void
    {
        Sanctum::actingAs(User::factory()->create(['role' => 'admin']));

        // Create customer via database factory
        $buyer = User::factory()->create([
            'role' => 'buyer',
            'name' => 'Malith Fernando',
            'email' => 'malith@slbeauty.test',
        ]);

        // 1. Read / Show detail
        $response = $this->getJson("/api/admin/customers/{$buyer->id}");
        $response->assertOk();
        $response->assertJsonStructure([
            'profile' => [
                'id',
                'name',
                'email',
                'customerType',
            ],
            'purchaseBehaviour',
            'loyalty',
        ]);
        $response->assertJsonPath('profile.name', 'Malith Fernando');

        // 2. Update profile
        $this->putJson("/api/admin/customers/{$buyer->id}", [
            'name' => 'Malith Updated',
            'phone' => '+94711122233',
        ])->assertOk();

        $this->assertDatabaseHas('users', [
            'id' => $buyer->id,
            'name' => 'Malith Updated',
            'phone' => '+94711122233',
        ]);

        // 3. Delete / Archive profile
        $this->deleteJson("/api/admin/customers/{$buyer->id}")->assertOk();
        $this->assertDatabaseMissing('users', ['id' => $buyer->id]);
    }
}
