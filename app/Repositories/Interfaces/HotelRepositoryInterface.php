<?php


namespace App\Repositories\Interfaces;


interface HotelRepositoryInterface
{
    public function addHotel($addRequest);

    public function editHotel($editRequest);

    public function getEditHotel($searchRequest);

    public function getHotels();

    public function unPublishHotel($unPublishRequest);

    public function getHistoryHotel($searchHisRequest);

    public function getHistoryData($historyDataRequest);

    public function historyRevertBack($revertBackRequest);

    public function getHotelPost($searchRequest);

}