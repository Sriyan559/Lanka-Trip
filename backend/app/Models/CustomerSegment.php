<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class CustomerSegment extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'name',
        'description',
        'criteria',
        'type',
        'membership_type',
        'customer_scope',
        'entry_rule_summary',
        'exit_rule_summary',
        'avg_ltv_number',
        'order_frequency',
        'retention_rate_pct',
        'consent_eligibility',
        'risk_level',
        'overlap_count',
        'conflict_status',
        'recalculation_schedule',
        'last_recalculated',
        'owner',
        'version',
        'status',
        'score',
        'score_status',
        'rule_details',
        'linked_groups',
        'consent_requirement',
        'risk_note',
        'next_recalculation',
        'new_members_count',
        'removed_members_count',
    ];

    protected $casts = [
        'linked_groups' => 'array',
        'avg_ltv_number' => 'decimal:2',
        'order_frequency' => 'decimal:2',
        'retention_rate_pct' => 'decimal:2',
        'last_recalculated' => 'datetime',
        'next_recalculation' => 'datetime',
    ];

    public function customers(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'customer_segment_members', 'customer_segment_id', 'user_id')->withTimestamps();
    }
}
