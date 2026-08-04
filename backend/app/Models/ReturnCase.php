<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class ReturnCase extends Model
{
    use SoftDeletes;

    public const STATUSES = [
        'requested', 'evidence_required', 'under_review', 'approved', 'rejected',
        'return_shipment_pending', 'item_received', 'inspection_pending', 'refund_pending',
        'completed', 'cancelled',
    ];

    public const TRANSITIONS = [
        'requested' => ['evidence_required', 'under_review', 'cancelled'],
        'evidence_required' => ['under_review', 'cancelled'],
        'under_review' => ['approved', 'rejected', 'evidence_required'],
        'approved' => ['return_shipment_pending', 'item_received'],
        'return_shipment_pending' => ['item_received'],
        'item_received' => ['inspection_pending'],
        'inspection_pending' => ['refund_pending', 'rejected'],
        'refund_pending' => ['completed'],
        'rejected' => [],
        'completed' => [],
        'cancelled' => [],
    ];

    protected $fillable = [
        'uuid', 'return_number', 'order_id', 'customer_id', 'supplier_id', 'shipment_id',
        'refund_id', 'support_case_id', 'status', 'reason_code', 'reason', 'resolution',
        'reviewed_by', 'reviewed_at', 'completed_at', 'metadata',
    ];

    protected $hidden = ['metadata'];

    protected function casts(): array
    {
        return ['reviewed_at' => 'datetime', 'completed_at' => 'datetime', 'metadata' => 'array'];
    }

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'customer_id');
    }

    public function supplier(): BelongsTo
    {
        return $this->belongsTo(Supplier::class);
    }

    public function items(): HasMany
    {
        return $this->hasMany(ReturnItem::class);
    }

    public function supportCase(): BelongsTo
    {
        return $this->belongsTo(SupportCase::class);
    }

    public function canTransitionTo(string $status): bool
    {
        return in_array($status, self::TRANSITIONS[$this->status] ?? [], true);
    }
}
