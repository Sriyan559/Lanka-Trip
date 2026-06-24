<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RFQResource extends JsonResource
{
    public static $wrap = null;

    public function toArray(Request $request): array
    {
        $firstItem = $this->relationLoaded('items') ? $this->items->first() : null;

        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'rfq_number' => $this->rfq_number,
            'title' => $this->title,
            'description' => $this->description,
            'destination_country' => $this->destination_country,
            'expected_delivery_date' => $this->expected_delivery_date?->toDateString(),
            'status' => $this->status,
            'items' => $this->whenLoaded('items', fn () => $this->items->map(fn ($item) => [
                'id' => $item->id,
                'product_id' => $item->product_id,
                'product_name' => $item->product_name,
                'quantity' => (float) $item->quantity,
                'unit' => $item->unit,
                'specifications' => $item->specifications,
            ])->values()->all()),
            'quotations_count' => (int) ($this->quotations_count ?? 0),
            'created_at' => $this->created_at?->toISOString(),
            'updated_at' => $this->updated_at?->toISOString(),

            // Dashboard compatibility aliases.
            'product_name' => $firstItem?->product_name,
            'quantity' => $firstItem ? (float) $firstItem->quantity : null,
            'unit' => $firstItem?->unit,
            'responses_count' => (int) ($this->quotations_count ?? 0),
        ];
    }
}
