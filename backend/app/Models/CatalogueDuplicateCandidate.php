<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CatalogueDuplicateCandidate extends Model
{
    protected $guarded = [];

    protected function casts(): array
    {
        return ['resolved_at' => 'datetime'];
    }

    public function getRouteKeyName(): string
    {
        return 'uuid';
    }

    public function productA(): BelongsTo
    {
        return $this->belongsTo(Product::class, 'product_a_id')->withTrashed();
    }

    public function productB(): BelongsTo
    {
        return $this->belongsTo(Product::class, 'product_b_id')->withTrashed();
    }

    public function issues(): HasMany
    {
        return $this->hasMany(CatalogueQualityIssue::class, 'duplicate_candidate_id');
    }
}
