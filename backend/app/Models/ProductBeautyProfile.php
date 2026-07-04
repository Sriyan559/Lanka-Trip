<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductBeautyProfile extends Model
{
    protected $fillable = [
        'product_id',
        'skin_type',
        'hair_type',
        'skin_concern',
        'hair_concern',
        'ingredients',
        'how_to_use',
        'warnings',
        'spf_value',
        'shade_family',
        'fragrance_family',
        'formulation',
        'gender_target',
        'age_group',
        'expiry_required',
        'batch_tracking_required',
        'compliance_status',
    ];

    protected function casts(): array
    {
        return [
            'spf_value' => 'integer',
            'expiry_required' => 'boolean',
            'batch_tracking_required' => 'boolean',
        ];
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
