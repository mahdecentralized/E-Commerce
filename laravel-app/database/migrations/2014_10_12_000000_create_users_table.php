<?php

use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
   /**
    * Run the migrations.
    *
    * @return void
    */
   public function up()
   {
      Schema::create('users', function (Blueprint $table) {
         $table->id();
         $table->string('first_name');
         $table->string('last_name');
         $table->string('email')->unique();
         $table->string('phone')->unique();
         $table->timestamp('email_verified_at')->nullable();
         $table->integer('role_as')->nullable()->default('0');
         $table->string('password');
         $table->string('image')->nullable()->default('uploads/default/user.png');
         $table->rememberToken();
         $table->timestamps();
      });

      $data = array(
         [
            'first_name' => 'FName',
            'last_name' => 'LName',
            'email' => 'admin@example.com',
            'phone' => '09121000000',
            'role_as' => '1',
            'password' => bcrypt('12345678')
         ],
         [
            'first_name' => 'FName',
            'last_name' => 'LName',
            'email' => 'user@example.com',
            'phone' => '09122000000',
            'role_as' => '0',
            'password' => bcrypt('12345678')
         ]
      );

      foreach ($data as $item) {
         $user = new User();
         $user->first_name = $item['first_name'];
         $user->last_name = $item['last_name'];
         $user->email = $item['email'];
         $user->phone = $item['phone'];
         $user->role_as = $item['role_as'];
         $user->password = $item['password'];
         $user->save();
      }
   }

   /**
    * Reverse the migrations.
    *
    * @return void
    */
   public function down()
   {
      Schema::dropIfExists('users');
   }
}
