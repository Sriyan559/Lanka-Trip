<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

class SlBeautyConfigurationSeeder extends Seeder
{
    public function run(): void
    {
        $this->seedSystemSettings();
        $this->seedPlatformConfigurations();
        $this->seedFeatureFlags();
    }

    private function seedSystemSettings(): void
    {
        if (! Schema::hasTable('system_settings')) {
            return;
        }

        $groupIds = Schema::hasTable('setting_groups')
            ? DB::table('setting_groups')->pluck('id', 'group_key')
            : collect();

        $settings = [
            [
                'group' => 'marketplace',
                'setting_key' => 'sl_beauty.display_name',
                'setting_type' => 'string',
                'value' => 'SL Beauty Platform',
                'is_public' => true,
            ],
            [
                'group' => 'marketplace',
                'setting_key' => 'sl_beauty.market',
                'setting_type' => 'string',
                'value' => 'Sri Lanka',
                'is_public' => true,
            ],
            [
                'group' => 'marketplace',
                'setting_key' => 'sl_beauty.positioning',
                'setting_type' => 'string',
                'value' => 'Hybrid B2B and B2C beauty marketplace for Sri Lanka.',
                'is_public' => true,
            ],
        ];

        foreach ($settings as $setting) {
            $this->stableUpsert(
                'system_settings',
                ['setting_key' => $setting['setting_key']],
                [
                    'setting_group_id' => $groupIds[$setting['group']] ?? null,
                    'setting_type' => $setting['setting_type'],
                    'config_value' => json_encode($setting['value']),
                    'constraints' => null,
                    'is_public' => $setting['is_public'],
                    'status' => 'active',
                ],
            );
        }
    }

    private function seedPlatformConfigurations(): void
    {
        if (! Schema::hasTable('platform_configurations')) {
            return;
        }

        $configs = [
            [
                'config_key' => 'sl_beauty.display',
                'config_type' => 'json',
                'value' => [
                    'display_name' => 'SL Beauty Platform',
                    'short_name' => 'SL Beauty',
                    'market' => 'Sri Lanka',
                    'positioning' => 'Hybrid B2B and B2C beauty marketplace for Sri Lanka.',
                ],
            ],
            [
                'config_key' => 'sl_beauty.feature_flag_keys',
                'config_type' => 'json',
                'value' => [
                    'beauty_taxonomy' => 'sl_beauty.taxonomy',
                    'b2c_retail_features' => 'sl_beauty.b2c_retail',
                    'brand_seller_verification' => 'sl_beauty.brand_seller_verification',
                    'compliance_workflows' => 'sl_beauty.compliance_workflows',
                ],
            ],
        ];

        foreach ($configs as $config) {
            $this->stableUpsert(
                'platform_configurations',
                ['config_key' => $config['config_key']],
                [
                    'config_type' => $config['config_type'],
                    'config_value' => json_encode($config['value']),
                    'environment' => 'global',
                    'status' => 'active',
                ],
            );
        }
    }

    private function seedFeatureFlags(): void
    {
        if (! Schema::hasTable('feature_flags')) {
            return;
        }

        $flags = [
            [
                'feature_key' => 'sl_beauty.taxonomy',
                'name' => 'SL Beauty Taxonomy',
                'description' => 'Enables SL Beauty category taxonomy and beauty-specific category attributes.',
                'is_enabled' => true,
            ],
            [
                'feature_key' => 'sl_beauty.b2c_retail',
                'name' => 'SL Beauty B2C Retail Features',
                'description' => 'Placeholder flag for future consumer retail experiences. No cart or payment behavior changes yet.',
                'is_enabled' => false,
            ],
            [
                'feature_key' => 'sl_beauty.brand_seller_verification',
                'name' => 'SL Beauty Brand and Seller Verification',
                'description' => 'Placeholder flag for future brand, seller, and distributor verification workflows.',
                'is_enabled' => false,
            ],
            [
                'feature_key' => 'sl_beauty.compliance_workflows',
                'name' => 'SL Beauty Compliance Workflows',
                'description' => 'Placeholder flag for future product claim review, counterfeit reports, and compliance queues.',
                'is_enabled' => false,
            ],
        ];

        foreach ($flags as $flag) {
            $this->stableUpsert(
                'feature_flags',
                ['feature_key' => $flag['feature_key']],
                [
                    'name' => $flag['name'],
                    'description' => $flag['description'],
                    'is_enabled' => $flag['is_enabled'],
                    'status' => 'active',
                ],
            );
        }
    }

    private function stableUpsert(string $table, array $keys, array $values): void
    {
        $existing = DB::table($table)->where($keys)->first();

        if ($existing) {
            DB::table($table)
                ->where('id', $existing->id)
                ->update([
                    ...$values,
                    'updated_at' => now(),
                ]);

            return;
        }

        DB::table($table)->insert([
            ...$keys,
            ...$values,
            'uuid' => (string) Str::uuid(),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
