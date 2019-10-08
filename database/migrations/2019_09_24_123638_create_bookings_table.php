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
            $table->integer('h_record_id')->notNullValue()->unsigned();
            $table->integer('guest_user_ID')->unsigned();
            $table->integer('num_of_rooms')->unsigned();
            $table->dateTime('check_in_date')->notNullValue();
            $table->dateTime('check_out_date')->notNullValue();
            $table->integer('no_of_adults')->notNullValue()->unsigned();
            $table->integer('no_of_children')->default(0);
            $table->integer('total_price')->notNullValue()->unsigned();
            $table->longText('client_sp_requests')->nullable();
            $table->boolean('booking_status')->default(false);
            $table->timestamps('');

            $table->foreign('h_record_id')
                ->references('record_ID')
                ->on('hotels');
            $table->foreign('guest_user_ID')
                ->references('client_id')
                ->on('clients');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->dropForeign('bookings_h_record_id_foreign');
            $table->dropForeign('bookings_guest_user_ID_foreign');

        });


        Schema::dropIfExists('bookings');
    }
}
