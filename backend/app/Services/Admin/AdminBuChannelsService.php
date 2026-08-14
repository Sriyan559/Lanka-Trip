<?php

namespace App\Services\Admin;

use Carbon\CarbonImmutable;

class AdminBuChannelsService
{
    public function getFullData(array $filters = []): array
    {
        return [
            'summary' => [
                'business_units' => 6,
                'operating_channels' => 14,
                'active_scopes' => 22,
                'coverage' => '99.8%',
            ],
            'businessUnits' => [
                [
                    'id' => 'BU-LK-RETAIL',
                    'name' => 'Sri Lanka Retail & Flagship Stores',
                    'code' => 'BU_LK_RETAIL',
                    'head' => 'Dilshan Nanayakkara',
                    'channelsCount' => 4,
                    'status' => 'active',
                ],
                [
                    'id' => 'BU-ECOM-GLOBAL',
                    'name' => 'Cross-Border B2C E-Commerce',
                    'code' => 'BU_ECOM_GLOBAL',
                    'head' => 'Kavindi Perera',
                    'channelsCount' => 6,
                    'status' => 'active',
                ],
            ],
            'timestamp' => CarbonImmutable::now()->toIso8601String(),
        ];
    }
}
