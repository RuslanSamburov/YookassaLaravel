<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class YoomoneyCreatePaymentRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'amount' => 'int|required',
        ];
    }
}
