<?php

namespace App\Http\Controllers;

use App\Repositories\Interfaces\bookingRepositoryInterface;
use App\Repositories\Interfaces\HotelRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;

class HotelPostController extends Controller
{
    protected $hotel;
    protected $booking;

    /***
     * HotelPostController constructor.
     * @param HotelRepositoryInterface $hotel
     * @param bookingRepositoryInterface $booking
     */
    public function __construct(HotelRepositoryInterface $hotel , bookingRepositoryInterface $booking)
    {
        $this->hotel = $hotel;
        $this->booking= $booking;
    }

    /***
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function getPost()
    {
        $hotelPost = null;
        $currentHotelID = null;
        $disImgArray = null;
        return view('clientSide.hotelPost', compact('hotelPost', 'currentHotelID', 'disImgArray'));
    }

    /***
     * @param Request $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function reserveNow(Request $request)
    {
        $request->validate
        ([
            'checkInDate' => 'required',
            'checkOutDate' => 'required',
            'noOfAdults' => 'required',
            'noOfChildren' => 'nullable',
            'noOfRooms' => 'required',
        ]);
        $checkinDate = $request->input('checkInDate');
        $checkOutDate = $request->input('checkOutDate');
        $noOfAdults = $request->input('noOfAdults');
        $noOfChildren = $request->input('noOfChildren');
        $noOfRooms = $request->input('noOfRooms');
        $hotelRecordID = $request->input('hotel_record_ID');
        $priceTotal=$this->booking->calcTotalPrice($checkinDate, $checkOutDate, $hotelRecordID, $noOfAdults, $noOfChildren, $noOfRooms);

        if ($request) {
            if (($checkinDate <= date("Y-m-d"))) {
                $request->session()->flash('contError', 'Invalid checkin date');
                return redirect::back();
            } elseif (($checkinDate >= $checkOutDate)) {
                $request->session()->flash('contError', 'Invalid checkout date');
                return redirect::back();
            } else {
                Session::put('bookingData', ['checkinDate' => $checkinDate,
                    'checkOutDate' => $checkOutDate,
                    'noOfAdults' => $noOfAdults,
                    'noOfChildren' => $noOfChildren,
                    'noOfRooms' => $noOfRooms,
                    'hotelRecordID' => $hotelRecordID,
                    'totalPrice'=>$priceTotal
                ]);
                return view('clientSide.currentBooking');
            }
        }
    }

}
