<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Conversation;
use App\Models\Message;
use App\Models\Notification;
use App\Models\Order;
use App\Models\Product;
use App\Models\ProductReview;
use App\Models\Quotation;
use App\Models\RFQ;
use App\Models\Supplier;
use App\Models\SupplierReview;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Tests\TestCase;

class AnalyticsApiTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        Cache::flush();
    }

    public function test_admin_can_access_analytics_endpoints(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $token = $admin->createToken('analytics')->plainTextToken;

        foreach ([
            '/api/analytics/dashboard',
            '/api/analytics/top-products',
            '/api/analytics/top-suppliers',
            '/api/analytics/top-categories',
            '/api/analytics/rfqs',
            '/api/analytics/quotations',
            '/api/analytics/orders',
            '/api/analytics/revenue',
        ] as $endpoint) {
            Auth::forgetGuards();
            $this->withToken($token)->getJson($endpoint)->assertOk();
        }
    }

    public function test_non_admin_is_denied_analytics_access(): void
    {
        $buyer = User::factory()->create(['role' => 'buyer']);

        $this->getJson('/api/analytics/dashboard')->assertUnauthorized();

        $this->withToken($buyer->createToken('buyer')->plainTextToken)
            ->getJson('/api/analytics/dashboard')
            ->assertForbidden();
    }

    public function test_dashboard_analytics_returns_required_counts(): void
    {
        [$admin, $buyer, $supplier, $rfq, $quotation] = $this->analyticsRecords();
        $product = Product::factory()->create(['supplier_id' => $supplier->id]);
        $order = $this->createOrder($quotation, 'completed');
        $this->createOrder(
            $this->createQuotation($this->createRFQ($buyer, 'Second RFQ'), $supplier, 'rejected'),
            'cancelled',
        );
        $conversation = Conversation::create([
            'buyer_id' => $buyer->id,
            'supplier_id' => $supplier->id,
        ]);
        Message::create([
            'conversation_id' => $conversation->id,
            'sender_id' => $buyer->id,
            'receiver_id' => $supplier->user_id,
            'message' => 'Analytics message',
        ]);
        ProductReview::create([
            'product_id' => $product->id,
            'user_id' => $buyer->id,
            'rating' => 5,
        ]);
        SupplierReview::create([
            'supplier_id' => $supplier->id,
            'user_id' => $buyer->id,
            'rating' => 4,
        ]);
        Notification::create([
            'user_id' => $buyer->id,
            'type' => 'order_status_changed',
            'title' => 'Order completed',
            'message' => 'Completed',
            'is_read' => false,
        ]);

        $this->withToken($admin->createToken('admin')->plainTextToken)
            ->getJson('/api/analytics/dashboard')
            ->assertOk()
            ->assertJsonPath('total_users', 3)
            ->assertJsonPath('total_buyers', 1)
            ->assertJsonPath('total_suppliers', 1)
            ->assertJsonPath('total_products', 1)
            ->assertJsonPath('total_rfqs', 2)
            ->assertJsonPath('total_quotations', 2)
            ->assertJsonPath('total_orders', 2)
            ->assertJsonPath('completed_orders', 1)
            ->assertJsonPath('cancelled_orders', 1)
            ->assertJsonPath('total_messages', 1)
            ->assertJsonPath('total_reviews', 2)
            ->assertJsonPath('total_notifications', 1);

        $this->assertSame('completed', $order->status);
        $this->assertSame($rfq->id, $quotation->rfq_id);
    }

    public function test_top_products_are_ranked_and_limited(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $category = Category::factory()->create(['name' => 'Ceylon Tea']);
        $top = Product::factory()->create([
            'category_id' => $category->id,
            'name' => 'Top Tea',
            'views_count' => 5000,
            'average_rating' => 4.9,
            'reviews_count' => 20,
        ]);
        Product::factory()->count(11)->create([
            'category_id' => $category->id,
            'views_count' => 10,
        ]);

        $this->withToken($admin->createToken('admin')->plainTextToken)
            ->getJson('/api/analytics/top-products')
            ->assertOk()
            ->assertJsonCount(10, 'products')
            ->assertJsonPath('products.0.id', $top->id)
            ->assertJsonPath('products.0.category.name', 'Ceylon Tea')
            ->assertJsonPath('products.0.average_rating', 4.9);
    }

    public function test_top_suppliers_are_ranked_with_product_counts(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $top = Supplier::factory()->create([
            'company_name' => 'Top Exporter',
            'rating' => 5,
            'reviews_count' => 25,
        ]);
        Product::factory()->count(2)->create(['supplier_id' => $top->id]);
        Supplier::factory()->create(['rating' => 4, 'reviews_count' => 50]);

        $this->withToken($admin->createToken('admin')->plainTextToken)
            ->getJson('/api/analytics/top-suppliers')
            ->assertOk()
            ->assertJsonPath('suppliers.0.id', $top->id)
            ->assertJsonPath('suppliers.0.company_name', 'Top Exporter')
            ->assertJsonPath('suppliers.0.products_count', 2);
    }

    public function test_top_categories_are_ordered_by_product_count(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $top = Category::factory()->create(['name' => 'Tea']);
        $other = Category::factory()->create(['name' => 'Gems']);
        Product::factory()->count(3)->create(['category_id' => $top->id]);
        Product::factory()->create(['category_id' => $other->id]);

        $this->withToken($admin->createToken('admin')->plainTextToken)
            ->getJson('/api/analytics/top-categories')
            ->assertOk()
            ->assertJsonPath('categories.0.id', $top->id)
            ->assertJsonPath('categories.0.products_count', 3);
    }

    public function test_rfq_analytics_returns_status_counts_and_twelve_months(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $buyer = User::factory()->create(['role' => 'buyer']);
        $this->createRFQ($buyer, 'Open', 'open');
        $this->createRFQ($buyer, 'Completed', 'completed');

        $this->withToken($admin->createToken('admin')->plainTextToken)
            ->getJson('/api/analytics/rfqs')
            ->assertOk()
            ->assertJsonPath('total_rfqs', 2)
            ->assertJsonPath('open_rfqs', 1)
            ->assertJsonPath('completed_rfqs', 1)
            ->assertJsonCount(12, 'monthly_stats')
            ->assertJsonPath('monthly_stats.11.month', now()->format('Y-m'))
            ->assertJsonPath('monthly_stats.11.count', 2);
    }

    public function test_quotation_analytics_returns_status_counts_and_monthly_stats(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $buyer = User::factory()->create(['role' => 'buyer']);
        $supplier = Supplier::factory()->create();
        $this->createQuotation($this->createRFQ($buyer, 'Accepted'), $supplier, 'accepted');
        $this->createQuotation($this->createRFQ($buyer, 'Rejected'), $supplier, 'rejected');

        $this->withToken($admin->createToken('admin')->plainTextToken)
            ->getJson('/api/analytics/quotations')
            ->assertOk()
            ->assertJsonPath('total_quotations', 2)
            ->assertJsonPath('accepted_quotations', 1)
            ->assertJsonPath('rejected_quotations', 1)
            ->assertJsonCount(12, 'monthly_stats')
            ->assertJsonPath('monthly_stats.11.count', 2);
    }

    public function test_order_analytics_returns_all_status_counts(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $buyer = User::factory()->create(['role' => 'buyer']);
        $supplier = Supplier::factory()->create();

        foreach (Order::STATUSES as $status) {
            $rfq = $this->createRFQ($buyer, "RFQ {$status}");
            $quotation = $this->createQuotation($rfq, $supplier, 'accepted');
            $this->createOrder($quotation, $status);
        }

        $this->withToken($admin->createToken('admin')->plainTextToken)
            ->getJson('/api/analytics/orders')
            ->assertOk()
            ->assertJsonPath('total_orders', 6)
            ->assertJsonPath('pending_orders', 1)
            ->assertJsonPath('confirmed_orders', 1)
            ->assertJsonPath('production_orders', 1)
            ->assertJsonPath('shipped_orders', 1)
            ->assertJsonPath('completed_orders', 1)
            ->assertJsonPath('cancelled_orders', 1)
            ->assertJsonCount(12, 'monthly_stats');
    }

    public function test_revenue_analytics_uses_completed_orders_only(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $buyer = User::factory()->create(['role' => 'buyer']);
        $supplier = Supplier::factory()->create();
        $completedUsd = $this->createOrder(
            $this->createQuotation($this->createRFQ($buyer, 'USD completed'), $supplier, 'accepted', 'USD', 1000),
            'completed',
        );
        $this->createOrder(
            $this->createQuotation($this->createRFQ($buyer, 'LKR completed'), $supplier, 'accepted', 'LKR', 5000),
            'completed',
        );
        $this->createOrder(
            $this->createQuotation($this->createRFQ($buyer, 'Pending'), $supplier, 'accepted', 'USD', 9000),
            'pending',
        );

        $this->withToken($admin->createToken('admin')->plainTextToken)
            ->getJson('/api/analytics/revenue')
            ->assertOk()
            ->assertJsonPath('daily_revenue', 6000)
            ->assertJsonPath('monthly_revenue', 6000)
            ->assertJsonPath('yearly_revenue', 6000)
            ->assertJsonPath('currency_breakdown.USD', 1000)
            ->assertJsonPath('currency_breakdown.LKR', 5000);

        $this->assertSame('completed', $completedUsd->status);
    }

    private function analyticsRecords(): array
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $buyer = User::factory()->create(['role' => 'buyer']);
        $supplierUser = User::factory()->create(['role' => 'supplier']);
        $supplier = Supplier::factory()->create(['user_id' => $supplierUser->id]);
        $rfq = $this->createRFQ($buyer, 'Analytics RFQ');
        $quotation = $this->createQuotation($rfq, $supplier, 'accepted');

        return [$admin, $buyer, $supplier, $rfq, $quotation];
    }

    private function createRFQ(User $buyer, string $title, string $status = 'open'): RFQ
    {
        return RFQ::create([
            'user_id' => $buyer->id,
            'rfq_number' => 'RFQ-2026-'.str_pad((string) (RFQ::withTrashed()->count() + 1), 6, '0', STR_PAD_LEFT),
            'title' => $title,
            'description' => 'Analytics RFQ',
            'destination_country' => 'UAE',
            'status' => $status,
        ]);
    }

    private function createQuotation(
        RFQ $rfq,
        Supplier $supplier,
        string $status = 'pending',
        string $currency = 'USD',
        float $amount = 1000,
    ): Quotation {
        return Quotation::create([
            'rfq_id' => $rfq->id,
            'supplier_id' => $supplier->id,
            'quotation_number' => 'QT-2026-'.str_pad((string) (Quotation::count() + 1), 6, '0', STR_PAD_LEFT),
            'total_amount' => $amount,
            'currency' => $currency,
            'status' => $status,
        ]);
    }

    private function createOrder(Quotation $quotation, string $status): Order
    {
        return Order::create([
            'order_number' => 'ORD-2026-'.str_pad((string) (Order::count() + 1), 6, '0', STR_PAD_LEFT),
            'buyer_id' => $quotation->rfq->user_id,
            'supplier_id' => $quotation->supplier_id,
            'quotation_id' => $quotation->id,
            'rfq_id' => $quotation->rfq_id,
            'total_amount' => $quotation->total_amount,
            'currency' => $quotation->currency,
            'status' => $status,
        ]);
    }
}
