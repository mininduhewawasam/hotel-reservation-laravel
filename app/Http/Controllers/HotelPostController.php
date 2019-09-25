<?php

namespace App\Http\Controllers;

use App\Repositories\Interfaces\HotelRepositoryInterface;
use Illuminate\Http\Request;

class HotelPostController extends Controller
{
    protected $hotel;

    public function __construct(HotelRepositoryInterface $hotel)
    {
        $this->hotel=$hotel;
    }
    public function getPost(){
        $hotelPost=null;
        $currentHotelID=null;
        $disImgArray=null;
        return view('clientSide.hotelPost',compact('hotelPost','currentHotelID','disImgArray'));
    }

    public function reserveNow(Request $request){
        $request->validate
        ([
            'checkInDate' => 'required',
            'checkOutDate' => 'required',
            'noOfAdults' => 'required',
            'noOfChildren' => 'nullable',
            'noOfRooms' => 'required',
        ]);
        $checkinDate=$request->input('checkInDate');
        $checkOutDate=$request->input('checkOutDate');
        $noOfAdults=$request->input('noOfAdults');
        $noOfChildren=$request->input('noOfChildren');
        $noOfRooms=$request->input('noOfRooms');


        if ($request){
            return view('clientSide.currentBooking',
                compact('checkinDate',
                                'checkOutDate',
                                'noOfAdults',
                                'noOfChildren',
                                'noOfRooms'
                        ));
        }
    }


}
