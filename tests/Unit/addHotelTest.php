<?php

namespace Tests\Unit;

use App\Repositories\Interfaces\HotelRepositoryInterface;
use Illuminate\Http\UploadedFile;
use Mockery;
use Tests\TestCase;
use Illuminate\Support\Facades\Storage;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class manageEventTest extends TestCase
{

    protected $hotelRepo;

    public function tearDown(){
        parent::tearDown();
        Mockery::close();
    }

    public function setUp(){
        parent::setUp();
        $this->mock();
    }


    public function mock(){
        $this->hotelRepo = Mockery::mock(HotelRepositoryInterface::class);
        $this->app->instance(HotelRepositoryInterface::class, $this->hotelRepo);
    }


    public function test_add_hotel_with_all_data(){
//        $this->userLogsRepo = Mockery::mock(UserRepositoryInterface::class);

        $message='';
        $status =true;
        $userID ='3';
        $userFName ='Minindu';


        $this->hotelRepo->shouldReceive('addHotel')->once()
            ->andReturn('fffffggggg');

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

//        $this->assertDatabaseHas('hotels',[
//            'propName'=>$hoteName,
//        ]);
    }

//manage hotel data-------------------------------------------------------------------------------------------------
    public function test_get_view(){
        $this->get('/manage_hotels/add_new')->assertStatus(200);
    }

    public function test_Add_New_Property(){
        $this->post('/manage_hotels/add_new',[
            'hotelName'=>'adasdsad',
            'hotelDesc'=>'ffffffffffffff',
            'hotelAddress'=>'dasdsadasdsd',
            'hotelEmail'=>'mini@dnu@gmail.com',
            'hotelContact'=>'0770543421',
            'hotelPrice'=>'212',
            'thumbImage'=>'',
            'displayImage'=>'',

        ])->assertStatus(302);
    }

    public function test_Add_New_Property_Without_Hotel_Name(){
        $this->post('/manage_hotels/add_new',[
            'hotelName'=>'',
            'hotelDesc'=>'ffffffffffffff',
            'hotelAddress'=>'dasdsadasdsd',
            'hotelEmail'=>'mini@dnu@gmail.com',
            'hotelContact'=>'0770543421',
            'hotelPrice'=>'212',
            'thumbImage'=>'',
            'displayImage'=>'',

        ])->assertStatus(302);
        $this->get('/manage_hotels/add_new')->assertSeeText('The hotel name field is required.');
    }

    public function test_Add_New_Property_Without_Hotel_Decs(){
        $this->post('/manage_hotels/add_new',[
            'hotelName'=>'asdaas',
            'hotelDesc'=>'',
            'hotelAddress'=>'dasdsadasdsd',
            'hotelEmail'=>'mini@dnu@gmail.com',
            'hotelContact'=>'0770543421',
            'hotelPrice'=>'212',
            'thumbImage'=>'',
            'displayImage'=>'',

        ])->assertStatus(302);
        $this->get('/manage_hotels/add_new')->assertSeeText('The hotel desc field is required.');
    }

    public function test_Add_New_Property_Without_Hotel_Address(){
        $this->post('/manage_hotels/add_new',[
            'hotelName'=>'asdaas',
            'hotelDesc'=>'asddsasdasda',
            'hotelAddress'=>'',
            'hotelEmail'=>'mini@dnu@gmail.com',
            'hotelContact'=>'0770543421',
            'hotelPrice'=>'212',
            'thumbImage'=>'',
            'displayImage'=>'',

        ])->assertStatus(302);
        $this->get('/manage_hotels/add_new')->assertSeeText('The hotel address field is required.');
    }

    public function test_Add_New_Property_Without_Email(){
        $this->post('/manage_hotels/add_new',[
            'hotelName'=>'asdaas',
            'hotelDesc'=>'asddsasdasda',
            'hotelAddress'=>'dasdsadasdsd',
            'hotelEmail'=>'',
            'hotelContact'=>'0770543421',
            'hotelPrice'=>'212',
            'thumbImage'=>'',
            'displayImage'=>'',

        ])->assertStatus(302);
        $this->get('/manage_hotels/add_new')->assertSeeText('The hotel email field is required.');
    }

    public function test_Add_New_Property_Email_Wrong_Format(){
        $this->post('/manage_hotels/add_new',[
            'hotelName'=>'asdaas',
            'hotelDesc'=>'asddsasdasda',
            'hotelAddress'=>'dasdsadasdsd',
            'hotelEmail'=>'mini@dnu@gmailcom',
            'hotelContact'=>'0770543421',
            'hotelPrice'=>'212',
            'thumbImage'=>'',
            'displayImage'=>'',

        ])->assertStatus(302);
        $this->get('/manage_hotels/add_new')->assertSeeText('The hotel email must be a valid email address.');
    }


    public function test_Add_New_Property_Without_contact(){
        $this->post('/manage_hotels/add_new',[
            'hotelName'=>'asdaas',
            'hotelDesc'=>'asddsasdasda',
            'hotelAddress'=>'dasdsadasdsd',
            'hotelEmail'=>'mini@dnu@gmail.com',
            'hotelContact'=>'',
            'hotelPrice'=>'212',
            'thumbImage'=>'',
            'displayImage'=>'',

        ])->assertStatus(302);
        $this->get('/manage_hotels/add_new')->assertSeeText('The hotel contact field is required.');
    }

    public function test_Add_New_Property_Without_Room_Price(){
        $this->post('/manage_hotels/add_new',[
            'hotelName'=>'asdaas',
            'hotelDesc'=>'asddsasdasda',
            'hotelAddress'=>'dasdsadasdsd',
            'hotelEmail'=>'minidnu@gmail.com',
            'hotelContact'=>'0770543421',
            'hotelPrice'=>'',
            'thumbImage'=>'',
            'displayImage'=>'',

        ])->assertStatus(302);
        $this->get('/manage_hotels/add_new')->assertSeeText('The hotel price field is required.');
    }


    public function test_Add_New_Property_Without_(){
        $this->post('/manage_hotels/add_new',[
            'hotelName'=>'asdaas',
            'hotelDesc'=>'asddsasdasda',
            'hotelAddress'=>'dasdsadasdsd',
            'hotelEmail'=>'mini@dnu@gmail.com',
            'hotelContact'=>'0770543421',
            'hotelPrice'=>'212',
            'thumbImage'=>'',
            'displayImage'=>'',

        ])->assertStatus(302);
        $this->get('/manage_hotels/add_new')->assertSeeText('');
    }

}
