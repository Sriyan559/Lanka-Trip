<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Brand extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'uuid',
        'name',
        'slug',
        'description',
        'logo_path',
        'website_url',
        'country_id',
        'status',
        'is_verified',
        'created_by',
    ];

    protected function casts(): array
    {
        return [
            'is_verified' => 'boolean',
        ];
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function sellerBrandAuthorizations(): HasMany
    {
        return $this->hasMany(SellerBrandAuthorization::class);
    }

    public function suppliers(): BelongsToMany
    {
        return $this->belongsToMany(Supplier::class, 'seller_brand_authorizations')
            ->withPivot([
                'id',
                'authorization_type',
                'territory',
                'document_path',
                'starts_at',
                'expires_at',
                'status',
                'reviewed_by',
                'reviewed_at',
                'review_notes',
            ])
            ->withTimestamps();
    }
}
