<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Services\Admin\AdminDataGovernanceService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminDataGovernanceController extends Controller
{
    public function __construct(
        protected AdminDataGovernanceService $service
    ) {}

    public function index(Request $request): JsonResponse
    {
        $filters = $request->only(['search', 'status']);
        $data = $this->service->getFullData($filters);

        return $this->successResponse($data);
    }
}
