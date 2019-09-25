<?php

namespace App\Http\Controllers;

use App\Repositories\Interfaces\bookingRepositoryInterface;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    protected $booking;

    /***
     * BookingController constructor.
     * @param bookingRepositoryInterface $booking
     */
    public function __construct( bookingRepositoryInterface $booking)
    {
        $this->booking = $booking;
    }

    /***
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function getbookingPage()
    {

        $checkinDate = null;
        $checkOutDate = null;
        $noOfAdults = null;
        $noOfChildren = null;
        $noOfRooms = null;

        return view('clientSide.currentBooking', compact('checkinDate',
            'noOfAdults',
            'noOfChildren',
            'noOfRooms'
        ));
    }

    /***
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function confirmReserve(Request $request)
    {
        $request->validate
        ([
            'guestFirstName' => 'required',
            'GuestLastName' => 'required',
            'guestEmail' => 'required',
            'guestContactNo' => 'required',
            'specialRequests' => 'nullable',
        ]);

        $currentBooking=$this->booking->reserveBooking($request);

        if ($currentBooking){
            return redirect('/');
        }

    }
}
