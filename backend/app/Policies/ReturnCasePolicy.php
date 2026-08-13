<?php

namespace App\Policies;

use App\Models\ReturnCase;
use App\Models\User;

class ReturnCasePolicy
{
    public function viewAny(User $user): bool
    {
        return $user->hasPermission('returns.view');
    }

    public function view(User $user, ReturnCase $case): bool
    {
        return $user->hasPermission('returns.view');
    }

    public function create(User $user): bool
    {
        return $user->hasPermission('returns.review');
    }

    public function review(User $user, ReturnCase $case): bool
    {
        return $user->hasPermission('returns.review');
    }

    public function approve(User $user, ReturnCase $case): bool
    {
        return $user->hasPermission('returns.approve');
    }
}
