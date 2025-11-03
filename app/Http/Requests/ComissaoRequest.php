<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ComissaoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'nome' => 'required|string|max:255',
            'ano' => 'required|integer|min:2000|max:2100',
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'nome.required' => 'O nome da comissão é obrigatório.',
            'nome.max' => 'O nome da comissão não pode ter mais de 255 caracteres.',
            'ano.required' => 'O ano é obrigatório.',
            'ano.integer' => 'O ano deve ser um número inteiro.',
            'ano.min' => 'O ano deve ser maior ou igual a 2000.',
            'ano.max' => 'O ano deve ser menor ou igual a 2100.',
        ];
    }
}
