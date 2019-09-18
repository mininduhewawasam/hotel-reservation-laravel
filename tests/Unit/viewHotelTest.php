<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class viewHotelTest extends TestCase
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

    public function viewAllHotels(){
        $this->get('/manage_hotels/view_hotels')->assertSeeText('All Hotels')->assertStatus(200);
    }
}
