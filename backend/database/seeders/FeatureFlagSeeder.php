<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class FeatureFlagSeeder extends Seeder
{
    public function run(): void
    {
        $flags = [
            ['feature_key' => 'rfq.supplier_matching', 'name' => 'RFQ Supplier Matching', 'is_enabled' => true],
            ['feature_key' => 'catalog.advanced_attributes', 'name' => 'Advanced Product Attributes', 'is_enabled' => true],
            ['feature_key' => 'orders.trade_documents', 'name' => 'Order Trade Documents', 'is_enabled' => true],
            ['feature_key' => 'analytics.enterprise_dashboards', 'name' => 'Enterprise Dashboards', 'is_enabled' => true],
            ['feature_key' => 'messaging.moderation', 'name' => 'Messaging Moderation', 'is_enabled' => true],
        ];

        foreach ($flags as $flag) {
            $existing = DB::table('feature_flags')->where('feature_key', $flag['feature_key'])->first();
            $payload = [
                ...$flag,
                'description' => null,
                'status' => 'active',
                'updated_at' => now(),
            ];

            if ($existing) {
                DB::table('feature_flags')->where('id', $existing->id)->update($payload);

                continue;
            }

            DB::table('feature_flags')->insert([
                ...$payload,
                'uuid' => (string) Str::uuid(),
                'created_at' => now(),
            ]);
        }
    }
}
