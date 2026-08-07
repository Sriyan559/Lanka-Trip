<?php

namespace App\Http\Requests\Admin;

use Carbon\CarbonImmutable;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class MarketplaceCancellationsIndexRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->hasPermission('orders.view') ?? false;
    }

    public function rules(): array
    {
        return [
            'search' => ['nullable', 'string', 'max:120'], 'paymentStatus' => ['nullable', 'string', 'max:30'],
            'fulfilmentStatus' => ['nullable', 'string', 'max:30'], 'deliveryStatus' => ['nullable', 'string', 'max:30'],
            'refundStatus' => ['nullable', 'string', 'max:30'], 'sellerId' => ['nullable', 'integer', 'exists:suppliers,id'],
            'customerId' => ['nullable', 'integer', 'exists:users,id'], 'currency' => ['nullable', 'string', 'size:3', 'exists:currencies,code'],
            'dateFrom' => ['nullable', 'date'], 'dateTo' => ['nullable', 'date', 'after_or_equal:dateFrom'],
            'timezone' => ['nullable', 'timezone', Rule::in([config('app.timezone')])],
            'sortBy' => ['nullable', Rule::in(['orderReference', 'customer', 'seller', 'total', 'paymentStatus', 'refundAmount', 'recordedAt'])],
            'sortDirection' => ['nullable', Rule::in(['asc', 'desc'])], 'page' => ['nullable', 'integer', 'min:1'],
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
            'page' => (int) $this->input('page', 1), 'perPage' => (int) $this->input('perPage', 10),
            'sortBy' => $this->input('sortBy', 'recordedAt'), 'sortDirection' => $this->input('sortDirection', 'desc')];
    }
}
