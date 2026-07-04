<?php

namespace App\Policies;

use App\Models\Product;
use App\Models\ProductBeautyProfile;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Throwable;

class ProductBeautyProfilePolicy
{
    public function viewAny(?User $user): bool
    {
        return $this->featureEnabled('sl_beauty.taxonomy', true);
    }

    public function view(?User $user, ProductBeautyProfile $profile): bool
    {
        if (! $this->featureEnabled('sl_beauty.taxonomy', true)) {
            return false;
        }

        if ($user?->role === 'admin' || $this->ownsProduct($user, $profile->product)) {
            return true;
        }

        return $profile->product?->status === 'active'
            && in_array($profile->compliance_status, ['not_required', 'approved'], true);
    }

    public function create(User $user, ?Product $product = null): bool
    {
        if (! $this->featureEnabled('sl_beauty.taxonomy', true)) {
            return false;
        }

        return $user->role === 'admin'
            || ($product !== null && $this->ownsProduct($user, $product));
    }

    public function update(User $user, ProductBeautyProfile $profile): bool
    {
        if (! $this->featureEnabled('sl_beauty.taxonomy', true)) {
            return false;
        }

        if ($user->role === 'admin') {
            return true;
        }

        return $this->ownsProduct($user, $profile->product)
            && ! in_array($profile->compliance_status, ['pending_review', 'approved'], true);
    }

    public function submitCompliance(User $user, ProductBeautyProfile $profile): bool
    {
        return $this->featureEnabled('sl_beauty.compliance_workflows')
            && $this->ownsProduct($user, $profile->product)
            && in_array($profile->compliance_status, ['not_required', 'changes_requested', 'rejected'], true);
    }

    public function review(User $user, ProductBeautyProfile $profile): bool
    {
        return $user->role === 'admin'
            && $this->featureEnabled('sl_beauty.compliance_workflows');
    }

    private function ownsProduct(?User $user, ?Product $product): bool
    {
        return $user?->role === 'supplier'
            && (int) ($user->supplier?->id ?? 0) === (int) ($product?->supplier_id ?? 0);
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
