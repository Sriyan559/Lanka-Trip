<?php

namespace App\Policies;

use App\Models\Quotation;
use App\Models\RFQ;
use App\Models\User;

class QuotationPolicy
{
    public function before(User $user): ?bool
    {
        return $user->role === 'admin' ? true : null;
    }

    public function create(User $user, RFQ $rfq): bool
    {
        return $user->role === 'supplier'
            && $user->supplier !== null
            && $rfq->status === 'open';
    }

    public function view(User $user, Quotation $quotation): bool
    {
        return $quotation->rfq?->user_id === $user->id
            || ($user->role === 'supplier'
                && (int) ($user->supplier?->id ?? 0) === (int) $quotation->supplier_id);
    }

    public function update(User $user, Quotation $quotation): bool
    {
        return $user->role === 'supplier'
            && (int) ($user->supplier?->id ?? 0) === (int) $quotation->supplier_id;
    }

    public function accept(User $user, Quotation $quotation): bool
    {
        return $quotation->rfq?->user_id === $user->id;
    }

    public function reject(User $user, Quotation $quotation): bool
    {
        return $quotation->rfq?->user_id === $user->id;
    }
}
