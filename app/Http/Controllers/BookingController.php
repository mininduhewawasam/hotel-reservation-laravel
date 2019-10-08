<?php

namespace App\Http\Controllers;

use App\Repositories\Interfaces\bookingRepositoryInterface;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class BookingController extends Controller
{
    protected $booking;

    /***
     * BookingController constructor.
     * @param bookingRepositoryInterface $booking
     */
    public function __construct(bookingRepositoryInterface $booking)
    {
        $this->booking = $booking;
    }


    /***
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function getbookingPage()
    {
        return view('clientSide.currentBooking');
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

        try {
            $currentBooking = $this->booking->reserveBooking($request);
            if ($currentBooking) {
//                $request->session()->flash('bookConfirmMsg', 'Booking Success. You will receive a E-mail when you reservation is approved!');
                return redirect()->back();
            } else {
                $request->session()->flash('regError', 'Something went wrong,Please try again');
                return redirect::back();
            }
        } catch (QueryException $e) {
            $request->session()->flash('regError', 'Something went wrong,Please try again');
        } catch (\Exception $e) {
            $request->session()->flash('regError', 'Something went wrong,Please try again');
        }

    }
}
