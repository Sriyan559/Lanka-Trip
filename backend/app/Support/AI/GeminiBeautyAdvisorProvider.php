<?php

namespace App\Support\AI;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GeminiBeautyAdvisorProvider implements BeautyAdvisorProvider
{
    protected string $apiKey;
    protected string $model;
    protected int $timeout;

    public function __construct(string $apiKey, string $model = 'gemini-1.5-flash', int $timeout = 30)
    {
        $this->apiKey = $apiKey;
        $this->model = $model ?: 'gemini-1.5-flash';
        $this->timeout = $timeout ?: 30;
    }

    public function respond(array $history, array $profile, array $groundingProducts): array
    {
        if (empty($this->apiKey)) {
            Log::warning('Gemini API key is missing. Falling back to Mock mode.');
            return (new MockBeautyAdvisorProvider())->respond($history, $profile, $groundingProducts);
        }

        $systemPrompt = $this->buildSystemPrompt($profile, $groundingProducts);
        $contents = $this->formatContents($history, $systemPrompt);

        try {
            $response = Http::timeout($this->timeout)
                ->withHeaders(['Content-Type' => 'application/json'])
                ->post("https://generativelanguage.googleapis.com/v1beta/models/{$this->model}:generateContent?key={$this->apiKey}", [
                    'contents' => $contents,
                    'generationConfig' => [
                        'responseMimeType' => 'application/json',
                        'responseSchema' => [
                            'type' => 'OBJECT',
                            'properties' => [
                                'reply' => ['type' => 'STRING'],
                                'followUpQuestion' => ['type' => 'STRING'],
                                'quickReplies' => [
                                    'type' => 'ARRAY',
                                    'items' => ['type' => 'STRING']
                                ],
                                'recommendedProductIds' => [
                                    'type' => 'ARRAY',
                                    'items' => ['type' => 'STRING']
                                ],
                                'routine' => [
                                    'type' => 'ARRAY',
                                    'items' => [
                                        'type' => 'OBJECT',
                                        'properties' => [
                                            'step' => ['type' => 'INTEGER'],
                                            'title' => ['type' => 'STRING'],
                                            'instruction' => ['type' => 'STRING'],
                                            'productId' => ['type' => 'STRING']
                                        ],
                                        'required' => ['step', 'title', 'instruction']
                                    ]
                                ],
                                'disclaimer' => ['type' => 'STRING']
                            ],
                            'required' => ['reply', 'quickReplies', 'recommendedProductIds']
                        ]
                    ]
                ]);

            if ($response->failed()) {
                Log::error('Gemini API request failed', [
                    'status' => $response->status(),
                    'body' => $response->body()
                ]);
                throw new \Exception('Gemini API call failed with status: ' . $response->status());
            }

            $result = $response->json();
            $text = $result['candidates'][0]['content']['parts'][0]['text'] ?? null;

            if (empty($text)) {
                throw new \Exception('Gemini API returned empty candidate text.');
            }

            $parsed = json_decode($text, true);
            if (json_last_error() !== JSON_ERROR_NONE) {
                Log::error('Failed to parse Gemini JSON output', ['text' => $text]);
                throw new \Exception('Invalid JSON from Gemini: ' . json_last_error_msg());
            }

            return $parsed;

        } catch (\Exception $e) {
            Log::error('GeminiBeautyAdvisorProvider Exception: ' . $e->getMessage());
            // Fall back to Mock mode so we don't crash
            return (new MockBeautyAdvisorProvider())->respond($history, $profile, $groundingProducts);
        }
    }

    protected function buildSystemPrompt(array $profile, array $groundingProducts): string
    {
        $productsContext = '';
        foreach ($groundingProducts as $prod) {
            $desc = $prod['short_description'] ?: ($prod['description'] ?? '');
            $desc = mb_strimwidth(strip_tags($desc), 0, 100, '...');
            $productsContext .= sprintf(
                "ID: %s | Name: %s | Brand: %s | Category: %s | Price: LKR %s | Description: %s\n",
                $prod['id'],
                $prod['name'],
                $prod['supplier'] ?? 'SL Beauty',
                $prod['category']['name'] ?? 'General',
                $prod['price'],
                $desc
            );
        }

        $profileContext = json_encode($profile, JSON_PRETTY_PRINT);

        return "You are the SL Beauty AI Advisor, a product-discovery and beauty-routine assistant for the SL Beauty Platform.

YOUR RESPONSIBILITIES:
- Help users discover suitable products available on SL Beauty Platform.
- Recommend ONLY from the supplied GROUNDING PRODUCTS list. Never invent or recommend products not on the list.
- If no matching grounding product is relevant, say so clearly and leave the 'recommendedProductIds' list empty.
- Keep answers clear, friendly, and concise. Explain briefly why a recommended product is suitable.
- Suggest daily skincare, makeup, or fragrance routines using step-by-step guidance.
- Keep responses friendly, helpful, and concise.

SAFETY RULES & HEALTH GUARDRAILS:
- You are a beauty-commerce advisor, NOT a doctor or medical professional.
- Do not diagnose medical skin conditions (e.g. acne vulgaris, eczema, psoriasis, infections, severe rashes).
- Do not prescribe medicines or guarantee specific skin results.
- For severe, painful, or worsening symptoms, direct the user to consult a healthcare professional.
- Explicitly suggest patch testing when introducing new topical products.
- Return a helpful disclaimer in the 'disclaimer' JSON field.

GROUNDING PRODUCTS AVAILABLE FOR RECOMMENDATION:
{$productsContext}

USER'S CURRENT BEAUTY PROFILE CONTEXT:
{$profileContext}

You must return a structured JSON response matching the schema.";
    }

    protected function formatContents(array $history, string $systemPrompt): array
    {
        $contents = [];

        // Prepend the system instructions as a system content/user block or role: model/user
        // Note: For Gemini API, systemInstruction is usually passed at the root. But we can pass it as a user-turn setup as well, or as a system turn.
        // Let's pass the system prompt as the first message or as a role="system" if the model config allows, or inline it in the history as system context.
        // Inline system context + history is universally safe across Gemini models.
        $contents[] = [
            'role' => 'user',
            'parts' => [
                ['text' => $systemPrompt . "\n\nHello, let's start the conversation."]
            ]
        ];
        $contents[] = [
            'role' => 'model',
            'parts' => [
                ['text' => json_encode([
                    'reply' => "Welcome to SL Beauty Advisor! How can I assist you with your beauty routine today?",
                    'quickReplies' => ["Build my skincare routine", "Recommend makeup for me"],
                    'recommendedProductIds' => [],
                    'routine' => []
                ])]
            ]
        ];

        // Append conversation history
        foreach ($history as $msg) {
            $role = ($msg['role'] === 'assistant' || $msg['role'] === 'model') ? 'model' : 'user';
            $contents[] = [
                'role' => $role,
                'parts' => [
                    ['text' => $msg['content']]
                ]
            ];
        }

        return $contents;
    }
}
