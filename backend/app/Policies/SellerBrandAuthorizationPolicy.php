<?php

namespace App\Policies;

use App\Models\Brand;
use App\Models\SellerBrandAuthorization;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Throwable;

class SellerBrandAuthorizationPolicy
{
    public function viewAny(User $user): bool
    {
        return in_array($user->role, ['admin', 'supplier'], true)
            && $this->featureEnabled('sl_beauty.brand_seller_verification');
    }

    public function view(User $user, SellerBrandAuthorization $authorization): bool
    {
        return $this->featureEnabled('sl_beauty.brand_seller_verification')
            && ($user->role === 'admin' || $this->ownsAuthorization($user, $authorization));
    }

    public function create(User $user, ?Brand $brand = null): bool
    {
        return $this->featureEnabled('sl_beauty.brand_seller_verification')
            && $user->role === 'supplier'
            && $user->supplier !== null
            && ($brand === null || $brand->status === 'active');
    }

    public function update(User $user, SellerBrandAuthorization $authorization): bool
    {
        return $this->featureEnabled('sl_beauty.brand_seller_verification')
            && $this->ownsAuthorization($user, $authorization)
            && in_array($authorization->status, ['draft', 'rejected'], true);
    }

    public function delete(User $user, SellerBrandAuthorization $authorization): bool
    {
        return $this->featureEnabled('sl_beauty.brand_seller_verification')
            && $this->ownsAuthorization($user, $authorization)
            && $authorization->status === 'draft';
    }

    public function submit(User $user, SellerBrandAuthorization $authorization): bool
    {
        return $this->featureEnabled('sl_beauty.brand_seller_verification')
            && $this->ownsAuthorization($user, $authorization)
            && in_array($authorization->status, ['draft', 'rejected'], true);
    }

    public function review(User $user, SellerBrandAuthorization $authorization): bool
    {
        return $user->role === 'admin'
            && $this->featureEnabled('sl_beauty.brand_seller_verification');
    }

    public function approve(User $user, SellerBrandAuthorization $authorization): bool
    {
        return $this->review($user, $authorization)
            && $authorization->status === 'submitted';
    }

    public function reject(User $user, SellerBrandAuthorization $authorization): bool
    {
        return $this->review($user, $authorization)
            && $authorization->status === 'submitted';
    }

    public function suspend(User $user, SellerBrandAuthorization $authorization): bool
    {
        return $this->review($user, $authorization)
            && $authorization->status === 'approved';
    }

    public function expire(User $user, SellerBrandAuthorization $authorization): bool
    {
        return $this->review($user, $authorization)
            && $authorization->status === 'approved';
    }

    private function ownsAuthorization(User $user, SellerBrandAuthorization $authorization): bool
    {
        return $user->role === 'supplier'
            && (int) ($user->supplier?->id ?? 0) === (int) $authorization->supplier_id;
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
