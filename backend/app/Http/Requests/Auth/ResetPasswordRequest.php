<?php

namespace App\Http\Requests\Auth;

use App\Http\Requests\Concerns\DecodesFrontendPassword;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class ResetPasswordRequest extends FormRequest
{
    use DecodesFrontendPassword;

    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'email' => is_string($this->email)
                ? mb_strtolower(trim($this->email))
                : $this->email,
            'password' => $this->decodeFrontendPassword($this->password),
            'password_confirmation' => $this->decodeFrontendPassword(
                $this->password_confirmation,
            ),
        ]);
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'email' => ['required', 'email', 'max:255'],
            'token' => ['required', 'string'],
            'password' => ['required', 'confirmed', Password::min(8)],
        ];
    }
}
