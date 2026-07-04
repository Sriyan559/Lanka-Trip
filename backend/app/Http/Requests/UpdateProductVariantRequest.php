<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProductVariantRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->role === 'supplier'
            && $this->user()->supplier !== null;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        $variantId = $this->routeModelId('variant') ?? $this->routeModelId('productVariant');

        return [
            'product_id' => ['prohibited'],
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'variant_name' => ['sometimes', 'nullable', 'string', 'max:255'],
            'slug' => ['sometimes', 'nullable', 'string', 'max:255', 'alpha_dash'],
            'description' => ['sometimes', 'nullable', 'string'],
            'sku' => ['sometimes', 'nullable', 'string', 'max:255', Rule::unique('product_variants', 'sku')->ignore($variantId)],
            'barcode' => ['sometimes', 'nullable', 'string', 'max:255'],
            'shade_name' => ['sometimes', 'nullable', 'string', 'max:255'],
            'shade_code' => ['sometimes', 'nullable', 'string', 'max:255'],
            'size_label' => ['sometimes', 'nullable', 'string', 'max:255'],
            'volume_ml' => ['sometimes', 'nullable', 'numeric', 'min:0'],
            'weight_g' => ['sometimes', 'nullable', 'numeric', 'min:0'],
            'retail_price' => ['sometimes', 'nullable', 'numeric', 'min:0'],
            'sale_price' => ['sometimes', 'nullable', 'numeric', 'min:0', Rule::when($this->filled('retail_price'), ['lte:retail_price'])],
            'price' => ['sometimes', 'nullable', 'numeric', 'min:0'],
            'fob_price_min' => ['sometimes', 'nullable', 'numeric', 'min:0'],
            'fob_price_max' => ['sometimes', 'nullable', 'numeric', 'min:0'],
            'moq' => ['sometimes', 'nullable', 'numeric', 'min:0'],
            'moq_unit' => ['sometimes', 'nullable', 'string', 'max:50'],
            'stock_quantity' => ['sometimes', 'integer', 'min:0'],
            'low_stock_threshold' => ['sometimes', 'nullable', 'integer', 'min:0'],
            'lead_time_days' => ['sometimes', 'nullable', 'integer', 'min:0'],
            'is_active' => ['sometimes', 'boolean'],
            'is_default' => ['sometimes', 'boolean'],
            'status' => ['sometimes', Rule::in(['draft', 'active', 'inactive'])],
            'metadata' => ['sometimes', 'nullable', 'array'],
            'uuid' => ['prohibited'],
            'currency_id' => ['prohibited'],
        ];
    }

    private function routeModelId(string $key): ?int
    {
        $value = $this->route($key);

        if (is_object($value) && isset($value->id)) {
            return (int) $value->id;
        }

        return is_numeric($value) ? (int) $value : null;
    }
}
