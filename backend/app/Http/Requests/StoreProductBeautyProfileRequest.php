<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductBeautyProfileRequest extends FormRequest
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
            'product_id' => ['prohibited'],
            'skin_type' => ['nullable', 'string', 'max:255'],
            'hair_type' => ['nullable', 'string', 'max:255'],
            'skin_concern' => ['nullable', 'string', 'max:255'],
            'hair_concern' => ['nullable', 'string', 'max:255'],
            'ingredients' => ['nullable', 'string'],
            'how_to_use' => ['nullable', 'string'],
            'warnings' => ['nullable', 'string'],
            'spf_value' => ['nullable', 'integer', 'min:0', 'max:100'],
            'shade_family' => ['nullable', 'string', 'max:255'],
            'fragrance_family' => ['nullable', 'string', 'max:255'],
            'formulation' => ['nullable', 'string', 'max:255'],
            'gender_target' => ['nullable', 'string', 'max:255'],
            'age_group' => ['nullable', 'string', 'max:255'],
            'expiry_required' => ['sometimes', 'boolean'],
            'batch_tracking_required' => ['sometimes', 'boolean'],
            'compliance_status' => ['prohibited'],
        ];
    }
}
