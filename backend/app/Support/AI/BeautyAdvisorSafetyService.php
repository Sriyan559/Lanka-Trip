<?php

namespace App\Support\AI;

use Illuminate\Support\Str;

class BeautyAdvisorSafetyService
{
    public function intercept(string $message, string $language): ?array
    {
        $text = Str::lower($message);
        if (Str::contains($text, ['ignore previous', 'system prompt', 'api key', 'access token', 'reveal secret'])) {
            return $this->response('I cannot reveal private instructions or secrets. I can help with beauty, personal care, and SL Beauty shopping questions.', $language, 'unsupported_request');
        }

        if (Str::contains($text, ['diagnose', 'prescribe', 'infected', 'bleeding', 'severe pain', 'rapidly worsening', 'pregnant', 'pregnancy', 'breastfeeding', 'medication interaction'])) {
            return $this->response('I cannot diagnose or confirm medical, pregnancy, or medication safety. For severe, painful, infected, persistent, or rapidly worsening symptoms, please contact a qualified healthcare professional. For a new cosmetic, follow its label and patch-test when appropriate.', $language, 'safety_sensitive', true);
        }

        if (Str::contains($text, ['mine cryptocurrency', 'write malware', 'political campaign', 'sports betting'])) {
            return $this->response('I specialize in beauty, personal care, SL Beauty products, and related shopping support. Ask me about skincare, haircare, makeup, fragrance, ingredients, or a beauty routine.', $language, 'out_of_scope');
        }

        return null;
    }

    private function response(string $reply, string $language, string $intent, bool $professional = false): array
    {
        return [
            'reply' => $reply, 'language' => $language, 'intent' => $intent,
            'answerConfidence' => 'high', 'usedWebSearch' => false, 'followUpQuestion' => null,
            'quickReplies' => [], 'recommendedProductIds' => [], 'routine' => [], 'sources' => [],
            'requiresProfessionalAdvice' => $professional,
            'safetyNote' => $professional ? 'This is general cosmetic information, not medical advice.' : null,
            'disclaimer' => $professional ? 'This is general cosmetic information, not medical advice.' : null,
        ];
    }
}
