<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ContentPageSeeder extends Seeder
{
    public function run(): void
    {
        $pages = [
            ['page_slug' => 'about', 'page_type' => 'static', 'title' => 'About Made in Sri Lanka'],
            ['page_slug' => 'terms', 'page_type' => 'policy', 'title' => 'Terms of Use'],
            ['page_slug' => 'privacy', 'page_type' => 'policy', 'title' => 'Privacy Policy'],
            ['page_slug' => 'supplier-guide', 'page_type' => 'guide', 'title' => 'Supplier Guide'],
            ['page_slug' => 'buyer-guide', 'page_type' => 'guide', 'title' => 'Buyer Guide'],
        ];

        foreach ($pages as $page) {
            $existing = DB::table('content_pages')->where('page_slug', $page['page_slug'])->first();
            $payload = [
                ...$page,
                'content_blocks' => null,
                'status' => 'published',
                'published_at' => now(),
                'updated_at' => now(),
            ];

            if ($existing) {
                DB::table('content_pages')->where('id', $existing->id)->update($payload);

                continue;
            }

            DB::table('content_pages')->insert([
                ...$payload,
                'uuid' => (string) Str::uuid(),
                'created_at' => now(),
            ]);
        }
    }
}
