<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CustomerVerification extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'verification_status',
        'verification_type',
        'verification_level',
        'phone_status',
        'document_type',
        'document_url',
        'document_status',
        'document_expiry_date',
        'authenticity_status',
        'address_status',
        'evidence_completeness',
        'duplicate_risk_level',
        'current_stage',
        'reviewer_id',
        'verified_at',
        'rejection_reason',
        'submitted_at',
        'due_date',
        'sla_percentage',
    ];

    protected $casts = [
        'verified_at' => 'datetime',
        'document_expiry_date' => 'date',
        'evidence_completeness' => 'integer',
        'sla_percentage' => 'integer',
        'submitted_at' => 'datetime',
        'due_date' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function reviewer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reviewer_id');
    }
}
