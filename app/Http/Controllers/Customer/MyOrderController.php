<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MyOrderController extends Controller
{
    public function index(Request $request)
    {
        $orders = $request->user()->orders;
        if ($orders) {
            $orders = $request->user()->orders()->with(['orderAddress', 'orderItems'])->orderBy('created_at', 'desc')->get();
        }

        return Inertia::render('Customer/MyOrders/Index', ['orders' => $orders]);
    }
}
