<?php

namespace App\Policies;

use App\Models\Product;
use App\Models\User;

class ProductPolicy
{
    public function before(User $user): ?bool
    {
        return $user->role === 'admin' ? true : null;
    }

    public function viewAny(?User $user): bool
    {
        return true;
    }

    public function view(?User $user, Product $product): bool
    {
        return $product->status === 'active'
            || ($user?->role === 'supplier' && $user->supplier?->id === $product->supplier_id);
    }

    public function create(User $user): bool
    {
        return $user->role === 'supplier' && $user->supplier !== null;
    }

    public function update(User $user, Product $product): bool
    {
        return $user->role === 'supplier'
            && (int) ($user->supplier?->id ?? 0) === (int) $product->supplier_id;
    }

    public function delete(User $user, Product $product): bool
    {
        return $this->update($user, $product);
    }
}
