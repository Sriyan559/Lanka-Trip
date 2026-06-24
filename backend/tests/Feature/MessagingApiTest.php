<?php

namespace Tests\Feature;

use App\Models\Conversation;
use App\Models\Message;
use App\Models\RFQ;
use App\Models\Supplier;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;

class MessagingApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_buyer_can_create_a_conversation_with_a_supplier_and_rfq(): void
    {
        [$buyer, $supplier, $rfq] = $this->buyerSupplierAndRFQ();

        $this->withToken($buyer->createToken('test')->plainTextToken)
            ->postJson('/api/conversations', [
                'supplier_id' => $supplier->id,
                'rfq_id' => $rfq->id,
            ])
            ->assertCreated()
            ->assertJsonPath('success', true)
            ->assertJsonPath('conversation.buyer_id', $buyer->id)
            ->assertJsonPath('conversation.supplier_id', $supplier->id)
            ->assertJsonPath('conversation.rfq.id', $rfq->id)
            ->assertJsonPath('conversation.unread_count', 0);

        $this->assertDatabaseHas('conversations', [
            'buyer_id' => $buyer->id,
            'supplier_id' => $supplier->id,
            'rfq_id' => $rfq->id,
        ]);
    }

    public function test_duplicate_conversation_requests_return_the_existing_conversation(): void
    {
        [$buyer, $supplier, $rfq] = $this->buyerSupplierAndRFQ();
        $token = $buyer->createToken('test')->plainTextToken;

        $first = $this->withToken($token)
            ->postJson('/api/conversations', [
                'supplier_id' => $supplier->id,
                'rfq_id' => $rfq->id,
            ])
            ->assertCreated()
            ->json('conversation.id');

        $this->withToken($token)
            ->postJson('/api/conversations', [
                'supplier_id' => $supplier->id,
                'rfq_id' => $rfq->id,
            ])
            ->assertOk()
            ->assertJsonPath('conversation.id', $first);

        $this->assertDatabaseCount('conversations', 1);
    }

    public function test_conversation_participant_can_send_a_message(): void
    {
        [$buyer, $supplier, $rfq] = $this->buyerSupplierAndRFQ();
        $conversation = $this->createConversation($buyer, $supplier, $rfq);

        $this->withToken($buyer->createToken('test')->plainTextToken)
            ->postJson('/api/messages', [
                'conversation_id' => $conversation->id,
                'message' => 'Please send FOB Colombo price.',
            ])
            ->assertCreated()
            ->assertJsonPath('success', true)
            ->assertJsonPath('conversation_id', $conversation->id)
            ->assertJsonPath('sender_id', $buyer->id)
            ->assertJsonPath('receiver_id', $supplier->user_id)
            ->assertJsonPath('message', 'Please send FOB Colombo price.')
            ->assertJsonPath('is_read', false);

        $this->assertDatabaseHas('messages', [
            'conversation_id' => $conversation->id,
            'sender_id' => $buyer->id,
            'receiver_id' => $supplier->user_id,
            'message' => 'Please send FOB Colombo price.',
            'is_read' => false,
        ]);
        $this->assertNotNull($conversation->refresh()->last_message_at);
    }

    public function test_conversation_list_is_sorted_by_latest_activity_and_includes_unread_count(): void
    {
        [$buyer, $supplierOne, $rfq] = $this->buyerSupplierAndRFQ();
        $supplierTwo = Supplier::factory()->create();
        $olderConversation = $this->createConversation($buyer, $supplierOne, $rfq);
        $latestConversation = $this->createConversation($buyer, $supplierTwo);
        $this->createMessage(
            $olderConversation,
            $supplierOne->user,
            $buyer,
            'Older unread message',
            now()->subHour(),
        );
        $this->createMessage(
            $latestConversation,
            $supplierTwo->user,
            $buyer,
            'Latest unread message',
            now(),
        );

        $this->withToken($buyer->createToken('test')->plainTextToken)
            ->getJson('/api/conversations')
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonCount(2, 'data')
            ->assertJsonPath('data.0.id', $latestConversation->id)
            ->assertJsonPath('data.0.latest_message.message', 'Latest unread message')
            ->assertJsonPath('data.0.unread_count', 1)
            ->assertJsonPath('data.1.id', $olderConversation->id);
    }

    public function test_conversation_details_include_paginated_messages_and_related_records(): void
    {
        [$buyer, $supplier, $rfq] = $this->buyerSupplierAndRFQ();
        $conversation = $this->createConversation($buyer, $supplier, $rfq);
        $oldest = $this->createMessage(
            $conversation,
            $buyer,
            $supplier->user,
            'First message',
            now()->subMinutes(5),
        );
        $latest = $this->createMessage(
            $conversation,
            $supplier->user,
            $buyer,
            'Second message',
            now(),
        );

        $this->withToken($buyer->createToken('test')->plainTextToken)
            ->getJson("/api/conversations/{$conversation->id}")
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('conversation.id', $conversation->id)
            ->assertJsonPath('conversation.rfq.id', $rfq->id)
            ->assertJsonPath('messages_pagination.total', 2)
            ->assertJsonCount(2, 'messages')
            ->assertJsonPath('messages.0.id', $latest->id)
            ->assertJsonPath('messages.1.id', $oldest->id);
    }

    public function test_receiver_can_mark_a_message_as_read(): void
    {
        [$buyer, $supplier, $rfq] = $this->buyerSupplierAndRFQ();
        $conversation = $this->createConversation($buyer, $supplier, $rfq);
        $message = $this->createMessage(
            $conversation,
            $supplier->user,
            $buyer,
            'Please confirm your quantity.',
        );

        $this->withToken($buyer->createToken('test')->plainTextToken)
            ->putJson("/api/messages/{$message->id}/read")
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('id', $message->id)
            ->assertJsonPath('is_read', true);

        $this->assertTrue($message->refresh()->is_read);

        $this->withToken($buyer->createToken('second')->plainTextToken)
            ->getJson('/api/conversations')
            ->assertOk()
            ->assertJsonPath('data.0.unread_count', 0);
    }

    public function test_messaging_endpoints_enforce_authentication_and_participant_access(): void
    {
        [$buyer, $supplier, $rfq] = $this->buyerSupplierAndRFQ();
        $conversation = $this->createConversation($buyer, $supplier, $rfq);
        $message = $this->createMessage($conversation, $buyer, $supplier->user, 'Private message');
        $otherBuyer = User::factory()->create(['role' => 'buyer']);
        $otherSupplier = Supplier::factory()->create();

        $this->getJson('/api/conversations')->assertUnauthorized();
        $this->postJson('/api/conversations', [])->assertUnauthorized();
        $this->getJson("/api/conversations/{$conversation->id}")->assertUnauthorized();
        $this->postJson('/api/messages', [])->assertUnauthorized();
        $this->putJson("/api/messages/{$message->id}/read")->assertUnauthorized();

        $this->withToken($otherBuyer->createToken('other-buyer')->plainTextToken)
            ->getJson("/api/conversations/{$conversation->id}")
            ->assertNotFound();

        Auth::forgetGuards();

        $this->withToken($otherBuyer->createToken('other-buyer-2')->plainTextToken)
            ->postJson('/api/messages', [
                'conversation_id' => $conversation->id,
                'message' => 'Trying to enter the chat.',
            ])
            ->assertForbidden();

        Auth::forgetGuards();

        $this->withToken($otherSupplier->user->createToken('other-supplier')->plainTextToken)
            ->postJson('/api/messages', [
                'conversation_id' => $conversation->id,
                'message' => 'Wrong supplier.',
            ])
            ->assertForbidden();

        Auth::forgetGuards();

        $this->withToken($buyer->createToken('sender')->plainTextToken)
            ->putJson("/api/messages/{$message->id}/read")
            ->assertForbidden();
    }

    public function test_dashboard_counts_messages_for_buyers_and_suppliers(): void
    {
        [$buyer, $supplier, $rfq] = $this->buyerSupplierAndRFQ();
        $conversation = $this->createConversation($buyer, $supplier, $rfq);
        $this->createMessage($conversation, $buyer, $supplier->user, 'Buyer to supplier');
        $this->createMessage($conversation, $supplier->user, $buyer, 'Supplier to buyer');

        $this->withToken($buyer->createToken('buyer')->plainTextToken)
            ->getJson('/api/user/dashboard')
            ->assertOk()
            ->assertJsonPath('messages_count', 2);

        Auth::forgetGuards();

        $this->withToken($supplier->user->createToken('supplier')->plainTextToken)
            ->getJson('/api/user/dashboard')
            ->assertOk()
            ->assertJsonPath('messages_count', 2);
    }

    /**
     * @return array{0: User, 1: Supplier, 2: RFQ}
     */
    private function buyerSupplierAndRFQ(): array
    {
        $buyer = User::factory()->create(['role' => 'buyer']);
        $supplier = Supplier::factory()->create();
        $rfq = RFQ::create([
            'user_id' => $buyer->id,
            'rfq_number' => 'RFQ-2026-'.str_pad((string) (RFQ::query()->count() + 1), 6, '0', STR_PAD_LEFT),
            'title' => 'Need Ceylon Tea Suppliers',
            'description' => 'Export to Dubai',
            'destination_country' => 'UAE',
            'expected_delivery_date' => '2026-08-01',
            'status' => 'open',
        ]);

        return [$buyer, $supplier, $rfq];
    }

    private function createConversation(User $buyer, Supplier $supplier, ?RFQ $rfq = null): Conversation
    {
        return Conversation::create([
            'buyer_id' => $buyer->id,
            'supplier_id' => $supplier->id,
            'rfq_id' => $rfq?->id,
            'last_message_at' => now()->subDay(),
        ]);
    }

    private function createMessage(
        Conversation $conversation,
        User $sender,
        User $receiver,
        string $message,
        mixed $createdAt = null,
    ): Message {
        $createdAt ??= now();

        $message = Message::create([
            'conversation_id' => $conversation->id,
            'sender_id' => $sender->id,
            'receiver_id' => $receiver->id,
            'message' => $message,
            'is_read' => false,
            'created_at' => $createdAt,
            'updated_at' => $createdAt,
        ]);

        $conversation->update(['last_message_at' => $message->created_at]);

        return $message;
    }
}
