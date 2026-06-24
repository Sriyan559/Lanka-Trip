<?php

namespace App\Http\Requests\Upload;

use App\Models\Upload;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreImageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'file' => [
                'required',
                'file',
                'mimes:jpg,jpeg,png,webp',
                'max:5120',
            ],
            'category' => [
                'nullable',
                'string',
                Rule::in(Upload::CATEGORIES),
            ],
        ];
    }
}
