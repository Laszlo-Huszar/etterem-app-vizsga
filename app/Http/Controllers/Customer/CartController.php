<?php

namespace App\Http\Controllers\Customer;

use App\Events\OnOrderSent;
use App\Http\Controllers\Controller;
use App\Models\Address;
use App\Models\OrderAddress;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;


class CartController extends Controller
{
    public function index(Request $request)
    {
        $cart = $request->user()->cart;

        if (!$cart) {
            return Inertia::render('Customer/Cart/Index');
        }

        $cart = $request->user()->cart->with('cartItems')->first();

        if (!$cart->address_id) {
            // beallitja az alapertelmezett address-t, vagy ha nincs, akkor az elso addresst a cart address-nek, ha nincs address, marad az address_id null
            $defaultAddress = $request->user()->addresses()->orderBy('default', 'desc')->first();
            if ($defaultAddress) {
                $cart->address_id = $defaultAddress->id;
                $cart->save();
            }
        }

        foreach ($cart->cartItems as $cartItem) {
            if ($cartItem->image_path) {

                if (env('FILESYSTEM_DISK') === 's3') {
                    $imageTemporaryUrl = Storage::temporaryUrl($cartItem->image_path, now()->addMinutes(1));
                    $cartItem->image_path = $imageTemporaryUrl;
                } else if (env('FILESYSTEM_DISK') === 'public') {
                    $cartItem->image_path = 'http://localhost/storage/' . $cartItem->image_path;
                }
            }
        }

        $addresses = $request->user()->addresses()->orderBy('default', 'desc')->get();

        return Inertia::render('Customer/Cart/Index', ['cart' => $cart, 'addresses' => $addresses]);
    }

    public function update(Request $request, Address $address)
    {
        $cart = $request->user()->cart;
        $cart->address_id = $address->id;
        $cart->save();

        return to_route('customer.cart.index');
    }


    public function confirmOrder(Request $request)
    {
        $cart = $request->user()->cart;
        if ($cart) {
            $cart = $request->user()->cart->with(['cartItems', 'address'])->first();
        }
        if (!$cart || $cart->cartItems->count() === 0 || !$cart->address) {
            if (!$cart->address) {
                return to_route('customer.cart.index')->withErrors(['error' => 'A szállítási cím megadása kötelező.']);
            }
            return to_route('customer.cart.index');
        }

        return Inertia::render('Customer/Cart/ConfirmOrder', ['cart' => $cart]);
    }

    public function order(Request $request)
    {
        $cart = $request->user()->cart;
        if ($cart) {
            $cart = $request->user()->cart->with(['cartItems', 'address'])->first();
        }
        if (!$cart || $cart->cartItems->count() === 0 || !$cart->address) {
            return to_route('customer.cart.index');
        }

        $filteredAddress = $cart->address->only([
            'last_name',
            'first_name',
            'phone',
            'zipcode',
            'city',
            'street',
            'note',
        ]);

        $orderAddress = OrderAddress::where($filteredAddress)->first();

        if (!$orderAddress) {
            $orderAddress = OrderAddress::create($filteredAddress);
        }

        $order = $orderAddress->orders()->create([
            'user_id' => request()->user()->id,
            'order_number' => Str::uuid(),
        ]);

        foreach ($cart->cartItems as $cartItem) {
            $order->orderItems()->create([
                'food_name' => $cartItem->name,
                'quantity' => $cartItem->quantity,
                'price' => $cartItem->price,
            ]);
        }

        $order->orderStatuses()->create(['status' => 'received']);

        $cart->delete();

        OnOrderSent::dispatch();

        return to_route('home');
    }
}
