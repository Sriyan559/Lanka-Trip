<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SupplierCertificate extends Model
{
    protected $fillable = [
        'supplier_id',
        'certificate_name',
        'certificate_number',
        'issuing_authority',
        'issue_date',
        'expiry_date',
        'file_url',
    ];

    protected function casts(): array
    {
        return [
            'issue_date' => 'date',
            'expiry_date' => 'date',
        ];
    }

    public function supplier(): BelongsTo
    {
        return $this->belongsTo(Supplier::class);
    }
}
