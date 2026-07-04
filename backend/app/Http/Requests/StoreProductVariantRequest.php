<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreProductVariantRequest extends FormRequest
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
        return [
            'product_id' => ['prohibited'],
            'name' => ['required', 'string', 'max:255'],
            'variant_name' => ['nullable', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', 'alpha_dash'],
            'description' => ['nullable', 'string'],
            'sku' => ['nullable', 'string', 'max:255', Rule::unique('product_variants', 'sku')],
            'barcode' => ['nullable', 'string', 'max:255'],
            'shade_name' => ['nullable', 'string', 'max:255'],
            'shade_code' => ['nullable', 'string', 'max:255'],
            'size_label' => ['nullable', 'string', 'max:255'],
            'volume_ml' => ['nullable', 'numeric', 'min:0'],
            'weight_g' => ['nullable', 'numeric', 'min:0'],
            'retail_price' => ['nullable', 'numeric', 'min:0'],
            'sale_price' => ['nullable', 'numeric', 'min:0', Rule::when($this->filled('retail_price'), ['lte:retail_price'])],
            'price' => ['nullable', 'numeric', 'min:0'],
            'fob_price_min' => ['nullable', 'numeric', 'min:0'],
            'fob_price_max' => ['nullable', 'numeric', 'min:0'],
            'moq' => ['nullable', 'numeric', 'min:0'],
            'moq_unit' => ['nullable', 'string', 'max:50'],
            'stock_quantity' => ['sometimes', 'integer', 'min:0'],
            'low_stock_threshold' => ['nullable', 'integer', 'min:0'],
            'lead_time_days' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['sometimes', 'boolean'],
            'is_default' => ['sometimes', 'boolean'],
            'status' => ['sometimes', Rule::in(['draft', 'active', 'inactive'])],
            'metadata' => ['nullable', 'array'],
            'uuid' => ['prohibited'],
            'currency_id' => ['prohibited'],
        ];
    }
}
