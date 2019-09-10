<?php

use Faker\Generator as Faker;
use Illuminate\Support\Facades\Hash;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(App\Hotel::class, function ( $faker) {

    $imgfeArray=array(
        $faker->image($dir = '/tmp', $width = 640, $height = 480),
        $faker->image($dir = '/tmp', $width = 640, $height = 480),
        $faker->image($dir = '/tmp', $width = 640, $height = 480),
        $faker->image($dir = '/tmp', $width = 640, $height = 480),
        $faker->image($dir = '/tmp', $width = 640, $height = 480)
    );
    $displayFileArray = implode(',', $imgfeArray);

    return [
        'propName' => $faker->company,
        'propDesc' => $faker->paragraph($nbSentences = 3, $variableNbSentences = true),
        'hotelEmail' => $faker->unique()->safeEmail,
        'propContact' => 0770543421,
        'propAddress' => $faker->address,
        'propPriceNew' => 1997,
        'propPriceOld' => 123,
        'propThumbImg' => $faker->image($dir = '/tmp', $width = 640, $height = 480),
        'start_date' => $faker->dateTime($max = 'now', $timezone = 'Asia/Colombo'),
        'propImages' => $displayFileArray,
    ];
});
