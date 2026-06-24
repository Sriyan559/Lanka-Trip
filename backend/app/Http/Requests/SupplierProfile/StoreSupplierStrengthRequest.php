<?php

namespace App\Http\Requests\SupplierProfile;

use Illuminate\Foundation\Http\FormRequest;

class StoreSupplierStrengthRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->role === 'supplier';
    }

    protected function prepareForValidation(): void
    {
        if (! $this->has('strength_name') && $this->has('name')) {
            $this->merge(['strength_name' => $this->input('name')]);
        }
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'strength_name' => ['required', 'string', 'max:255'],
        ];
    }
}
