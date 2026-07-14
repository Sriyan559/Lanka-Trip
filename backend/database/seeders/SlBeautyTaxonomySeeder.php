<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

class SlBeautyTaxonomySeeder extends Seeder
{
    public function run(): void
    {
        $this->seedCategories();
        $this->seedBeautyAttributes();
        $this->seedCategoryAttributeTemplates();
    }

    private function seedCategories(): void
    {
        $topLevelCategories = [
            [
                'name' => 'Skin Care',
                'slug' => 'skin-care',
                'description' => 'Cleansers, moisturizers, serums, sunscreen, masks, and skin treatment products.',
                'image' => 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80',
                'sort_order' => 1000,
            ],
            [
                'name' => 'Hair Care',
                'slug' => 'hair-care',
                'description' => 'Shampoo, conditioner, treatments, oils, scalp care, and styling products.',
                'image' => 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&w=900&q=80',
                'sort_order' => 1010,
            ],
            [
                'name' => 'Makeup',
                'slug' => 'makeup',
                'description' => 'Face, lip, eye, nail, brush, and beauty tool products.',
                'image' => 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=900&q=80',
                'sort_order' => 1020,
            ],
            [
                'name' => 'Fragrance',
                'slug' => 'fragrance',
                'description' => 'Perfume, body mist, deodorant, and fragrance gift sets.',
                'image' => 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=80',
                'sort_order' => 1030,
            ],
            [
                'name' => 'Body Care',
                'slug' => 'body-care',
                'description' => 'Body wash, lotion, scrubs, hand care, foot care, and body treatments.',
                'image' => 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=80',
                'sort_order' => 1040,
            ],
            [
                'name' => 'Natural and Ayurvedic Beauty',
                'slug' => 'natural-ayurvedic-beauty',
                'description' => 'Herbal, natural, Ayurvedic, coconut, and botanical beauty products.',
                'image' => 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=80',
                'sort_order' => 1050,
            ],
            [
                'name' => 'Professional and Salon Supplies',
                'slug' => 'professional-salon-supplies',
                'description' => 'Salon-size products, professional tools, disposables, and salon equipment.',
                'image' => 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=80',
                'sort_order' => 1060,
            ],
            [
                'name' => 'Men Grooming',
                'slug' => 'men-grooming',
                'description' => 'Shaving, beard care, hair styling, deodorant, and men skin care products.',
                'image' => 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=900&q=80',
                'sort_order' => 1070,
            ],
        ];

        foreach ($topLevelCategories as $attributes) {
            Category::updateOrCreate(
                ['slug' => $attributes['slug']],
                [...$attributes, 'parent_id' => null, 'status' => 'active'],
            );
        }

        $children = [
            'skin-care' => [
                ['name' => 'Cleansers', 'slug' => 'cleansers', 'description' => 'Face wash, cleansing balm, cleansing oil, and micellar water.', 'sort_order' => 10],
                ['name' => 'Moisturizers', 'slug' => 'moisturizers', 'description' => 'Creams, gels, lotions, and barrier support moisturizers.', 'sort_order' => 20],
                ['name' => 'Serums and Treatments', 'slug' => 'serums-treatments', 'description' => 'Serums, ampoules, spot treatments, and active skin care.', 'sort_order' => 30],
                ['name' => 'Sunscreen', 'slug' => 'sunscreen', 'description' => 'SPF face and body sun protection products.', 'sort_order' => 40],
            ],
            'hair-care' => [
                ['name' => 'Shampoo', 'slug' => 'shampoo', 'description' => 'Daily, clarifying, anti-dandruff, and treatment shampoos.', 'sort_order' => 10],
                ['name' => 'Conditioner', 'slug' => 'conditioner', 'description' => 'Rinse-off, leave-in, and deep conditioners.', 'sort_order' => 20],
                ['name' => 'Hair Oils and Treatments', 'slug' => 'hair-oils-treatments', 'description' => 'Hair oils, masks, scalp serums, and repair treatments.', 'sort_order' => 30],
            ],
            'makeup' => [
                ['name' => 'Face Makeup', 'slug' => 'face-makeup', 'description' => 'Foundation, concealer, powder, blush, bronzer, and highlighter.', 'sort_order' => 10],
                ['name' => 'Lip Makeup', 'slug' => 'lip-makeup', 'description' => 'Lipstick, lip gloss, lip liner, tint, and balm.', 'sort_order' => 20],
                ['name' => 'Eye Makeup', 'slug' => 'eye-makeup', 'description' => 'Mascara, eyeliner, eyeshadow, brow, and lashes.', 'sort_order' => 30],
            ],
            'professional-salon-supplies' => [
                ['name' => 'Salon Tools', 'slug' => 'salon-tools', 'description' => 'Brushes, dryers, straighteners, curlers, and professional tools.', 'sort_order' => 10],
                ['name' => 'Salon Consumables', 'slug' => 'salon-consumables', 'description' => 'Disposables, towels, gloves, capes, and hygiene supplies.', 'sort_order' => 20],
            ],
        ];

        foreach ($children as $parentSlug => $items) {
            $parent = Category::where('slug', $parentSlug)->first();

            if (! $parent) {
                continue;
            }

            foreach ($items as $item) {
                Category::updateOrCreate(
                    ['slug' => $item['slug']],
                    [
                        ...$item,
                        'image' => null,
                        'parent_id' => $parent->id,
                        'status' => 'active',
                    ],
                );
            }
        }
    }

    private function seedBeautyAttributes(): void
    {
        if (! Schema::hasTable('attribute_groups') || ! Schema::hasTable('product_attributes')) {
            return;
        }

        $groups = [
            ['name' => 'Beauty Identity', 'description' => 'Brand, product line, product type, and seller authorization fields.', 'sort_order' => 100],
            ['name' => 'Beauty Suitability', 'description' => 'Skin, hair, concern, shade, scent, and usage suitability fields.', 'sort_order' => 110],
            ['name' => 'Beauty Compliance', 'description' => 'Ingredients, warnings, SPF, expiry, batch, and regulatory fields.', 'sort_order' => 120],
        ];

        foreach ($groups as $group) {
            $slug = Str::slug($group['name']);

            $this->stableUpsert(
                'attribute_groups',
                ['slug' => $slug],
                [
                    'name' => $group['name'],
                    'description' => $group['description'],
                    'sort_order' => $group['sort_order'],
                    'status' => 'active',
                ],
            );
        }

        $groupIds = DB::table('attribute_groups')->pluck('id', 'slug');
        $attributes = [
            ['group' => 'beauty-identity', 'name' => 'Brand Name', 'data_type' => 'text', 'unit' => null, 'is_required' => false, 'is_filterable' => true, 'is_variant_defining' => false, 'sort_order' => 10],
            ['group' => 'beauty-identity', 'name' => 'Product Line', 'data_type' => 'text', 'unit' => null, 'is_required' => false, 'is_filterable' => true, 'is_variant_defining' => false, 'sort_order' => 20],
            ['group' => 'beauty-identity', 'name' => 'Seller Authorization Status', 'data_type' => 'text', 'unit' => null, 'is_required' => false, 'is_filterable' => true, 'is_variant_defining' => false, 'sort_order' => 30],
            ['group' => 'beauty-suitability', 'name' => 'Skin Type', 'data_type' => 'text', 'unit' => null, 'is_required' => false, 'is_filterable' => true, 'is_variant_defining' => false, 'sort_order' => 10],
            ['group' => 'beauty-suitability', 'name' => 'Hair Type', 'data_type' => 'text', 'unit' => null, 'is_required' => false, 'is_filterable' => true, 'is_variant_defining' => false, 'sort_order' => 20],
            ['group' => 'beauty-suitability', 'name' => 'Beauty Concern', 'data_type' => 'text', 'unit' => null, 'is_required' => false, 'is_filterable' => true, 'is_variant_defining' => false, 'sort_order' => 30],
            ['group' => 'beauty-suitability', 'name' => 'Formulation', 'data_type' => 'text', 'unit' => null, 'is_required' => false, 'is_filterable' => true, 'is_variant_defining' => false, 'sort_order' => 40],
            ['group' => 'beauty-suitability', 'name' => 'Shade Family', 'data_type' => 'text', 'unit' => null, 'is_required' => false, 'is_filterable' => true, 'is_variant_defining' => true, 'sort_order' => 50],
            ['group' => 'beauty-suitability', 'name' => 'Finish', 'data_type' => 'text', 'unit' => null, 'is_required' => false, 'is_filterable' => true, 'is_variant_defining' => false, 'sort_order' => 60],
            ['group' => 'beauty-suitability', 'name' => 'Fragrance Family', 'data_type' => 'text', 'unit' => null, 'is_required' => false, 'is_filterable' => true, 'is_variant_defining' => false, 'sort_order' => 70],
            ['group' => 'beauty-suitability', 'name' => 'Volume Size', 'data_type' => 'text', 'unit' => null, 'is_required' => false, 'is_filterable' => true, 'is_variant_defining' => true, 'sort_order' => 80],
            ['group' => 'beauty-compliance', 'name' => 'Ingredient List', 'data_type' => 'text', 'unit' => null, 'is_required' => false, 'is_filterable' => false, 'is_variant_defining' => false, 'sort_order' => 10],
            ['group' => 'beauty-compliance', 'name' => 'SPF Rating', 'data_type' => 'number', 'unit' => null, 'is_required' => false, 'is_filterable' => true, 'is_variant_defining' => false, 'sort_order' => 20],
            ['group' => 'beauty-compliance', 'name' => 'Expiry Control Required', 'data_type' => 'boolean', 'unit' => null, 'is_required' => false, 'is_filterable' => true, 'is_variant_defining' => false, 'sort_order' => 30],
            ['group' => 'beauty-compliance', 'name' => 'Allergen Notes', 'data_type' => 'text', 'unit' => null, 'is_required' => false, 'is_filterable' => false, 'is_variant_defining' => false, 'sort_order' => 40],
        ];

        foreach ($attributes as $attribute) {
            $slug = Str::slug($attribute['name']);

            $this->stableUpsert(
                'product_attributes',
                ['slug' => $slug],
                [
                    'attribute_group_id' => $groupIds[$attribute['group']] ?? null,
                    'name' => $attribute['name'],
                    'data_type' => $attribute['data_type'],
                    'unit' => $attribute['unit'],
                    'is_required' => $attribute['is_required'],
                    'is_filterable' => $attribute['is_filterable'],
                    'is_variant_defining' => $attribute['is_variant_defining'],
                    'sort_order' => $attribute['sort_order'],
                    'status' => 'active',
                ],
            );
        }
    }

    private function seedCategoryAttributeTemplates(): void
    {
        if (! Schema::hasTable('category_attributes') || ! Schema::hasTable('product_attributes')) {
            return;
        }

        $categoryIds = DB::table('categories')->pluck('id', 'slug');
        $attributeIds = DB::table('product_attributes')->pluck('id', 'slug');

        $common = ['brand-name', 'product-line', 'seller-authorization-status', 'ingredient-list', 'expiry-control-required'];
        $mappings = [
            'skin-care' => [...$common, 'skin-type', 'beauty-concern', 'formulation', 'spf-rating', 'allergen-notes'],
            'cleansers' => [...$common, 'skin-type', 'beauty-concern', 'formulation', 'allergen-notes'],
            'moisturizers' => [...$common, 'skin-type', 'beauty-concern', 'formulation', 'volume-size', 'allergen-notes'],
            'serums-treatments' => [...$common, 'skin-type', 'beauty-concern', 'formulation', 'allergen-notes'],
            'sunscreen' => [...$common, 'skin-type', 'formulation', 'spf-rating', 'volume-size', 'allergen-notes'],
            'hair-care' => [...$common, 'hair-type', 'beauty-concern', 'formulation', 'volume-size', 'allergen-notes'],
            'shampoo' => [...$common, 'hair-type', 'beauty-concern', 'formulation', 'volume-size', 'allergen-notes'],
            'conditioner' => [...$common, 'hair-type', 'beauty-concern', 'formulation', 'volume-size', 'allergen-notes'],
            'hair-oils-treatments' => [...$common, 'hair-type', 'beauty-concern', 'formulation', 'volume-size', 'allergen-notes'],
            'makeup' => [...$common, 'shade-family', 'finish', 'formulation', 'volume-size', 'allergen-notes'],
            'face-makeup' => [...$common, 'skin-type', 'shade-family', 'finish', 'formulation', 'spf-rating', 'allergen-notes'],
            'lip-makeup' => [...$common, 'shade-family', 'finish', 'formulation', 'allergen-notes'],
            'eye-makeup' => [...$common, 'shade-family', 'finish', 'formulation', 'allergen-notes'],
            'fragrance' => [...$common, 'fragrance-family', 'volume-size', 'allergen-notes'],
            'body-care' => [...$common, 'skin-type', 'beauty-concern', 'fragrance-family', 'volume-size', 'allergen-notes'],
            'natural-ayurvedic-beauty' => [...$common, 'skin-type', 'hair-type', 'beauty-concern', 'formulation', 'volume-size', 'allergen-notes'],
            'professional-salon-supplies' => [...$common, 'hair-type', 'beauty-concern', 'volume-size'],
            'salon-tools' => ['brand-name', 'seller-authorization-status'],
            'salon-consumables' => [...$common, 'volume-size'],
            'men-grooming' => [...$common, 'skin-type', 'hair-type', 'beauty-concern', 'fragrance-family', 'volume-size', 'allergen-notes'],
        ];

        foreach ($mappings as $categorySlug => $attributeSlugs) {
            $categoryId = $categoryIds[$categorySlug] ?? null;

            if (! $categoryId) {
                continue;
            }

            foreach (array_values(array_unique($attributeSlugs)) as $index => $attributeSlug) {
                $attributeId = $attributeIds[$attributeSlug] ?? null;

                if (! $attributeId) {
                    continue;
                }

                $this->stableUpsert(
                    'category_attributes',
                    [
                        'category_id' => $categoryId,
                        'product_attribute_id' => $attributeId,
                    ],
                    [
                        'is_required' => false,
                        'is_filterable' => ! in_array($attributeSlug, ['ingredient-list', 'allergen-notes'], true),
                        'sort_order' => ($index + 1) * 10,
                        'status' => 'active',
                    ],
                );
            }
        }
    }

    private function stableUpsert(string $table, array $keys, array $values): void
    {
        $existing = DB::table($table)->where($keys)->first();

        if ($existing) {
            DB::table($table)
                ->where('id', $existing->id)
                ->update([
                    ...$values,
                    'updated_at' => now(),
                ]);

            return;
        }

        DB::table($table)->insert([
            ...$keys,
            ...$values,
            'uuid' => (string) Str::uuid(),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
