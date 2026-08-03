<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SupplierSettlementItem extends Model
{
    protected $fillable = [
        'supplier_settlement_id', 'order_item_id', 'gross_amount', 'commission_amount',
        'refund_adjustment', 'net_amount', 'metadata',
    ];

    protected $hidden = ['metadata'];

    protected function casts(): array
    {
        return [
            'gross_amount' => 'decimal:2', 'commission_amount' => 'decimal:2',
            'refund_adjustment' => 'decimal:2', 'net_amount' => 'decimal:2', 'metadata' => 'array',
        ];
    }

    public function settlement(): BelongsTo
    {
        return $this->belongsTo(SupplierSettlement::class, 'supplier_settlement_id');
    }

    public function orderItem(): BelongsTo
    {
        return $this->belongsTo(OrderItem::class);
    }
}
