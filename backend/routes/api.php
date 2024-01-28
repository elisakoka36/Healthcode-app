<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\OrderController;




/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('/products', [ProductController::class, 'index']);
Route::post('/register', [RegistrationController::class, 'register']);
Route::post('/login', [LoginController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/reservations', [ReservationController::class, 'create']);
    Route::get('/reservations', [ReservationController::class, 'getUserReservations']);
    Route::post('/orders', [OrderController::class, 'createOrder']);
});
Route::middleware('auth:sanctum')->get('/orders', [OrderController::class, 'getUserOrders']);


Route::post('/products', [ProductController::class, 'store']);
