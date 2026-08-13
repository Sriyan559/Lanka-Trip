<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\SupplierPayablesRequest;
use App\Services\Admin\SupplierPayablesService;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\StreamedResponse;

class SupplierPayablesController extends Controller
{
    public function __construct(private readonly SupplierPayablesService $service) {}
    private function permissions(Request $r): array { $u=$r->user(); return ['canView'=>true,'canExport'=>$u->hasPermission('analytics.export'),'canApprove'=>$u->isSuperAdmin()||$u->hasPermission('finance.payables.approve'),'canSchedule'=>$u->isSuperAdmin()||$u->hasPermission('finance.payables.schedule')]; }
    public function overview(SupplierPayablesRequest $r): array{return ['success'=>true,'data'=>$this->service->overview($r->filters(),$this->permissions($r))];}
    public function index(SupplierPayablesRequest $r): array{return ['success'=>true,'data'=>$this->service->index($r->filters(),$this->permissions($r))];}
    public function show(SupplierPayablesRequest $r,string $id): array{$x=$this->service->detail($id,$this->permissions($r));abort_if(!$x,404);return ['success'=>true,'data'=>$x];}
    public function approve(Request $r,string $id): array{abort_unless($this->permissions($r)['canApprove'],403);$v=$r->validate(['reason'=>['nullable','string','max:1000']]);return $this->service->transition($id,'approved',$r->user()->id,$v['reason']??null);}
    public function schedule(Request $r,string $id): array{abort_unless($this->permissions($r)['canSchedule'],403);$v=$r->validate(['reason'=>['nullable','string','max:1000']]);return $this->service->transition($id,'processing',$r->user()->id,$v['reason']??null);}
    public function export(SupplierPayablesRequest $r): StreamedResponse {abort_unless($this->permissions($r)['canExport'],403);$rows=$this->service->index([...$r->filters(),'page'=>1,'perPage'=>100],$this->permissions($r))['items'];return response()->streamDownload(function()use($rows){$h=fopen('php://output','w');fputcsv($h,['Reference','Supplier','Currency','Gross','Net','Status','Due Date']);foreach($rows as $x)fputcsv($h,[$x['reference'],$x['supplierName'],$x['currency'],$x['grossAmount'],$x['netPayable'],$x['payoutStatus'],$x['dueDate']]);fclose($h);},'supplier-payables-'.now()->toDateString().'.csv',['Content-Type'=>'text/csv']);}
}
