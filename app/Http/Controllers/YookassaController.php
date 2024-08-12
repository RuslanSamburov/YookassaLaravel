<?php

namespace App\Http\Controllers;

use App\Http\Requests\YoomoneyCreatePaymentRequest;
use App\Services\YookassaService;
use Illuminate\Http\Request;
use YooKassa\Request\Payments\CreatePaymentResponse;

class YookassaController extends Controller
{
    public function __construct(
        public YookassaService $yookassaService,
    ) {}
    public function replenishment(Request $request): void
    {
        $this->yookassaService->replenishment($request->all(), $request->ip());
    }

    public function createPayment(YoomoneyCreatePaymentRequest $request): ?CreatePaymentResponse
    {
        $payment = $this->yookassaService->createPayment($request->input('amount'));
        return $payment;
    }
}
