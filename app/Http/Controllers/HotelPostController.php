<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HotelPostController extends Controller
{
    public function getPost(){
        return view('clientSide.hotelPost');
    }



}
