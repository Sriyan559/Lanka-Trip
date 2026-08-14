<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Services\Admin\AdminTenantOrgService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminTenantOrgController extends Controller
{
    public function __construct(
        protected AdminTenantOrgService $service
    ) {}

    public function index(Request $request): JsonResponse
    {
        $filters = $request->only(['search', 'region', 'status']);
        $data = $this->service->getFullData($filters);

        return $this->successResponse($data);
    }
}
