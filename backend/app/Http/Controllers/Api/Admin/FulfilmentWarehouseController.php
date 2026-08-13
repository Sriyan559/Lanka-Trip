<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class FulfilmentWarehouseController extends Controller
{
    private const STATES = ['pending','unassigned','allocation_pending','partially_allocated','allocated','picking','packing','quality_review','ready_to_dispatch','shipment_created','on_hold','blocked','completed','cancelled'];

    public function fulfilments(Request $request): JsonResponse
    {
        $this->permit($request, 'logistics.view');
        $filters = $this->fulfilmentFilters($request);
        $base = $this->orders($filters);
        $total = (clone $base)->count();
        $statusRows = (clone $base)->groupBy('orders.fulfillment_status')->selectRaw('orders.fulfillment_status status, COUNT(*) count')->get();
        $statusCounts = $statusRows->pluck('count', 'status');
        $trend = (clone $base)->selectRaw("DATE(orders.created_at) date, COUNT(*) created")
            ->where('orders.created_at', '>=', now()->subDays(29)->startOfDay())->groupByRaw('DATE(orders.created_at)')->orderBy('date')->get();
        $rows = (clone $base)->leftJoin('buyers', 'buyers.id', '=', 'orders.buyer_id')
            ->leftJoin('suppliers', 'suppliers.id', '=', 'orders.supplier_id')
            ->leftJoin('logistics_facilities', 'logistics_facilities.id', '=', 'orders.logistics_facility_id')
            ->leftJoinSub(DB::table('order_items')->selectRaw('order_id, COUNT(*) item_count, COUNT(DISTINCT product_id) sku_count')->groupBy('order_id'), 'items', 'items.order_id', '=', 'orders.id')
            ->select(['orders.id','orders.order_number','orders.fulfillment_status','orders.order_source','orders.created_at','orders.updated_at','buyers.name as customer_name','suppliers.company_name as supplier_name','logistics_facilities.id as facility_id','logistics_facilities.reference as facility_reference','logistics_facilities.name as facility_name',DB::raw('COALESCE(items.item_count,0) item_count'),DB::raw('COALESCE(items.sku_count,0) sku_count')])
            ->orderBy('orders.'.($filters['sort'] ?? 'created_at'), $filters['direction'] ?? 'desc')->paginate($filters['per_page'] ?? 15);
        $distribution = collect(self::STATES)->map(fn ($status) => ['status'=>$status,'count'=>(int)($statusCounts[$status] ?? 0),'percentage'=>$total ? round(($statusCounts[$status] ?? 0) / $total * 100, 1) : 0]);
        return response()->json(['data'=>['updated_at'=>now()->toIso8601String(),'kpis'=>['total'=>$total,'unassigned'=>(int)($statusCounts['unassigned'] ?? 0),'allocation_pending'=>(int)($statusCounts['allocation_pending'] ?? 0),'allocated'=>(int)($statusCounts['allocated'] ?? 0),'picking'=>(int)($statusCounts['picking'] ?? 0),'packing'=>(int)($statusCounts['packing'] ?? 0),'ready_to_dispatch'=>(int)($statusCounts['ready_to_dispatch'] ?? 0),'blocked'=>(int)($statusCounts['blocked'] ?? 0)],'status_distribution'=>$distribution,'trend'=>$trend,'bottlenecks'=>$distribution->whereIn('status',['allocation_pending','blocked','on_hold'])->values(),'orders'=>$rows]]);
    }

    public function fulfilment(Request $request, int $order): JsonResponse
    {
        $this->permit($request, 'logistics.view');
        $record = $this->orders([])->leftJoin('logistics_facilities','logistics_facilities.id','=','orders.logistics_facility_id')->select(['orders.*','logistics_facilities.name as facility_name','logistics_facilities.reference as facility_reference'])->where('orders.id',$order)->first();
        abort_unless($record, 404);
        return response()->json(['data'=>['order'=>$record,'items'=>DB::table('order_items')->where('order_id',$order)->get(),'shipments'=>DB::table('shipments')->whereNull('deleted_at')->where('order_id',$order)->get(),'activity'=>DB::table('activity_log')->where('subject_id',$order)->where('subject_type','like','%Order')->orderByDesc('created_at')->limit(50)->get()]]);
    }

    public function transition(Request $request, int $order): JsonResponse
    {
        $this->permit($request, 'logistics.update');
        $data = $request->validate(['status'=>['required',Rule::in(self::STATES)],'notes'=>['nullable','string','max:2000']]);
        $allowed = ['pending'=>['unassigned','allocation_pending','cancelled'],'unassigned'=>['allocation_pending','blocked'],'allocation_pending'=>['partially_allocated','allocated','blocked'],'partially_allocated'=>['allocated','blocked'],'allocated'=>['picking','on_hold'],'picking'=>['packing','blocked'],'packing'=>['quality_review','ready_to_dispatch','blocked'],'quality_review'=>['ready_to_dispatch','blocked'],'ready_to_dispatch'=>['shipment_created','on_hold'],'shipment_created'=>['completed'],'on_hold'=>['allocated','picking','packing','ready_to_dispatch','cancelled'],'blocked'=>['allocation_pending','allocated','cancelled']];
        $updated = DB::transaction(function () use ($request,$order,$data,$allowed) {
            $row=DB::table('orders')->whereNull('deleted_at')->where('id',$order)->lockForUpdate()->first(); abort_unless($row,404);
            abort_unless(in_array($data['status'],$allowed[$row->fulfillment_status] ?? [],true),422,'Invalid fulfilment transition.');
            DB::table('orders')->where('id',$order)->update(['fulfillment_status'=>$data['status'],'updated_at'=>now()]);
            activity('admin')->causedBy($request->user())->withProperties(['from'=>$row->fulfillment_status,'to'=>$data['status'],'notes'=>$data['notes'] ?? null])->performedOn(\App\Models\Order::findOrFail($order))->log('fulfilment.status_changed');
            return DB::table('orders')->find($order);
        });
        return response()->json(['data'=>['order'=>$updated]]);
    }

    public function warehouses(Request $request): JsonResponse
    {
        $this->permit($request, 'logistics.view');
        $f=$request->validate(['search'=>['nullable','string','max:150'],'type'=>['nullable','string','max:40'],'status'=>['nullable','string','max:30'],'region'=>['nullable','string','max:100'],'capacity_status'=>['nullable','string','max:30'],'sort'=>['nullable',Rule::in(['name','reference','type','status','total_capacity','capacity_used','created_at'])],'direction'=>['nullable',Rule::in(['asc','desc'])],'per_page'=>['nullable','integer','between:1,100']]);
        $q=$this->facilities($f); $total=(clone $q)->count();
        $rows=(clone $q)->select('*')->selectRaw('CASE WHEN total_capacity > 0 THEN ROUND(capacity_used * 100.0 / total_capacity, 2) ELSE 0 END capacity_used_percent')->orderBy($f['sort'] ?? 'created_at',$f['direction'] ?? 'desc')->paginate($f['per_page'] ?? 15);
        $types=(clone $q)->groupBy('type')->selectRaw('type,COUNT(*) count')->get(); $statuses=(clone $q)->groupBy('status')->selectRaw('status,COUNT(*) count')->get();
        return response()->json(['data'=>['updated_at'=>now()->toIso8601String(),'kpis'=>['total'=>$total,'active'=>(clone $q)->where('status','active')->count(),'inactive'=>(clone $q)->where('status','inactive')->count(),'critical'=>(clone $q)->where('capacity_status','critical')->count()],'type_distribution'=>$types,'status_summary'=>$statuses,'facilities'=>$rows]]);
    }

    public function warehouse(Request $request, int $facility): JsonResponse { $this->permit($request,'logistics.view'); $row=DB::table('logistics_facilities')->whereNull('deleted_at')->find($facility); abort_unless($row,404); return response()->json(['data'=>['facility'=>$row,'orders'=>DB::table('orders')->whereNull('deleted_at')->where('logistics_facility_id',$facility)->latest()->limit(50)->get()]]); }
    public function storeWarehouse(Request $request): JsonResponse { $this->permit($request,'logistics.create'); return $this->saveWarehouse($request); }
    public function updateWarehouse(Request $request,int $facility): JsonResponse { $this->permit($request,'logistics.update'); abort_unless(DB::table('logistics_facilities')->whereNull('deleted_at')->find($facility),404); return $this->saveWarehouse($request,$facility); }
    private function saveWarehouse(Request $request,?int $id=null): JsonResponse { $d=$request->validate(['reference'=>[$id?'sometimes':'required','string','max:80',Rule::unique('logistics_facilities','reference')->ignore($id)],'name'=>[$id?'sometimes':'required','string','max:150'],'type'=>[$id?'sometimes':'required',Rule::in(['warehouse','fulfilment_centre','hybrid'])],'status'=>['sometimes',Rule::in(['active','inactive','maintenance'])],'capacity_status'=>['nullable',Rule::in(['healthy','high','critical'])],'region'=>['nullable','string','max:100'],'city'=>['nullable','string','max:100'],'total_capacity'=>['nullable','numeric','min:0'],'capacity_used'=>['nullable','numeric','min:0'],'capabilities'=>['nullable','array']]); $row=DB::transaction(function()use($request,$d,$id){$d[$id?'updated_by':'created_by']=$request->user()->id;$d['updated_at']=now();if($id)DB::table('logistics_facilities')->where('id',$id)->update($d);else{$d['uuid']=(string)Str::uuid();$d['created_at']=now();$id=DB::table('logistics_facilities')->insertGetId($d);}activity('admin')->causedBy($request->user())->withProperties(['facility_id'=>$id,'fields'=>array_keys($d)])->log($id?'warehouse.updated':'warehouse.created');return DB::table('logistics_facilities')->find($id);});return response()->json(['data'=>['facility'=>$row]],201); }
    private function fulfilmentFilters(Request $r): array { return $r->validate(['search'=>['nullable','string','max:150'],'status'=>['nullable',Rule::in(self::STATES)],'facility_id'=>['nullable','integer','exists:logistics_facilities,id'],'supplier_id'=>['nullable','integer','exists:suppliers,id'],'date_from'=>['nullable','date'],'date_to'=>['nullable','date','after_or_equal:date_from'],'sort'=>['nullable',Rule::in(['created_at','updated_at','order_number','fulfillment_status'])],'direction'=>['nullable',Rule::in(['asc','desc'])],'per_page'=>['nullable','integer','between:1,100']]); }
    private function orders(array $f){$q=DB::table('orders')->whereNull('orders.deleted_at');if($v=$f['status']??null)$q->where('orders.fulfillment_status',$v);if($v=$f['facility_id']??null)$q->where('orders.logistics_facility_id',$v);if($v=$f['supplier_id']??null)$q->where('orders.supplier_id',$v);if($v=$f['date_from']??null)$q->whereDate('orders.created_at','>=',$v);if($v=$f['date_to']??null)$q->whereDate('orders.created_at','<=',$v);if($v=$f['search']??null){$t='%'.str_replace(['%','_'],['\\%','\\_'],$v).'%';$q->where(fn($x)=>$x->where('orders.order_number','like',$t)->orWhereExists(fn($s)=>$s->selectRaw('1')->from('buyers')->whereColumn('buyers.id','orders.buyer_id')->where('buyers.name','like',$t))->orWhereExists(fn($s)=>$s->selectRaw('1')->from('suppliers')->whereColumn('suppliers.id','orders.supplier_id')->where('suppliers.company_name','like',$t)));}return $q;}
    private function facilities(array $f){$q=DB::table('logistics_facilities')->whereNull('deleted_at');foreach(['type','status','region','capacity_status'] as $k)if($v=$f[$k]??null)$q->where($k,$v);if($v=$f['search']??null)$q->where(fn($x)=>$x->where('name','like','%'.$v.'%')->orWhere('reference','like','%'.$v.'%')->orWhere('city','like','%'.$v.'%'));return $q;}
    private function permit(Request $r,string $permission): void { abort_unless($r->user()->hasPermission($permission),403); }
}
