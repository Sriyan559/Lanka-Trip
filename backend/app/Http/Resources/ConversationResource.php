<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ConversationResource extends JsonResource
{
    public static $wrap = null;

    public function toArray(Request $request): array
    {
        $user = $request->user();
        $participant = $user?->role === 'supplier'
            ? $this->buyer
            : $this->supplier;

        return [
            'id' => $this->id,
            'buyer_id' => $this->buyer_id,
            'supplier_id' => $this->supplier_id,
            'rfq_id' => $this->rfq_id,
            'quotation_id' => $this->quotation_id,
            'last_message_at' => $this->last_message_at?->toISOString(),
            'buyer' => $this->whenLoaded(
                'buyer',
                fn () => UserResource::make($this->buyer)->resolve($request),
            ),
            'supplier' => $this->whenLoaded(
                'supplier',
                fn () => SupplierResource::make($this->supplier)->resolve($request),
            ),
            'participant' => $participant
                ? ($user?->role === 'supplier'
                    ? UserResource::make($participant)->resolve($request)
                    : SupplierResource::make($participant)->resolve($request))
                : null,
            'latest_message' => $this->whenLoaded(
                'latestMessage',
                fn () => $this->latestMessage
                    ? MessageResource::make($this->latestMessage)->resolve($request)
                    : null,
            ),
            'unread_count' => (int) ($this->unread_count ?? 0),
            'rfq' => $this->whenLoaded(
                'rfq',
                fn () => $this->rfq ? RFQResource::make($this->rfq)->resolve($request) : null,
            ),
            'quotation' => $this->whenLoaded(
                'quotation',
                fn () => $this->quotation
                    ? QuotationResource::make($this->quotation)->resolve($request)
                    : null,
            ),
            'created_at' => $this->created_at?->toISOString(),
            'updated_at' => $this->updated_at?->toISOString(),
        ];
    }
}
