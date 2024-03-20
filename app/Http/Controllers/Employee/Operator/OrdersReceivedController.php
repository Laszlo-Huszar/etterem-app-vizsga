<?php

namespace App\Http\Controllers\Employee\Operator;

use App\Events\OnOrderDelivery;
use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderStatus;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrdersReceivedController extends Controller
{
    public function index(Request $request)
    {
        $orders = Order::whereHas('latestOrderStatus', function ($query) {
            $query->where('status', 'received');
        })->with('latestOrderStatus', 'orderItems', 'orderAddress')->get();


        $couriers = User::whereHas('employee', function ($query) {
            $query->where('position', 'courier');
        })->with('employee')->get();

        return Inertia::render('Employees/Operator/OrdersReceived/Index', ['orders' => $orders, 'couriers' => $couriers]);
    }

    public function store(Request $request)
    {
        $orderIds = $request->orderIds;

        foreach ($orderIds as $orderId) {
            OrderStatus::create([
                'order_id' => $orderId,
                'current_employee_id' => $request->user()->employee->id,
                'target_employee_id' => $request->targetEmployeeId,
                'status' => 'under_delivery',
            ]);
        }

        OnOrderDelivery::dispatch();
        return to_route('employees.operator.orders-received.index');
    }
}
