<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBookingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->increments('booking_id');
            $table->integer('hotel_record_id');
            $table->integer('hotel_id');
            $table->integer('num_of_rooms');
            $table->integer('customer_id');
            $table->dateTime('check_in_date');
            $table->dateTime('check_out_date');
            $table->integer('no_of_adults');
            $table->integer('no_of_children');
            $table->integer('total_price');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('bookings');
    }
}
