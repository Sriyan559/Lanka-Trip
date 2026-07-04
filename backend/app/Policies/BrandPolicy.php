<?php

namespace App\Policies;

use App\Models\Brand;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Throwable;

class BrandPolicy
{
    public function viewAny(?User $user): bool
    {
        return $this->featureEnabled('sl_beauty.taxonomy', true);
    }

    public function view(?User $user, Brand $brand): bool
    {
        if (! $this->featureEnabled('sl_beauty.taxonomy', true)) {
            return false;
        }

        if ($user?->role === 'admin') {
            return true;
        }

        if ($user?->role === 'supplier') {
            return $brand->status === 'active';
        }

        return $brand->status === 'active' && (bool) $brand->is_verified;
    }

    public function create(User $user): bool
    {
        return $user->role === 'admin'
            && $this->featureEnabled('sl_beauty.brand_seller_verification');
    }

    public function update(User $user, Brand $brand): bool
    {
        return $this->create($user);
    }

    public function delete(User $user, Brand $brand): bool
    {
        return $this->create($user);
    }

    public function verify(User $user, Brand $brand): bool
    {
        return $this->create($user);
    }

    public function changeStatus(User $user, Brand $brand): bool
    {
        return $this->create($user);
    }

    private function featureEnabled(string $featureKey, bool $default = false): bool
    {
        try {
            if (Schema::hasTable('feature_flags')) {
                $flag = DB::table('feature_flags')
                    ->where('feature_key', $featureKey)
                    ->where('status', 'active')
                    ->first();

                return $flag !== null ? (bool) $flag->is_enabled : $default;
            }
        } catch (Throwable) {
            return $default;
        }

        return $default;
    }
}
