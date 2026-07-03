<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ComplianceRuleSeeder extends Seeder
{
    public function run(): void
    {
        $rules = [
            [
                'rule_key' => 'supplier.business_registration_required',
                'name' => 'Supplier Business Registration Required',
                'rule_type' => 'supplier_verification',
                'severity' => 'high',
                'rules' => ['required_documents' => ['business_registration']],
            ],
            [
                'rule_key' => 'supplier.export_certificate_review',
                'name' => 'Supplier Export Certificate Review',
                'rule_type' => 'export_compliance',
                'severity' => 'medium',
                'rules' => ['requires_manual_review' => true],
            ],
            [
                'rule_key' => 'buyer.kyc_identity_check',
                'name' => 'Buyer KYC Identity Check',
                'rule_type' => 'kyc',
                'severity' => 'medium',
                'rules' => ['required_documents' => ['identity_document']],
            ],
        ];

        foreach ($rules as $rule) {
            $existing = DB::table('compliance_rules')->where('rule_key', $rule['rule_key'])->first();
            $payload = [
                'rule_key' => $rule['rule_key'],
                'name' => $rule['name'],
                'rule_type' => $rule['rule_type'],
                'rules' => json_encode($rule['rules']),
                'severity' => $rule['severity'],
                'status' => 'active',
                'metadata' => null,
                'updated_at' => now(),
            ];

            if ($existing) {
                DB::table('compliance_rules')->where('id', $existing->id)->update($payload);

                continue;
            }

            DB::table('compliance_rules')->insert([
                ...$payload,
                'uuid' => (string) Str::uuid(),
                'created_at' => now(),
            ]);
        }
    }
}
