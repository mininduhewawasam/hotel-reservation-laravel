<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Bookings extends Model
{
    use Notifiable;


    protected $fillable = [
        'h_record_id',
        'guest_user_ID',
        'num_of_rooms',
        'check_in_date',
        'check_out_date',
        'no_of_adults',
        'no_of_children',
        'total_price',
        'client_sp_requests',
        'booking_status'
    ];
}
