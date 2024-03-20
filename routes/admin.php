<?php

use App\Http\Controllers\Admin\AdminOrderController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\EditFoodMenuController;
use App\Http\Controllers\Admin\EmployeeController;
use App\Http\Controllers\Admin\FoodItemController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'role:admin'])->group(function () {

  # categories

  Route::get('admin/edit-food-menu', [EditFoodMenuController::class, 'index'])->name('admin.edit-food-menu.index');
  Route::resource('admin/edit-food-menu/categories', CategoryController::class)->except(['index', 'show',])->names(
    [
      'create' => 'admin.edit-food-menu.categories.create',
      'store' => 'admin.edit-food-menu.categories.store',
      'edit' => 'admin.edit-food-menu.categories.edit',
      'update' => 'admin.edit-food-menu.categories.update',
      'destroy' => 'admin.edit-food-menu.categories.destroy',
    ]
  );
  Route::post('admin/edit-food-menu/categories/{category}/place', [CategoryController::class, 'place'])->name('admin.edit-food-menu.categories.place');


  # food items

  Route::resource('admin/edit-food-menu/food-items', FoodItemController::class)->except(['create', 'index', 'show', 'update'])->names(
    [
      'store' => 'admin.edit-food-menu.food-items.store',
      'edit' => 'admin.edit-food-menu.food-items.edit',
      'destroy' => 'admin.edit-food-menu.food-items.destroy',
    ]
  );

  Route::get('admin/edit-food-menu/food-items/{category}/create', [FoodItemController::class, 'create'])->name('admin.edit-food-menu.food-items.create');

  // image feltoltes nem megy patch-el
  Route::post('admin/edit-food-menu/food-items/{foodItem}/update', [FoodItemController::class, 'update'])->name('admin.edit-food-menu.food-items.update');
  Route::post('admin/edit-food-menu/food-items/{foodItem}/place', [FoodItemController::class, 'place'])->name('admin.edit-food-menu.food-items.place');


  # employees

  Route::resource('admin/employees', EmployeeController::class)->only(['index', 'create', 'store'])->names(
    [
      'index' => 'admin.employees.index',
      'create' => 'admin.employees.create',
      'store' => 'admin.employees.store',
    ]
  );

  Route::get('admin/employees/{user}/edit', [EmployeeController::class, 'edit'])->name('admin.employees.edit');
  Route::patch('admin/employees/{user}', [EmployeeController::class, 'update'])->name('admin.employees.update');
  Route::delete('admin/employees/{user}', [EmployeeController::class, 'destroy'])->name('admin.employees.destroy');



  # orders

  Route::get('admin/orders', [AdminOrderController::class, 'index'])->name('admin.orders.index');
});
