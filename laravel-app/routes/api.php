<?php

// Admin
use App\Http\Controllers\API\Admin\CheckController;
use App\Http\Controllers\API\Admin\CategoryController;
use App\Http\Controllers\API\Admin\ProductController;
use App\Http\Controllers\API\Admin\OrderController;

// Frontend
use App\Http\Controllers\API\Frontend\HomeController;
use App\Http\Controllers\API\Frontend\AuthController;
use App\Http\Controllers\API\Frontend\CollectionController;
use App\Http\Controllers\API\Frontend\CartController;
use App\Http\Controllers\API\Frontend\CheckoutController;
use App\Http\Controllers\API\Frontend\AddressController;
use App\Http\Controllers\API\Frontend\UserController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


// ** Frontend
// User
Route::get('view-user-details', [HomeController::class, 'user']);

// Products
Route::get('frontend-view-products', [HomeController::class, 'products']);


// ** Auth
// Register
Route::post('register', [AuthController::class, 'register']);

// Login
Route::post('login', [AuthController::class, 'login']);

// Logout
Route::middleware('auth:sanctum')->post('logout', [AuthController::class, 'logout']);


// ** Collection
// View Categories Collection
Route::get('categories-collection', [CollectionController::class, 'categories']);

// View Products/slug
Route::get('products-collection/{slug}', [CollectionController::class, 'products']);

// View Product/slug Details
Route::get('view-product-details/{category_slug}/{product_slug}', [CollectionController::class, 'product']);


// ** Order
// ** Cart
// View Cart
Route::get('view-cart', [CartController::class, 'index']);

// Add Cart
Route::post('add-cart', [CartController::class, 'store']);

// Update Cart
Route::put('update-quantity/{cart_id}/{scpoe}', [CartController::class, 'update']);

// Delete Cart
Route::delete('delete-cart/{cart_id}', [CartController::class, 'destroy']);


// ** Checkout
// Place Order
Route::post('place-order', [CheckoutController::class, 'store']);


// ** Address
// Add Address
Route::post('add-address', [AddressController::class, 'store']);

// View Addresses
Route::get('view-addresses', [AddressController::class, 'index']);

// Edit Address
Route::get('edit-address/{id}', [AddressController::class, 'edit']);

// Update Address
Route::post('update-address/{id}', [AddressController::class, 'update']);


// ** User
// View Orders
Route::get('view-orders', [UserController::class, 'orders']);

// View Order Items
Route::get('view-order-items/{id}', [UserController::class, 'orderItems']);

// Edit Profile
Route::get('edit-profile', [UserController::class, 'edit']);

// Update Profile
Route::post('update-profile', [UserController::class, 'update']);

// Delete Profile Image
Route::post('delete-profile-image', [UserController::class, 'destroy']);


// ** Admin
Route::prefix('admin')->group(function () {
   Route::middleware(['auth:sanctum', 'isAPIAdmin'])->group(function () {

      // ** Check
      Route::get('check', [CheckController::class, 'index']);


      // ** Category
      // Add Category
      Route::post('add-category', [CategoryController::class, 'store']);

      // View Categories
      Route::get('view-categories', [CategoryController::class, 'index']);

      // Edit Category
      Route::get('edit-category/{id}', [CategoryController::class, 'edit']);

      // Update Category
      Route::post('update-category/{id}', [CategoryController::class, 'update']);


      // ** Product
      // Add Product
      Route::post('add-product', [ProductController::class, 'store']);

      // View Products
      Route::get('view-products', [ProductController::class, 'index']);

      // Edit Product
      Route::get('edit-product/{id}', [ProductController::class, 'edit']);

      // Update Product
      Route::post('update-product/{id}', [ProductController::class, 'update']);

      // View Name Gactegory
      Route::get('view-name-categories', [ProductController::class, 'categories']);


      // ** Order
      // View Orders
      Route::get('view-orders', [OrderController::class, 'orders']);

      // View Order Items
      Route::get('view-order-items/{id}', [OrderController::class, 'orderItems']);
   });
});


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
   return $request->user();
});
