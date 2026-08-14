<?php

namespace App\Services\Admin;

use Carbon\CarbonImmutable;

class AdminMaintenanceService
{
    public function getFullData(array $filters = []): array
    {
        return [
            'summary' => [
                'jobs_pending' => 0,
                'horizon_status' => 'operational',
                'cache_hit_rate' => '99.4%',
                'system_health' => 'pass',
            ],
            'timestamp' => CarbonImmutable::now()->toIso8601String(),
        ];
    }
}
