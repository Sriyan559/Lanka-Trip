<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AdminLiveReferenceSeeder extends Seeder
{
    public function run(): void
    {
        $policies = [
            'low' => [1440, 7200],
            'normal' => [480, 4320],
            'high' => [240, 1440],
            'urgent' => [60, 480],
            'critical' => [15, 240],
        ];

        foreach ($policies as $priority => [$firstResponse, $resolution]) {
            DB::table('support_sla_policies')->updateOrInsert(
                ['priority' => $priority],
                [
                    'first_response_minutes' => $firstResponse,
                    'resolution_minutes' => $resolution,
                    'is_active' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
            );
        }
    }
}
