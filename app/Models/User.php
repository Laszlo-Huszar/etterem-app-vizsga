<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function addresses()
    {
        return $this->hasMany(Address::class);
    }

    public function cart()
    {
        return $this->hasOne(Cart::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function employee()
    {
        return $this->hasOne(Employee::class);
    }

    protected static function booted()
    {
        static::deleting(function (User $user) {
            if ($user->cart) {
                $user->cart->address_id = null;
                $user->cart->save();
            }

            if ($user->employee) {
                if ($user->employee->orderStatuses) {
                    foreach ($user->employee->orderStatuses as $orderStatus) {
                        $orderStatus->current_employee_id = null;
                        $orderStatus->save();
                    }
                    foreach ($user->employee->orderStatusesByTarget as $orderStatusesByTarget) {
                        $orderStatusesByTarget->target_employee_id = null;
                        $orderStatusesByTarget->save();
                    }
                }
            }
        });
    }
}
