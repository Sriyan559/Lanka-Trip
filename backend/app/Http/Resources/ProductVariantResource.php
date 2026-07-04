<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductVariantResource extends JsonResource
{
    public static $wrap = null;

    public function toArray(Request $request): array
    {
        $user = $request->user();
        $isAdmin = $user?->role === 'admin';
        $isSupplier = $user?->role === 'supplier';
        $isInternal = $isAdmin || $isSupplier;
        $retailEnabled = $this->isFeatureFlagEnabled('sl_beauty.b2c_retail');

        return [
            'id' => $this->id,
            'uuid' => $this->when($isAdmin, $this->uuid),
            'product_id' => $this->product_id,
            'name' => $this->name,
            'variant_name' => $this->variant_name,
            'slug' => $this->slug,
            'description' => $this->description,
            'shade_name' => $this->shade_name,
            'shade_code' => $this->shade_code,
            'size_label' => $this->size_label,
            'volume_ml' => $this->decimalValue($this->volume_ml),
            'weight_g' => $this->decimalValue($this->weight_g),
            'is_active' => (bool) $this->is_active,
            'status' => $this->when($isInternal, $this->status),
            'retail_price' => $this->when($isInternal || $retailEnabled, $this->decimalValue($this->retail_price)),
            'sale_price' => $this->when($isInternal || $retailEnabled, $this->decimalValue($this->sale_price)),
            'stock_status' => $this->stockStatus(),
            'sku' => $this->when($isInternal, $this->sku),
            'barcode' => $this->when($isInternal, $this->barcode),
            'price' => $this->when($isInternal, $this->decimalValue($this->price)),
            'fob_price_min' => $this->when($isInternal, $this->decimalValue($this->fob_price_min)),
            'fob_price_max' => $this->when($isInternal, $this->decimalValue($this->fob_price_max)),
            'moq' => $this->when($isInternal, $this->decimalValue($this->moq)),
            'moq_unit' => $this->when($isInternal, $this->moq_unit),
            'stock_quantity' => $this->when($isInternal, $this->stock_quantity),
            'low_stock_threshold' => $this->when($isInternal, $this->low_stock_threshold),
            'lead_time_days' => $this->when($isInternal, $this->lead_time_days),
            'is_default' => $this->when($isInternal, (bool) $this->is_default),
            'metadata' => $this->when($isInternal, $this->metadata ?? []),
            'created_at' => $this->when($isInternal, $this->created_at?->toISOString()),
            'updated_at' => $this->when($isInternal, $this->updated_at?->toISOString()),
            'deleted_at' => $this->when($isAdmin, $this->deleted_at?->toISOString()),
            'product' => $this->whenLoaded(
                'product',
                fn () => ProductResource::make($this->product)->resolve($request),
            ),
        ];
    }

    private function decimalValue(mixed $value): ?float
    {
        return $value !== null ? (float) $value : null;
    }

    private function stockStatus(): ?string
    {
        if ($this->stock_quantity === null) {
            return null;
        }

        if ((int) $this->stock_quantity <= 0) {
            return 'out_of_stock';
        }

        if ($this->low_stock_threshold !== null && (int) $this->stock_quantity <= (int) $this->low_stock_threshold) {
            return 'low_stock';
        }

        return 'in_stock';
    }

    private function isFeatureFlagEnabled(string $featureKey): bool
    {
        return config("features.{$featureKey}", false) === true;
    }
}
