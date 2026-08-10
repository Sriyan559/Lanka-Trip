<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Services\Admin\CatalogueCommandCenterService;
use Carbon\CarbonImmutable;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\StreamedResponse;

class CatalogueCommandCenterController extends Controller
{
    public function show(Request $request, CatalogueCommandCenterService $service): JsonResponse
    {
        abort_unless($request->user()->hasPermission('products.view'), 403);
        [$from,$to] = $this->dates($request);
        return $this->successResponse(['data'=>$service->dashboard($from,$to,['canExport'=>$request->user()->hasPermission('analytics.export'),'canManage'=>$request->user()->hasPermission('products.manage'),'canImport'=>$request->user()->hasPermission('products.manage')])]);
    }

    public function trends(Request $request, CatalogueCommandCenterService $service): JsonResponse
    {
        abort_unless($request->user()->hasPermission('products.view'), 403); [$from,$to]=$this->dates($request);
        $granularity=$request->validate(['granularity'=>['required',Rule::in(['daily','weekly','monthly','quarterly'])]])['granularity'];
        return $this->successResponse(['data'=>$service->trend($from,$to,$granularity)]);
    }

    public function composition(Request $request, CatalogueCommandCenterService $service): JsonResponse
    {
        abort_unless($request->user()->hasPermission('products.view'),403);
        $dimension=$request->validate(['dimension'=>['required',Rule::in(['category','brand','status','business_unit','publication_channel'])]])['dimension'];
        return $this->successResponse(['data'=>$service->composition($dimension)]);
    }

    public function approvals(Request $request, CatalogueCommandCenterService $service): JsonResponse
    {
        abort_unless($request->user()->hasPermission('products.view'),403);
        $v=$request->validate(['page'=>['nullable','integer','min:1'],'pageSize'=>['nullable','integer','min:1','max:100'],'search'=>['nullable','string','max:120'],'stage'=>['nullable',Rule::in(['submitted','initial-review','brand-authorization','compliance-review','information-requested','final-decision'])],'sort'=>['nullable',Rule::in(['productName','submittedDate'])],'direction'=>['nullable',Rule::in(['asc','desc'])]]);
        return $this->successResponse(['data'=>$service->priorityApprovals($v['page']??1,$v['pageSize']??20,$v['search']??null,$v['stage']??null,$v['sort']??null,$v['direction']??'desc')]);
    }

    public function export(Request $request, CatalogueCommandCenterService $service): StreamedResponse
    {
        abort_unless($request->user()->hasPermission('analytics.export'),403); [$from,$to]=$this->dates($request); $data=$service->dashboard($from,$to,['canExport'=>true]);
        return response()->streamDownload(function() use($data){$h=fopen('php://output','wb');fputcsv($h,['Metric','Value','Availability','Comparison','Definition / reason']);foreach($data['kpis'] as $k)fputcsv($h,[$k['label'],$k['rawValue'],$k['availability'],$k['changePercent']??'', $k['definition']??$k['reason']??'']);fclose($h);},"catalogue-command-center-{$from->toDateString()}-{$to->toDateString()}.csv",['Content-Type'=>'text/csv; charset=UTF-8','X-Content-Type-Options'=>'nosniff']);
    }

    public function import(Request $request): JsonResponse
    {
        abort_unless($request->user()->hasPermission('products.manage'), 403);
        $request->validate(['file' => ['required','file','mimes:csv,txt','max:10240']]);
        $handle = fopen($request->file('file')->getRealPath(), 'rb');
        $headers = array_map(fn ($value) => Str::snake(trim((string) $value)), fgetcsv($handle) ?: []);
        $required = ['sku','name','category_id','price','unit'];
        if (array_diff($required, $headers)) return $this->errorResponse('The catalogue file is missing required columns.', 422, ['required_columns' => $required]);
        $rows = []; $errors = []; $line = 1;
        while (($values = fgetcsv($handle)) !== false) {
            $line++; if (count($values) !== count($headers)) { $errors[$line] = ['Column count does not match the header.']; continue; }
            $row = array_combine($headers, $values);
            $validation = Validator::make($row, ['sku'=>['required','string','max:255'],'name'=>['required','string','max:255'],'category_id'=>['required','integer','exists:categories,id'],'price'=>['required','numeric','min:0'],'unit'=>['required','string','max:50'],'status'=>['nullable',Rule::in(['active','inactive'])],'approval_status'=>['nullable','string','max:30']]);
            if ($validation->fails()) { $errors[$line] = $validation->errors()->all(); continue; }
            $rows[] = $validation->validated();
        }
        fclose($handle);
        if ($errors) return $this->errorResponse('Catalogue import validation failed. No records were changed.', 422, ['rows' => $errors]);
        $created = 0; $updated = 0;
        DB::transaction(function () use ($rows, &$created, &$updated): void {
            foreach ($rows as $row) {
                $existing = DB::table('products')->where('sku', $row['sku'])->whereNull('deleted_at')->first();
                $payload = ['category_id'=>(int)$row['category_id'],'name'=>$row['name'],'slug'=>$existing?->slug ?: Str::slug($row['name']).'-'.Str::lower(Str::random(8)),'price'=>$row['price'],'unit'=>$row['unit'],'status'=>$row['status']??'active','approval_status'=>$row['approval_status']??($existing?->approval_status??'draft'),'updated_at'=>now()];
                if ($existing) { DB::table('products')->where('id',$existing->id)->update($payload); $updated++; }
                else { DB::table('products')->insert([...$payload,'sku'=>$row['sku'],'moq'=>1,'created_at'=>now()]); $created++; }
            }
        });
        return $this->successResponse(['data'=>['created'=>$created,'updated'=>$updated,'skipped'=>0,'failed'=>0,'validationErrors'=>[]]], 'Catalogue import completed.');
    }

    private function dates(Request $request): array
    {
        $v=$request->validate(['dateFrom'=>['nullable','date'],'dateTo'=>['nullable','date','after_or_equal:dateFrom']]);$tz=config('app.timezone');$to=CarbonImmutable::parse($v['dateTo']??today($tz),$tz)->endOfDay();$from=CarbonImmutable::parse($v['dateFrom']??$to->subDays(29),$tz)->startOfDay();abort_if($from->diffInDays($to)>366,422,'The reporting range may not exceed 366 days.');return[$from,$to];
    }
}
