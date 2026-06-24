<?php

namespace App\Http\Requests\SupplierProfile;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductionCapacityRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->role === 'supplier';
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'monthly_output' => ['nullable', 'string', 'max:255'],
            'output_unit' => ['nullable', 'string', 'max:100'],
            'production_lines' => ['nullable', 'integer', 'min:0'],
            'lead_time' => ['nullable', 'string', 'max:255'],
            'factory_size' => ['nullable', 'string', 'max:255'],
        ];
    }
}
