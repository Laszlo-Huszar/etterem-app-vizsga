<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\CartItem;
use App\Models\FoodItem;
use Illuminate\Http\Request;

class CartItemController extends Controller
{
    public function store(Request $request, FoodItem $foodItem)
    {
        $cart = $request->user()->cart;
        if (!$cart) {
            $cart = $request->user()->cart()->create();
        }

        $cartItem = $cart->cartItems()->where('name', $foodItem->name)->first();
        if (!$cartItem) {
            $cart->cartItems()->create([
                'name' => $foodItem->name,
                'description' => $foodItem->description,
                'price' => $foodItem->price,
                'image_path' => $foodItem->image_path,
                'quantity' => 1,
            ]);

            return to_route('food-menu.index');
        }

        $cartItem->quantity += 1;
        $cartItem->save();

        return to_route('food-menu.index');
    }

    public function update(Request $request, CartItem $cartItem)
    {
        if ($request->quantity && $request->quantity > 0) {
            $cartItem->quantity = $request->quantity;
            $cartItem->save();
        }

        return to_route('customer.cart.index');
    }

    public function destroy(CartItem $cartItem)
    {
        $cartItem->delete();

        return to_route('customer.cart.index');
    }
}
