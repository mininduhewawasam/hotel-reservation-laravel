<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class updateHistoryTest extends TestCase
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

    public function test_Get_History_View(){
        $this->get('/manage_hotels/edit_history')
            ->assertStatus(200);

    }

    public function test_Search_History(){
        $this->post('/manage_hotels/edit_history',[
            'hotelId'=>1,
        ])
            ->assertStatus(302);
    }

    public  function test_Search_History_False_Value(){

    }

    public function test_Load_history_to_Selector(){

    }
}
