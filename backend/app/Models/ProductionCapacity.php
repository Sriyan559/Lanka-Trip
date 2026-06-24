<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductionCapacity extends Model
{
    protected $fillable = [
        'supplier_id',
        'monthly_output',
        'output_unit',
        'production_lines',
        'lead_time',
        'factory_size',
    ];

    protected function casts(): array
    {
        return [
            'production_lines' => 'integer',
        ];
    }

    public function supplier(): BelongsTo
    {
        return $this->belongsTo(Supplier::class);
    }
}
