<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class addHotelTest extends TestCase
{
    use DatabaseMigrations;

    /**
     * A basic test example.
     *
     * @return void
     */
    public function testBasicTest()
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    public function testAddNewRecord()
    {
        Storage::fake('public');

        $imageArray=array(UploadedFile::fake()->image('avatar1.jpg'),UploadedFile::fake()->image('avatar2.jpg'));

        $hoteName='fdzadfadf';
        $timeUpload=time();

        $this->post('/manage_hotels/add_new',[
            'hotelName'=>$hoteName,
            'hotelDesc'=>'ffffffffffffff',
            'hotelAddress'=>'dasdsadasdsd',
            'hotelEmail'=>'minidnu@gmail.com',
            'hotelContact'=>'0770543421',
            'hotelPrice'=>'212',
            'thumbImage'=>UploadedFile::fake()->image('avatar.jpg'),
            'displayImage'=>$imageArray,

        ])->assertStatus(302);

        $this->assertDatabaseHas('hotels',[
            'propName'=>$hoteName,
        ]);
    }
}
