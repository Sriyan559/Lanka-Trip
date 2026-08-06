<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\MarketplaceWorkspaceRequest;
use App\Models\Order;
use App\Services\Admin\MarketplaceWorkspaceService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Symfony\Component\HttpFoundation\StreamedResponse;

class MarketplaceWorkspaceController extends Controller
{
    public function __construct(private readonly MarketplaceWorkspaceService $service) {}

    public function index(MarketplaceWorkspaceRequest $request, string $workspace): array
    {
        abort_unless(in_array($workspace, MarketplaceWorkspaceRequest::WORKSPACES, true), 404);
        return ['success' => true, 'data' => $this->service->index($workspace, $request->filters(), $this->permissions($request, $workspace))];
    }

    public function export(MarketplaceWorkspaceRequest $request, string $workspace): StreamedResponse
    {
        abort_unless(in_array($workspace, MarketplaceWorkspaceRequest::WORKSPACES, true), 404);
        abort_unless($request->user()->hasPermission('analytics.export'), 403);
        $data = $this->service->index($workspace, $request->filters(), $this->permissions($request, $workspace));
        return response()->streamDownload(function () use ($request, $workspace, $data): void {
            $out = fopen('php://output', 'wb'); $keys = collect($data['columns'])->pluck('key')->all(); fputcsv($out, collect($data['columns'])->pluck('label')->all());
            foreach ($this->service->exportRows($workspace, $request->filters(), $data['permissions']) as $row) {
                fputcsv($out, collect($keys)->map(function ($key) use ($row) { $value = $row[$key] ?? null; if (is_array($value) && isset($value['value'])) $value = trim(($value['currency'] ?? '').' '.$value['value']); if (is_bool($value)) $value = $value ? 'Yes' : 'No'; return is_string($value) && preg_match('/^[=+\-@]/', $value) ? "'{$value}" : $value; })->all());
            }
            fclose($out);
        }, "marketplace-{$workspace}-".now()->format('Y-m-d-His').'.csv', ['Content-Type' => 'text/csv; charset=UTF-8']);
    }

    public function order(Request $request, int $order): array
    {
        abort_unless($request->user()->hasPermission('orders.view'), 403);
        $data = $this->service->orderDetail($order, ['canManage' => $request->user()->hasPermission('orders.manage')]); abort_if(! $data, 404);
        return ['success' => true, 'data' => $data];
    }

    public function note(Request $request, Order $order): JsonResponse
    {
        abort_unless($request->user()->hasPermission('orders.manage'), 403);
        $validated = $request->validate(['note' => ['required', 'string', 'max:4000']]);
        DB::transaction(function () use ($request, $order, $validated): void { DB::table('order_notes')->insert(['uuid' => (string) Str::uuid(), 'order_id' => $order->id, 'user_id' => $request->user()->id, 'note' => $validated['note'], 'is_internal' => true, 'status' => 'active', 'created_at' => now(), 'updated_at' => now()]); activity('admin')->causedBy($request->user())->performedOn($order)->log('order.note_added'); });
        return response()->json(['success' => true, 'message' => 'Internal note added.'], 201);
    }

    public function transition(Request $request, Order $order): JsonResponse
    {
        abort_unless($request->user()->hasPermission('orders.manage'), 403);
        $validated = $request->validate(['status' => ['required', Rule::in(Order::STATUSES)], 'expectedStatus' => ['required', Rule::in(Order::STATUSES)], 'reason' => ['required', 'string', 'max:2000']]);
        abort_if($order->status !== $validated['expectedStatus'], 409, 'Order status changed. Refresh and try again.'); abort_unless($order->canTransitionTo($validated['status']), 422, 'Invalid order status transition.');
        DB::transaction(function () use ($request, $order, $validated): void { $from = $order->status; $order->update(['status' => $validated['status']]); DB::table('order_status_histories')->insert(['order_id' => $order->id, 'changed_by' => $request->user()->id, 'previous_status' => $from, 'new_status' => $validated['status'], 'notes' => $validated['reason'], 'created_at' => now(), 'updated_at' => now()]); activity('admin')->causedBy($request->user())->performedOn($order)->withProperties(['from' => $from, 'to' => $validated['status']])->log('order.status_changed'); });
        return response()->json(['success' => true, 'message' => 'Order status updated.', 'data' => ['status' => $order->refresh()->status]]);
    }

    private function permissions(Request $request, string $workspace): array
    {
        return ['canView' => true, 'canExport' => $request->user()->hasPermission('analytics.export'), 'canManage' => match ($workspace) { 'orders', 'cancellations' => $request->user()->hasPermission('orders.manage'), 'returns' => $request->user()->hasPermission('returns.review'), default => false }];
    }
}
