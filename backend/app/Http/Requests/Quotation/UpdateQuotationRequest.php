<?php

namespace App\Http\Requests\Quotation;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateQuotationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->role === 'supplier';
    }

    public function rules(): array
    {
        return [
            'currency' => ['sometimes', 'required', 'string', 'size:3'],
            'lead_time' => ['sometimes', 'nullable', 'string', 'max:255'],
            'payment_terms' => ['sometimes', 'nullable', 'string', 'max:255'],
            'shipping_terms' => ['sometimes', 'nullable', 'string', 'max:255'],
            'remarks' => ['sometimes', 'nullable', 'string'],
            'items' => ['sometimes', 'required', 'array', 'min:1'],
            'items.*.rfq_item_id' => ['nullable', 'integer', Rule::exists('rfq_items', 'id')],
            'items.*.product_name' => ['required', 'string', 'max:255'],
            'items.*.quantity' => ['required', 'numeric', 'gt:0'],
            'items.*.unit_price' => ['required', 'numeric', 'gte:0'],
        ];
    }

    protected function prepareForValidation(): void
    {
        if (is_string($this->currency)) {
            $this->merge(['currency' => mb_strtoupper(trim($this->currency))]);
        }
    }
}
