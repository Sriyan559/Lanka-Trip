<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Services\Admin\AdminDashboardService;
use Carbon\CarbonImmutable;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminDashboardController extends Controller
{
    public function __invoke(Request $request, AdminDashboardService $service): JsonResponse
    {
        abort_unless($request->user()->hasPermission('admin.dashboard.view'), 403);
        $validated = $request->validate([
            'from' => ['nullable', 'date'],
            'to' => ['nullable', 'date', 'after_or_equal:from'],
        ]);
        $to = CarbonImmutable::parse($validated['to'] ?? today())->endOfDay();
        $from = CarbonImmutable::parse($validated['from'] ?? $to->subDays(29))->startOfDay();
        abort_if($from->diffInDays($to) > 366, 422, 'The reporting range may not exceed 366 days.');

        return $this->successResponse(['overview' => $service->overview($from, $to)]);
    }
}
