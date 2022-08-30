<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function login(Request $request){
        if (!Auth::attempt($request->only('email', 'password')))
        {
            return response()
                ->json(['message' => 'Unauthorized'], 401);
        }

        $user = User::where('email', $request['email'])->firstOrFail();

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()
            ->json(['message' => $user->name,'status'=> true,'user'=>auth()->user()]);

    }

    public function register(Request $request){
        // dd($request->all());

        $validator = Validator::make($request->all(),[
            'username' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'phone' => 'required',
            'password' => 'required|string|min:4'
        ]);

        if($validator->fails()){
            return response()->json(['error' =>$validator->errors()],401);       
        }

        $user = User::create([
            'name' => $request->username,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => Hash::make($request->password)
         ]);

        // $token = $user->createToken('auth_token')->plainTextToken;

        //test
        // $user = User::find($id);
        // $user->restore();

        return response()->json(['data' => $user ]);
    }
 
    public function logout(Request $request)
    {
        auth('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response()->json(['status' => true, 'message' => 'logged out']);
    }
}
