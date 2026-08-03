<?php

namespace App\Policies;

use App\Models\EcosystemModule;
use App\Models\User;

class EcosystemModulePolicy
{
    public function viewAny(User $user): bool
    {
        return $user->hasPermission('ecosystem.modules.view');
    }

    public function view(User $user, EcosystemModule $module): bool
    {
        return $user->hasPermission('ecosystem.modules.view');
    }

    public function configure(User $user, EcosystemModule $module): bool
    {
        return $user->hasPermission('ecosystem.modules.configure');
    }
}
