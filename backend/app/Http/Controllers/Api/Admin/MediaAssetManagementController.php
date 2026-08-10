<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Upload;
use App\Services\Admin\MediaAssetManagementService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\StreamedResponse;

class MediaAssetManagementController extends Controller
{
    public function index(Request $request, MediaAssetManagementService $service): JsonResponse
    {
        $this->view($request); $filters = $request->validate($this->filterRules());
        return response()->json(['success' => true, 'data' => $service->dashboard($filters, $this->capabilities($request))]);
    }

    public function show(Request $request, Upload $media, MediaAssetManagementService $service): JsonResponse
    {
        $this->view($request); return response()->json(['success' => true, 'data' => $service->detail($media)]);
    }

    public function store(Request $request, MediaAssetManagementService $service): JsonResponse
    {
        $this->manage($request);
        $data = $request->validate(['file' => ['required','file','mimes:jpg,jpeg,png,webp,pdf,doc,docx,xlsx','max:20480'], 'category' => ['required', Rule::in(Upload::CATEGORIES)], 'product_id' => ['nullable','integer','exists:products,id'], 'product_variant_id' => ['nullable','integer','exists:product_variants,id'], 'alt_text' => ['nullable','string','max:1000'], 'description' => ['nullable','string','max:5000'], 'rights_expires_at' => ['nullable','date']]);
        if (! empty($data['product_variant_id'])) {
            $variantProduct = DB::table('product_variants')->where('id', $data['product_variant_id'])->value('product_id');
            if (! empty($data['product_id']) && (int) $variantProduct !== (int) $data['product_id']) throw ValidationException::withMessages(['product_variant_id' => 'The selected variant does not belong to the selected product.']);
            $data['product_id'] = $data['product_id'] ?? $variantProduct;
        }
        $media = $service->upload($request->file('file'), $data, $request->user());
        return response()->json(['success' => true, 'data' => $service->detail($media)], 201);
    }

    public function update(Request $request, Upload $media, MediaAssetManagementService $service): JsonResponse
    {
        $this->manage($request);
        $data = $request->validate(['product_id' => ['sometimes','nullable','integer','exists:products,id'], 'product_variant_id' => ['sometimes','nullable','integer','exists:product_variants,id'], 'alt_text' => ['sometimes','nullable','string','max:1000'], 'description' => ['sometimes','nullable','string','max:5000'], 'approval_status' => ['sometimes', Rule::in(['draft','pending','approved','rejected','needs_review'])], 'processing_status' => ['sometimes', Rule::in(['pending','processing','completed','failed'])], 'rights_expires_at' => ['sometimes','nullable','date']]);
        if (isset($data['product_variant_id'])) { $variantProduct = DB::table('product_variants')->where('id',$data['product_variant_id'])->value('product_id'); $product = $data['product_id'] ?? $media->product_id; if ($product && (int)$variantProduct !== (int)$product) throw ValidationException::withMessages(['product_variant_id'=>'The selected variant does not belong to the selected product.']); }
        return response()->json(['success'=>true,'data'=>$service->detail($service->update($media,$data,$request->user()))]);
    }

    public function bulk(Request $request, MediaAssetManagementService $service): JsonResponse
    {
        $this->manage($request); $data=$request->validate(['ids'=>['required','array','min:1','max:500'],'ids.*'=>['integer','distinct','exists:uploads,id'],'action'=>['required',Rule::in(['approve','archive','restore'])]]);
        return response()->json(['success'=>true,'data'=>['updated'=>$service->bulk($data['ids'],$data['action'],$request->user())]]);
    }

    public function import(Request $request, MediaAssetManagementService $service): JsonResponse
    {
        $this->manage($request); $request->validate(['file'=>['required','file','mimes:csv,txt','max:10240']]); $handle=fopen($request->file('file')->getRealPath(),'rb'); $headers=array_map(fn($v)=>strtolower(trim((string)$v)),fgetcsv($handle)?:[]);
        if (array_diff(['upload_id'],$headers)) throw ValidationException::withMessages(['file'=>'Required column: upload_id.']); $rows=[]; $errors=[]; $line=1;
        while (($values=fgetcsv($handle))!==false) { $line++; if(count($values)!==count($headers)){ $errors[$line]=['Column count does not match header.']; continue; } $row=array_combine($headers,$values); $validator=validator($row,['upload_id'=>['required','integer','exists:uploads,id'],'product_id'=>['nullable','integer','exists:products,id'],'product_variant_id'=>['nullable','integer','exists:product_variants,id'],'alt_text'=>['nullable','string','max:1000'],'description'=>['nullable','string','max:5000'],'rights_expires_at'=>['nullable','date']]); if($validator->fails()){ $errors[$line]=$validator->errors()->all(); continue; } $rows[]=$validator->validated(); }
        fclose($handle); if($errors) throw ValidationException::withMessages(['rows'=>$errors]);
        $updated=DB::transaction(function()use($rows,$service,$request){$count=0;foreach($rows as $row){$id=$row['upload_id'];unset($row['upload_id']);$service->update(Upload::findOrFail($id),array_filter($row,fn($v)=>$v!==''),$request->user());$count++;}activity('media_assets')->causedBy($request->user())->withProperties(['updated'=>$count])->log('media.imported');return $count;});
        return response()->json(['success'=>true,'data'=>['created'=>0,'linked'=>$updated,'updated'=>$updated,'skipped'=>0,'failed'=>0,'warnings'=>[]]]);
    }

    public function export(Request $request, MediaAssetManagementService $service): StreamedResponse
    {
        abort_unless($request->user()->hasPermission('analytics.export'),403); $filters=validator($request->query(),$this->filterRules())->validate(); activity('media_assets')->causedBy($request->user())->withProperties(['filters'=>$filters])->log('media.report_exported');
        return response()->streamDownload(function()use($service,$filters){$out=fopen('php://output','wb');fputcsv($out,['Asset ID','Name','Filename','Type','MIME','Bytes','Width','Height','Product','Variant','Category','Supplier','Approval','Processing','Quality','Rights Expiry','Uploaded By','Created','Updated']);$page=1;do{$data=$service->dashboard($filters+['page'=>$page,'pageSize'=>100],[]);foreach($data['assets']['data']as$r)fputcsv($out,[$r['publicId'],$r['name'],$r['filename'],$r['category'],$r['mimeType'],$r['fileSizeBytes'],$r['width'],$r['height'],$r['product']['name']??null,$r['variant']['name']??null,$r['categoryName'],$r['supplierName'],$r['approvalStatus'],$r['processingStatus'],$r['qualityScore'],$r['rightsExpiryDate'],$r['ownerName'],$r['uploadedAt'],$r['updatedAt']]);$page++;}while($page<=$data['assets']['totalPages']);fclose($out);},'media-assets-'.now()->format('Ymd-His').'.csv',['Content-Type'=>'text/csv; charset=UTF-8','X-Content-Type-Options'=>'nosniff']);
    }

    private function filterRules(): array { return ['page'=>['nullable','integer','min:1'],'pageSize'=>['nullable','integer','min:1','max:100'],'search'=>['nullable','string','max:150'],'linkedEntity'=>['nullable',Rule::in(['product','unlinked'])],'fileType'=>['nullable',Rule::in(['image','document'])],'category'=>['nullable',Rule::in(Upload::CATEGORIES)],'approvalStatus'=>['nullable',Rule::in(['draft','pending','approved','rejected','needs_review'])],'processingStatus'=>['nullable',Rule::in(['pending','processing','completed','failed'])],'productId'=>['nullable','integer','exists:products,id'],'variantId'=>['nullable','integer','exists:product_variants,id'],'categoryId'=>['nullable','integer','exists:categories,id'],'supplierId'=>['nullable','integer','exists:suppliers,id'],'dateFrom'=>['nullable','date'],'dateTo'=>['nullable','date','after_or_equal:dateFrom'],'scope'=>['nullable',Rule::in(['all','images','videos','documents','pending','quality','duplicates','rights','archived','missing','unlinked','processing'])],'sort'=>['nullable',Rule::in(['name','fileSize','uploadedAt','updatedAt','status'])],'direction'=>['nullable',Rule::in(['asc','desc'])]]; }
    private function capabilities(Request $request): array { return ['canView'=>true,'canManage'=>$request->user()->hasPermission('uploads.manage'),'canUpload'=>$request->user()->hasPermission('uploads.manage'),'canImport'=>$request->user()->hasPermission('uploads.manage'),'canExport'=>$request->user()->hasPermission('analytics.export')]; }
    private function view(Request $request): void { abort_unless($request->user()->hasPermission('products.view'),403); }
    private function manage(Request $request): void { abort_unless($request->user()->hasPermission('uploads.manage'),403); }
}
