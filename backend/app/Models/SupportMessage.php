<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SupportMessage extends Model
{
    protected $fillable = ['uuid', 'support_case_id', 'sender_id', 'body', 'is_customer_visible', 'delivery_status'];

    protected function casts(): array
    {
        return ['is_customer_visible' => 'boolean'];
    }

    public function supportCase(): BelongsTo
    {
        return $this->belongsTo(SupportCase::class);
    }

    public function sender(): BelongsTo
    {
        return $this->belongsTo(User::class, 'sender_id');
    }
}
