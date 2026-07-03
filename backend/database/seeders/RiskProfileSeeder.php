<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class RiskProfileSeeder extends Seeder
{
    public function run(): void
    {
        $profiles = [
            [
                'profile_key' => 'default-low-risk',
                'risk_level' => 'low',
                'risk_score' => 15.00,
                'risk_factors' => ['signals' => ['verified_email', 'known_market']],
            ],
            [
                'profile_key' => 'default-medium-risk',
                'risk_level' => 'medium',
                'risk_score' => 45.00,
                'risk_factors' => ['signals' => ['new_account', 'pending_documents']],
            ],
            [
                'profile_key' => 'default-high-risk',
                'risk_level' => 'high',
                'risk_score' => 75.00,
                'risk_factors' => ['signals' => ['failed_verification', 'manual_review_required']],
            ],
        ];

        foreach ($profiles as $profile) {
            $existing = DB::table('risk_profiles')->where('profile_key', $profile['profile_key'])->first();
            $payload = [
                'profile_key' => $profile['profile_key'],
                'subject_type' => null,
                'subject_id' => null,
                'risk_level' => $profile['risk_level'],
                'risk_score' => $profile['risk_score'],
                'risk_factors' => json_encode($profile['risk_factors']),
                'assessed_at' => now(),
                'status' => 'active',
                'metadata' => null,
                'updated_at' => now(),
            ];

            if ($existing) {
                DB::table('risk_profiles')->where('id', $existing->id)->update($payload);

                continue;
            }

            DB::table('risk_profiles')->insert([
                ...$payload,
                'uuid' => (string) Str::uuid(),
                'created_at' => now(),
            ]);
        }
    }
}
