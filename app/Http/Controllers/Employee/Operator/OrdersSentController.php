<?php

namespace App\Http\Controllers\Employee\Operator;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrdersSentController extends Controller
{
    public function index()
    {
        $orders = Order::whereHas('latestOrderStatus', function ($query) {
            $query->where('status', 'under_delivery');
        })->with('latestOrderStatus.targetEmployee.user', 'orderItems', 'orderAddress')->get();


        return Inertia::render('Employees/Operator/OrdersSent/Index', ['orders' => $orders]);
    }
}
