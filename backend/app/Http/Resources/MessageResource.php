<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MessageResource extends JsonResource
{
    public static $wrap = null;

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'conversation_id' => $this->conversation_id,
            'sender_id' => $this->sender_id,
            'receiver_id' => $this->receiver_id,
            'message' => $this->message,
            'is_read' => (bool) $this->is_read,
            'sender' => $this->whenLoaded(
                'sender',
                fn () => UserResource::make($this->sender)->resolve($request),
            ),
            'receiver' => $this->whenLoaded(
                'receiver',
                fn () => UserResource::make($this->receiver)->resolve($request),
            ),
            'created_at' => $this->created_at?->toISOString(),
            'updated_at' => $this->updated_at?->toISOString(),
        ];
    }
}
