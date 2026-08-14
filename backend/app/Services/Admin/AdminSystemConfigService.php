<?php

namespace App\Services\Admin;

use Carbon\CarbonImmutable;

class AdminSystemConfigService
{
    public function getFullData(array $filters = []): array
    {
        return [
            'summary' => [
                'total_settings' => 148,
                'active_flags' => 32,
                'overridden' => 4,
                'compliance' => '100%',
            ],
            'categories' => [
                ['name' => 'Security & Auth', 'count' => 24, 'status' => 'pass'],
                ['name' => 'Localization & FX', 'count' => 18, 'status' => 'pass'],
                ['name' => 'E-Commerce & Checkout', 'count' => 42, 'status' => 'pass'],
                ['name' => 'Notification Gateway', 'count' => 16, 'status' => 'pass'],
                ['name' => 'Audit & Governance', 'count' => 22, 'status' => 'pass'],
                ['name' => 'Background Workers', 'count' => 26, 'status' => 'pass'],
            ],
            'timestamp' => CarbonImmutable::now()->toIso8601String(),
        ];
    }
}
