<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class TrustScoreRuleSeeder extends Seeder
{
    public function run(): void
    {
        $rules = [
            [
                'rule_key' => 'supplier.verified_business',
                'name' => 'Verified Business Profile',
                'subject_type' => 'supplier',
                'metric_key' => 'verification_status',
                'weight' => 2.0000,
                'rules' => ['verified' => 20, 'pending' => 5, 'rejected' => 0],
            ],
            [
                'rule_key' => 'supplier.review_quality',
                'name' => 'Supplier Review Quality',
                'subject_type' => 'supplier',
                'metric_key' => 'average_rating',
                'weight' => 1.5000,
                'rules' => ['min_reviews' => 3, 'max_score' => 25],
            ],
            [
                'rule_key' => 'supplier.response_performance',
                'name' => 'Supplier Response Performance',
                'subject_type' => 'supplier',
                'metric_key' => 'response_rate',
                'weight' => 1.0000,
                'rules' => ['target_response_rate' => 90, 'target_hours' => 24],
            ],
            [
                'rule_key' => 'buyer.transaction_reliability',
                'name' => 'Buyer Transaction Reliability',
                'subject_type' => 'buyer',
                'metric_key' => 'completed_orders',
                'weight' => 1.2500,
                'rules' => ['completed_order_weight' => 5, 'max_score' => 30],
            ],
        ];

        foreach ($rules as $rule) {
            $existing = DB::table('trust_score_rules')->where('rule_key', $rule['rule_key'])->first();
            $payload = [
                'rule_key' => $rule['rule_key'],
                'name' => $rule['name'],
                'subject_type' => $rule['subject_type'],
                'metric_key' => $rule['metric_key'],
                'weight' => $rule['weight'],
                'score_min' => 0,
                'score_max' => 100,
                'rules' => json_encode($rule['rules']),
                'status' => 'active',
                'metadata' => null,
                'updated_at' => now(),
            ];

            if ($existing) {
                DB::table('trust_score_rules')->where('id', $existing->id)->update($payload);

                continue;
            }

            DB::table('trust_score_rules')->insert([
                ...$payload,
                'uuid' => (string) Str::uuid(),
                'created_at' => now(),
            ]);
        }
    }
}
