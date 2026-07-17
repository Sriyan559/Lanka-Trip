<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AiAdvisorSavedPlan extends Model
{
    protected $fillable = [
        'user_id',
        'conversation_id',
        'title',
        'language',
        'profile_context',
        'routine_data',
        'recommended_product_ids',
        'estimated_total',
        'currency',
        'version',
        'status',
        'generated_at',
    ];

    protected function casts(): array
    {
        return [
            'profile_context' => 'array',
            'routine_data' => 'array',
            'recommended_product_ids' => 'array',
            'estimated_total' => 'decimal:2',
            'generated_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function conversation(): BelongsTo
    {
        return $this->belongsTo(AiAdvisorConversation::class, 'conversation_id');
    }
}
