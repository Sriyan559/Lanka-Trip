<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class LanguageSeeder extends Seeder
{
    public function run(): void
    {
        $languages = [
            ['code' => 'en', 'name' => 'English', 'native_name' => 'English'],
            ['code' => 'si', 'name' => 'Sinhala', 'native_name' => 'Sinhala'],
            ['code' => 'ta', 'name' => 'Tamil', 'native_name' => 'Tamil'],
            ['code' => 'hi', 'name' => 'Hindi', 'native_name' => 'Hindi'],
            ['code' => 'ar', 'name' => 'Arabic', 'native_name' => 'Arabic'],
            ['code' => 'de', 'name' => 'German', 'native_name' => 'Deutsch'],
            ['code' => 'fr', 'name' => 'French', 'native_name' => 'Francais'],
            ['code' => 'ja', 'name' => 'Japanese', 'native_name' => 'Japanese'],
            ['code' => 'zh', 'name' => 'Chinese', 'native_name' => 'Chinese'],
        ];

        foreach ($languages as $language) {
            $existing = DB::table('languages')->where('code', $language['code'])->first();

            if ($existing) {
                DB::table('languages')->where('id', $existing->id)->update([
                    ...$language,
                    'status' => 'active',
                    'updated_at' => now(),
                ]);

                continue;
            }

            DB::table('languages')->insert([
                ...$language,
                'uuid' => (string) Str::uuid(),
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
