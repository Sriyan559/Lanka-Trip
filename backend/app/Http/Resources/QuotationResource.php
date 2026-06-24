<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class QuotationResource extends JsonResource
{
    public static $wrap = null;

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'rfq_id' => $this->rfq_id,
            'supplier_id' => $this->supplier_id,
            'quotation_number' => $this->quotation_number,
            'total_amount' => (float) $this->total_amount,
            'currency' => $this->currency,
            'lead_time' => $this->lead_time,
            'payment_terms' => $this->payment_terms,
            'shipping_terms' => $this->shipping_terms,
            'remarks' => $this->remarks,
            'status' => $this->status,
            'order_id' => $this->whenLoaded('order', fn () => $this->order?->id),
            'items' => $this->whenLoaded('items', fn () => $this->items->map(fn ($item) => [
                'id' => $item->id,
                'rfq_item_id' => $item->rfq_item_id,
                'product_name' => $item->product_name,
                'quantity' => (float) $item->quantity,
                'unit_price' => (float) $item->unit_price,
                'amount' => (float) $item->amount,
            ])->values()->all()),
            'rfq' => $this->whenLoaded(
                'rfq',
                fn () => RFQResource::make($this->rfq)->resolve($request),
            ),
            'supplier' => $this->whenLoaded(
                'supplier',
                fn () => SupplierResource::make($this->supplier)->resolve($request),
            ),
            'created_at' => $this->created_at?->toISOString(),
            'updated_at' => $this->updated_at?->toISOString(),
        ];
    }
}
