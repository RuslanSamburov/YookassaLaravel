<?php

use App\Http\Controllers\{ProductController, ProfileController};
use App\Http\Middleware\AuthMiddleware;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Index');
})->name('home');

Route::get('/products/', [ProductController::class, 'getAll'])->name('products');

Route::middleware(AuthMiddleware::class)->group(function () {
    Route::get('/products/buy/{id}', [ProductController::class, 'buy'])->name('products.buy')->where(['id' => '[0-9]+']);
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
});

require __DIR__.'/auth.php';
