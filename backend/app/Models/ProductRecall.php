<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class ProductRecall extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'uuid',
        'recall_code',
        'title',
        'reason',
        'recall_class',
        'severity',
        'status',
        'supplier_id',
        'product_id',
        'initiated_by',
        'quarantined_batches_count',
        'quarantined_units_count',
        'affected_orders_count',
        'affected_customers_count',
        'initiated_at',
        'resolved_at',
        'metadata',
    ];

    protected $casts = [
        'initiated_at' => 'datetime',
        'resolved_at' => 'datetime',
        'metadata' => 'array',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->uuid)) {
                $model->uuid = (string) Str::uuid();
            }
            if (empty($model->recall_code)) {
                $model->recall_code = 'RCL-' . strtoupper(Str::random(8));
            }
        });
    }

    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
