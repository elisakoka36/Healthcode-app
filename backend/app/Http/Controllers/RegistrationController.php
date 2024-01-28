<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Auth\Events\Registered;

class RegistrationController extends Controller
{
    public function register(Request $request)
    {
        // Validate user data
        $validatedData = Validator::make($request->all(), [
            'email' => 'required|string|email|max:255|unique:users',
        ]);

        if ($validatedData->fails()) {
            return response()->json($validatedData->errors(), 400);
        }

        // Create user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        // Return response with user data (excluding sensitive information)
        return response()->json([
            'message' => 'User successfully registered',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email
                // Add more fields as needed, but exclude sensitive data like password
            ]
        ], 200);
    }
}
