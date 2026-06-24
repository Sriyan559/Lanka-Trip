<?php

namespace App\Policies;

use App\Models\ProductReview;
use App\Models\SupplierReview;
use App\Models\User;

class ReviewPolicy
{
    public function create(User $user): bool
    {
        return $user->status === 'active';
    }

    public function update(User $user, ProductReview|SupplierReview $review): bool
    {
        return $review->user_id === $user->id;
    }

    public function delete(User $user, ProductReview|SupplierReview $review): bool
    {
        return $user->role === 'admin' || $this->update($user, $review);
    }
}
