<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('clientSide.home');
});

Route::get('/manage_hotels/add_new', 'AddNewController@createEventGetView')->name('addNew');

Route::post('/manage_hotels/add_new', 'AddNewController@createEvent');

Route::get('/manage_hotels/view_hotels', 'GetHotelController@viewAllGetView')->name('viewAll');

Route::get('/manage_hotels/edit_hotel', 'UpdateHotelController@editEventGetView')->name('editHotel');

Route::post('/manage_hotels/edit_hotel', 'UpdateHotelController@searchHotel')->name('adminSearch');

Route::post('/manage_hotels/update_hotel', 'UpdateHotelController@makeUpdateHotel')->name('updateData');

Route::post('/manage_hotels/unpublish_hotel', 'UpdateHotelController@setHotelPublish')->name('unPublishHotel');


//Route::get('/allhotels', 'EventController@getAllAvailableHotels')->name('allHotels');

Route::get('/verify_request', 'RequestController@index')->name('handleRequestTest');
