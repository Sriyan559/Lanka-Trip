<?php

namespace Tests\Feature;

use App\Models\Order;
use App\Models\Supplier;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;

class MarketplaceWorkflowApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_buyer_and_supplier_can_complete_the_marketplace_workflow(): void
    {
        $buyerRegistration = $this->postJson('/api/auth/register', [
            'name' => 'Workflow Buyer',
            'email' => 'workflow-buyer@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'role' => 'buyer',
            'company_name' => 'Buyer Imports',
            'country' => 'UAE',
        ])->assertCreated();

        $buyerToken = $buyerRegistration->json('token');
        $buyerId = $buyerRegistration->json('user.id');

        $rfqResponse = $this->withToken($buyerToken)
            ->postJson('/api/rfqs', [
                'title' => 'Need export-grade Ceylon tea',
                'description' => 'Buyer to supplier workflow test',
                'destination_country' => 'UAE',
                'expected_delivery_date' => '2026-08-01',
                'items' => [
                    [
                        'product_name' => 'Pure Ceylon Black Tea',
                        'quantity' => 1000,
                        'unit' => 'kg',
                        'specifications' => 'Premium export grade',
                    ],
                ],
            ])
            ->assertCreated()
            ->assertJsonPath('status', 'open');

        $rfqId = $rfqResponse->json('id');
        $rfqItemId = $rfqResponse->json('items.0.id');

        $this->withToken($buyerToken)
            ->getJson('/api/user/dashboard')
            ->assertOk()
            ->assertJsonPath('rfqs_count', 1);

        Auth::forgetGuards();

        $supplierRegistration = $this->postJson('/api/auth/register', [
            'name' => 'Workflow Supplier',
            'email' => 'workflow-supplier@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'role' => 'supplier',
            'company_name' => 'Ceylon Tea Exports',
            'country' => 'Sri Lanka',
        ])
            ->assertCreated()
            ->assertJsonPath('supplier.status', 'active')
            ->assertJsonPath('supplier.verification_status', 'pending');

        $supplierToken = $supplierRegistration->json('token');
        $supplierId = $supplierRegistration->json('supplier.id');

        Auth::forgetGuards();

        $this->assertDatabaseHas('suppliers', [
            'id' => $supplierId,
            'company_name' => 'Ceylon Tea Exports',
            'status' => 'active',
        ]);

        $this->withToken($supplierToken)
            ->getJson('/api/supplier/rfqs')
            ->assertOk()
            ->assertJsonPath('data.0.id', $rfqId);

        $this->withToken($supplierToken)
            ->getJson("/api/supplier/rfqs/{$rfqId}")
            ->assertOk()
            ->assertJsonPath('id', $rfqId);

        $quotationResponse = $this->withToken($supplierToken)
            ->postJson("/api/rfqs/{$rfqId}/quotations", [
                'currency' => 'USD',
                'lead_time' => '15 days',
                'payment_terms' => '30% advance',
                'shipping_terms' => 'FOB Colombo',
                'remarks' => 'Ready for export',
                'items' => [
                    [
                        'rfq_item_id' => $rfqItemId,
                        'product_name' => 'Pure Ceylon Black Tea',
                        'quantity' => 1000,
                        'unit_price' => 5.25,
                    ],
                ],
            ])
            ->assertCreated()
            ->assertJsonPath('status', 'pending')
            ->assertJsonPath('total_amount', 5250);

        $quotationId = $quotationResponse->json('id');

        $this->withToken($supplierToken)
            ->getJson("/api/supplier/quotations?rfq_id={$rfqId}")
            ->assertOk()
            ->assertJsonPath('total', 1)
            ->assertJsonPath('data.0.id', $quotationId);

        Auth::forgetGuards();

        $this->withToken($buyerToken)
            ->getJson("/api/rfqs/{$rfqId}/quotations")
            ->assertOk()
            ->assertJsonPath('data.0.id', $quotationId)
            ->assertJsonPath('data.0.supplier.id', $supplierId);

        $this->withToken($buyerToken)
            ->postJson("/api/quotations/{$quotationId}/accept")
            ->assertOk()
            ->assertJsonPath('status', 'accepted')
            ->assertJsonPath('rfq.status', 'completed');

        $orderResponse = $this->withToken($buyerToken)
            ->postJson('/api/orders', ['quotation_id' => $quotationId])
            ->assertCreated()
            ->assertJsonPath('order.buyer_id', $buyerId)
            ->assertJsonPath('order.supplier_id', $supplierId)
            ->assertJsonPath('order.status', 'pending');

        $orderId = $orderResponse->json('order.id');

        $this->withToken($buyerToken)
            ->getJson('/api/orders')
            ->assertOk()
            ->assertJsonPath('data.0.id', $orderId);

        $this->withToken($buyerToken)
            ->getJson("/api/orders/{$orderId}")
            ->assertOk()
            ->assertJsonPath('order.id', $orderId)
            ->assertJsonPath('items.0.product_name', 'Pure Ceylon Black Tea');

        $this->withToken($buyerToken)
            ->getJson("/api/rfqs/{$rfqId}/quotations")
            ->assertOk()
            ->assertJsonPath('data.0.order_id', $orderId);

        Auth::forgetGuards();

        $this->withToken($supplierToken)
            ->getJson('/api/orders')
            ->assertOk()
            ->assertJsonPath('data.0.id', $orderId);

        $this->withToken($supplierToken)
            ->getJson("/api/orders/{$orderId}")
            ->assertOk()
            ->assertJsonPath('order.id', $orderId)
            ->assertJsonPath('supplier.id', $supplierId);

        $this->withToken($supplierToken)
            ->getJson("/api/supplier/rfqs/{$rfqId}")
            ->assertOk()
            ->assertJsonPath('status', 'completed');

        $this->assertDatabaseHas('orders', [
            'id' => $orderId,
            'quotation_id' => $quotationId,
            'rfq_id' => $rfqId,
        ]);
        $this->assertSame(1, Order::query()->count());
        $this->assertSame(1, Supplier::query()->count());
    }
}
