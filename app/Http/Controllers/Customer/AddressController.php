<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Address;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AddressController extends Controller
{
    public function index()
    {
        $addresses = request()->user()->addresses()->orderBy('default', 'desc')->get();
        return Inertia::render('Customer/Addresses/Index', ['addresses' => $addresses]);
    }

    public function create(Request $request)
    {
        return Inertia::render('Customer/Addresses/Create', ['redirect' => $request->query('redirect')]);
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'last_name' => ['required', 'string', 'max:255', 'alpha'],
            'first_name' => ['required', 'string', 'max:255', 'alpha'],
            'phone' => ['required', 'string', 'digits_between:8,9'],
            'zipcode' => ['required', 'string', 'digits:4'],
            'city' => ['required', 'string', 'max:255', 'alpha'],
            'street' => ['required', 'string', 'max:255'],
            'note' => ['nullable', 'string', 'max:1000'],
        ]);

        $sameCheckFields = $request->except('note', 'default', 'redirect');
        $sameAddress = $request->user()->addresses()->where($sameCheckFields)->first();
        if ($sameAddress) {
            return to_route('customer.addresses.create')->withErrors(['error' => 'Ez a szállítási cím már létezik.']);
        }

        if ($request->default) {
            $prevDefault = $request->user()->addresses()->where('default', 1)->first();
            if ($prevDefault) {
                $prevDefault->default = false;
                $prevDefault->save();
            }
        }

        $request->user()->addresses()->create([...$validated, 'default' => $request->default]);

        if ($request->redirect) {
            return to_route($request->redirect);
        }

        return to_route('customer.addresses.index');
    }

    public function edit(Address $address)
    {
        return Inertia::render('Customer/Addresses/Edit', ['address' => $address]);
    }

    public function update(Request $request, Address $address)
    {
        $validated = $request->validate([
            'last_name' => ['required', 'string', 'max:255', 'alpha'],
            'first_name' => ['required', 'string', 'max:255', 'alpha'],
            'phone' => ['required', 'string', 'digits_between:8,9'],
            'zipcode' => ['required', 'string', 'digits:4'],
            'city' => ['required', 'string', 'max:255', 'alpha'],
            'street' => ['required', 'string', 'max:255'],
            'note' => ['nullable', 'string', 'max:1000'],
        ]);

        if ($request->default) {
            $prevDefault = $request->user()->addresses()->where('default', 1)->first();
            if ($prevDefault) {
                $prevDefault->default = false;
                $prevDefault->save();
            }
        }

        $address->update([...$validated, 'default' => $request->default]);

        return to_route('customer.addresses.index');
    }

    public function destroy(Address $address)
    {
        if ($address->cart) {
            $address->cart->address_id = null;
            $address->cart->save();
        }

        $address->delete();
        return to_route('customer.addresses.index');
    }
}
