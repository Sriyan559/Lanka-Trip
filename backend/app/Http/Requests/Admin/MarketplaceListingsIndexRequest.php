<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class MarketplaceListingsIndexRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->hasPermission('products.view') ?? false;
    }

    public function rules(): array
    {
        return ['search' => ['nullable', 'string', 'max:120'], 'status' => ['nullable', Rule::in(['all', 'live', 'pending-review', 'draft', 'rejected', 'suspended', 'out-of-stock', 'low-stock', 'high-risk'])], 'sellerId' => ['nullable', 'integer', 'exists:suppliers,id'], 'categoryId' => ['nullable', 'integer', 'exists:categories,id'], 'currency' => ['nullable', 'string', 'size:3', 'exists:currencies,code'], 'sortBy' => ['nullable', Rule::in(['listingCode', 'name', 'price', 'stock', 'updatedAt'])], 'sortDirection' => ['nullable', Rule::in(['asc', 'desc'])], 'page' => ['nullable', 'integer', 'min:1'], 'perPage' => ['nullable', 'integer', Rule::in([10, 25, 50, 100])]];
    }

    public function filters(): array
    {
        return [...$this->validated(), 'page' => (int) $this->input('page', 1), 'perPage' => (int) $this->input('perPage', 25), 'sortDirection' => $this->input('sortDirection', 'desc')];
    }
}
