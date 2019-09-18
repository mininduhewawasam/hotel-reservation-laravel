<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class homePageTest extends TestCase
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

    public function test_Get_Home_Page(){
        $this->get('/')
            ->assertStatus(200)
            ->assertSeeText('Welcome');
    }

    public function test_Client_Search(){
        $this->post('/',[
            'searchBar'=>'ssdsfsdafdsf'
        ])
        ->assertStatus(302)
        ->assertRedirect('/searchResults');
    }
}
