<?php

namespace App\Http\Controllers\API\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;

class CollectionController extends Controller
{

   // View Categories Collection
   public function categories()
   {
      $categories = Category::where('status', '0')->get();

      return response()->json([
         'status' => 200,
         'categories' => $categories
      ]);
   }


   // View Products/slug
   public function products($slug)
   {
      $category = Category::where('slug', $slug)->where('status', '0')->first();

      if ($category) {
         $products = Product::where('category_id', $category->id)->where('status', '0')->get();

         if ($products) {
            return response()->json([
               'status' => 200,
               'product_data' => [
                  'products' => $products,
                  'category' => $category
               ]
            ]);
         }
      } else {
         return response()->json([
            'status' => 404,
            'error' => 'Category not found.'
         ]);
      }
   }

   
   // View Product/slug Details
   public function product($category_slug, $product_slug)
   {
      $category = Category::where('slug', $category_slug)->where('status', '0')->first();

      if ($category) {
         $product = Product::where('category_id', $category->id)->where('slug', $product_slug)->where('status', '0')->first();
         
         if ($product) {
            return response()->json([
               'status' => 200,
               'product' => $product
            ]);
         }
      } else {
         return response()->json([
            'status' => 404,
            'error' => 'Category not found.'
         ]);
      }
   }
}
