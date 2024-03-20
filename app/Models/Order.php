<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'order_address_id',
        'order_number',
    ];

    public function orderAddress()
    {
        return $this->belongsTo(OrderAddress::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function orderStatuses()
    {
        return $this->hasMany(OrderStatus::class);
    }

    public function latestOrderStatus()
    {
        return $this->hasOne(OrderStatus::class)->latestOfMany();
    }
}
