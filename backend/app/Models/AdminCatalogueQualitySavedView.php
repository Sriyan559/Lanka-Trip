<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AdminCatalogueQualitySavedView extends Model
{
    protected $guarded = [];

    protected function casts(): array
    {
        return ['filters' => 'array'];
    }

    public function getRouteKeyName(): string
    {
        return 'uuid';
    }
}
