<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class SupplierStorefrontSeeder extends Seeder
{
    public function run(): void
    {
        $suppliers = DB::table('suppliers')->get();

        foreach ($suppliers as $supplier) {
            $storefront = DB::table('supplier_storefronts')
                ->where('supplier_id', $supplier->id)
                ->first();

            $storefrontPayload = [
                'supplier_id' => $supplier->id,
                'company_profile_id' => DB::table('company_profiles')->where('supplier_id', $supplier->id)->value('id'),
                'logo_upload_id' => null,
                'banner_upload_id' => null,
                'storefront_slug' => $supplier->storefront_slug ?: $supplier->slug,
                'title' => $supplier->company_name,
                'subtitle' => $supplier->business_type,
                'description' => $supplier->description,
                'layout_config' => json_encode(['template' => 'supplier_showcase', 'density' => 'standard']),
                'media_settings' => json_encode(['show_cover' => true, 'show_video' => true]),
                'published_at' => now(),
                'status' => 'published',
                'metadata' => null,
                'updated_at' => now(),
            ];

            if ($storefront) {
                DB::table('supplier_storefronts')->where('id', $storefront->id)->update($storefrontPayload);
                $storefrontId = $storefront->id;
            } else {
                $storefrontId = DB::table('supplier_storefronts')->insertGetId([
                    ...$storefrontPayload,
                    'uuid' => (string) Str::uuid(),
                    'created_at' => now(),
                ]);
            }

            DB::table('suppliers')->where('id', $supplier->id)->update([
                'storefront_slug' => $storefrontPayload['storefront_slug'],
                'storefront_status' => 'published',
                'trust_score' => 82.50,
                'trust_level' => 'verified',
                'profile_completion_score' => 85.00,
                'response_rate' => 92.00,
                'average_response_time_hours' => 18.00,
                'review_count' => $supplier->reviews_count ?? 0,
                'average_rating' => $supplier->rating ?? 0,
                'updated_at' => now(),
            ]);

            $this->seedTrustScore($supplier);
            $this->seedSections($storefrontId);
            $this->seedShowcaseProducts($supplier, $storefrontId);
        }
    }

    private function seedTrustScore(object $supplier): void
    {
        $existing = DB::table('supplier_trust_scores')->where('supplier_id', $supplier->id)->first();
        $payload = [
            'supplier_id' => $supplier->id,
            'trust_score' => 82.50,
            'trust_level' => 'verified',
            'scoring_details' => json_encode([
                'verification' => 20,
                'profile_completion' => 25,
                'reviews' => 20,
                'response_performance' => 17.5,
            ]),
            'status' => 'active',
            'metadata' => null,
            'updated_at' => now(),
        ];

        if ($existing) {
            DB::table('supplier_trust_scores')->where('id', $existing->id)->update($payload);

            return;
        }

        DB::table('supplier_trust_scores')->insert([
            ...$payload,
            'uuid' => (string) Str::uuid(),
            'created_at' => now(),
        ]);
    }

    private function seedSections(int $storefrontId): void
    {
        $sections = [
            ['section_key' => 'hero', 'section_type' => 'hero', 'title' => 'Company Overview', 'sort_order' => 10],
            ['section_key' => 'products', 'section_type' => 'product_grid', 'title' => 'Featured Products', 'sort_order' => 20],
            ['section_key' => 'quality', 'section_type' => 'quality_controls', 'title' => 'Quality & Certifications', 'sort_order' => 30],
            ['section_key' => 'factory', 'section_type' => 'media_gallery', 'title' => 'Factory Tour', 'sort_order' => 40],
        ];

        foreach ($sections as $section) {
            $existing = DB::table('supplier_storefront_sections')
                ->where('supplier_storefront_id', $storefrontId)
                ->where('section_key', $section['section_key'])
                ->first();

            $payload = [
                'supplier_storefront_id' => $storefrontId,
                'section_key' => $section['section_key'],
                'section_type' => $section['section_type'],
                'title' => $section['title'],
                'content' => null,
                'layout_config' => json_encode(['columns' => $section['section_type'] === 'product_grid' ? 3 : 1]),
                'sort_order' => $section['sort_order'],
                'is_visible' => true,
                'status' => 'active',
                'metadata' => null,
                'updated_at' => now(),
            ];

            if ($existing) {
                DB::table('supplier_storefront_sections')->where('id', $existing->id)->update($payload);

                continue;
            }

            DB::table('supplier_storefront_sections')->insert([
                ...$payload,
                'uuid' => (string) Str::uuid(),
                'created_at' => now(),
            ]);
        }
    }

    private function seedShowcaseProducts(object $supplier, int $storefrontId): void
    {
        $products = DB::table('products')
            ->where('supplier_id', $supplier->id)
            ->orderByDesc('is_featured')
            ->orderBy('name')
            ->limit(3)
            ->get();

        foreach ($products as $index => $product) {
            $existing = DB::table('supplier_showcase_products')
                ->where('supplier_id', $supplier->id)
                ->where('product_id', $product->id)
                ->first();

            $payload = [
                'supplier_id' => $supplier->id,
                'product_id' => $product->id,
                'supplier_storefront_id' => $storefrontId,
                'title' => $product->name,
                'description' => $product->short_description,
                'sort_order' => ($index + 1) * 10,
                'is_featured' => (bool) $product->is_featured,
                'status' => 'active',
                'metadata' => null,
                'updated_at' => now(),
            ];

            if ($existing) {
                DB::table('supplier_showcase_products')->where('id', $existing->id)->update($payload);

                continue;
            }

            DB::table('supplier_showcase_products')->insert([
                ...$payload,
                'uuid' => (string) Str::uuid(),
                'created_at' => now(),
            ]);
        }
    }
}
