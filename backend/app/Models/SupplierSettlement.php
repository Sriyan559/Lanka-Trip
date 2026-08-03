<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class SupplierSettlement extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'uuid', 'settlement_number', 'supplier_id', 'currency', 'gross_amount',
        'commission_amount', 'refund_adjustment', 'other_adjustments', 'net_amount',
        'status', 'period_start', 'period_end', 'created_by', 'metadata',
    ];

    protected $hidden = ['metadata'];

    protected function casts(): array
    {
        return [
            'gross_amount' => 'decimal:2', 'commission_amount' => 'decimal:2',
            'refund_adjustment' => 'decimal:2', 'other_adjustments' => 'decimal:2',
            'net_amount' => 'decimal:2', 'period_start' => 'date', 'period_end' => 'date',
            'metadata' => 'array',
        ];
    }

    public function supplier(): BelongsTo
    {
        return $this->belongsTo(Supplier::class);
    }

    public function items(): HasMany
    {
        return $this->hasMany(SupplierSettlementItem::class);
    }

    public function payout()
    {
        return $this->hasOne(Payout::class);
    }
}
