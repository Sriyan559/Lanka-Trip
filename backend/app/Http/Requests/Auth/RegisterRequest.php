<?php

namespace App\Http\Requests\Auth;

use App\Http\Requests\Concerns\DecodesFrontendPassword;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class RegisterRequest extends FormRequest
{
    use DecodesFrontendPassword;

    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'company_name' => $this->input('company_name', $this->input('company')),
            'email' => is_string($this->email) ? mb_strtolower(trim($this->email)) : $this->email,
            'password' => $this->decodeFrontendPassword($this->password),
            'password_confirmation' => $this->decodeFrontendPassword($this->password_confirmation),
        ]);
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'confirmed', Password::min(8)],
            'role' => ['required', Rule::in(['buyer', 'supplier'])],
            'phone' => ['nullable', 'string', 'max:50'],
            'company_name' => ['required', 'string', 'max:255'],
            'country' => ['nullable', 'string', 'max:100'],
        ];
    }
}
