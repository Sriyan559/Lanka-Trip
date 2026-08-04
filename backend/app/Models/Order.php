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
        'uuid',
        'buyer_profile_id',
        'currency_id',
        'subtotal',
        'tax_amount',
        'shipping_amount',
        'discount_amount',
        'platform_fee_amount',
        'payment_status',
        'fulfillment_status',
        'approval_status',
        'order_source',
        'delivery_terms',
        'payment_method_slug',
        'checkout_customer',
        'checkout_delivery_address',
        'confirmed_at',
        'expected_delivery_date',
    ];

    protected function casts(): array
    {
        return [
            'total_amount' => 'decimal:2',
            'subtotal' => 'decimal:2',
            'tax_amount' => 'decimal:2',
            'shipping_amount' => 'decimal:2',
            'discount_amount' => 'decimal:2',
            'platform_fee_amount' => 'decimal:2',
            'checkout_customer' => 'array',
            'checkout_delivery_address' => 'array',
            'confirmed_at' => 'datetime',
            'expected_delivery_date' => 'date',
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

    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class);
    }

    public function statusHistories(): HasMany
    {
        return $this->hasMany(OrderStatusHistory::class);
    }

    public function shipments(): HasMany
    {
        return $this->hasMany(OrderShipment::class);
    }

    public function returnCases(): HasMany
    {
        return $this->hasMany(ReturnCase::class);
    }

    public function supportCases(): HasMany
    {
        return $this->hasMany(SupportCase::class, 'related_order_id');
    }

    public function scopeAccessibleTo(Builder $query, User $user): Builder
    {
        return match ($user->role) {
            'admin', 'super_admin' => $query,
            'supplier' => $query->where('supplier_id', $user->supplier?->id ?? 0),
            default => $query->where('buyer_id', $user->id),
        };
    }

    public function canTransitionTo(string $status): bool
    {
        return in_array($status, self::ALLOWED_TRANSITIONS[$this->status] ?? [], true);
    }
}
