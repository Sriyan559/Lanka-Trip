<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AiAdvisorConversation extends Model
{
    protected $fillable = [
        'user_id',
        'guest_session_id',
        'status',
        'title',
        'language',
        'stage',
        'prompt_version',
        'profile_context',
    ];

    protected function casts(): array
    {
        return [
            'profile_context' => 'array',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function messages(): HasMany
    {
        return $this->hasMany(AiAdvisorMessage::class, 'conversation_id');
    }
}
