<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DashboardResource extends JsonResource
{
    public static $wrap = null;

    public function toArray(Request $request): array
    {
        return [
            'total_users' => (int) $this->resource['total_users'],
            'total_buyers' => (int) $this->resource['total_buyers'],
            'total_suppliers' => (int) $this->resource['total_suppliers'],
            'total_products' => (int) $this->resource['total_products'],
            'total_rfqs' => (int) $this->resource['total_rfqs'],
            'total_quotations' => (int) $this->resource['total_quotations'],
            'total_orders' => (int) $this->resource['total_orders'],
            'completed_orders' => (int) $this->resource['completed_orders'],
            'cancelled_orders' => (int) $this->resource['cancelled_orders'],
            'total_messages' => (int) $this->resource['total_messages'],
            'total_reviews' => (int) $this->resource['total_reviews'],
            'total_notifications' => (int) $this->resource['total_notifications'],
        ];
    }
}
