<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class SupplierContract extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'uuid',
        'contract_number',
        'supplier_id',
        'contract_name',
        'contract_type',
        'status',
        'start_date',
        'end_date',
        'renewal_date',
        'auto_renewal',
        'value_amount',
        'currency',
        'signed_by_supplier_user_id',
        'signed_by_admin_user_id',
        'signed_at',
        'document_path',
        'terms_and_slas',
        'metadata',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'renewal_date' => 'date',
        'signed_at' => 'datetime',
        'auto_renewal' => 'boolean',
        'value_amount' => 'decimal:2',
        'terms_and_slas' => 'array',
        'metadata' => 'array',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->uuid)) {
                $model->uuid = (string) Str::uuid();
            }
            if (empty($model->contract_number)) {
                $model->contract_number = 'CTR-' . strtoupper(Str::random(8));
            }
        });
    }

    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }
}
