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
        'original_name',
        'file_name',
        'file_path',
        'file_type',
        'mime_type',
        'file_size',
        'category',
    ];

    protected function casts(): array
    {
        return [
            'file_size' => 'integer',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
