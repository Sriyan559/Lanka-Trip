<?php

namespace Tests\Feature;

use App\Models\Product;
use App\Models\Supplier;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;

class ReviewsRatingsApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_user_can_create_product_review(): void
    {
        $user = User::factory()->create();
        $product = Product::factory()->create();

        $this->withToken($user->createToken('test')->plainTextToken)
            ->postJson("/api/products/{$product->id}/reviews", [
                'rating' => 5,
                'title' => 'Excellent Quality',
                'review' => 'Very good products and packaging.',
            ])
            ->assertCreated()
            ->assertJsonPath('success', true)
            ->assertJsonPath('review.rating', 5)
            ->assertJsonPath('review.user.id', $user->id)
            ->assertJsonPath('average_rating', 5)
            ->assertJsonPath('total_reviews', 1);

        $this->assertDatabaseHas('product_reviews', [
            'product_id' => $product->id,
            'user_id' => $user->id,
            'rating' => 5,
        ]);
    }

    public function test_existing_product_review_is_updated_instead_of_duplicated(): void
    {
        $user = User::factory()->create();
        $product = Product::factory()->create();
        $token = $user->createToken('test')->plainTextToken;

        $this->withToken($token)->postJson("/api/products/{$product->id}/reviews", [
            'rating' => 3,
            'title' => 'Good',
        ])->assertCreated();

        $this->withToken($token)->postJson("/api/products/{$product->id}/reviews", [
            'rating' => 5,
            'title' => 'Excellent',
        ])
            ->assertOk()
            ->assertJsonPath('review.rating', 5)
            ->assertJsonPath('review.title', 'Excellent')
            ->assertJsonPath('total_reviews', 1);

        $this->assertDatabaseCount('product_reviews', 1);
    }

    public function test_product_reviews_are_public_paginated_and_include_aggregates(): void
    {
        $product = Product::factory()->create();
        $firstUser = User::factory()->create(['name' => 'First Buyer']);
        $secondUser = User::factory()->create(['name' => 'Second Buyer']);
        $product->reviews()->create([
            'user_id' => $firstUser->id,
            'rating' => 5,
            'title' => 'Excellent',
        ]);
        $product->reviews()->create([
            'user_id' => $secondUser->id,
            'rating' => 3,
            'title' => 'Good',
        ]);
        $product->update(['average_rating' => 4, 'reviews_count' => 2]);

        $this->getJson("/api/products/{$product->id}/reviews")
            ->assertOk()
            ->assertJsonPath('average_rating', 4)
            ->assertJsonPath('total_reviews', 2)
            ->assertJsonCount(2, 'reviews')
            ->assertJsonPath('per_page', 20)
            ->assertJsonStructure(['reviews' => [['id', 'rating', 'title', 'review', 'user']]]);
    }

    public function test_authenticated_user_can_create_supplier_review(): void
    {
        $user = User::factory()->create();
        $supplier = Supplier::factory()->create();

        $this->withToken($user->createToken('test')->plainTextToken)
            ->postJson("/api/suppliers/{$supplier->id}/reviews", [
                'rating' => 4,
                'title' => 'Reliable Supplier',
                'review' => 'Fast communication and delivery.',
            ])
            ->assertCreated()
            ->assertJsonPath('review.rating', 4)
            ->assertJsonPath('average_rating', 4)
            ->assertJsonPath('total_reviews', 1);
    }

    public function test_existing_supplier_review_is_updated_instead_of_duplicated(): void
    {
        $user = User::factory()->create();
        $supplier = Supplier::factory()->create();
        $token = $user->createToken('test')->plainTextToken;

        $this->withToken($token)->postJson("/api/suppliers/{$supplier->id}/reviews", [
            'rating' => 2,
        ])->assertCreated();

        $this->withToken($token)->postJson("/api/suppliers/{$supplier->id}/reviews", [
            'rating' => 4,
            'title' => 'Improved',
        ])
            ->assertOk()
            ->assertJsonPath('review.rating', 4)
            ->assertJsonPath('total_reviews', 1);

        $this->assertDatabaseCount('supplier_reviews', 1);
    }

    public function test_supplier_reviews_are_public_paginated_and_include_aggregates(): void
    {
        $supplier = Supplier::factory()->create();
        $user = User::factory()->create();
        $supplier->reviews()->create([
            'user_id' => $user->id,
            'rating' => 5,
            'title' => 'Trusted',
        ]);
        $supplier->update(['rating' => 5, 'reviews_count' => 1]);

        $this->getJson("/api/suppliers/{$supplier->id}/reviews")
            ->assertOk()
            ->assertJsonPath('average_rating', 5)
            ->assertJsonPath('total_reviews', 1)
            ->assertJsonCount(1, 'reviews')
            ->assertJsonPath('reviews.0.user.name', $user->name)
            ->assertJsonPath('per_page', 20);
    }

    public function test_average_ratings_are_recalculated_after_each_review(): void
    {
        $product = Product::factory()->create();
        $supplier = Supplier::factory()->create();
        $firstUser = User::factory()->create();
        $secondUser = User::factory()->create();

        foreach ([[$firstUser, 5], [$secondUser, 3]] as [$user, $rating]) {
            $token = $user->createToken('reviews')->plainTextToken;
            Auth::forgetGuards();
            $this->withToken($token)
                ->postJson("/api/products/{$product->id}/reviews", ['rating' => $rating])
                ->assertSuccessful();
            Auth::forgetGuards();
            $this->withToken($token)
                ->postJson("/api/suppliers/{$supplier->id}/reviews", ['rating' => $rating])
                ->assertSuccessful();
        }

        $this->assertSame('4.00', $product->refresh()->average_rating);
        $this->assertSame(2, $product->reviews_count);
        $this->assertSame('4.00', $supplier->refresh()->rating);
        $this->assertSame(2, $supplier->reviews_count);
    }

    public function test_review_creation_requires_authentication_and_valid_rating(): void
    {
        $product = Product::factory()->create();
        $supplier = Supplier::factory()->create();

        $this->postJson("/api/products/{$product->id}/reviews", ['rating' => 5])
            ->assertUnauthorized();
        $this->postJson("/api/suppliers/{$supplier->id}/reviews", ['rating' => 4])
            ->assertUnauthorized();

        $user = User::factory()->create();
        $token = $user->createToken('test')->plainTextToken;

        $this->withToken($token)
            ->postJson("/api/products/{$product->id}/reviews", ['rating' => 6])
            ->assertUnprocessable()
            ->assertJsonValidationErrors('rating');
    }
}
