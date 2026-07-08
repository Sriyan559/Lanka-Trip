<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

class SlBeautyBrandSeeder extends Seeder
{
    public function run(): void
    {
        if (! Schema::hasTable('brands')) {
            return;
        }

        foreach ($this->brands() as $brand) {
            $this->stableBrandUpsert($brand);
        }
    }

    private function brands(): array
    {
        return [
            [
                'name' => 'CeraVe',
                'slug' => 'cerave',
                'description' => 'Dermatologist-developed skincare for cleansers, moisturizers, and daily barrier support.',
            ],
            [
                'name' => 'Garnier',
                'slug' => 'garnier',
                'description' => 'Accessible skincare and haircare products for everyday beauty routines.',
            ],
            [
                'name' => 'La Roche-Posay',
                'slug' => 'la-roche-posay',
                'description' => 'Dermatological skincare and sun care products for sensitive skin.',
            ],
            [
                'name' => 'Maybelline',
                'slug' => 'maybelline',
                'description' => 'Makeup essentials across face, lip, eye, and brow categories.',
            ],
            [
                'name' => "L'Oreal Paris",
                'slug' => 'loreal-paris',
                'description' => 'Beauty, skincare, haircare, and cosmetics for daily and professional routines.',
            ],
            [
                'name' => 'Lancome',
                'slug' => 'lancome',
                'description' => 'Premium beauty, skincare, makeup, and fragrance products.',
            ],
            [
                'name' => 'Nivea',
                'slug' => 'nivea',
                'description' => 'Body care, skincare, and personal care products for everyday use.',
            ],
            [
                'name' => 'The Ordinary',
                'slug' => 'the-ordinary',
                'description' => 'Ingredient-led skincare focused on serums, treatments, and targeted routines.',
            ],
            [
                'name' => 'Kerastase',
                'slug' => 'kerastase',
                'description' => 'Premium haircare products for salon-quality cleansing, repair, and styling.',
            ],
            [
                'name' => 'Real Techniques',
                'slug' => 'real-techniques',
                'description' => 'Beauty tools, brushes, and applicators for makeup routines.',
            ],
            [
                'name' => 'NARS',
                'slug' => 'nars',
                'description' => 'Premium makeup for complexion, cheeks, lips, and artistry-led looks.',
            ],
            [
                'name' => 'Olay',
                'slug' => 'olay',
                'description' => 'Skincare products for moisturizing, brightening, and anti-aging routines.',
            ],
            [
                'name' => 'Bioderma',
                'slug' => 'bioderma',
                'description' => 'Dermatological skincare products including cleansing and sensitive skin care.',
            ],
            [
                'name' => 'Laneige',
                'slug' => 'laneige',
                'description' => 'K-beauty skincare products focused on hydration, masks, and daily care.',
            ],
            [
                'name' => 'Anastasia Beverly Hills',
                'slug' => 'anastasia-beverly-hills',
                'description' => 'Makeup products known for brow, eye, complexion, and palette essentials.',
            ],
            [
                'name' => 'Morphe',
                'slug' => 'morphe',
                'description' => 'Makeup brushes, palettes, and beauty tools for creative looks.',
            ],
        ];
    }

    private function stableBrandUpsert(array $brand): void
    {
        $now = now();
        $existing = DB::table('brands')->where('slug', $brand['slug'])->first();
        $values = $this->filterExistingColumns([
            'name' => $brand['name'],
            'description' => $brand['description'],
            'logo_path' => null,
            'website_url' => null,
            'country_id' => null,
            'status' => 'active',
            'is_verified' => true,
            'created_by' => null,
            'updated_at' => $now,
        ]);

        if ($existing) {
            DB::table('brands')
                ->where('id', $existing->id)
                ->update($values);

            return;
        }

        DB::table('brands')->insert($this->filterExistingColumns([
            'uuid' => (string) Str::uuid(),
            'slug' => $brand['slug'],
            ...$values,
            'created_at' => $now,
        ]));
    }

    private function filterExistingColumns(array $values): array
    {
        return collect($values)
            ->filter(fn (mixed $value, string $column): bool => Schema::hasColumn('brands', $column))
            ->all();
    }
}
