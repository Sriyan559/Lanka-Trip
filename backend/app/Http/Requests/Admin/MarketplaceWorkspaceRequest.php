<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class MarketplaceWorkspaceRequest extends FormRequest
{
    public const WORKSPACES = ['orders', 'manual-orders', 'cancellations', 'returns', 'promotions', 'policy-violations', 'commissions', 'settings', 'channels'];

    public function authorize(): bool
    {
        $permission = match ($this->route('workspace')) {
            'orders', 'manual-orders', 'cancellations' => 'orders.view',
            'returns' => 'returns.view',
            'commissions' => 'payouts.view',
            default => 'admin.dashboard.view',
        };
        return $this->user()?->hasPermission($permission) ?? false;
    }

    public function rules(): array
    {
        return [
            'search' => ['nullable', 'string', 'max:120'],
            'status' => ['nullable', 'string', 'max:40'],
            'supplierId' => ['nullable', 'integer', 'exists:suppliers,id'],
            'currency' => ['nullable', 'string', 'size:3', 'alpha'],
            'dateFrom' => ['nullable', 'date'],
            'dateTo' => ['nullable', 'date', 'after_or_equal:dateFrom'],
            'sortBy' => ['nullable', Rule::in(['reference', 'name', 'status', 'amount', 'createdAt', 'updatedAt'])],
            'sortDirection' => ['nullable', Rule::in(['asc', 'desc'])],
            'page' => ['nullable', 'integer', 'min:1'],
            'perPage' => ['nullable', 'integer', Rule::in([10, 25, 50, 100])],
        ];
    }

    public function filters(): array
    {
        return [...$this->validated(), 'currency' => $this->filled('currency') ? strtoupper($this->string('currency')->toString()) : null, 'sortBy' => $this->input('sortBy', 'updatedAt'), 'sortDirection' => $this->input('sortDirection', 'desc'), 'page' => (int) $this->input('page', 1), 'perPage' => (int) $this->input('perPage', 25)];
    }
}
