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
        $thumbImage = $addRequest->file('thumbImage');
        $displayImages = $addRequest->file('displayImage');
        $folder = '/uploads/images/';
        $thumbFilePath = null;

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

        $displayFileArray = implode(',', $displayFile);

        $currenthotel = Hotel::create([
            'hotelID' => $currntHotelID,
            'propName' => $addRequest->input('hotelName'),
            'propDesc' => $addRequest->input('hotelDesc'),
            'hotelEmail' => $addRequest->input('hotelEmail'),
            'propContact' => $addRequest->input('hotelContact'),
            'propAddress' => $addRequest->input('hotelAddress'),
            'propPriceNew' => $addRequest->input('hotelPrice'),
            'propPriceOld' => 123,
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
        if (!$input) {
            return DB::table('hotels')->select($dbAttribute)->where('hotelID', $currentHotelID)->first()->$dbAttribute;
        } else {
            return $input;
        }
    }

    /**
     * @param $input
     * @param $currentHotelID
     * @param $dbAttribute
     * @return mixed
     */
    //hilton-hotel_1
    private function updatingThumbImage($input, $currentHotelID, $dbAttribute, $dateTimeNow)
    {
        $oldPath = DB::table('hotels')->select($dbAttribute)->where('hotelID', $currentHotelID)->latest()->first()->$dbAttribute;
        $hotelName = DB::table('hotels')->select('propName')->where('hotelID', $currentHotelID)->first()->propName;
        $folder = '/uploads/images/';
        $thumbFilePath = null;

        if (!$input) {
            return $oldPath;
        } else {
//          Storage::disk('public')->makeDirectory('/uploads/'.$currentHotelID.' '.date('Y-m-d H:i:s'));
            $newPath = '/uploads/History/' . $currentHotelID . ' ' . date('Y-m-d H:i:s') . '/' . $hotelName . '_' . $currentHotelID . '.' . $input->getClientOriginalExtension();
            Storage::disk('public')->move($oldPath, $newPath);

            $lastRowID = DB::table('hotels')->where('hotelID', $currentHotelID)->select(DB::raw('MAX(`record_ID`) as val'))->get()->first()->val;
            DB::table('hotels')->where('record_ID', $lastRowID)
                ->update([
                    'propThumbImg' => $newPath,
                ]);

            if ($input) {
                $name = str_slug($hotelName) . '_' . $currentHotelID;
                $thumbFilePath = $folder . $name . '.' . $input->getClientOriginalExtension();
                $this->uploadOne($input, $folder, 'public', $name);
            }
            return $thumbFilePath;
        }

    }

    private function updatingDisplayImages($input, $currentHotelID, $dbAttribute, $dateTimeNow)
    {

        $oldPath = DB::table('hotels')->select($dbAttribute)->where('hotelID', $currentHotelID)->latest()->first()->$dbAttribute;
        $newPath=null;
        $hotelName = DB::table('hotels')->select('propName')->where('hotelID', $currentHotelID)->first()->propName;
        $folder = '/uploads/images/';
        $thumbFilePath = null;
        $historyImgArray = explode(",", $oldPath);
        $historyPath ='/uploads/History/';
        $displayFile = array();
        $arrOldPath= array();

        if (!$input) {
            return $oldPath;
        } else {
            foreach ($historyImgArray as $key => $file) {
                $newPath = '/uploads/History/' . $currentHotelID . ' ' . date('Y-m-d H:i:s') . '/' . $hotelName . '_' . $currentHotelID . '_' . $key . '.'.pathinfo($file, PATHINFO_EXTENSION);
                Storage::disk('public')->move($file, $newPath);
                $arrOldPath[]=$newPath;
            }

            $oldFileArray = implode(',', $arrOldPath);

            $lastRowID = DB::table('hotels')->where('hotelID', $currentHotelID)->select(DB::raw('MAX(`record_ID`) as val'))->get()->first()->val;
            DB::table('hotels')->where('record_ID', $lastRowID)
                ->update([
                    'propImages' => $oldFileArray,
                ]);

            if ($input) {
                foreach ($input as $key => $file) {
                    $name = str_slug($hotelName . '_' . $currentHotelID . '_' . $key);
                    $displayImagePath = $folder . $name . '.' . $file->getClientOriginalExtension();
                    $this->uploadOne($file, $folder, 'public', $name);
                    $displayFile[] = $displayImagePath;
                }
                $newFileArray = implode(',', $displayFile);
                return $newFileArray;
            }
        }
    }


    /**
     * @param $editRequest
     * @return string|null
     */
    public function editHotel($editRequest)
    {
        $currentHotelID = $editRequest->input('hotelId');
        $newhotelName = DB::table('hotels')->select('propName')->where('hotelID', $currentHotelID)->latest()->first()->propName;
        $newHotelAddress = DB::table('hotels')->select('propAddress')->where('hotelID', $currentHotelID)->latest()->first()->propAddress;
        $dateTimeNow=date('Y-m-d H:i:s');

        $lastRowID = DB::table('hotels')->where('hotelID', $currentHotelID)->select(DB::raw('MAX(`record_ID`) as val'))->get()->first()->val;
        DB::table('hotels')->where('record_ID', $lastRowID)
            ->update([
                'status' => 0,
                'current_flag' => 0,
                'end_date' => $dateTimeNow
            ]);

//        DB::raw('UPDATE `hotels` SET `status`=0, `current_flag`=0, `end_date`='2019-09-05 11:41:56' WHERE `hotelID` = 2 AND (SELECT MAX(`record_ID`) FROM hotels);');

        $currenthotel = Hotel::create([
            'hotelID' => $currentHotelID,
            'propName' => $newhotelName,
            'propDesc' => $this->setEditInput($editRequest->input('hotelDesc'), $currentHotelID, 'propDesc'),
            'hotelEmail' => $this->setEditInput($editRequest->input('hotelEmail'), $currentHotelID, 'hotelEmail'),
            'propContact' => $this->setEditInput($editRequest->input('hotelContact'), $currentHotelID, 'propContact'),
            'propAddress' => $newHotelAddress,
            'propPriceNew' => $this->setEditInput($editRequest->input('hotelPrice'), $currentHotelID, 'propPriceNew'),
            'propPriceOld' => 123,
            'propThumbImg' => $this->updatingThumbImage($editRequest->file('thumbImage'), $currentHotelID, 'propThumbImg', $dateTimeNow),
            'propImages' => $this->updatingDisplayImages($editRequest->file('displayImage'), $currentHotelID, 'propImages', $dateTimeNow),
            'start_date' => $dateTimeNow,
        ]);
//        $currenthotel->update(['current_flag' => 0,
//            'failed_login_count'=>++$noOfAttempt])->where;
//        DB::table('hotels')->select()->where('hotelID',$currentHotelID);

        return $currenthotel;

    }

    /**
     * @return mixed
     */
    public function getHotels()
    {
        $hotels = DB::table('hotels')->where('current_flag', 1)->orderBy('hotelID', 'asc')->get();
//        $hotels=$this->hotel::where('current_flag','=',1);

        return $hotels;
    }

    /**
     * @param $unPublishRequest
     * @return |null
     */
    public function unPublishHotel($unPublishRequest)
    {
        $response = null;
        $currentHotelID = $unPublishRequest->input('hotelId');
        $updateStatus = $unPublishRequest->input('updateStatus');
        if ($updateStatus == 'UnPublish') {
            $response = DB::table('hotels')->where([['current_flag', 1], ['hotelID', $currentHotelID]])->update(['status' => 0]);
        } else {
            $response = DB::table('hotels')->where([['current_flag', 1], ['hotelID', $currentHotelID]])->update(['status' => 1]);
        }
        return $response;
    }

}