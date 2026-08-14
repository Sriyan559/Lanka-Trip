<?php

namespace App\Services\Admin;

use Carbon\CarbonImmutable;

class AdminCommunicationsService
{
    public function getFullData(array $filters = []): array
    {
        return [
            'summary' => [
                'total_templates' => 48,
                'email_gateway' => 'operational',
                'sms_gateway' => 'operational',
                'push_gateway' => 'operational',
                'delivery_rate' => '99.6%',
            ],
            'timestamp' => CarbonImmutable::now()->toIso8601String(),
        ];
    }
}
