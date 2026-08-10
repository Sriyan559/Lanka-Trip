<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Services\Admin\BrandManagementService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\StreamedResponse;

class BrandManagementController extends Controller
{
    public function index(Request $request, BrandManagementService $service): JsonResponse
    {
        abort_unless($request->user()->hasPermission('products.view'), 403);
        $filters = $this->filters($request);

        return response()->json(['success' => true, 'data' => $service->dashboard($filters, [
            'canManage' => $request->user()->isAdministrator(),
            'canExport' => $request->user()->hasPermission('analytics.export'),
            'canImport' => $request->user()->isAdministrator(),
            'canReviewAuthorizations' => $request->user()->hasPermission('brand.authorizations.decide'),
        ])]);
    }

    public function export(Request $request, BrandManagementService $service): StreamedResponse
    {
        abort_unless($request->user()->hasPermission('analytics.export'), 403);
        $filters = $this->filters($request);
        $query = Brand::query()->withTrashed()->with(['country:id,name', 'creator:id,name', 'sellerBrandAuthorizations']);
        $service->applyFilters($query, $filters);
        activity('brands')->causedBy($request->user())->withProperties(['filters' => $filters])->log('brand.report_exported');

        return response()->streamDownload(function () use ($query, $service): void {
            $handle = fopen('php://output', 'wb');
            fputcsv($handle, ['Database ID', 'UUID', 'Name', 'Slug', 'Country', 'Master Status', 'Verification', 'Authorization Summary', 'Authorization Expiry', 'Website', 'Updated At', 'Archived At']);
            $query->orderBy('id')->chunkById(500, function ($brands) use ($handle, $service): void {
                foreach ($brands as $brand) {
                    $row = $service->row($brand);
                    fputcsv($handle, [$row['id'], $row['brandId'], $row['brandName'], $row['slug'], $row['country'], $row['status'], $row['verificationStatus'], $row['authorizationStatus'], $row['authorizationExpiryDate'], $row['website'], $row['updatedAt'], $row['archivedAt']]);
                }
            });
            fclose($handle);
        }, 'brand-management-'.now()->format('Ymd-His').'.csv', ['Content-Type' => 'text/csv; charset=UTF-8', 'X-Content-Type-Options' => 'nosniff']);
    }

    public function import(Request $request): JsonResponse
    {
        abort_unless($request->user()->isAdministrator(), 403);
        Gate::authorize('create', Brand::class);
        $request->validate(['file' => ['required', 'file', 'mimes:csv,txt', 'max:10240']]);
        $handle = fopen($request->file('file')->getRealPath(), 'rb');
        $headers = array_map(fn ($x) => Str::snake(trim((string) $x)), fgetcsv($handle) ?: []);
        if (array_diff(['name'], $headers)) {
            throw ValidationException::withMessages(['file' => 'Required column: name. Supported columns: name, slug, description, website_url, country_id, status, is_verified.']);
        }
        $supported = ['name', 'slug', 'description', 'website_url', 'country_id', 'status', 'is_verified'];
        if ($unknown = array_diff($headers, $supported)) {
            throw ValidationException::withMessages(['file' => 'Unsupported columns: '.implode(', ', $unknown).'.']);
        }
        $rows = [];
        $errors = [];
        $line = 1;
        $seen = [];
        while (($values = fgetcsv($handle)) !== false) {
            $line++;
            if (count($values) !== count($headers)) {
                $errors[$line] = ['Column count does not match header.'];

                continue;
            }
            $row = array_combine($headers, $values);
            $slug = trim((string) ($row['slug'] ?? '')) ?: Str::slug((string) $row['name']);
            $row['slug'] = $slug;
            $validator = validator($row, ['name' => ['required', 'string', 'max:255'], 'slug' => ['required', 'string', 'max:255'], 'description' => ['nullable', 'string'], 'website_url' => ['nullable', 'url', 'max:2048'], 'country_id' => ['nullable', 'integer', 'exists:countries,id'], 'status' => ['nullable', Rule::in(['draft', 'active', 'inactive', 'suspended'])], 'is_verified' => ['nullable', Rule::in(['0', '1', 0, 1, true, false, 'true', 'false'])]]);
            if ($validator->fails()) {
                $errors[$line] = $validator->errors()->all();

                continue;
            }
            if (isset($seen[$slug])) {
                $errors[$line] = ["Duplicate slug; first seen on line {$seen[$slug]}."];

                continue;
            }
            $seen[$slug] = $line;
            $rows[] = $validator->validated();
        }
        fclose($handle);
        if ($errors) {
            throw ValidationException::withMessages(['rows' => $errors]);
        }
        $result = DB::transaction(function () use ($rows, $request): array {
            $created = 0;
            $updated = 0;
            foreach ($rows as $row) {
                $brand = Brand::withTrashed()->where('slug', $row['slug'])->lockForUpdate()->first();
                $attributes = $row + ['status' => 'draft', 'is_verified' => false];
                $attributes['is_verified'] = filter_var($attributes['is_verified'], FILTER_VALIDATE_BOOLEAN);
                if ($brand) {
                    $brand->update($attributes);
                    if ($brand->trashed()) {
                        $brand->restore();
                    } $updated++;
                } else {
                    $brand = Brand::create($attributes + ['uuid' => (string) Str::uuid(), 'created_by' => $request->user()->id]);
                    $created++;
                }
                activity('brands')->causedBy($request->user())->performedOn($brand)->log($brand->wasRecentlyCreated ? 'brand.import_created' : 'brand.import_updated');
            }

            return ['created' => $created, 'updated' => $updated, 'skipped' => 0, 'failed' => 0, 'warnings' => [], 'validationErrors' => []];
        });

        return response()->json(['success' => true, 'data' => $result]);
    }

    private function filters(Request $request): array
    {
        return $request->validate([
            'page' => ['nullable', 'integer', 'min:1'], 'pageSize' => ['nullable', 'integer', 'min:1', 'max:100'], 'search' => ['nullable', 'string', 'max:150'],
            'scope' => ['nullable', Rule::in(['all', 'active', 'verified', 'expired', 'duplicates', 'archived'])], 'verified' => ['nullable', 'boolean'],
            'status' => ['nullable', Rule::in(['draft', 'active', 'inactive', 'suspended'])], 'authorization' => ['nullable', Rule::in(['draft', 'submitted', 'approved', 'rejected', 'evidence_required', 'suspended', 'expired', 'revoked'])],
            'supplierId' => ['nullable', 'integer', 'exists:suppliers,id'], 'countryId' => ['nullable', 'integer', 'exists:countries,id'],
            'updatedFrom' => ['nullable', 'date'], 'updatedTo' => ['nullable', 'date', 'after_or_equal:updatedFrom'], 'sort' => ['nullable', Rule::in(['name', 'status', 'is_verified', 'created_at', 'updated_at'])], 'direction' => ['nullable', Rule::in(['asc', 'desc'])],
        ]);
    }
}
