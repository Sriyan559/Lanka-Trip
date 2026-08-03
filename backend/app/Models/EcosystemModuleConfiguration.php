<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EcosystemModuleConfiguration extends Model
{
    protected $fillable = [
        'ecosystem_module_id', 'config_key', 'config_value', 'encrypted_value', 'is_sensitive', 'updated_by',
    ];

    protected $hidden = ['encrypted_value'];

    protected function casts(): array
    {
        return ['config_value' => 'array', 'is_sensitive' => 'boolean'];
    }

    public function module(): BelongsTo
    {
        return $this->belongsTo(EcosystemModule::class, 'ecosystem_module_id');
    }

    public function maskedValue(): mixed
    {
        return $this->is_sensitive ? '••••••••' : $this->config_value;
    }
}
