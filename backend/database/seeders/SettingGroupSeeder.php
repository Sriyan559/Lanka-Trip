<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class SettingGroupSeeder extends Seeder
{
    public function run(): void
    {
        $groups = [
            ['group_key' => 'marketplace', 'name' => 'Marketplace', 'sort_order' => 10],
            ['group_key' => 'localization', 'name' => 'Localization', 'sort_order' => 20],
            ['group_key' => 'commerce', 'name' => 'Commerce', 'sort_order' => 30],
            ['group_key' => 'notifications', 'name' => 'Notifications', 'sort_order' => 40],
            ['group_key' => 'compliance', 'name' => 'Compliance', 'sort_order' => 50],
        ];

        foreach ($groups as $group) {
            $existing = DB::table('setting_groups')->where('group_key', $group['group_key'])->first();
            $payload = [
                ...$group,
                'description' => null,
                'status' => 'active',
                'updated_at' => now(),
            ];

            if ($existing) {
                DB::table('setting_groups')->where('id', $existing->id)->update($payload);

                continue;
            }

            DB::table('setting_groups')->insert([
                ...$payload,
                'uuid' => (string) Str::uuid(),
                'created_at' => now(),
            ]);
        }
    }
}
