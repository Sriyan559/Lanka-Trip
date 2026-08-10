<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CategoryAttribute extends Model
{
    protected $fillable = ['uuid', 'category_id', 'product_attribute_id', 'is_required', 'is_filterable', 'sort_order', 'status', 'metadata'];

    protected function casts(): array
    {
        return ['is_required' => 'boolean', 'is_filterable' => 'boolean', 'sort_order' => 'integer', 'metadata' => 'array'];
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}
