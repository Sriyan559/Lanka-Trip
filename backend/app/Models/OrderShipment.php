<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class OrderShipment extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'uuid',
        'order_id',
        'country_id',
        'shipment_number',
        'carrier',
        'tracking_number',
        'shipping_method',
        'origin_port',
        'destination_port',
        'estimated_ship_date',
        'estimated_delivery_date',
        'shipped_at',
        'delivered_at',
        'status',
        'metadata',
    ];

    protected function casts(): array
    {
        return [
            'estimated_ship_date' => 'date',
            'estimated_delivery_date' => 'date',
            'shipped_at' => 'datetime',
            'delivered_at' => 'datetime',
            'metadata' => 'array',
        ];
    }

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }
}
