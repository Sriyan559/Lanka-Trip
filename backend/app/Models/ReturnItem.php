<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ReturnItem extends Model
{
    protected $fillable = [
        'return_case_id', 'order_item_id', 'quantity', 'condition',
        'inspection_status', 'approved_refund_amount',
    ];

    protected function casts(): array
    {
        return ['quantity' => 'decimal:3', 'approved_refund_amount' => 'decimal:2'];
    }

    public function returnCase(): BelongsTo
    {
        return $this->belongsTo(ReturnCase::class);
    }

    public function orderItem(): BelongsTo
    {
        return $this->belongsTo(OrderItem::class);
    }
}
