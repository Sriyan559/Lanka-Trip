<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Services\Admin\CategoryManagementService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\StreamedResponse;

class CategoryManagementController extends Controller
{
    public function index(Request $request, CategoryManagementService $service): JsonResponse
    {
        abort_unless($request->user()->hasPermission('products.view'), 403);
        $filters = $request->validate(['page' => ['nullable', 'integer', 'min:1'], 'pageSize' => ['nullable', 'integer', 'min:1', 'max:100'], 'search' => ['nullable', 'string', 'max:150'], 'parentId' => ['nullable', 'regex:/^(root|[0-9]+)$/'], 'level' => ['nullable', 'integer', 'min:1'], 'status' => ['nullable', Rule::in(['active', 'inactive'])], 'requiredAttributes' => ['nullable', Rule::in(['with', 'without'])], 'scope' => ['nullable', Rule::in(['duplicates', 'empty'])]]);

        return response()->json(['success' => true, 'data' => $service->dashboard($filters, ['canManage' => $request->user()->hasPermission('categories.manage'), 'canExport' => $request->user()->hasPermission('analytics.export'), 'canImport' => $request->user()->hasPermission('products.manage')])]);
    }

    public function store(Request $request, CategoryManagementService $service): JsonResponse
    {
        abort_unless($request->user()->hasPermission('categories.manage'), 403);
        $category = $service->create($this->payload($request), $request->user());

        return response()->json(['success' => true, 'data' => ['id' => $category->id]], 201);
    }

    public function show(Request $request, Category $category, CategoryManagementService $service): JsonResponse
    {
        abort_unless($request->user()->hasPermission('products.view'), 403);

        return response()->json(['success' => true, 'data' => $service->detail($category)]);
    }

    public function update(Request $request, Category $category, CategoryManagementService $service): JsonResponse
    {
        abort_unless($request->user()->hasPermission('categories.manage'), 403);
        $updated = $service->update($category, $this->payload($request, $category), $request->user());

        return response()->json(['success' => true, 'data' => ['id' => $updated->id]]);
    }

    public function move(Request $request, Category $category, CategoryManagementService $service): JsonResponse
    {
        abort_unless($request->user()->hasPermission('categories.manage'), 403);
        $v = $request->validate(['parent_id' => ['nullable', 'integer', 'exists:categories,id']]);
        $service->move($category, $v['parent_id'] ?? null, $request->user());

        return response()->json(['success' => true]);
    }

    public function merge(Request $request, Category $category, CategoryManagementService $service): JsonResponse
    {
        abort_unless($request->user()->hasPermission('categories.manage'), 403);
        $v = $request->validate(['target_id' => ['required', 'integer', 'exists:categories,id']]);

        return response()->json(['success' => true, 'data' => $service->merge($category, Category::findOrFail($v['target_id']), $request->user())]);
    }

    public function export(Request $request, CategoryManagementService $service): StreamedResponse
    {
        abort_unless($request->user()->hasPermission('analytics.export'), 403);
        $data = $service->dashboard($request->only(['search', 'parentId', 'level', 'status', 'requiredAttributes', 'scope']) + ['pageSize' => 100000], []);
        activity('categories')->causedBy($request->user())->withProperties(['filters' => $request->only(['search', 'parentId', 'level', 'status', 'requiredAttributes', 'scope'])])->log('category.report_exported');

        return response()->streamDownload(function () use ($data) {
            $h = fopen('php://output', 'wb');
            fputcsv($h, ['Database ID', 'Name', 'Slug', 'Hierarchy Path', 'Level', 'Parent', 'Active Products', 'Required Attributes', 'Attribute Coverage', 'Status']);
            foreach ($data['categories']['data'] as $r) {
                fputcsv($h, [$r['categoryId'], $r['categoryName'], $r['slug'], $r['hierarchyPath'], $r['level'], $r['parentCategory'], $r['activeProductsCount'], $r['requiredAttributesCount'], $r['attributeCoveragePercent'], $r['status']]);
            }
            fclose($h);
        }, 'category-management-'.now()->format('Ymd-His').'.csv', ['Content-Type' => 'text/csv; charset=UTF-8', 'X-Content-Type-Options' => 'nosniff']);
    }

    public function import(Request $request): JsonResponse
    {
        abort_unless($request->user()->hasPermission('products.manage'), 403);
        $request->validate(['file' => ['required', 'file', 'mimes:csv,txt', 'max:10240']]);
        $h = fopen($request->file('file')->getRealPath(), 'rb');
        $headers = array_map(fn ($x) => Str::snake(trim((string) $x)), fgetcsv($h) ?: []);
        if (array_diff(['product_id', 'category_id'], $headers)) {
            throw ValidationException::withMessages(['file' => 'Required columns: product_id, category_id.']);
        }
        $rows = [];
        $errors = [];
        $seenProducts = [];
        $line = 1;
        while (($values = fgetcsv($h)) !== false) {
            $line++;
            if (count($values) !== count($headers)) {
                $errors[$line] = ['Column count does not match header.'];

                continue;
            }
            $row = array_combine($headers, $values);
            $valid = validator($row, [
                'product_id' => ['required', 'integer', Rule::exists('products', 'id')->whereNull('deleted_at')],
                'category_id' => ['required', 'integer', 'exists:categories,id'],
            ]);
            if ($valid->fails()) {
                $errors[$line] = $valid->errors()->all();

                continue;
            }
            $validated = $valid->validated();
            if (isset($seenProducts[$validated['product_id']])) {
                $firstLine = $seenProducts[$validated['product_id']];
                $errors[$line] = ["Duplicate product_id; first seen on line {$firstLine}."];

                continue;
            }
            $seenProducts[$validated['product_id']] = $line;
            $rows[] = $validated;
        }
        fclose($h);
        if ($errors) {
            throw ValidationException::withMessages(['rows' => $errors]);
        }
        DB::transaction(function () use ($rows, $request) {
            foreach ($rows as $r) {
                DB::table('products')->where('id', $r['product_id'])->update(['category_id' => $r['category_id'], 'updated_at' => now()]);
            }
            activity('categories')->causedBy($request->user())->withProperties(['rows' => count($rows)])->log('category.mapping_imported');
        });

        return response()->json(['success' => true, 'data' => ['created' => 0, 'updated' => count($rows), 'mapped' => count($rows), 'skipped' => 0, 'failed' => 0, 'warnings' => [], 'validationErrors' => []]]);
    }

    private function payload(Request $request, ?Category $category = null): array
    {
        return $request->validate(['name' => ['required', 'string', 'max:255'], 'slug' => ['required', 'string', 'max:255', Rule::unique('categories', 'slug')->ignore($category?->id)], 'description' => ['nullable', 'string'], 'parent_id' => ['nullable', 'integer', 'exists:categories,id'], 'sort_order' => ['nullable', 'integer', 'min:0'], 'status' => ['required', Rule::in(['active', 'inactive'])]]);
    }
}
