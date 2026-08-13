<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CustomerRisk extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'risk_level',
        'risk_score',
        'risk_factors',
        'restriction_status',
        'restriction_reason',
    ];

    protected $casts = [
        'risk_factors' => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
