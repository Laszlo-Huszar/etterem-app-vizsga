<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    public function index()
    {

        $users = User::where('role', 'employee')->with('employee')->get();

        return Inertia::render('Admin/Employees/Index', ['users' => $users]);
    }

    public function create()
    {
        return Inertia::render('Admin/Employees/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:' . User::class,
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'position' => 'required'
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => 'password',
            'role' => 'employee'
        ]);

        $user->employee()->create([
            'position' => $request->position,
        ]);

        return to_route('admin.employees.index');
    }

    public function edit(User $user)
    {
        $user->employee = $user->employee;

        return Inertia::render('Admin/Employees/Edit', ['user' => $user]);
    }

    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255', Rule::unique('users')->ignore($user->id)],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
            'position' => 'required'
        ]);

        $user->name = $request->name;
        $user->email = $request->email;
        $user->save();

        $employee = $user->employee;
        $employee->position = $request->position;
        $employee->save();


        return to_route('admin.employees.index');
    }

    public function destroy(User $user)
    {
        $user->delete();

        return to_route('admin.employees.index');
    }
}
