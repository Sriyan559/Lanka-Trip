<?php

namespace App\Http\Requests\User;

use App\Http\Requests\Concerns\DecodesFrontendPassword;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class UpdatePasswordRequest extends FormRequest
{
    use DecodesFrontendPassword;

    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'current_password' => $this->decodeFrontendPassword(
                $this->current_password,
            ),
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
            'current_password' => ['required', 'string'],
            'password' => ['required', 'confirmed', Password::min(8)],
        ];
    }
}
