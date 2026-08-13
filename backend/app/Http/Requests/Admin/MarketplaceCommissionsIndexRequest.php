<?php

namespace App\Http\Requests\Admin;

use Carbon\CarbonImmutable;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class MarketplaceCommissionsIndexRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->hasPermission('admin.dashboard.view') ?? false;
    }

    public function rules(): array
    {
        return [
            'search' => ['nullable', 'string', 'max:120'], 'currency' => ['nullable', 'string', 'size:3', 'exists:currencies,code'],
            'dateFrom' => ['nullable', 'date'], 'dateTo' => ['nullable', 'date', 'after_or_equal:dateFrom'],
            'timezone' => ['nullable', 'timezone', Rule::in([config('app.timezone')])],
            'page' => ['nullable', 'integer', 'min:1'], 'perPage' => ['nullable', 'integer', Rule::in([10, 25, 50, 100])],
            'status' => ['nullable', 'string', 'max:30'], 'sort' => ['nullable', Rule::in(['reference','supplier','gross','commission','net','status','period'])],
            'direction' => ['nullable', Rule::in(['asc','desc'])],
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
            'search' => trim((string)$this->input('search','')), 'status'=>$this->input('status'), 'sort'=>$this->input('sort','period'), 'direction'=>$this->input('direction','desc')];
    }
}
