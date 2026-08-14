<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Services\Admin\AdminCommunicationsService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminCommunicationsController extends Controller
{
    public function __construct(
        protected AdminCommunicationsService $service
    ) {}

    public function index(Request $request): JsonResponse
    {
        $filters = $request->only(['search', 'channel']);
        $data = $this->service->getFullData($filters);

        return $this->successResponse($data);
    }
}
