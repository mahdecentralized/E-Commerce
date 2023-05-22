<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use App\Models\Address;
use App\Models\Order;
use App\Models\OrderItem;

class OrderController extends Controller
{

   // View Orders
   public function orders()
   {
      $orders = Order::all();

      return response()->json([
         'status' => 200,
         'orders' => $orders
      ]);
   }

   // View Orders
   public function orderItems($id)
   {
      $order_items = OrderItem::where('order_id', $id)->get();

      if (Order::find($id)) {
         return response()->json([
            'status' => 200,
            'order_items' => $order_items
         ]);
      } else {
         return response()->json([
            'status' => 404,
            'error' => 'Order Items not found.'
         ]);
      }
   }
}
