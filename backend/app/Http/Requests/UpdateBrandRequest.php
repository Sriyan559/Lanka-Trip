<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateBrandRequest extends FormRequest
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
        $brandId = $this->routeModelId('brand');

        return [
            'name' => ['sometimes', 'required', 'string', 'max:255', Rule::unique('brands', 'name')->ignore($brandId)],
            'slug' => ['sometimes', 'nullable', 'string', 'max:255', 'alpha_dash', Rule::unique('brands', 'slug')->ignore($brandId)],
            'description' => ['sometimes', 'nullable', 'string'],
            'logo_path' => ['sometimes', 'nullable', 'string', 'max:2048'],
            'website_url' => ['sometimes', 'nullable', 'url', 'max:2048'],
            'country_id' => ['sometimes', 'nullable', 'integer', Rule::exists('countries', 'id')],
            'status' => ['sometimes', Rule::in(['draft', 'active', 'inactive', 'suspended'])],
            'is_verified' => ['sometimes', 'boolean'],
            'created_by' => ['prohibited'],
            'uuid' => ['prohibited'],
        ];
    }

    private function routeModelId(string $key): ?int
    {
        $value = $this->route($key);

        if (is_object($value) && isset($value->id)) {
            return (int) $value->id;
        }

        return is_numeric($value) ? (int) $value : null;
    }
}
