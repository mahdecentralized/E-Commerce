<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{

   // View Categories
   public function index()
   {
      $categories = Category::all();

      return response()->json([
         'status' => 200,
         'categories' => $categories
      ]);
   }


   // Add Category
   public function store(Request $request)
   {
      $validator = Validator::make($request->all(), [
         'slug' => 'required|string|max:50',
         'name' => 'required|string|max:50',
         'meta_title' => 'required|string|max:50'
      ]);

      if ($validator->fails()) {
         return response()->json([
            'status' => 400,
            'errors' => $validator->messages()
         ]);
      } else {
         $category = new Category;

         $category->slug = $request->input('slug');
         $category->name = $request->input('name');
         $category->description = $request->input('description');
         $category->status = $request->input('status');
         $category->meta_title = $request->input('meta_title');
         $category->meta_keywords = $request->input('meta_keywords');
         $category->meta_description = $request->input('meta_description');

         $category->save();

         return response()->json([
            'status' => 200,
            'message' => 'Category added successfuly.'
         ]);
      }
   }


   // Edit Category
   public function edit($id)
   {
      $category = Category::find($id);

      if ($category) {
         return response()->json([
            'status' => 200,
            'category' => $category
         ]);
      } else {
         return response()->json([
            'status' => 404,
            'error' => 'Category not found.'
         ]);
      }
   }


   // Update Category
   public function update(Request $request, $id)
   {
      $validator = Validator::make($request->all(), [
         'slug' => 'required|string|max:50',
         'name' => 'required|string|max:50',
         'meta_title' => 'required|string|max:50'
      ]);

      if ($validator->fails()) {
         return response()->json([
            'status' => 400,
            'errors' => $validator->messages()
         ]);
      } else {
         $category = Category::find($id);

         if ($category) {
            $category->slug = $request->input('slug');
            $category->name = $request->input('name');
            $category->description = $request->input('description');
            $category->status = $request->input('status');
            $category->meta_title = $request->input('meta_title');
            $category->meta_keywords = $request->input('meta_keywords');
            $category->meta_description = $request->input('meta_description');

            $category->update();

            return response()->json([
               'status' => 200,
               'message' => 'Category updated successfuly.'
            ]);
         } else {
            return response()->json([
               'status' => 404,
               'error' => 'Category not found.'
            ]);
         }
      }
   }
   
}
