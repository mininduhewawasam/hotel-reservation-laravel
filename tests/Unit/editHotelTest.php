<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class editHotelTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testExample()
    {
        $this->assertTrue(true);
    }

    public function test_Get_edit_view(){
        $this->get('/manage_hotels/edit_hotel')
            ->assertStatus(200);
    }

    public function test_search_for_hotel(){
        $this->post('/manage_hotels/edit_hotel',[
            'hotelId'=>'1'
        ])
            ->assertStatus(302);

        $this->get('/manage_hotels/edit_hotel')
            ->assertStatus(200)
            ->assertSeeText('ID');
    }

    public function test_update_without_search(){
        $this->post('/manage_hotels/update_hotel',[
            'hotelId'=>''
        ])
            ->assertStatus(302);
        $this->get('/manage_hotels/edit_hotel')
            ->assertStatus(200)
            ->assertSeeText('The hotel id field is required.');
    }

    public function test_update_with_search_empty_all_fields(){
        $this->post('/manage_hotels/edit_hotel',[
            'hotelId'=>'1'
        ])
            ->assertStatus(302);

        $this->post('/manage_hotels/update_hotel',[
            'hotelId'=>'1'
        ])
            ->assertStatus(302);

        $this->get('/manage_hotels/edit_hotel')->assertStatus(200)
            ->assertSeeText('Please Fill fields to be updated');
    }
}
