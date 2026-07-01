<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Carbon\Carbon;
class CheckTokenIdleTimeout
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    // public function handle(Request $request, Closure $next): Response
    // {
    //     return $next($request);
    // }
      public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if ($user && $token = $user->currentAccessToken()) {

            $lastUsed = $token->last_used_at ?? $token->created_at;

            if (Carbon::parse($lastUsed)->addMinutes(30)->isPast()) {

                // Hapus token agar tidak bisa dipakai lagi
                $token->delete();

                return response()->json([
                    'message' => 'Token expired because of inactivity.'
                ], 401);
            }
        }

        return $next($request);
    }
}
