<?php

namespace Tests\Feature;

use App\Models\Conversation;
use App\Models\Notification;
use App\Models\Quotation;
use App\Models\RFQ;
use App\Models\Supplier;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;

class NotificationApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_user_can_list_notifications_with_unread_count(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();
        $older = $this->createNotification(
            $user,
            'new_message',
            'Older notification',
            false,
            now()->subDay(),
        );
        $latest = $this->createNotification(
            $user,
            'new_quotation',
            'Latest notification',
            false,
            now(),
        );
        $this->createNotification($user, 'supplier_verified', 'Read notification', true, now()->subHour());
        $this->createNotification($otherUser, 'new_message', 'Other user notification', false, now());

        $this->withToken($user->createToken('test')->plainTextToken)
            ->getJson('/api/notifications')
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('unread_count', 2)
            ->assertJsonPath('per_page', 20)
            ->assertJsonPath('total', 3)
            ->assertJsonCount(3, 'notifications')
            ->assertJsonPath('notifications.0.id', $latest->id)
            ->assertJsonPath('notifications.0.title', 'Latest notification')
            ->assertJsonPath('notifications.1.title', 'Read notification')
            ->assertJsonPath('notifications.2.id', $older->id);
    }

    public function test_authenticated_user_can_mark_single_notification_read(): void
    {
        $user = User::factory()->create();
        $notification = $this->createNotification($user, 'new_message', 'Unread notification');
        $this->createNotification($user, 'new_quotation', 'Another unread notification');

        $this->withToken($user->createToken('test')->plainTextToken)
            ->putJson("/api/notifications/{$notification->id}/read")
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('notification.id', $notification->id)
            ->assertJsonPath('notification.is_read', true)
            ->assertJsonPath('unread_count', 1);

        $this->assertTrue($notification->refresh()->is_read);
    }

    public function test_authenticated_user_can_mark_all_notifications_read(): void
    {
        $user = User::factory()->create();
        $this->createNotification($user, 'new_message', 'First unread notification');
        $this->createNotification($user, 'new_quotation', 'Second unread notification');
        $this->createNotification($user, 'supplier_verified', 'Already read notification', true);

        $this->withToken($user->createToken('test')->plainTextToken)
            ->putJson('/api/notifications/read-all')
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('message', 'All notifications marked as read.')
            ->assertJsonPath('updated_count', 2)
            ->assertJsonPath('unread_count', 0);

        $this->assertSame(0, $user->notifications()->unread()->count());
    }

    public function test_quotation_actions_create_notifications_for_buyer_and_supplier(): void
    {
        [$buyer, $rfq] = $this->buyerAndRFQ();
        [$supplierUser, $supplier] = $this->supplierUser();

        $quotationId = $this->withToken($supplierUser->createToken('create')->plainTextToken)
            ->postJson("/api/rfqs/{$rfq->id}/quotations", $this->quotationPayload($rfq))
            ->assertCreated()
            ->json('id');

        $this->assertDatabaseHas('notifications', [
            'user_id' => $buyer->id,
            'type' => 'new_quotation',
            'reference_type' => 'quotation',
            'reference_id' => $quotationId,
            'is_read' => false,
        ]);

        Auth::forgetGuards();

        $this->withToken($buyer->createToken('accept')->plainTextToken)
            ->postJson("/api/quotations/{$quotationId}/accept")
            ->assertOk();

        $this->assertDatabaseHas('notifications', [
            'user_id' => $supplierUser->id,
            'type' => 'quotation_accepted',
            'reference_type' => 'quotation',
            'reference_id' => $quotationId,
            'is_read' => false,
        ]);

        [$rejectBuyer, $rejectRfq] = $this->buyerAndRFQ();
        [$rejectSupplierUser, $rejectSupplier] = $this->supplierUser();
        $rejectedQuotation = $this->createQuotation($rejectRfq, $rejectSupplier);

        Auth::forgetGuards();

        $this->withToken($rejectBuyer->createToken('reject')->plainTextToken)
            ->postJson("/api/quotations/{$rejectedQuotation->id}/reject")
            ->assertOk();

        $this->assertDatabaseHas('notifications', [
            'user_id' => $rejectSupplierUser->id,
            'type' => 'quotation_rejected',
            'reference_type' => 'quotation',
            'reference_id' => $rejectedQuotation->id,
            'is_read' => false,
        ]);
    }

    public function test_sending_message_creates_notification_for_receiver(): void
    {
        $buyer = User::factory()->create(['role' => 'buyer', 'name' => 'Buyer User']);
        $supplier = Supplier::factory()->create();
        $conversation = Conversation::create([
            'buyer_id' => $buyer->id,
            'supplier_id' => $supplier->id,
            'last_message_at' => now(),
        ]);

        $messageId = $this->withToken($buyer->createToken('message')->plainTextToken)
            ->postJson('/api/messages', [
                'conversation_id' => $conversation->id,
                'message' => 'Please send FOB Colombo price.',
            ])
            ->assertCreated()
            ->json('id');

        $this->assertDatabaseHas('notifications', [
            'user_id' => $supplier->user_id,
            'type' => 'new_message',
            'reference_type' => 'message',
            'reference_id' => $messageId,
            'is_read' => false,
        ]);

        Auth::forgetGuards();

        $this->withToken($supplier->user->createToken('notifications')->plainTextToken)
            ->getJson('/api/notifications')
            ->assertOk()
            ->assertJsonPath('unread_count', 1)
            ->assertJsonPath('notifications.0.type', 'new_message')
            ->assertJsonPath('notifications.0.reference_id', $messageId);
    }

    public function test_notification_endpoints_enforce_authentication_and_ownership(): void
    {
        $owner = User::factory()->create();
        $otherUser = User::factory()->create();
        $notification = $this->createNotification($owner, 'new_message', 'Private notification');

        $this->getJson('/api/notifications')->assertUnauthorized();
        $this->putJson("/api/notifications/{$notification->id}/read")->assertUnauthorized();
        $this->putJson('/api/notifications/read-all')->assertUnauthorized();

        $this->withToken($otherUser->createToken('other')->plainTextToken)
            ->putJson("/api/notifications/{$notification->id}/read")
            ->assertNotFound();

        $this->assertFalse($notification->refresh()->is_read);
    }

    private function createNotification(
        User $user,
        string $type,
        string $title,
        bool $isRead = false,
        mixed $createdAt = null,
    ): Notification {
        $notification = $user->notifyUser(
            $type,
            $title,
            "{$title} body",
            str_contains($type, 'quotation') ? 'quotation' : 'message',
            1,
        );

        $notification->forceFill([
            'is_read' => $isRead,
            'created_at' => $createdAt ?? now(),
            'updated_at' => $createdAt ?? now(),
        ])->save();

        return $notification;
    }

    private function buyerAndRFQ(): array
    {
        $buyer = User::factory()->create(['role' => 'buyer']);
        $rfq = RFQ::create([
            'user_id' => $buyer->id,
            'rfq_number' => 'RFQ-2026-'.str_pad((string) (RFQ::query()->count() + 1), 6, '0', STR_PAD_LEFT),
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

    private function createQuotation(RFQ $rfq, Supplier $supplier): Quotation
    {
        $quotation = Quotation::create([
            'rfq_id' => $rfq->id,
            'supplier_id' => $supplier->id,
            'quotation_number' => 'QT-2026-'.str_pad((string) (Quotation::query()->count() + 1), 6, '0', STR_PAD_LEFT),
            'total_amount' => 5250,
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
            'unit_price' => 5.25,
            'amount' => 5250,
        ]);

        return $quotation;
    }

    private function quotationPayload(RFQ $rfq): array
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
