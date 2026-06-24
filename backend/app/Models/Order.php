<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    public const STATUSES = [
        'pending',
        'confirmed',
        'production',
        'shipped',
        'completed',
        'cancelled',
    ];

    public const ALLOWED_TRANSITIONS = [
        'pending' => ['confirmed', 'cancelled'],
        'confirmed' => ['production', 'cancelled'],
        'production' => ['shipped', 'cancelled'],
        'shipped' => ['completed', 'cancelled'],
        'completed' => ['cancelled'],
        'cancelled' => [],
    ];

    protected $fillable = [
        'order_number',
        'buyer_id',
        'supplier_id',
        'quotation_id',
        'rfq_id',
        'total_amount',
        'currency',
        'payment_terms',
        'shipping_terms',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'total_amount' => 'decimal:2',
        ];
    }

    public function buyer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'buyer_id');
    }

    public function supplier(): BelongsTo
    {
        return $this->belongsTo(Supplier::class);
    }

    public function rfq(): BelongsTo
    {
        return $this->belongsTo(RFQ::class, 'rfq_id');
    }

    public function quotation(): BelongsTo
    {
        return $this->belongsTo(Quotation::class);
    }

    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    public function scopeAccessibleTo(Builder $query, User $user): Builder
    {
        return match ($user->role) {
            'admin' => $query,
            'supplier' => $query->where('supplier_id', $user->supplier?->id ?? 0),
            default => $query->where('buyer_id', $user->id),
        };
    }

    public function canTransitionTo(string $status): bool
    {
        return in_array($status, self::ALLOWED_TRANSITIONS[$this->status] ?? [], true);
    }
}
