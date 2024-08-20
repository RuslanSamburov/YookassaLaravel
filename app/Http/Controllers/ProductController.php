<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Services\ProductService;
use Illuminate\Database\Eloquent\Collection;

class ProductController extends Controller
{
    public function __construct(
        private ProductService $productService,
    ) {
        
    }
    public function getAll(): Collection
    {
        return Product::all(['id', 'title', 'description', 'price', 'image']);
    }

    public function buy(int $id)
    {
        $this->productService->buy($id);
    }
}
