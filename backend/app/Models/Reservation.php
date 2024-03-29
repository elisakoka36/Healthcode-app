<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    protected $fillable = ['user_id', 'first_name', 'last_name', 'country', 'notes'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
