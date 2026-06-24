<?php

namespace App\Http\Requests\SupplierProfile;

use Illuminate\Foundation\Http\FormRequest;

class StoreSupplierCertificateRequest extends FormRequest
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
            'certificate_name' => ['required', 'string', 'max:255'],
            'certificate_number' => ['nullable', 'string', 'max:255'],
            'issuing_authority' => ['nullable', 'string', 'max:255'],
            'issue_date' => ['nullable', 'date'],
            'expiry_date' => ['nullable', 'date', 'after_or_equal:issue_date'],
            'file_url' => ['nullable', 'url', 'max:1000'],
        ];
    }
}
