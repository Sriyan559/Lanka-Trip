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

        $validated = $request->validate([
            'search' => ['nullable', 'string', 'max:150'],
            'status' => ['nullable', Rule::in(array_keys(self::TRANSITIONS))],
            'logistics_partner_id' => ['nullable', 'integer', 'exists:logistics_partners,id'],
            'delayed' => ['nullable', 'boolean'],
            'date_from' => ['nullable', 'date'],
            'date_to' => ['nullable', 'date', 'after_or_equal:date_from'],
        ]);

        $base = $this->filteredShipments($validated);

        $totalShipments = (clone $base)->count();
        $dispatchedToday = (clone $base)->whereDate('shipments.shipped_at', today())->count();
        $outForDelivery = (clone $base)->where('shipments.status', 'out_for_delivery')->count();
        $deliveredCount = (clone $base)->where('shipments.status', 'delivered')->count();
        $delayedCount = (clone $base)
            ->whereNotIn('shipments.status', ['delivered', 'cancelled'])
            ->whereDate('shipments.estimated_delivery_date', '<', today())
            ->count();
        $failedCount = (clone $base)->where('shipments.status', 'failed')->count();

        // 30-Day Volume Trend
        $trendData = [];
        for ($i = 29; $i >= 0; $i--) {
            $dateStr = now()->subDays($i)->format('Y-m-d');
            $dateLabel = now()->subDays($i)->format('M d');
            $created = (clone $base)->whereDate('shipments.created_at', $dateStr)->count();
            $shipped = (clone $base)->whereDate('shipments.shipped_at', $dateStr)->count();
            $delivered = (clone $base)->whereDate('shipments.delivered_at', $dateStr)->count();
            $trendData[] = [
                'date' => $dateLabel,
                'Booked' => $created,
                'Shipped' => $shipped,
                'Delivered' => $delivered,
            ];
        }

        // Carrier Distribution
        $carrierDistribution = $this->filteredShipments($validated)
            ->leftJoin('logistics_partners', 'logistics_partners.id', '=', 'shipments.logistics_partner_id')
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
        $priorityAlerts = $this->filteredShipments($validated)
            ->leftJoin('orders', 'orders.id', '=', 'shipments.order_id')
            ->leftJoin('logistics_partners', 'logistics_partners.id', '=', 'shipments.logistics_partner_id')
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
            'updated_at' => now()->toIso8601String(),
            'total_shipments' => $totalShipments,
            'dispatched_today' => $dispatchedToday,
            'out_for_delivery' => $outForDelivery,
            'delivered_count' => $deliveredCount,
            'delayed_count' => $delayedCount,
            'failed_count' => $failedCount,
            'by_status' => (clone $base)->groupBy('shipments.status')->selectRaw('shipments.status, COUNT(*) AS count')->get(),
            'operational_summary' => collect([
                ['label' => 'On Track', 'count' => max(0, $totalShipments - $delayedCount - $failedCount), 'color' => '#10b981'],
                ['label' => 'Delayed', 'count' => $delayedCount, 'color' => '#f97316'],
                ['label' => 'Exception', 'count' => $failedCount, 'color' => '#e11d48'],
            ])->map(fn ($item) => [...$item, 'percentage' => $totalShipments ? round($item['count'] / $totalShipments * 100, 1) : 0]),
            'carrier_distribution' => $carrierDistribution,
            'trend' => $trendData,
            'priority_alerts' => $priorityAlerts,
            'operations_health' => [
                'dispatch_sla_percentage' => $totalShipments > 0 ? 100 : null,
                'delivery_success_rate' => $totalShipments > 0 ? round(($deliveredCount / $totalShipments) * 100, 1) : null,
            ],
            'quick_queue' => [
                'unassigned_carrier' => (clone $base)->whereNull('shipments.logistics_partner_id')->count(),
                'pending_dispatch' => (clone $base)->where('shipments.status', 'booked')->count(),
                'delivery_failed' => $failedCount,
            ],
        ]]);
    }

    public function index(Request $request): JsonResponse
    {
        $this->view($request);
        $validated = $request->validate([
            'search' => ['nullable', 'string', 'max:150'],
            'status' => ['nullable', 'string', 'max:30'],
            'logistics_partner_id' => ['nullable', 'integer'],
            'delayed' => ['nullable', 'boolean'],
            'per_page' => ['nullable', 'integer', 'between:1,100'],
            'date_from' => ['nullable', 'date'],
            'date_to' => ['nullable', 'date', 'after_or_equal:date_from'],
            'sort' => ['nullable', Rule::in(['created_at', 'updated_at', 'shipment_number', 'status', 'estimated_delivery_date'])],
            'direction' => ['nullable', Rule::in(['asc', 'desc'])],
        ]);
        $query = $this->filteredShipments($validated)
            ->leftJoin('orders', 'orders.id', '=', 'shipments.order_id')
            ->leftJoin('logistics_partners', 'logistics_partners.id', '=', 'shipments.logistics_partner_id')
            ->select([
                'shipments.id', 'shipments.uuid', 'shipments.order_id', 'shipments.supplier_id',
                'shipments.logistics_partner_id', 'shipments.shipment_number', 'shipments.tracking_number',
                'shipments.carrier_reference', 'shipments.estimated_ship_date',
                'shipments.estimated_delivery_date', 'shipments.shipped_at', 'shipments.delivered_at',
                'shipments.status', 'shipments.created_at', 'shipments.updated_at',
                'orders.order_number', 'logistics_partners.name as carrier_name',
            ])
            ->orderBy('shipments.'.($validated['sort'] ?? 'created_at'), $validated['direction'] ?? 'desc');

        return $this->successResponse(['shipments' => $query->paginate($validated['per_page'] ?? 25)]);
    }

    public function show(Request $request, string $shipment): JsonResponse
    {
        $this->view($request);
        $record = DB::table('shipments')->whereNull('deleted_at')->where(function($q)use($shipment){$q->where('shipment_number',$shipment)->orWhere('uuid',$shipment);if(ctype_digit($shipment))$q->orWhere('id',(int)$shipment);})->first();
        abort_unless($record, 404);
        $shipmentId=$record->id;
        unset($record->metadata);

        return $this->successResponse([
            'shipment' => $record,
            'order' => DB::table('orders')->where('id',$record->order_id)->first(),
            'carrier' => $record->logistics_partner_id ? DB::table('logistics_partners')->whereNull('deleted_at')->find($record->logistics_partner_id) : null,
            'packages' => DB::table('shipment_items')->where('shipment_id',$shipmentId)->get(),
            'tracking_events' => DB::table('shipment_tracking_events')->where('shipment_id', $shipmentId)
                ->where('status', 'active')
                ->select(['id', 'shipment_id', 'event_code', 'event_name', 'description', 'location', 'occurred_at', 'status'])
                ->orderByDesc('occurred_at')->paginate(50),
            'delivery_attempts' => DB::table('shipment_delivery_attempts')->where('shipment_id', $shipmentId)->orderByDesc('attempted_at')->get(),
        ]);
    }

    public function addTrackingEvent(Request $request, int $shipment): JsonResponse
    {
        abort_unless($request->user()->hasPermission('logistics.update'), 403);
        $data=$request->validate(['event_code'=>['required','string','max:80'],'event_name'=>['required','string','max:150'],'description'=>['nullable','string','max:2000'],'location'=>['nullable','string','max:200'],'occurred_at'=>['required','date'],'idempotency_key'=>['nullable','string','max:100']]);
        $record=DB::transaction(function()use($request,$shipment,$data){$ship=DB::table('shipments')->whereNull('deleted_at')->lockForUpdate()->find($shipment);abort_unless($ship,404);if(!empty($data['idempotency_key'])){$existing=DB::table('shipment_tracking_events')->where('shipment_id',$shipment)->where('event_code',$data['idempotency_key'])->first();if($existing)return$existing;}$id=DB::table('shipment_tracking_events')->insertGetId(['uuid'=>(string)\Illuminate\Support\Str::uuid(),'shipment_id'=>$shipment,'event_code'=>$data['idempotency_key']??$data['event_code'],'event_name'=>$data['event_name'],'description'=>$data['description']??null,'location'=>$data['location']??null,'occurred_at'=>$data['occurred_at'],'status'=>'active','tracking_payload'=>json_encode(['source_event_code'=>$data['event_code']]),'created_at'=>now(),'updated_at'=>now()]);activity('admin')->causedBy($request->user())->withProperties(['shipment_id'=>$shipment,'tracking_event_id'=>$id])->log('shipment.tracking_event_added');return DB::table('shipment_tracking_events')->find($id);});return $this->successResponse(['tracking_event'=>$record],'Tracking event recorded.',201);
    }

    public function deliveryAttempt(Request $request,int $shipment):JsonResponse
    {
        abort_unless($request->user()->hasPermission('logistics.update'),403);$data=$request->validate(['outcome'=>['required',Rule::in(['delivered','failed','customer_unavailable','refused','address_issue'])],'notes'=>['nullable','string','max:2000'],'attempted_at'=>['required','date']]);$attempt=DB::transaction(function()use($request,$shipment,$data){$ship=DB::table('shipments')->whereNull('deleted_at')->lockForUpdate()->find($shipment);abort_unless($ship,404);$number=DB::table('shipment_delivery_attempts')->where('shipment_id',$shipment)->max('attempt_number')+1;$id=DB::table('shipment_delivery_attempts')->insertGetId(['uuid'=>(string)\Illuminate\Support\Str::uuid(),'shipment_id'=>$shipment,'recorded_by'=>$request->user()->id,'attempt_number'=>$number,'outcome'=>$data['outcome'],'notes'=>$data['notes']??null,'attempted_at'=>$data['attempted_at'],'created_at'=>now(),'updated_at'=>now()]);$status=$data['outcome']==='delivered'?'delivered':'failed';DB::table('shipments')->where('id',$shipment)->update(['status'=>$status,'delivered_at'=>$status==='delivered'?now():$ship->delivered_at,'updated_at'=>now()]);activity('admin')->causedBy($request->user())->withProperties(['shipment_id'=>$shipment,'attempt_id'=>$id,'outcome'=>$data['outcome']])->log('shipment.delivery_attempt_recorded');return DB::table('shipment_delivery_attempts')->find($id);});return$this->successResponse(['delivery_attempt'=>$attempt],'Delivery attempt recorded.',201);
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

    private function filteredShipments(array $filters)
    {
        $query = DB::table('shipments')->whereNull('shipments.deleted_at');
        if (! empty($filters['status'])) $query->where('shipments.status', $filters['status']);
        if (! empty($filters['logistics_partner_id'])) $query->where('shipments.logistics_partner_id', $filters['logistics_partner_id']);
        if (! empty($filters['date_from'])) $query->whereDate('shipments.created_at', '>=', $filters['date_from']);
        if (! empty($filters['date_to'])) $query->whereDate('shipments.created_at', '<=', $filters['date_to']);
        if ($filters['delayed'] ?? false) $query->whereNotIn('shipments.status', ['delivered', 'cancelled'])->whereDate('shipments.estimated_delivery_date', '<', today());
        if (! empty($filters['search'])) {
            $term = '%'.str_replace(['%', '_'], ['\\%', '\\_'], $filters['search']).'%';
            $query->where(function ($q) use ($term) {
                $q->where('shipments.shipment_number', 'like', $term)
                    ->orWhere('shipments.tracking_number', 'like', $term)
                    ->orWhere('shipments.carrier_reference', 'like', $term)
                    ->orWhereExists(fn ($orders) => $orders->selectRaw('1')->from('orders')->whereColumn('orders.id', 'shipments.order_id')->where('orders.order_number', 'like', $term));
            });
        }
        return $query;
    }
}
