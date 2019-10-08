<?php

namespace App\Providers;

use App\Repositories\Interfaces\bookingRepositoryInterface;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind('App\Repositories\Interfaces\HotelRepositoryInterface','App\Repositories\HotelRepository');
        $this->app->bind('App\Repositories\Interfaces\bookingRepositoryInterface','App\Repositories\BookingRepository');
    }
}
