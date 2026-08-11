<?php

namespace App\Http\Requests\Admin;

use Carbon\CarbonImmutable;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class FinanceCommandCenterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->hasPermission('admin.dashboard.view') ?? false;
    }

    public function rules(): array
    {
        return [
            'dateFrom' => ['nullable', 'date'],
            'dateTo' => ['nullable', 'date', 'after_or_equal:dateFrom'],
            'currency' => ['nullable', 'string', 'size:3', 'exists:currencies,code'],
            'search' => ['nullable', 'string', 'max:120'],
            'domain' => ['nullable', Rule::in(['payment', 'refund', 'invoice', 'settlement', 'payout'])],
            'status' => ['nullable', 'string', 'max:40'],
            'paymentStatus' => ['nullable', 'string', 'max:40'],
            'settlementStatus' => ['nullable', 'string', 'max:40'],
            'sort' => ['nullable', Rule::in(['reference', 'domain', 'grossAmount', 'netAmount', 'status', 'transactionDate', 'updatedAt'])],
            'direction' => ['nullable', Rule::in(['asc', 'desc'])],
            'page' => ['nullable', 'integer', 'min:1'],
            'perPage' => ['nullable', 'integer', Rule::in([10, 25, 50, 100])],
        ];
    }

    public function filters(): array
    {
        $validated = $this->validated();
        $timezone = config('app.timezone');
        $to = CarbonImmutable::parse($validated['dateTo'] ?? today($timezone), $timezone)->endOfDay();
        $from = CarbonImmutable::parse($validated['dateFrom'] ?? $to->subDays(29), $timezone)->startOfDay();
        abort_if($from->diffInDays($to) > 366, 422, 'The reporting range may not exceed 366 days.');

        return [...$validated, 'from' => $from, 'to' => $to, 'timezone' => $timezone,
            'page' => (int) $this->input('page', 1), 'perPage' => (int) $this->input('perPage', 25),
            'sort' => $validated['sort'] ?? 'transactionDate', 'direction' => $validated['direction'] ?? 'desc'];
    }
}
