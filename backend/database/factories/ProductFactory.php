<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Product>
 */
class ProductFactory extends Factory
{
    protected $model = Product::class;

    public function definition(): array
    {
        $name = fake()->unique()->words(4, true);

        return [
            'category_id' => Category::factory(),
            'supplier_id' => null,
            'name' => Str::title($name),
            'slug' => Str::slug($name).'-'.fake()->unique()->numberBetween(1, 99999),
            'short_description' => fake()->sentence(12),
            'description' => fake()->paragraphs(3, true),
            'price' => fake()->randomFloat(2, 1, 500),
            'moq' => fake()->numberBetween(1, 1000),
            'unit' => fake()->randomElement(['Kg', 'Piece', 'Litre', 'Carat', 'Metre']),
            'supply_ability' => fake()->numberBetween(1000, 10000).' units per month',
            'lead_time' => fake()->numberBetween(7, 30).' days',
            'port' => 'Colombo, Sri Lanka',
            'packaging_details' => fake()->sentence(),
            'featured_image' => fake()->imageUrl(800, 800, 'business'),
            'status' => 'active',
            'is_featured' => false,
            'views_count' => fake()->numberBetween(0, 10000),
        ];
    }

    public function featured(): static
    {
        return $this->state(fn () => ['is_featured' => true]);
    }

    public function inactive(): static
    {
        return $this->state(fn () => ['status' => 'inactive']);
    }
}
