<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\EcosystemModule;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;

class EcosystemModuleController extends Controller
{
    private const STATUSES = ['draft', 'operational', 'degraded', 'maintenance', 'inactive', 'blocked', 'archived'];
    private const LIFECYCLES = ['planned', 'coming_soon', 'pilot', 'release_candidate', 'operational', 'deprecated', 'archived'];
    private const RISKS = ['unknown', 'low', 'medium', 'high', 'critical'];

    public function dashboard(Request $request): JsonResponse
    {
        $this->authorize('viewAny', EcosystemModule::class);
        $modules = EcosystemModule::query();
        $total = (clone $modules)->count();
        $average = fn (string $column): ?float => $total > 0
            ? (($value = (clone $modules)->whereNotNull($column)->avg($column)) !== null ? round((float) $value, 1) : null)
            : null;

        $counts = [
            'total' => $total,
            'active' => (clone $modules)->where('is_enabled', true)->count(),
            'pilot' => (clone $modules)->where('lifecycle', 'pilot')->count(),
            'comingSoon' => (clone $modules)->where('lifecycle', 'coming_soon')->count(),
            'planned' => (clone $modules)->where('lifecycle', 'planned')->count(),
            'needsAttention' => (clone $modules)->where(fn (Builder $query) => $query
                ->whereIn('health_status', ['degraded', 'critical'])
                ->orWhereIn('risk_level', ['high', 'critical']))->count(),
            'operational' => (clone $modules)->where('status', 'operational')->count(),
            'degraded' => (clone $modules)->where('health_status', 'degraded')->count(),
            'blocked' => (clone $modules)->where('release_status', 'blocked')->count(),
            'pendingConfiguration' => (clone $modules)->whereIn('configuration_status', ['not_configured', 'pending_review'])->count(),
            'integrationIssues' => (clone $modules)->whereNotIn('integration_status', ['healthy', 'approved', 'connected'])->count(),
            'dependencyRisks' => (clone $modules)->whereIn('dependency_status', ['warning', 'blocked', 'missing', 'version_conflict'])->count(),
            'countriesEnabled' => (int) (clone $modules)->sum('countries_enabled'),
        ];

        $health = [
            'overall' => $average('health_score'),
            'availability' => $average('availability_percent'),
            'configuration' => $this->statusPercent('configuration_status', ['configured', 'approved']),
            'integration' => $this->statusPercent('integration_status', ['healthy', 'approved', 'connected']),
            'dependency' => $this->statusPercent('dependency_status', ['healthy', 'approved']),
            'compliance' => $this->statusPercent('compliance_status', ['approved', 'compliant']),
            'release' => $this->statusPercent('release_status', ['released', 'approved', 'ready']),
            'adoption' => $average('adoption_rate'),
        ];

        $alerts = DB::table('ecosystem_module_alerts as alerts')
            ->leftJoin('ecosystem_modules as modules', 'modules.id', '=', 'alerts.ecosystem_module_id')
            ->whereIn('alerts.status', ['open', 'acknowledged'])
            ->orderByRaw("CASE alerts.severity WHEN 'critical' THEN 1 WHEN 'high' THEN 2 WHEN 'warning' THEN 3 ELSE 4 END")
            ->orderByDesc('alerts.created_at')->limit(12)
            ->get(['alerts.id', 'alerts.severity', 'alerts.type', 'alerts.message', 'alerts.status', 'alerts.created_at', 'modules.module_key', 'modules.name as module_name']);

        $risks = DB::table('ecosystem_module_risks')->where('status', 'open')
            ->selectRaw('severity, COUNT(*) as count')->groupBy('severity')->get();

        return $this->successResponse([
            'dashboard' => [
                'summary' => $counts,
                'health' => $health,
                'alerts' => $alerts,
                'risks' => $risks,
                'distributions' => [
                    'category' => $this->distribution('category'),
                    'lifecycle' => $this->distribution('lifecycle'),
                    'moduleType' => $this->distribution('module_type'),
                    'health' => $this->distribution('health_status'),
                    'environment' => $this->distribution('environment'),
                ],
                'permissions' => [
                    'canRegister' => $request->user()->can('create', EcosystemModule::class),
                    'canConfigure' => $request->user()->hasPermission('ecosystem.modules.configure'),
                    'canExport' => $request->user()->hasPermission('ecosystem.modules.view'),
                ],
                'generatedAt' => now()->toIso8601String(),
                'source' => 'ecosystem_modules',
            ],
        ]);
    }

    public function index(Request $request): JsonResponse
    {
        $this->authorize('viewAny', EcosystemModule::class);
        $validated = $request->validate([
            'search' => ['nullable', 'string', 'max:160'],
            'category' => ['nullable', 'string', 'max:80'],
            'lifecycle' => ['nullable', Rule::in(self::LIFECYCLES)],
            'status' => ['nullable', Rule::in(self::STATUSES)],
            'environment' => ['nullable', 'string', 'max:30'],
            'risk' => ['nullable', Rule::in(self::RISKS)],
            'health' => ['nullable', 'string', 'max:30'],
            'owner' => ['nullable', 'string', 'max:160'],
            'module_type' => ['nullable', Rule::in(['core', 'optional'])],
            'sort' => ['nullable', Rule::in([
                'name', 'module_key', 'category', 'lifecycle', 'status', 'health_status',
                'risk_level', 'updated_at', 'health_score', 'adoption_rate', 'current_version',
                'target_version', 'release_status', 'security_status', 'compliance_status',
                'integration_status', 'dependency_status', 'primary_owner',
            ])],
            'direction' => ['nullable', Rule::in(['asc', 'desc'])],
            'per_page' => ['nullable', 'integer', 'min:1', 'max:100'],
        ]);

        $query = EcosystemModule::query();
        if ($search = trim((string) ($validated['search'] ?? ''))) {
            $query->where(fn (Builder $builder) => $builder
                ->where('name', 'like', "%{$search}%")
                ->orWhere('module_key', 'like', "%{$search}%")
                ->orWhere('primary_owner', 'like', "%{$search}%")
                ->orWhere('technical_owner', 'like', "%{$search}%"));
        }
        foreach (['category', 'lifecycle', 'status', 'environment', 'health_status' => 'health', 'risk_level' => 'risk', 'module_type'] as $column => $parameter) {
            if (is_int($column)) {
                $column = $parameter;
            }
            if (filled($validated[$parameter] ?? null)) {
                $query->where($column, $validated[$parameter]);
            }
        }
        if (filled($validated['owner'] ?? null)) {
            $query->where(fn (Builder $builder) => $builder->where('primary_owner', $validated['owner'])->orWhere('technical_owner', $validated['owner']));
        }

        $sort = $validated['sort'] ?? 'updated_at';
        $page = $query->orderBy($sort, $validated['direction'] ?? 'desc')->paginate($validated['per_page'] ?? 25);
        $page->through(fn (EcosystemModule $module) => $this->modulePayload($module));

        return $this->successResponse([
            'modules' => $page,
            'filters' => [
                'categories' => EcosystemModule::whereNotNull('category')->distinct()->orderBy('category')->pluck('category'),
                'owners' => EcosystemModule::whereNotNull('primary_owner')->distinct()->orderBy('primary_owner')->pluck('primary_owner'),
                'environments' => EcosystemModule::whereNotNull('environment')->distinct()->orderBy('environment')->pluck('environment'),
            ],
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $this->authorize('create', EcosystemModule::class);
        $validated = $this->validatedModule($request);
        $module = DB::transaction(function () use ($request, $validated): EcosystemModule {
            $module = EcosystemModule::create([...$validated, 'uuid' => (string) Str::uuid(), 'created_by' => $request->user()->id, 'updated_by' => $request->user()->id]);
            $this->history($module, $request, 'registered', [], $this->safeModuleAudit($module));
            return $module;
        });

        return $this->successResponse(['module' => $this->modulePayload($module)], 'Module registered.', Response::HTTP_CREATED);
    }

    public function update(Request $request, EcosystemModule $module): JsonResponse
    {
        $this->authorize('update', $module);
        $validated = $this->validatedModule($request, $module);
        $before = $this->safeModuleAudit($module);
        DB::transaction(function () use ($request, $module, $validated, $before): void {
            $module->update([...$validated, 'updated_by' => $request->user()->id]);
            $this->history($module, $request, 'updated', $before, $this->safeModuleAudit($module->refresh()));
        });
        return $this->successResponse(['module' => $this->modulePayload($module->refresh())], 'Module updated.');
    }

    public function destroy(Request $request, EcosystemModule $module): JsonResponse
    {
        $this->authorize('delete', $module);
        DB::transaction(function () use ($request, $module): void {
            $this->history($module, $request, 'archived', $this->safeModuleAudit($module), ['deleted_at' => now()->toIso8601String()]);
            $module->delete();
        });
        return $this->successResponse(message: 'Module archived.');
    }

    public function show(EcosystemModule $module): JsonResponse
    {
        $this->authorize('view', $module);
        $module->load(['healthChecks' => fn ($query) => $query->latest('checked_at')->limit(20)]);
        return $this->successResponse([
            'module' => $this->modulePayload($module),
            'healthChecks' => $module->healthChecks,
            'configuration' => $module->configurations()->get()->map(fn ($configuration) => [
                'key' => $configuration->config_key, 'value' => $configuration->maskedValue(),
                'is_sensitive' => $configuration->is_sensitive, 'updated_at' => $configuration->updated_at,
            ]),
        ]);
    }

    public function configure(Request $request, EcosystemModule $module): JsonResponse
    {
        $this->authorize('configure', $module);
        $validated = $request->validate([
            'updated_at' => ['required', 'date'], 'configuration' => ['required', 'array', 'max:100'],
            'configuration.*.key' => ['required', 'string', 'max:120'], 'configuration.*.value' => ['present'],
            'configuration.*.sensitive' => ['required', 'boolean'],
        ]);
        if (! $module->updated_at->equalTo($validated['updated_at'])) {
            abort(409, 'The module changed since it was loaded.');
        }
        $this->validateSchema($module, $validated['configuration']);
        DB::transaction(function () use ($request, $module, $validated): void {
            $safeChanges = [];
            foreach ($validated['configuration'] as $entry) {
                $payload = $entry['sensitive']
                    ? ['config_value' => null, 'encrypted_value' => Crypt::encryptString(json_encode($entry['value'], JSON_THROW_ON_ERROR))]
                    : ['config_value' => json_encode($entry['value'], JSON_THROW_ON_ERROR), 'encrypted_value' => null];
                DB::table('ecosystem_module_configurations')->updateOrInsert(
                    ['ecosystem_module_id' => $module->id, 'config_key' => $entry['key']],
                    [...$payload, 'is_sensitive' => $entry['sensitive'], 'updated_by' => $request->user()->id, 'created_at' => now(), 'updated_at' => now()],
                );
                $safeChanges[$entry['key']] = $entry['sensitive'] ? 'masked' : 'updated';
            }
            $module->update(['configuration_status' => 'configured', 'updated_by' => $request->user()->id]);
            $this->history($module, $request, 'configuration_updated', [], $safeChanges);
        });
        return $this->successResponse(['updated_at' => $module->refresh()->updated_at], 'Module configuration updated.');
    }

    public function toggle(Request $request, EcosystemModule $module): JsonResponse
    {
        $this->authorize('configure', $module);
        $validated = $request->validate(['enabled' => ['required', 'boolean']]);
        $before = ['is_enabled' => $module->is_enabled];
        $module->update(['is_enabled' => $validated['enabled'], 'updated_by' => $request->user()->id]);
        $this->history($module, $request, 'enabled_changed', $before, ['is_enabled' => $validated['enabled']]);
        return $this->successResponse(['module' => $this->modulePayload($module->refresh())], 'Module state updated.');
    }

    public function audit(EcosystemModule $module): JsonResponse
    {
        $this->authorize('view', $module);
        return $this->successResponse(['history' => DB::table('ecosystem_module_status_history')->where('ecosystem_module_id', $module->id)->latest('created_at')->paginate(50)]);
    }

    private function validatedModule(Request $request, ?EcosystemModule $module = null): array
    {
        return $request->validate([
            'module_key' => ['required', 'alpha_dash:ascii', 'max:100', Rule::unique('ecosystem_modules', 'module_key')->ignore($module?->id)],
            'name' => ['required', 'string', 'max:255'], 'description' => ['nullable', 'string', 'max:5000'],
            'category' => ['required', 'string', 'max:80'], 'module_type' => ['required', Rule::in(['core', 'optional'])],
            'lifecycle' => ['required', Rule::in(self::LIFECYCLES)], 'status' => ['required', Rule::in(self::STATUSES)],
            'environment' => ['required', 'string', 'max:30'], 'region' => ['nullable', 'string', 'max:80'],
            'current_version' => ['nullable', 'string', 'max:50'], 'target_version' => ['nullable', 'string', 'max:50'],
            'release_status' => ['required', 'string', 'max:30'], 'health_status' => ['required', 'string', 'max:30'],
            'risk_level' => ['required', Rule::in(self::RISKS)], 'primary_owner' => ['nullable', 'string', 'max:160'],
            'technical_owner' => ['nullable', 'string', 'max:160'], 'is_enabled' => ['required', 'boolean'],
        ]);
    }

    private function modulePayload(EcosystemModule $module): array
    {
        return [
            'id' => (string) $module->uuid, 'databaseModuleId' => $module->id,
            'publicReference' => 'MOD-'.str_pad((string) $module->id, 6, '0', STR_PAD_LEFT),
            'moduleKey' => $module->module_key, 'moduleName' => $module->name, 'description' => $module->description,
            'moduleType' => Str::headline($module->module_type), 'category' => $module->category,
            'lifecycle' => Str::headline($module->lifecycle), 'operationalStatus' => Str::headline($module->status),
            'releaseStatus' => Str::headline($module->release_status), 'currentVersion' => $module->current_version ?? '—',
            'targetVersion' => $module->target_version ?? '—', 'productionEnabled' => $module->is_enabled,
            'configurationStatus' => Str::headline($module->configuration_status),
            'integrationReadiness' => Str::headline($module->integration_status),
            'dependencyHealth' => Str::headline($module->dependency_status),
            'compatibilityStatus' => Str::headline($module->compatibility_status),
            'complianceStatus' => Str::headline($module->compliance_status), 'securityReview' => Str::headline($module->security_status),
            'countriesEnabled' => $module->countries_enabled, 'activeUsers' => $module->active_users,
            'monthlyTransactions' => $module->monthly_transactions, 'adoptionRate' => $module->adoption_rate,
            'availability' => $module->availability_percent, 'errorRate' => $module->error_rate_percent,
            'healthScore' => $module->health_score, 'riskLevel' => Str::headline($module->risk_level),
            'riskTrend' => '—', 'primaryOwner' => $module->primary_owner, 'technicalOwner' => $module->technical_owner,
            'lastRelease' => $module->last_release_at?->toIso8601String(), 'nextUpdate' => $module->next_release_at?->toIso8601String(),
            'lastUpdated' => $module->updated_at?->toIso8601String(), 'environment' => Str::headline($module->environment),
            'region' => $module->region, 'healthStatus' => Str::headline($module->health_status),
        ];
    }

    private function statusPercent(string $column, array $healthy): ?float
    {
        $evaluated = EcosystemModule::whereNotNull($column)->whereNotIn($column, ['unknown', 'not_assessed', 'not_evaluated'])->count();
        return $evaluated ? round(EcosystemModule::whereIn($column, $healthy)->count() / $evaluated * 100, 1) : null;
    }

    private function distribution(string $column): array
    {
        return EcosystemModule::selectRaw("{$column} as name, COUNT(*) as value")->groupBy($column)->orderBy($column)->get()->toArray();
    }

    private function validateSchema(EcosystemModule $module, array $configuration): void
    {
        $allowed = collect(($module->configuration_schema ?? [])['properties'] ?? [])->keys();
        $unknown = collect($configuration)->pluck('key')->diff($allowed);
        if ($allowed->isNotEmpty() && $unknown->isNotEmpty()) {
            throw ValidationException::withMessages(['configuration' => 'Unsupported configuration keys: '.$unknown->join(', ')]);
        }
    }

    private function safeModuleAudit(EcosystemModule $module): array
    {
        return $module->only(['module_key', 'name', 'category', 'module_type', 'lifecycle', 'status', 'is_enabled', 'environment', 'current_version', 'target_version', 'release_status', 'health_status', 'risk_level', 'primary_owner', 'technical_owner']);
    }

    private function history(EcosystemModule $module, Request $request, string $event, array $before, array $after): void
    {
        DB::table('ecosystem_module_status_history')->insert([
            'ecosystem_module_id' => $module->id, 'actor_id' => $request->user()->id, 'event_type' => $event,
            'from_status' => $before['status'] ?? null, 'to_status' => $after['status'] ?? null,
            'safe_changes' => json_encode(['before' => $before, 'after' => $after], JSON_THROW_ON_ERROR), 'created_at' => now(),
        ]);
    }
}
