<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Product;
use App\Models\Supplier;
use Database\Seeders\ProductImageSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProductImageSeederTest extends TestCase
{
    use RefreshDatabase;

    public function test_product_without_featured_image_receives_non_null_fallback_images(): void
    {
        $product = Product::factory()->create([
            'category_id' => Category::factory(),
            'supplier_id' => Supplier::factory(),
            'slug' => 'product-without-a-gallery',
            'featured_image' => null,
        ]);

        $this->seed(ProductImageSeeder::class);
        $this->seed(ProductImageSeeder::class);

        $images = $product->images()->get();

        $this->assertCount(2, $images);
        $this->assertSame([0, 1], $images->pluck('sort_order')->all());
        $this->assertTrue($images->every(
            fn ($image): bool => is_string($image->image) && $image->image !== '',
        ));
    }
}
