<?php

namespace App\Policies;

use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Throwable;

class ProductVariantPolicy
{
    public function viewAny(?User $user): bool
    {
        return $this->featureEnabled('sl_beauty.taxonomy', true);
    }

    public function view(?User $user, ProductVariant $variant): bool
    {
        if (! $this->featureEnabled('sl_beauty.taxonomy', true)) {
            return false;
        }

        if ($user?->role === 'admin' || $this->ownsProduct($user, $variant->product)) {
            return true;
        }

        return $variant->status === 'active'
            && (bool) $variant->is_active
            && $variant->product?->status === 'active';
    }

    public function create(User $user, ?Product $product = null): bool
    {
        return $this->featureEnabled('sl_beauty.taxonomy', true)
            && $product !== null
            && $this->ownsProduct($user, $product);
    }

    public function update(User $user, ProductVariant $variant): bool
    {
        return $this->featureEnabled('sl_beauty.taxonomy', true)
            && $this->ownsProduct($user, $variant->product);
    }

    public function delete(User $user, ProductVariant $variant): bool
    {
        return $this->update($user, $variant);
    }

    public function changeStatus(User $user, ProductVariant $variant): bool
    {
        return $this->update($user, $variant);
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
