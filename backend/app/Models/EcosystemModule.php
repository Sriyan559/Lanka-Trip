<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class EcosystemModule extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'uuid', 'module_key', 'name', 'description', 'category', 'current_version', 'status',
        'approval_status', 'is_enabled', 'installation_status', 'integration_status',
        'health_status', 'configuration_schema', 'last_health_check_at', 'created_by', 'updated_by',
    ];

    protected function casts(): array
    {
        return [
            'is_enabled' => 'boolean', 'configuration_schema' => 'array',
            'last_health_check_at' => 'datetime',
        ];
    }

    public function configurations(): HasMany
    {
        return $this->hasMany(EcosystemModuleConfiguration::class);
    }

    public function healthChecks(): HasMany
    {
        return $this->hasMany(EcosystemModuleHealthCheck::class);
    }
}
