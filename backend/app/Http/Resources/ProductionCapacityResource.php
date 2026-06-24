<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductionCapacityResource extends JsonResource
{
    public static $wrap = null;

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'supplier_id' => $this->supplier_id,
            'monthly_output' => $this->monthly_output,
            'output_unit' => $this->output_unit,
            'production_lines' => $this->production_lines,
            'lead_time' => $this->lead_time,
            'factory_size' => $this->factory_size,
            'created_at' => $this->created_at?->toISOString(),
            'updated_at' => $this->updated_at?->toISOString(),
        ];
    }
}
