<?php

namespace App\Http\Controllers\API\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Address;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AddressController extends Controller
{

   // View Addresses
   public function index()
   {
      if (auth('sanctum')->check()) {
         $user_id = auth('sanctum')->user()->id;
         $addresses = Address::where('user_id', $user_id)->get();

         return response()->json([
            'status' => 200,
            'addresses' => $addresses
         ]);
      } else {
         return response()->json([
            'status' => 401,
            'error' => 'Please login first.'
         ]);
      }
   }


   // Add Address
   public function store(Request $request)
   {
      if (auth('sanctum')->check()) {
         $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:50',
            'last_name' => 'required|string|max:50',
            'email' => 'required|email|max:50',
            'phone' => 'required|numeric',
            'address' => 'required|string|max:255',
            'city' => 'required|string|max:50',
            'state' => 'required|string|max:50',
            'zip_code' => 'required|numeric'
         ]);

         if ($validator->fails()) {
            return response()->json([
               'status' => 400,
               'errors' => $validator->messages()
            ]);
         } else {
            $address = new Address();
            
            $address->user_id = auth('sanctum')->user()->id;
            $address->first_name = $request->input('first_name');
            $address->last_name = $request->input('last_name');
            $address->phone = $request->input('phone');
            $address->email = $request->input('email');
            $address->address = $request->input('address');
            $address->city = $request->input('city');
            $address->state = $request->input('state');
            $address->zip_code = $request->input('zip_code');

            $address->save();

            return response()->json([
               'status' => 200,
               'message' => 'Address added successfuly.'
            ]);
         }
      } else {
         return response()->json([
            'status' => 401,
            'warning' => 'Unauthorized!'
         ]);
      }
   }


   // Edit Address
   public function edit($id)
   {
      if (auth('sanctum')->check()) {

         $address = Address::find($id);

         if ($address) {
            return response()->json([
               'status' => 200,
               'address' => $address
            ]);
         } else {
            return response()->json([
               'status' => 404,
               'error' => 'Address not found.'
            ]);
         }
      } else {
         return response()->json([
            'status' => 401,
            'warning' => 'Unauthorized!'
         ]);
      }
   }


   // Update Address
   public function update(Request $request, $id)
   {
      if (auth('sanctum')->check()) {
         $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:50',
            'last_name' => 'required|string|max:50',
            'email' => 'required|email|max:50',
            'phone' => 'required|numeric',
            'address' => 'required|string|max:255',
            'city' => 'required|string|max:50',
            'state' => 'required|string|max:50',
            'zip_code' => 'required|numeric'
         ]);

         if ($validator->fails()) {
            return response()->json([
               'status' => 400,
               'errors' => $validator->messages()
            ]);
         } else {
            $address = Address::find($id);
            if ($address) {
               $address->user_id = auth('sanctum')->user()->id;
               $address->first_name = $request->input('first_name');
               $address->last_name = $request->input('last_name');
               $address->phone = $request->input('phone');
               $address->email = $request->input('email');
               $address->address = $request->input('address');
               $address->city = $request->input('city');
               $address->state = $request->input('state');
               $address->zip_code = $request->input('zip_code');
               $address->save();

               return response()->json([
                  'status' => 200,
                  'message' => 'Address updated successfuly.'
               ]);
            } else {
               return response()->json([
                  'status' => 404,
                  'error' => 'Address not found.'
               ]);
            }
         }
      } else {
         return response()->json([
            'status' => 401,
            'warning' => 'Unauthorized!'
         ]);
      }
   }

}
