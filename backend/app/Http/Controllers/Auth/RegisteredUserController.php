<?php

namespace App\Http\Controllers\Auth;

// use App\Http\Controllers\Controller;
use Illuminate\Routing\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class RegisteredUserController extends Controller
{
    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
public function store(Request $request): Response
{
    $request->validate([
        'first_name' => ['required', 'string', 'max:255'],
        'last_name' => ['required', 'string', 'max:255'],
        'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:' . User::class],
        'phone_number' => ['required', 'string', 'max:255'],
        'birthday' => ['required', 'string', 'max:255'],
        'password' => ['required', 'confirmed', Rules\Password::defaults()],
    ]);

    $user = User::create([
        'first_name' => $request->first_name,
        'last_name' => $request->last_name,
        'email' => $request->email,
        'phone_number' => $request->phone_number,
        'birthday' => $request->birthday,
        'password' => Hash::make($request->password),
    ]);

    // Return a JSON response with a success message
    return response()->json(['message' => 'User registered successfully'], 200);
}

    
}
