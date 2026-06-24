<?php

namespace App\Http\Requests\Product;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreSupplierProductRequest extends FormRequest
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
                'required',
                'integer',
                Rule::exists('categories', 'id')->where('status', 'active'),
            ],
            'name' => ['required', 'string', 'max:255'],
            'short_description' => ['nullable', 'string'],
            'description' => ['nullable', 'string'],
            'price' => ['required', 'numeric', 'min:0'],
            'moq' => ['sometimes', 'numeric', 'gt:0'],
            'unit' => ['required', 'string', 'max:50'],
            'supply_ability' => ['nullable', 'string', 'max:255'],
            'lead_time' => ['nullable', 'string', 'max:255'],
            'port' => ['nullable', 'string', 'max:255'],
            'packaging_details' => ['nullable', 'string'],
            'featured_image' => ['nullable', 'string', 'max:2048'],
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
