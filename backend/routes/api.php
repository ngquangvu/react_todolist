<?php

use App\Http\Controllers\TestController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });


Route::apiResource('test', TestController::class);
Route::post('/test/restore',[UserController::class,'restore']);

Route::post('/register',[UserController::class,'register']);
Route::post('/login',[UserController::class,'login']);
Route::post('/logout',[UserController::class,'logout']);