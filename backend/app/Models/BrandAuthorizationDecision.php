<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BrandAuthorizationDecision extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'seller_brand_authorization_id', 'actor_id', 'decision', 'from_status',
        'to_status', 'notes', 'findings', 'decided_at',
    ];

    protected function casts(): array
    {
        return ['findings' => 'array', 'decided_at' => 'datetime'];
    }

    public function authorization(): BelongsTo
    {
        return $this->belongsTo(SellerBrandAuthorization::class, 'seller_brand_authorization_id');
    }

    public function actor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'actor_id');
    }
}
