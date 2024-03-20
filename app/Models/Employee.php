<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'position',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function orderStatuses()
    {
        return $this->hasMany(OrderStatus::class, 'current_employee_id');
    }

    public function orderStatusesByTarget()
    {
        return $this->hasMany(OrderStatus::class, 'target_employee_id');
    }
}
