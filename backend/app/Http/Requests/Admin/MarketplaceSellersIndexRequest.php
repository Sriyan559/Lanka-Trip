<?php

namespace App\Http\Requests\Admin;

use Carbon\CarbonImmutable;
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
            'status' => ['nullable', Rule::in(['all', 'active', 'under-review', 'suspended', 'high-risk', 'new'])],
            'riskLevel' => ['nullable', Rule::in(['low', 'medium', 'high', 'critical'])],
            'verificationStatus' => ['nullable', 'string', 'max:30'],
            'businessType' => ['nullable', 'string', 'max:80'],
            'country' => ['nullable', 'string', 'max:80'],
            'currency' => ['nullable', 'string', 'size:3', Rule::exists('currencies', 'code')->where('status', 'active')],
            'dateFrom' => ['nullable', 'date'],
            'dateTo' => ['nullable', 'date', 'after_or_equal:dateFrom'],
            'timezone' => ['nullable', 'timezone', Rule::in([config('app.timezone')])],
            'sortBy' => ['nullable', Rule::in(['sellerId', 'name', 'status', 'risk', 'orders', 'gmv', 'rating', 'updatedAt'])],
            'sortDirection' => ['nullable', Rule::in(['asc', 'desc'])],
            'page' => ['nullable', 'integer', 'min:1'],
            'perPage' => ['nullable', 'integer', Rule::in([10, 25, 50, 100])],
        ];
    }

    public function filters(): array
    {
        $validated = $this->validated();
        $timezone = $validated['timezone'] ?? config('app.timezone');
        $to = CarbonImmutable::parse($validated['dateTo'] ?? today($timezone), $timezone)->endOfDay();
        $from = CarbonImmutable::parse($validated['dateFrom'] ?? $to->subDays(29), $timezone)->startOfDay();
        abort_if($from->diffInDays($to) > 366, 422, 'The reporting range may not exceed 366 days.');

        return [...$validated, 'from' => $from, 'to' => $to, 'timezone' => $timezone,
            'page' => (int) $this->input('page', 1), 'perPage' => (int) $this->input('perPage', 25),
            'sortDirection' => $this->input('sortDirection', 'desc')];
    }
}
