<?php

namespace App\Http\Requests\Cart;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AddToCartRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'product_id' => [
                'nullable',
                'required_without:product_slug',
                'integer',
                Rule::exists('products', 'id')->where('status', 'active'),
            ],
            'product_slug' => ['nullable', 'required_without:product_id', 'string', 'max:180'],
            'quantity' => ['required', 'integer', 'min:1'],
            'note' => ['nullable', 'string', 'max:1000'],
        ];
    }
}
