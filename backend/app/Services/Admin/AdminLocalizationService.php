<?php

namespace App\Services\Admin;

use Carbon\CarbonImmutable;

class AdminLocalizationService
{
    public function getFullData(array $filters = []): array
    {
        return [
            'summary' => [
                'active_locales' => 6,
                'default_locale' => 'en-LK',
                'base_currency' => 'LKR',
                'active_currencies' => 4,
                'dictionary_coverage' => '99.2%',
            ],
            'currencies' => [
                ['code' => 'LKR', 'name' => 'Sri Lankan Rupee', 'symbol' => 'Rs.', 'rate' => 1.0000, 'isBase' => true, 'status' => 'active'],
                ['code' => 'USD', 'name' => 'United States Dollar', 'symbol' => '$', 'rate' => 0.0033, 'isBase' => false, 'status' => 'active'],
                ['code' => 'EUR', 'name' => 'Euro', 'symbol' => '€', 'rate' => 0.0030, 'isBase' => false, 'status' => 'active'],
                ['code' => 'SGD', 'name' => 'Singapore Dollar', 'symbol' => 'S$', 'rate' => 0.0044, 'isBase' => false, 'status' => 'active'],
            ],
            'timestamp' => CarbonImmutable::now()->toIso8601String(),
        ];
    }
}
