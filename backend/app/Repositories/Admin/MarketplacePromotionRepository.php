<?php

namespace App\Repositories\Admin;

use Illuminate\Support\Facades\Schema;

class MarketplacePromotionRepository
{
    private const REQUIRED_TABLES = [
        'promotions', 'promotion_rules', 'promotion_eligibilities', 'promotion_redemptions',
        'promotion_approvals', 'promotion_budgets', 'promotion_funding_allocations',
    ];

    public function capabilities(): array
    {
        $tables = collect(self::REQUIRED_TABLES)->mapWithKeys(fn (string $table): array => [$table => Schema::hasTable($table)]);

        return [
            'available' => $tables->every(fn (bool $available): bool => $available),
            'tables' => $tables->all(),
            'missingTables' => $tables->filter(fn (bool $available): bool => ! $available)->keys()->all(),
        ];
    }
}
