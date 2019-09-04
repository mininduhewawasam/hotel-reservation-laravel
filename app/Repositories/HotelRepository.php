<?php


namespace App\Repositories;


use App\Hotel;
use App\Repositories\Interfaces\HotelRepositoryInterface;
use App\Traits\UploadTrait;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class HotelRepository implements HotelRepositoryInterface
{

    protected $hotel;
    use UploadTrait;

    /**
     * HotelRepository constructor.
     * @param Hotel $hotel
     */
    function __construct(Hotel $hotel)
    {
        $this->hotel = $hotel;
    }

    /**
     * @param $addRequest
     * @return mixed
     */
    public function addHotel($addRequest)
    {
        $currntHotelID = $this->hotel::max('hotelID') + 1;
        $thumbImage=$addRequest->file('thumbImage');
        $displayImages=$addRequest->file('displayImage');
        $folder = '/uploads/images/';

        if ($thumbImage) {
            $name = str_slug($addRequest->input('hotelName')) . '_' . $currntHotelID;
            $thumbFilePath = $folder . $name . '.' . $thumbImage->getClientOriginalExtension();
            $this->uploadOne($thumbImage, $folder, 'public', $name);
        }

        $displayFile = array();
        if ($displayImages) {

            foreach ($displayImages as $key => $file) {
                $name = str_slug($addRequest->input('hotelName')) . '_' . $currntHotelID . '_' . $key;
                $displayImagePath = $folder . $name . '.' . $file->getClientOriginalExtension();
                $this->uploadOne($file, $folder, 'public', $name);
                $displayFile[] = $displayImagePath;
            }
        }

        $displayFileArray = implode(',',$displayFile);

        $currenthotel = Hotel::create([
            'hotelID' => $currntHotelID,
            'propName' => $addRequest->input('hotelName'),
            'propDesc' => $addRequest->input('hotelDesc'),
            'hotelEmail' => $addRequest->input('hotelEmail'),
            'propContact' => $addRequest->input('hotelContact'),
            'propAddress' => $addRequest->input('hotelAddress'),
            'propPriceNew' => 123,
            'propPriceOld' => $addRequest->input('hotelPrice'),
            'propThumbImg' => $thumbFilePath,
            'start_date' => date('Y-m-d H:i:s'),
            'propImages' => $displayFileArray,
        ]);

        return $currenthotel;
    }

    /**
     * @param $searchRequest
     * @return mixed
     */
    public function getEditHotel($searchRequest)
    {
        $serchHotelID = $searchRequest->input('hotelId');
        $resultHotel = $this->hotel::where('hotelID', '=', $serchHotelID)->latest()->first();
        return $resultHotel;
    }

    private function setEditInput($input, $currentHotelID, $dbAttribute)
    {
        if(!$input){
            return DB::table('hotels')->select($dbAttribute)->where('hotelID', $currentHotelID)->first()->$dbAttribute;
        }else{
            return $input;
        }
    }

    /**
     * @param $input
     * @param $currentHotelID
     * @param $dbAttribute
     * @return mixed
     */
    private function updatingImages($input, $currentHotelID, $dbAttribute)
    {
        $oldPath=DB::table('hotels')->select($dbAttribute)->where('hotelID', $currentHotelID)->first()->$dbAttribute;

        if(!$input){
            dd('ff');
            return $oldPath;
        }else{
            $oldPath->move('./'.$oldPath, '/uploads/'.date('Y-m-d H:i:s').'file1.jpg');
            return $input;
        }

    }

    /**
     * @param $editRequest
     * @return string|null
     */
    public function editHotel($editRequest)
    {
        $currentHotelID=$editRequest->input('hotelId');
        $newhotelName=DB::table('hotels')->select('propName')->where('hotelID', $currentHotelID)->first()->propName;
        $newHotelAddress=DB::table('hotels')->select('propAddress')->where('hotelID', $currentHotelID)->first()->propAddress;


        DB::table('hotels')->select(DB::raw('MAX(`record_ID`)'))->where('hotelID',1)
        ->update([
                'status'=>0,
                'current_flag'=>0,
                'end_date'=>date('Y-m-d H:i:s')
            ]);


            $currenthotel = Hotel::create([
                'hotelID' => $currentHotelID,
                'propName' => $newhotelName,
                'propDesc' => $this->setEditInput($editRequest->input('hotelDesc'),$currentHotelID,'propDesc'),
                'hotelEmail' => $this->setEditInput($editRequest->input('hotelEmail'),$currentHotelID,'hotelEmail'),
                'propContact' => $this->setEditInput($editRequest->input('hotelContact'),$currentHotelID,'propContact'),
                'propAddress' => $newHotelAddress,
                'propPriceNew' => $this->setEditInput($editRequest->input('hotelPrice'),$currentHotelID,'propPriceNew'),
                'propPriceOld' => 123,
                'propThumbImg' => $this->updatingImages($editRequest->file('thumbImage'),$currentHotelID,'propThumbImg'),
                'propImages' => $this->updatingImages($editRequest->file('displayImage'),$currentHotelID,'propImages'),
                'start_date' => date('Y-m-d H:i:s'),
            ]);

//        $currenthotel->update(['current_flag' => 0,
//            'failed_login_count'=>++$noOfAttempt])->where;
//        DB::table('hotels')->select()->where('hotelID',$currentHotelID)

        return  $currenthotel;

    }

    /**
     * @return mixed
     */
    public function getHotels()
    {
        $hotels = DB::table('hotels')->where('current_flag', 1)->orderBy('hotelID','asc')->get();
//        $hotels=$this->hotel::where('current_flag','=',1);

        return $hotels;
    }

    /**
     * @param $unPublishRequest
     * @return |null
     */
    public function unPublishHotel($unPublishRequest)
    {
        $response=null;
        $currentHotelID=$unPublishRequest->input('hotelId');
        $updateStatus=$unPublishRequest->input('updateStatus');
        if ($updateStatus=='UnPublish'){
            $response=DB::table('hotels')->where([['current_flag', 1],['hotelID',$currentHotelID]])->update(['status'=>0]);
        }else{
            $response=DB::table('hotels')->where([['current_flag', 1],['hotelID',$currentHotelID]])->update(['status'=>1]);
        }
        return $response;
    }


}