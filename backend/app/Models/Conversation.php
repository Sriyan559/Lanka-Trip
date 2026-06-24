<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Conversation extends Model
{
    protected $fillable = [
        'buyer_id',
        'supplier_id',
        'rfq_id',
        'quotation_id',
        'last_message_at',
    ];

    protected function casts(): array
    {
        return [
            'last_message_at' => 'datetime',
        ];
    }

    public function buyer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'buyer_id');
    }

    public function supplier(): BelongsTo
    {
        return $this->belongsTo(Supplier::class);
    }

    public function rfq(): BelongsTo
    {
        return $this->belongsTo(RFQ::class, 'rfq_id');
    }

    public function quotation(): BelongsTo
    {
        return $this->belongsTo(Quotation::class);
    }

    public function messages(): HasMany
    {
        return $this->hasMany(Message::class);
    }

    public function latestMessage(): HasOne
    {
        return $this->hasOne(Message::class)->latestOfMany();
    }

    public function scopeForParticipant(Builder $query, User $user): Builder
    {
        return $query->where(function (Builder $query) use ($user): void {
            $query->where('buyer_id', $user->id);

            if ($user->role === 'supplier') {
                $query->orWhereHas(
                    'supplier',
                    fn (Builder $supplierQuery) => $supplierQuery->where('user_id', $user->id),
                );
            }
        });
    }

    public function hasParticipant(User $user): bool
    {
        if ((int) $this->buyer_id === (int) $user->id) {
            return true;
        }

        return $user->role === 'supplier'
            && (int) $this->supplier?->user_id === (int) $user->id;
    }

    public function receiverFor(User $sender): User
    {
        if ((int) $this->buyer_id === (int) $sender->id) {
            return $this->supplier->user;
        }

        return $this->buyer;
    }
}
