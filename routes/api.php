<?php

use App\Http\Controllers\YookassaController;
use App\Http\Middleware\AuthMiddleware;
use Illuminate\Support\Facades\Route;

Route::middleware([AuthMiddleware::class, 'web'])->group(function () {

    Route::prefix('pay')->group(function () {
        Route::post('createPayment', [YookassaController::class, 'createPayment']);
    });

});

Route::prefix('pay')->group(function () {
    Route::post('replenishment', [YookassaController::class, 'replenishment']);
});
