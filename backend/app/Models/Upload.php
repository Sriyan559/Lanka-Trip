<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Upload extends Model
{
    public const CATEGORIES = [
        'product_image',
        'supplier_logo',
        'supplier_certificate',
        'rfq_attachment',
        'company_video',
        'banner_image',
        'document',
    ];

    protected $fillable = [
        'user_id',
        'product_id',
        'product_variant_id',
        'original_name',
        'file_name',
        'file_path',
        'file_type',
        'mime_type',
        'file_size',
        'sha256',
        'width',
        'height',
        'alt_text',
        'description',
        'approval_status',
        'processing_status',
        'rights_expires_at',
        'archived_at',
        'category',
    ];

    protected function casts(): array
    {
        return [
            'file_size' => 'integer',
            'width' => 'integer',
            'height' => 'integer',
            'rights_expires_at' => 'date',
            'archived_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function variant(): BelongsTo
    {
        return $this->belongsTo(ProductVariant::class, 'product_variant_id');
    }
}
