<?php

namespace App\Http\Requests\Product;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateSupplierProductRequest extends FormRequest
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
            'category_id' => [
                'sometimes',
                'required',
                'integer',
                Rule::exists('categories', 'id')->where('status', 'active'),
            ],
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'short_description' => ['sometimes', 'nullable', 'string'],
            'description' => ['sometimes', 'nullable', 'string'],
            'price' => ['sometimes', 'required', 'numeric', 'min:0'],
            'moq' => ['sometimes', 'required', 'numeric', 'gt:0'],
            'unit' => ['sometimes', 'required', 'string', 'max:50'],
            'supply_ability' => ['sometimes', 'nullable', 'string', 'max:255'],
            'lead_time' => ['sometimes', 'nullable', 'string', 'max:255'],
            'port' => ['sometimes', 'nullable', 'string', 'max:255'],
            'packaging_details' => ['sometimes', 'nullable', 'string'],
            'featured_image' => ['sometimes', 'nullable', 'string', 'max:2048'],
            'status' => ['sometimes', Rule::in(['active', 'inactive'])],
            'supplier_id' => ['prohibited'],
            'slug' => ['prohibited'],
            'is_featured' => ['prohibited'],
            'views_count' => ['prohibited'],
            'average_rating' => ['prohibited'],
            'reviews_count' => ['prohibited'],
        ];
    }
}
