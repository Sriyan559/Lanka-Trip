<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Services\Admin\AdminRolesPermissionsService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminRolesPermissionsController extends Controller
{
    public function __construct(
        protected AdminRolesPermissionsService $service
    ) {}

    public function index(Request $request): JsonResponse
    {
        $filters = $request->only(['search', 'category', 'risk', 'privilege']);
        $data = $this->service->getFullData($filters);

        return $this->successResponse($data);
    }
}
