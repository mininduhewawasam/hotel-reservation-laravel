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
            $name = $addRequest->input('hotelName') . '_' . $currntHotelID;
            $thumbFilePath = $folder . $name . '.' . $thumbImage->getClientOriginalExtension();
            $this->uploadOne($thumbImage, $folder, 'public', $name);
        }

        $displayFile = array();
        if ($displayImages) {
            foreach ($displayImages as $key => $file) {
                $name = $addRequest->input('hotelName') . '_' . $currntHotelID . '_' . $key;
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
     * @param $editRequest
     * @return string|null
     */
    public function editHotel($editRequest)
    {
        $currentHotelID = $editRequest->input('hotelId');
        $newhotelName = DB::table('hotels')->select('propName')->where('hotelID', $currentHotelID)->latest()->first()->propName;
        $newHotelAddress = DB::table('hotels')->select('propAddress')->where('hotelID', $currentHotelID)->latest()->first()->propAddress;
        $dateTimeNow = date('Y-m-d H:i:s');

        $lastRowID = DB::table('hotels')->where('hotelID', $currentHotelID)->select(DB::raw('MAX(`record_ID`) as val'))->get()->first()->val;
        DB::table('hotels')->where('record_ID', $lastRowID)
            ->update([
                'status' => 0,
                'current_flag' => 0,
                'end_date' => $dateTimeNow
            ]);

        $currenthotel = Hotel::create([
            'hotelID' => $currentHotelID,
            'propName' => $newhotelName,
            'propDesc' => $this->setEditInput($editRequest->input('hotelDesc'), $currentHotelID, 'propDesc'),
            'hotelEmail' => $this->setEditInput($editRequest->input('hotelEmail'), $currentHotelID, 'hotelEmail'),
            'propContact' => $this->setEditInput($editRequest->input('hotelContact'), $currentHotelID, 'propContact'),
            'propAddress' => $newHotelAddress,
            'propPriceNew' => $this->setEditInput($editRequest->input('hotelPrice'), $currentHotelID, 'propPriceNew'),
            'propThumbImg' => $this->updatingThumbImage($editRequest->file('thumbImage'), $currentHotelID, 'propThumbImg', $dateTimeNow),
            'propImages' => $this->updatingDisplayImages($editRequest->file('displayImage'), $currentHotelID, 'propImages', $dateTimeNow),
            'start_date' => $dateTimeNow,
        ]);

        return $currenthotel;

    }

    /**
     * @return mixed
     */
    public function getHotels()
    {
        $hotels = DB::table('hotels')->where('current_flag', 1)->orderBy('hotelID', 'asc')->get();
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

    /***
     * @param $searchHisRequest
     * @return mixed
     */
    public function getHistoryHotel($searchHisRequest)
    {
        $currentHotel = $searchHisRequest->input('hotelId');
        $historyDate = $this->hotel::where('hotelID', '=', $currentHotel)->whereNotNull('end_date')->get();
        return $historyDate;
    }

    public function getHistoryData($historyDataRequest)
    {
        $currentHistoryId = $historyDataRequest->input('historyDate');
        $historyRecord = $this->hotel::where('record_ID', '=', $currentHistoryId)->first();
        return $historyRecord;
    }

    /***
     * @param $revertBackRequest
     * @return mixed
     */
    public function historyRevertBack($revertBackRequest)
    {
        $currentHotelID = $revertBackRequest->input('hotelId');
        $currentRecordID = $revertBackRequest->input('recordID');
        $hotelName = DB::table('hotels')->select('propName')->where('hotelID', $currentHotelID)->latest()->first()->propName;
        $newHotelAddress = DB::table('hotels')->select('propAddress')->where('hotelID', $currentHotelID)->latest()->first()->propAddress;
        $dateTimeNow = date('Y-m-d H:i:s');

        $lastRowID = DB::table('hotels')->where('hotelID', $currentHotelID)->select(DB::raw('MAX(`record_ID`) as val'))->get()->first()->val;
        DB::table('hotels')->where('record_ID', $lastRowID)
            ->update([
                'status' => 0,
                'current_flag' => 0,
                'end_date' => $dateTimeNow
            ]);

        $currentHotel = Hotel::create([
            'hotelID' => $currentHotelID,
            'propName' => $hotelName,
            'propDesc' => $this->setEditInput($revertBackRequest->input('hotelDesc'), $currentHotelID, 'propDesc'),
            'hotelEmail' => $this->setEditInput($revertBackRequest->input('hotelEmail'), $currentHotelID, 'hotelEmail'),
            'propContact' => $this->setEditInput($revertBackRequest->input('hotelContact'), $currentHotelID, 'propContact'),
            'propAddress' => $newHotelAddress,
            'propPriceNew' => $this->setEditInput($revertBackRequest->input('hotelPrice'), $currentHotelID, 'propPriceNew'),
            'propThumbImg' => $this->revertThumbImg($revertBackRequest->input('thumbImage'), $currentHotelID, $currentRecordID, 'propThumbImg', $dateTimeNow),
            'propImages' => $this->revertDisplayImages($revertBackRequest->input('displayImage'), $currentHotelID, 'propImages', $dateTimeNow),
            'start_date' => $dateTimeNow,
        ]);

        return $currentHotel;
    }


    /**
     * @param $input
     * @param $currentHotelID
     * @param $dbAttribute
     * @return mixed
     */
    private function updatingThumbImage($input, $currentHotelID, $dbAttribute, $dateTimeNow)
    {
        $oldPath = DB::table('hotels')->select($dbAttribute)->where('hotelID', $currentHotelID)->latest()->first()->$dbAttribute;
        $hotelName = DB::table('hotels')->select('propName')->where('hotelID', $currentHotelID)->first()->propName;
        $folder = '/uploads/images/';
        $thumbFilePath = null;
        $extension = pathinfo(storage_path($oldPath), PATHINFO_EXTENSION);
        $lastRowID = DB::table('hotels')->where('hotelID', $currentHotelID)->select(DB::raw('MAX(`record_ID`) as val'))->get()->first()->val;

        if (!$input) {
            $newPath = '/uploads/History/' . $currentHotelID . ' ' . $dateTimeNow . '/' . $hotelName . '_' . $currentHotelID . '.' . $extension;
            Storage::disk('public')->copy($oldPath, $newPath);

            DB::table('hotels')->where('record_ID', $lastRowID)
                ->update([
                    'propThumbImg' => $newPath,
                ]);

            return $oldPath;
        } else {
            $newPath = '/uploads/History/' . $currentHotelID . ' ' . $dateTimeNow . '/' . $hotelName . '_' . $currentHotelID . '.' . $extension;
            Storage::disk('public')->move($oldPath, $newPath);

            DB::table('hotels')->where('record_ID', $lastRowID)
                ->update([
                    'propThumbImg' => $newPath,
                ]);

            if ($input) {
                $name = $hotelName . '_' . $currentHotelID;
                $thumbFilePath = $folder . $name . '.' . $input->getClientOriginalExtension();
                $this->uploadOne($input, $folder, 'public', $name);
            }
            return $thumbFilePath;
        }

    }

    /***
     * @param $input
     * @param $currentHotelID
     * @param $dbAttribute
     * @param $dateTimeNow
     * @return string
     */
    private function updatingDisplayImages($input, $currentHotelID, $dbAttribute, $dateTimeNow)
    {

        $oldPath = DB::table('hotels')->select($dbAttribute)->where('hotelID', $currentHotelID)->latest()->first()->$dbAttribute;
        $newPath = null;
        $hotelName = DB::table('hotels')->select('propName')->where('hotelID', $currentHotelID)->first()->propName;
        $folder = '/uploads/images/';
//        $thumbFilePath = null;
        $historyImgArray = explode(",", $oldPath);
        $historyPath = '/uploads/History/';
        $displayFile = array();
        $arrOldPath = array();
        $lastRowID = DB::table('hotels')->where('hotelID', $currentHotelID)->select(DB::raw('MAX(`record_ID`) as val'))->get()->first()->val;

        if (!$input) {
            foreach ($historyImgArray as $key => $file) {
                $newPath = $historyPath . $currentHotelID . ' ' . $dateTimeNow . '/' . $hotelName . '_' . $currentHotelID . '_' . $key . '.' . pathinfo($file, PATHINFO_EXTENSION);
                Storage::disk('public')->copy($file, $newPath);
                $arrOldPath[] = $newPath;
            }
            $displayImgArray = implode(',', $arrOldPath);

            DB::table('hotels')->where('record_ID', $lastRowID)
                ->update([
                    'propImages' => $displayImgArray,
                ]);
            return $oldPath;
        } else {
            foreach ($historyImgArray as $key => $file) {
                $newPath = '/uploads/History/' . $currentHotelID . ' ' . $dateTimeNow . '/' . $hotelName . '_' . $currentHotelID . '_' . $key . '.' . pathinfo($file, PATHINFO_EXTENSION);
                Storage::disk('public')->move($file, $newPath);
                $arrOldPath[] = $newPath;
            }

            $displayImgArray = implode(',', $arrOldPath);

            DB::table('hotels')->where('record_ID', $lastRowID)
                ->update([
                    'propImages' => $displayImgArray,
                ]);

            if ($input) {
                foreach ($input as $key => $file) {
                    $name = $hotelName . '_' . $currentHotelID . '_' . $key;
                    $displayImagePath = $folder . $name . '.' . $file->getClientOriginalExtension();
                    $this->uploadOne($file, $folder, 'public', $name);
                    $displayFile[] = $displayImagePath;
                }
                $displayImgArray = implode(',', $displayFile);
            }
            return $displayImgArray;
        }
    }


    /***
     * @param $input
     * @param $currentHotelID
     * @param $recordID
     * @param $dbAttribute
     * @param $dateTimeNow
     * @return string|null
     */
    private function revertThumbImg($input, $currentHotelID, $recordID, $dbAttribute, $dateTimeNow)
    {
        $currentPath = DB::table('hotels')->select($dbAttribute)->where('hotelID', $currentHotelID)->latest()->first()->$dbAttribute;
        $hotelName = DB::table('hotels')->select('propName')->where('hotelID', $currentHotelID)->first()->propName;
        $folder = '/uploads/images/';
        $thumbFilePath = null;
        $extension = pathinfo(storage_path($currentPath), PATHINFO_EXTENSION);
        $lastRowID = DB::table('hotels')->where('hotelID', $currentHotelID)->select(DB::raw('MAX(`record_ID`) as val'))->get()->first()->val;

        if ($input) {
            $newPath = '/uploads/History/' . $currentHotelID . ' ' . $dateTimeNow . '/' . $hotelName . '_' . $currentHotelID . '.' . $extension;
            Storage::disk('public')->move($currentPath, $newPath);

            DB::table('hotels')->where('record_ID', $lastRowID)
                ->update([
                    'propThumbImg' => $newPath,
                ]);

            if ($input) {
                $name = $hotelName . '_' . $currentHotelID;
                $thumbFilePath = $folder . $name . '.' . pathinfo(storage_path($input), PATHINFO_EXTENSION);
                Storage::disk('public')->copy($input, $thumbFilePath);
            }
            return $thumbFilePath;
        }
    }

    /***
     * @param $input
     * @param $currentHotelID
     * @param $dbAttribute
     * @param $dateTimeNow
     * @return string
     */
    private function revertDisplayImages($input, $currentHotelID, $dbAttribute, $dateTimeNow)
    {
        $oldPath = DB::table('hotels')->select($dbAttribute)->where('hotelID', $currentHotelID)->latest()->first()->$dbAttribute;
        $newPath = null;
        $hotelName = DB::table('hotels')->select('propName')->where('hotelID', $currentHotelID)->first()->propName;
        $folder = '/uploads/images/';
        $thumbFilePath = null;
        $currentImgArray = explode(",", $oldPath);
        $historyImgArray = explode(",", $input);
        $historyPath = '/uploads/History/';
        $displayFile = array();
        $arrOldPath = array();
        $lastRowID = DB::table('hotels')->where('hotelID', $currentHotelID)->select(DB::raw('MAX(`record_ID`) as val'))->get()->first()->val;

        if ($input) {
            foreach ($currentImgArray as $key => $file) {
                $newPath = $historyPath . $currentHotelID . ' ' . $dateTimeNow . '/' . $hotelName . '_' . $currentHotelID . '_' . $key . '.' . pathinfo($file, PATHINFO_EXTENSION);
                Storage::disk('public')->move($file, $newPath);
                $arrOldPath[] = $newPath;
            }

            $displayImgArray = implode(',', $arrOldPath);

            DB::table('hotels')->where('record_ID', $lastRowID)
                ->update([
                    'propImages' => $displayImgArray,
                ]);

            if ($input) {
                foreach ($historyImgArray as $key => $file) {
                    $name = $hotelName . '_' . $currentHotelID . '_' . $key;
                    $displayImagePath = $folder . $name . '.' . pathinfo(storage_path($file), PATHINFO_EXTENSION);
                    Storage::disk('public')->copy($file, $displayImagePath);
                    $displayFile[] = $displayImagePath;
                }
                $displayImgArray = implode(',', $displayFile);
            }
            return $displayImgArray;
        }

    }

    public function getHotelPost($searchRequest)
    {
        $serchHotelName = $searchRequest->input('hotelName');
        $resultHotel = $this->hotel::where('propName', '=', $serchHotelName)->latest()->first();
        return $resultHotel;
    }
}