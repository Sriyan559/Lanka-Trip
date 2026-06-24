<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Database\Seeder;

class ProductImageSeeder extends Seeder
{
    public function run(): void
    {
        Product::query()->each(function (Product $product): void {
            $images = [
                $product->featured_image,
                sprintf(
                    'https://placehold.co/800x800/f8fafc/155e2c?text=%s+Detail',
                    rawurlencode($product->name),
                ),
                sprintf(
                    'https://placehold.co/800x800/ecfdf5/14532d?text=%s+Packaging',
                    rawurlencode($product->name),
                ),
            ];

            foreach ($images as $sortOrder => $image) {
                ProductImage::updateOrCreate(
                    [
                        'product_id' => $product->id,
                        'sort_order' => $sortOrder,
                    ],
                    ['image' => $image],
                );
            }
        });
    }
}
