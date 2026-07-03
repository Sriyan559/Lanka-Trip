<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class SearchSynonymSeeder extends Seeder
{
    public function run(): void
    {
        $languageIds = DB::table('languages')->pluck('id', 'code');
        $synonyms = [
            ['term' => 'ceylon tea', 'synonym' => 'sri lankan tea', 'language' => 'en'],
            ['term' => 'cinnamon', 'synonym' => 'ceylon cinnamon', 'language' => 'en'],
            ['term' => 'gem stones', 'synonym' => 'gems', 'language' => 'en'],
            ['term' => 'coconut oil', 'synonym' => 'virgin coconut oil', 'language' => 'en'],
            ['term' => 'batik', 'synonym' => 'batik fabric', 'language' => 'en'],
            ['term' => 'rubber gloves', 'synonym' => 'latex gloves', 'language' => 'en'],
            ['term' => 'handicrafts', 'synonym' => 'handmade gifts', 'language' => 'en'],
        ];

        foreach ($synonyms as $synonym) {
            DB::table('search_synonyms')->updateOrInsert(
                [
                    'term' => $synonym['term'],
                    'synonym' => $synonym['synonym'],
                    'language_id' => $languageIds[$synonym['language']] ?? null,
                ],
                [
                    'uuid' => (string) Str::uuid(),
                    'status' => 'active',
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
            );
        }
    }
}
