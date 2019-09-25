<?php


namespace App\Repositories;


use App\Repositories\Interfaces\bookingRepositoryInterface;

class BookingRepository implements bookingRepositoryInterface
{

    public function reserveBooking($bookingRequest)
    {
        dd('ffffff');
    }

    public function viewBookings()
    {
        // TODO: Implement viewBookings() method.
    }

    public function verifyBooking()
    {
        // TODO: Implement verifyBooking() method.
    }
}