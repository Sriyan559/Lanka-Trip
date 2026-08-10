<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\AdminProductMasterSavedView;
use App\Models\Product;
use App\Services\Admin\ProductMasterManagementService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ProductMasterManagementController extends Controller
{
    public function index(Request $request, ProductMasterManagementService $service): JsonResponse
    {
        abort_unless($request->user()->hasPermission('products.view'), 403);
        $data = $request->validate(['page' => ['nullable', 'integer', 'min:1'], 'pageSize' => ['nullable', 'integer', 'min:1', 'max:100'], 'sort' => ['nullable', Rule::in(['updatedAt-desc', 'name-asc', 'completeness-desc'])], 'tab' => ['nullable', Rule::in(['all', 'active', 'draft', 'pending', 'approved', 'published', 'incomplete', 'blocked', 'archived'])], 'search' => ['nullable', 'string', 'max:150'], 'productStatus' => ['nullable', 'string', 'max:30'], 'approvalStatus' => ['nullable', 'string', 'max:30'], 'publicationStatus' => ['nullable', 'string', 'max:30'], 'complianceStatus' => ['nullable', 'string', 'max:30'], 'category' => ['nullable', 'string', 'max:30'], 'subcategory' => ['nullable', 'string', 'max:30'], 'supplier' => ['nullable', 'string', 'max:30'], 'variantReadiness' => ['nullable', 'string', 'max:30'], 'mediaReadiness' => ['nullable', 'string', 'max:30'], 'createdDate' => ['nullable', 'date'], 'updatedDate' => ['nullable', 'date']]);

        return response()->json(['success' => true, 'data' => $service->dashboard($data, (int) ($data['page'] ?? 1), (int) ($data['pageSize'] ?? 25), $data['sort'] ?? 'updatedAt-desc', ['canView' => true, 'canManage' => $request->user()->hasPermission('products.manage'), 'canExport' => $request->user()->hasPermission('analytics.export'), 'canImport' => $request->user()->hasPermission('products.manage')])]);
    }

    public function export(Request $request, ProductMasterManagementService $service): StreamedResponse
    {
        abort_unless($request->user()->hasPermission('analytics.export'), 403);
        $filters = $request->only(['tab', 'search', 'productStatus', 'approvalStatus', 'publicationStatus', 'complianceStatus', 'category', 'subcategory', 'supplier', 'variantReadiness', 'mediaReadiness', 'createdDate', 'updatedDate']);
        $ids = collect(explode(',', (string) $request->query('ids')))->filter(fn ($id) => ctype_digit($id))->map(fn ($id) => (int) $id)->all();
        $query = $service->query($filters);
        if ($ids) {
            $query->whereIn('products.id', $ids);
        }

        return response()->streamDownload(function () use ($query, $service) {
            $h = fopen('php://output', 'wb');
            fputcsv($h, ['Public ID', 'DB Product ID', 'Name', 'SKU', 'Barcode', 'Supplier', 'Category', 'Completeness', 'Approval', 'Status', 'Updated At']);
            $query->orderBy('products.id')->chunkById(500, function ($products) use ($h, $service) {
                foreach ($products as $p) {
                    $p->loadMissing(['category.parent', 'supplier', 'beautyProfile', 'variants']);
                    $p->loadCount(['variants', 'images']);
                    $r = $service->row($p);
                    fputcsv($h, [$r['publicId'], $r['dbProductId'], $r['productName'], $r['sku'], $r['barcode'], $r['supplier'], $r['category'], $r['completenessPercent'], $r['approvalStatus'], $r['productStatus'], $r['updatedAt']]);
                }
            });
            fclose($h);
        }, 'product-masters-'.now()->format('Ymd-His').'.csv', ['Content-Type' => 'text/csv; charset=UTF-8', 'X-Content-Type-Options' => 'nosniff']);
    }

    public function bulk(Request $request): JsonResponse
    {
        abort_unless($request->user()->hasPermission('products.manage'), 403);
        $v = $request->validate(['action' => ['required', Rule::in(['change-status', 'publish', 'archive'])], 'ids' => ['required', 'array', 'min:1', 'max:1000'], 'ids.*' => ['integer', 'distinct', 'exists:products,id'], 'status' => ['nullable', Rule::in(['active', 'inactive'])]]);
        $count = DB::transaction(function () use ($v) {
            $q = Product::whereIn('id', $v['ids']);

            return match ($v['action']) {
                'change-status' => $q->update(['status' => $v['status'] ?? 'active', 'updated_at' => now()]),'publish' => $q->where('approval_status', 'approved')->update(['published_at' => now(), 'status' => 'active', 'updated_at' => now()]),'archive' => $q->delete()
            };
        });

        return response()->json(['success' => true, 'message' => 'Bulk action completed.', 'data' => ['affected' => $count]]);
    }

    public function savedViews(Request $request): JsonResponse
    {
        abort_unless($request->user()->hasPermission('products.view'), 403);

        return response()->json(['success' => true, 'data' => AdminProductMasterSavedView::where('user_id', $request->user()->id)->latest()->get()]);
    }

    public function saveView(Request $request): JsonResponse
    {
        abort_unless($request->user()->hasPermission('products.view'), 403);
        $v = $request->validate(['name' => ['required', 'string', 'max:100'], 'description' => ['nullable', 'string', 'max:500'], 'filters' => ['required', 'array'], 'quickFilters' => ['nullable', 'array'], 'activeTab' => ['nullable', 'string', 'max:30'], 'sort' => ['nullable', 'string', 'max:50'], 'visibleColumns' => ['nullable', 'array'], 'isDefault' => ['nullable', 'boolean']]);
        if ($v['isDefault'] ?? false) {
            AdminProductMasterSavedView::where('user_id', $request->user()->id)->update(['is_default' => false]);
        }
        $view = AdminProductMasterSavedView::updateOrCreate(['user_id' => $request->user()->id, 'name' => $v['name']], ['description' => $v['description'] ?? null, 'filters' => $v['filters'], 'quick_filters' => $v['quickFilters'] ?? [], 'active_tab' => $v['activeTab'] ?? 'all', 'sort' => $v['sort'] ?? 'updatedAt-desc', 'visible_columns' => $v['visibleColumns'] ?? null, 'is_default' => $v['isDefault'] ?? false]);

        return response()->json(['success' => true, 'data' => $view], $view->wasRecentlyCreated ? 201 : 200);
    }
}
