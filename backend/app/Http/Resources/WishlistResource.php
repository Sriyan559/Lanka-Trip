<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class WishlistResource extends JsonResource
{
    public static $wrap = null;

    public function toArray(Request $request): array
    {
        $product = $this->product;

        return [
            'id' => $this->id,
            'product' => $product ? [
                'id' => $product->id,
                'name' => $product->name,
                'slug' => $product->slug,
                'featured_image' => $product->featured_image,
                'price' => (float) $product->price,
                'moq' => (float) $product->moq,
                'unit' => $product->unit,
                'supplier' => $product->supplier?->company_name,
            ] : null,
        ];
    }
}
