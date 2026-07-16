<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AiAdvisorConversation;
use App\Models\AiAdvisorSavedPlan;
use App\Support\AI\BeautyAdvisorService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class BeautyAdvisorController extends Controller
{
    protected BeautyAdvisorService $service;

    public function __construct(BeautyAdvisorService $service)
    {
        $this->service = $service;
    }

    /**
     * Helper to validate conversation ownership.
     */
    protected function checkOwnership(AiAdvisorConversation $conversation, Request $request): bool
    {
        $user = $request->user('sanctum');

        if ($user) {
            return (int) $conversation->user_id === (int) $user->id;
        }

        $guestSessionId = $request->header('X-Guest-Session-Id') ?: $request->input('guest_session_id');
        if (empty($guestSessionId)) {
            return false;
        }

        return $conversation->guest_session_id === $guestSessionId;
    }

    /**
     * Start or fetch a conversation.
     */
    public function startConversation(Request $request): JsonResponse
    {
        $user = $request->user('sanctum');
        $guestSessionId = $request->header('X-Guest-Session-Id') ?: $request->input('guest_session_id');

        if ($user) {
            // Find existing active conversation for user or create one
            $conversation = AiAdvisorConversation::where('user_id', $user->id)
                ->where('status', 'active')
                ->latest()
                ->first();

            if (!$conversation) {
                $conversation = AiAdvisorConversation::create([
                    'user_id' => $user->id,
                    'status' => 'active',
                ]);
            }
        } else {
            if (empty($guestSessionId)) {
                return $this->errorResponse('Guest session identifier is required.', Response::HTTP_BAD_REQUEST);
            }

            $conversation = AiAdvisorConversation::where('guest_session_id', $guestSessionId)
                ->where('status', 'active')
                ->latest()
                ->first();

            if (!$conversation) {
                $conversation = AiAdvisorConversation::create([
                    'guest_session_id' => $guestSessionId,
                    'status' => 'active',
                ]);
            }
        }

        return $this->successResponse([
            'conversation' => $conversation,
        ]);
    }

    /**
     * Get conversation and its messages.
     */
    public function showConversation(Request $request, int $id): JsonResponse
    {
        $conversation = AiAdvisorConversation::findOrFail($id);

        if (!$this->checkOwnership($conversation, $request)) {
            return $this->errorResponse('Access denied to conversation.', Response::HTTP_FORBIDDEN);
        }

        $messages = $conversation->messages()->orderBy('id', 'asc')->get();

        return $this->successResponse([
            'conversation' => $conversation,
            'messages' => $messages,
        ]);
    }

    /**
     * Archive the current conversation and create a fresh active conversation.
     */
    public function newConversation(Request $request, int $id): JsonResponse
    {
        $conversation = AiAdvisorConversation::findOrFail($id);

        if (!$this->checkOwnership($conversation, $request)) {
            return $this->errorResponse('Access denied to conversation.', Response::HTTP_FORBIDDEN);
        }

        $newConversation = DB::transaction(function () use ($conversation) {
            $conversation->update(['status' => 'archived']);

            return AiAdvisorConversation::create([
                'user_id' => $conversation->user_id,
                'guest_session_id' => $conversation->guest_session_id,
                'status' => 'active',
            ]);
        });

        return $this->successResponse([
            'conversation' => $newConversation,
        ], 'New conversation started successfully.', Response::HTTP_CREATED);
    }

    /**
     * Remove messages and temporary context from the current conversation.
     */
    public function clearConversation(Request $request, int $id): JsonResponse
    {
        $conversation = AiAdvisorConversation::findOrFail($id);

        if (!$this->checkOwnership($conversation, $request)) {
            return $this->errorResponse('Access denied to conversation.', Response::HTTP_FORBIDDEN);
        }

        DB::transaction(function () use ($conversation) {
            $conversation->messages()->delete();
            $conversation->update(['profile_context' => null]);
        });

        return $this->successResponse([], 'Chat cleared successfully.');
    }

    /**
     * Send a message in a conversation.
     */
    public function sendMessage(Request $request, int $id): JsonResponse
    {
        $request->validate([
            'message' => 'required|string|max:1000',
        ]);

        $conversation = AiAdvisorConversation::findOrFail($id);

        if (!$this->checkOwnership($conversation, $request)) {
            return $this->errorResponse('Access denied to conversation.', Response::HTTP_FORBIDDEN);
        }

        // Send message and get AI response
        $assistantMsg = $this->service->sendMessage($conversation, $request->input('message'));

        return $this->successResponse([
            'message' => $assistantMsg,
        ]);
    }

    /**
     * Update user profile context inside conversation.
     */
    public function updateProfile(Request $request, int $id): JsonResponse
    {
        $request->validate([
            'profile_context' => 'required|array',
        ]);

        $conversation = AiAdvisorConversation::findOrFail($id);

        if (!$this->checkOwnership($conversation, $request)) {
            return $this->errorResponse('Access denied to conversation.', Response::HTTP_FORBIDDEN);
        }

        $currentContext = $conversation->profile_context ?: [];
        $newContext = array_merge($currentContext, $request->input('profile_context'));

        $conversation->update([
            'profile_context' => $newContext,
        ]);

        return $this->successResponse([
            'conversation' => $conversation,
        ]);
    }

    /**
     * Save a routine beauty plan.
     */
    public function savePlan(Request $request): JsonResponse
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'profile_context' => 'required|array',
            'routine_data' => 'required|array',
            'conversation_id' => 'nullable|integer|exists:ai_advisor_conversations,id',
        ]);

        $user = $request->user('sanctum');
        if (!$user) {
            return $this->errorResponse('Authentication required to save routine plans.', Response::HTTP_UNAUTHORIZED);
        }

        $plan = AiAdvisorSavedPlan::create([
            'user_id' => $user->id,
            'conversation_id' => $request->input('conversation_id'),
            'title' => $request->input('title'),
            'profile_context' => $request->input('profile_context'),
            'routine_data' => $request->input('routine_data'),
        ]);

        return $this->successResponse([
            'plan' => $plan,
        ], 'Beauty plan saved successfully.', Response::HTTP_CREATED);
    }

    /**
     * Get saved beauty plans.
     */
    public function getPlans(Request $request): JsonResponse
    {
        $user = $request->user('sanctum');
        if (!$user) {
            return $this->errorResponse('Authentication required to retrieve routine plans.', Response::HTTP_UNAUTHORIZED);
        }

        $plans = AiAdvisorSavedPlan::where('user_id', $user->id)->latest()->get();

        return $this->successResponse([
            'plans' => $plans,
        ]);
    }
}
