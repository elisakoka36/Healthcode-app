<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reservation;
use Illuminate\Support\Facades\Auth;

class ReservationController extends Controller
{
    public function create(Request $request)
    {
        $data = $request->validate([
            'first_name' => 'required',
            'last_name' => 'required',
            'country' => 'required',
            'notes' => 'nullable',
        ]);

        $reservation = Auth::user()->reservations()->create($data);

        return response()->json($reservation, 201);
    }

    public function getUserReservations()
    {
        $reservations = Auth::user()->reservations;

        return response()->json($reservations);
    }
}
