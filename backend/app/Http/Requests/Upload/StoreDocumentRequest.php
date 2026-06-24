<?php

namespace App\Http\Requests\Upload;

use App\Models\Upload;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreDocumentRequest extends FormRequest
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
                'mimes:pdf,doc,docx,xlsx',
                'max:20480',
            ],
            'category' => [
                'nullable',
                'string',
                Rule::in(Upload::CATEGORIES),
            ],
        ];
    }
}
