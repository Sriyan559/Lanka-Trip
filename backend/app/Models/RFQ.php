<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class RFQ extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'rfqs';

    protected $fillable = [
        'user_id',
        'rfq_number',
        'title',
        'description',
        'destination_country',
        'expected_delivery_date',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'expected_delivery_date' => 'date',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function items(): HasMany
    {
        return $this->hasMany(RFQItem::class, 'rfq_id');
    }

    public function quotations(): HasMany
    {
        return $this->hasMany(Quotation::class, 'rfq_id');
    }

    public function conversations(): HasMany
    {
        return $this->hasMany(Conversation::class, 'rfq_id');
    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class, 'rfq_id');
    }
}
