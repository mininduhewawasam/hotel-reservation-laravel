<?php

namespace App\Http\Controllers;

use App\Repositories\Interfaces\HotelRepositoryInterface;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;

class UpdateHotelController extends Controller
{
    protected $hotel;

    function __construct(HotelRepositoryInterface $hotel)
    {
        $this->hotel = $hotel;
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function editEventGetView()
    {
        $SearchResult = null;
        $currentHotelID = null;
        return view('admin.handleEventComponents.editHotel', compact('SearchResult', 'currentHotelID'));
    }

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Http\RedirectResponse|\Illuminate\View\View
     */
    public function searchHotel(Request $request)
    {
        $request->validate([
            'hotelId' => 'required|numeric',
        ]);

        try {
            $SearchResult = $this->hotel->getEditHotel($request);
            if ($SearchResult) {
                $currentHotelID = $SearchResult->hotelID;

                $disImgArray = explode(",", $SearchResult->propImages);

                return view('admin.handleEventComponents.editHotel', compact('SearchResult', 'currentHotelID', 'disImgArray'));
            } else {
                return redirect('/manage_hotels/edit_hotel')->with('Error', 'Results not found');
            }
        } catch (QueryException $e) {
            return redirect('/manage_hotels/edit_hotel')->with('Error', 'Something went wrong,Please try again');
        } catch (\Exception $e) {
            return redirect('/manage_hotels/edit_hotel')->with('Error', 'Something went wrong,Please try again');
        }

    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function makeUpdateHotel(Request $request)
    {
        $request->validate
        ([
            'hotelId' => 'required',
            'hotelDesc' => 'nullable|max:200',
            'hotelAddress' => 'nullable',
            'hotelEmail' => 'nullable|email',
            'hotelContact' => 'nullable|numeric|digits:10',
            'hotelPrice' => 'nullable|numeric',
            'thumbImage' => 'nullable|image',
            'displayImage.*' => 'nullable|image',
        ]);

        if (
            !$request->input('hotelDesc') and
            !$request->input('hotelEmail') and
            !$request->input('hotelContact') and
            !$request->input('hotelPrice') and
            !$request->file('thumbImage') and
            !$request->file('displayImage')
        ) {
            return redirect('/manage_hotels/edit_hotel')->with('Error', 'Please Fill fields to be updated');
        } else {
            $response = $this->hotel->editHotel($request);
            if ($response) {
                return redirect('/manage_hotels/edit_hotel');
            }
        }
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function setHotelPublish(Request $request)
    {
        try {
            $response = $this->hotel->unPublishHotel($request);
            if ($response) {
                return redirect('/manage_hotels/edit_hotel');
            } else {
                return redirect('/manage_hotels/edit_hotel')->with('Error', 'Something went wrong');
            }
        } catch (QueryException $e) {
            return redirect('/manage_hotels/edit_hotel')->with('Error', 'Something went wrong,Please try again');
        } catch (\Exception $e) {
            return redirect('/manage_hotels/edit_hotel')->with('Error', 'Something went wrong,Please try again');
        }
    }
}
