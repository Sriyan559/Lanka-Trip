<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CatalogueDataJob extends Model
{
    protected $guarded = [];

    protected function casts(): array
    {
        return ['file_size' => 'integer', 'total_records' => 'integer', 'processed_records' => 'integer', 'successful_records' => 'integer', 'warning_records' => 'integer', 'failed_records' => 'integer', 'progress' => 'integer', 'started_at' => 'datetime', 'completed_at' => 'datetime', 'cancelled_at' => 'datetime'];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function errors(): HasMany
    {
        return $this->hasMany(CatalogueDataJobError::class);
    }

    public function getRouteKeyName(): string
    {
        return 'uuid';
    }
}
