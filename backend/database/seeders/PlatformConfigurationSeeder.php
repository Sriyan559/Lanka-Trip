<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PlatformConfigurationSeeder extends Seeder
{
    public function run(): void
    {
        $configs = [
            ['config_key' => 'search.default_sort', 'config_type' => 'string', 'value' => 'relevance'],
            ['config_key' => 'catalog.default_page_size', 'config_type' => 'integer', 'value' => 24],
            ['config_key' => 'rfq.expiry_days', 'config_type' => 'integer', 'value' => 30],
            ['config_key' => 'orders.auto_invoice', 'config_type' => 'boolean', 'value' => false],
            ['config_key' => 'localization.enabled_locales', 'config_type' => 'array', 'value' => ['en', 'si', 'ta']],
        ];

        foreach ($configs as $config) {
            $existing = DB::table('platform_configurations')->where('config_key', $config['config_key'])->first();
            $payload = [
                'config_key' => $config['config_key'],
                'config_type' => $config['config_type'],
                'config_value' => json_encode($config['value']),
                'environment' => 'global',
                'status' => 'active',
                'updated_at' => now(),
            ];

            if ($existing) {
                DB::table('platform_configurations')->where('id', $existing->id)->update($payload);

                continue;
            }

            DB::table('platform_configurations')->insert([
                ...$payload,
                'uuid' => (string) Str::uuid(),
                'created_at' => now(),
            ]);
        }
    }
}
