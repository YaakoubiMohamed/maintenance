<?php

namespace App\Http\Middleware;

use Closure;

class CORS
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        //autorisation a la partie front pour utiliser les methode dans la partie back ...
        header('Access-Control-Allow-Origin : *');
        header('Access-Control-Allow-Methods : GET, POST, PUT, PATCH, DELETE, OPTION');
        header('Access-Control-Allow-Headers : Content-type, X-Auth-Token, Authorization, Origin');
        return $next($request);
    }
}
