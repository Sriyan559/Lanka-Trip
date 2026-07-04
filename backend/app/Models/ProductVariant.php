<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductVariant extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'uuid',
        'product_id',
        'currency_id',
        'sku',
        'name',
        'slug',
        'description',
        'price',
        'fob_price_min',
        'fob_price_max',
        'moq',
        'moq_unit',
        'stock_quantity',
        'lead_time_days',
        'is_default',
        'status',
        'metadata',
        'variant_name',
        'barcode',
        'shade_name',
        'shade_code',
        'size_label',
        'volume_ml',
        'weight_g',
        'retail_price',
        'sale_price',
        'low_stock_threshold',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'fob_price_min' => 'decimal:2',
            'fob_price_max' => 'decimal:2',
            'moq' => 'decimal:2',
            'stock_quantity' => 'integer',
            'lead_time_days' => 'integer',
            'is_default' => 'boolean',
            'metadata' => 'array',
            'volume_ml' => 'decimal:2',
            'weight_g' => 'decimal:2',
            'retail_price' => 'decimal:2',
            'sale_price' => 'decimal:2',
            'low_stock_threshold' => 'integer',
            'is_active' => 'boolean',
        ];
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
