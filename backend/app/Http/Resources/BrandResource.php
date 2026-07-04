<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BrandResource extends JsonResource
{
    public static $wrap = null;

    public function toArray(Request $request): array
    {
        $user = $request->user();
        $isAdmin = $user?->role === 'admin';
        $isSupplier = $user?->role === 'supplier';
        $isInternal = $isAdmin || $isSupplier;

        return [
            'id' => $this->id,
            'uuid' => $this->when($isAdmin, $this->uuid),
            'name' => $this->name,
            'slug' => $this->slug,
            'description' => $this->description,
            'logo_url' => $this->logo_path,
            'website_url' => $this->website_url,
            'country_id' => $this->when($isInternal, $this->country_id),
            'status' => $this->when($isInternal, $this->status),
            'is_verified' => (bool) $this->is_verified,
            'created_by' => $this->when($isAdmin, $this->created_by),
            'created_at' => $this->when($isInternal, $this->created_at?->toISOString()),
            'updated_at' => $this->when($isInternal, $this->updated_at?->toISOString()),
            'deleted_at' => $this->when($isAdmin, $this->deleted_at?->toISOString()),
            'creator' => $this->whenLoaded('creator', fn () => [
                'id' => $this->creator?->id,
                'name' => $this->creator?->name,
            ]),
            'seller_brand_authorizations_count' => $this->when($isAdmin, $this->whenCounted('sellerBrandAuthorizations')),
            'suppliers_count' => $this->whenCounted('suppliers'),
        ];
    }
}
