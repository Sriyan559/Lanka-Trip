<?php

namespace App\Support\AI;

class BeautyAdvisorResponseValidator
{
    public function validate(array $response, string $language, string $intent, array $allowedProductIds, array $sources): array
    {
        $sourceUrls = array_column($sources, 'url');
        $responseSources = array_values(array_filter($response['sources'] ?? [], fn ($source) => in_array($source['url'] ?? null, $sourceUrls, true)));
        $ids = array_values(array_unique(array_map('strval', array_intersect(array_map('intval', $response['recommendedProductIds'] ?? []), array_map('intval', $allowedProductIds)))));
        $confidence = in_array($response['answerConfidence'] ?? '', ['high', 'medium', 'low'], true) ? $response['answerConfidence'] : 'medium';

        return array_merge($response, [
            'reply' => trim(mb_substr((string) ($response['reply'] ?? ''), 0, 8000)) ?: 'I could not create a reliable answer. Please try again.',
            'language' => $language,
            'intent' => $response['intent'] ?? $intent,
            'answerConfidence' => $confidence,
            'usedWebSearch' => count($responseSources) > 0,
            'followUpQuestion' => $response['followUpQuestion'] ?? null,
            'quickReplies' => array_slice(array_values(array_filter($response['quickReplies'] ?? [], 'is_string')), 0, 6),
            'recommendedProductIds' => $ids,
            'routine' => is_array($response['routine'] ?? null) ? array_slice($response['routine'], 0, 12) : [],
            'sources' => $responseSources,
            'requiresProfessionalAdvice' => (bool) ($response['requiresProfessionalAdvice'] ?? false),
            'safetyNote' => $response['safetyNote'] ?? null,
            'disclaimer' => $response['disclaimer'] ?? null,
        ]);
    }
}
