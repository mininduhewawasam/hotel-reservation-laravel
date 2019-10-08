<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Client extends Model
{
    use Notifiable;

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'contact_number',
    ];

    public function booking()
    {
        return $this->hasOne('App\booking');
    }
}

