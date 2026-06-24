<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SupplierResource extends JsonResource
{
    public static $wrap = null;

    public function toArray(Request $request): array
    {
        $location = implode(', ', array_filter([$this->city, $this->country]));

        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'company_name' => $this->company_name,
            'slug' => $this->slug,
            'logo' => $this->logo,
            'cover_image' => $this->cover_image,
            'description' => $this->description,
            'country' => $this->country,
            'city' => $this->city,
            'address' => $this->address,
            'phone' => $this->phone,
            'email' => $this->email,
            'website' => $this->website,
            'business_type' => $this->business_type,
            'established_year' => $this->established_year,
            'employee_count' => $this->employee_count,
            'factory_size' => $this->factory_size,
            'annual_revenue' => $this->annual_revenue !== null ? (float) $this->annual_revenue : null,
            'export_percentage' => $this->export_percentage !== null ? (float) $this->export_percentage : null,
            'main_markets' => $this->main_markets ?? [],
            'verification_status' => $this->verification_status,
            'is_featured' => $this->is_featured,
            'rating' => (float) $this->rating,
            'reviews_count' => $this->reviews_count,
            'status' => $this->status,
            'products_count' => $this->whenCounted('products'),
            'latest_products' => ProductResource::collection($this->whenLoaded('products')),

            // Frontend compatibility aliases.
            'name' => $this->company_name,
            'image' => $this->logo,
            'coverImage' => $this->cover_image,
            'location' => $location,
            'verified' => $this->verification_status === 'verified',
            'products' => $this->whenCounted('products'),
            'productsCount' => $this->whenCounted('products'),
            'businessType' => $this->business_type,
            'since' => $this->created_at?->year,
            'reviews' => $this->reviews_count,
            'categories' => [],
            'contact' => [
                'email' => $this->email,
                'phone' => $this->phone,
                'website' => $this->website,
                'address' => $this->address,
            ],
        ];
    }
}
