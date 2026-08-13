<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class FinanceGovernanceIndexRequest extends FormRequest
{
    public function authorize(): bool { return $this->user()?->hasPermission('analytics.view') ?? false; }

    public function rules(): array
    {
        return [
            'search' => ['nullable', 'string', 'max:120'], 'domain' => ['nullable', 'string', 'max:50'],
            'job_type' => ['nullable', 'string', 'max:50'], 'status' => ['nullable', 'string', 'max:30'],
            'from' => ['nullable', 'date'], 'to' => ['nullable', 'date', 'after_or_equal:from'],
            'sort' => ['nullable', 'in:created_at,job_code,title,domain,job_type,status,total_records,processed_records,rejected_records'],
            'direction' => ['nullable', 'in:asc,desc'], 'page' => ['nullable', 'integer', 'min:1'],
            'per_page' => ['nullable', 'integer', 'between:1,100'],
        ];
    }
}
