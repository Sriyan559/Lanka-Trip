<?php

namespace App\Http\Controllers\SLBeauty;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBrandRequest;
use App\Http\Requests\UpdateBrandRequest;
use App\Http\Resources\BrandResource;
use App\Models\Brand;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class AdminBrandController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $this->ensureFeatureEnabled('sl_beauty.brand_seller_verification');
        $this->ensureAdmin($request);
        Gate::authorize('viewAny', Brand::class);

        $perPage = min(max($request->integer('per_page', 20), 1), 100);
        $search = trim($request->string('search')->toString());

        $query = Brand::query()
            ->with('creator')
            ->withCount('sellerBrandAuthorizations')
            ->latest();

        if ($search !== '') {
            $query->where(function (Builder $query) use ($search): void {
                $query
                    ->where('name', 'like', "%{$search}%")
                    ->orWhere('slug', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        if ($request->filled('status')) {
            $query->where('status', $request->string('status')->toString());
        }

        if ($request->has('is_verified')) {
            $query->where('is_verified', $request->boolean('is_verified'));
        }

        $paginator = $query->paginate($perPage)->withQueryString();
        $pagination = $paginator->toArray();
        unset($pagination['data']);

        return $this->successResponse([
            'data' => BrandResource::collection($paginator->getCollection())->resolve($request),
            ...$pagination,
        ]);
    }

    public function store(StoreBrandRequest $request): JsonResponse
    {
        $this->ensureFeatureEnabled('sl_beauty.brand_seller_verification');
        $this->ensureAdmin($request);
        Gate::authorize('create', Brand::class);

        $brand = Brand::create([
            'uuid' => (string) Str::uuid(),
            'created_by' => $request->user()->id,
            ...$this->brandAttributes($request->validated()),
        ]);

        return $this->brandResponse(
            $brand->refresh()->load('creator'),
            $request,
            'Brand created successfully.',
            Response::HTTP_CREATED,
        );
    }

    public function show(Request $request, Brand $brand): JsonResponse
    {
        $this->ensureFeatureEnabled('sl_beauty.brand_seller_verification');
        $this->ensureAdmin($request);
        Gate::authorize('view', $brand);

        return $this->brandResponse(
            $brand->load('creator')->loadCount('sellerBrandAuthorizations'),
            $request,
        );
    }

    public function update(UpdateBrandRequest $request, Brand $brand): JsonResponse
    {
        $this->ensureFeatureEnabled('sl_beauty.brand_seller_verification');
        $this->ensureAdmin($request);
        Gate::authorize('update', $brand);

        $brand->update($this->brandAttributes($request->validated(), $brand));

        return $this->brandResponse(
            $brand->refresh()->load('creator')->loadCount('sellerBrandAuthorizations'),
            $request,
            'Brand updated successfully.',
        );
    }

    public function updateStatus(Request $request, Brand $brand): JsonResponse
    {
        $this->ensureFeatureEnabled('sl_beauty.brand_seller_verification');
        $this->ensureAdmin($request);
        Gate::authorize('changeStatus', $brand);
        $this->rejectUnexpectedStatusFields($request);

        $validated = $request->validate([
            'status' => ['sometimes', Rule::in(['draft', 'active', 'inactive', 'suspended'])],
            'is_verified' => ['sometimes', 'boolean'],
        ]);

        $brand->update($validated);

        return $this->brandResponse(
            $brand->refresh()->load('creator')->loadCount('sellerBrandAuthorizations'),
            $request,
            'Brand status updated successfully.',
        );
    }

    public function destroy(Request $request, Brand $brand): JsonResponse
    {
        $this->ensureFeatureEnabled('sl_beauty.brand_seller_verification');
        $this->ensureAdmin($request);
        Gate::authorize('delete', $brand);

        if ($brand->sellerBrandAuthorizations()
            ->whereIn('status', ['submitted', 'approved', 'suspended'])
            ->exists()) {
            abort(Response::HTTP_CONFLICT, 'Brand has active authorization records and cannot be deleted safely.');
        }

        $brand->delete();

        return $this->successResponse(message: 'Brand deleted successfully.');
    }

    /**
     * @param array<string, mixed> $attributes
     * @return array<string, mixed>
     */
    private function brandAttributes(array $attributes, ?Brand $brand = null): array
    {
        if ($brand === null && ! array_key_exists('status', $attributes)) {
            $attributes['status'] = 'draft';
        }

        if ($brand === null && ! array_key_exists('is_verified', $attributes)) {
            $attributes['is_verified'] = false;
        }

        if (empty($attributes['slug'])) {
            if ($brand !== null) {
                unset($attributes['slug']);
            } else {
                $attributes['slug'] = $this->uniqueSlug($attributes['name']);
            }
        }

        return $attributes;
    }

    private function uniqueSlug(string $name): string
    {
        $baseSlug = Str::slug($name) ?: 'brand';
        $slug = $baseSlug;
        $counter = 2;

        while (Brand::withTrashed()->where('slug', $slug)->exists()) {
            $slug = "{$baseSlug}-{$counter}";
            $counter++;
        }

        return $slug;
    }

    private function rejectUnexpectedStatusFields(Request $request): void
    {
        $unexpected = array_diff(array_keys($request->all()), ['status', 'is_verified']);

        if ($unexpected !== []) {
            throw ValidationException::withMessages(
                collect($unexpected)
                    ->mapWithKeys(fn (string $field): array => [$field => ['The '.$field.' field is not allowed.']])
                    ->all(),
            );
        }
    }

    private function brandResponse(
        Brand $brand,
        Request $request,
        ?string $message = null,
        int $status = Response::HTTP_OK,
    ): JsonResponse {
        return $this->successResponse([
            'brand' => BrandResource::make($brand)->resolve($request),
        ], $message, $status);
    }

    private function ensureFeatureEnabled(string $featureKey, bool $default = false): void
    {
        abort_unless($this->featureEnabled($featureKey, $default), Response::HTTP_FORBIDDEN);
    }

    private function ensureAdmin(Request $request): void
    {
        abort_unless($request->user()?->isAdministrator(), Response::HTTP_FORBIDDEN);
    }

    private function featureEnabled(string $featureKey, bool $default = false): bool
    {
        try {
            if (Schema::hasTable('feature_flags')) {
                $flag = DB::table('feature_flags')
                    ->where('feature_key', $featureKey)
                    ->where('status', 'active')
                    ->first();

                return $flag !== null ? (bool) $flag->is_enabled : $default;
            }
        } catch (Throwable) {
            return $default;
        }

        return $default;
    }
}
