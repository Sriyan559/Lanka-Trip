<?php

namespace App\Support\AI;

use App\Models\AiAdvisorConversation;
use App\Models\AiAdvisorMessage;
use App\Models\Product;
use Illuminate\Support\Facades\Log;

class BeautyAdvisorService
{
    /**
     * Get the active AI provider based on configuration.
     */
    public function getProvider(): BeautyAdvisorProvider
    {
        $enabled = config('services.beauty_advisor.enabled', true);
        $provider = config('services.beauty_advisor.provider', 'gemini');

        if (config('services.beauty_advisor.mock_mode', false)) {
            return new MockBeautyAdvisorProvider();
        }

        if (!$enabled) {
            throw new \RuntimeException('Beauty Advisor is disabled.');
        }

        if ($provider === 'gemini') {
            $apiKey = config('services.beauty_advisor.gemini.api_key', env('AI_BEAUTY_ADVISOR_API_KEY'));
            $model = config('services.beauty_advisor.gemini.model', env('AI_BEAUTY_ADVISOR_MODEL', 'gemini-1.5-flash'));
            $timeout = (int) config('services.beauty_advisor.gemini.timeout', env('AI_BEAUTY_ADVISOR_TIMEOUT_SECONDS', 30));
            if (empty($apiKey)) {
                throw new \RuntimeException('Beauty Advisor provider is not configured.');
            }
            return new GeminiBeautyAdvisorProvider($apiKey, $model, $timeout);
        }

        throw new \RuntimeException('Unsupported Beauty Advisor provider.');
    }

    /**
     * Search the database for products matching the user profile/preferences.
     */
    public function getGroundingProducts(array $profile = []): array
    {
        $skinType = $profile['skin_type'] ?? null;
        $skinConcern = $profile['skin_concern'] ?? null;
        $hairType = $profile['hair_type'] ?? null;
        $hairConcern = $profile['hair_concern'] ?? null;
        $category = $profile['category'] ?? null;

        $query = Product::query()
            ->active()
            ->whereHas('category', fn ($q) => $q->active())
            ->with(['category', 'images', 'supplier', 'beautyProfile']);

        // Filter based on skin/hair profile context if provided
        if ($skinType || $skinConcern || $hairType || $hairConcern) {
            $query->whereHas('beautyProfile', function ($q) use ($skinType, $skinConcern, $hairType, $hairConcern) {
                if ($skinType && strtolower($skinType) !== 'not sure') {
                    $q->where('skin_type', 'like', "%{$skinType}%");
                }
                if ($skinConcern) {
                    $q->where('skin_concern', 'like', "%{$skinConcern}%");
                }
                if ($hairType) {
                    $q->where('hair_type', 'like', "%{$hairType}%");
                }
                if ($hairConcern) {
                    $q->where('hair_concern', 'like', "%{$hairConcern}%");
                }
            });
        }

        if ($category) {
            $query->whereHas('category', fn ($q) => $q->where('slug', $category)->orWhere('name', 'like', "%{$category}%"));
        }

        // Limit results to keep context window compact and relevant
        $products = $query->limit(15)->get();

        // Fallback: If no products match, fetch active featured or default products
        if ($products->isEmpty()) {
            $products = Product::query()
                ->active()
                ->whereHas('category', fn ($q) => $q->active())
                ->with(['category', 'images', 'supplier', 'beautyProfile'])
                ->latest()
                ->limit(15)
                ->get();
        }

        return $products->toArray();
    }

    /**
     * Send a user message to the AI Advisor, grounding it on database products.
     */
    public function sendMessage(AiAdvisorConversation $conversation, string $userMessage): AiAdvisorMessage
    {
        // 1. Save user message
        $userMsg = AiAdvisorMessage::create([
            'conversation_id' => $conversation->id,
            'role' => 'user',
            'content' => $userMessage,
        ]);

        // 2. Load conversation history
        $history = $conversation->messages()
            ->orderBy('id', 'asc')
            ->limit(30)
            ->get(['role', 'content'])
            ->toArray();

        // 3. Fetch grounding products
        $profile = $conversation->profile_context ?: [];
        $groundingProducts = $this->getGroundingProducts($profile);

        // 4. Invoke provider
        $provider = $this->getProvider();
        $response = $provider->respond($history, $profile, $groundingProducts);

        // 5. Validate output product IDs against database
        $validatedProductIds = [];
        if (!empty($response['recommendedProductIds'])) {
            $groundedIds = array_map(fn ($product) => (int) $product['id'], $groundingProducts);
            $rawIds = array_intersect(array_map('intval', $response['recommendedProductIds']), $groundedIds);
            $validatedProductIds = Product::query()
                ->active()
                ->whereIn('id', $rawIds)
                ->pluck('id')
                ->map(fn($id) => (string) $id)
                ->toArray();
        }
        $response['recommendedProductIds'] = $validatedProductIds;

        // Strip invalid productIds from routine steps
        if (!empty($response['routine'])) {
            foreach ($response['routine'] as &$step) {
                if (isset($step['productId']) && !in_array((string)$step['productId'], $validatedProductIds, true)) {
                    $step['productId'] = null;
                }
            }
        }

        // 6. Save assistant message
        $assistantMsg = AiAdvisorMessage::create([
            'conversation_id' => $conversation->id,
            'role' => 'assistant',
            'content' => $response['reply'] ?? '',
            'structured_data' => $response,
            'provider' => config('services.beauty_advisor.provider', 'gemini'),
            'model' => env('AI_BEAUTY_ADVISOR_MODEL', 'gemini-1.5-flash'),
        ]);

        return $assistantMsg;
    }
}
