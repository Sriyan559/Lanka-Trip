<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class CustomerLoyaltyTransaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer_loyalty_account_id',
        'transaction_type',
        'points',
        'description',
        'reference_type',
        'reference_id',
    ];

    public function account(): BelongsTo
    {
        return $this->belongsTo(CustomerLoyaltyAccount::class, 'customer_loyalty_account_id');
    }

    public function reference(): MorphTo
    {
        return $this->morphTo();
    }
}
