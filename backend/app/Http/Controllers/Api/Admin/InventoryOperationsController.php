<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Services\Admin\InventoryOperationsService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Symfony\Component\HttpFoundation\StreamedResponse;

class InventoryOperationsController extends Controller
{
    public function index(Request $request, InventoryOperationsService $service): JsonResponse
    {
        abort_unless($request->user()->hasPermission('products.view'), 403);
        $filters = $this->filters($request);

        return response()->json(['success' => true, 'data' => $service->dashboard($filters, [
            'canView' => true,
            'canManage' => $request->user()->hasPermission('products.manage'),
            'canExport' => $request->user()->hasPermission('analytics.export'),
        ])]);
    }

    public function export(Request $request, InventoryOperationsService $service): StreamedResponse
    {
        abort_unless($request->user()->hasPermission('analytics.export'), 403);
        $filters = $this->filters($request);
        $query = $service->query($filters)->orderBy('product_variants.id');

        return response()->streamDownload(function () use ($query, $service): void {
            $out = fopen('php://output', 'wb');
            fputcsv($out, ['Product Reference', 'Database Product ID', 'Product', 'Variant', 'SKU', 'Barcode', 'Supplier', 'Category', 'On-hand Stock', 'Batch', 'Location', 'Reserved', 'Quarantined', 'Expiry', 'Recall']);
            $query->chunkById(500, function ($rows) use ($out, $service): void {
                foreach ($rows as $source) {
                    $row = $service->row($source);
                    fputcsv($out, [$row['publicRef'], $row['dbId'], $row['name'], $row['variant'], $row['sku'], $row['barcode'], $row['supplier'], $row['category'], $row['onHandStock'], $row['batchNumber'], $row['location'], $row['reservedStock'], $row['quarantinedStock'], $row['expDate'], $row['recallStatus']]);
                }
            }, 'product_variants.id', 'variant_id');
            fclose($out);
        }, 'inventory-operations-'.now()->format('Ymd-His').'.csv', ['Content-Type' => 'text/csv; charset=UTF-8', 'X-Content-Type-Options' => 'nosniff']);
    }

    private function filters(Request $request): array
    {
        return $request->validate([
            'page' => ['nullable', 'integer', 'min:1'], 'pageSize' => ['nullable', 'integer', 'min:1', 'max:100'],
            'search' => ['nullable', 'string', 'max:150'], 'productId' => ['nullable', 'integer', 'exists:products,id'],
            'supplierId' => ['nullable', 'integer', 'exists:suppliers,id'], 'categoryId' => ['nullable', 'integer', 'exists:categories,id'],
            'variantId' => ['nullable', 'integer', 'exists:product_variants,id'],
            'quickFilter' => ['nullable', Rule::in(['low-stock', 'out-of-stock', 'negative-stock'])],
            'sort' => ['nullable', Rule::in(['updated-desc', 'name-asc', 'stock-asc', 'stock-desc'])],
        ]);
    }
}
