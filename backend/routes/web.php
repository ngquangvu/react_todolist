<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use \App\Models\User;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('pages.top');
})->name('top');

Route::name('profile.')->prefix('profile')->middleware('auth')->group(function () {
    Route::get('/', function () {
        $user = Auth::user();
        return view('pages.profile', compact('user'));
    })->name('show');

    Route::get('/edit', function () {
        $user = Auth::user();
        return view('pages.profile-edit', compact('user'));
    })->name('edit');

    Route::get('/password', function () {
        return view('pages.profile-password');
    })->name('password');
});

Route::get('/home', function () {
    return view('welcome');
})->middleware('auth')->name('home');

Route::get('/dashboard', function () {
    return view('pages.dashboard');
})->middleware('verified')->name('dashboard');

Route::get('/home2', function () {
    return view('welcome');
})->middleware(['verified', 'password.confirm'])->name('home2');

Route::delete('/user', function (Request $request) {
    $user = User::find(Auth::user()->id);

    Auth::logout();
    $request->session()->invalidate();
    $request->session()->regenerateToken();

    if ($user->delete()) {
        return redirect('login')->with('status', 'Your account has been deleted!');
    }
})->middleware('auth', 'password.confirm')->name('profile.delete');
