<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateHotelsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('hotels', function (Blueprint $table) {
            $table->increments('record_ID');
            $table->integer('hotelID')->notNullValue();
            $table->string('propName')->notNullValue();//make unique
            $table->longText('propDesc')->notNullValue();
            $table->string('hotelEmail')->notNullValue();
            $table->string('propContact')->notNullValue();
            $table->string('propAddress')->notNullValue();
            $table->integer('propPriceNew')->notNullValue();
            $table->string('propThumbImg')->notNullValue();
            $table->longText('propImages')->notNullValue();
            $table->dateTime('start_date');
            $table->dateTime('end_date')->nullable();
            $table->integer('status')->default(1);
            $table->integer('current_flag')->default(1);

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
        Schema::dropIfExists('hotels');
    }
}
