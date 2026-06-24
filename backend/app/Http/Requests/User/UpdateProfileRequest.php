<?php

namespace App\Http\Requests\User;

use Closure;
use Illuminate\Foundation\Http\FormRequest;

class UpdateProfileRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'phone' => ['sometimes', 'nullable', 'string', 'max:50'],
            'company_name' => ['sometimes', 'nullable', 'string', 'max:255'],
            'country' => ['sometimes', 'nullable', 'string', 'max:100'],
            'email' => [
                'sometimes',
                'email',
                function (string $attribute, mixed $value, Closure $fail): void {
                    if (mb_strtolower(trim((string) $value)) !== $this->user()->email) {
                        $fail('The email address cannot be changed from this endpoint.');
                    }
                },
            ],
            'role' => ['prohibited'],
            'status' => ['prohibited'],
            'password' => ['prohibited'],
            'password_confirmation' => ['prohibited'],
            'current_password' => ['prohibited'],
        ];
    }
}
