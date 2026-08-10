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

        $totalShipments = DB::table('shipments')->whereNull('deleted_at')->count();
        $dispatchedToday = DB::table('shipments')->whereNull('deleted_at')->whereDate('shipped_at', today())->count();
        $outForDelivery = DB::table('shipments')->whereNull('deleted_at')->where('status', 'out_for_delivery')->count();
        $deliveredCount = DB::table('shipments')->whereNull('deleted_at')->where('status', 'delivered')->count();
        $delayedCount = DB::table('shipments')->whereNull('deleted_at')
            ->whereNotIn('status', ['delivered', 'cancelled'])
            ->whereDate('estimated_delivery_date', '<', today())
            ->count();
        $failedCount = DB::table('shipments')->whereNull('deleted_at')->where('status', 'failed')->count();

        // 30-Day Volume Trend
        $trendData = [];
        for ($i = 29; $i >= 0; $i--) {
            $dateStr = now()->subDays($i)->format('Y-m-d');
            $dateLabel = now()->subDays($i)->format('M d');
            $created = DB::table('shipments')->whereNull('deleted_at')->whereDate('created_at', $dateStr)->count();
            $shipped = DB::table('shipments')->whereNull('deleted_at')->whereDate('shipped_at', $dateStr)->count();
            $delivered = DB::table('shipments')->whereNull('deleted_at')->whereDate('delivered_at', $dateStr)->count();
            $trendData[] = [
                'date' => $dateLabel,
                'Booked' => $created,
                'Shipped' => $shipped,
                'Delivered' => $delivered,
            ];
        }

        // Carrier Distribution
        $carrierDistribution = DB::table('shipments')
            ->leftJoin('logistics_partners', 'logistics_partners.id', '=', 'shipments.logistics_partner_id')
            ->whereNull('shipments.deleted_at')
            ->groupBy('logistics_partners.name')
            ->selectRaw("COALESCE(logistics_partners.name, 'Unassigned') AS carrier, COUNT(*) AS count")
            ->get()
            ->map(function ($row) use ($totalShipments) {
                return [
                    'carrier' => $row->carrier,
                    'count' => (int) $row->count,
                    'percentage' => $totalShipments > 0 ? round(($row->count / $totalShipments) * 100, 1) : 0,
                ];
            });

        // Priority Alerts (Delayed / Failed)
        $priorityAlerts = DB::table('shipments')
            ->leftJoin('orders', 'orders.id', '=', 'shipments.order_id')
            ->leftJoin('logistics_partners', 'logistics_partners.id', '=', 'shipments.logistics_partner_id')
            ->whereNull('shipments.deleted_at')
            ->where(function ($q) {
                $q->where('shipments.status', 'failed')
                  ->orWhere('shipments.status', 'delayed')
                  ->orWhere(function ($q2) {
                      $q2->whereNotIn('shipments.status', ['delivered', 'cancelled'])
                         ->whereDate('shipments.estimated_delivery_date', '<', today());
                  });
            })
            ->select([
                'shipments.id', 'shipments.shipment_number', 'shipments.status',
                'shipments.estimated_delivery_date', 'orders.order_number',
                'logistics_partners.name as carrier_name',
            ])
            ->take(10)
            ->get();

        return $this->successResponse(['dashboard' => [
            'total_shipments' => $totalShipments,
            'dispatched_today' => $dispatchedToday,
            'out_for_delivery' => $outForDelivery,
            'delivered_count' => $deliveredCount,
            'delayed_count' => $delayedCount,
            'failed_count' => $failedCount,
            'by_status' => DB::table('shipments')->whereNull('deleted_at')->groupBy('status')->selectRaw('status, COUNT(*) AS count')->get(),
            'carrier_distribution' => $carrierDistribution,
            'trend' => $trendData,
            'priority_alerts' => $priorityAlerts,
            'operations_health' => [
                'dispatch_sla_percentage' => $totalShipments > 0 ? 100 : null,
                'delivery_success_rate' => $totalShipments > 0 ? round(($deliveredCount / $totalShipments) * 100, 1) : null,
            ],
            'quick_queue' => [
                'unassigned_carrier' => DB::table('shipments')->whereNull('deleted_at')->whereNull('logistics_partner_id')->count(),
                'pending_dispatch' => DB::table('shipments')->whereNull('deleted_at')->where('status', 'booked')->count(),
                'delivery_failed' => $failedCount,
            ],
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

    public function referenceData(Request $request): JsonResponse
    {
        $this->view($request);

        $orders = DB::table('orders')->select(['id', 'order_number', 'supplier_id'])->take(100)->get();
        $partners = DB::table('logistics_partners')->whereNull('deleted_at')->select(['id', 'name'])->get();
        $suppliers = DB::table('suppliers')->select(['id', 'company_name'])->take(100)->get();

        return $this->successResponse([
            'orders' => $orders,
            'logistics_partners' => $partners,
            'suppliers' => $suppliers,
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        abort_unless($request->user()->hasPermission('logistics.create'), 403);
        $validated = $request->validate([
            'order_id' => ['required', 'integer', 'exists:orders,id'],
            'supplier_id' => ['nullable', 'integer', 'exists:suppliers,id'],
            'logistics_partner_id' => ['nullable', 'integer', 'exists:logistics_partners,id'],
            'tracking_number' => ['nullable', 'string', 'max:100'],
            'carrier_reference' => ['nullable', 'string', 'max:100'],
            'estimated_ship_date' => ['nullable', 'date'],
            'estimated_delivery_date' => ['nullable', 'date'],
            'status' => ['nullable', 'string', Rule::in(array_keys(self::TRANSITIONS))],
        ]);

        $shipment = DB::transaction(function () use ($request, $validated) {
            $nextId = (DB::table('shipments')->max('id') ?? 0) + 1;
            $shipmentNumber = 'SHP-' . now()->format('Y') . '-' . str_pad((string) $nextId, 5, '0', STR_PAD_LEFT);
            $uuid = (string) \Illuminate\Support\Str::uuid();
            $status = $validated['status'] ?? 'pending';

            $id = DB::table('shipments')->insertGetId([
                'uuid' => $uuid,
                'order_id' => $validated['order_id'],
                'supplier_id' => $validated['supplier_id'] ?? null,
                'logistics_partner_id' => $validated['logistics_partner_id'] ?? null,
                'shipment_number' => $shipmentNumber,
                'tracking_number' => $validated['tracking_number'] ?? null,
                'carrier_reference' => $validated['carrier_reference'] ?? null,
                'estimated_ship_date' => $validated['estimated_ship_date'] ?? null,
                'estimated_delivery_date' => $validated['estimated_delivery_date'] ?? null,
                'status' => $status,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            DB::table('shipment_tracking_events')->insert([
                'uuid' => (string) \Illuminate\Support\Str::uuid(),
                'shipment_id' => $id,
                'event_code' => 'CREATED',
                'event_name' => 'Shipment Created',
                'description' => 'Shipment record created in system.',
                'occurred_at' => now(),
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            $record = DB::table('shipments')->where('id', $id)->first();
            activity('admin')->causedBy($request->user())->withProperties([
                'shipment_id' => $id,
                'shipment_number' => $shipmentNumber,
            ])->log('shipment.created');

            return $record;
        });

        return $this->successResponse([
            'shipment' => $shipment,
        ], 'Shipment created successfully.', 201);
    }

    public function update(Request $request, int $shipment): JsonResponse
    {
        abort_unless($request->user()->hasPermission('logistics.update'), 403);
        $record = DB::table('shipments')->where('id', $shipment)->whereNull('deleted_at')->first();
        abort_unless($record, 404);

        $validated = $request->validate([
            'logistics_partner_id' => ['nullable', 'integer', 'exists:logistics_partners,id'],
            'tracking_number' => ['nullable', 'string', 'max:100'],
            'carrier_reference' => ['nullable', 'string', 'max:100'],
            'estimated_ship_date' => ['nullable', 'date'],
            'estimated_delivery_date' => ['nullable', 'date'],
            'status' => ['nullable', 'string', Rule::in(array_keys(self::TRANSITIONS))],
        ]);

        $updated = DB::transaction(function () use ($request, $shipment, $validated) {
            $data = array_filter($validated, fn($val) => $val !== null);
            $data['updated_at'] = now();

            DB::table('shipments')->where('id', $shipment)->update($data);

            activity('admin')->causedBy($request->user())->withProperties([
                'shipment_id' => $shipment,
                'updated_fields' => array_keys($data),
            ])->log('shipment.updated');

            return DB::table('shipments')->where('id', $shipment)->first();
        });

        return $this->successResponse(['shipment' => $updated], 'Shipment updated successfully.');
    }

    public function destroy(Request $request, int $shipment): JsonResponse
    {
        abort_unless($request->user()->hasPermission('logistics.delete'), 403);
        $record = DB::table('shipments')->where('id', $shipment)->whereNull('deleted_at')->first();
        abort_unless($record, 404);

        DB::transaction(function () use ($request, $shipment, $record) {
            DB::table('shipments')->where('id', $shipment)->update([
                'deleted_at' => now(),
                'status' => 'cancelled',
                'updated_at' => now(),
            ]);

            activity('admin')->causedBy($request->user())->withProperties([
                'shipment_id' => $shipment,
                'shipment_number' => $record->shipment_number,
            ])->log('shipment.deleted');
        });

        return $this->successResponse([], 'Shipment deleted/cancelled successfully.');
    }

    private function view(Request $request): void
    {
        abort_unless($request->user()->hasPermission('logistics.view'), 403);
    }
}
