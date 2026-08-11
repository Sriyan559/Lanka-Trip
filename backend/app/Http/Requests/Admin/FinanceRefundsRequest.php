<?php

namespace App\Http\Requests\Admin;

use Carbon\CarbonImmutable;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class FinanceRefundsRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->hasPermission('admin.dashboard.view') ?? false;
    }

    public function rules(): array
    {
        return [
            'dateFrom'              => ['nullable', 'date'],
            'dateTo'                => ['nullable', 'date', 'after_or_equal:dateFrom'],
            'currency'              => ['nullable', 'string', 'max:3'],
            'search'                => ['nullable', 'string', 'max:200'],
            'status'                => ['nullable', 'string', 'max:60'],
            'eligibility'           => ['nullable', 'string', 'max:60'],
            'processing'            => ['nullable', 'string', 'max:60'],
            'refundType'            => ['nullable', 'string', 'max:60'],
            'paymentMethod'         => ['nullable', 'string', 'max:60'],
            'gateway'               => ['nullable', 'string', 'max:60'],
            'compensationType'      => ['nullable', 'string', 'max:60'],
            'reconciliationStatus'  => ['nullable', 'string', 'max:60'],
            'customerId'            => ['nullable', 'integer'],
            'orderId'               => ['nullable', 'string', 'max:60'],
            'sort'                  => ['nullable', Rule::in(['id', 'refundAmount', 'compensationAmount', 'dateRequested', 'eligibility', 'approval', 'processing'])],
            'direction'             => ['nullable', Rule::in(['asc', 'desc'])],
            'page'                  => ['nullable', 'integer', 'min:1'],
            'perPage'               => ['nullable', 'integer', Rule::in([10, 15, 25, 50, 100])],
        ];
    }

    public function filters(): array
    {
        $validated = $this->validated();
        $timezone  = config('app.timezone');
        $to   = CarbonImmutable::parse($validated['dateTo']   ?? today($timezone), $timezone)->endOfDay();
        $from = CarbonImmutable::parse($validated['dateFrom'] ?? $to->subDays(29), $timezone)->startOfDay();
        abort_if($from->diffInDays($to) > 366, 422, 'The reporting range may not exceed 366 days.');

        return [
            ...$validated,
            'from'      => $from,
            'to'        => $to,
            'timezone'  => $timezone,
            'currency'  => $validated['currency'] ?? 'LKR',
            'page'      => (int) $this->input('page', 1),
            'perPage'   => (int) $this->input('perPage', 15),
            'sort'      => $validated['sort'] ?? 'dateRequested',
            'direction' => $validated['direction'] ?? 'desc',
        ];
    }
}
