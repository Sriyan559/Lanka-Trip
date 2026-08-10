<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Shipment extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'shipments';

    protected $fillable = [
        'uuid',
        'order_id',
        'supplier_id',
        'buyer_profile_id',
        'logistics_partner_id',
        'shipment_method_id',
        'origin_country_id',
        'destination_country_id',
        'origin_port_id',
        'destination_port_id',
        'delivery_address_id',
        'shipment_number',
        'tracking_number',
        'carrier_reference',
        'incoterm',
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

    public function supplier(): BelongsTo
    {
        return $this->belongsTo(Supplier::class);
    }

    public function logisticsPartner(): BelongsTo
    {
        return $this->belongsTo(DB::table('logistics_partners')->whereNull('deleted_at')->first() ? Model::class : Model::class);
    }

    public function trackingEvents(): HasMany
    {
        return $this->hasMany(DB::table('shipment_tracking_events')->first() ? Model::class : Model::class);
    }
}
