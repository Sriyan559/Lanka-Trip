<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RevenueResource extends JsonResource
{
    public static $wrap = null;

    public function toArray(Request $request): array
    {
        return [
            'daily_revenue' => (float) $this->resource['daily_revenue'],
            'monthly_revenue' => (float) $this->resource['monthly_revenue'],
            'yearly_revenue' => (float) $this->resource['yearly_revenue'],
            'currency_breakdown' => $this->resource['currency_breakdown'],
        ];
    }
}
