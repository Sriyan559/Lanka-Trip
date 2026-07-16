<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use RuntimeException;

class SlBeautyProductSeeder extends Seeder
{
    public function run(): void
    {
        if (! Schema::hasTable('products')) {
            return;
        }

        $categoryIds = $this->requiredIds('categories', 'category', $this->expectedCategorySlugs());
        $this->requiredIds('brands', 'brand', $this->expectedBrandSlugs());

        foreach ($this->products() as $index => $product) {
            $this->stableProductUpsert($product, $categoryIds[$product['category_slug']], $index);
        }
    }

    private function products(): array
    {
        return [
            [
                'name' => 'Gentle Hydrating Cleanser',
                'slug' => 'gentle-hydrating-cleanser',
                'brand_slug' => 'cerave',
                'brand_name' => 'CeraVe',
                'category_slug' => 'skincare',
                'category_name' => 'Skincare',
                'price' => 4200.00,
                'unit' => 'bottle',
                'short_description' => 'Daily hydrating cleanser from CeraVe for gentle skincare routines.',
                'image' => 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=80',
            ],
            [
                'name' => 'Vitamin C Brightening Serum',
                'slug' => 'vitamin-c-brightening-serum',
                'brand_slug' => 'garnier',
                'brand_name' => 'Garnier',
                'category_slug' => 'skincare',
                'category_name' => 'Skincare',
                'price' => 3900.00,
                'unit' => 'bottle',
                'short_description' => 'Lightweight Garnier serum for bright-looking daily skincare.',
                'image' => 'https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?auto=format&fit=crop&w=900&q=80',
            ],
            [
                'name' => 'SPF 50 Daily Sunscreen',
                'slug' => 'spf-50-daily-sunscreen',
                'brand_slug' => 'la-roche-posay',
                'brand_name' => 'La Roche-Posay',
                'category_slug' => 'skincare',
                'category_name' => 'Sun Care',
                'price' => 6800.00,
                'unit' => 'tube',
                'short_description' => 'La Roche-Posay SPF 50 sunscreen for daily sun care routines.',
                'image' => 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=900&q=80',
            ],
            [
                'name' => 'Long Wear Matte Lipstick',
                'slug' => 'long-wear-matte-lipstick',
                'brand_slug' => 'maybelline',
                'brand_name' => 'Maybelline',
                'category_slug' => 'makeup',
                'category_name' => 'Makeup',
                'price' => 3200.00,
                'unit' => 'piece',
                'short_description' => 'Maybelline matte lipstick for long-wear lip color.',
                'image' => 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=900&q=80',
            ],
            [
                'name' => 'Bond Repair Shampoo',
                'slug' => 'bond-repair-shampoo',
                'brand_slug' => 'loreal-paris',
                'brand_name' => "L'Oreal Paris",
                'category_slug' => 'hair-care',
                'category_name' => 'Haircare',
                'price' => 4500.00,
                'unit' => 'bottle',
                'short_description' => "L'Oreal Paris shampoo for everyday hair repair routines.",
                'image' => 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&w=900&q=80',
            ],
            [
                'name' => 'Signature Eau de Parfum',
                'slug' => 'signature-eau-de-parfum',
                'brand_slug' => 'lancome',
                'brand_name' => 'Lancome',
                'category_slug' => 'fragrance',
                'category_name' => 'Fragrance',
                'price' => 18500.00,
                'unit' => 'bottle',
                'short_description' => 'Lancome fragrance for premium daily wear.',
                'image' => 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=80',
            ],
            [
                'name' => 'Soft Glow Body Lotion',
                'slug' => 'soft-glow-body-lotion',
                'brand_slug' => 'nivea',
                'brand_name' => 'Nivea',
                'category_slug' => 'bath-body',
                'category_name' => 'Bath & Body',
                'price' => 2900.00,
                'unit' => 'bottle',
                'short_description' => 'Nivea body lotion for soft everyday body care.',
                'image' => 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=900&q=80',
            ],
            [
                'name' => 'Pore Care Clay Face Mask',
                'slug' => 'pore-care-clay-face-mask',
                'brand_slug' => 'the-ordinary',
                'brand_name' => 'The Ordinary',
                'category_slug' => 'skincare',
                'category_name' => 'Face Mask',
                'price' => 5600.00,
                'unit' => 'jar',
                'short_description' => 'The Ordinary clay mask for weekly skincare routines.',
                'image' => 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&q=80',
            ],
            [
                'name' => 'Nourishing Hair Oil',
                'slug' => 'nourishing-hair-oil',
                'brand_slug' => 'kerastase',
                'brand_name' => 'Kerastase',
                'category_slug' => 'hair-care',
                'category_name' => 'Haircare',
                'price' => 9200.00,
                'unit' => 'bottle',
                'short_description' => 'Kerastase hair oil for smooth, nourished-looking hair.',
                'image' => 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=80',
            ],
            [
                'name' => 'Essential Beauty Tools Set',
                'slug' => 'essential-beauty-tools-set',
                'brand_slug' => 'real-techniques',
                'brand_name' => 'Real Techniques',
                'category_slug' => 'tools-brushes',
                'category_name' => 'Beauty Tools',
                'price' => 7400.00,
                'unit' => 'set',
                'short_description' => 'Real Techniques brush and tool set for makeup routines.',
                'image' => 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80',
            ],
            [
                'name' => 'Rose Glow Blush Palette',
                'slug' => 'rose-glow-blush-palette',
                'brand_slug' => 'nars',
                'brand_name' => 'NARS',
                'category_slug' => 'makeup',
                'category_name' => 'Makeup',
                'price' => 9800.00,
                'unit' => 'palette',
                'short_description' => 'NARS blush palette for soft rose-toned makeup looks.',
                'image' => 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=900&q=80',
            ],
            [
                'name' => 'Retinol Night Cream',
                'slug' => 'retinol-night-cream',
                'brand_slug' => 'olay',
                'brand_name' => 'Olay',
                'category_slug' => 'skincare',
                'category_name' => 'Skincare',
                'price' => 7600.00,
                'unit' => 'jar',
                'short_description' => 'Olay night cream for evening skincare routines.',
                'image' => 'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=900&q=80',
            ],
            [
                'name' => 'Micellar Cleansing Water',
                'slug' => 'micellar-cleansing-water',
                'brand_slug' => 'bioderma',
                'brand_name' => 'Bioderma',
                'category_slug' => 'skincare',
                'category_name' => 'Skincare',
                'price' => 5100.00,
                'unit' => 'bottle',
                'short_description' => 'Bioderma micellar water for gentle cleansing.',
                'image' => 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80',
            ],
            [
                'name' => 'Hydrating Sheet Mask',
                'slug' => 'hydrating-sheet-mask',
                'brand_slug' => 'laneige',
                'brand_name' => 'Laneige',
                'category_slug' => 'k-beauty',
                'category_name' => 'K-Beauty',
                'price' => 1800.00,
                'unit' => 'sheet',
                'short_description' => 'Laneige sheet mask for hydration-focused K-beauty routines.',
                'image' => 'https://images.unsplash.com/photo-1608979048467-6194dabc6a3d?auto=format&fit=crop&w=900&q=80',
            ],
            [
                'name' => 'Brow Definer Pencil',
                'slug' => 'brow-definer-pencil',
                'brand_slug' => 'anastasia-beverly-hills',
                'brand_name' => 'Anastasia Beverly Hills',
                'category_slug' => 'makeup',
                'category_name' => 'Makeup',
                'price' => 5900.00,
                'unit' => 'piece',
                'short_description' => 'Anastasia Beverly Hills brow pencil for defined brows.',
                'image' => 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=80',
            ],
            [
                'name' => 'Makeup Brush Collection',
                'slug' => 'makeup-brush-collection',
                'brand_slug' => 'morphe',
                'brand_name' => 'Morphe',
                'category_slug' => 'tools-brushes',
                'category_name' => 'Beauty Tools',
                'price' => 11200.00,
                'unit' => 'set',
                'short_description' => 'Morphe makeup brush collection for face and eye looks.',
                'image' => 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80',
            ],
            [
                'name' => 'Professional Hair Trimmer',
                'slug' => 'professional-hair-trimmer',
                'brand_slug' => 'loreal-paris',
                'brand_name' => "L'Oreal Paris",
                'category_slug' => 'hair-care',
                'category_name' => 'Haircare',
                'price' => 12500.00,
                'unit' => 'piece',
                'short_description' => 'Professional high-precision cordless hair trimmer and clipper.',
                'image' => 'https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&w=900&q=80',
            ],
            [
                'name' => 'Premium Beauty Organizer Box',
                'slug' => 'premium-beauty-organizer-box',
                'brand_slug' => 'morphe',
                'brand_name' => 'Morphe',
                'category_slug' => 'tools-brushes',
                'category_name' => 'Beauty Tools',
                'price' => 3800.00,
                'unit' => 'piece',
                'short_description' => 'Elegant multi-compartment beauty storage box and accessories organizer.',
                'image' => 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=900&q=80',
            ],
            [
                'name' => 'Aesthetic Wooden Hair Comb',
                'slug' => 'aesthetic-wooden-hair-comb',
                'brand_slug' => 'kerastase',
                'brand_name' => 'Kerastase',
                'category_slug' => 'hair-care',
                'category_name' => 'Haircare',
                'price' => 1500.00,
                'unit' => 'piece',
                'short_description' => 'Premium anti-static sandalwood wooden comb for hair styling.',
                'image' => 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80',
            ],
            [
                'name' => 'Salon Blow Hair Dryer',
                'slug' => 'salon-blow-hair-dryer',
                'brand_slug' => 'loreal-paris',
                'brand_name' => "L'Oreal Paris",
                'category_slug' => 'hair-care',
                'category_name' => 'Haircare',
                'price' => 14500.00,
                'unit' => 'piece',
                'short_description' => 'High-velocity ionic salon blow hair dryer with styling nozzle.',
                'image' => 'https://images.unsplash.com/photo-1620331311520-246422fd82f9?auto=format&fit=crop&w=900&q=80',
            ],
            [
                'name' => 'Daily Moisturizing Cream',
                'slug' => 'daily-moisturizing-cream',
                'brand_slug' => 'nivea',
                'brand_name' => 'Nivea',
                'category_slug' => 'skincare',
                'category_name' => 'Skincare',
                'price' => 3100.00,
                'unit' => 'jar',
                'short_description' => 'Nivea daily moisturizing cream for intense skin hydration.',
                'image' => 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=900&q=80',
            ],
            [
                'name' => 'Brightening Eye Cream',
                'slug' => 'brightening-eye-cream',
                'brand_slug' => 'cerave',
                'brand_name' => 'CeraVe',
                'category_slug' => 'skincare',
                'category_name' => 'Skincare',
                'price' => 4800.00,
                'unit' => 'tube',
                'short_description' => 'CeraVe eye cream for bright and refreshed eye contour area.',
                'image' => 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=80',
            ],
            [
                'name' => 'Anti-Wrinkle Day Cream',
                'slug' => 'anti-wrinkle-day-cream',
                'brand_slug' => 'loreal-paris',
                'brand_name' => "L'Oreal Paris",
                'category_slug' => 'skincare',
                'category_name' => 'Skincare',
                'price' => 8500.00,
                'unit' => 'jar',
                'short_description' => "L'Oreal Paris anti-wrinkle day cream for active aging care.",
                'image' => 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=900&q=80',
            ],
            [
                'name' => 'Soothing Aloe Vera Cream',
                'slug' => 'soothing-aloe-vera-cream',
                'brand_slug' => 'garnier',
                'brand_name' => 'Garnier',
                'category_slug' => 'skincare',
                'category_name' => 'Skincare',
                'price' => 3400.00,
                'unit' => 'tub',
                'short_description' => 'Garnier soothing cream with natural aloe vera extracts.',
                'image' => 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80',
            ],
            [
                'name' => 'Clarifying Blemish Cream',
                'slug' => 'clarifying-blemish-cream',
                'brand_slug' => 'the-ordinary',
                'brand_name' => 'The Ordinary',
                'category_slug' => 'skincare',
                'category_name' => 'Skincare',
                'price' => 5200.00,
                'unit' => 'tube',
                'short_description' => 'The Ordinary clarifying cream for spot correction and clear skin.',
                'image' => 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80',
            ],
            [
                'name' => 'Deep Hydration Water Cream',
                'slug' => 'deep-hydration-water-cream',
                'brand_slug' => 'laneige',
                'brand_name' => 'Laneige',
                'category_slug' => 'skincare',
                'category_name' => 'Skincare',
                'price' => 9400.00,
                'unit' => 'jar',
                'short_description' => 'Laneige light water cream for refreshing hydration.',
                'image' => 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=900&q=80',
            ],
            [
                'name' => 'Vitamin C Radiance Cream',
                'slug' => 'vitamin-c-radiance-cream',
                'brand_slug' => 'bioderma',
                'brand_name' => 'Bioderma',
                'category_slug' => 'skincare',
                'category_name' => 'Skincare',
                'price' => 6900.00,
                'unit' => 'jar',
                'short_description' => 'Bioderma vitamin C cream for radiant, glowing skin.',
                'image' => 'https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?auto=format&fit=crop&w=900&q=80',
            ],
            [
                'name' => 'Electric Face Massager',
                'slug' => 'electric-face-massager',
                'brand_slug' => 'olay',
                'brand_name' => 'Olay',
                'category_slug' => 'tools-brushes',
                'category_name' => 'Beauty Tools',
                'price' => 8900.00,
                'unit' => 'piece',
                'short_description' => 'Vibrating facial massager for skincare routines.',
                'image' => 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=900&q=80',
            ],
            [
                'name' => 'Heated Eyelash Curler',
                'slug' => 'heated-eyelash-curler',
                'brand_slug' => 'maybelline',
                'brand_name' => 'Maybelline',
                'category_slug' => 'tools-brushes',
                'category_name' => 'Beauty Tools',
                'price' => 4200.00,
                'unit' => 'piece',
                'short_description' => 'Professional heated eyelash curler for makeup prep.',
                'image' => 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=900&q=80',
            ],
        ];
    }

    private function stableProductUpsert(array $product, int $categoryId, int $index): void
    {
        $now = now();
        $existing = DB::table('products')->where('slug', $product['slug'])->first();
        $values = $this->filterExistingColumns('products', [
            'category_id' => $categoryId,
            'supplier_id' => null,
            'name' => $product['name'],
            'short_description' => $product['short_description'],
            'description' => $this->description($product),
            'price' => $product['price'],
            'moq' => 1,
            'unit' => $product['unit'],
            'supply_ability' => 'In stock for retail and beauty business orders',
            'lead_time' => '2-5 business days',
            'port' => null,
            'packaging_details' => 'Retail-ready beauty packaging. Suitable for storefront, salon, and retailer replenishment workflows.',
            'featured_image' => $product['image'],
            'status' => 'active',
            'is_featured' => true,
            'views_count' => max(0, 160 - ($index * 5)),
            'updated_at' => $now,
        ]);

        if ($existing) {
            DB::table('products')
                ->where('id', $existing->id)
                ->update($values);

            $productId = $existing->id;
        } else {
            $productId = DB::table('products')->insertGetId($this->filterExistingColumns('products', [
                'slug' => $product['slug'],
                ...$values,
                'created_at' => $now,
            ]));
        }

        $this->seedPrimaryImage($productId, $product['image'], $now);
    }

    private function seedPrimaryImage(int $productId, string $image, mixed $now): void
    {
        if (! Schema::hasTable('product_images')) {
            return;
        }

        $existing = DB::table('product_images')
            ->where('product_id', $productId)
            ->where('image', $image)
            ->first();

        $values = $this->filterExistingColumns('product_images', [
            'sort_order' => 0,
            'updated_at' => $now,
        ]);

        if ($existing) {
            DB::table('product_images')
                ->where('id', $existing->id)
                ->update($values);

            return;
        }

        DB::table('product_images')->insert($this->filterExistingColumns('product_images', [
            'product_id' => $productId,
            'image' => $image,
            'sort_order' => 0,
            'created_at' => $now,
            'updated_at' => $now,
        ]));
    }

    private function description(array $product): string
    {
        return sprintf(
            '%s %s is a public SL Beauty catalogue item for %s. It is suitable for daily beauty routines and future B2B replenishment workflows.',
            $product['brand_name'],
            $product['name'],
            $product['category_name'],
        );
    }

    private function expectedCategorySlugs(): array
    {
        return array_values(array_unique(array_column($this->products(), 'category_slug')));
    }

    private function expectedBrandSlugs(): array
    {
        return array_values(array_unique(array_column($this->products(), 'brand_slug')));
    }

    private function requiredIds(string $table, string $label, array $slugs): array
    {
        if (! Schema::hasTable($table)) {
            throw new RuntimeException("Required {$label} table [{$table}] does not exist.");
        }

        $ids = DB::table($table)
            ->whereIn('slug', $slugs)
            ->pluck('id', 'slug')
            ->all();

        $missing = array_values(array_diff($slugs, array_keys($ids)));

        if ($missing !== []) {
            throw new RuntimeException('Missing required '.$label.' slugs: '.implode(', ', $missing));
        }

        return $ids;
    }

    private function filterExistingColumns(string $table, array $values): array
    {
        return collect($values)
            ->filter(fn (mixed $value, string $column): bool => Schema::hasColumn($table, $column))
            ->all();
    }
}
