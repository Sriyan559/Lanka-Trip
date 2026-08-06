<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Services\Admin\MarketplaceDashboardService;
use Carbon\CarbonImmutable;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Symfony\Component\HttpFoundation\StreamedResponse;

class MarketplaceDashboardController extends Controller
{
    public function show(Request $request, MarketplaceDashboardService $service): JsonResponse
    {
        abort_unless($request->user()->hasPermission('admin.dashboard.view'), 403);
        [$validated, $from, $to] = $this->filters($request);

        return $this->successResponse(['data' => $service->dashboard($from, $to, $validated['currency'] ?? null, $validated['timezone'] ?? config('app.timezone'), [
            'can_export' => $request->user()->hasPermission('analytics.export'),
            'can_manage' => $request->user()->hasPermission('suppliers.manage'),
        ])]);
    }

    public function export(Request $request, MarketplaceDashboardService $service): StreamedResponse
    {
        abort_unless($request->user()->hasPermission('analytics.export'), 403);
        [$validated, $from, $to] = $this->filters($request);
        $dashboard = $service->dashboard($from, $to, $validated['currency'] ?? null, $validated['timezone'] ?? config('app.timezone'), ['can_export' => true]);
        $filename = "marketplace-dashboard-{$from->toDateString()}-{$to->toDateString()}.csv";

        return response()->streamDownload(function () use ($dashboard): void {
            $handle = fopen('php://output', 'wb');
            fputcsv($handle, ['Metric', 'Availability', 'Value', 'Currency', 'Definition / reason']);
            foreach ($dashboard['summary'] as $name => $metric) {
                fputcsv($handle, [$name, $metric['availability'], $metric['value'], $metric['currency'] ?? '', $metric['definition'] ?? $metric['reason'] ?? '']);
            }
            fclose($handle);
        }, $filename, ['Content-Type' => 'text/csv; charset=UTF-8', 'X-Content-Type-Options' => 'nosniff']);
    }

    private function filters(Request $request): array
    {
        $validated = $request->validate([
            'dateFrom' => ['nullable', 'date'],
            'dateTo' => ['nullable', 'date', 'after_or_equal:dateFrom'],
            // Stored timestamps use the configured application timezone; do not imply unsupported cross-zone conversion.
            'timezone' => ['nullable', 'timezone', Rule::in([config('app.timezone')])],
            'currency' => ['nullable', 'string', 'size:3', Rule::exists('currencies', 'code')->where('status', 'active')],
        ]);
        $timezone = $validated['timezone'] ?? config('app.timezone');
        $to = CarbonImmutable::parse($validated['dateTo'] ?? today($timezone), $timezone)->endOfDay();
        $from = CarbonImmutable::parse($validated['dateFrom'] ?? $to->subDays(29), $timezone)->startOfDay();
        abort_if($from->diffInDays($to) > 366, 422, 'The reporting range may not exceed 366 days.');

        return [$validated, $from, $to];
    }
}
