<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class TranslationKeySeeder extends Seeder
{
    public function run(): void
    {
        $languageIds = DB::table('languages')->pluck('id', 'code');
        $keys = [
            ['key' => 'navigation.products', 'group' => 'navigation', 'value' => 'Products'],
            ['key' => 'navigation.suppliers', 'group' => 'navigation', 'value' => 'Suppliers'],
            ['key' => 'navigation.rfqs', 'group' => 'navigation', 'value' => 'RFQs'],
            ['key' => 'cta.request_quote', 'group' => 'actions', 'value' => 'Request Quote'],
            ['key' => 'status.active', 'group' => 'statuses', 'value' => 'Active'],
            ['key' => 'status.pending', 'group' => 'statuses', 'value' => 'Pending'],
        ];

        foreach ($keys as $key) {
            $existing = DB::table('translation_keys')->where('key', $key['key'])->first();
            $payload = [
                'key' => $key['key'],
                'group' => $key['group'],
                'description' => null,
                'status' => 'active',
                'updated_at' => now(),
            ];

            if ($existing) {
                DB::table('translation_keys')->where('id', $existing->id)->update($payload);
                $translationKeyId = $existing->id;
            } else {
                $translationKeyId = DB::table('translation_keys')->insertGetId([
                    ...$payload,
                    'uuid' => (string) Str::uuid(),
                    'created_at' => now(),
                ]);
            }

            if (isset($languageIds['en'])) {
                DB::table('translation_values')->updateOrInsert(
                    [
                        'translation_key_id' => $translationKeyId,
                        'language_id' => $languageIds['en'],
                    ],
                    [
                        'value' => $key['value'],
                        'status' => 'active',
                        'created_at' => now(),
                        'updated_at' => now(),
                    ],
                );
            }
        }
    }
}
