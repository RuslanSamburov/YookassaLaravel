<?php

use App\Http\Controllers\YookassaController;
use Illuminate\Support\Facades\Route;

Route::middleware('web')->group(function () {
    Route::middleware('auth')->group(function () {

        Route::prefix('pay')->group(function () {
            Route::post('createPayment', [YookassaController::class, 'createPayment']);
        });

    });
});

Route::prefix('pay')->group(function () {
    Route::post('replenishment', [YookassaController::class, 'replenishment']);
});
