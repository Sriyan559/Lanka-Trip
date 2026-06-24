<?php

namespace App\Policies;

use App\Models\Supplier;
use App\Models\User;

class SupplierPolicy
{
    public function before(User $user): ?bool
    {
        return $user->role === 'admin' ? true : null;
    }

    public function viewAny(?User $user): bool
    {
        return true;
    }

    public function view(?User $user, Supplier $supplier): bool
    {
        return $supplier->status === 'active' || $user?->id === $supplier->user_id;
    }

    public function update(User $user, Supplier $supplier): bool
    {
        return $user->role === 'supplier' && $user->id === $supplier->user_id;
    }

    public function verify(User $user, Supplier $supplier): bool
    {
        return $user->role === 'admin';
    }
}
