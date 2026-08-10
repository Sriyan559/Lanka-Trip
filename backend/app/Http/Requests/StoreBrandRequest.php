<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreBrandRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->isAdministrator() ?? false;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255', Rule::unique('brands', 'name')],
            'slug' => ['nullable', 'string', 'max:255', 'alpha_dash', Rule::unique('brands', 'slug')],
            'description' => ['nullable', 'string'],
            'logo_path' => ['nullable', 'string', 'max:2048'],
            'website_url' => ['nullable', 'url', 'max:2048'],
            'country_id' => ['nullable', 'integer', Rule::exists('countries', 'id')],
            'status' => ['sometimes', Rule::in(['draft', 'active', 'inactive', 'suspended'])],
            'is_verified' => ['sometimes', 'boolean'],
            'created_by' => ['prohibited'],
            'uuid' => ['prohibited'],
        ];
    }
}
