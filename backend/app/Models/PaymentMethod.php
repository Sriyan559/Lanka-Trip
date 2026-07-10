<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PaymentMethod extends Model
{
    protected $fillable = [
        'uuid',
        'name',
        'slug',
        'provider',
        'method_type',
        'description',
        'requires_manual_review',
        'status',
        'metadata',
    ];

    protected function casts(): array
    {
        return [
            'requires_manual_review' => 'boolean',
            'metadata' => 'array',
        ];
    }
}
