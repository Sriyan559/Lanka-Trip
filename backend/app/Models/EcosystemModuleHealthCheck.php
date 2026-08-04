<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EcosystemModuleHealthCheck extends Model
{
    public $timestamps = false;

    protected $fillable = ['ecosystem_module_id', 'status', 'response_time_ms', 'message', 'metrics', 'checked_at'];

    protected function casts(): array
    {
        return ['metrics' => 'array', 'checked_at' => 'datetime'];
    }

    public function module(): BelongsTo
    {
        return $this->belongsTo(EcosystemModule::class, 'ecosystem_module_id');
    }
}
