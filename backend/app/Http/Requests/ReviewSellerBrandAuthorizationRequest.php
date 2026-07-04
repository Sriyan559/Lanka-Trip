<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ReviewSellerBrandAuthorizationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->role === 'admin';
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'action' => ['required', Rule::in(['approve', 'reject', 'suspend', 'expire'])],
            'review_notes' => ['required_if:action,reject,suspend', 'nullable', 'string'],
            'expires_at' => ['nullable', 'date'],
            'status' => ['prohibited'],
            'reviewed_by' => ['prohibited'],
            'reviewed_at' => ['prohibited'],
            'supplier_id' => ['prohibited'],
            'brand_id' => ['prohibited'],
        ];
    }
}
