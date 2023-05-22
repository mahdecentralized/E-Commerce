<?php

namespace App\Models;

use App\Models\Address;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
   use HasFactory;
   protected $table = 'orders';
   protected $fillable = [
      'user_id',
      'address_id',
      'payment_id',
      'payment_mode',
      'tracking_no',
      'status',
      'remark'
   ];

   protected $with = ['address'];
   public function address()
   {
      return $this->belongsTo(Address::class, 'address_id', 'id');
   }

   public function orderItems()
   {
      return $this->hasMany(OrderItem::class, 'order_id', 'id');
   }
}
