<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\FinanceGovernanceIndexRequest;
use App\Services\Admin\FinanceGovernanceService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class FinanceGovernanceController extends Controller
{
    public function __construct(private readonly FinanceGovernanceService $service) {}
    public function reconciliation(Request $request): JsonResponse { abort_unless($request->user()->hasPermission('analytics.view'), 403); return $this->successResponse($this->service->reconciliation()); }
    public function reports(FinanceGovernanceIndexRequest $request): JsonResponse { return $this->successResponse($this->service->reports($request->validated())); }
    public function report(Request $request, string $uuid): JsonResponse { abort_unless($request->user()->hasPermission('analytics.view'), 403); $record=$this->service->report($uuid); abort_unless($record, 404); return $this->successResponse($record); }
}
