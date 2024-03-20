<?php

namespace App\Http\Controllers\Employee\Courier;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourierController extends Controller
{
    public function index()
    {
        $orders = Order::whereHas('latestOrderStatus', function ($query) {
            $query->where('status', 'under_delivery')->where('target_employee_id', request()->user()->employee->id);
        })->with('latestOrderStatus', 'orderItems', 'orderAddress')->get();

        return Inertia::render('Employees/Courier/Index', ['orders' => $orders]);
    }

    public function store(Request $request, Order $order)
    {
        $order->orderStatuses()->create([
            'current_employee_id' => $request->user()->employee->id,
            'status' => 'delivered',
        ]);
    }
}
