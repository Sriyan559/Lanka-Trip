<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreSellerBrandAuthorizationRequest extends FormRequest
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
            'brand_id' => ['required', 'integer', Rule::exists('brands', 'id')->where('status', 'active')],
            'authorization_type' => ['nullable', Rule::in([
                'brand_owner',
                'authorized_distributor',
                'importer',
                'reseller',
                'salon_professional',
            ])],
            'territory' => ['nullable', 'string', 'max:255'],
            'document_path' => ['nullable', 'string', 'max:2048'],
            'starts_at' => ['nullable', 'date'],
            'expires_at' => ['nullable', 'date', 'after_or_equal:starts_at'],
            'status' => ['prohibited'],
            'reviewed_by' => ['prohibited'],
            'reviewed_at' => ['prohibited'],
            'review_notes' => ['prohibited'],
        ];
    }
}
