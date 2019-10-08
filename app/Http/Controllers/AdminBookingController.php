<?php

namespace App\Http\Controllers;

use App\Repositories\Interfaces\bookingRepositoryInterface;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;

class adminBookingController extends Controller
{
    protected $bookings;

    public function __construct(bookingRepositoryInterface $bookings)
    {
        $this->bookings=$bookings;
    }

    public function getView(){
        $bookingList = null;

        return view('admin.handleEventComponents.adminViewBookings', compact('bookingList'));
    }

    public function getSearchBooking(Request $request){

        $searchHotelID=$request->input('hotelId');

        try {
            $bookingList=$this->bookings->getHotelCurrentBookings($searchHotelID);
            if ($bookingList) {
                return view('admin.handleEventComponents.adminViewBookings', compact('bookingList'));
            } else {
                return redirect('/manage_hotels/current_bookings')->with('Error', 'Results not found');
            }
        } catch (QueryException $e) {
            return redirect('/manage_hotels/current_bookings')->with('Error', 'Something went wrong,Please try again');
        } catch (\Exception $e) {
            return redirect('/manage_hotels/current_bookings')->with('Error', 'Something went wrong,Please try again');
        }

    }

}
