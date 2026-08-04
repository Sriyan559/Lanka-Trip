<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\EcosystemModule;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class EcosystemModuleController extends Controller
{
    public function dashboard(): JsonResponse
    {
        $this->authorize('viewAny', EcosystemModule::class);

        return $this->successResponse(['dashboard' => [
            'total' => EcosystemModule::count(),
            'enabled' => EcosystemModule::where('is_enabled', true)->count(),
            'by_health' => EcosystemModule::groupBy('health_status')->selectRaw('health_status, COUNT(*) AS count')->get(),
            'by_category' => EcosystemModule::groupBy('category')->selectRaw('category, COUNT(*) AS count')->get(),
        ]]);
    }

    public function index(Request $request): JsonResponse
    {
        $this->authorize('viewAny', EcosystemModule::class);
        $query = EcosystemModule::latest();
        if ($request->filled('category')) {
            $query->where('category', $request->string('category'));
        }

        return $this->successResponse(['modules' => $query->paginate($request->integer('per_page', 25))]);
    }

    public function show(EcosystemModule $module): JsonResponse
    {
        $this->authorize('view', $module);
        $module->load(['healthChecks' => fn ($query) => $query->latest('checked_at')->limit(20)]);

        return $this->successResponse([
            'module' => $module,
            'configuration' => $module->configurations()->get()->map(fn ($configuration) => [
                'key' => $configuration->config_key,
                'value' => $configuration->maskedValue(),
                'is_sensitive' => $configuration->is_sensitive,
                'updated_at' => $configuration->updated_at,
            ]),
        ]);
    }

    public function configure(Request $request, EcosystemModule $module): JsonResponse
    {
        $this->authorize('configure', $module);
        $validated = $request->validate([
            'updated_at' => ['required', 'date'],
            'configuration' => ['required', 'array', 'max:100'],
            'configuration.*.key' => ['required', 'string', 'max:120'],
            'configuration.*.value' => ['present'],
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
                    [
                        ...$payload, 'is_sensitive' => $entry['sensitive'],
                        'updated_by' => $request->user()->id, 'created_at' => now(), 'updated_at' => now(),
                    ],
                );
                $safeChanges[$entry['key']] = $entry['sensitive'] ? 'masked' : 'updated';
            }
            $module->update(['updated_by' => $request->user()->id]);
            $this->history($module, $request, 'configuration_updated', $safeChanges);
        });

        return $this->successResponse(['updated_at' => $module->refresh()->updated_at], 'Module configuration updated.');
    }

    public function toggle(Request $request, EcosystemModule $module): JsonResponse
    {
        $this->authorize('configure', $module);
        $validated = $request->validate(['enabled' => ['required', 'boolean']]);
        $from = $module->is_enabled ? 'enabled' : 'disabled';
        $module->update(['is_enabled' => $validated['enabled'], 'updated_by' => $request->user()->id]);
        $this->history($module, $request, 'enabled_changed', ['from' => $from, 'to' => $validated['enabled'] ? 'enabled' : 'disabled']);

        return $this->successResponse(['module' => $module->refresh()], 'Module state updated.');
    }

    public function audit(EcosystemModule $module): JsonResponse
    {
        $this->authorize('view', $module);

        return $this->successResponse(['history' => DB::table('ecosystem_module_status_history')
            ->where('ecosystem_module_id', $module->id)->latest('created_at')->paginate(50)]);
    }

    private function validateSchema(EcosystemModule $module, array $configuration): void
    {
        $schema = $module->configuration_schema ?? [];
        $allowed = collect($schema['properties'] ?? [])->keys();
        if ($allowed->isEmpty()) {
            return;
        }
        $unknown = collect($configuration)->pluck('key')->diff($allowed);
        if ($unknown->isNotEmpty()) {
            throw ValidationException::withMessages(['configuration' => 'Unsupported configuration keys: '.$unknown->join(', ')]);
        }
    }

    private function history(EcosystemModule $module, Request $request, string $event, array $safeChanges): void
    {
        DB::table('ecosystem_module_status_history')->insert([
            'ecosystem_module_id' => $module->id, 'actor_id' => $request->user()->id,
            'event_type' => $event, 'safe_changes' => json_encode($safeChanges, JSON_THROW_ON_ERROR),
            'created_at' => now(),
        ]);
    }
}
