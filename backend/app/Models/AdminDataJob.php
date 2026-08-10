<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class AdminDataJob extends Model
{
    use HasFactory;

    protected $fillable = [
        'uuid',
        'job_code',
        'domain',
        'job_type',
        'title',
        'status',
        'processed_records',
        'rejected_records',
        'total_records',
        'initiated_by',
        'error_summary',
        'details',
    ];

    protected $casts = [
        'details' => 'array',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->uuid)) {
                $model->uuid = (string) Str::uuid();
            }
            if (empty($model->job_code)) {
                $model->job_code = 'JOB-' . strtoupper(Str::random(8));
            }
        });
    }

    public function initiatedBy()
    {
        return $this->belongsTo(User::class, 'initiated_by');
    }
}
