<?php

namespace App\Services\Admin;

use Carbon\CarbonImmutable;

class AdminWorkflowsService
{
    public function getFullData(array $filters = []): array
    {
        return [
            'summary' => [
                'active_workflows' => 14,
                'pending_approvals' => 8,
                'workflow_compliance' => '99%',
            ],
            'timestamp' => CarbonImmutable::now()->toIso8601String(),
        ];
    }
}
