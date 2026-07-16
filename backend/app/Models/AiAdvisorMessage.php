<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AiAdvisorMessage extends Model
{
    protected $fillable = [
        'conversation_id',
        'role',
        'content',
        'structured_data',
        'provider',
        'model',
        'token_usage',
    ];

    protected function casts(): array
    {
        return [
            'structured_data' => 'array',
            'token_usage' => 'array',
        ];
    }

    public function conversation(): BelongsTo
    {
        return $this->belongsTo(AiAdvisorConversation::class, 'conversation_id');
    }
}
