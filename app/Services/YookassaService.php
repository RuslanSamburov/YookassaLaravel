<?php

namespace App\Services;

use App\Events\YookassaEvent;
use App\Models\Replenishment;
use Illuminate\Support\Facades\Auth;
use YooKassa\Client;
use YooKassa\Request\Payments\CreatePaymentResponse;

class YookassaService
{
    private Client $client;

    public function __construct()
    {
        $client = new Client();
        $client->setAuth(env('YOOKASSA_CLIENT_ID'), env('YOOKASSA_CLIENT_SECRET'));
        $this->client = $client;
    }

    public function createPayment(float $price): ?CreatePaymentResponse
    {
        $payment = $this->client->createPayment([
            'amount' => [
                'value' => $price,
                'currency' => env('YOOKASSA_CURRENCY'),
            ],
            'confirmation' => [
                'type' => 'redirect',
                'return_url' => env('APP_URL'),
            ],
            'capture' => true,
        ], uniqid('', true));

        if ($payment) {
            $replenishment = new Replenishment([
                'uuid' => $payment->id,
                'user_id' => Auth::id(),
            ]);

            $replenishment->save();
        }

        return $payment;
    }

    public function replenishment(array $data, string $ip)
    {
        if (in_array($ip, config('yookassa.ips'))) {
            YookassaEvent::dispatch($data);
        }
    }
}
