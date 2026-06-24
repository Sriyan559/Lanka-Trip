<?php

namespace App\Http\Requests\SupplierProfile;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCompanyProfileRequest extends FormRequest
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
            'company_name' => ['sometimes', 'string', 'max:255'],
            'description' => ['sometimes', 'nullable', 'string'],
            'country' => ['sometimes', 'string', 'max:100'],
            'city' => ['sometimes', 'nullable', 'string', 'max:100'],
            'address' => ['sometimes', 'nullable', 'string'],
            'phone' => ['sometimes', 'nullable', 'string', 'max:50'],
            'email' => ['sometimes', 'email', 'max:255'],
            'website' => ['sometimes', 'nullable', 'url', 'max:255'],
            'business_type' => ['sometimes', 'nullable', 'string', 'max:255'],
            'established_year' => ['sometimes', 'nullable', 'integer', 'min:1800', 'max:'.now()->year],
            'employee_count' => ['sometimes', 'nullable', 'integer', 'min:0'],
            'factory_size' => ['sometimes', 'nullable', 'string', 'max:255'],
            'annual_revenue' => ['sometimes', 'nullable', 'numeric', 'min:0'],
            'export_percentage' => ['sometimes', 'nullable', 'numeric', 'min:0', 'max:100'],
            'main_markets' => ['sometimes', 'nullable', 'array'],
            'main_markets.*' => ['string', 'max:100'],
        ];
    }
}
