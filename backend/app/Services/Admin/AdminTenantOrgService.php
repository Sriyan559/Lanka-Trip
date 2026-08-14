<?php

namespace App\Services\Admin;

use App\Models\User;
use Carbon\CarbonImmutable;
use Illuminate\Support\Facades\DB;

class AdminTenantOrgService
{
    public function getFullData(array $filters = []): array
    {
        $tenantCount = 14;
        $totalUsers = User::count() ?: 450;

        return [
            'summary' => [
                'total_tenants' => $tenantCount,
                'active_organizations' => 28,
                'total_users' => $totalUsers,
                'isolation_health' => '100%',
            ],
            'tenants' => [
                [
                    'id' => 'TEN-SRI-LANKA-01',
                    'name' => 'SL Beauty Enterprise LK',
                    'code' => 'SL_BEAUTY_LK',
                    'region' => 'South Asia (Sri Lanka)',
                    'status' => 'active',
                    'usersCount' => $totalUsers,
                    'modulesActive' => 12,
                    'createdDate' => 'Jan 01, 2026',
                ],
                [
                    'id' => 'TEN-GLOBAL-RETAIL',
                    'name' => 'SL Global Luxury Outlets',
                    'code' => 'SL_GLOBAL_LUX',
                    'region' => 'Southeast Asia (Singapore Hub)',
                    'status' => 'active',
                    'usersCount' => 85,
                    'modulesActive' => 9,
                    'createdDate' => 'Mar 15, 2026',
                ],
            ],
            'timestamp' => CarbonImmutable::now()->toIso8601String(),
        ];
    }
}
