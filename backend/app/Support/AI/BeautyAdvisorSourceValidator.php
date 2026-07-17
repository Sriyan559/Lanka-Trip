<?php

namespace App\Support\AI;

use Illuminate\Support\Str;

class BeautyAdvisorSourceValidator
{
    public function validate(array $results): array
    {
        $allowed = $this->domains(config('services.beauty_advisor.web.allowed_domains', ''));
        $blocked = $this->domains(config('services.beauty_advisor.web.blocked_domains', ''));
        $seen = [];
        $valid = [];

        foreach ($results as $result) {
            $url = filter_var($result['url'] ?? null, FILTER_VALIDATE_URL);
            $host = $url ? Str::lower((string) parse_url($url, PHP_URL_HOST)) : '';
            if (!$url || parse_url($url, PHP_URL_SCHEME) !== 'https' || !$host || $this->isPrivateHost($host)) continue;
            if ($this->matches($host, $blocked) || ($allowed && !$this->matches($host, $allowed))) continue;
            $canonical = preg_replace('/[?&](utm_[^=&]+|fbclid|gclid)=[^&]*/i', '', $url);
            if (isset($seen[$canonical])) continue;
            $seen[$canonical] = true;
            $valid[] = [
                'title' => mb_substr(strip_tags((string) ($result['title'] ?? $host)), 0, 200),
                'publisher' => mb_substr(strip_tags((string) ($result['publisher'] ?? $host)), 0, 120),
                'url' => $canonical,
                'publishedAt' => $result['publishedAt'] ?? null,
                'accessedAt' => now()->toIso8601String(),
                'type' => in_array($result['type'] ?? '', ['official', 'research', 'brand', 'editorial'], true) ? $result['type'] : 'editorial',
                'excerpt' => mb_substr(strip_tags((string) ($result['excerpt'] ?? $result['snippet'] ?? '')), 0, 1500),
            ];
        }

        return $valid;
    }

    private function domains(string|array $value): array { return array_values(array_filter(array_map('trim', is_array($value) ? $value : explode(',', $value)))); }
    private function matches(string $host, array $domains): bool { foreach ($domains as $domain) if ($host === $domain || Str::endsWith($host, '.'.$domain)) return true; return false; }
    private function isPrivateHost(string $host): bool { return $host === 'localhost' || Str::endsWith($host, '.local') || filter_var($host, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE) === false && filter_var($host, FILTER_VALIDATE_IP); }
}
