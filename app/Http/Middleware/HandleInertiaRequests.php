<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $employee = null;
        if (Auth::check() && $request->user()->role === 'employee') {
            $employee =  $request->user()->employee;
        }

        $cartItemCount = 0;
        if (Auth::check()) {
            $cart = $request->user()->cart()->first();
            if ($cart) {
                foreach ($cart->cartItems as $cartItem) {
                    $cartItemCount += $cartItem->quantity;
                }
            }
        }

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
                'employee' => $employee,
            ],
            'cartItemCount' => $cartItemCount,
        ];
    }
}
