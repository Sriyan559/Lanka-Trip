<?php

namespace App\Support;

use Illuminate\Support\Facades\Cache;

class CacheKeys
{
    public const TTL_SECONDS = 300;

    public const ANALYTICS = [
        'analytics.dashboard',
        'analytics.top-products',
        'analytics.top-suppliers',
        'analytics.top-categories',
        'analytics.rfqs',
        'analytics.quotations',
        'analytics.orders',
        'analytics.revenue',
    ];

    public static function versioned(string $group, string $key): string
    {
        return "{$group}.v".self::version($group).".{$key}";
    }

    public static function invalidate(array $groups): void
    {
        foreach (array_unique($groups) as $group) {
            Cache::add("cache-version.{$group}", 1);
            Cache::increment("cache-version.{$group}");
        }

        foreach (self::ANALYTICS as $key) {
            Cache::forget($key);
        }
    }

    private static function version(string $group): int
    {
        return (int) Cache::rememberForever("cache-version.{$group}", fn (): int => 1);
    }
}
