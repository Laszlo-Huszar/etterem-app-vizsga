<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderStatus extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'current_employee_id',
        'target_employee_id',
        'status',
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function currentEmployee()
    {
        return $this->belongsTo(Employee::class);
    }

    public function targetEmployee()
    {
        return $this->belongsTo(Employee::class);
    }
}
