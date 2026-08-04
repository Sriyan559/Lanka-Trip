<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SellerBrandAuthorization extends Model
{
    public const ADMIN_TRANSITIONS = [
        'submitted' => ['approved', 'rejected', 'evidence_required'],
        'approved' => ['suspended', 'expired', 'revoked'],
        'suspended' => ['approved', 'revoked'],
        'evidence_required' => [],
        'rejected' => [],
        'expired' => [],
        'revoked' => [],
    ];
    protected $fillable = [
        'supplier_id',
        'brand_id',
        'authorization_type',
        'territory',
        'document_path',
        'starts_at',
        'expires_at',
        'status',
        'reviewed_by',
        'reviewed_at',
        'review_notes',
    ];

    protected function casts(): array
    {
        return [
            'starts_at' => 'date',
            'expires_at' => 'date',
            'reviewed_at' => 'datetime',
        ];
    }

    public function supplier(): BelongsTo
    {
        return $this->belongsTo(Supplier::class);
    }

    public function brand(): BelongsTo
    {
        return $this->belongsTo(Brand::class);
    }

    public function reviewer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }

    public function decisions(): HasMany
    {
        return $this->hasMany(BrandAuthorizationDecision::class);
    }

    public function canAdminTransitionTo(string $status): bool
    {
        return in_array($status, self::ADMIN_TRANSITIONS[$this->status] ?? [], true);
    }
}
