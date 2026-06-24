<?php

namespace Tests\Feature;

use App\Models\RFQ;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RFQApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_buyer_can_create_an_rfq_with_items_and_generated_number(): void
    {
        $buyer = User::factory()->create(['role' => 'buyer']);

        $this->withToken($buyer->createToken('test')->plainTextToken)
            ->postJson('/api/rfqs', $this->payload())
            ->assertCreated()
            ->assertJsonPath('success', true)
            ->assertJsonPath('rfq_number', 'RFQ-2026-000001')
            ->assertJsonPath('title', 'Need Ceylon Tea Suppliers')
            ->assertJsonPath('status', 'open')
            ->assertJsonPath('quotations_count', 0)
            ->assertJsonPath('responses_count', 0)
            ->assertJsonCount(1, 'items')
            ->assertJsonPath('items.0.product_name', 'Pure Ceylon Black Tea')
            ->assertJsonPath('items.0.quantity', 1000)
            ->assertJsonPath('product_name', 'Pure Ceylon Black Tea');

        $this->assertDatabaseHas('rfqs', [
            'user_id' => $buyer->id,
            'rfq_number' => 'RFQ-2026-000001',
            'status' => 'open',
        ]);
        $this->assertDatabaseHas('rfq_items', [
            'product_name' => 'Pure Ceylon Black Tea',
            'quantity' => 1000,
            'unit' => 'kg',
        ]);
    }

    public function test_buyer_can_list_only_their_rfqs_with_pagination(): void
    {
        $buyer = User::factory()->create(['role' => 'buyer']);
        $otherBuyer = User::factory()->create(['role' => 'buyer']);
        $this->createRFQ($buyer, 'Buyer RFQ One');
        $this->createRFQ($buyer, 'Buyer RFQ Two');
        $this->createRFQ($otherBuyer, 'Other Buyer RFQ');

        $this->withToken($buyer->createToken('test')->plainTextToken)
            ->getJson('/api/rfqs')
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('total', 2)
            ->assertJsonPath('per_page', 20)
            ->assertJsonCount(2, 'data');
    }

    public function test_buyer_can_view_owned_rfq_details_with_zero_quotation_count(): void
    {
        $buyer = User::factory()->create(['role' => 'buyer']);
        $rfq = $this->createRFQ($buyer, 'Tea Detail RFQ');

        $this->withToken($buyer->createToken('test')->plainTextToken)
            ->getJson("/api/rfqs/{$rfq->id}")
            ->assertOk()
            ->assertJsonPath('id', $rfq->id)
            ->assertJsonPath('title', 'Tea Detail RFQ')
            ->assertJsonPath('quotations_count', 0)
            ->assertJsonCount(1, 'items');
    }

    public function test_buyer_can_update_an_open_rfq_and_replace_items(): void
    {
        $buyer = User::factory()->create(['role' => 'buyer']);
        $rfq = $this->createRFQ($buyer, 'Original RFQ');

        $this->withToken($buyer->createToken('test')->plainTextToken)
            ->putJson("/api/rfqs/{$rfq->id}", [
                'title' => 'Updated RFQ',
                'destination_country' => 'Qatar',
                'items' => [
                    [
                        'product_name' => 'Green Tea Bags',
                        'quantity' => 500,
                        'unit' => 'boxes',
                        'specifications' => 'Private label packaging',
                    ],
                    [
                        'product_name' => 'Cinnamon Sticks',
                        'quantity' => 250,
                        'unit' => 'kg',
                        'specifications' => null,
                    ],
                ],
            ])
            ->assertOk()
            ->assertJsonPath('title', 'Updated RFQ')
            ->assertJsonPath('destination_country', 'Qatar')
            ->assertJsonCount(2, 'items')
            ->assertJsonPath('items.0.product_name', 'Green Tea Bags');

        $this->assertDatabaseCount('rfq_items', 2);
        $this->assertDatabaseMissing('rfq_items', ['product_name' => 'Pure Ceylon Black Tea']);
    }

    public function test_non_open_rfq_cannot_be_updated(): void
    {
        $buyer = User::factory()->create(['role' => 'buyer']);
        $rfq = $this->createRFQ($buyer, 'Closed RFQ', 'closed');

        $this->withToken($buyer->createToken('test')->plainTextToken)
            ->putJson("/api/rfqs/{$rfq->id}", ['title' => 'Not Allowed'])
            ->assertConflict()
            ->assertExactJson([
                'success' => false,
                'message' => 'Only open RFQs can be updated.',
            ]);
    }

    public function test_buyer_can_soft_delete_an_owned_rfq(): void
    {
        $buyer = User::factory()->create(['role' => 'buyer']);
        $rfq = $this->createRFQ($buyer, 'Delete Me');

        $this->withToken($buyer->createToken('test')->plainTextToken)
            ->deleteJson("/api/rfqs/{$rfq->id}")
            ->assertOk()
            ->assertExactJson([
                'success' => true,
                'message' => 'RFQ deleted successfully.',
            ]);

        $this->assertSoftDeleted('rfqs', ['id' => $rfq->id]);

        $this->withToken($buyer->createToken('second')->plainTextToken)
            ->getJson("/api/rfqs/{$rfq->id}")
            ->assertNotFound();
    }

    public function test_supplier_can_list_only_open_non_deleted_rfqs(): void
    {
        $supplier = User::factory()->create(['role' => 'supplier']);
        $buyer = User::factory()->create(['role' => 'buyer']);
        $open = $this->createRFQ($buyer, 'Open RFQ');
        $this->createRFQ($buyer, 'Closed RFQ', 'closed');
        $deleted = $this->createRFQ($buyer, 'Deleted RFQ');
        $deleted->delete();

        $this->withToken($supplier->createToken('test')->plainTextToken)
            ->getJson('/api/supplier/rfqs')
            ->assertOk()
            ->assertJsonPath('total', 1)
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.id', $open->id)
            ->assertJsonPath('data.0.status', 'open');
    }

    public function test_buyer_cannot_access_supplier_rfq_listing_or_other_buyers_rfqs(): void
    {
        $buyer = User::factory()->create(['role' => 'buyer']);
        $otherBuyer = User::factory()->create(['role' => 'buyer']);
        $rfq = $this->createRFQ($otherBuyer, 'Private RFQ');
        $token = $buyer->createToken('test')->plainTextToken;

        $this->withToken($token)->getJson('/api/supplier/rfqs')->assertForbidden();
        $this->withToken($token)->getJson("/api/rfqs/{$rfq->id}")->assertNotFound();
        $this->withToken($token)
            ->putJson("/api/rfqs/{$rfq->id}", ['title' => 'Blocked'])
            ->assertNotFound();
        $this->withToken($token)->deleteJson("/api/rfqs/{$rfq->id}")->assertNotFound();
    }

    public function test_rfq_endpoints_require_authentication(): void
    {
        $this->postJson('/api/rfqs', $this->payload())->assertUnauthorized();
        $this->getJson('/api/rfqs')->assertUnauthorized();
        $this->getJson('/api/rfqs/1')->assertUnauthorized();
        $this->putJson('/api/rfqs/1', [])->assertUnauthorized();
        $this->deleteJson('/api/rfqs/1')->assertUnauthorized();
        $this->getJson('/api/supplier/rfqs')->assertUnauthorized();
    }

    private function createRFQ(User $buyer, string $title, string $status = 'open'): RFQ
    {
        $rfq = RFQ::create([
            'user_id' => $buyer->id,
            'rfq_number' => 'RFQ-2026-'.str_pad((string) (RFQ::withTrashed()->count() + 1), 6, '0', STR_PAD_LEFT),
            'title' => $title,
            'description' => 'Export requirement',
            'destination_country' => 'UAE',
            'expected_delivery_date' => '2026-08-01',
            'status' => $status,
        ]);

        $rfq->items()->create([
            'product_name' => 'Pure Ceylon Black Tea',
            'quantity' => 1000,
            'unit' => 'kg',
            'specifications' => 'Premium grade',
        ]);

        return $rfq;
    }

    private function payload(): array
    {
        return [
            'title' => 'Need Ceylon Tea Suppliers',
            'description' => 'Export to Dubai',
            'destination_country' => 'UAE',
            'expected_delivery_date' => '2026-08-01',
            'items' => [
                [
                    'product_name' => 'Pure Ceylon Black Tea',
                    'quantity' => 1000,
                    'unit' => 'kg',
                    'specifications' => 'Premium grade',
                ],
            ],
        ];
    }
}
