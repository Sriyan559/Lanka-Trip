<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class SystemSettingSeeder extends Seeder
{
    public function run(): void
    {
        $groupIds = DB::table('setting_groups')->pluck('id', 'group_key');
        $settings = [
            ['group' => 'marketplace', 'setting_key' => 'marketplace.name', 'setting_type' => 'string', 'value' => 'Made in Sri Lanka B2B'],
            ['group' => 'marketplace', 'setting_key' => 'marketplace.default_status', 'setting_type' => 'string', 'value' => 'active'],
            ['group' => 'localization', 'setting_key' => 'localization.default_locale', 'setting_type' => 'string', 'value' => 'en'],
            ['group' => 'localization', 'setting_key' => 'localization.default_country', 'setting_type' => 'string', 'value' => 'LK'],
            ['group' => 'commerce', 'setting_key' => 'commerce.default_currency', 'setting_type' => 'string', 'value' => 'LKR'],
            ['group' => 'notifications', 'setting_key' => 'notifications.email_enabled', 'setting_type' => 'boolean', 'value' => true],
            ['group' => 'compliance', 'setting_key' => 'compliance.require_terms_consent', 'setting_type' => 'boolean', 'value' => true],
        ];

        foreach ($settings as $setting) {
            $existing = DB::table('system_settings')->where('setting_key', $setting['setting_key'])->first();
            $payload = [
                'setting_group_id' => $groupIds[$setting['group']] ?? null,
                'setting_key' => $setting['setting_key'],
                'setting_type' => $setting['setting_type'],
                'config_value' => json_encode($setting['value']),
                'constraints' => null,
                'is_public' => str_starts_with($setting['setting_key'], 'marketplace.'),
                'status' => 'active',
                'updated_at' => now(),
            ];

            if ($existing) {
                DB::table('system_settings')->where('id', $existing->id)->update($payload);

                continue;
            }

            DB::table('system_settings')->insert([
                ...$payload,
                'uuid' => (string) Str::uuid(),
                'created_at' => now(),
            ]);
        }
    }
}
