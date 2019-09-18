<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Hotel extends Model
{
    use Notifiable;

    protected $fillable = [
        'hotelID',
        'propName',
        'propDesc',
        'hotelEmail',
        'propContact',
        'propAddress',
        'propPriceNew',
        'propThumbImg',
        'propImages',
        'start_date',
        'status',
    ];

}
