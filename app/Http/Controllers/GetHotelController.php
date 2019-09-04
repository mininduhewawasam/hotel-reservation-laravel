<?php

namespace App\Http\Controllers;

use App\Repositories\Interfaces\HotelRepositoryInterface;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;

class GetHotelController extends Controller
{
    protected $hotel;

    function __construct(HotelRepositoryInterface $hotel)
    {
        $this->hotel = $hotel;
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Http\RedirectResponse|\Illuminate\View\View
     */
    public function viewAllGetView()
    {

        try {
            $allHotels = $this->hotel->getHotels();
            if ($allHotels) {
                return view('admin.handleEventComponents.adminDashboard', compact('allHotels'));
            } else {
                return redirect('/manage_hotels/add_new')->with('regError', 'Please add records');
            }
        } catch (QueryException $e) {
            return redirect('/manage_hotels/add_new')->with('regError', 'Something went wrong,Please try again');
        } catch (\Exception $e) {
            return redirect('/manage_hotels/add_new')->with('regError', 'Something went wrong,Please try again');
        }

    }
}
