<?php

namespace App\Http\Requests\Auth;

use App\Http\Requests\Concerns\DecodesFrontendPassword;
use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    use DecodesFrontendPassword;

    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $identifier = $this->input('login', $this->input('email'));

        $this->merge([
            'login' => is_string($identifier) ? mb_strtolower(trim($identifier)) : $identifier,
            'password' => $this->decodeFrontendPassword($this->password),
        ]);
    }

    public function rules(): array
    {
        return [
            'login' => ['required', 'string', 'max:255'],
            'password' => ['required', 'string'],
        ];
    }
}
