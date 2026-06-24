<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    public static $wrap = null;

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'order_number' => $this->order_number,
            'buyer_id' => $this->buyer_id,
            'supplier_id' => $this->supplier_id,
            'quotation_id' => $this->quotation_id,
            'rfq_id' => $this->rfq_id,
            'total_amount' => (float) $this->total_amount,
            'currency' => $this->currency,
            'payment_terms' => $this->payment_terms,
            'shipping_terms' => $this->shipping_terms,
            'status' => $this->status,
            'buyer' => $this->whenLoaded(
                'buyer',
                fn () => UserResource::make($this->buyer)->resolve($request),
            ),
            'supplier' => $this->whenLoaded(
                'supplier',
                fn () => SupplierResource::make($this->supplier)->resolve($request),
            ),
            'rfq' => $this->whenLoaded(
                'rfq',
                fn () => RFQResource::make($this->rfq)->resolve($request),
            ),
            'quotation' => $this->whenLoaded(
                'quotation',
                fn () => QuotationResource::make($this->quotation)->resolve($request),
            ),
            'items' => $this->whenLoaded('items', fn () => $this->items->map(fn ($item) => [
                'id' => $item->id,
                'product_name' => $item->product_name,
                'quantity' => (float) $item->quantity,
                'unit_price' => (float) $item->unit_price,
                'amount' => (float) $item->amount,
            ])->values()->all()),
            'created_at' => $this->created_at?->toISOString(),
            'updated_at' => $this->updated_at?->toISOString(),
        ];
    }
}
