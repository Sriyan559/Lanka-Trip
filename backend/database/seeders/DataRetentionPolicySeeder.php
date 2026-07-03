<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class DataRetentionPolicySeeder extends Seeder
{
    public function run(): void
    {
        $policies = [
            [
                'policy_key' => 'audit_logs.standard',
                'name' => 'Audit Log Retention',
                'data_category' => 'audit_logs',
                'retention_days' => 2555,
                'rules' => ['archive_after_days' => 365],
            ],
            [
                'policy_key' => 'security_events.standard',
                'name' => 'Security Event Retention',
                'data_category' => 'security_events',
                'retention_days' => 2555,
                'rules' => ['review_required' => true],
            ],
            [
                'policy_key' => 'verification_documents.standard',
                'name' => 'Verification Document Retention',
                'data_category' => 'verification_documents',
                'retention_days' => 1825,
                'rules' => ['delete_after_account_closure_days' => 365],
            ],
        ];

        foreach ($policies as $policy) {
            $existing = DB::table('data_retention_policies')->where('policy_key', $policy['policy_key'])->first();
            $payload = [
                'policy_key' => $policy['policy_key'],
                'name' => $policy['name'],
                'data_category' => $policy['data_category'],
                'retention_days' => $policy['retention_days'],
                'rules' => json_encode($policy['rules']),
                'status' => 'active',
                'metadata' => null,
                'updated_at' => now(),
            ];

            if ($existing) {
                DB::table('data_retention_policies')->where('id', $existing->id)->update($payload);

                continue;
            }

            DB::table('data_retention_policies')->insert([
                ...$payload,
                'uuid' => (string) Str::uuid(),
                'created_at' => now(),
            ]);
        }
    }
}
