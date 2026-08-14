<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Services\Admin\AdminSystemConfigService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminSystemConfigController extends Controller
{
    public function __construct(
        protected AdminSystemConfigService $service
    ) {}

    public function index(Request $request): JsonResponse
    {
        $filters = $request->only(['search', 'category']);
        $data = $this->service->getFullData($filters);

        return $this->successResponse($data);
    }
}
