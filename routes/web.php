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


Route::view('/{path?}', 'app');

//Route::get('/homepage','HomePageController@index');

Route::get('/', 'HomePageController@getHomePage');

Route::get('/hotel_post', 'HomePageController@clientSearch')->name('getSearchPost');


Route::get('/manage_hotels/add_new', 'AddNewController@createEventGetView')->name('addNew');

Route::post('/manage_hotels/add_new', 'AddNewController@createEvent');


Route::get('/manage_hotels/view_hotels', 'GetHotelController@viewAllGetView')->name('viewAll');


Route::get('/manage_hotels/edit_hotel', 'UpdateHotelController@editEventGetView')->name('editHotel');

Route::post('/manage_hotels/edit_hotel', 'UpdateHotelController@searchHotel')->name('adminSearch');

Route::post('/manage_hotels/update_hotel', 'UpdateHotelController@makeUpdateHotel')->name('updateData');

Route::post('/manage_hotels/unpublish_hotel', 'UpdateHotelController@setHotelPublish')->name('unPublishHotel');


Route::get('/manage_hotels/edit_history', 'HistoryEditController@editHistoryGetView')->name('editHistory');

Route::post('/manage_hotels/edit_history', 'HistoryEditController@searchHotel')->name('getHotel');

Route::post('/manage_hotels/get_history', 'HistoryEditController@getHistoryHotel')->name('getHistory');

Route::post('/manage_hotels/revert_history', 'HistoryEditController@revertHotelHistory')->name('revertBack');

Route::get('/manage_hotels/current_bookings', 'AdminBookingController@getView')->name('currentBookings');

Route::post('/manage_hotels/current_bookings', 'AdminBookingController@getSearchBooking')->name('searchBooking');




//Route::get('/hotel_post', 'HotelPostController@getPost')->name('hotelPost');

Route::post('/hotel_post/make_reserve', 'HotelPostController@reserveNow')->name('reserve_now');

Route::get('/hotel_post/make_reserve', 'BookingController@getbookingPage');

//Route::get('/hotel_post/confirm_reserve','BookingController@confirmBookingGetView');

Route::post('/hotel_post/confirm_reserve', 'BookingController@confirmReserve')->name('confirm_now');


Route::get('/hotel_post/confirm_reserve', 'BookingController@getbookingPage');


//Route::get('/allhotels', 'EventController@getAllAvailableHotels')->name('allHotels');

//Route::get('/verify_request', 'RequestController@index')->name('handleRequestTest');
