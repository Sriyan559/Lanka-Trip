<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Payment extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'uuid',
        'order_id',
        'invoice_id',
        'payment_method_id',
        'payer_user_id',
        'currency_id',
        'payment_number',
        'amount',
        'fee_amount',
        'status',
        'payment_status',
        'gateway_reference',
        'authorized_at',
        'paid_at',
        'failed_at',
        'gateway_response',
        'metadata',
    ];

    protected function casts(): array
    {
        return [
            'amount' => 'decimal:2',
            'fee_amount' => 'decimal:2',
            'authorized_at' => 'datetime',
            'paid_at' => 'datetime',
            'failed_at' => 'datetime',
            'gateway_response' => 'array',
            'metadata' => 'array',
        ];
    }

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    public function method(): BelongsTo
    {
        return $this->belongsTo(PaymentMethod::class, 'payment_method_id');
    }

    public function transactions(): HasMany
    {
        return $this->hasMany(PaymentTransaction::class);
    }
}
