<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SlBeautyCategoryAlignmentSeeder extends Seeder
{
    public function run(): void
    {
        if (! Schema::hasTable('categories')) {
            return;
        }

        foreach ($this->categories() as $category) {
            $this->stableCategoryUpsert($category);
        }
    }

    private function categories(): array
    {
        return [
            [
                'name' => 'Skincare',
                'slug' => 'skincare',
                'description' => 'Cleansers, serums, moisturizers, sunscreen, masks, and skin treatment products.',
                'image' => 'https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/company/1/applications/62d53777f5ad942d3e505f77/theme/pictures/free/original/Skincare-1775740065304.jpeg',
                'sort_order' => 1000,
            ],
            [
                'name' => 'Bath & Body',
                'slug' => 'bath-body',
                'description' => 'Body wash, lotion, scrubs, hand care, body oils, and daily body care.',
                'image' => 'https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/company/1/applications/62d53777f5ad942d3e505f77/theme/pictures/free/original/Bath-and-body-1775741959054.jpeg',
                'sort_order' => 1040,
            ],
            [
                'name' => 'Beauty Tools',
                'slug' => 'tools-brushes',
                'description' => 'Makeup brushes, applicators, facial tools, hair tools, and beauty accessories.',
                'image' => 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=80',
                'sort_order' => 1065,
            ],
            [
                'name' => "Men's Grooming",
                'slug' => 'mens-grooming',
                'description' => 'Shaving, beard care, hair styling, deodorant, and men skin care products.',
                'image' => 'https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/company/1/applications/62d53777f5ad942d3e505f77/theme/pictures/free/original/Men-1775742004145.jpeg',
                'sort_order' => 1070,
            ],
            [
                'name' => 'Wellness',
                'slug' => 'wellness',
                'description' => 'Beauty wellness, self-care, aromatherapy, and routine support products.',
                'image' => 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=900&q=80',
                'sort_order' => 1080,
            ],
            [
                'name' => 'Luxury Beauty',
                'slug' => 'luxury-beauty',
                'description' => 'Premium skincare, fragrance, haircare, makeup, and curated luxury beauty products.',
                'image' => 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=900&q=80',
                'sort_order' => 1090,
            ],
            [
                'name' => 'K-Beauty',
                'slug' => 'k-beauty',
                'description' => 'Korean skincare, masks, moisturizers, cleansers, and trend-led beauty routines.',
                'image' => 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=900&q=80',
                'sort_order' => 1100,
            ],
            [
                'name' => 'Mini Size',
                'slug' => 'mini-size',
                'description' => 'Travel-size, trial-size, and compact beauty products for easy discovery.',
                'image' => 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=80',
                'sort_order' => 1110,
            ],
            [
                'name' => 'Gift Sets',
                'slug' => 'gift-sets',
                'description' => 'Curated beauty gift sets, value bundles, and seasonal beauty presents.',
                'image' => 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=900&q=80',
                'sort_order' => 1120,
            ],
            [
                'name' => 'Sale & Offers',
                'slug' => 'sale',
                'description' => 'Beauty deals, limited-time savings, value sets, and promotional offers.',
                'image' => 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80',
                'sort_order' => 1130,
            ],
            [
                'name' => 'New Arrivals',
                'slug' => 'new-arrivals',
                'description' => 'Fresh beauty launches, new products, and recently added brand collections.',
                'image' => 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80',
                'sort_order' => 1140,
            ],
        ];
    }

    private function stableCategoryUpsert(array $category): void
    {
        $now = now();
        $existing = DB::table('categories')->where('slug', $category['slug'])->first();
        $values = $this->filterExistingColumns([
            'name' => $category['name'],
            'description' => $category['description'],
            'image' => $category['image'],
            'parent_id' => null,
            'sort_order' => $category['sort_order'],
            'status' => 'active',
            'updated_at' => $now,
        ]);

        if ($existing) {
            DB::table('categories')
                ->where('id', $existing->id)
                ->update($values);

            return;
        }

        DB::table('categories')->insert($this->filterExistingColumns([
            'slug' => $category['slug'],
            ...$values,
            'created_at' => $now,
        ]));
    }

    private function filterExistingColumns(array $values): array
    {
        return collect($values)
            ->filter(fn (mixed $value, string $column): bool => Schema::hasColumn('categories', $column))
            ->all();
    }
}
