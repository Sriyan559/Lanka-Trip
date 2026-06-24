<?php

namespace App\Models;

use Database\Factories\ProductFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class Product extends Model
{
    /** @use HasFactory<ProductFactory> */
    use HasFactory, LogsActivity, SoftDeletes;

    protected $fillable = [
        'category_id',
        'supplier_id',
        'name',
        'slug',
        'short_description',
        'description',
        'price',
        'moq',
        'unit',
        'supply_ability',
        'lead_time',
        'port',
        'packaging_details',
        'featured_image',
        'status',
        'is_featured',
        'views_count',
        'average_rating',
        'reviews_count',
    ];

    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'moq' => 'decimal:2',
            'is_featured' => 'boolean',
            'views_count' => 'integer',
            'average_rating' => 'decimal:2',
            'reviews_count' => 'integer',
        ];
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function supplier(): BelongsTo
    {
        return $this->belongsTo(Supplier::class);
    }

    public function images(): HasMany
    {
        return $this->hasMany(ProductImage::class)
            ->orderBy('sort_order')
            ->orderBy('id');
    }

    public function inquiryCartItems(): HasMany
    {
        return $this->hasMany(InquiryCartItem::class);
    }

    public function wishlists(): HasMany
    {
        return $this->hasMany(Wishlist::class);
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(ProductReview::class);
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('status', 'active');
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->useLogName('products')
            ->logOnly([
                'category_id',
                'supplier_id',
                'name',
                'slug',
                'price',
                'status',
                'is_featured',
            ])
            ->logOnlyDirty()
            ->dontSubmitEmptyLogs();
    }
}
