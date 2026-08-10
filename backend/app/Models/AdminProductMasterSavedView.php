<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AdminProductMasterSavedView extends Model
{
    protected $fillable = ['user_id', 'name', 'description', 'filters', 'quick_filters', 'active_tab', 'sort', 'visible_columns', 'is_default'];

    protected function casts(): array
    {
        return ['filters' => 'array', 'quick_filters' => 'array', 'visible_columns' => 'array', 'is_default' => 'boolean'];
    }
}
