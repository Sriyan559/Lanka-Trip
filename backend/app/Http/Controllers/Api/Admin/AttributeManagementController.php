<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProductAttribute;
use App\Services\Admin\AttributeManagementService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\StreamedResponse;

class AttributeManagementController extends Controller
{
    public function index(Request $request, AttributeManagementService $service): JsonResponse
    {
        abort_unless($request->user()->hasPermission('products.view'), 403);
        $filters = $request->validate($this->filterRules());

        return response()->json(['success' => true, 'data' => $service->dashboard($filters, $this->capabilities($request))]);
    }

    public function show(Request $request, ProductAttribute $attribute, AttributeManagementService $service): JsonResponse
    {
        abort_unless($request->user()->hasPermission('products.view'), 403);

        return response()->json(['success' => true, 'data' => $service->detail($attribute)]);
    }

    public function store(Request $request, AttributeManagementService $service): JsonResponse
    {
        abort_unless($request->user()->hasPermission('products.manage'), 403);
        $attribute = $service->create($this->payload($request), $request->user());

        return response()->json(['success' => true, 'data' => $service->detail($attribute)], 201);
    }

    public function update(Request $request, ProductAttribute $attribute, AttributeManagementService $service): JsonResponse
    {
        abort_unless($request->user()->hasPermission('products.manage'), 403);
        $updated = $service->update($attribute, $this->payload($request, $attribute, true), $request->user());

        return response()->json(['success' => true, 'data' => $service->detail($updated)]);
    }

    public function values(Request $request, ProductAttribute $attribute, AttributeManagementService $service): JsonResponse
    {
        abort_unless($request->user()->hasPermission('products.manage'), 403);
        $data = $request->validate(['values' => ['required', 'array', 'max:1000'], 'values.*' => ['required', 'string', 'max:255', 'distinct']]);
        $updated = $service->updateValues($attribute, $data['values'], $request->user());

        return response()->json(['success' => true, 'data' => $service->detail($updated)]);
    }

    public function archive(Request $request, ProductAttribute $attribute, AttributeManagementService $service): JsonResponse
    {
        abort_unless($request->user()->hasPermission('products.manage'), 403);
        $service->bulk([$attribute->id], 'archive', $request->user());

        return response()->json(['success' => true]);
    }

    public function bulk(Request $request, AttributeManagementService $service): JsonResponse
    {
        abort_unless($request->user()->hasPermission('products.manage'), 403);
        $data = $request->validate(['ids' => ['required', 'array', 'min:1', 'max:500'], 'ids.*' => ['integer', 'distinct', 'exists:product_attributes,id'], 'action' => ['required', Rule::in(['activate', 'deactivate', 'archive'])]]);

        return response()->json(['success' => true, 'data' => ['updated' => $service->bulk($data['ids'], $data['action'], $request->user())]]);
    }

    public function merge(Request $request, ProductAttribute $attribute, AttributeManagementService $service): JsonResponse
    {
        abort_unless($request->user()->hasPermission('products.manage'), 403);
        $data = $request->validate(['target_id' => ['required', 'integer', 'exists:product_attributes,id']]);

        return response()->json(['success' => true, 'data' => $service->merge($attribute, ProductAttribute::findOrFail($data['target_id']), $request->user())]);
    }

    public function export(Request $request, AttributeManagementService $service): StreamedResponse
    {
        abort_unless($request->user()->hasPermission('analytics.export'), 403);
        $filters = validator($request->query(), $this->filterRules())->validate();
        activity('product_attributes')->causedBy($request->user())->withProperties(['filters' => $filters])->log('attribute.report_exported');

        return response()->streamDownload(function () use ($service, $filters) {
            $handle = fopen('php://output', 'wb');
            fputcsv($handle, ['Database ID', 'Public UUID', 'Name', 'Group', 'Data Type', 'Input Type', 'Unit', 'Required', 'Variant Defining', 'Category Mappings', 'Product Usage', 'Variant Usage', 'Allowed Values', 'Completeness', 'Missing Required Values', 'Status', 'Updated At']);
            $page = 1;
            do {
                $data = $service->dashboard($filters + ['page' => $page, 'pageSize' => 100], []);
                foreach ($data['attributes']['data'] as $row) fputcsv($handle, [$row['id'], $row['attributeId'], $row['attributeName'], $row['groupName'], $row['dataType'], $row['inputType'], $row['unit'], $row['isRequired'] ? 'Yes' : 'No', $row['isVariantGenerating'] ? 'Yes' : 'No', $row['categoryCount'], $row['productUsageCount'], $row['variantCount'], implode('|', $row['allowedValues']), $row['completenessPercent'], $row['issuesCount'], $row['status'], $row['updatedAt']]);
                $page++;
            } while ($page <= $data['attributes']['lastPage']);
            fclose($handle);
        }, 'attribute-management-'.now()->format('Ymd-His').'.csv', ['Content-Type' => 'text/csv; charset=UTF-8', 'X-Content-Type-Options' => 'nosniff']);
    }

    public function import(Request $request, AttributeManagementService $service): JsonResponse
    {
        abort_unless($request->user()->hasPermission('products.manage'), 403);
        $request->validate(['file' => ['required', 'file', 'mimes:csv,txt', 'max:10240']]);
        $handle = fopen($request->file('file')->getRealPath(), 'rb');
        $headers = array_map(fn ($value) => Str::snake(trim((string) $value)), fgetcsv($handle) ?: []);
        if (array_diff(['name', 'data_type'], $headers)) throw ValidationException::withMessages(['file' => 'Required columns: name, data_type.']);
        $rows = []; $errors = []; $line = 1; $seen = [];
        while (($values = fgetcsv($handle)) !== false) {
            $line++;
            if (count($values) !== count($headers)) { $errors[$line] = ['Column count does not match header.']; continue; }
            $row = array_combine($headers, $values);
            $slug = Str::slug((string) ($row['name'] ?? ''));
            if (isset($seen[$slug])) { $errors[$line] = ["Duplicate name; first seen on line {$seen[$slug]}."]; continue; }
            $seen[$slug] = $line;
            $validation = validator($row, [
                'name' => ['required', 'string', 'max:255'], 'data_type' => ['required', Rule::in(['text', 'number', 'boolean', 'date', 'select'])],
                'group_id' => ['nullable', 'integer', 'exists:attribute_groups,id'], 'unit' => ['nullable', 'string', 'max:50'],
                'is_required' => ['nullable', Rule::in(['0', '1', 'true', 'false', 'yes', 'no'])], 'is_filterable' => ['nullable', Rule::in(['0', '1', 'true', 'false', 'yes', 'no'])],
                'is_variant_defining' => ['nullable', Rule::in(['0', '1', 'true', 'false', 'yes', 'no'])], 'status' => ['nullable', Rule::in(['active', 'inactive', 'draft', 'archived'])],
                'input_type' => ['nullable', 'string', 'max:50'], 'definition' => ['nullable', 'string', 'max:2000'], 'allowed_values' => ['nullable', 'string', 'max:10000'],
            ]);
            if ($validation->fails()) { $errors[$line] = $validation->errors()->all(); continue; }
            $valid = $validation->validated();
            foreach (['is_required', 'is_filterable', 'is_variant_defining'] as $key) if (array_key_exists($key, $valid)) $valid[$key] = filter_var($valid[$key], FILTER_VALIDATE_BOOLEAN);
            $valid['attribute_group_id'] = $valid['group_id'] ?? null; unset($valid['group_id']);
            if (! empty($valid['allowed_values'])) $valid['allowed_values'] = array_values(array_filter(array_map('trim', explode('|', $valid['allowed_values']))));
            $rows[] = $valid;
        }
        fclose($handle);
        if ($errors) throw ValidationException::withMessages(['rows' => $errors]);

        $result = DB::transaction(function () use ($rows, $service, $request) {
            $created = 0; $updated = 0;
            foreach ($rows as $row) {
                $existing = ProductAttribute::where('slug', Str::slug($row['name']))->first();
                if ($existing) { $service->update($existing, $row, $request->user()); $updated++; }
                else { $service->create($row, $request->user()); $created++; }
            }
            activity('product_attributes')->causedBy($request->user())->withProperties(['created' => $created, 'updated' => $updated])->log('attribute.imported');
            return compact('created', 'updated');
        });

        return response()->json(['success' => true, 'data' => $result + ['skipped' => 0, 'failed' => 0, 'warnings' => [], 'validationErrors' => []]]);
    }

    private function filterRules(): array
    {
        return [
            'page' => ['nullable', 'integer', 'min:1'], 'pageSize' => ['nullable', 'integer', 'min:1', 'max:100'], 'search' => ['nullable', 'string', 'max:150'],
            'groupId' => ['nullable', 'integer', 'exists:attribute_groups,id'], 'categoryId' => ['nullable', 'integer', 'exists:categories,id'],
            'status' => ['nullable', Rule::in(['active', 'inactive', 'draft', 'archived'])], 'dataType' => ['nullable', Rule::in(['text', 'number', 'boolean', 'date', 'select'])],
            'required' => ['nullable', 'boolean'], 'variantGenerating' => ['nullable', 'boolean'], 'scope' => ['nullable', Rule::in(['all', 'active', 'required', 'variant', 'quality', 'missing', 'duplicates', 'invalid'])],
            'updatedFrom' => ['nullable', 'date'], 'sort' => ['nullable', Rule::in(['name', 'dataType', 'status', 'updatedAt'])], 'direction' => ['nullable', Rule::in(['asc', 'desc'])],
        ];
    }

    private function payload(Request $request, ?ProductAttribute $attribute = null, bool $partial = false): array
    {
        $sometimes = $partial ? 'sometimes' : 'required';
        return $request->validate([
            'name' => [$sometimes, 'string', 'max:255', Rule::unique('product_attributes', 'name')->ignore($attribute?->id)],
            'attribute_group_id' => ['nullable', 'integer', 'exists:attribute_groups,id'], 'data_type' => [$sometimes, Rule::in(['text', 'number', 'boolean', 'date', 'select'])],
            'unit' => ['nullable', 'string', 'max:50'], 'is_required' => ['sometimes', 'boolean'], 'is_filterable' => ['sometimes', 'boolean'], 'is_variant_defining' => ['sometimes', 'boolean'],
            'sort_order' => ['sometimes', 'integer', 'min:0'], 'status' => ['sometimes', Rule::in(['active', 'inactive', 'draft', 'archived'])],
            'input_type' => ['nullable', 'string', 'max:50'], 'definition' => ['nullable', 'string', 'max:2000'], 'allowed_values' => ['nullable', 'array', 'max:1000'], 'allowed_values.*' => ['string', 'max:255', 'distinct'],
            'category_ids' => ['nullable', 'array', 'max:500'], 'category_ids.*' => ['integer', 'distinct', 'exists:categories,id'],
        ]);
    }

    private function capabilities(Request $request): array
    {
        return ['canView' => true, 'canManage' => $request->user()->hasPermission('products.manage'), 'canImport' => $request->user()->hasPermission('products.manage'), 'canExport' => $request->user()->hasPermission('analytics.export'), 'canMerge' => $request->user()->hasPermission('products.manage')];
    }
}
