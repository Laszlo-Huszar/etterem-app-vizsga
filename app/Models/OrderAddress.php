<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderAddress extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'default',
        'last_name',
        'first_name',
        'phone',
        'zipcode',
        'city',
        'street',
        'note',
    ];

    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
