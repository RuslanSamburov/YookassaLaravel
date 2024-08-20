<?php

namespace App\Services;

use App\Models\Product;
use App\Models\User;
use Symfony\Component\HttpFoundation\Response;

class ProductService
{
    public function __construct(
        private UserService $userService,
    ) {}
    
    public function buy(int $id)
    {
        $product = Product::find($id);
        $user = User::find(auth('web')->id());
        if (!$product) {
            return abort(Response::HTTP_NOT_FOUND, 'Продукт не найден');
        }
        if ($user->balance < $product->price) {
            return abort(Response::HTTP_PAYMENT_REQUIRED, 'Недостаточно средств');
        }

        $this->userService->removeBalance($user, $product->price);

        return abort(Response::HTTP_OK, 'Товар куплен');
    }
}
