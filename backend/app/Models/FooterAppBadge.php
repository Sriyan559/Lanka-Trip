<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FooterAppBadge extends Model
{
    protected $fillable = [
        'platform',
        'label',
        'image_path',
        'image_alt',
        'store_url',
        'enabled',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'enabled' => 'boolean',
            'sort_order' => 'integer',
        ];
    }
}
