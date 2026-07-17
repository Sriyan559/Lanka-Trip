<?php

namespace Tests\Feature;

use App\Models\AiAdvisorConversation;
use App\Models\AiAdvisorMessage;
use App\Models\AiAdvisorSavedPlan;
use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;
use Tests\TestCase;

class AIBeautyAdvisorApiTest extends TestCase
{
    use RefreshDatabase;

    protected User $user;
    protected User $otherUser;

    protected function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create([
            'name' => 'Sriyan Chathuranga',
            'role' => 'buyer',
        ]);

        $this->otherUser = User::factory()->create([
            'name' => 'Chathura Fernando',
            'role' => 'buyer',
        ]);
    }

    public function test_guest_can_start_conversation_with_session_id(): void
    {
        $guestSessionId = (string) Str::uuid();

        $response = $this->postJson('/api/beauty-advisor/conversations', [
            'guest_session_id' => $guestSessionId,
        ]);

        $response->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonStructure(['conversation' => ['id', 'guest_session_id', 'status']]);

        $this->assertDatabaseHas('ai_advisor_conversations', [
            'guest_session_id' => $guestSessionId,
            'status' => 'active',
        ]);
    }

    public function test_authenticated_user_can_start_conversation_without_session_id(): void
    {
        $response = $this->actingAs($this->user, 'sanctum')
            ->postJson('/api/beauty-advisor/conversations');

        $response->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('conversation.user_id', $this->user->id);

        $this->assertDatabaseHas('ai_advisor_conversations', [
            'user_id' => $this->user->id,
            'status' => 'active',
        ]);
    }

    public function test_cannot_access_conversation_belonging_to_another_user(): void
    {
        $conversation = AiAdvisorConversation::create([
            'user_id' => $this->user->id,
            'status' => 'active',
        ]);

        $this->actingAs($this->otherUser, 'sanctum')
            ->getJson("/api/beauty-advisor/conversations/{$conversation->id}")
            ->assertForbidden();
    }

    public function test_guest_cannot_access_conversation_belonging_to_different_guest(): void
    {
        $conversation = AiAdvisorConversation::create([
            'guest_session_id' => (string) Str::uuid(),
            'status' => 'active',
        ]);

        $this->getJson("/api/beauty-advisor/conversations/{$conversation->id}", [
            'X-Guest-Session-Id' => (string) Str::uuid(),
        ])->assertForbidden();
    }

    public function test_guest_can_access_own_conversation(): void
    {
        $uuid = (string) Str::uuid();
        $conversation = AiAdvisorConversation::create([
            'guest_session_id' => $uuid,
            'status' => 'active',
        ]);

        $this->getJson("/api/beauty-advisor/conversations/{$conversation->id}", [
            'X-Guest-Session-Id' => $uuid,
        ])
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('conversation.id', $conversation->id);
    }

    public function test_user_can_update_profile_context(): void
    {
        $conversation = AiAdvisorConversation::create([
            'user_id' => $this->user->id,
            'status' => 'active',
        ]);

        $this->actingAs($this->user, 'sanctum')
            ->postJson("/api/beauty-advisor/conversations/{$conversation->id}/profile", [
                'profile_context' => [
                    'skin_type' => 'Dry',
                    'skin_concern' => 'Hydration',
                ],
            ])
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('conversation.profile_context.skin_type', 'Dry');
    }

    public function test_user_can_archive_current_conversation_and_start_a_new_one(): void
    {
        $conversation = AiAdvisorConversation::create([
            'user_id' => $this->user->id,
            'status' => 'active',
            'profile_context' => ['skin_type' => 'Dry'],
        ]);
        AiAdvisorMessage::create([
            'conversation_id' => $conversation->id,
            'role' => 'user',
            'content' => 'Keep this in history.',
        ]);

        $response = $this->actingAs($this->user, 'sanctum')
            ->postJson("/api/beauty-advisor/conversations/{$conversation->id}/new")
            ->assertCreated()
            ->assertJsonPath('success', true)
            ->assertJsonPath('conversation.status', 'active');

        $this->assertDatabaseHas('ai_advisor_conversations', ['id' => $conversation->id, 'status' => 'archived']);
        $this->assertDatabaseHas('ai_advisor_messages', ['conversation_id' => $conversation->id, 'content' => 'Keep this in history.']);
        $this->assertNotSame($conversation->id, $response->json('conversation.id'));
    }

    public function test_guest_can_clear_own_conversation_but_not_another_guests_conversation(): void
    {
        $guestSessionId = (string) Str::uuid();
        $conversation = AiAdvisorConversation::create([
            'guest_session_id' => $guestSessionId,
            'status' => 'active',
            'profile_context' => ['skin_type' => 'Oily'],
        ]);
        AiAdvisorMessage::create([
            'conversation_id' => $conversation->id,
            'role' => 'user',
            'content' => 'Clear me.',
        ]);

        $this->deleteJson("/api/beauty-advisor/conversations/{$conversation->id}/messages", [], [
            'X-Guest-Session-Id' => (string) Str::uuid(),
        ])->assertForbidden();

        $this->deleteJson("/api/beauty-advisor/conversations/{$conversation->id}/messages", [], [
            'X-Guest-Session-Id' => $guestSessionId,
        ])->assertOk()->assertJsonPath('message', 'Chat cleared successfully.');

        $this->assertDatabaseMissing('ai_advisor_messages', ['conversation_id' => $conversation->id]);
        $this->assertNull($conversation->fresh()->profile_context);
    }

    public function test_send_message_returns_grounded_structured_mock_response(): void
    {
        $conversation = AiAdvisorConversation::create([
            'user_id' => $this->user->id,
            'status' => 'active',
            'profile_context' => [
                'skin_type' => 'Dry',
            ],
        ]);

        // Create category and product
        $category = Category::factory()->create(['status' => 'active']);
        $product = Product::factory()->create([
            'category_id' => $category->id,
            'name' => 'Hydrating Summer Serum',
            'description' => 'Serum for dry skin.',
            'status' => 'active',
            'price' => 1200,
        ]);

        $response = $this->actingAs($this->user, 'sanctum')
            ->postJson("/api/beauty-advisor/conversations/{$conversation->id}/messages", [
                'message' => 'Recommend a skincare routine for my dry skin.',
            ]);

        $response->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonStructure([
                'message' => [
                    'id',
                    'role',
                    'content',
                    'structured_data' => [
                        'reply',
                        'followUpQuestion',
                        'quickReplies',
                        'recommendedProductIds',
                        'routine',
                        'disclaimer',
                    ],
                ]
            ]);

        // Assert grounding: should have matched the product we created
        $messageData = $response->json('message.structured_data');
        $this->assertContains((string) $product->id, $messageData['recommendedProductIds']);
    }

    public function test_authenticated_user_can_save_and_retrieve_routine_plans(): void
    {
        $conversation = AiAdvisorConversation::create([
            'user_id' => $this->user->id,
            'status' => 'active',
        ]);

        $planData = [
            'title' => 'My Morning Skincare',
            'profile_context' => [
                'skin_type' => 'Combination',
            ],
            'routine_data' => [
                'steps' => [
                    ['step' => 1, 'title' => 'Cleanse'],
                ]
            ],
            'conversation_id' => $conversation->id,
        ];

        // Guest cannot save plans
        $this->postJson('/api/beauty-advisor/plans', $planData)
            ->assertUnauthorized();

        // Logged-in user can save plans
        $this->actingAs($this->user, 'sanctum')
            ->postJson('/api/beauty-advisor/plans', $planData)
            ->assertCreated()
            ->assertJsonPath('success', true)
            ->assertJsonPath('plan.title', 'My Morning Skincare');

        // Logged-in user can retrieve plans
        $this->actingAs($this->user, 'sanctum')
            ->getJson('/api/beauty-advisor/plans')
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonCount(1, 'plans');
    }

    public function test_supported_multilingual_language_is_persisted(): void
    {
        $conversation = AiAdvisorConversation::create(['user_id' => $this->user->id, 'status' => 'active']);
        $this->actingAs($this->user, 'sanctum')->postJson("/api/beauty-advisor/conversations/{$conversation->id}/profile", [
            'profile_context' => ['language' => 'zh-CN'],
        ])->assertOk()->assertJsonPath('conversation.profile_context.language', 'zh-CN');
    }

    public function test_safety_sensitive_question_is_intercepted_without_product_recommendations(): void
    {
        $conversation = AiAdvisorConversation::create(['user_id' => $this->user->id, 'status' => 'active', 'profile_context' => ['language' => 'en']]);
        $this->actingAs($this->user, 'sanctum')->postJson("/api/beauty-advisor/conversations/{$conversation->id}/messages", [
            'message' => 'Diagnose this rapidly worsening infected rash and prescribe something.',
        ])->assertOk()
          ->assertJsonPath('message.structured_data.requiresProfessionalAdvice', true)
          ->assertJsonCount(0, 'message.structured_data.recommendedProductIds');
    }

    public function test_guest_can_rate_own_assistant_message(): void
    {
        $guest = (string) Str::uuid();
        $conversation = AiAdvisorConversation::create(['guest_session_id' => $guest, 'status' => 'active']);
        $message = AiAdvisorMessage::create([
            'conversation_id' => $conversation->id, 'role' => 'assistant', 'content' => 'Patch test first.',
            'structured_data' => ['language' => 'ta', 'intent' => 'beauty_question', 'sources' => []], 'model' => 'test-model',
        ]);
        $this->postJson("/api/beauty-advisor/messages/{$message->id}/feedback", ['feedback_type' => 'helpful'], ['X-Guest-Session-Id' => $guest])
            ->assertOk()->assertJsonPath('feedback.language', 'ta');
        $this->assertDatabaseHas('ai_advisor_feedback', ['message_id' => $message->id, 'feedback_type' => 'helpful']);
    }
}
