<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Services\Admin\AdminWorkflowsService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminWorkflowsController extends Controller
{
    public function __construct(
        protected AdminWorkflowsService $service
    ) {}

    public function index(Request $request): JsonResponse
    {
        $filters = $request->only(['search', 'status']);
        $data = $this->service->getFullData($filters);

        return $this->successResponse($data);
    }
}
