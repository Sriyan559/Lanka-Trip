<?php

namespace Database\Factories;

use App\Models\Supplier;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Supplier>
 */
class SupplierFactory extends Factory
{
    protected $model = Supplier::class;

    public function definition(): array
    {
        $company = fake()->unique()->company();

        return [
            'user_id' => User::factory()->state(['role' => 'supplier']),
            'company_name' => $company,
            'slug' => Str::slug($company).'-'.fake()->unique()->numberBetween(1, 99999),
            'logo' => fake()->imageUrl(240, 240, 'business'),
            'cover_image' => fake()->imageUrl(1200, 320, 'business'),
            'description' => fake()->paragraphs(3, true),
            'country' => 'Sri Lanka',
            'city' => fake()->randomElement(['Colombo', 'Kandy', 'Galle', 'Kurunegala']),
            'address' => fake()->address(),
            'phone' => fake()->phoneNumber(),
            'email' => fake()->unique()->companyEmail(),
            'website' => fake()->url(),
            'business_type' => fake()->randomElement([
                'Manufacturer',
                'Exporter',
                'Manufacturer / Exporter',
            ]),
            'verification_status' => 'verified',
            'is_featured' => false,
            'rating' => fake()->randomFloat(2, 3.5, 5),
            'status' => 'active',
        ];
    }

    public function inactive(): static
    {
        return $this->state(fn () => ['status' => 'inactive']);
    }

    public function pending(): static
    {
        return $this->state(fn () => ['verification_status' => 'pending']);
    }
}
