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
        'profile_context',
        'routine_data',
    ];

    protected function casts(): array
    {
        return [
            'profile_context' => 'array',
            'routine_data' => 'array',
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
