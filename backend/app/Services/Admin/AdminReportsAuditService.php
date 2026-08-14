<?php

namespace App\Services\Admin;

use Carbon\CarbonImmutable;

class AdminReportsAuditService
{
    public function getFullData(array $filters = []): array
    {
        return [
            'summary' => [
                'audit_logs_total' => 1420,
                'reports_generated' => 84,
                'compliance_status' => 'pass',
            ],
            'timestamp' => CarbonImmutable::now()->toIso8601String(),
        ];
    }
}
