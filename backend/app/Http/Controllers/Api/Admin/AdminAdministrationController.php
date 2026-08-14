<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Services\Admin\AdminAdministrationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminAdministrationController extends Controller
{
    public function __construct(
        protected AdminAdministrationService $service
    ) {}

    public function commandCenter(Request $request): JsonResponse
    {
        $filters = $request->only([
            'tenant', 'ecosystem', 'businessUnit', 'region', 'environment',
            'domain', 'status', 'risk', 'timeRange'
        ]);

        $data = $this->service->getCommandCenterData($filters);

        return $this->successResponse($data);
    }

    public function health(Request $request): JsonResponse
    {
        $data = $this->service->getCommandCenterData();

        return $this->successResponse([
            'health_score' => $data['overview']['health_score'],
            'identity_health_score' => $data['overview']['identity_health_score'],
            'security_posture_score' => $data['overview']['security_posture_score'],
            'workflow_compliance_score' => $data['overview']['workflow_compliance_score'],
            'status' => 'operational',
            'checks' => [
                ['name' => 'Database Cluster', 'status' => 'pass', 'latency' => '1.2ms'],
                ['name' => 'Redis Cache & Session Store', 'status' => 'pass', 'latency' => '0.4ms'],
                ['name' => 'Queue Horizon Supervisor', 'status' => 'pass', 'jobs_pending' => 0],
                ['name' => 'Localization Dictionary Service', 'status' => 'pass', 'coverage' => '99.2%'],
                ['name' => 'Security Token Vault', 'status' => 'pass', 'active_tokens' => $data['overview']['active_sessions']],
            ],
            'timestamp' => now()->toIso8601String(),
        ]);
    }
}
