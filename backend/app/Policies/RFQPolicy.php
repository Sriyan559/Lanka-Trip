<?php

namespace App\Policies;

use App\Models\RFQ;
use App\Models\User;

class RFQPolicy
{
    public function before(User $user): ?bool
    {
        return $user->role === 'admin' ? true : null;
    }

    public function viewAny(User $user): bool
    {
        return in_array($user->role, ['buyer', 'supplier'], true);
    }

    public function view(User $user, RFQ $rfq): bool
    {
        return $rfq->user_id === $user->id
            || ($user->role === 'supplier' && (
                $rfq->status === 'open'
                || $rfq->quotations()
                    ->where('supplier_id', $user->supplier?->id ?? 0)
                    ->exists()
            ));
    }

    public function create(User $user): bool
    {
        return $user->role === 'buyer';
    }

    public function update(User $user, RFQ $rfq): bool
    {
        return $rfq->user_id === $user->id;
    }

    public function delete(User $user, RFQ $rfq): bool
    {
        return $rfq->user_id === $user->id;
    }
}
