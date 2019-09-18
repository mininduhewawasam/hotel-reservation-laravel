<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class editHotelTest extends TestCase
{
    use DatabaseMigrations;


//$hoteName='fdzadfadf';
//$timeUpload=time();
//
//$this->post('/manage_hotels/add_new',[
//'hotelName'=>$hoteName,
//'hotelDesc'=>'ffffffffffffff',
//'hotelAddress'=>'dasdsadasdsd',
//'hotelEmail'=>'minidnu@gmail.com',
//'hotelContact'=>'0770543421',
//'hotelPrice'=>'212',
//'thumbImage'=>UploadedFile::fake()->image('avatar.jpg'),
//'displayImage'=>$imageArray,
//
//])->assertStatus(302);

//    public function test_add_hotel()
//    {
//
//        $description = 'ffffffffffffff';
//
//        $this->post('/manage_hotels/edit_hotel', [
//            'hotelId' => '1'
//        ])
//            ->assertStatus(302);
//
//        $this->get('/manage_hotels/edit_hotel')
//            ->assertStatus(200)
//            ->assertSeeText('ID');
//
//        $this->post('/manage_hotels/update_hotel', [
//            'hotelDesc' => $description,
//        ]);
//
//        $this->assertDatabaseHas('hotels', [
//                'propDesc' => $description
//            ]
//        );
//    }

    public function test_update_Hotel_Description()
    {
        Storage::fake('public');

        $imageArray = array(UploadedFile::fake()->image('avatar1.jpg'), UploadedFile::fake()->image('avatar2.jpg'));

        $hoteName = 'fdzadfadf';
        $timeUpload = time();

        $this->post('/manage_hotels/add_new', [
            'hotelName' => $hoteName,
            'hotelDesc' => 'ggggggggg',
            'hotelAddress' => 'dasdsadasdsd',
            'hotelEmail' => 'minidnu@gmail.com',
            'hotelContact' => '0770543421',
            'hotelPrice' => '212',
            'thumbImage' => UploadedFile::fake()->image('avatar.jpg'),
            'displayImage' => $imageArray,

        ])->assertStatus(302);

        $this->assertDatabaseHas('hotels', [
            'propName' => $hoteName,
        ]);

        $description = 'ffffffffffffff';

        $this->post('/manage_hotels/edit_hotel', [
            'hotelId' => '1'
        ])
            ->assertStatus(200)->assertSeeText($hoteName);

        $this->get('/manage_hotels/edit_hotel')
            ->assertStatus(200)
            ->assertSeeText('ID');

        $this->post('/manage_hotels/update_hotel', [
            'hotelDesc' => $description,
        ])
            ->assertStatus(302)
            ->assertRedirect('/manage_hotels/edit_hotel');

        $this->get('/manage_hotels/edit_hotel')
            ->assertStatus(200);

        $this->assertDatabaseHas('hotels', [
                'propDesc' => $description
            ]
        );
    }

    public function test_update_email()
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

        $email='minidnu@ontervest.lk';

        $this->post('/manage_hotels/edit_hotel',[
            'hotelId'=>'1'
        ])
            ->assertStatus(200);

        $this->get('/manage_hotels/edit_hotel')
            ->assertStatus(200)
            ->assertSeeText('ID');

        $this->post('/manage_hotels/update_hotel',[
            'hotelEmail'=>$email,
        ]);

        $this->assertDatabaseHas('hotels',[
                'hotelEmail'=>$email
            ]
        );

    }
//
//    public function test_update_contact(){
//
//    }
//
//    public function test_update_price(){
//
//    }
//
//    public function test_update_thumbImage(){
//
//    }
//
//    public function test_update_displayImage(){
//
//    }
//
//    public function test_make_unpublish_hotel(){
//
//    }
//
//    public function test_make_publish_hotel(){
//
//    }
//
//    public function test_update_(){
//
//    }
//
//    public function test_update_(){
//
//    }
//
//    public function test_update_(){
//
//    }
}
