<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductAttributeValue extends Model
{
    protected $fillable = ['product_id', 'product_attribute_id', 'product_variant_id', 'value_text', 'value_number', 'value_boolean', 'value_date', 'value_json', 'unit', 'status'];

    protected function casts(): array
    {
        return ['value_boolean' => 'boolean', 'value_date' => 'date', 'value_json' => 'array'];
    }

    public function attribute(): BelongsTo
    {
        return $this->belongsTo(ProductAttribute::class, 'product_attribute_id');
    }
}
