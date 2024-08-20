<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class AuthMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        if (!auth('web')->check()) {
            return abort(Response::HTTP_UNAUTHORIZED, 'Вы не авторизованы');
        }
        return $next($request);
    }
}
