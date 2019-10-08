<?php

namespace App\Http\Controllers;

use App\Repositories\Interfaces\HotelRepositoryInterface;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;

class HistoryEditController extends Controller
{

    protected $hotel;

    /***
     * HistoryEditController constructor.
     * @param HotelRepositoryInterface $hotel
     */
    function __construct(HotelRepositoryInterface $hotel)
    {
        $this->hotel = $hotel;
    }

    /***
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function editHistoryGetView()
    {
        $SearchResult = null;
        $currentHotelID = null;
        $historyRecord = null;
        return view('admin.handleEventComponents.HistoryEditHotel', compact('SearchResult', 'currentHotelID', 'historyRecord'));
    }

    /***
     * @param Request $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Http\RedirectResponse|\Illuminate\View\View
     */
    public function searchHotel(Request $request)
    {
        $request->validate([
            'hotelId' => 'required|numeric',
        ]);

        try {
            $SearchResult = $this->hotel->getHistoryHotel($request);
            if (!$SearchResult->isEmpty()) {
//                dd($SearchResult);
//                $currentHotelID = $SearchResult->hotelID;
//                $disImgArray = explode(",", $SearchResult->propImages);
                $historyRecord = null;
                return view('admin.handleEventComponents.HistoryEditHotel', compact('SearchResult', 'historyRecord'));
            } else {
                return redirect('/manage_hotels/edit_history')->with('Error', 'Results not found');
            }
        } catch (QueryException $e) {
            return redirect('/manage_hotels/edit_history')->with('Error', 'Something went wrong,Please try again');
        } catch (\Exception $e) {
            return redirect('/manage_hotels/edit_history')->with('Error', 'Something went wrong,Please try again');
        }

    }

    /***
     * @param Request $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Http\RedirectResponse|\Illuminate\View\View
     */
    public function getHistoryHotel(Request $request)
    {
        $request->validate([
            'historyDate' => 'required',
        ]);

        try {
            $historyRecord = $this->hotel->getHistoryData($request);
            if ($historyRecord) {
//                dd($historyRecord->end_date);
                $currentHotelID = $historyRecord->hotelID;
                $disImgArray = explode(",", $historyRecord->propImages);
                $SearchResult = null;
                return view('admin.handleEventComponents.HistoryEditHotel', compact('historyRecord', 'currentHotelID', 'disImgArray', 'SearchResult'));
            } else {
                return redirect('/manage_hotels/edit_history')->with('Error', 'Results not found');
            }
        } catch (QueryException $e) {
            return redirect('/manage_hotels/edit_history')->with('Error', 'Something went wrong,Please try again');
        } catch (\Exception $e) {
            return redirect('/manage_hotels/edit_history')->with('Error', 'Something went wrong,Please try again');
        }
    }

    /***
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function revertHotelHistory(Request $request)
    {
        $request->validate
        ([
//            'hotelId' => 'required',
//            'hotelDesc' => 'nullable|max:200',
//            'hotelAddress' => 'nullable',
//            'hotelEmail' => 'nullable|email',
//            'hotelContact' => 'nullable|numeric|digits:10',
//            'hotelPrice' => 'nullable|numeric',
//            'thumbImage' => 'nullable|image',
//            'displayImage.*' => 'nullable|image',
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
            $response = $this->hotel->historyRevertBack($request);
            if ($response) {
                return redirect('/manage_hotels/edit_hotel');
            }
        }
    }
}
