<?php

use App\Http\Controllers\Customer\AddressController;
use App\Http\Controllers\Customer\CartController;
use App\Http\Controllers\Customer\CartItemController;
use App\Http\Controllers\Customer\MyOrderController;
use Illuminate\Support\Facades\Route;


Route::middleware(['auth', 'role:customer'])->group(function () {
  Route::resource('customer/cart', CartController::class)->only(['index'])->names([
    'index' => 'customer.cart.index',
  ]);
  Route::patch('customer/cart/{address}', [CartController::class, 'update'])->name('customer.cart.update');

  Route::get('customer/cart/confirm-order', [CartController::class, 'confirmOrder'])->name('customer.cart.confirm-order');
  Route::post('customer/cart/confirm-order', [CartController::class, 'order'])->name('customer.cart.order');

  Route::resource('customer/cart-item', CartItemController::class)->only('update', 'destroy')->names([
    'update' => 'customer.cart-item.update',
    'destroy' => 'customer.cart-item.destroy',
  ]);
  Route::post('customer/cart-item/{food_item}', [CartItemController::class, 'store'])->name('customer.cart-item.store');

  Route::resource('customer/addresses', AddressController::class)->except(['show'])->names(
    [
      'index' => 'customer.addresses.index',
      'create' => 'customer.addresses.create',
      'store' => 'customer.addresses.store',
      'edit' => 'customer.addresses.edit',
      'update' => 'customer.addresses.update',
      'destroy' => 'customer.addresses.destroy',
    ]
  );


  Route::resource('customer/my-orders', MyOrderController::class)->only('index')->names(['index' => 'customer.my-orders.index']);
});
