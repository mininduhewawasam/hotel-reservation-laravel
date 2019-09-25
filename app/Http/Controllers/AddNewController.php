<?php

namespace App\Http\Controllers;

use App\Repositories\Interfaces\HotelRepositoryInterface;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;

class AddNewController extends Controller
{
    protected $hotel;

    function __construct(HotelRepositoryInterface $hotel)
    {
        $this->hotel = $hotel;
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function createEventGetView()
    {
        return view('admin.handleEventComponents.addEvent');
    }


    /**
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function createEvent(Request $request)
    {
        $request->validate
        ([
            'hotelName' => 'required',
            'hotelDesc' => 'required|max:1000',
            'hotelAddress' => 'required',
            'hotelEmail' => 'required|email',
            'hotelContact' => 'required|numeric|digits:10',
            'hotelPrice' => 'required|numeric',
            'thumbImage' => 'required|image',
            'displayImage.*' => 'required|image',
        ]);

        try {
            $response = $this->hotel->addHotel($request);
            if ($response) {
                return redirect('/manage_hotels/add_new');
            } else {
                return redirect('/manage_hotels/add_new')->with('regError', 'Something went wrong,Please try again');
            }
        } catch (QueryException $e) {
            return redirect('/manage_hotels/add_new')->with('regError', 'Something went wrong,Please try again');
        } catch (\Exception $e) {
            return redirect('/manage_hotels/add_new')->with('regError', 'Something went wrong,Please try again');
        }
    }

}
