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
                'image' => 'https://placehold.co/900x700/fce7f3/9d174d?text=Skincare',
                'sort_order' => 1000,
            ],
            [
                'name' => 'Bath & Body',
                'slug' => 'bath-body',
                'description' => 'Body wash, lotion, scrubs, hand care, body oils, and daily body care.',
                'image' => 'https://placehold.co/900x700/ffedd5/9a3412?text=Bath+%26+Body',
                'sort_order' => 1040,
            ],
            [
                'name' => 'Beauty Tools',
                'slug' => 'tools-brushes',
                'description' => 'Makeup brushes, applicators, facial tools, hair tools, and beauty accessories.',
                'image' => 'https://placehold.co/900x700/fce7f3/831843?text=Beauty+Tools',
                'sort_order' => 1065,
            ],
            [
                'name' => "Men's Grooming",
                'slug' => 'mens-grooming',
                'description' => 'Shaving, beard care, hair styling, deodorant, and men skin care products.',
                'image' => 'https://placehold.co/900x700/e5e7eb/111827?text=Men%27s+Grooming',
                'sort_order' => 1070,
            ],
            [
                'name' => 'Wellness',
                'slug' => 'wellness',
                'description' => 'Beauty wellness, self-care, aromatherapy, and routine support products.',
                'image' => 'https://placehold.co/900x700/dcfce7/166534?text=Wellness',
                'sort_order' => 1080,
            ],
            [
                'name' => 'Luxury Beauty',
                'slug' => 'luxury-beauty',
                'description' => 'Premium skincare, fragrance, haircare, makeup, and curated luxury beauty products.',
                'image' => 'https://placehold.co/900x700/fae8ff/86198f?text=Luxury+Beauty',
                'sort_order' => 1090,
            ],
            [
                'name' => 'K-Beauty',
                'slug' => 'k-beauty',
                'description' => 'Korean skincare, masks, moisturizers, cleansers, and trend-led beauty routines.',
                'image' => 'https://placehold.co/900x700/fce7f3/be185d?text=K-Beauty',
                'sort_order' => 1100,
            ],
            [
                'name' => 'Mini Size',
                'slug' => 'mini-size',
                'description' => 'Travel-size, trial-size, and compact beauty products for easy discovery.',
                'image' => 'https://placehold.co/900x700/fef3c7/92400e?text=Mini+Size',
                'sort_order' => 1110,
            ],
            [
                'name' => 'Gift Sets',
                'slug' => 'gift-sets',
                'description' => 'Curated beauty gift sets, value bundles, and seasonal beauty presents.',
                'image' => 'https://placehold.co/900x700/fce7f3/9d174d?text=Gift+Sets',
                'sort_order' => 1120,
            ],
            [
                'name' => 'Sale & Offers',
                'slug' => 'sale',
                'description' => 'Beauty deals, limited-time savings, value sets, and promotional offers.',
                'image' => 'https://placehold.co/900x700/fee2e2/991b1b?text=Sale+%26+Offers',
                'sort_order' => 1130,
            ],
            [
                'name' => 'New Arrivals',
                'slug' => 'new-arrivals',
                'description' => 'Fresh beauty launches, new products, and recently added brand collections.',
                'image' => 'https://placehold.co/900x700/e0f2fe/075985?text=New+Arrivals',
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
