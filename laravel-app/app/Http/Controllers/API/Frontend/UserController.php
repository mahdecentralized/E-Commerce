<?php

namespace App\Http\Controllers\API\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{

   // View Orders
   public function orders()
   {
      if (auth('sanctum')->check()) {
         $user_id = auth('sanctum')->user()->id;
         $orders = Order::where('user_id', $user_id)->get();

         return response()->json([
            'status' => 200,
            'orders' => $orders,
         ]);
      } else {
         return response()->json([
            'status' => 401,
            'warning' => 'Unauthorized!'
         ]);
      }
   }

   // View Order Items
   public function orderItems($id)
   {
      if (auth('sanctum')->check()) {
         $user_id = auth('sanctum')->user()->id;
         $order_items = OrderItem::where('order_id', $id)->where('user_id', $user_id)->get();
         $order = Order::where('id', $id)->where('user_id', $user_id)->first();

         if ($order) {
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
      } else {
         return response()->json([
            'status' => 401,
            'warning' => 'Unauthorized!'
         ]);
      }
   }

   // Edit Profile
   public function edit()
   {
      if (auth('sanctum')->check()) {
         $user = auth('sanctum')->user();

         if ($user) {
            return response()->json([
               'status' => 200,
               'user' => $user
            ]);
         }
      } else {
         return response()->json([
            'status' => 401,
            'warning' => 'Unauthorized!'
         ]);
      }
   }

   // Update Profile
   public function update(Request $request)
   {
      if (auth('sanctum')->check()) {
         $user = auth('sanctum')->user();

         $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:50',
            'last_name' => 'required|string|max:50'
         ]);

         if ($validator->fails()) {
            return response()->json([
               'status' => 400,
               'errors' => $validator->messages()
            ]);
         } else {
            $user->first_name = $request->input('first_name');
            $user->last_name = $request->input('last_name');
            if ($request->hasFile('image')) {
               $path = $user->image;
               if (File::exists($path) && $path != 'uploads/default/user.png') {
                  File::delete($path);
               }
               $file = $request->file('image');
               $extension = $file->getClientOriginalName();
               $fileName = time() . '.' . $extension;
               $file->move('uploads/user/', $fileName);
               $user->image = 'uploads/user/' . $fileName;
            }

            $user->update();

            return response()->json([
               'status' => 200,
               'message' => 'Profile Updated Successfuly.'
            ]);
         }
      } else {
         return response()->json([
            'status' => 401,
            'warning' => 'Unauthorized!'
         ]);
      }
   }

   // Delete Image Profile
   public function destroy()
   {
      if (auth('sanctum')->check()) {
         $user = auth('sanctum')->user();

         $path = $user->image;
         if (File::exists($path) && $path != 'uploads/default/user.png') {
            File::delete($path);
         }
         
         $user->image = 'uploads/default/user.png';

         $user->update();

         return response()->json([
            'status' => 200,
            'message' => 'Image deleted successfuly.'
         ]);
      } else {
         return response()->json([
            'status' => 401,
            'warning' => 'Unauthorized!'
         ]);
      }
   }
}
