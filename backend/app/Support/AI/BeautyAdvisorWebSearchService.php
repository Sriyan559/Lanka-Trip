<?php

namespace App\Support\AI;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class BeautyAdvisorWebSearchService
{
    public function __construct(private BeautyAdvisorSourceValidator $validator) {}

    public function search(string $query, string $language): array
    {
        if (!config('services.beauty_advisor.web.enabled')) return ['sources' => [], 'unavailable' => true];
        $endpoint = config('services.beauty_advisor.web.endpoint');
        $key = config('services.beauty_advisor.web.api_key');
        if (!$endpoint || !$key) return ['sources' => [], 'unavailable' => true];

        $cacheKey = 'beauty-web:'.hash('sha256', mb_strtolower(trim($query)).'|'.$language.'|'.config('services.beauty_advisor.web.provider'));
        try {
            $sources = Cache::remember($cacheKey, now()->addMinutes((int) config('services.beauty_advisor.web.cache_minutes', 60)), function () use ($endpoint, $key, $query, $language) {
                $response = Http::timeout((int) config('services.beauty_advisor.web.timeout', 15))
                    ->acceptJson()->withToken($key)->post($endpoint, [
                        'query' => $query, 'language' => $language,
                        'max_results' => (int) config('services.beauty_advisor.web.max_results', 6),
                    ])->throw();
                return $this->validator->validate($response->json('results', []));
            });
            return ['sources' => $sources, 'unavailable' => false];
        } catch (\Throwable $e) {
            Log::warning('Beauty web search unavailable', ['exception' => $e::class]);
            return ['sources' => [], 'unavailable' => true];
        }
    }
}
