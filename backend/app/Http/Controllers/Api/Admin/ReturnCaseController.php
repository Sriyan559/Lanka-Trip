<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\ReturnCase;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Illuminate\Support\Str;

class ReturnCaseController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $this->authorize('viewAny', ReturnCase::class);
        $validated = $request->validate([
            'status' => ['nullable', Rule::in(ReturnCase::STATUSES)],
            'supplier_id' => ['nullable', 'integer'],
            'search' => ['nullable', 'string', 'max:150'],
            'reason_code' => ['nullable', 'string', 'max:60'],
            'sort' => ['nullable', Rule::in(['created_at','updated_at','return_number','status'])],
            'direction' => ['nullable', Rule::in(['asc','desc'])],
            'per_page' => ['nullable', 'integer', 'between:1,100'],
        ]);
        $query = ReturnCase::with(['customer:id,name,email', 'supplier:id,company_name', 'order:id,order_number,total_amount,currency'])->with('items.orderItem');
        foreach (['status', 'supplier_id','reason_code'] as $field) {
            if (isset($validated[$field])) {
                $query->where($field, $validated[$field]);
            }
        }
        if (!empty($validated['search'])) {$term='%'.$validated['search'].'%';$query->where(fn($q)=>$q->where('return_number','like',$term)->orWhere('reason','like',$term)->orWhereHas('order',fn($o)=>$o->where('order_number','like',$term))->orWhereHas('customer',fn($c)=>$c->where('name','like',$term)));}
        $query->orderBy($validated['sort']??'created_at',$validated['direction']??'desc');

        return $this->successResponse(['returns' => $query->paginate($validated['per_page'] ?? 25)]);
    }

    public function dashboard(Request $request): JsonResponse
    {
        $this->authorize('viewAny', ReturnCase::class); $q=ReturnCase::query(); $total=(clone $q)->count();
        $count=fn(array $statuses)=>(clone $q)->whereIn('status',$statuses)->count();
        $metrics=['totalReverseCases'=>$total,'approvedAwaitingCollection'=>$count(['approved']),'collectionsScheduled'=>$count(['return_shipment_pending']),'collectionsOverdue'=>0,'reverseShipmentsInTransit'=>$count(['return_shipment_pending']),'returnsAwaitingWarehouseReceipt'=>$count(['return_shipment_pending']),'inspectionPending'=>$count(['item_received','inspection_pending']),'restockEligible'=>0,'quarantineRequired'=>0,'supplierReturnsPending'=>0,'reverseExceptions'=>0,'reverseSlaBreaches'=>0,'collectionSuccessRatePercentage'=>0,'averageCollectionTimeDays'=>'—','warehouseReceiptSlaPercentage'=>0,'inspectionPassRatePercentage'=>0,'restockRatePercentage'=>0,'averageReverseCycleTimeDays'=>'—','lastSynced'=>now()->toIso8601String()];
        $intelligence=['healthScore'=>0,'healthLabel'=>'At Risk','healthTrend'=>'—','alerts'=>[],'returnsSummary'=>['totalCases'=>$total,'openCases'=>(clone $q)->whereNotIn('status',['completed','cancelled','rejected'])->count()],'collectionSummary'=>['scheduled'=>$metrics['collectionsScheduled'],'overdue'=>0,'failed'=>0],'receivingInspectionSummary'=>['awaitingReceipt'=>$metrics['returnsAwaitingWarehouseReceipt'],'inspectionPending'=>$metrics['inspectionPending'],'passedPercentage'=>0],'dispositionSummary'=>['restockEligible'=>0,'quarantine'=>0,'supplierReturn'=>0],'refundDependencySummary'=>['pending'=>$count(['refund_pending']),'cleared'=>$count(['completed']),'blocked'=>0],'slaSummary'=>['onTrack'=>0,'atRisk'=>0,'breached'=>0],'quickQueues'=>['collectionQueue'=>$metrics['collectionsScheduled'],'inspectionQueue'=>$metrics['inspectionPending'],'dispositionQueue'=>0,'exceptionQueue'=>0,'reconciliationQueue'=>$count(['refund_pending'])]];
        return $this->successResponse(['metrics'=>$metrics,'intelligence'=>$intelligence]);
    }

    public function store(Request $request): JsonResponse
    {
        $this->authorize('create', ReturnCase::class);
        $d=$request->validate(['order_ref'=>['required','string','max:60'],'reason'=>['required','string','max:2000'],'reason_code'=>['nullable','string','max:60']]);
        $order=DB::table('orders')->whereNull('deleted_at')->where('order_number',$d['order_ref'])->first(); abort_unless($order,422,'Order reference was not found.');
        $item=DB::table('order_items')->where('order_id',$order->id)->first(); abort_unless($item,422,'The order has no returnable items.');
        $case=DB::transaction(function()use($request,$d,$order,$item){$id=DB::table('return_cases')->insertGetId(['uuid'=>(string)Str::uuid(),'return_number'=>'RET-'.now()->format('Y').'-'.str_pad((string)((DB::table('return_cases')->max('id')??0)+1),6,'0',STR_PAD_LEFT),'order_id'=>$order->id,'customer_id'=>$order->buyer_id,'supplier_id'=>$order->supplier_id,'status'=>'requested','reason_code'=>$d['reason_code']??'customer_request','reason'=>$d['reason'],'created_at'=>now(),'updated_at'=>now()]);DB::table('return_items')->insert(['return_case_id'=>$id,'order_item_id'=>$item->id,'quantity'=>1,'inspection_status'=>'pending','created_at'=>now(),'updated_at'=>now()]);DB::table('return_status_history')->insert(['return_case_id'=>$id,'actor_id'=>$request->user()->id,'to_status'=>'requested','notes'=>'Return request created','created_at'=>now()]);activity('admin')->causedBy($request->user())->withProperties(['return_case_id'=>$id])->log('return.created');return ReturnCase::findOrFail($id);});
        return $this->successResponse(['return'=>$case], 'Return request created.', 201);
    }

    public function show(Request $request, string $returnCase): JsonResponse
    {
        $returnCase = $this->findReturn($returnCase);
        $this->authorize('view', $returnCase);

        return $this->successResponse(['return' => $returnCase->load([
            'customer:id,name,email', 'supplier:id,company_name', 'order',
            'items.orderItem', 'supportCase',
        ])->setAttribute('status_history', DB::table('return_status_history')->where('return_case_id', $returnCase->id)->oldest()->get())->setAttribute('evidence', DB::table('return_evidence')
            ->where('return_case_id', $returnCase->id)
            ->where('status', 'active')
            ->get(['id', 'original_name', 'mime_type', 'size_bytes', 'created_at']))]);
    }

    public function transition(Request $request, string $returnCase): JsonResponse
    {
        $returnCase = $this->findReturn($returnCase);
        $validated = $request->validate([
            'status' => ['required', Rule::in(ReturnCase::STATUSES)],
            'notes' => ['nullable', 'string', 'max:2000'],
        ]);
        $ability = $validated['status'] === 'approved' ? 'approve' : 'review';
        $this->authorize($ability, $returnCase);
        abort_unless($returnCase->canTransitionTo($validated['status']), 422, 'Invalid return status transition.');
        if ($validated['status'] === 'rejected') {
            abort_if(blank($validated['notes'] ?? null), 422, 'Decision notes are required for rejection.');
        }

        DB::transaction(function () use ($request, $returnCase, $validated): void {
            $from = $returnCase->status;
            $dates = in_array($validated['status'], ['approved', 'rejected'], true)
                ? ['reviewed_by' => $request->user()->id, 'reviewed_at' => now()]
                : [];
            if ($validated['status'] === 'completed') {
                $dates['completed_at'] = now();
            }
            $returnCase->update(['status' => $validated['status'], ...$dates]);
            DB::table('return_status_history')->insert([
                'return_case_id' => $returnCase->id, 'actor_id' => $request->user()->id,
                'from_status' => $from, 'to_status' => $validated['status'],
                'notes' => $validated['notes'] ?? null, 'created_at' => now(),
            ]);
            activity('admin')->causedBy($request->user())->performedOn($returnCase)
                ->withProperties(['from_status' => $from, 'to_status' => $validated['status']])
                ->log('return.status_changed');
        });

        return $this->successResponse(['return' => $returnCase->refresh()], 'Return status updated.');
    }

    public function inspect(Request $request, string $returnCase): JsonResponse
    {
        $returnCase = $this->findReturn($returnCase);
        $this->authorize('review', $returnCase);
        abort_unless(in_array($returnCase->status, ['item_received', 'inspection_pending'], true), 422, 'Return is not ready for inspection.');
        $validated = $request->validate([
            'result' => ['required', Rule::in(['accepted', 'partially_accepted', 'rejected'])],
            'notes' => ['nullable', 'string', 'max:4000'],
            'findings' => ['nullable', 'array'],
        ]);
        $inspection = DB::table('return_inspections')->insertGetId([
            'return_case_id' => $returnCase->id, 'inspector_id' => $request->user()->id,
            'result' => $validated['result'], 'notes' => $validated['notes'] ?? null,
            'findings' => isset($validated['findings']) ? json_encode($validated['findings'], JSON_THROW_ON_ERROR) : null,
            'inspected_at' => now(), 'created_at' => now(), 'updated_at' => now(),
        ]);

        return $this->successResponse(['inspection_id' => $inspection], 'Inspection recorded.', 201);
    }

    private function findReturn(string $identifier): ReturnCase
    {
        return ReturnCase::where(function ($query) use ($identifier) {
            $query->where('return_number', $identifier)->orWhere('uuid', $identifier);
            if (ctype_digit($identifier)) $query->orWhere('id', (int) $identifier);
        })->firstOrFail();
    }
}
