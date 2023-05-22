<?php

use App\Models\Product;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
   /**
    * Run the migrations.
    *
    * @return void
    */
   public function up()
   {
      Schema::create('products', function (Blueprint $table) {
         $table->id();
         $table->integer('category_id');
         $table->string('slug');
         $table->string('name');
         $table->string('description')->nullable();
         $table->string('meta_title');
         $table->string('meta_keywords')->nullable();
         $table->string('meta_description')->nullable();
         $table->string('selling_price');
         $table->string('orginal_price');
         $table->string('quantity');
         $table->string('brand');
         $table->string('image')->nullable();
         $table->tinyInteger('featured')->default('0')->nullable();
         $table->tinyInteger('popular')->default('0')->nullable();
         $table->tinyInteger('status')->default('0');
         $table->timestamps();
      });

      $data = array(
         [
            'category_id' => '1',
            'slug' => 'iphone_14_pro',
            'name' => 'iPhone 14 Pro',
            'description' => 'This is description of iPhone 14 Pro',
            'meta_title' => 'iphone_14_pro',
            'meta_keywords' => 'iphone_14_pro',
            'meta_description' => 'This is meta description of iPhone 14 Pro',
            'selling_price' => '1099',
            'orginal_price' => '1199',
            'quantity' => '20',
            'brand' => 'Apple',
            'image' => 'uploads/product/iphone_14_pro.jpg',
         ],
         [
            'category_id' => '1',
            'slug' => 'iphone_14_plus',
            'name' => 'iPhone 14 Plus',
            'description' => 'This is description of iPhone 14 Plus',
            'meta_title' => 'iphone_14_plus',
            'meta_keywords' => 'iphone_14_plus',
            'meta_description' => 'This is meta description of iPhone 14 Plus',
            'selling_price' => '999',
            'orginal_price' => '1099',
            'quantity' => '20',
            'brand' => 'Apple',
            'image' => 'uploads/product/iphone_14_plus.jpg',
         ],
         [
            'category_id' => '2',
            'slug' => 'macbook_air',
            'name' => 'MacBook Air',
            'description' => 'This is description of MacBook Air',
            'meta_title' => 'macbook_air',
            'meta_keywords' => 'macbook_air',
            'meta_description' => 'This is meta description of MacBook Air',
            'selling_price' => '1199',
            'orginal_price' => '1299',
            'quantity' => '20',
            'brand' => 'Apple',
            'image' => 'uploads/product/macbook_air.jpg',
         ],
         [
            'category_id' => '2',
            'slug' => 'macbook_pro',
            'name' => 'MacBook Pro',
            'description' => 'This is description of MacBook Pro',
            'meta_title' => 'macbook_pro',
            'meta_keywords' => 'macbook_pro',
            'meta_description' => 'This is meta description of MacBook Pro',
            'selling_price' => '3699',
            'orginal_price' => '3899',
            'quantity' => '20',
            'brand' => 'Apple',
            'image' => 'uploads/product/macbook_pro.jpg',
         ],
         [
            'category_id' => '3',
            'slug' => 'apple_watch_ultra',
            'name' => 'Apple Watch Ultra',
            'description' => 'This is description of Apple Watch Ultra',
            'meta_title' => 'apple_watch_ultra',
            'meta_keywords' => 'apple_watch_ultra',
            'meta_description' => 'This is meta description of Apple Watch Ultra',
            'selling_price' => '799',
            'orginal_price' => '849',
            'quantity' => '20',
            'brand' => 'Apple',
            'image' => 'uploads/product/apple_watch_ultra.jpg',
         ],
         [
            'category_id' => '3',
            'slug' => 'apple_watch_series_8',
            'name' => 'Apple Watch Series 8',
            'description' => 'This is description of Apple Watch Series 8',
            'meta_title' => 'apple_watch_series_8',
            'meta_keywords' => 'apple_watch_series_8',
            'meta_description' => 'This is meta description of Apple Watch Series 8',
            'selling_price' => '449',
            'orginal_price' => '499',
            'quantity' => '20',
            'brand' => 'Apple',
            'image' => 'uploads/product/apple_watch_series_8.jpg',
         ]
      );

      foreach ($data as $item) {
         $product = new Product();
         $product->category_id = $item['category_id'];
         $product->slug = $item['slug'];
         $product->name = $item['name'];
         $product->description = $item['description'];
         $product->meta_title = $item['meta_title'];
         $product->meta_keywords = $item['meta_keywords'];
         $product->meta_description = $item['meta_description'];
         $product->selling_price = $item['selling_price'];
         $product->orginal_price = $item['orginal_price'];
         $product->quantity = $item['quantity'];
         $product->brand = $item['brand'];
         $product->image = $item['image'];
         $product->save();
      }
   }

   /**
    * Reverse the migrations.
    *
    * @return void
    */
   public function down()
   {
      Schema::dropIfExists('products');
   }
}
