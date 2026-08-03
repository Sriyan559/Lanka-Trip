<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Payout extends Model
{
    use SoftDeletes;

    public const STATUSES = ['draft', 'pending', 'approved', 'processing', 'paid', 'failed', 'cancelled', 'reversed'];

    public const TRANSITIONS = [
        'draft' => ['pending', 'cancelled'],
        'pending' => ['approved', 'cancelled'],
        'approved' => ['processing', 'cancelled'],
        'processing' => ['paid', 'failed'],
        'paid' => ['reversed'],
        'failed' => ['processing', 'cancelled'],
        'cancelled' => [],
        'reversed' => [],
    ];

    protected $fillable = [
        'uuid', 'payout_number', 'supplier_id', 'supplier_settlement_id', 'currency',
        'gross_amount', 'commission_amount', 'refund_adjustment', 'other_adjustments',
        'net_amount', 'status', 'approved_by', 'approved_at', 'processed_at', 'paid_at',
        'failed_at', 'failure_reason', 'payment_reference', 'period_start', 'period_end', 'metadata',
    ];

    protected $hidden = ['metadata'];

    protected function casts(): array
    {
        return [
            'gross_amount' => 'decimal:2', 'commission_amount' => 'decimal:2',
            'refund_adjustment' => 'decimal:2', 'other_adjustments' => 'decimal:2',
            'net_amount' => 'decimal:2', 'approved_at' => 'datetime', 'processed_at' => 'datetime',
            'paid_at' => 'datetime', 'failed_at' => 'datetime', 'period_start' => 'date',
            'period_end' => 'date', 'metadata' => 'array',
        ];
    }

    public function supplier(): BelongsTo
    {
        return $this->belongsTo(Supplier::class);
    }

    public function settlement(): BelongsTo
    {
        return $this->belongsTo(SupplierSettlement::class, 'supplier_settlement_id');
    }

    public function approver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    public function items(): HasMany
    {
        return $this->hasMany(PayoutItem::class);
    }

    public function canTransitionTo(string $status): bool
    {
        return in_array($status, self::TRANSITIONS[$this->status] ?? [], true);
    }
}
