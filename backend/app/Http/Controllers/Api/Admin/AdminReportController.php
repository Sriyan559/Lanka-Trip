<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Services\Admin\AdminReportRegistry;
use Carbon\CarbonImmutable;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminReportController extends Controller
{
    public function index(Request $request, AdminReportRegistry $registry): JsonResponse
    {
        abort_unless($request->user()->hasPermission('analytics.view'), 403);

        return $this->successResponse(['reports' => $registry->definitions()]);
    }

    public function execute(Request $request, string $report, AdminReportRegistry $registry): JsonResponse
    {
        abort_unless($request->user()->hasPermission('analytics.view'), 403);
        $definition = $registry->definitions()[$report] ?? null;
        abort_unless($definition, 404);
        $validated = $request->validate([
            'from' => ['required', 'date'],
            'to' => ['required', 'date', 'after_or_equal:from'],
            'sort' => ['nullable', 'string'],
            'direction' => ['nullable', 'in:asc,desc'],
            'per_page' => ['nullable', 'integer', 'between:1,100'],
        ]);
        $from = CarbonImmutable::parse($validated['from'])->startOfDay();
        $to = CarbonImmutable::parse($validated['to'])->endOfDay();
        abort_if($from->diffInDays($to) > 366, 422, 'The reporting range may not exceed 366 days.');
        if (isset($validated['sort'])) {
            abort_unless(in_array($validated['sort'], $definition['sorts'], true), 422, 'Unsupported report sort field.');
        }
        $query = $registry->query($report, $from->toDateTimeString(), $to->toDateTimeString());
        abort_unless($query, 404);
        if (isset($validated['sort'])) {
            $query->orderBy($validated['sort'], $validated['direction'] ?? 'asc');
        }

        return $this->successResponse([
            'report' => ['id' => $report, ...$definition],
            'range' => ['from' => $from->toDateString(), 'to' => $to->toDateString()],
            'records' => $query->paginate($validated['per_page'] ?? 50),
            'generated_at' => now()->toIso8601String(),
        ]);
    }
}
