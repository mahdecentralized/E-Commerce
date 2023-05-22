<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{

   // View Products
   public function index()
   {
      $products = Product::all();

      return response()->json([
         'status' => 200,
         'products' => $products
      ]);
   }


   // Add Product
   public function store(Request $request)
   {
      $validator = Validator::make($request->all(), [
         'category_id' => 'required',
         'slug' => 'required|string|max:50',
         'name' => 'required|string|max:50',
         'meta_title' => 'required|string|max:50',
         'brand' => 'required|string|max:50',
         'selling_price' => 'required|numeric',
         'orginal_price' => 'required|numeric',
         'quantity' => 'required|numeric',
         'image' => 'required|image|mimes:jpeg,png,jpg|max:2048'
      ]);

      if ($validator->fails()) {
         return response()->json([
            'status' => 400,
            'errors' => $validator->messages()
         ]);
      } else {
         $product = new Product;

         $product->category_id = $request->input('category_id');
         $product->slug = $request->input('slug');
         $product->name = $request->input('name');
         $product->description = $request->input('description');
         $product->meta_title = $request->input('meta_title');
         $product->meta_keywords = $request->input('meta_keywords');
         $product->meta_description = $request->input('meta_description');
         $product->selling_price = $request->input('selling_price');
         $product->orginal_price = $request->input('orginal_price');
         $product->quantity = $request->input('quantity');
         $product->brand = $request->input('brand');
         if ($request->hasFile('image')) {
            $file = $request->file('image');
            $extension = $file->getClientOriginalName();
            $fileName = time().'.'.$extension;
            $file->move('uploads/product/', $fileName);
            $product->image = 'uploads/product/'.$fileName;
         }
         $product->featured = $request->input('featured');
         $product->popular = $request->input('popular');
         $product->status = $request->input('status');

         $product->save();

         return response()->json([
            'status' => 200,
            'message' => 'Product Added Successfuly.'
         ]);
      }
   }


   // Edit Product
   public function edit($id)
   {
      $product = Product::find($id);

      if ($product) {
         return response()->json([
            'status' => 200,
            'product' => $product
         ]);
      } else {
         return response()->json([
            'status' => 404,
            'error' => 'Product not found.'
         ]);
      }
   }


   // Update Product
   public function update(Request $request, $id)
   {
      $validator = Validator::make($request->all(), [
         'category_id' => 'required',
         'slug' => 'required|string|max:50',
         'name' => 'required|string|max:50',
         'meta_title' => 'required|string|max:50',
         'brand' => 'required|string|max:50',
         'selling_price' => 'required|numeric',
         'orginal_price' => 'required|numeric',
         'quantity' => 'required|numeric'
      ]);

      if ($validator->fails()) {
         return response()->json([
            'status' => 400,
            'errors' => $validator->messages()
         ]);
      } else {
         $product = Product::find($id);

         if ($product) {
            $product->category_id = $request->input('category_id');
            $product->slug = $request->input('slug');
            $product->name = $request->input('name');
            $product->description = $request->input('description');
            $product->meta_title = $request->input('meta_title');
            $product->meta_keywords = $request->input('meta_keywords');
            $product->meta_description = $request->input('meta_description');
            $product->selling_price = $request->input('selling_price');
            $product->orginal_price = $request->input('orginal_price');
            $product->quantity = $request->input('quantity');
            $product->brand = $request->input('brand');
            if ($request->hasFile('image')) {
               $path = $product->image;
               if(File::exists($path)) {
                  File::delete($path);
               }
               $file = $request->file('image');
               $extension = $file->getClientOriginalName();
               $fileName = time().'.'.$extension;
               $file->move('uploads/product/', $fileName);
               $product->image = 'uploads/product/'.$fileName;
            }
            $product->featured = $request->input('featured');
            $product->popular = $request->input('popular');
            $product->status = $request->input('status');

            $product->update();

            return response()->json([
               'status' => 200,
               'message' => 'Product Updated Successfuly.'
            ]);
         } else {
            return response()->json([
               'status' => 404,
               'error' => 'Product not found.'
            ]);
         }
      }
   }

   // View Name Gactegory
   public function categories()
   {
      $categories = Category::where('status', '0')->get();
      return response()->json([
         'status' => 200,
         'categories' => $categories
      ]);
   }

}
