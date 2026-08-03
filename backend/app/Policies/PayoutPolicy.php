<?php

namespace App\Policies;

use App\Models\Payout;
use App\Models\User;

class PayoutPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->hasPermission('payouts.view');
    }

    public function view(User $user, Payout $payout): bool
    {
        return $user->hasPermission('payouts.view');
    }

    public function approve(User $user, Payout $payout): bool
    {
        return $user->hasPermission('payouts.approve');
    }

    public function process(User $user, Payout $payout): bool
    {
        return $user->hasPermission('payouts.process');
    }
}
