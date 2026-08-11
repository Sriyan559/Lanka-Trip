<?php

namespace App\Services\Admin;

use App\Models\Upload;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class MediaAssetManagementService
{
    public function dashboard(array $filters, array $capabilities): array
    {
        $query = Upload::query()->with(['user:id,name', 'product:id,name,category_id,supplier_id,sku', 'product.category:id,name', 'product.supplier:id,company_name', 'variant:id,product_id,name,sku']);
        $this->applyFilters($query, $filters);
        $sort = ['name' => 'original_name', 'fileSize' => 'file_size', 'uploadedAt' => 'created_at', 'updatedAt' => 'updated_at', 'status' => 'approval_status'][$filters['sort'] ?? 'updatedAt'] ?? 'updated_at';
        $query->orderBy($sort, ($filters['direction'] ?? 'desc') === 'asc' ? 'asc' : 'desc')->orderBy('id');
        $pageSize = min(100, max(1, (int) ($filters['pageSize'] ?? 25)));
        $page = max(1, (int) ($filters['page'] ?? 1));
        $paginator = $query->paginate($pageSize, ['*'], 'page', $page);
        $duplicateHashes = DB::table('uploads')->whereNotNull('sha256')->select('sha256')->groupBy('sha256')->havingRaw('count(*) > 1')->pluck('sha256')->all();
        $rows = collect($paginator->items())->map(fn (Upload $upload) => $this->row($upload, $duplicateHashes))->all();
        $totals = $this->totals();

        return [
            'kpis' => $this->kpis($totals), 'tabs' => $this->tabs($totals),
            'assets' => ['data' => $rows, 'page' => $paginator->currentPage(), 'pageSize' => $paginator->perPage(), 'total' => $paginator->total(), 'totalPages' => max(1, $paginator->lastPage())],
            'options' => $this->options(), 'health' => $this->health($totals), 'alerts' => $this->alerts($totals),
            'statusSummary' => DB::table('uploads')->selectRaw('approval_status, count(*) aggregate')->groupBy('approval_status')->pluck('aggregate', 'approval_status')->map(fn ($count, $status) => ['label' => Str::headline($status), 'count' => (int) $count])->values()->all(),
            'storageSummary' => ['assetCount' => $totals['total'], 'bytes' => (int) DB::table('uploads')->sum('file_size'), 'disk' => 'public', 'cdnAvailable' => false],
            'processingSummary' => DB::table('uploads')->selectRaw('processing_status, count(*) aggregate')->groupBy('processing_status')->pluck('aggregate', 'processing_status')->map(fn ($count, $status) => ['label' => Str::headline($status), 'count' => (int) $count])->values()->all(),
            'lower' => $this->lower($totals),
            'capabilities' => $capabilities + ['tenantIsolation' => false, 'savedViews' => false, 'channels' => false, 'renditions' => false, 'asyncProcessing' => false, 'usageRightsEngine' => false, 'signedUrls' => false, 'unsupportedReason' => 'No authoritative schema exists for tenants, channels, renditions, saved views, CDN delivery, or a rights rules engine.'],
            'lastSyncedAt' => now()->toIso8601String(), 'meta' => ['refreshIntervalSeconds' => 30],
        ];
    }

    public function detail(Upload $upload): array
    {
        $loaded = $upload->load(['user:id,name', 'product:id,name,category_id,supplier_id,sku', 'product.category:id,name', 'product.supplier:id,company_name', 'variant:id,product_id,name,sku']);
        $duplicates = $loaded->sha256 && Upload::where('sha256', $loaded->sha256)->whereKeyNot($loaded->id)->exists() ? [$loaded->sha256] : [];
        return $this->row($loaded, $duplicates);
    }

    public function upload(UploadedFile $file, array $data, User $actor): Upload
    {
        return DB::transaction(function () use ($file, $data, $actor) {
            $mime = $file->getMimeType() ?: 'application/octet-stream';
            $isImage = str_starts_with($mime, 'image/');
            $directory = $isImage ? 'uploads/images' : 'uploads/documents';
            $extension = strtolower($file->guessExtension() ?: $file->extension());
            $name = Str::uuid().($extension ? '.'.$extension : '');
            $path = $file->storeAs($directory, $name, 'public');
            try {
                $dimensions = $isImage ? @getimagesize($file->getRealPath()) : false;
                $upload = Upload::create([
                    'user_id' => $actor->id, 'product_id' => $data['product_id'] ?? null, 'product_variant_id' => $data['product_variant_id'] ?? null,
                    'original_name' => basename($file->getClientOriginalName()), 'file_name' => $name, 'file_path' => $path,
                    'file_type' => $isImage ? 'image' : 'document', 'mime_type' => $mime, 'file_size' => $file->getSize(),
                    'category' => $data['category'], 'sha256' => hash_file('sha256', $file->getRealPath()),
                    'width' => $dimensions[0] ?? null, 'height' => $dimensions[1] ?? null, 'alt_text' => $data['alt_text'] ?? null,
                    'description' => $data['description'] ?? null, 'approval_status' => 'draft', 'processing_status' => 'completed',
                    'rights_expires_at' => $data['rights_expires_at'] ?? null,
                ]);
                activity('media_assets')->causedBy($actor)->performedOn($upload)->withProperties(['mime_type' => $mime, 'file_size' => $file->getSize()])->log('media.uploaded');
                return $upload;
            } catch (\Throwable $error) {
                Storage::disk('public')->delete($path);
                throw $error;
            }
        });
    }

    public function update(Upload $upload, array $data, User $actor): Upload
    {
        return DB::transaction(function () use ($upload, $data, $actor) {
            $locked = Upload::lockForUpdate()->findOrFail($upload->id); $before = $locked->toArray(); $locked->update($data);
            activity('media_assets')->causedBy($actor)->performedOn($locked)->withProperties(['before' => $before, 'after' => $locked->fresh()->toArray()])->log('media.updated');
            return $locked->refresh();
        });
    }

    public function bulk(array $ids, string $action, User $actor): int
    {
        return DB::transaction(function () use ($ids, $action, $actor) {
            $records = Upload::lockForUpdate()->whereIn('id', $ids)->get();
            $changes = match ($action) { 'approve' => ['approval_status' => 'approved'], 'archive' => ['archived_at' => now()], 'restore' => ['archived_at' => null], default => throw ValidationException::withMessages(['action' => 'Unsupported media bulk action.']) };
            Upload::whereIn('id', $records->pluck('id'))->update($changes + ['updated_at' => now()]);
            activity('media_assets')->causedBy($actor)->withProperties(['ids' => $records->pluck('id')->all(), 'action' => $action])->log('media.bulk_updated');
            return $records->count();
        });
    }

    private function applyFilters(Builder $query, array $filters): void
    {
        if ($search = trim((string) ($filters['search'] ?? ''))) $query->where(fn (Builder $q) => $q->where('original_name', 'like', "%{$search}%")->orWhere('file_name', 'like', "%{$search}%")->orWhere('id', ctype_digit($search) ? (int) $search : -1)->orWhereHas('product', fn (Builder $p) => $p->where('name', 'like', "%{$search}%")->orWhere('sku', 'like', "%{$search}%"))->orWhereHas('variant', fn (Builder $v) => $v->where('name', 'like', "%{$search}%")->orWhere('sku', 'like', "%{$search}%")));
        if (! empty($filters['fileType'])) $query->where('file_type', $filters['fileType']);
        if (! empty($filters['category'])) $query->where('category', $filters['category']);
        if (! empty($filters['approvalStatus'])) $query->where('approval_status', $filters['approvalStatus']);
        if (! empty($filters['processingStatus'])) $query->where('processing_status', $filters['processingStatus']);
        if (! empty($filters['productId'])) $query->where('product_id', $filters['productId']);
        if (! empty($filters['variantId'])) $query->where('product_variant_id', $filters['variantId']);
        if (! empty($filters['categoryId'])) $query->whereHas('product', fn (Builder $p) => $p->where('category_id', $filters['categoryId']));
        if (! empty($filters['supplierId'])) $query->whereHas('product', fn (Builder $p) => $p->where('supplier_id', $filters['supplierId']));
        if (($filters['linkedEntity'] ?? null) === 'product') $query->whereNotNull('product_id');
        if (($filters['linkedEntity'] ?? null) === 'unlinked') $query->whereNull('product_id');
        if (! empty($filters['dateFrom'])) $query->whereDate('created_at', '>=', $filters['dateFrom']);
        if (! empty($filters['dateTo'])) $query->whereDate('created_at', '<=', $filters['dateTo']);
        $scope = $filters['scope'] ?? 'all';
        if ($scope === 'images') $query->where('file_type', 'image'); if ($scope === 'documents') $query->where('file_type', 'document'); if ($scope === 'videos') $query->where('category', 'company_video');
        if ($scope === 'pending') $query->where('approval_status', 'pending'); if ($scope === 'archived') $query->whereNotNull('archived_at'); elseif ($scope !== 'all') $query->whereNull('archived_at');
        if ($scope === 'quality') $query->where('file_type', 'image')->where(fn ($q) => $q->whereNull('width')->orWhereNull('height')->orWhere('width', '<', 800)->orWhere('height', '<', 800)->orWhereNull('alt_text'));
        if ($scope === 'duplicates') $query->whereNotNull('sha256')->whereIn('sha256', DB::table('uploads')->whereNotNull('sha256')->select('sha256')->groupBy('sha256')->havingRaw('count(*) > 1'));
        if ($scope === 'rights') $query->whereBetween('rights_expires_at', [today(), today()->addDays(30)]);
        if ($scope === 'unlinked') $query->whereNull('product_id');
        if ($scope === 'processing') $query->where('processing_status', 'failed');
        if ($scope === 'missing') $query->whereRaw('1 = 0');
    }

    private function row(Upload $u, array $duplicateHashes = []): array
    {
        $quality = $u->file_type !== 'image' ? null : (($u->width && $u->height) ? (($u->width >= 1200 && $u->height >= 1200) ? 100 : (($u->width >= 800 && $u->height >= 800) ? 80 : 40)) : 0);
        return ['id' => (string) $u->id, 'publicId' => 'MED-'.str_pad((string) $u->id, 8, '0', STR_PAD_LEFT), 'name' => pathinfo($u->original_name, PATHINFO_FILENAME), 'filename' => $u->original_name,
            'category' => $u->file_type, 'type' => Str::headline($u->category), 'mimeType' => $u->mime_type, 'format' => strtoupper(pathinfo($u->file_name, PATHINFO_EXTENSION)), 'fileSizeBytes' => $u->file_size,
            'fileSizeFormatted' => $this->bytes($u->file_size), 'width' => $u->width, 'height' => $u->height, 'resolution' => $u->width && $u->height ? "{$u->width} × {$u->height}" : 'Unavailable',
            'thumbnailUrl' => $u->file_type === 'image' ? Storage::disk('public')->url($u->file_path) : null, 'downloadUrl' => Storage::disk('public')->url($u->file_path),
            'product' => $u->product ? ['id' => (string) $u->product->id, 'name' => $u->product->name, 'sku' => $u->product->sku] : null, 'productId' => $u->product_id ? (string) $u->product_id : null,
            'variant' => $u->variant?->name, 'variantId' => $u->variant ? (string) $u->variant->id : null,
            'categoryName' => $u->product?->category?->name, 'supplierName' => $u->product?->supplier?->company_name,
            'linkedEntityType' => $u->product_id ? 'Product' : 'Unlinked', 'linkedEntityId' => $u->product_id ? (string) $u->product_id : null, 'productName' => $u->product?->name ?? 'Unlinked', 'brandName' => 'Unavailable',
            'altText' => $u->alt_text, 'altTextStatus' => $u->alt_text ? 'Yes' : 'No', 'description' => $u->description, 'qualityScore' => $quality,
            'approvalStatus' => Str::headline($u->approval_status), 'processingStatus' => Str::headline($u->processing_status), 'rightsExpiryDate' => $u->rights_expires_at?->toDateString(),
            'usageRightsStatus' => $u->rights_expires_at ? ($u->rights_expires_at->isPast() ? 'Expired' : 'Valid until '.$u->rights_expires_at->format('Y')) : 'Unavailable',
            'duplicateRisk' => $u->sha256 && in_array($u->sha256, $duplicateHashes, true) ? 'High' : 'None', 'riskLevel' => $quality !== null && $quality < 80 ? 'High' : 'Low',
            'ownerName' => $u->user?->name ?? 'Unknown', 'updatedAt' => $u->updated_at?->toIso8601String(), 'uploadedAt' => $u->created_at?->toIso8601String(), 'isArchived' => $u->archived_at !== null,
            'channelCompatibility' => null, 'storageDisk' => 'public'];
    }

    private function totals(): array
    {
        $base = DB::table('uploads'); $duplicates = DB::table('uploads')->whereNotNull('sha256')->select('sha256')->groupBy('sha256')->havingRaw('count(*) > 1')->get()->count();
        $missingMandatory = DB::table('products')->whereNull('deleted_at')->whereNull('featured_image')->whereNotExists(fn ($q) => $q->selectRaw('1')->from('product_images')->whereColumn('product_images.product_id', 'products.id'))->whereNotExists(fn ($q) => $q->selectRaw('1')->from('uploads')->whereColumn('uploads.product_id', 'products.id')->whereNull('uploads.archived_at'))->count();
        return ['total' => (clone $base)->count(), 'active' => (clone $base)->whereNull('archived_at')->count(), 'approved' => (clone $base)->where('approval_status', 'approved')->whereNull('archived_at')->count(), 'pending' => (clone $base)->where('approval_status', 'pending')->whereNull('archived_at')->count(), 'mandatory' => $missingMandatory,
            'lowres' => (clone $base)->where('file_type', 'image')->where(fn ($q) => $q->whereNull('width')->orWhereNull('height')->orWhere('width', '<', 800)->orWhere('height', '<', 800))->count(), 'duplicates' => $duplicates,
            'unlinked' => (clone $base)->whereNull('product_id')->count(), 'alttext' => (clone $base)->where('file_type', 'image')->whereNull('alt_text')->count(), 'rights' => (clone $base)->whereBetween('rights_expires_at', [today(), today()->addDays(30)])->count(),
            'archived' => (clone $base)->whereNotNull('archived_at')->count(), 'processingFailed' => (clone $base)->where('processing_status', 'failed')->count()];
    }

    private function kpis(array $t): array
    {
        $values = [['total','Total Media Assets',$t['total'],'all'],['active','Active Assets',$t['active'],'all'],['approved','Approved Assets',$t['approved'],'approved'],['pending','Pending Approval',$t['pending'],'pending'],['mandatory','Missing Mandatory Media',$t['mandatory'],'missing'],['lowres','Low-Resolution Assets',$t['lowres'],'quality'],['duplicates','Duplicate Media Risks',$t['duplicates'],'duplicates'],['unlinked','Unlinked Assets',$t['unlinked'],'unlinked'],['alttext','Missing Alt Text',$t['alttext'],'quality'],['rights','Usage Rights Expiring',$t['rights'],'rights'],['channels','Channel Compatibility Issues',null,'channels'],['archived','Archived Assets',$t['archived'],'archived']];
        return array_map(fn ($v) => ['id'=>$v[0],'label'=>$v[1],'value'=>$v[2],'trend'=>null,'available'=>$v[2] !== null,'scope'=>$v[3],'reason'=>$v[2] === null ? 'No authoritative channel requirement schema is installed.' : null], $values);
    }

    private function tabs(array $t): array { return [['label'=>'All Assets','count'=>$t['total'],'scope'=>'all'],['label'=>'Images','count'=>Upload::where('file_type','image')->count(),'scope'=>'images'],['label'=>'Videos','count'=>Upload::where('category','company_video')->count(),'scope'=>'videos'],['label'=>'Documents','count'=>Upload::where('file_type','document')->count(),'scope'=>'documents'],['label'=>'Pending Approval','count'=>$t['pending'],'scope'=>'pending'],['label'=>'Quality Issues','count'=>$t['lowres'] + $t['alttext'],'scope'=>'quality'],['label'=>'Duplicates','count'=>$t['duplicates'],'scope'=>'duplicates'],['label'=>'Usage Rights','count'=>$t['rights'],'scope'=>'rights'],['label'=>'Archived','count'=>$t['archived'],'scope'=>'archived']]; }
    private function health(array $t): array { $total=max(1,$t['total']); $dimensions=[['label'=>'Metadata Completeness','value'=>(int) round(100*($t['total']-$t['alttext'])/$total)],['label'=>'Quality Readiness','value'=>(int) round(100*($t['total']-$t['lowres'])/$total)],['label'=>'Approval Readiness','value'=>(int) round(100*$t['approved']/$total)],['label'=>'Duplicate Control','value'=>(int) round(100*($t['total']-$t['duplicates'])/$total)]]; $score=(int) round(collect($dimensions)->avg('value')); return ['score'=>$score,'status'=>$score>=85?'Healthy':'Needs Attention','dimensions'=>$dimensions]; }
    private function alerts(array $t): array { return array_values(array_filter([ $t['mandatory'] ? ['id'=>'mandatory','label'=>'Missing mandatory product media','count'=>$t['mandatory'],'severity'=>'High','scope'=>'missing'] : null, $t['processingFailed'] ? ['id'=>'processing','label'=>'Media processing failed','count'=>$t['processingFailed'],'severity'=>'High','scope'=>'processing'] : null, $t['lowres'] ? ['id'=>'lowres','label'=>'Low-resolution media','count'=>$t['lowres'],'severity'=>'Medium','scope'=>'quality'] : null, $t['alttext'] ? ['id'=>'alt','label'=>'Missing alt text','count'=>$t['alttext'],'severity'=>'Medium','scope'=>'quality'] : null, $t['duplicates'] ? ['id'=>'duplicates','label'=>'Duplicate media hashes','count'=>$t['duplicates'],'severity'=>'Medium','scope'=>'duplicates'] : null ])); }
    private function lower(array $t): array { $activities = DB::table('activity_log')->where('log_name','media_assets')->latest('created_at')->limit(10)->get()->map(fn($a)=>['id'=>(string)$a->id,'activity'=>Str::headline($a->description),'assetId'=>$a->subject_id?'MED-'.str_pad((string)$a->subject_id,8,'0',STR_PAD_LEFT):'Media Assets','linkedEntity'=>'Unavailable','actionBy'=>$a->causer_id?'Admin #'.$a->causer_id:'System','dateTime'=>$a->created_at,'details'=>''])->all(); return ['formatSummary'=>DB::table('uploads')->selectRaw('mime_type as label, count(*) count')->groupBy('mime_type')->get(),'productCoverage'=>['missingMandatory'=>$t['mandatory'],'unlinked'=>$t['unlinked']],'duplicates'=>[],'activities'=>$activities]; }
    private function options(): array { return ['products'=>DB::table('products')->whereNull('deleted_at')->orderBy('name')->get(['id','name'])->map(fn($x)=>['id'=>(string)$x->id,'name'=>$x->name]),'categories'=>DB::table('categories')->where('status','active')->orderBy('name')->get(['id','name'])->map(fn($x)=>['id'=>(string)$x->id,'name'=>$x->name]),'suppliers'=>DB::table('suppliers')->orderBy('company_name')->get(['id','company_name'])->map(fn($x)=>['id'=>(string)$x->id,'name'=>$x->company_name]),'fileTypes'=>DB::table('uploads')->distinct()->pluck('file_type'),'approvalStatuses'=>DB::table('uploads')->distinct()->pluck('approval_status'),'processingStatuses'=>DB::table('uploads')->distinct()->pluck('processing_status')]; }
    private function bytes(int $bytes): string { if ($bytes < 1024) return $bytes.' B'; if ($bytes < 1048576) return round($bytes/1024,1).' KB'; if ($bytes < 1073741824) return round($bytes/1048576,1).' MB'; return round($bytes/1073741824,1).' GB'; }
}
