<?php

namespace App\Http\Requests\Admin;

use Carbon\CarbonImmutable;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class MarketplacePolicyViolationsIndexRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->hasPermission('admin.dashboard.view') ?? false;
    }

    public function rules(): array
    {
        return ['search' => ['nullable', 'string', 'max:120'], 'caseStatus' => ['nullable', 'string', 'max:30'], 'complianceStatus' => ['nullable', 'string', 'max:30'], 'category' => ['nullable', 'string', 'max:100'], 'severity' => ['nullable', 'string', 'max:30'], 'sourceType' => ['nullable', 'string', 'max:120'], 'assignedReviewerId' => ['nullable', 'integer', 'exists:users,id'], 'dateFrom' => ['nullable', 'date'], 'dateTo' => ['nullable', 'date', 'after_or_equal:dateFrom'], 'timezone' => ['nullable', 'timezone', Rule::in([config('app.timezone')])], 'sortBy' => ['nullable', Rule::in(['caseCode', 'category', 'status', 'severity', 'createdAt', 'updatedAt'])], 'sortDirection' => ['nullable', Rule::in(['asc', 'desc'])], 'page' => ['nullable', 'integer', 'min:1'], 'perPage' => ['nullable', 'integer', Rule::in([10, 25, 50, 100])]];
    }

    public function filters(): array
    {
        $v = $this->validated();
        $tz = $v['timezone'] ?? config('app.timezone');
        $to = CarbonImmutable::parse($v['dateTo'] ?? today($tz), $tz)->endOfDay();
        $from = CarbonImmutable::parse($v['dateFrom'] ?? $to->subDays(29), $tz)->startOfDay();
        abort_if($from->diffInDays($to) > 366, 422, 'The reporting range may not exceed 366 days.');

        return [...$v, 'from' => $from, 'to' => $to, 'timezone' => $tz, 'page' => (int) $this->input('page', 1), 'perPage' => (int) $this->input('perPage', 25), 'sortDirection' => $this->input('sortDirection', 'desc')];
    }
}
