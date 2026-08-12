<?php

namespace App\Http\Requests\Admin;

use Carbon\CarbonImmutable;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SupplierPayablesRequest extends FormRequest
{
    public function authorize(): bool
    {
        return (bool) $this->user()?->isAdministrator();
    }

    public function rules(): array
    {
        return [
            'dateFrom' => ['nullable', 'date'], 'dateTo' => ['nullable', 'date', 'after_or_equal:dateFrom'],
            'currency' => ['nullable', 'string', 'size:3'], 'search' => ['nullable', 'string', 'max:120'],
            'status' => ['nullable', 'string', Rule::in(['draft','pending','approved','processing','paid','failed','cancelled','reversed'])],
            'supplierId' => ['nullable', 'integer', 'min:1'], 'page' => ['nullable', 'integer', 'min:1'],
            'perPage' => ['nullable', 'integer', Rule::in([10,25,50,100])],
            'sort' => ['nullable', Rule::in(['reference','supplier','grossAmount','netAmount','status','dueDate','updatedAt'])],
            'direction' => ['nullable', Rule::in(['asc','desc'])],
        ];
    }

    public function filters(): array
    {
        $v = $this->validated();
        return [
            'from' => CarbonImmutable::parse($v['dateFrom'] ?? now()->subDays(29))->startOfDay(),
            'to' => CarbonImmutable::parse($v['dateTo'] ?? now())->endOfDay(),
            'currency' => strtoupper($v['currency'] ?? 'LKR'), 'search' => trim($v['search'] ?? ''),
            'status' => $v['status'] ?? null, 'supplierId' => $v['supplierId'] ?? null,
            'page' => (int) ($v['page'] ?? 1), 'perPage' => (int) ($v['perPage'] ?? 10),
            'sort' => $v['sort'] ?? 'updatedAt', 'direction' => $v['direction'] ?? 'desc',
        ];
    }
}
