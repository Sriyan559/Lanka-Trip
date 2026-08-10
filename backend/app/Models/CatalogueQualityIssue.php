<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CatalogueQualityIssue extends Model
{
    protected $guarded = [];

    protected function casts(): array
    {
        return ['sla_due_at' => 'datetime', 'resolved_at' => 'datetime', 'last_detected_at' => 'datetime'];
    }

    public function getRouteKeyName(): string
    {
        return 'uuid';
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class)->withTrashed();
    }

    public function candidate(): BelongsTo
    {
        return $this->belongsTo(CatalogueDuplicateCandidate::class, 'duplicate_candidate_id');
    }

    public function assignee(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    public function reviewer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reviewer_id');
    }

    public function notes(): HasMany
    {
        return $this->hasMany(CatalogueQualityIssueNote::class);
    }
}
