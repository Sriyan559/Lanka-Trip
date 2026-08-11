<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\FinanceCommandCenterRequest;
use App\Services\Admin\FinanceRevenuePaymentsService;
use Symfony\Component\HttpFoundation\StreamedResponse;

class FinanceRevenuePaymentsController extends Controller
{
    public function __construct(private readonly FinanceRevenuePaymentsService $finance) {}
    public function revenue(FinanceCommandCenterRequest $request): array { return ['success'=>true,'data'=>$this->finance->revenue($request->filters(),$this->permissions($request))]; }
    public function payments(FinanceCommandCenterRequest $request): array { return ['success'=>true,'data'=>$this->finance->payments($request->filters(),$this->permissions($request))]; }
    public function exportRevenue(FinanceCommandCenterRequest $request): StreamedResponse { return $this->export($request,'revenue'); }
    public function exportPayments(FinanceCommandCenterRequest $request): StreamedResponse { return $this->export($request,'payments'); }
    private function permissions(FinanceCommandCenterRequest $r): array { return ['canView'=>true,'canExport'=>$r->user()->hasPermission('analytics.export'),'canMutate'=>false]; }
    private function export(FinanceCommandCenterRequest $request,string $kind): StreamedResponse
    {
        abort_unless($request->user()->hasPermission('analytics.export'),403); $filters=[...$request->filters(),'page'=>1,'perPage'=>100]; $rows=[];
        do{$result=$kind==='revenue'?$this->finance->revenue($filters,$this->permissions($request)):$this->finance->payments($filters,$this->permissions($request));$rows=[...$rows,...$result['rows']];$filters['page']++;}while($filters['page']<=$result['meta']['lastPage']);
        activity('admin')->causedBy($request->user())->withProperties(['report'=>$kind,'filters'=>$request->safe()->all()])->log('finance.'.$kind.'.exported');
        return response()->streamDownload(function()use($rows){$out=fopen('php://output','wb');if($rows){fputcsv($out,array_keys($rows[0]));foreach($rows as $row)fputcsv($out,array_map(function($v){$value=is_scalar($v)?(string)$v:json_encode($v);return preg_match('/^[=+\-@]/',$value)?"'".$value:$value;},$row));}fclose($out);},'finance-'.$kind.'-'.now()->format('Y-m-d-His').'.csv',['Content-Type'=>'text/csv; charset=UTF-8','X-Content-Type-Options'=>'nosn']);
    }
}
