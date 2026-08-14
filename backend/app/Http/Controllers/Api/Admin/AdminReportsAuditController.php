<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Services\Admin\AdminReportsAuditService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminReportsAuditController extends Controller
{
    public function __construct(
        protected AdminReportsAuditService $service
    ) {}

    public function index(Request $request): JsonResponse
    {
        $filters = $request->only(['search', 'category']);
        $data = $this->service->getFullData($filters);

        return $this->successResponse($data);
    }
}
