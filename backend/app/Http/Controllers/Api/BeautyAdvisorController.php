<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AiAdvisorConversation;
use App\Models\AiAdvisorSavedPlan;
use App\Models\AiAdvisorMessage;
use App\Models\AiAdvisorFeedback;
use App\Support\AI\BeautyAdvisorService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;
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

        try {
            $assistantMsg = $this->service->sendMessage($conversation, $request->input('message'));
        } catch (\RuntimeException $exception) {
            Log::warning('Beauty Advisor request unavailable', ['conversation_id' => $conversation->id, 'exception' => $exception::class]);
            return $this->errorResponse('The Beauty Advisor is temporarily unavailable. Your consultation has been preserved; please retry.', Response::HTTP_SERVICE_UNAVAILABLE);
        }

        return $this->successResponse([
            'message' => $assistantMsg,
        ]);
    }

    public function feedback(Request $request, int $id): JsonResponse
    {
        $data = $request->validate([
            'feedback_type' => ['required', Rule::in(['helpful', 'not_helpful', 'incorrect_product', 'outdated_information', 'translation_problem', 'source_problem', 'unsafe', 'other'])],
            'comment' => 'nullable|string|max:1000',
        ]);
        $message = AiAdvisorMessage::with('conversation')->findOrFail($id);
        if ($message->role !== 'assistant' || !$this->checkOwnership($message->conversation, $request)) {
            return $this->errorResponse('Access denied to message.', Response::HTTP_FORBIDDEN);
        }
        $structured = $message->structured_data ?: [];
        $actor = $request->user('sanctum');
        $guest = $actor ? null : ($request->header('X-Guest-Session-Id') ?: $request->input('guest_session_id'));
        $feedback = AiAdvisorFeedback::updateOrCreate([
            'message_id' => $message->id, 'user_id' => $actor?->id, 'guest_session_id' => $guest,
        ], [
            'conversation_id' => $message->conversation_id, 'feedback_type' => $data['feedback_type'],
            'language' => $structured['language'] ?? 'en', 'intent' => $structured['intent'] ?? null,
            'source_urls' => array_values(array_filter(array_column($structured['sources'] ?? [], 'url'))),
            'prompt_version' => (string) config('services.beauty_advisor.prompt_version'),
            'model_version' => $message->model, 'comment' => $data['comment'] ?? null,
        ]);
        return $this->successResponse(['feedback' => $feedback], 'Thank you for your feedback.');
    }

    /**
     * Update user profile context inside conversation.
     */
    public function updateProfile(Request $request, int $id): JsonResponse
    {
        $request->validate([
            'profile_context' => 'required|array',
            'profile_context.language' => ['sometimes', Rule::in(\App\Support\AI\BeautyAdvisorLanguageService::SUPPORTED)],
            'profile_context.goal' => ['sometimes', Rule::in(['skincare', 'haircare', 'makeup', 'fragrance', 'ingredients', 'gift', 'routine', 'offers'])],
            'profile_context.consultationStep' => 'sometimes|integer|min:0|max:20',
            'profile_context.concerns' => 'sometimes|array|max:12',
            'profile_context.concerns.*' => 'string|max:80',
            'profile_context.productPreferences' => 'sometimes|array|max:12',
            'profile_context.productPreferences.*' => 'string|max:80',
            'profile_context.consentToSaveSensitiveAnswers' => 'sometimes|boolean',
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
            'language' => ['sometimes', Rule::in(\App\Support\AI\BeautyAdvisorLanguageService::SUPPORTED)],
            'recommended_product_ids' => 'sometimes|array|max:30',
            'recommended_product_ids.*' => 'integer|exists:products,id',
            'estimated_total' => 'sometimes|numeric|min:0',
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
            'language' => $request->input('language', 'en'),
            'profile_context' => $request->input('profile_context'),
            'routine_data' => $request->input('routine_data'),
            'recommended_product_ids' => $request->input('recommended_product_ids', []),
            'estimated_total' => $request->input('estimated_total', 0),
            'generated_at' => now(),
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

        $page = AiAdvisorSavedPlan::where('user_id', $user->id)->where('status', 'active')->latest()->paginate(12);

        return $this->successResponse([
            'plans' => $page->items(),
            'pagination' => [
                'current_page' => $page->currentPage(),
                'last_page' => $page->lastPage(),
                'per_page' => $page->perPage(),
                'total' => $page->total(),
            ],
        ]);
    }

    public function showPlan(Request $request, int $id): JsonResponse
    {
        $plan = AiAdvisorSavedPlan::where('user_id', $request->user()->id)->findOrFail($id);
        return $this->successResponse(['plan' => $plan]);
    }

    public function updatePlan(Request $request, int $id): JsonResponse
    {
        $plan = AiAdvisorSavedPlan::where('user_id', $request->user()->id)->findOrFail($id);
        $data = $request->validate(['title' => 'sometimes|string|max:255', 'status' => ['sometimes', Rule::in(['active', 'archived'])], 'routine_data' => 'sometimes|array', 'profile_context' => 'sometimes|array']);
        if (isset($data['routine_data']) || isset($data['profile_context'])) $data['version'] = $plan->version + 1;
        $plan->update($data);
        return $this->successResponse(['plan' => $plan->fresh()], 'Beauty plan updated successfully.');
    }

    public function deletePlan(Request $request, int $id): JsonResponse
    {
        $plan = AiAdvisorSavedPlan::where('user_id', $request->user()->id)->findOrFail($id);
        $plan->update(['status' => 'archived']);
        return $this->successResponse([], 'Beauty plan archived successfully.');
    }

    public function downloadPlan(Request $request, int $id)
    {
        $plan = AiAdvisorSavedPlan::where('user_id', $request->user()->id)->findOrFail($id);
        $safeTitle = e($plan->title);
        $profile = e(json_encode($plan->profile_context, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
        $routine = e(json_encode($plan->routine_data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
        $html = "<!doctype html><html lang=\"{$plan->language}\"><meta charset=\"utf-8\"><title>{$safeTitle}</title><style>body{font-family:Arial,'Noto Sans Sinhala','Noto Sans Tamil',sans-serif;max-width:800px;margin:40px auto;line-height:1.55;color:#241b20}h1{color:#9d174d}pre{white-space:pre-wrap;background:#faf7f8;padding:16px;border-radius:12px}@media print{button{display:none}}</style><body><h1>SL Beauty Platform</h1><h2>{$safeTitle}</h2><p>Generated {$plan->generated_at?->format('Y-m-d')}; language: {$plan->language}</p><h3>Profile summary</h3><pre>{$profile}</pre><h3>Beauty plan</h3><pre>{$routine}</pre><p>Patch-test new topical products and follow product instructions. Prices and availability may change.</p><button onclick=\"window.print()\">Print / Save as PDF</button></body></html>";
        return response($html)->header('Content-Type', 'text/html; charset=UTF-8')->header('Content-Disposition', 'attachment; filename="sl-beauty-plan-'.now()->format('Y-m-d').'.html"');
    }
}
