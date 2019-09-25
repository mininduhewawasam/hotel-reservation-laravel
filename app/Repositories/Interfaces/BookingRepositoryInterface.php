<?php


namespace App\Repositories\Interfaces;


interface bookingRepositoryInterface
{
    public function reserveBooking($bookingRequest);

    public function viewBookings();

    public function verifyBooking();

}