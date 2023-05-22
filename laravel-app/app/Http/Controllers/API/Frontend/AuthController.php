<?php

namespace App\Http\Controllers\API\Frontend;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{

   // Register
   public function register(Request $request)
   {
      $validator = Validator::make($request->all(), [
         'first_name' => 'required|string|max:50',
         'last_name' => 'required|string|max:50',
         'email' => 'required|email|unique:users,email|max:50',
         'phone' => 'required|numeric|unique:users,phone',
         'password' => 'required|min:8|confirmed'
      ]);

      if ($validator->fails()) {
         return response()->json([
            'status' => 400,
            'errors' => $validator->messages()
         ]);
      } else {
         $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => bcrypt($request->password)
         ]);

         if ($user->role_as == 1) {
            $role = 'admin';
            $token = $user->createToken($user->email . '_AdminToken', ['server:admin'])->plainTextToken;
         } else {
            $role = '';
            $token = $user->createToken($user->email . '_Token', [''])->plainTextToken;
         }

         return response()->json([
            'status' => 200,
            'message' => 'Registered Successfuly.',
            'username' => $user->email,
            'token' => $token,
            'role' => $role
         ]);
      }
   }


   // Login
   public function login(Request $request)
   {
      $validator = Validator::make($request->all(), [
         'email' => 'required|email',
         'password' => 'required'
      ]);

      if ($validator->fails()) {
         return response()->json([
            'status' => 400,
            'errors' => $validator->messages()
         ]);
      } else {
         $user = User::where('email', $request->email)->first();

         if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
               'status' => 401,
               'warning' => 'Unauthorized!'
            ]);
         } else {
            if ($user->role_as == 1) {
               $role = 'admin';
               $token = $user->createToken($user->email . '_AdminToken', ['server:admin'])->plainTextToken;
            } else {
               $role = '';
               $token = $user->createToken($user->email . '_Token', [''])->plainTextToken;
            }

            return response()->json([
               'status' => 200,
               'message' => 'Logged in successfuly.',
               'username' => $user->email,
               'token' => $token,
               'role' => $role
            ]);
         }
      }
   }


   // Logout
   public function logout()
   {
      auth()->user()->tokens()->delete();

      return response()->json([
         'status' => 200,
         'message' => 'Logged out successfuly.'
      ]);
   }
   
}
