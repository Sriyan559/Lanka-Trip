<?php

namespace App\Policies;

use App\Models\SupportCase;
use App\Models\User;

class SupportCasePolicy
{
    public function viewAny(User $user): bool
    {
        return $user->hasPermission('support.cases.view');
    }

    public function view(User $user, SupportCase $case): bool
    {
        return $user->hasPermission('support.cases.view');
    }

    public function create(User $user): bool
    {
        return $user->hasPermission('support.cases.reply');
    }

    public function assign(User $user, SupportCase $case): bool
    {
        return $user->hasPermission('support.cases.assign');
    }

    public function reply(User $user, SupportCase $case): bool
    {
        return $user->hasPermission('support.cases.reply');
    }

    public function resolve(User $user, SupportCase $case): bool
    {
        return $user->hasPermission('support.cases.resolve');
    }
}
