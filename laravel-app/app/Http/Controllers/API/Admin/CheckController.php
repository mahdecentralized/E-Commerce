<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;

class CheckController extends Controller
{
   public function index()
   {
      return response()->json([
         'status' => 200,
         'message' => 'You are allowed.'
      ]);
   }
}
