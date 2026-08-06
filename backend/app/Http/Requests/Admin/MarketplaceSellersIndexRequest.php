<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class MarketplaceSellersIndexRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->hasPermission('suppliers.view') ?? false;
    }

    public function rules(): array
    {
        return [
            'search' => ['nullable', 'string', 'max:120'],
            'sellerId' => ['nullable', 'integer', 'exists:suppliers,id'],
            'status' => ['nullable', Rule::in(['all', 'active', 'under-review', 'inactive', 'suspended', 'high-risk', 'new'])],
            'riskLevel' => ['nullable', Rule::in(['low', 'medium', 'high', 'critical'])],
            'verificationStatus' => ['nullable', Rule::in(['pending', 'verified', 'rejected'])],
            'currency' => ['nullable', 'string', 'size:3', 'alpha'],
            'dateFrom' => ['nullable', 'date'],
            'dateTo' => ['nullable', 'date', 'after_or_equal:dateFrom'],
            'sortBy' => ['nullable', Rule::in(['name', 'orders', 'gmv', 'rating', 'risk', 'updatedAt'])],
            'sortDirection' => ['nullable', Rule::in(['asc', 'desc'])],
            'page' => ['nullable', 'integer', 'min:1'],
            'perPage' => ['nullable', 'integer', Rule::in([10, 25, 50, 100])],
        ];
    }

    public function filters(): array
    {
        return [...$this->validated(),
            'currency' => $this->filled('currency') ? strtoupper($this->string('currency')->toString()) : null,
            'page' => (int) $this->input('page', 1),
            'perPage' => (int) $this->input('perPage', 25),
            'sortBy' => $this->input('sortBy', 'updatedAt'),
            'sortDirection' => $this->input('sortDirection', 'desc'),
        ];
    }
}
