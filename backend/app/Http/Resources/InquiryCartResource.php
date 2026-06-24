<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InquiryCartResource extends JsonResource
{
    public static $wrap = null;

    public function toArray(Request $request): array
    {
        return [
            'items' => $this->items->map(function ($item): array {
                $product = $item->product;
                $supplier = $product?->supplier;

                return [
                    'id' => $item->id,
                    'quantity' => $item->quantity,
                    'note' => $item->note,
                    'product' => [
                        'id' => $product->id,
                        'name' => $product->name,
                        'featured_image' => $product->featured_image,
                        'price' => (float) $product->price,
                        'moq' => (float) $product->moq,
                        'unit' => $product->unit,
                        'supplier' => $supplier?->company_name,
                    ],

                    // Frontend compatibility aliases.
                    'product_id' => $product->id,
                    'name' => $product->name,
                    'image' => $product->featured_image,
                    'price' => (float) $product->price,
                    'moq' => (float) $product->moq,
                    'unit' => $product->unit,
                    'moqUnit' => $product->unit,
                    'supplier' => $supplier?->company_name,
                ];
            })->values()->all(),
            'items_count' => $this->items->sum('quantity'),
        ];
    }
}
