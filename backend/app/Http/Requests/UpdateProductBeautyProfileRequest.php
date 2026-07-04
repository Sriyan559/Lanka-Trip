<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductBeautyProfileRequest extends FormRequest
{
    public function authorize(): bool
    {
        return in_array($this->user()?->role, ['admin', 'supplier'], true)
            && ($this->user()?->role === 'admin' || $this->user()->supplier !== null);
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        $isAdmin = $this->user()?->role === 'admin';

        return [
            'product_id' => ['prohibited'],
            'skin_type' => ['sometimes', 'nullable', 'string', 'max:255'],
            'hair_type' => ['sometimes', 'nullable', 'string', 'max:255'],
            'skin_concern' => ['sometimes', 'nullable', 'string', 'max:255'],
            'hair_concern' => ['sometimes', 'nullable', 'string', 'max:255'],
            'ingredients' => ['sometimes', 'nullable', 'string'],
            'how_to_use' => ['sometimes', 'nullable', 'string'],
            'warnings' => ['sometimes', 'nullable', 'string'],
            'spf_value' => ['sometimes', 'nullable', 'integer', 'min:0', 'max:100'],
            'shade_family' => ['sometimes', 'nullable', 'string', 'max:255'],
            'fragrance_family' => ['sometimes', 'nullable', 'string', 'max:255'],
            'formulation' => ['sometimes', 'nullable', 'string', 'max:255'],
            'gender_target' => ['sometimes', 'nullable', 'string', 'max:255'],
            'age_group' => ['sometimes', 'nullable', 'string', 'max:255'],
            'expiry_required' => ['sometimes', 'boolean'],
            'batch_tracking_required' => ['sometimes', 'boolean'],
            'compliance_status' => $isAdmin
                ? ['sometimes', 'string', 'max:30']
                : ['prohibited'],
        ];
    }
}
