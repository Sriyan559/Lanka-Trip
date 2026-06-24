<?php

namespace App\Http\Requests\RFQ;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateRFQRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->role === 'buyer';
    }

    public function rules(): array
    {
        return [
            'title' => ['sometimes', 'required', 'string', 'max:255'],
            'description' => ['sometimes', 'nullable', 'string'],
            'destination_country' => ['sometimes', 'required', 'string', 'max:100'],
            'expected_delivery_date' => ['sometimes', 'nullable', 'date'],
            'status' => ['sometimes', Rule::in(['open', 'closed', 'completed'])],
            'items' => ['sometimes', 'required', 'array', 'min:1'],
            'items.*.product_id' => ['nullable', 'integer', Rule::exists('products', 'id')],
            'items.*.product_name' => ['required', 'string', 'max:255'],
            'items.*.quantity' => ['required', 'numeric', 'gt:0'],
            'items.*.unit' => ['required', 'string', 'max:50'],
            'items.*.specifications' => ['nullable', 'string'],
        ];
    }
}
