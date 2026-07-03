<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class AttributeGroupSeeder extends Seeder
{
    public function run(): void
    {
        $groups = [
            ['name' => 'Trade Details', 'description' => 'Common B2B procurement and export trade information.', 'sort_order' => 10],
            ['name' => 'Product Specifications', 'description' => 'Physical, material, grade, and technical product details.', 'sort_order' => 20],
            ['name' => 'Compliance', 'description' => 'Certification, origin, and regulatory attributes.', 'sort_order' => 30],
            ['name' => 'Packaging and Logistics', 'description' => 'Packing, shipping, and logistics attributes.', 'sort_order' => 40],
        ];

        foreach ($groups as $group) {
            $slug = Str::slug($group['name']);
            $existing = DB::table('attribute_groups')->where('slug', $slug)->first();

            if ($existing) {
                DB::table('attribute_groups')->where('id', $existing->id)->update([
                    ...$group,
                    'slug' => $slug,
                    'status' => 'active',
                    'updated_at' => now(),
                ]);

                continue;
            }

            DB::table('attribute_groups')->insert([
                ...$group,
                'uuid' => (string) Str::uuid(),
                'slug' => $slug,
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        $this->seedAttributes();
    }

    private function seedAttributes(): void
    {
        $groupIds = DB::table('attribute_groups')->pluck('id', 'slug');
        $attributes = [
            ['group' => 'trade-details', 'name' => 'Minimum Order Quantity', 'data_type' => 'number', 'unit' => null, 'is_required' => true, 'is_filterable' => true, 'sort_order' => 10],
            ['group' => 'trade-details', 'name' => 'Lead Time Days', 'data_type' => 'number', 'unit' => 'days', 'is_required' => false, 'is_filterable' => true, 'sort_order' => 20],
            ['group' => 'trade-details', 'name' => 'FOB Port', 'data_type' => 'text', 'unit' => null, 'is_required' => false, 'is_filterable' => true, 'sort_order' => 30],
            ['group' => 'product-specifications', 'name' => 'Grade', 'data_type' => 'text', 'unit' => null, 'is_required' => false, 'is_filterable' => true, 'sort_order' => 10],
            ['group' => 'product-specifications', 'name' => 'Material', 'data_type' => 'text', 'unit' => null, 'is_required' => false, 'is_filterable' => true, 'sort_order' => 20],
            ['group' => 'product-specifications', 'name' => 'Size', 'data_type' => 'text', 'unit' => null, 'is_required' => false, 'is_filterable' => true, 'sort_order' => 30],
            ['group' => 'product-specifications', 'name' => 'Color', 'data_type' => 'text', 'unit' => null, 'is_required' => false, 'is_filterable' => true, 'sort_order' => 40],
            ['group' => 'product-specifications', 'name' => 'Origin', 'data_type' => 'text', 'unit' => null, 'is_required' => false, 'is_filterable' => true, 'sort_order' => 50],
            ['group' => 'compliance', 'name' => 'Certification Standard', 'data_type' => 'text', 'unit' => null, 'is_required' => false, 'is_filterable' => true, 'sort_order' => 10],
            ['group' => 'compliance', 'name' => 'HS Code', 'data_type' => 'text', 'unit' => null, 'is_required' => false, 'is_filterable' => true, 'sort_order' => 20],
            ['group' => 'packaging-and-logistics', 'name' => 'Packaging Type', 'data_type' => 'text', 'unit' => null, 'is_required' => false, 'is_filterable' => true, 'sort_order' => 10],
            ['group' => 'packaging-and-logistics', 'name' => 'Net Weight', 'data_type' => 'number', 'unit' => 'kg', 'is_required' => false, 'is_filterable' => true, 'sort_order' => 20],
        ];

        foreach ($attributes as $attribute) {
            $slug = Str::slug($attribute['name']);
            $existing = DB::table('product_attributes')->where('slug', $slug)->first();
            $payload = [
                'attribute_group_id' => $groupIds[$attribute['group']] ?? null,
                'name' => $attribute['name'],
                'slug' => $slug,
                'data_type' => $attribute['data_type'],
                'unit' => $attribute['unit'],
                'is_required' => $attribute['is_required'],
                'is_filterable' => $attribute['is_filterable'],
                'is_variant_defining' => in_array($slug, ['size', 'color'], true),
                'sort_order' => $attribute['sort_order'],
                'status' => 'active',
                'updated_at' => now(),
            ];

            if ($existing) {
                DB::table('product_attributes')->where('id', $existing->id)->update($payload);

                continue;
            }

            DB::table('product_attributes')->insert([
                ...$payload,
                'uuid' => (string) Str::uuid(),
                'created_at' => now(),
            ]);
        }
    }
}
