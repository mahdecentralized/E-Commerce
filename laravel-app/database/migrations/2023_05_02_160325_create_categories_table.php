<?php

use App\Models\Category;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCategoriesTable extends Migration
{
   /**
    * Run the migrations.
    *
    * @return void
    */
   public function up()
   {
      Schema::create('categories', function (Blueprint $table) {
         $table->id();
         $table->string('slug');
         $table->string('name');
         $table->string('description')->nullable();
         $table->string('meta_title');
         $table->string('meta_keywords')->nullable();
         $table->string('meta_description')->nullable();
         $table->tinyInteger('status')->default('0');
         $table->timestamps();
      });

      $data = array(
         [
            'slug' => 'mobile',
            'name' => 'Mobile',
            'description' => 'This is description of Mobile',
            'meta_title' => 'mobile',
            'meta_keywords' => 'mobile',
            'meta_description' => 'This is meta description of Mobile'
         ],
         [
            'slug' => 'laptop',
            'name' => 'Laptop',
            'description' => 'This is description of Laptop',
            'meta_title' => 'laptop',
            'meta_keywords' => 'laptop',
            'meta_description' => 'This is meta description of Laptop'
         ],
         [
            'slug' => 'watch',
            'name' => 'Watch',
            'description' => 'This is description of Watch',
            'meta_title' => 'watch',
            'meta_keywords' => 'watch',
            'meta_description' => 'This is meta description of Watch'
         ]
      );

      foreach ($data as $item) {
         $category = new Category();
         $category->slug = $item['slug'];
         $category->name = $item['name'];
         $category->description = $item['description'];
         $category->meta_title = $item['meta_title'];
         $category->meta_keywords = $item['meta_keywords'];
         $category->meta_description = $item['meta_description'];
         $category->save();
      }
   }

   /**
    * Reverse the migrations.
    *
    * @return void
    */
   public function down()
   {
      Schema::dropIfExists('categories');
   }
}
