<?php

namespace App\Http\Requests\Cart;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCartItemRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'quantity' => ['sometimes', 'required_without:note', 'integer', 'min:1'],
            'note' => ['sometimes', 'required_without:quantity', 'nullable', 'string', 'max:1000'],
        ];
    }
}
