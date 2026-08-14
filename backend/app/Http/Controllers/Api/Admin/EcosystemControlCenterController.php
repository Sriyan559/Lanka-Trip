<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Services\Admin\EcosystemControlCenterService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class EcosystemControlCenterController extends Controller
{
    public function __construct(private readonly EcosystemControlCenterService $service) {}

    public function integrationDashboard(Request $request): JsonResponse
    {
        $this->view($request);
        return response()->json(['data' => $this->service->integrations($request)]);
    }

    public function integrations(Request $request): JsonResponse
    {
        $this->view($request);
        return response()->json(['data' => $this->service->integrationList($request)]);
    }

    public function exportIntegrations(Request $request): JsonResponse
    {
        $this->view($request);
        $request->merge(['per_page' => 100]);
        activity('ecosystem')->causedBy($request->user())->log('ecosystem_integrations.exported');
        return response()->json(['data' => ['generated_at' => now()->toIso8601String(), 'registry' => $this->service->integrationList($request)->items()]]);
    }

    public function integrationReferences(Request $request): JsonResponse
    {
        $this->view($request);
        return response()->json(['data' => [
            'modules' => DB::table('ecosystem_modules')->orderBy('name')->get(['id', 'name']),
            'providers' => DB::table('ecosystem_module_integrations')->whereNotNull('provider')->distinct()->orderBy('provider')->pluck('provider'),
        ]]);
    }

    public function storeIntegration(Request $request): JsonResponse
    {
        $this->manage($request);
        $this->rejectSecrets($request);
        $data = $request->validate($this->integrationRules());
        return response()->json(['data' => $this->service->registerIntegration($data, $request)], 201);
    }

    public function updateIntegration(Request $request, int $id): JsonResponse
    {
        $this->manage($request);
        $this->rejectSecrets($request);
        $rules = $this->integrationRules(true);
        $data = $request->validate($rules);
        return response()->json(['data' => $this->service->updateIntegration($id, $data, $request)]);
    }

    public function governanceDashboard(Request $request): JsonResponse
    {
        $this->view($request);
        return response()->json(['data' => $this->service->governance($request)]);
    }

    public function exportGovernance(Request $request): JsonResponse
    {
        $this->view($request);
        activity('ecosystem')->causedBy($request->user())->log('ecosystem_governance.exported');
        return response()->json(['data' => $this->service->governance($request)]);
    }

    public function storePolicy(Request $request): JsonResponse
    {
        $this->manage($request);
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:ecosystem_access_policies,name'],
            'policy_type' => ['required', Rule::in(['role', 'permission', 'conditional', 'deny'])],
            'scope' => ['nullable', 'string', 'max:120'],
            'effect' => ['required', Rule::in(['allow', 'deny'])],
            'risk_level' => ['required', Rule::in(['low', 'medium', 'high', 'critical', 'unknown'])],
            'status' => ['required', Rule::in(['draft', 'active', 'disabled'])],
            'conditions' => ['nullable', 'array'],
        ]);
        $id = DB::transaction(function () use ($data, $request) {
            $id = DB::table('ecosystem_access_policies')->insertGetId([...$data, 'uuid' => (string) Str::uuid(), 'conditions' => isset($data['conditions']) ? json_encode($data['conditions']) : null, 'version' => 1, 'created_by' => $request->user()->id, 'created_at' => now(), 'updated_at' => now()]);
            DB::table('ecosystem_governance_audits')->insert(['entity_type' => 'access_policy', 'entity_id' => $id, 'action' => 'created', 'actor_id' => $request->user()->id, 'after' => json_encode($data), 'created_at' => now()]);
            return $id;
        });
        return response()->json(['data' => DB::table('ecosystem_access_policies')->find($id)], 201);
    }

    public function storeAccessRequest(Request $request): JsonResponse
    {
        $this->manage($request);
        $data = $request->validate([
            'target_user_id' => ['required', 'integer', 'exists:users,id'],
            'role_id' => ['nullable', 'integer', 'exists:roles,id', 'required_without:permission_id'],
            'permission_id' => ['nullable', 'integer', 'exists:permissions,id', 'required_without:role_id'],
            'scope' => ['nullable', 'string', 'max:120'],
            'reason' => ['required', 'string', 'max:2000'],
            'risk_level' => ['required', Rule::in(['low', 'medium', 'high', 'critical', 'unknown'])],
        ]);
        return response()->json(['data' => $this->service->createRequest($data, $request)], 201);
    }

    public function decideAccessRequest(Request $request, int $id, string $decision): JsonResponse
    {
        $this->manage($request);
        abort_unless(in_array($decision, ['approve', 'reject'], true), 404);
        $data = $request->validate(['lock_version' => ['required', 'integer', 'min:1'], 'reason' => ['required', 'string', 'max:2000'], 'expires_at' => ['nullable', 'date', 'after:now']]);
        return response()->json(['data' => $this->service->decideRequest($id, $decision, $data, $request)]);
    }

    public function auditDashboard(Request $request): JsonResponse
    {
        $this->view($request);
        return response()->json(['data' => $this->service->auditDashboard($request)]);
    }

    public function generateReport(Request $request): JsonResponse
    {
        $this->view($request);
        $data = $request->validate(['name' => ['required', 'string', 'max:255'], 'slug' => ['required', 'alpha_dash', 'max:255'], 'filters' => ['nullable', 'array']]);
        return response()->json(['data' => $this->service->generateReport($data, $request)], 201);
    }

    public function createExport(Request $request): JsonResponse
    {
        $this->view($request);
        $data = $request->validate(['report_run_id' => ['required', 'exists:report_runs,id'], 'format' => ['required', Rule::in(['json', 'csv'])]]);
        $run = DB::table('report_runs as rr')->join('report_definitions as rd', 'rd.id', '=', 'rr.report_definition_id')->where('rr.id', $data['report_run_id'])->where('rd.report_type', 'ecosystem')->first(['rr.id']);
        abort_unless($run, 422, 'Only ecosystem report runs may be exported here.');
        $id = DB::table('report_exports')->insertGetId(['uuid' => (string) Str::uuid(), 'report_run_id' => $run->id, 'user_id' => $request->user()->id, 'export_format' => $data['format'], 'status' => 'pending', 'metadata' => json_encode(['source' => 'ecosystem-control-center']), 'created_at' => now(), 'updated_at' => now()]);
        activity('ecosystem')->causedBy($request->user())->withProperties(['report_export_id' => $id])->log('ecosystem_export.queued');
        return response()->json(['data' => DB::table('report_exports')->find($id)], 201);
    }

    public function exportAudit(Request $request): JsonResponse
    {
        $this->view($request);
        activity('ecosystem')->causedBy($request->user())->log('ecosystem_audit.exported');
        return response()->json(['data' => $this->service->auditDashboard($request)]);
    }

    public function scheduleReport(Request $request): JsonResponse
    {
        $this->manage($request);
        $data = $request->validate(['report_definition_id' => ['required', 'exists:report_definitions,id'], 'frequency' => ['required', Rule::in(['daily', 'weekly', 'monthly'])], 'format' => ['required', Rule::in(['json', 'csv'])], 'filters' => ['nullable', 'array'], 'next_run_at' => ['nullable', 'date']]);
        $id = DB::table('ecosystem_report_schedules')->insertGetId([...$data, 'filters' => isset($data['filters']) ? json_encode($data['filters']) : null, 'status' => 'active', 'created_by' => $request->user()->id, 'created_at' => now(), 'updated_at' => now()]);
        activity('ecosystem')->causedBy($request->user())->withProperties(['schedule_id' => $id])->log('ecosystem_report.schedule_created');
        return response()->json(['data' => DB::table('ecosystem_report_schedules')->find($id)], 201);
    }

    public function createEvidence(Request $request): JsonResponse
    {
        $this->manage($request);
        $data = $request->validate(['name' => ['required', 'string', 'max:255'], 'filters' => ['nullable', 'array']]);
        $id = DB::table('ecosystem_evidence_packages')->insertGetId(['uuid' => (string) Str::uuid(), 'name' => $data['name'], 'status' => 'queued', 'filters' => json_encode($data['filters'] ?? []), 'manifest' => null, 'created_by' => $request->user()->id, 'created_at' => now(), 'updated_at' => now()]);
        activity('ecosystem')->causedBy($request->user())->withProperties(['evidence_package_id' => $id])->log('ecosystem_evidence.queued');
        return response()->json(['data' => DB::table('ecosystem_evidence_packages')->find($id)], 201);
    }

    private function integrationRules(bool $update = false): array
    {
        $rules = [
            'ecosystem_module_id' => ['required', 'integer', 'exists:ecosystem_modules,id'], 'name' => ['required', 'string', 'max:255'], 'provider' => ['nullable', 'string', 'max:255'], 'category' => ['nullable', 'string', 'max:100'],
            'integration_type' => ['required', Rule::in(['api', 'webhook', 'internal_service', 'shared_service', 'external_provider', 'authentication'])], 'environment' => ['required', Rule::in(['development', 'test', 'staging', 'production'])],
            'auth_type' => ['nullable', Rule::in(['oauth2', 'api_key', 'mtls', 'jwt', 'basic', 'service_account', 'none'])], 'credential_reference' => ['nullable', 'string', 'max:160'], 'endpoint_reference' => ['nullable', 'string', 'max:500'], 'owner' => ['nullable', 'string', 'max:160'],
            'timeout_ms' => ['nullable', 'integer', 'between:1,300000'], 'retry_limit' => ['nullable', 'integer', 'between:0,20'], 'sla_target_ms' => ['nullable', 'integer', 'between:1,300000'], 'certificate_expires_at' => ['nullable', 'date'],
        ];
        if ($update) {
            $rules['lock_version'] = ['required', 'integer', 'min:1'];
            $rules['status'] = ['sometimes', Rule::in(['active', 'disabled', 'not_configured'])];
            $rules['risk_level'] = ['sometimes', Rule::in(['low', 'medium', 'high', 'critical', 'unknown'])];
            $rules['compliance_status'] = ['sometimes', Rule::in(['compliant', 'review_required', 'expired', 'exception', 'not_evaluated'])];
        }
        return $rules;
    }

    private function view(Request $request): void { abort_unless($request->user()?->hasPermission('ecosystem.modules.view'), 403); }
    private function manage(Request $request): void { abort_unless($request->user()?->hasPermission('ecosystem.modules.configure'), 403); }
    private function rejectSecrets(Request $request): void
    {
        abort_if($request->hasAny(['api_key', 'secret', 'token', 'password', 'client_secret', 'credential']), 422, 'Submit only a credential reference; secret material is forbidden.');
    }
}
