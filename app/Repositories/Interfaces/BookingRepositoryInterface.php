<?php


namespace App\Repositories\Interfaces;


interface bookingRepositoryInterface
{
    public function reserveBooking($bookingRequest);

    public function viewBookings();

    public function verifyBooking();

    public function calcTotalPrice($checkinDate, $checkOutDate, $recordID, $numOfAdults, $numOfChild, $noOfRooms);

    public function getHotelCurrentBookings($hotelID);

    public function getHotelAllBookings($hotelID);

    public function getHotelApprovedBookings($hotelID);

    public function getHotelPendingBookings($hotelID);

    public function getHotelRejectedBookings($hotelID);

}