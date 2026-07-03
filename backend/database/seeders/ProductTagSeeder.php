<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ProductTagSeeder extends Seeder
{
    public function run(): void
    {
        $tags = [
            ['name' => 'Export Ready', 'description' => 'Products ready for international B2B export orders.', 'color' => '#0f766e'],
            ['name' => 'Private Label', 'description' => 'Products available for buyer branding and private-label packaging.', 'color' => '#2563eb'],
            ['name' => 'Organic', 'description' => 'Products with organic sourcing, processing, or certification support.', 'color' => '#16a34a'],
            ['name' => 'Bulk Supply', 'description' => 'Products suitable for bulk procurement and recurring wholesale supply.', 'color' => '#7c3aed'],
            ['name' => 'Customizable', 'description' => 'Products that can be customized for buyer specifications.', 'color' => '#c2410c'],
            ['name' => 'Certified', 'description' => 'Products with certification, audit, or compliance documentation.', 'color' => '#0369a1'],
        ];

        foreach ($tags as $tag) {
            $slug = Str::slug($tag['name']);
            $existing = DB::table('product_tags')->where('slug', $slug)->first();

            if ($existing) {
                DB::table('product_tags')->where('id', $existing->id)->update([
                    ...$tag,
                    'slug' => $slug,
                    'status' => 'active',
                    'updated_at' => now(),
                ]);

                continue;
            }

            DB::table('product_tags')->insert([
                ...$tag,
                'uuid' => (string) Str::uuid(),
                'slug' => $slug,
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
