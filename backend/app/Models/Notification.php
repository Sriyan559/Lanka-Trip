<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Notification extends Model
{
    public const TYPES = [
        'new_rfq',
        'new_quotation',
        'quotation_accepted',
        'quotation_rejected',
        'new_message',
        'supplier_verified',
        'order_created',
        'order_status_changed',
    ];

    protected $fillable = [
        'user_id',
        'type',
        'title',
        'message',
        'reference_type',
        'reference_id',
        'is_read',
    ];

    protected function casts(): array
    {
        return [
            'reference_id' => 'integer',
            'is_read' => 'boolean',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function scopeUnread(Builder $query): Builder
    {
        return $query->where('is_read', false);
    }
}
