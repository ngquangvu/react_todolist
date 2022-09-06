<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use stdClass;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|min:4|max:20|unique:users',
            'name' => 'required|string|min:4|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:3',
            'password_confirmation' => 'required|string|same:password'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user = User::create([
            'name' => $request->name,
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        return response()
            ->json(['data' => $user]);
    }

    public function login(LoginRequest $request)
    {
        $request->validate([
            'username' => 'required',
            'password' => 'required'
        ]);
        $credentials = $request->getCredentials();
        // $credentials = $request->only('username', 'password');

        // return response()->json(['user' => $credentials]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            $user = new stdClass();
            $user->id = Auth::user()->id;
            $user->name = Auth::user()->name;
            $user->email = Auth::user()->email;
            $user->created_at = Auth::user()->created_at;
            $user->updated_at = Auth::user()->updated_at;
            $user->deleted_at = Auth::user()->deleted_at;

            return response()->json(['user' => $user]);
        }
        throw ValidationException::withMessages([
            'message' => ['入力したログイン情報が間違っています。'],
        ]);
    }

    // method for user logout and delete token
    public function logout(Request $request)
    {
        auth()->user()->tokens()->delete();
        $request->session()->invalidate();

        return [
            'message' => 'You have successfully logged out and the token was successfully deleted'
        ];
    }
}
