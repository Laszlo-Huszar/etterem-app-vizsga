<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminOrderController extends Controller
{
    public function index()
    {

        $orders = Order::with('orderStatuses.currentEmployee.user')->get();

        return Inertia::render('Admin/Orders/Index', ['orders' => $orders]);
    }
}
