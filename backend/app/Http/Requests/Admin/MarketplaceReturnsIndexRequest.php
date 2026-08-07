<?php

namespace App\Http\Requests\Admin;

use Carbon\CarbonImmutable;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class MarketplaceReturnsIndexRequest extends FormRequest
{
    public function authorize(): bool
    {
        $user = $this->user();
        if (!$user) {
            return false;
        }

        return $user->hasPermission('returns.view') || $user->hasPermission('orders.view');
    }

    public function rules(): array
    {
        return [
            'search' => ['nullable', 'string', 'max:120'],
            'returnStatus' => ['nullable', 'string', 'max:40'],
            'refundStatus' => ['nullable', 'string', 'max:40'],
            'inspectionStatus' => ['nullable', 'string', 'max:40'],
            'disputeStatus' => ['nullable', 'string', 'max:40'],
            'returnType' => ['nullable', 'string', 'max:60'],
            'reasonCategory' => ['nullable', 'string', 'max:80'],
            'supplier' => ['nullable', 'string', 'max:120'],
            'supplierId' => ['nullable', 'integer', 'exists:suppliers,id'],
            'sellerId' => ['nullable', 'integer', 'exists:suppliers,id'],
            'brand' => ['nullable', 'string', 'max:120'],
            'brandId' => ['nullable', 'integer', 'exists:brands,id'],
            'productCategory' => ['nullable', 'string', 'max:120'],
            'logisticsPartner' => ['nullable', 'string', 'max:120'],
            'riskLevel' => ['nullable', 'string', 'max:30'],
            'assignedOfficer' => ['nullable', 'string', 'max:120'],
            'quickFilter' => ['nullable', 'string', 'max:60'],
            'orderId' => ['nullable', 'string', 'max:60'],
            'openedDate' => ['nullable', 'string', 'max:40'],
            'dueDate' => ['nullable', 'string', 'max:40'],
            'currency' => ['nullable', 'string', 'size:3', 'exists:currencies,code'],
            'dateFrom' => ['nullable', 'date'],
            'dateTo' => ['nullable', 'date', 'after_or_equal:dateFrom'],
            'timezone' => ['nullable', 'timezone', Rule::in([config('app.timezone')])],
            'sort' => ['nullable', Rule::in(['returnReference', 'dbReturnId', 'orderReference', 'customer', 'supplier', 'returnType', 'eligibilityStatus', 'refundStatus', 'openedDate', 'riskLevel', 'slaStatus'])],
            'sortBy' => ['nullable', Rule::in(['returnReference', 'dbReturnId', 'orderReference', 'customer', 'supplier', 'returnType', 'eligibilityStatus', 'refundStatus', 'openedDate', 'riskLevel', 'slaStatus'])],
            'direction' => ['nullable', Rule::in(['asc', 'desc'])],
            'sortDirection' => ['nullable', Rule::in(['asc', 'desc'])],
            'page' => ['nullable', 'integer', 'min:1'],
            'perPage' => ['nullable', 'integer', Rule::in([10, 25, 50, 100])],
            'pageSize' => ['nullable', 'integer', Rule::in([10, 25, 50, 100])],
        ];
    }

    public function filters(): array
    {
        $validated = $this->validated();
        $timezone = $validated['timezone'] ?? config('app.timezone');
        $to = CarbonImmutable::parse($validated['dateTo'] ?? today($timezone), $timezone)->endOfDay();
        $from = CarbonImmutable::parse($validated['dateFrom'] ?? $to->subDays(89), $timezone)->startOfDay();
        abort_if($from->diffInDays($to) > 366, 422, 'The reporting range may not exceed 366 days.');

        $page = (int) ($this->input('page') ?? 1);
        $perPage = (int) ($this->input('perPage') ?? $this->input('pageSize') ?? 10);
        $sortBy = $this->input('sort') ?? $this->input('sortBy') ?? 'openedDate';
        $sortDirection = strtolower($this->input('direction') ?? $this->input('sortDirection') ?? 'desc');

        return [
            ...$validated,
            'from' => $from,
            'to' => $to,
            'timezone' => $timezone,
            'page' => max(1, $page),
            'perPage' => in_array($perPage, [10, 25, 50, 100], true) ? $perPage : 10,
            'sortBy' => $sortBy,
            'sortDirection' => in_array($sortDirection, ['asc', 'desc'], true) ? $sortDirection : 'desc',
        ];
    }
}
