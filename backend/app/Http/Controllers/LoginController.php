<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Laravel\Sanctum\HasApiTokens;

class LoginController extends Controller
{
    use HasApiTokens;

    public function login(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (!auth()->attempt($request->only('email', 'password'))) {
            return response()->json([
                'message' => 'Invalid login credentials',
            ], 401);
        }

        $token = $request->user()->createToken('api_token')->plainTextToken;

        return response()->json([
            'message' => 'Successfully logged in',
            'token' => $token,
            'is_admin' => $request->user()->is_admin
        ]);
    }
}
