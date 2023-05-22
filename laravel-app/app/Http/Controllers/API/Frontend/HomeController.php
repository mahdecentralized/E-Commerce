<?php

namespace App\Http\Controllers\API\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Product;

class HomeController extends Controller
{
   
   // View User
   public function user()
   {
      if (auth('sanctum')->check()) {
         $user = auth('sanctum')->user();
         
         if ($user) {
            return response()->json([
               'status' => 200,
               'user' => $user
            ]);
         }
      }
   }

   // View Product
   public function products()
   {
      $products = Product::all();

      return response()->json([
         'status' => 200,
         'products' => $products
      ]);
   }
   
}
