<?php

namespace App\Http\Controllers\API\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CheckoutController extends Controller
{

   // Place Order
   public function store(Request $request)
   {
      if (auth('sanctum')->check()) {
         $user_id = auth('sanctum')->user()->id;

         $validator = Validator::make($request->all(), [
            'address_id' => 'required'
         ]);

         if ($validator->fails()) {
            return response()->json([
               'status' => 400,
               'errors' => $validator->messages()
            ]);
         } else {

            $order = new Order;

            $order->user_id = $user_id;
            $order->address_id = $request->input('address_id');
            $order->payment_mode = 'cod';
            $order->tracking_no = rand(1111, 9999);

            $order->save();

            $cart = Cart::where('user_id', $user_id)->get();

            $orderItems = [];

            foreach ($cart as $item) {
               $orderItems[] = [
                  'user_id' => $user_id,
                  'product_id' => $item->product_id,
                  'quantity' => $item->product_quantity,
                  'price' => $item->product->selling_price
               ];

               $item->product->update([
                  'quantity' => $item->product->quantity - $item->product_quantity
               ]);
            }

            $order->orderItems()->createMany($orderItems);
            Cart::destroy($cart);

            return response()->json([
               'status' => 200,
               'message' => 'Order placed successfuly.'
            ]);
         }
      } else {
         return response()->json([
            'status' => 401,
            'warning' => 'Unauthorized!'
         ]);
      }
   }
}
