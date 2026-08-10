<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AttributeGroup extends Model
{
    protected $fillable = ['uuid', 'name', 'slug', 'description', 'sort_order', 'status', 'metadata'];

    protected function casts(): array
    {
        return ['sort_order' => 'integer', 'metadata' => 'array'];
    }

    public function attributes(): HasMany
    {
        return $this->hasMany(ProductAttribute::class);
    }
}
