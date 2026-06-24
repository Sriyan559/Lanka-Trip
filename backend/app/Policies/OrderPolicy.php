<?php

namespace App\Policies;

use App\Models\Order;
use App\Models\Quotation;
use App\Models\User;

class OrderPolicy
{
    public function before(User $user): ?bool
    {
        return $user->role === 'admin' ? true : null;
    }

    public function create(User $user, Quotation $quotation): bool
    {
        return $user->role === 'buyer'
            && $quotation->rfq?->user_id === $user->id;
    }

    public function view(User $user, Order $order): bool
    {
        return $order->buyer_id === $user->id
            || ($user->role === 'supplier'
                && (int) ($user->supplier?->id ?? 0) === (int) $order->supplier_id);
    }

    public function updateStatus(User $user, Order $order): bool
    {
        return $user->role === 'supplier'
            && (int) ($user->supplier?->id ?? 0) === (int) $order->supplier_id;
    }
}
