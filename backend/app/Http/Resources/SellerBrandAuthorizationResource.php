<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SellerBrandAuthorizationResource extends JsonResource
{
    public static $wrap = null;

    public function toArray(Request $request): array
    {
        $user = $request->user();
        $isAdmin = $user?->role === 'admin';
        $isOwner = $user?->role === 'supplier'
            && (int) ($user->supplier?->id ?? 0) === (int) $this->supplier_id;
        $canSeePrivateFields = $isAdmin || $isOwner;
        $isApproved = $this->status === 'approved';

        return [
            'id' => $this->when($canSeePrivateFields, $this->id),
            'supplier_id' => $this->when($canSeePrivateFields, $this->supplier_id),
            'brand_id' => $this->when($canSeePrivateFields, $this->brand_id),
            'authorization_type' => $this->when($canSeePrivateFields || $isApproved, $this->authorization_type),
            'territory' => $this->when($canSeePrivateFields || $isApproved, $this->territory),
            'document_path' => $this->when($canSeePrivateFields, $this->document_path),
            'starts_at' => $this->when($canSeePrivateFields, $this->starts_at?->toDateString()),
            'expires_at' => $this->when($canSeePrivateFields, $this->expires_at?->toDateString()),
            'status' => $this->when($canSeePrivateFields || $isApproved, $this->status),
            'reviewed_by' => $this->when($isAdmin, $this->reviewed_by),
            'reviewed_at' => $this->when($canSeePrivateFields, $this->reviewed_at?->toISOString()),
            'review_notes' => $this->when($canSeePrivateFields, $this->review_notes),
            'created_at' => $this->when($canSeePrivateFields, $this->created_at?->toISOString()),
            'updated_at' => $this->when($canSeePrivateFields, $this->updated_at?->toISOString()),
            'brand' => $this->whenLoaded(
                'brand',
                fn () => BrandResource::make($this->brand)->resolve($request),
            ),
            'supplier' => $this->when($isAdmin && $this->relationLoaded('supplier'), fn () => [
                'id' => $this->supplier?->id,
                'company_name' => $this->supplier?->company_name,
                'verification_status' => $this->supplier?->verification_status,
                'status' => $this->supplier?->status,
            ]),
            'reviewer' => $this->when($isAdmin && $this->relationLoaded('reviewer'), fn () => [
                'id' => $this->reviewer?->id,
                'name' => $this->reviewer?->name,
            ]),
        ];
    }
}
