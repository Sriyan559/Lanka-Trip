<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateSellerBrandAuthorizationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->role === 'supplier'
            && $this->user()->supplier !== null;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'supplier_id' => ['prohibited'],
            'brand_id' => ['sometimes', 'integer', Rule::exists('brands', 'id')->where('status', 'active')],
            'authorization_type' => ['sometimes', 'nullable', Rule::in([
                'brand_owner',
                'authorized_distributor',
                'importer',
                'reseller',
                'salon_professional',
            ])],
            'territory' => ['sometimes', 'nullable', 'string', 'max:255'],
            'document_path' => ['sometimes', 'nullable', 'string', 'max:2048'],
            'starts_at' => ['sometimes', 'nullable', 'date'],
            'expires_at' => ['sometimes', 'nullable', 'date', 'after_or_equal:starts_at'],
            'status' => ['prohibited'],
            'reviewed_by' => ['prohibited'],
            'reviewed_at' => ['prohibited'],
            'review_notes' => ['prohibited'],
        ];
    }
}
