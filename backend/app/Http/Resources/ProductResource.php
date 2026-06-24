<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    public static $wrap = null;

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'short_description' => $this->short_description,
            'description' => $this->description,
            'price' => (float) $this->price,
            'moq' => (float) $this->moq,
            'unit' => $this->unit,
            'supply_ability' => $this->supply_ability,
            'lead_time' => $this->lead_time,
            'port' => $this->port,
            'packaging_details' => $this->packaging_details,
            'featured_image' => $this->featured_image,
            'images' => $this->whenLoaded(
                'images',
                fn () => $this->images->pluck('image')->values()->all(),
                [],
            ),
            'category' => $this->whenLoaded(
                'category',
                fn () => CategoryResource::make($this->category)->resolve($request),
            ),
            'supplier_id' => $this->supplier_id,
            'supplier_details' => $this->whenLoaded(
                'supplier',
                fn () => SupplierResource::make($this->supplier)->resolve($request),
            ),
            'status' => $this->status,
            'is_featured' => $this->is_featured,
            'views_count' => $this->views_count,
            'average_rating' => (float) $this->average_rating,
            'reviews_count' => $this->reviews_count,
            'deleted_at' => $this->deleted_at?->toISOString(),

            // Frontend compatibility aliases.
            'image' => $this->featured_image,
            'minOrder' => (float) $this->moq,
            'moqUnit' => $this->unit,
            'supplier' => $this->whenLoaded('supplier', fn () => $this->supplier?->company_name),
            'supplierLocation' => $this->whenLoaded(
                'supplier',
                fn () => implode(', ', array_filter([
                    $this->supplier?->city,
                    $this->supplier?->country,
                ])),
            ),
            'verified' => $this->whenLoaded(
                'supplier',
                fn () => $this->supplier?->verification_status === 'verified',
            ),
            'audited' => $this->whenLoaded(
                'supplier',
                fn () => $this->supplier?->verification_status === 'verified',
            ),
        ];
    }
}
