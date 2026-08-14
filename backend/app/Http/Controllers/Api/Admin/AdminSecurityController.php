<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Services\Admin\AdminSecurityService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminSecurityController extends Controller
{
    public function __construct(
        protected AdminSecurityService $service
    ) {}

    public function index(Request $request): JsonResponse
    {
        $filters = $request->only(['search', 'risk']);
        $data = $this->service->getFullData($filters);

        return $this->successResponse($data);
    }
}
