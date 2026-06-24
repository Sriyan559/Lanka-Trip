<?php

namespace Tests\Feature;

use App\Models\Conversation;
use App\Models\Message;
use App\Models\Order;
use App\Models\Product;
use App\Models\ProductReview;
use App\Models\Quotation;
use App\Models\RFQ;
use App\Models\Supplier;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Route;
use RuntimeException;
use Tests\TestCase;

class ProductionReadinessApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_registered_policies_enforce_ownership_and_roles(): void
    {
        $buyer = User::factory()->create(['role' => 'buyer']);
        $otherBuyer = User::factory()->create(['role' => 'buyer']);
        $supplierUser = User::factory()->create(['role' => 'supplier']);
        $otherSupplierUser = User::factory()->create(['role' => 'supplier']);
        $admin = User::factory()->create(['role' => 'admin']);
        $supplier = Supplier::factory()->create(['user_id' => $supplierUser->id]);
        $otherSupplier = Supplier::factory()->create(['user_id' => $otherSupplierUser->id]);
        $product = Product::factory()->create(['supplier_id' => $supplier->id]);
        $rfq = RFQ::create([
            'user_id' => $buyer->id,
            'rfq_number' => 'RFQ-2026-000001',
            'title' => 'Policy RFQ',
            'destination_country' => 'UAE',
            'status' => 'open',
        ]);
        $quotation = Quotation::create([
            'rfq_id' => $rfq->id,
            'supplier_id' => $supplier->id,
            'quotation_number' => 'QT-2026-000001',
            'total_amount' => 1000,
            'currency' => 'USD',
            'status' => 'pending',
        ]);
        $order = Order::create([
            'order_number' => 'ORD-2026-000001',
            'buyer_id' => $buyer->id,
            'supplier_id' => $supplier->id,
            'quotation_id' => $quotation->id,
            'rfq_id' => $rfq->id,
            'total_amount' => 1000,
            'currency' => 'USD',
            'status' => 'pending',
        ]);
        $conversation = Conversation::create([
            'buyer_id' => $buyer->id,
            'supplier_id' => $supplier->id,
        ]);
        $message = Message::create([
            'conversation_id' => $conversation->id,
            'sender_id' => $supplierUser->id,
            'receiver_id' => $buyer->id,
            'message' => 'Policy message',
        ]);
        $review = ProductReview::create([
            'product_id' => $product->id,
            'user_id' => $buyer->id,
            'rating' => 5,
        ]);

        $this->assertTrue(Gate::forUser($supplierUser)->allows('update', $product));
        $this->assertFalse(Gate::forUser($otherSupplierUser)->allows('update', $product));
        $this->assertTrue(Gate::forUser($admin)->allows('delete', $product));
        $this->assertTrue(Gate::forUser($supplierUser)->allows('update', $supplier));
        $this->assertFalse(Gate::forUser($otherSupplierUser)->allows('update', $supplier));
        $this->assertTrue(Gate::forUser($buyer)->allows('update', $rfq));
        $this->assertFalse(Gate::forUser($otherBuyer)->allows('view', $rfq));
        $this->assertTrue(Gate::forUser($buyer)->allows('accept', $quotation));
        $this->assertFalse(Gate::forUser($otherBuyer)->allows('accept', $quotation));
        $this->assertTrue(Gate::forUser($supplierUser)->allows('updateStatus', $order));
        $this->assertFalse(Gate::forUser($otherSupplierUser)->allows('updateStatus', $order));
        $this->assertTrue(Gate::forUser($buyer)->allows('markRead', $message));
        $this->assertFalse(Gate::forUser($supplierUser)->allows('markRead', $message));
        $this->assertTrue(Gate::forUser($buyer)->allows('update', $review));
        $this->assertFalse(Gate::forUser($otherBuyer)->allows('update', $review));
        $this->assertSame($otherSupplier->user_id, $otherSupplierUser->id);
    }

    public function test_global_api_exception_handler_returns_standardized_errors(): void
    {
        $this->postJson('/api/auth/register', [])
            ->assertUnprocessable()
            ->assertExactJson([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => [
                    'name' => ['The name field is required.'],
                    'email' => ['The email field is required.'],
                    'password' => ['The password field is required.'],
                    'role' => ['The role field is required.'],
                    'company_name' => ['The company name field is required.'],
                ],
            ]);

        $this->getJson('/api/user/profile')
            ->assertUnauthorized()
            ->assertExactJson([
                'success' => false,
                'message' => 'Unauthorized',
            ]);

        $buyer = User::factory()->create(['role' => 'buyer']);
        $this->withToken($buyer->createToken('buyer')->plainTextToken)
            ->getJson('/api/admin/system')
            ->assertForbidden()
            ->assertExactJson([
                'success' => false,
                'message' => 'Forbidden',
            ]);

        $this->getJson('/api/products/999999')
            ->assertNotFound()
            ->assertExactJson([
                'success' => false,
                'message' => 'Resource not found',
            ]);

        Route::middleware('api')->get('/api/testing/server-error', function (): void {
            throw new RuntimeException('Sensitive internal detail');
        });

        $this->getJson('/api/testing/server-error')
            ->assertInternalServerError()
            ->assertExactJson([
                'success' => false,
                'message' => 'Internal server error',
            ]);
    }

    public function test_health_endpoint_and_security_headers_are_production_ready(): void
    {
        $this->getJson('/api/health')
            ->assertOk()
            ->assertHeader('X-Frame-Options', 'DENY')
            ->assertHeader('X-Content-Type-Options', 'nosniff')
            ->assertHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
            ->assertHeader('Content-Security-Policy')
            ->assertExactJson([
                'status' => 'ok',
                'app' => 'EcomLanka',
                'version' => '1.0.0',
            ]);
    }

    public function test_admin_system_and_backup_apis_are_admin_only(): void
    {
        $buyer = User::factory()->create(['role' => 'buyer']);
        $admin = User::factory()->create(['role' => 'admin']);

        $this->withToken($buyer->createToken('buyer')->plainTextToken)
            ->getJson('/api/admin/system')
            ->assertForbidden();

        Auth::forgetGuards();
        $token = $admin->createToken('admin')->plainTextToken;

        $this->withToken($token)
            ->getJson('/api/admin/system')
            ->assertOk()
            ->assertJsonStructure([
                'php_version',
                'laravel_version',
                'database' => ['driver', 'status'],
                'cache',
                'queue',
                'redis',
                'horizon',
            ]);

        Auth::forgetGuards();
        $this->withToken($token)
            ->getJson('/api/admin/backups')
            ->assertOk()
            ->assertJsonPath('total', 0)
            ->assertJsonPath('backups', []);
    }

    public function test_admin_can_enable_and_disable_maintenance_mode(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $token = $admin->createToken('admin')->plainTextToken;

        try {
            $this->withToken($token)
                ->postJson('/api/admin/maintenance/enable')
                ->assertOk()
                ->assertJsonPath('maintenance', true);

            $this->assertTrue(app()->isDownForMaintenance());

            Auth::forgetGuards();
            $this->withToken($token)
                ->postJson('/api/admin/maintenance/disable')
                ->assertOk()
                ->assertJsonPath('maintenance', false);

            $this->assertFalse(app()->isDownForMaintenance());
        } finally {
            Artisan::call('up');
        }
    }
}
