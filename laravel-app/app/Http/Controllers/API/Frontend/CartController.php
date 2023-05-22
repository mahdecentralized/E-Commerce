<?php

namespace App\Http\Controllers\API\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;

class CartController extends Controller
{

   // View Cart
   public function index()
   {
      if (auth('sanctum')->check()) {
         $user_id = auth('sanctum')->user()->id;
         $cart = Cart::where('user_id', $user_id)->get();

         return response()->json([
            'status' => 200,
            'cart' => $cart
         ]);
      } else {
         return response()->json([
            'status' => 401,
            'warning' => 'Unauthorized!'
         ]);
      }
   }


   // Add Cart
   public function store(Request $request)
   {
      if (auth('sanctum')->check()) {
         $user_id = auth('sanctum')->user()->id;
         $product_id = $request->product_id;
         $product_quantity = $request->product_quantity;

         $product = Product::where('id', $product_id)->first();

         if($product) {
            if(Cart::where('product_id', $product_id)->where('user_id', $user_id)->exists()) {
               return response()->json([
                  'status' => 409,
                  'warning' => $product->name.' already added to Cart.'
               ]);
            } else {
               $cart = new Cart;

               $cart->user_id = $user_id;
               $cart->product_id = $product_id;
               $cart->product_quantity = $product_quantity;

               $cart->save();

               return response()->json([
                  'status' => 200,
                  'message' => $product->name.' added to Cart.'
               ]);
            }
         } else {
            return response()->json([
               'status' => 404,
               'error' => 'Product not found.'
            ]);
         }
      } else {
         return response()->json([
            'status' => 401,
            'warning' => 'Unauthorized!'
         ]);
      }
   }


   // Update Cart
   public function update($cart_id, $scope)
   {
      if (auth('sanctum')->check()) {
         $user_id = auth('sanctum')->user()->id;
         $cart = Cart::where('id', $cart_id)->where('user_id', $user_id)->first();

         if($scope == 'inc') {
            $cart->product_quantity = $cart->product_quantity + ($cart->product_quantity < $cart->product->quantity ? 1 : 0);
         } else if($scope == 'dec') {
            $cart->product_quantity = $cart->product_quantity - ($cart->product_quantity > 1 ? 1 : 0);
         }

         $cart->update();
      } else {
         return response()->json([
            'status' => 401,
            'warning' => 'Unauthorized!'
         ]);
      }
   }


   // Delete Cart
   public function destroy($cart_id)
   {
      if (auth('sanctum')->check()) {
         $user_id = auth('sanctum')->user()->id;
         $cart = Cart::where('id', $cart_id)->where('user_id', $user_id)->first();

         if($cart) {
            $cart->delete();
            
            return response()->json([
               'status' => 200,
               'message' => 'Cart removed.'
            ]);
         } else {
            return response()->json([
               'status' => 404,
               'error' => 'Cart not found.'
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
