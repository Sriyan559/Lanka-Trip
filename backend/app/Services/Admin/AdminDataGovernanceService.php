<?php

namespace App\Services\Admin;

use Carbon\CarbonImmutable;

class AdminDataGovernanceService
{
    public function getFullData(array $filters = []): array
    {
        return [
            'summary' => [
                'retention_policies' => 12,
                'privacy_requests' => 0,
                'compliance_score' => 100,
            ],
            'timestamp' => CarbonImmutable::now()->toIso8601String(),
        ];
    }
}
