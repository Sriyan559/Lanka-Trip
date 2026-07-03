<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CategoryAttributeSeeder extends Seeder
{
    public function run(): void
    {
        $categoryIds = DB::table('categories')->pluck('id', 'slug');
        $attributeIds = DB::table('product_attributes')->pluck('id', 'slug');

        $mappings = [
            'ceylon-tea' => ['grade', 'origin', 'minimum-order-quantity', 'lead-time-days', 'fob-port', 'packaging-type', 'certification-standard'],
            'cinnamon' => ['grade', 'origin', 'minimum-order-quantity', 'lead-time-days', 'packaging-type', 'certification-standard'],
            'coconut-oil' => ['origin', 'minimum-order-quantity', 'lead-time-days', 'packaging-type', 'net-weight', 'certification-standard'],
            'batik-fabric' => ['material', 'color', 'size', 'minimum-order-quantity', 'lead-time-days', 'packaging-type'],
            'rubber-gloves' => ['material', 'size', 'color', 'minimum-order-quantity', 'lead-time-days', 'certification-standard'],
            'blue-sapphire' => ['grade', 'origin', 'size', 'certification-standard', 'minimum-order-quantity'],
            'apparel-textiles' => ['material', 'color', 'size', 'minimum-order-quantity', 'lead-time-days', 'packaging-type'],
            'spices-condiments' => ['grade', 'origin', 'minimum-order-quantity', 'lead-time-days', 'packaging-type', 'certification-standard'],
            'handicrafts-gifts' => ['material', 'color', 'size', 'minimum-order-quantity', 'lead-time-days', 'packaging-type'],
            'electronics-it' => ['minimum-order-quantity', 'lead-time-days', 'certification-standard'],
            'industrial-machinery' => ['material', 'size', 'minimum-order-quantity', 'lead-time-days', 'hs-code'],
        ];

        foreach ($mappings as $categorySlug => $attributeSlugs) {
            $categoryId = $categoryIds[$categorySlug] ?? null;

            if (! $categoryId) {
                continue;
            }

            foreach (array_values($attributeSlugs) as $index => $attributeSlug) {
                $attributeId = $attributeIds[$attributeSlug] ?? null;

                if (! $attributeId) {
                    continue;
                }

                DB::table('category_attributes')->updateOrInsert(
                    [
                        'category_id' => $categoryId,
                        'product_attribute_id' => $attributeId,
                    ],
                    [
                        'uuid' => (string) Str::uuid(),
                        'is_required' => in_array($attributeSlug, ['minimum-order-quantity'], true),
                        'is_filterable' => true,
                        'sort_order' => ($index + 1) * 10,
                        'status' => 'active',
                        'created_at' => now(),
                        'updated_at' => now(),
                    ],
                );
            }
        }
    }
}
