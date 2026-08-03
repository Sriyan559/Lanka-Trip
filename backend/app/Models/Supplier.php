<?php

namespace App\Models;

use Database\Factories\SupplierFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Supplier extends Model
{
    /** @use HasFactory<SupplierFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'company_name',
        'slug',
        'logo',
        'cover_image',
        'description',
        'country',
        'city',
        'address',
        'phone',
        'email',
        'website',
        'business_type',
        'established_year',
        'employee_count',
        'factory_size',
        'annual_revenue',
        'export_percentage',
        'main_markets',
        'verification_status',
        'is_featured',
        'rating',
        'reviews_count',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'is_featured' => 'boolean',
            'rating' => 'decimal:2',
            'reviews_count' => 'integer',
            'annual_revenue' => 'decimal:2',
            'export_percentage' => 'decimal:2',
            'main_markets' => 'array',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }

    public function quotations(): HasMany
    {
        return $this->hasMany(Quotation::class);
    }

    public function conversations(): HasMany
    {
        return $this->hasMany(Conversation::class);
    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    public function settlements(): HasMany
    {
        return $this->hasMany(SupplierSettlement::class);
    }

    public function payouts(): HasMany
    {
        return $this->hasMany(Payout::class);
    }

    public function returnCases(): HasMany
    {
        return $this->hasMany(ReturnCase::class);
    }

    public function certificates(): HasMany
    {
        return $this->hasMany(SupplierCertificate::class);
    }

    public function videos(): HasMany
    {
        return $this->hasMany(SupplierVideo::class);
    }

    public function strengths(): HasMany
    {
        return $this->hasMany(SupplierStrength::class);
    }

    public function productionCapacity(): HasOne
    {
        return $this->hasOne(ProductionCapacity::class);
    }

    public function sellerBrandAuthorizations(): HasMany
    {
        return $this->hasMany(SellerBrandAuthorization::class);
    }

    public function brands(): BelongsToMany
    {
        return $this->belongsToMany(Brand::class, 'seller_brand_authorizations')
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

    public function reviews(): HasMany
    {
        return $this->hasMany(SupplierReview::class);
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('status', 'active');
    }
}
