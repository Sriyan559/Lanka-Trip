<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class LogisticsController extends Controller
{
    private const TRANSITIONS = [
        'pending' => ['booked', 'cancelled'],
        'booked' => ['in_transit', 'cancelled'],
        'in_transit' => ['out_for_delivery', 'delayed', 'failed'],
        'delayed' => ['in_transit', 'out_for_delivery', 'failed'],
        'out_for_delivery' => ['delivered', 'failed'],
        'failed' => ['out_for_delivery', 'returned'],
        'delivered' => [],
        'returned' => [],
        'cancelled' => [],
    ];

    public function dashboard(Request $request): JsonResponse
    {
        $this->view($request);

        return $this->successResponse(['dashboard' => [
            'by_status' => DB::table('shipments')->whereNull('deleted_at')->groupBy('status')->selectRaw('status, COUNT(*) AS count')->get(),
            'delayed' => DB::table('shipments')->whereNull('deleted_at')->whereNotIn('status', ['delivered', 'cancelled'])
                ->whereDate('estimated_delivery_date', '<', today())->count(),
            'failed_deliveries' => DB::table('shipments')->whereNull('deleted_at')->where('status', 'failed')->count(),
            'carrier_distribution' => DB::table('shipments')->leftJoin('logistics_partners', 'logistics_partners.id', '=', 'shipments.logistics_partner_id')
                ->whereNull('shipments.deleted_at')->groupBy('logistics_partners.name')
                ->selectRaw("COALESCE(logistics_partners.name, 'Unassigned') AS carrier, COUNT(*) AS count")->get(),
            'warehouse_workload' => ['value' => null, 'availability' => 'unavailable', 'reason' => 'shipment_warehouse_relationship_missing'],
        ]]);
    }

    public function index(Request $request): JsonResponse
    {
        $this->view($request);
        $validated = $request->validate([
            'status' => ['nullable', 'string', 'max:30'],
            'logistics_partner_id' => ['nullable', 'integer'],
            'delayed' => ['nullable', 'boolean'],
            'per_page' => ['nullable', 'integer', 'between:1,100'],
        ]);
        $query = DB::table('shipments')
            ->leftJoin('orders', 'orders.id', '=', 'shipments.order_id')
            ->leftJoin('logistics_partners', 'logistics_partners.id', '=', 'shipments.logistics_partner_id')
            ->whereNull('shipments.deleted_at')
            ->select([
                'shipments.id', 'shipments.uuid', 'shipments.order_id', 'shipments.supplier_id',
                'shipments.logistics_partner_id', 'shipments.shipment_number', 'shipments.tracking_number',
                'shipments.carrier_reference', 'shipments.estimated_ship_date',
                'shipments.estimated_delivery_date', 'shipments.shipped_at', 'shipments.delivered_at',
                'shipments.status', 'shipments.created_at', 'shipments.updated_at',
                'orders.order_number', 'logistics_partners.name as carrier_name',
            ])
            ->orderByDesc('shipments.created_at');
        if (isset($validated['status'])) {
            $query->where('shipments.status', $validated['status']);
        }
        if (isset($validated['logistics_partner_id'])) {
            $query->where('shipments.logistics_partner_id', $validated['logistics_partner_id']);
        }
        if ($validated['delayed'] ?? false) {
            $query->whereNotIn('shipments.status', ['delivered', 'cancelled'])->whereDate('shipments.estimated_delivery_date', '<', today());
        }

        return $this->successResponse(['shipments' => $query->paginate($validated['per_page'] ?? 25)]);
    }

    public function show(Request $request, int $shipment): JsonResponse
    {
        $this->view($request);
        $record = DB::table('shipments')->where('id', $shipment)->whereNull('deleted_at')->first();
        abort_unless($record, 404);
        unset($record->metadata);

        return $this->successResponse([
            'shipment' => $record,
            'tracking_events' => DB::table('shipment_tracking_events')->where('shipment_id', $shipment)
                ->where('status', 'active')
                ->select(['id', 'shipment_id', 'event_code', 'event_name', 'description', 'location', 'occurred_at', 'status'])
                ->orderByDesc('occurred_at')->paginate(50),
        ]);
    }

    public function updateStatus(Request $request, int $shipment): JsonResponse
    {
        abort_unless($request->user()->hasPermission('logistics.update'), 403);
        $validated = $request->validate([
            'status' => ['required', Rule::in(array_keys(self::TRANSITIONS))],
            'notes' => ['nullable', 'string', 'max:2000'],
        ]);
        $record = DB::transaction(function () use ($request, $shipment, $validated) {
            $record = DB::table('shipments')->where('id', $shipment)->whereNull('deleted_at')->lockForUpdate()->first();
            abort_unless($record, 404);
            abort_unless(in_array($validated['status'], self::TRANSITIONS[$record->status] ?? [], true), 422, 'Invalid shipment status transition.');
            $dates = match ($validated['status']) {
                'in_transit' => ['shipped_at' => $record->shipped_at ?? now()],
                'delivered' => ['delivered_at' => now()],
                default => [],
            };
            DB::table('shipments')->where('id', $shipment)->update(['status' => $validated['status'], ...$dates, 'updated_at' => now()]);
            activity('admin')->causedBy($request->user())->withProperties([
                'shipment_id' => $shipment, 'from_status' => $record->status,
                'to_status' => $validated['status'], 'notes' => $validated['notes'] ?? null,
            ])->log('shipment.status_changed');

            return DB::table('shipments')->where('id', $shipment)->first();
        });

        return $this->successResponse(['shipment' => $record], 'Shipment status updated.');
    }

    private function view(Request $request): void
    {
        abort_unless($request->user()->hasPermission('logistics.view'), 403);
    }
}
