<?php

namespace App\Http\Requests\SupplierProfile;

use Illuminate\Foundation\Http\FormRequest;

class StoreSupplierVideoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->role === 'supplier';
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'video_url' => ['required', 'url', 'max:1000'],
        ];
    }
}
