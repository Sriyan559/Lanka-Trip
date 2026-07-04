<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductBeautyProfileResource extends JsonResource
{
    public static $wrap = null;

    public function toArray(Request $request): array
    {
        $user = $request->user();
        $isAdmin = $user?->role === 'admin';
        $isSupplier = $user?->role === 'supplier';
        $isInternal = $isAdmin || $isSupplier;

        return [
            'id' => $this->when($isInternal, $this->id),
            'product_id' => $this->product_id,
            'skin_type' => $this->skin_type,
            'hair_type' => $this->hair_type,
            'skin_concern' => $this->skin_concern,
            'hair_concern' => $this->hair_concern,
            'ingredients' => $this->ingredients,
            'how_to_use' => $this->how_to_use,
            'warnings' => $this->warnings,
            'spf_value' => $this->spf_value,
            'shade_family' => $this->shade_family,
            'fragrance_family' => $this->fragrance_family,
            'formulation' => $this->formulation,
            'gender_target' => $this->gender_target,
            'age_group' => $this->age_group,
            'expiry_required' => (bool) $this->expiry_required,
            'batch_tracking_required' => (bool) $this->batch_tracking_required,
            'compliance_approved' => $this->compliance_status === 'approved',
            'compliance_status' => $this->when($isInternal, $this->compliance_status),
            'created_at' => $this->when($isInternal, $this->created_at?->toISOString()),
            'updated_at' => $this->when($isInternal, $this->updated_at?->toISOString()),
            'product' => $this->whenLoaded(
                'product',
                fn () => ProductResource::make($this->product)->resolve($request),
            ),
        ];
    }
}
