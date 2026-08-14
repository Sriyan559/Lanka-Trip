<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Services\Admin\AdminMaintenanceService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminMaintenanceController extends Controller
{
    public function __construct(
        protected AdminMaintenanceService $service
    ) {}

    public function index(Request $request): JsonResponse
    {
        $filters = $request->only(['search', 'status']);
        $data = $this->service->getFullData($filters);

        return $this->successResponse($data);
    }
}
