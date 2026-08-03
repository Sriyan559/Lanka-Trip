<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class SupportCase extends Model
{
    use SoftDeletes;

    public const PRIORITIES = ['low', 'normal', 'high', 'urgent', 'critical'];

    public const STATUSES = ['open', 'assigned', 'waiting_customer', 'in_progress', 'resolved', 'closed'];

    public const TRANSITIONS = [
        'open' => ['assigned', 'in_progress', 'waiting_customer', 'resolved'],
        'assigned' => ['in_progress', 'waiting_customer', 'resolved'],
        'in_progress' => ['waiting_customer', 'resolved'],
        'waiting_customer' => ['in_progress', 'resolved'],
        'resolved' => ['closed', 'open'],
        'closed' => ['open'],
    ];

    protected $fillable = [
        'uuid', 'case_number', 'customer_id', 'subject', 'description', 'channel',
        'category', 'priority', 'status', 'assigned_agent_id', 'assigned_team',
        'related_order_id', 'related_payment_id', 'related_shipment_id', 'related_return_id',
        'related_refund_id', 'first_response_deadline', 'resolution_deadline',
        'first_response_at', 'resolved_at', 'closed_at', 'sla_paused_at',
        'sla_paused_seconds', 'sla_status', 'escalation_level', 'created_by', 'metadata',
    ];

    protected $hidden = ['metadata'];

    protected function casts(): array
    {
        return [
            'first_response_deadline' => 'datetime', 'resolution_deadline' => 'datetime',
            'first_response_at' => 'datetime', 'resolved_at' => 'datetime', 'closed_at' => 'datetime',
            'sla_paused_at' => 'datetime', 'metadata' => 'array',
        ];
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'customer_id');
    }

    public function assignedAgent(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_agent_id');
    }

    public function messages(): HasMany
    {
        return $this->hasMany(SupportMessage::class);
    }

    public function internalNotes(): HasMany
    {
        return $this->hasMany(SupportInternalNote::class);
    }

    public function returnCase(): BelongsTo
    {
        return $this->belongsTo(ReturnCase::class, 'related_return_id');
    }

    public function canTransitionTo(string $status): bool
    {
        return in_array($status, self::TRANSITIONS[$this->status] ?? [], true);
    }
}
