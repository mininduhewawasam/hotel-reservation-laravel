<?php

namespace App\Http\Controllers;

use App\Repositories\Interfaces\HotelRepositoryInterface;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;

class HomePageController extends Controller
{
    protected $hotel;

    function __construct(HotelRepositoryInterface $hotel)
    {
        $this->hotel=$hotel;
    }

    public function getHomePage(){
        $hotelList=$this->hotel->getHotels();
        $hotelNames=array();
        foreach ($hotelList as $hotelName){
            $hotelNames[]=$hotelName->propName;
        }
        $jsArray=json_encode($hotelNames);
        return view('clientSide.home',compact('hotelNames','jsArray'));
    }

    public function clientSearch(Request $request){
        $request->validate([
            'hotelName' => 'required',
        ]);

        try {
            $hotelPost = $this->hotel->getHotelPost($request);
            if ($hotelPost) {
                $currentHotelID = $hotelPost->hotelID;
                $disImgArray = explode(",", $hotelPost->propImages);
                return view('clientSide.hotelPost', compact('hotelPost','currentHotelID','disImgArray'));
//                return redirect('/hotel_post')->with([$hotelPost,'currentHotelID'=>$currentHotelID,'disImgArray'=>$disImgArray]);
            } else {
                return redirect('/')->with('Error', 'Results not found');
            }
        } catch (QueryException $e) {
            return redirect('/')->with('Error', 'Something went wrong,Please try again');
        } catch (\Exception $e) {
            return redirect('/')->with('Error', 'Something went wrong,Please try again');
        }
    }
    //
}
