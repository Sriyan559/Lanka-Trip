<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\SupportCase;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class SupportCaseController extends Controller
{
    public function dashboard(): JsonResponse
    {
        $this->authorize('viewAny', SupportCase::class);

        return $this->successResponse(['dashboard' => [
            'by_status' => SupportCase::groupBy('status')->selectRaw('status, COUNT(*) AS count')->get(),
            'by_priority' => SupportCase::groupBy('priority')->selectRaw('priority, COUNT(*) AS count')->get(),
            'sla_breached' => SupportCase::whereNotIn('status', ['resolved', 'closed', 'waiting_customer'])
                ->where(function ($query): void {
                    $query->where(fn ($response) => $response->whereNull('first_response_at')->where('first_response_deadline', '<', now()))
                        ->orWhere('resolution_deadline', '<', now());
                })->count(),
            'unassigned' => SupportCase::whereNull('assigned_agent_id')->whereNotIn('status', ['resolved', 'closed'])->count(),
        ]]);
    }

    public function index(Request $request): JsonResponse
    {
        $this->authorize('viewAny', SupportCase::class);
        $validated = $request->validate([
            'status' => ['nullable', Rule::in(SupportCase::STATUSES)],
            'priority' => ['nullable', Rule::in(SupportCase::PRIORITIES)],
            'assigned_agent_id' => ['nullable', 'integer'],
            'per_page' => ['nullable', 'integer', 'between:1,100'],
        ]);
        $query = SupportCase::with(['customer:id,name,email', 'assignedAgent:id,name'])->latest();
        foreach (['status', 'priority', 'assigned_agent_id'] as $field) {
            if (isset($validated[$field])) {
                $query->where($field, $validated[$field]);
            }
        }

        return $this->successResponse(['cases' => $query->paginate($validated['per_page'] ?? 25)]);
    }

    public function store(Request $request): JsonResponse
    {
        $this->authorize('create', SupportCase::class);
        $validated = $request->validate([
            'customer_id' => ['required', 'integer', 'exists:users,id'],
            'subject' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:10000'],
            'channel' => ['required', Rule::in(['web', 'email', 'phone', 'chat', 'admin'])],
            'category' => ['required', 'string', 'max:80'],
            'priority' => ['required', Rule::in(SupportCase::PRIORITIES)],
            'related_order_id' => ['nullable', 'integer', 'exists:orders,id'],
        ]);
        $policy = DB::table('support_sla_policies')->where('priority', $validated['priority'])->where('is_active', true)->first();
        abort_unless($policy, 422, 'No active SLA policy exists for this priority.');

        $case = DB::transaction(function () use ($request, $validated, $policy): SupportCase {
            $case = SupportCase::create([
                ...$validated, 'uuid' => (string) Str::uuid(),
                'case_number' => 'SUP-'.strtoupper(Str::random(12)), 'status' => 'open',
                'first_response_deadline' => now()->addMinutes($policy->first_response_minutes),
                'resolution_deadline' => now()->addMinutes($policy->resolution_minutes),
                'created_by' => $request->user()->id,
            ]);
            $this->historyEntry($case, $request, 'created', null, 'open');

            return $case;
        });

        return $this->successResponse(['case' => $case], 'Support case created.', 201);
    }

    public function show(SupportCase $case): JsonResponse
    {
        $this->authorize('view', $case);

        return $this->successResponse(['case' => $case->load([
            'customer:id,name,email', 'assignedAgent:id,name',
            'messages' => fn ($query) => $query->with('sender:id,name')->latest()->limit(100),
            'internalNotes' => fn ($query) => $query->with('author:id,name')->latest()->limit(100),
        ])]);
    }

    public function assign(Request $request, SupportCase $case): JsonResponse
    {
        $this->authorize('assign', $case);
        $validated = $request->validate([
            'agent_id' => ['nullable', 'integer', 'exists:users,id'],
            'team' => ['nullable', 'string', 'max:80'],
            'reason' => ['nullable', 'string', 'max:1000'],
        ]);
        abort_if(empty($validated['agent_id']) && empty($validated['team']), 422, 'An agent or team is required.');

        DB::transaction(function () use ($request, $case, $validated): void {
            DB::table('support_assignments')->where('support_case_id', $case->id)->whereNull('unassigned_at')->update(['unassigned_at' => now()]);
            DB::table('support_assignments')->insert([
                'support_case_id' => $case->id, 'agent_id' => $validated['agent_id'] ?? null,
                'team' => $validated['team'] ?? null, 'assigned_by' => $request->user()->id,
                'reason' => $validated['reason'] ?? null, 'assigned_at' => now(),
            ]);
            $from = $case->status;
            $case->update([
                'assigned_agent_id' => $validated['agent_id'] ?? null,
                'assigned_team' => $validated['team'] ?? null,
                'status' => $case->status === 'open' ? 'assigned' : $case->status,
            ]);
            $this->historyEntry($case, $request, 'assignment', $from, $case->status, [
                'agent_id' => $validated['agent_id'] ?? null, 'team' => $validated['team'] ?? null,
            ]);
        });

        return $this->successResponse(['case' => $case->refresh()], 'Support case assigned.');
    }

    public function reply(Request $request, SupportCase $case): JsonResponse
    {
        $this->authorize('reply', $case);
        $validated = $request->validate(['body' => ['required', 'string', 'max:20000']]);
        $message = DB::transaction(function () use ($request, $case, $validated) {
            $message = $case->messages()->create([
                'uuid' => (string) Str::uuid(), 'sender_id' => $request->user()->id,
                'body' => $validated['body'], 'is_customer_visible' => true, 'delivery_status' => 'sent',
            ]);
            if (! $case->first_response_at) {
                $case->update(['first_response_at' => now()]);
            }
            activity('admin')->causedBy($request->user())->performedOn($case)->log('support.public_reply_added');

            return $message;
        });

        return $this->successResponse(['message' => $message], 'Reply added.', 201);
    }

    public function note(Request $request, SupportCase $case): JsonResponse
    {
        $this->authorize('reply', $case);
        $validated = $request->validate(['body' => ['required', 'string', 'max:20000']]);
        $note = $case->internalNotes()->create([
            'uuid' => (string) Str::uuid(), 'author_id' => $request->user()->id,
            'body' => $validated['body'], 'visibility' => 'internal',
        ]);
        activity('admin')->causedBy($request->user())->performedOn($case)->log('support.internal_note_added');

        return $this->successResponse(['note' => $note], 'Internal note added.', 201);
    }

    public function transition(Request $request, SupportCase $case): JsonResponse
    {
        $this->authorize('resolve', $case);
        $validated = $request->validate([
            'status' => ['required', Rule::in(SupportCase::STATUSES)],
            'notes' => ['nullable', 'string', 'max:2000'],
        ]);
        abort_unless($case->canTransitionTo($validated['status']), 422, 'Invalid support case status transition.');

        DB::transaction(function () use ($request, $case, $validated): void {
            $from = $case->status;
            $sla = [];
            if ($validated['status'] === 'waiting_customer' && ! $case->sla_paused_at) {
                $sla = ['sla_paused_at' => now(), 'sla_status' => 'paused'];
            } elseif ($from === 'waiting_customer' && $case->sla_paused_at) {
                $pausedSeconds = $case->sla_paused_at->diffInSeconds(now());
                $sla = [
                    'sla_paused_at' => null,
                    'sla_paused_seconds' => $case->sla_paused_seconds + $pausedSeconds,
                    'first_response_deadline' => $case->first_response_deadline?->addSeconds($pausedSeconds),
                    'resolution_deadline' => $case->resolution_deadline?->addSeconds($pausedSeconds),
                    'sla_status' => 'within_target',
                ];
            }
            $dates = match ($validated['status']) {
                'resolved' => ['resolved_at' => now()],
                'closed' => ['closed_at' => now()],
                'open' => ['resolved_at' => null, 'closed_at' => null],
                default => [],
            };
            $case->update(['status' => $validated['status'], ...$dates, ...$sla]);
            $this->historyEntry($case, $request, 'status_changed', $from, $validated['status'], [], $validated['notes'] ?? null);
        });

        return $this->successResponse(['case' => $case->refresh()], 'Support case status updated.');
    }

    public function escalate(Request $request, SupportCase $case): JsonResponse
    {
        $this->authorize('resolve', $case);
        $validated = $request->validate([
            'target_team' => ['required', 'string', 'max:80'],
            'reason' => ['required', 'string', 'max:2000'],
        ]);
        DB::transaction(function () use ($request, $case, $validated): void {
            $level = min(255, $case->escalation_level + 1);
            DB::table('support_escalations')->insert([
                'support_case_id' => $case->id, 'level' => $level,
                'target_team' => $validated['target_team'], 'reason' => $validated['reason'],
                'escalated_by' => $request->user()->id, 'escalated_at' => now(),
            ]);
            $case->update(['escalation_level' => $level, 'assigned_team' => $validated['target_team']]);
            $this->historyEntry($case, $request, 'escalated', $case->status, $case->status, ['level' => $level]);
        });

        return $this->successResponse(['case' => $case->refresh()], 'Support case escalated.');
    }

    public function history(SupportCase $case): JsonResponse
    {
        $this->authorize('view', $case);

        return $this->successResponse(['history' => DB::table('support_case_status_history')
            ->where('support_case_id', $case->id)->latest('created_at')->paginate(50)]);
    }

    private function historyEntry(SupportCase $case, Request $request, string $event, ?string $from, ?string $to, array $changes = [], ?string $notes = null): void
    {
        DB::table('support_case_status_history')->insert([
            'support_case_id' => $case->id, 'actor_id' => $request->user()->id,
            'event_type' => $event, 'from_status' => $from, 'to_status' => $to,
            'changes' => $changes ? json_encode($changes, JSON_THROW_ON_ERROR) : null,
            'notes' => $notes, 'created_at' => now(),
        ]);
    }
}
