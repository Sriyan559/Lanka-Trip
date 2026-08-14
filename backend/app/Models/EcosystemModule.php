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
        'module_type', 'lifecycle', 'environment', 'region', 'target_version', 'release_status',
        'configuration_status', 'dependency_status', 'compatibility_status', 'security_status',
        'compliance_status', 'risk_level', 'primary_owner', 'technical_owner', 'countries_enabled',
        'active_users', 'monthly_transactions', 'adoption_rate', 'availability_percent',
        'error_rate_percent', 'health_score', 'last_release_at', 'next_release_at',
    ];

    protected function casts(): array
    {
        return [
            'is_enabled' => 'boolean', 'configuration_schema' => 'array',
            'last_health_check_at' => 'datetime',
            'last_release_at' => 'datetime', 'next_release_at' => 'datetime',
            'adoption_rate' => 'float', 'availability_percent' => 'float', 'error_rate_percent' => 'float',
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
