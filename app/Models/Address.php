<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
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

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function cart()
    {
        return $this->hasOne(Cart::class);
    }
}
