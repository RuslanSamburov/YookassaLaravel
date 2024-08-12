<?php

namespace App\Http\Controllers;

use App\Http\Requests\YoomoneyCreatePaymentRequest;
use App\Services\YookassaService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use YooKassa\Request\Payments\CreatePaymentResponse;

class YookassaController extends Controller
{
    public function __construct(
        public YookassaService $yookassaService,
    ) {}
    public function replenishment(Request $request): void
    {
        Log::info($request->ip());
        $this->yookassaService->replenishment($request->all(), $request->ip());
    }

    public function createPayment(YoomoneyCreatePaymentRequest $request): ?CreatePaymentResponse
    {
        $payment = $this->yookassaService->createPayment($request->input('amount'));
        return $payment;
    }
}
