<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CatalogueDataJobError extends Model
{
    public $timestamps = false;

    protected $guarded = [];

    public function job(): BelongsTo
    {
        return $this->belongsTo(CatalogueDataJob::class, 'catalogue_data_job_id');
    }
}
