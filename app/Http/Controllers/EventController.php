<?php

namespace App\Http\Controllers;

use App\Repositories\Interfaces\HotelRepositoryInterface;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class EventController extends Controller
{

    protected $hotel;

    function __construct(HotelRepositoryInterface $hotel)
    {
        $this->hotel = $hotel;
    }

//    /**
//     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
//     */
//    public function createEventGetView()
//    {
//        return view('admin.handleEventComponents.addEvent');
//    }

//    /**
//     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
//     */
//    public function editEventGetView()
//    {
//        $SearchResult = null;
//        $currentHotelID=null;
//        return view('admin.handleEventComponents.editHotel', compact('SearchResult','currentHotelID'));
//    }

//    /**
//     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Http\RedirectResponse|\Illuminate\View\View
//     */
//    public function viewAllGetView()
//    {
//
//        try {
//            $allHotels = $this->hotel->getHotels();
//            if ($allHotels) {
//                return view('admin.handleEventComponents.adminDashboard', compact('allHotels'));
//            } else {
//                return redirect('/manage_hotels/add_new')->with('regError', 'Please add records');
//            }
//        } catch (QueryException $e) {
//            return redirect('/manage_hotels/add_new')->with('regError', 'Something went wrong,Please try again');
//        } catch (\Exception $e) {
//            return redirect('/manage_hotels/add_new')->with('regError', 'Something went wrong,Please try again');
//        }
//
//    }

//    /**
//     * @param Request $request
//     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
//     */
//    public function createEvent(Request $request)
//    {
//        $request->validate
//        ([
//            'hotelName' => 'required',
//            'hotelDesc' => 'required|max:200',
//            'hotelAddress' => 'required',
//            'hotelEmail' => 'required|email',
//            'hotelContact' => 'required|numeric|digits:10',
//            'hotelPrice' => 'required|numeric',
//            'thumbImage' => 'required|image',
//            'displayImage.*' => 'required|image',
//        ]);
//
//        try {
//            $response = $this->hotel->addHotel($request);
//            if ($response) {
//                return redirect('/manage_hotels/add_new');
//            } else {
//                return redirect('/manage_hotels/add_new')->with('regError', 'Something went wrong,Please try again');
//            }
//        } catch (QueryException $e) {
//            return redirect('/manage_hotels/add_new')->with('regError', 'Something went wrong,Please try again');
//        } catch (\Exception $e) {
//            return redirect('/manage_hotels/add_new')->with('regError', 'Something went wrong,Please try again');
//        }
//    }

//    /**
//     * @param Request $request
//     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Http\RedirectResponse|\Illuminate\View\View
//     */
//    public function searchHotel(Request $request)
//    {
//
//        $request->validate([
//            'hotelId' => 'required|numeric',
//        ]);
//
//        try {
//            $SearchResult = $this->hotel->getEditHotel($request);
//            if ($SearchResult) {
//                $currentHotelID=$SearchResult->hotelID;
//                return view('admin.handleEventComponents.editHotel', compact('SearchResult','currentHotelID'));
//            } else {
//                return redirect('/manage_hotels/edit_hotel')->with('Error', 'Results not found');
//            }
//        } catch (QueryException $e) {
//            return redirect('/manage_hotels/edit_hotel')->with('Error', 'Something went wrong,Please try again');
//        } catch (\Exception $e) {
//            return redirect('/manage_hotels/edit_hotel')->with('Error', 'Something went wrong,Please try again');
//        }
//
//    }
//
//    public function makeUpdateHotel(Request $request)
//    {
//        $request->validate
//        ([
//            'hotelId'=>'required',
//            'hotelDesc' => 'nullable|max:200',
//            'hotelAddress' => 'nullable',
//            'hotelEmail' => 'nullable|email',
//            'hotelContact' => 'nullable|numeric|digits:10',
//            'hotelPrice' => 'nullable|numeric',
//            'thumbImage' => 'image',
//            'displayImage.*' => 'image',
//        ]);
//
//        $this->hotel->editHotel($request);
//    }

}
