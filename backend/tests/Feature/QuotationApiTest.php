<?php

namespace Tests\Feature;

use App\Models\Quotation;
use App\Models\RFQ;
use App\Models\Supplier;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;

class QuotationApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_supplier_can_create_a_quotation_with_calculated_amounts(): void
    {
        [$buyer, $rfq] = $this->buyerAndRFQ();
        [$supplierUser, $supplier] = $this->supplierUser();

        $this->withToken($supplierUser->createToken('test')->plainTextToken)
            ->postJson("/api/rfqs/{$rfq->id}/quotations", $this->payload($rfq))
            ->assertCreated()
            ->assertJsonPath('success', true)
            ->assertJsonPath('quotation_number', 'QT-2026-000001')
            ->assertJsonPath('supplier_id', $supplier->id)
            ->assertJsonPath('total_amount', 5250)
            ->assertJsonPath('currency', 'USD')
            ->assertJsonPath('status', 'pending')
            ->assertJsonPath('items.0.amount', 5250)
            ->assertJsonPath('rfq.id', $rfq->id)
            ->assertJsonPath('supplier.id', $supplier->id);

        $this->assertDatabaseHas('quotation_items', [
            'product_name' => 'Pure Ceylon Black Tea',
            'quantity' => 1000,
            'unit_price' => 5.25,
            'amount' => 5250,
        ]);
    }

    public function test_buyer_can_view_quotations_received_for_owned_rfq(): void
    {
        [$buyer, $rfq] = $this->buyerAndRFQ();
        [, $supplierOne] = $this->supplierUser();
        [, $supplierTwo] = $this->supplierUser();
        $this->createQuotation($rfq, $supplierOne, 5000);
        $this->createQuotation($rfq, $supplierTwo, 4800);

        $this->withToken($buyer->createToken('test')->plainTextToken)
            ->getJson("/api/rfqs/{$rfq->id}/quotations")
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('rfq_id', $rfq->id)
            ->assertJsonPath('total', 2)
            ->assertJsonCount(2, 'data');
    }

    public function test_supplier_can_list_only_their_submitted_quotations(): void
    {
        [, $rfq] = $this->buyerAndRFQ();
        [$supplierUser, $supplier] = $this->supplierUser();
        [, $otherSupplier] = $this->supplierUser();
        $quotation = $this->createQuotation($rfq, $supplier, 5000);
        $this->createQuotation($rfq, $otherSupplier, 4800);

        $this->withToken($supplierUser->createToken('test')->plainTextToken)
            ->getJson('/api/supplier/quotations')
            ->assertOk()
            ->assertJsonPath('total', 1)
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.id', $quotation->id)
            ->assertJsonPath('data.0.rfq.id', $rfq->id);
    }

    public function test_supplier_can_filter_their_quotations_by_rfq(): void
    {
        [, $firstRfq] = $this->buyerAndRFQ();
        [, $secondRfq] = $this->buyerAndRFQ();
        [$supplierUser, $supplier] = $this->supplierUser();
        $matching = $this->createQuotation($firstRfq, $supplier, 5000);
        $this->createQuotation($secondRfq, $supplier, 4800);

        $this->withToken($supplierUser->createToken('test')->plainTextToken)
            ->getJson("/api/supplier/quotations?rfq_id={$firstRfq->id}")
            ->assertOk()
            ->assertJsonPath('total', 1)
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.id', $matching->id);
    }

    public function test_quotation_details_are_visible_to_the_rfq_owner_and_submitting_supplier(): void
    {
        [$buyer, $rfq] = $this->buyerAndRFQ();
        [$supplierUser, $supplier] = $this->supplierUser();
        $quotation = $this->createQuotation($rfq, $supplier, 5000);

        foreach ([$buyer, $supplierUser] as $user) {
            Auth::forgetGuards();

            $this->withToken($user->createToken('details')->plainTextToken)
                ->getJson("/api/quotations/{$quotation->id}")
                ->assertOk()
                ->assertJsonPath('id', $quotation->id)
                ->assertJsonPath('rfq.id', $rfq->id)
                ->assertJsonPath('supplier.id', $supplier->id)
                ->assertJsonCount(1, 'items');
        }
    }

    public function test_supplier_can_update_a_pending_quotation_and_totals_are_recalculated(): void
    {
        [, $rfq] = $this->buyerAndRFQ();
        [$supplierUser, $supplier] = $this->supplierUser();
        $quotation = $this->createQuotation($rfq, $supplier, 5000);

        $this->withToken($supplierUser->createToken('test')->plainTextToken)
            ->putJson("/api/quotations/{$quotation->id}", [
                'currency' => 'eur',
                'lead_time' => '10 days',
                'items' => [
                    [
                        'rfq_item_id' => $rfq->items->first()->id,
                        'product_name' => 'Pure Ceylon Black Tea',
                        'quantity' => 1000,
                        'unit_price' => 4.75,
                    ],
                    [
                        'product_name' => 'Export Packaging',
                        'quantity' => 100,
                        'unit_price' => 2,
                    ],
                ],
            ])
            ->assertOk()
            ->assertJsonPath('currency', 'EUR')
            ->assertJsonPath('lead_time', '10 days')
            ->assertJsonPath('total_amount', 4950)
            ->assertJsonCount(2, 'items')
            ->assertJsonPath('items.0.amount', 4750)
            ->assertJsonPath('items.1.amount', 200);

        $this->assertDatabaseHas('quotations', [
            'id' => $quotation->id,
            'total_amount' => 4950,
            'currency' => 'EUR',
        ]);
    }

    public function test_rfq_owner_can_accept_a_quotation_and_complete_the_rfq(): void
    {
        [$buyer, $rfq] = $this->buyerAndRFQ();
        [, $supplier] = $this->supplierUser();
        $quotation = $this->createQuotation($rfq, $supplier, 5000);

        $this->withToken($buyer->createToken('test')->plainTextToken)
            ->postJson("/api/quotations/{$quotation->id}/accept")
            ->assertOk()
            ->assertJsonPath('status', 'accepted')
            ->assertJsonPath('rfq.status', 'completed');

        $this->assertDatabaseHas('quotations', [
            'id' => $quotation->id,
            'status' => 'accepted',
        ]);
        $this->assertDatabaseHas('rfqs', [
            'id' => $rfq->id,
            'status' => 'completed',
        ]);
    }

    public function test_accepting_a_quotation_rejects_competing_pending_quotations(): void
    {
        [$buyer, $rfq] = $this->buyerAndRFQ();
        [, $supplierOne] = $this->supplierUser();
        [, $supplierTwo] = $this->supplierUser();
        [, $supplierThree] = $this->supplierUser();
        $accepted = $this->createQuotation($rfq, $supplierOne, 5000);
        $competitorOne = $this->createQuotation($rfq, $supplierTwo, 4800);
        $competitorTwo = $this->createQuotation($rfq, $supplierThree, 5100);

        $this->withToken($buyer->createToken('test')->plainTextToken)
            ->postJson("/api/quotations/{$accepted->id}/accept")
            ->assertOk();

        $this->assertSame('accepted', $accepted->refresh()->status);
        $this->assertSame('rejected', $competitorOne->refresh()->status);
        $this->assertSame('rejected', $competitorTwo->refresh()->status);
    }

    public function test_rfq_owner_can_reject_a_pending_quotation(): void
    {
        [$buyer, $rfq] = $this->buyerAndRFQ();
        [, $supplier] = $this->supplierUser();
        $quotation = $this->createQuotation($rfq, $supplier, 5000);

        $this->withToken($buyer->createToken('test')->plainTextToken)
            ->postJson("/api/quotations/{$quotation->id}/reject")
            ->assertOk()
            ->assertJsonPath('status', 'rejected');

        $this->assertDatabaseHas('quotations', [
            'id' => $quotation->id,
            'status' => 'rejected',
        ]);
        $this->assertSame('open', $rfq->refresh()->status);
    }

    public function test_quotation_endpoints_enforce_authentication_and_ownership(): void
    {
        [$buyer, $rfq] = $this->buyerAndRFQ();
        [$supplierUser, $supplier] = $this->supplierUser();
        $otherBuyer = User::factory()->create(['role' => 'buyer']);
        $otherSupplierUser = User::factory()->create(['role' => 'supplier']);
        Supplier::factory()->create(['user_id' => $otherSupplierUser->id]);
        $quotation = $this->createQuotation($rfq, $supplier, 5000);

        $this->postJson("/api/rfqs/{$rfq->id}/quotations", [])->assertUnauthorized();
        $this->getJson("/api/rfqs/{$rfq->id}/quotations")->assertUnauthorized();
        $this->getJson('/api/supplier/quotations')->assertUnauthorized();
        $this->getJson("/api/quotations/{$quotation->id}")->assertUnauthorized();
        $this->putJson("/api/quotations/{$quotation->id}", [])->assertUnauthorized();
        $this->postJson("/api/quotations/{$quotation->id}/accept")->assertUnauthorized();
        $this->postJson("/api/quotations/{$quotation->id}/reject")->assertUnauthorized();

        $this->withToken($buyer->createToken('buyer')->plainTextToken)
            ->postJson("/api/rfqs/{$rfq->id}/quotations", $this->payload($rfq))
            ->assertForbidden();

        Auth::forgetGuards();

        $this->withToken($otherBuyer->createToken('other-buyer')->plainTextToken)
            ->getJson("/api/rfqs/{$rfq->id}/quotations")
            ->assertNotFound();

        Auth::forgetGuards();

        $this->withToken($otherBuyer->createToken('detail')->plainTextToken)
            ->getJson("/api/quotations/{$quotation->id}")
            ->assertNotFound();

        Auth::forgetGuards();

        $this->withToken($otherSupplierUser->createToken('supplier')->plainTextToken)
            ->putJson("/api/quotations/{$quotation->id}", ['remarks' => 'Blocked'])
            ->assertNotFound();

        Auth::forgetGuards();

        $this->withToken($supplierUser->createToken('accept')->plainTextToken)
            ->postJson("/api/quotations/{$quotation->id}/accept")
            ->assertForbidden();
    }

    public function test_dashboard_counts_received_and_submitted_quotations(): void
    {
        [$buyer, $rfq] = $this->buyerAndRFQ();
        [$supplierUser, $supplier] = $this->supplierUser();
        $this->createQuotation($rfq, $supplier, 5000);

        $this->withToken($buyer->createToken('buyer-dashboard')->plainTextToken)
            ->getJson('/api/user/dashboard')
            ->assertOk()
            ->assertJsonPath('rfqs_count', 1)
            ->assertJsonPath('quotations_received_count', 1);

        Auth::forgetGuards();

        $this->withToken($supplierUser->createToken('supplier-dashboard')->plainTextToken)
            ->getJson('/api/user/dashboard')
            ->assertOk()
            ->assertJsonPath('quotations_count', 1);
    }

    private function buyerAndRFQ(): array
    {
        $buyer = User::factory()->create(['role' => 'buyer']);
        $rfq = RFQ::create([
            'user_id' => $buyer->id,
            'rfq_number' => 'RFQ-2026-'.str_pad((string) (RFQ::count() + 1), 6, '0', STR_PAD_LEFT),
            'title' => 'Need Ceylon Tea Suppliers',
            'description' => 'Export to Dubai',
            'destination_country' => 'UAE',
            'expected_delivery_date' => '2026-08-01',
            'status' => 'open',
        ]);
        $rfq->items()->create([
            'product_name' => 'Pure Ceylon Black Tea',
            'quantity' => 1000,
            'unit' => 'kg',
            'specifications' => 'Premium grade',
        ]);

        return [$buyer, $rfq->load('items')];
    }

    private function supplierUser(): array
    {
        $user = User::factory()->create(['role' => 'supplier']);
        $supplier = Supplier::factory()->create(['user_id' => $user->id]);

        return [$user, $supplier];
    }

    private function createQuotation(RFQ $rfq, Supplier $supplier, float $amount): Quotation
    {
        $quotation = Quotation::create([
            'rfq_id' => $rfq->id,
            'supplier_id' => $supplier->id,
            'quotation_number' => 'QT-2026-'.str_pad((string) (Quotation::count() + 1), 6, '0', STR_PAD_LEFT),
            'total_amount' => $amount,
            'currency' => 'USD',
            'lead_time' => '15 days',
            'payment_terms' => '30% advance',
            'shipping_terms' => 'FOB Colombo',
            'remarks' => 'High quality products',
            'status' => 'pending',
        ]);
        $quotation->items()->create([
            'rfq_item_id' => $rfq->items->first()->id,
            'product_name' => 'Pure Ceylon Black Tea',
            'quantity' => 1000,
            'unit_price' => $amount / 1000,
            'amount' => $amount,
        ]);

        return $quotation;
    }

    private function payload(RFQ $rfq): array
    {
        return [
            'currency' => 'USD',
            'lead_time' => '15 days',
            'payment_terms' => '30% advance',
            'shipping_terms' => 'FOB Colombo',
            'remarks' => 'High quality products',
            'items' => [
                [
                    'rfq_item_id' => $rfq->items->first()->id,
                    'product_name' => 'Pure Ceylon Black Tea',
                    'quantity' => 1000,
                    'unit_price' => 5.25,
                ],
            ],
        ];
    }
}
