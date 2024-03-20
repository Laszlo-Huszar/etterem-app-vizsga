<?php

use App\Http\Controllers\Employee\Courier\CourierController;
use App\Http\Controllers\Employee\Operator\OrdersReceivedController;
use App\Http\Controllers\Employee\Operator\OrdersSentController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'role:employee'])->group(
  function () {
    Route::middleware(['position:operator'])->group(function () {
      Route::get('employees/operator/orders-received', [OrdersReceivedController::class, 'index'])->name('employees.operator.orders-received.index');
      Route::post('employees/operator/orders-received', [OrdersReceivedController::class, 'store'])->name('employees.operator.orders-received.store');

      Route::get('employees/operator/orders-sent', [OrdersSentController::class, 'index'])->name('employees.operator.orders-sent.index');
      // Route::post('employees/operator/orders-sent', [OrdersReceivedController::class, 'store'])->name('employees.operator.orders-sent.store');
    });

    Route::middleware(['position:courier'])->group(function () {
      Route::get('employees/courier', [CourierController::class, 'index'])->name('employee.courier.index');
      Route::post('employees/courier/{order}', [CourierController::class, 'store'])->name('employee.courier.store');
    });
  }
);
