<?php


namespace App\Repositories;


use App\Bookings;
use App\Client;
use App\Hotel;
use App\Repositories\Interfaces\bookingRepositoryInterface;
use Illuminate\Support\Facades\DB;

class BookingRepository implements bookingRepositoryInterface
{
    /***
     *
     */
    private function getBookingData()
    {

    }

    /***
     * @param $recordID
     * @param $attribute
     * @return mixed
     */
    private function getHotelData($recordID, $attribute)
    {
        return DB::table('hotels')->select($attribute)->where('record_ID', '=', $recordID)->latest()->first()->$attribute;
    }

    /***
     * @param $bookingRequest
     * @return mixed
     */
    public function reserveBooking($bookingRequest)
    {
        $noOfChild = null;
        $clientFName = $bookingRequest->input('guestFirstName');
        $clientLName = $bookingRequest->input('GuestLastName');
        $clientEMail = $bookingRequest->input('guestEmail');
        $clientContactNo = $bookingRequest->input('guestContactNo');


        $currentClient = $this->saveClientDate($clientFName, $clientLName, $clientEMail, $clientContactNo);
//        dd(Client::where('client_id',$currentClient->first_name));
        $hotelRecordID = $bookingRequest->input('hotelRecordID');
//        $pricePerUnit = DB::table('hotels')->select('propPriceNew')->where('record_ID', '=', $hotelRecordID)->latest()->first()->propPriceNew;
        $guestID = $currentClient->id;
        $noOfRooms = $bookingRequest->input('noOfRooms');
        $checkInDate = $bookingRequest->input('checkInDate');
        $checkOutDate = $bookingRequest->input('checkOutDate');
        $noOfAdults = $bookingRequest->input('noOfAdults');
        $noOfChild = $bookingRequest->input('noOfChildren');
        $clientDescription = $bookingRequest->input('specialRequests');

        if ($currentClient) {
            $totalPrice = $this->calcTotalPrice($checkInDate, $checkOutDate, $hotelRecordID, $noOfAdults, $noOfChild, $noOfRooms);
            if ($noOfChild == null) {
                $noOfChild = 0;
            }

            $currentBooking=$this->saveBookingData($hotelRecordID,
                $guestID,
                $noOfRooms,
                $checkInDate,
                $checkOutDate,
                $noOfAdults,
                $noOfChild,
                $totalPrice,
                $clientDescription
            );

            return $currentBooking;
        }
    }

    /***
     * @param $fName
     * @param $lName
     * @param $eMail
     * @param $contactNo
     * @return mixed
     */
    private function saveClientDate($fName, $lName, $eMail, $contactNo)
    {
        $currentClient = Client::create([
            'first_name' => $fName,
            'last_name' => $lName,
            'email' => $eMail,
            'contact_number' => $contactNo,
        ]);

        return $currentClient;
    }

    /***
     * @param $checkinDate
     * @param $checkOutDate
     * @param $recordID
     * @param $numOfAdults
     * @param $numOfChild
     * @param $noOfRooms
     * @return string
     */
    public function calcTotalPrice($checkinDate, $checkOutDate, $recordID, $numOfAdults, $numOfChild, $noOfRooms)
    {

        $numOfNights = strtotime($checkOutDate) - strtotime($checkinDate);
        $numOfNights = round($numOfNights / (60 * 60 * 24));
        $totalPrice = $numOfNights * $this->getHotelData($recordID, 'propPriceNew')*$noOfRooms;
        return number_format((float)$totalPrice, 2, '.', '');
    }

    /***
     * @param $hotelRecordID
     * @param $guestID
     * @param $noOfRooms
     * @param $checkInDate
     * @param $checkOutDate
     * @param $noOfAdults
     * @param $noOfChild
     * @param $totalPrice
     * @param $clientDescription
     * @return mixed
     */
    private function saveBookingData($hotelRecordID, $guestID, $noOfRooms, $checkInDate, $checkOutDate, $noOfAdults, $noOfChild, $totalPrice, $clientDescription)
    {
        $currentBooking = Bookings:: create([
            'h_record_id' => $hotelRecordID,
            'guest_user_ID' => $guestID,
            'num_of_rooms' => $noOfRooms,
            'check_in_date' => $checkInDate,
            'check_out_date' => $checkOutDate,
            'no_of_adults' => $noOfAdults,
            'no_of_children' => $noOfChild,
            'total_price' => $totalPrice,
            'client_sp_requests' => $clientDescription,
            'booking_status' => 0
        ]);
        return $currentBooking;


    }


    /***
     * @param $hotelID
     * @return mixed
     */
    public function getHotelCurrentBookings($hotelID)
    {
        $hotelRecordID=$this->getHotelData($hotelID,'record_ID');
        $bookings= DB::table('bookings')->where([['check_in_date','>', date('Y-m-d H:i:s')],['h_record_id','=',$hotelRecordID],])->orderBy('booking_id', 'dsc')->get();
        return $bookings;
    }

    /***
     *
     */
    public function viewBookings()
    {
        // TODO: Implement viewBookings() method.
    }

    /***
     *
     */
    public function verifyBooking()
    {
        // TODO: Implement verifyBooking() method.
    }

    public function getHotelAllBookings($hotelID)
    {
        // TODO: Implement getHotelAllBookings() method.
    }

    public function getHotelApprovedBookings($hotelID)
    {
        // TODO: Implement getHotelApprovedBookings() method.
    }

    public function getHotelPendingBookings($hotelID)
    {
        // TODO: Implement getHotelPendingBookings() method.
    }

    public function getHotelRejectedBookings($hotelID)
    {
        // TODO: Implement getHotelRejectedBookings() method.
    }
}