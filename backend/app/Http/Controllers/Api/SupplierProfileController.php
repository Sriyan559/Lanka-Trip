<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\SupplierProfile\StoreSupplierCertificateRequest;
use App\Http\Requests\SupplierProfile\StoreSupplierStrengthRequest;
use App\Http\Requests\SupplierProfile\StoreSupplierVideoRequest;
use App\Http\Requests\SupplierProfile\UpdateCompanyProfileRequest;
use App\Http\Requests\SupplierProfile\UpdateProductionCapacityRequest;
use App\Http\Resources\ProductionCapacityResource;
use App\Http\Resources\ProductResource;
use App\Http\Resources\SupplierCertificateResource;
use App\Http\Resources\SupplierResource;
use App\Http\Resources\SupplierStrengthResource;
use App\Http\Resources\SupplierVideoResource;
use App\Models\Supplier;
use App\Models\SupplierCertificate;
use App\Models\SupplierStrength;
use App\Models\SupplierVideo;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Symfony\Component\HttpFoundation\Response;

class SupplierProfileController extends Controller
{
    public function publicCompanyProfile(Request $request, int $id): JsonResponse
    {
        $supplier = Supplier::query()
            ->active()
            ->with([
                'certificates',
                'videos',
                'strengths',
                'productionCapacity',
                'products' => fn ($query) => $query
                    ->active()
                    ->whereHas('category', fn (Builder $query) => $query->active())
                    ->with(['category', 'images', 'supplier'])
                    ->latest()
                    ->limit(8),
            ])
            ->withCount([
                'products' => fn (Builder $query) => $query
                    ->active()
                    ->whereHas('category', fn (Builder $query) => $query->active()),
            ])
            ->findOrFail($id);

        return $this->companyProfileResponse($supplier, $request);
    }

    public function getCompanyProfile(Request $request): JsonResponse
    {
        $supplier = $this->ownedSupplier($request);

        $supplier->load([
            'certificates',
            'videos',
            'strengths',
            'productionCapacity',
            'products' => fn ($query) => $query
                ->active()
                ->whereHas('category', fn (Builder $query) => $query->active())
                ->with(['category', 'images', 'supplier'])
                ->latest()
                ->limit(8),
        ])->loadCount([
            'products' => fn (Builder $query) => $query
                ->active()
                ->whereHas('category', fn (Builder $query) => $query->active()),
        ]);

        return $this->companyProfileResponse($supplier, $request);
    }

    public function updateCompanyProfile(UpdateCompanyProfileRequest $request): JsonResponse
    {
        $supplier = $this->ownedSupplier($request);
        Gate::authorize('update', $supplier);
        $supplier->update($request->safe()->only([
            'company_name',
            'description',
            'country',
            'city',
            'address',
            'phone',
            'email',
            'website',
            'business_type',
            'established_year',
            'employee_count',
            'factory_size',
            'annual_revenue',
            'export_percentage',
            'main_markets',
        ]));

        return $this->successResponse([
            'supplier' => SupplierResource::make($supplier->refresh())->resolve($request),
        ], 'Company profile updated successfully.');
    }

    public function certificates(Request $request): JsonResponse
    {
        $certificates = $this->ownedSupplier($request)
            ->certificates()
            ->latest()
            ->get();

        return $this->successResponse([
            'data' => SupplierCertificateResource::collection($certificates)->resolve($request),
        ]);
    }

    public function storeCertificate(StoreSupplierCertificateRequest $request): JsonResponse
    {
        $certificate = $this->ownedSupplier($request)
            ->certificates()
            ->create($request->validated());

        return $this->successResponse([
            'certificate' => SupplierCertificateResource::make($certificate)->resolve($request),
        ], 'Certificate added successfully.', Response::HTTP_CREATED);
    }

    public function deleteCertificate(Request $request, int $id): JsonResponse
    {
        $supplier = $this->ownedSupplier($request);
        $certificate = SupplierCertificate::query()
            ->where('supplier_id', $supplier->id)
            ->findOrFail($id);
        $certificate->delete();

        return $this->successResponse(message: 'Certificate deleted successfully.');
    }

    public function videos(Request $request): JsonResponse
    {
        $videos = $this->ownedSupplier($request)
            ->videos()
            ->latest()
            ->get();

        return $this->successResponse([
            'data' => SupplierVideoResource::collection($videos)->resolve($request),
        ]);
    }

    public function storeVideo(StoreSupplierVideoRequest $request): JsonResponse
    {
        $video = $this->ownedSupplier($request)
            ->videos()
            ->create($request->validated());

        return $this->successResponse([
            'video' => SupplierVideoResource::make($video)->resolve($request),
        ], 'Video added successfully.', Response::HTTP_CREATED);
    }

    public function deleteVideo(Request $request, int $id): JsonResponse
    {
        $supplier = $this->ownedSupplier($request);
        $video = SupplierVideo::query()
            ->where('supplier_id', $supplier->id)
            ->findOrFail($id);
        $video->delete();

        return $this->successResponse(message: 'Video deleted successfully.');
    }

    public function strengths(Request $request): JsonResponse
    {
        $strengths = $this->ownedSupplier($request)
            ->strengths()
            ->orderBy('strength_name')
            ->get();

        return $this->successResponse([
            'data' => SupplierStrengthResource::collection($strengths)->resolve($request),
        ]);
    }

    public function storeStrength(StoreSupplierStrengthRequest $request): JsonResponse
    {
        $strength = $this->ownedSupplier($request)
            ->strengths()
            ->create($request->validated());

        return $this->successResponse([
            'strength' => SupplierStrengthResource::make($strength)->resolve($request),
        ], 'Strength added successfully.', Response::HTTP_CREATED);
    }

    public function deleteStrength(Request $request, int $id): JsonResponse
    {
        $supplier = $this->ownedSupplier($request);
        $strength = SupplierStrength::query()
            ->where('supplier_id', $supplier->id)
            ->findOrFail($id);
        $strength->delete();

        return $this->successResponse(message: 'Strength deleted successfully.');
    }

    public function productionCapacity(Request $request): JsonResponse
    {
        $capacity = $this->ownedSupplier($request)->productionCapacity;

        return $this->successResponse([
            'production_capacity' => $capacity
                ? ProductionCapacityResource::make($capacity)->resolve($request)
                : null,
        ]);
    }

    public function updateProductionCapacity(UpdateProductionCapacityRequest $request): JsonResponse
    {
        $supplier = $this->ownedSupplier($request);
        $capacity = $supplier->productionCapacity()->updateOrCreate(
            ['supplier_id' => $supplier->id],
            $request->validated(),
        );

        return $this->successResponse([
            'production_capacity' => ProductionCapacityResource::make($capacity)->resolve($request),
        ], 'Production capacity updated successfully.');
    }

    private function ownedSupplier(Request $request): Supplier
    {
        abort_unless($request->user()?->role === 'supplier', Response::HTTP_FORBIDDEN);

        return Supplier::query()
            ->where('user_id', $request->user()->id)
            ->firstOrFail();
    }

    private function companyProfileResponse(Supplier $supplier, Request $request): JsonResponse
    {
        return $this->successResponse([
            'supplier' => SupplierResource::make($supplier)->resolve($request),
            'certificates' => SupplierCertificateResource::collection($supplier->certificates)->resolve($request),
            'videos' => SupplierVideoResource::collection($supplier->videos)->resolve($request),
            'strengths' => SupplierStrengthResource::collection($supplier->strengths)->resolve($request),
            'production_capacity' => $supplier->productionCapacity
                ? ProductionCapacityResource::make($supplier->productionCapacity)->resolve($request)
                : null,
            'latest_products' => ProductResource::collection($supplier->products)->resolve($request),
        ]);
    }
}
