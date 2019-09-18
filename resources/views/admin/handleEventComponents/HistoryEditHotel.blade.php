<!DOCTYPE html>
<html lang="en">

<head>

    <title>Simple Sidebar - Start Bootstrap Template</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

    <!-- Bootstrap core CSS -->
    <link href="../adminPanel/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <!-- Custom styles for this template -->
    <link href="../adminPanel/css/simple-sidebar.css" rel="stylesheet">
    <link href="../adminPanel/css/hotel_image_viewer.css" rel="stylesheet">

</head>

<body>
<header>
    @include('components.header')
</header>

<div class="d-flex" id="wrapper">
    <!-- Sidebar -->
    <div class="bg-light border-right" id="sidebar-wrapper">
        @include('components.adminSideBar')
    </div>
    <!-- /#sidebar-wrapper -->

    <!-- Page Content -->
    <div id="page-content-wrapper">


        <button class="btn btn-primary" id="menu-toggle">Toggle Menu</button>

        <div class="container-fluid">

            <h1 class="mt-4">Update History</h1>

            <form method="post" action="{{ route('getHotel') }}" enctype="multipart/form-data">
                <input type="hidden" name="_token" value="{{csrf_token()}}">

                <div class="form-group">
                    <label for="exampleInputEmail1">Hotel ID</label>
                    <input type="text" name="hotelId" value="{{old('hotelId')}}" class="form-control"
                           id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Hotel ID">
                    <medium id="emailHelp"
                            class="form-text text-muted">{{ $errors->has('hotelId') ? $errors->first('hotelId') : ''}}</medium>
                </div>
                <button name="confirm" class="btn btn-primary">search</button>

            </form>

            {{--            @if(Session::has('Error'))--}}
            <medium id="emailHelp"
                    class="form-text text-muted">{{ Session::has('Error') ? Session::get('Error') : ''}}</medium>
            {{--                {{ Session::get('Error') }}--}}
            {{--            @endif--}}
            <div>
                <medium id="emailHelp"
                        class="form-text text-muted">{{ $errors->has('historyDate') ? $errors->first('historyDate') : ''}}</medium>
                @if($SearchResult)
                    <hr>

                    <form method="post" action="{{ route('getHistory') }}" enctype="multipart/form-data">
                        <input type="hidden" name="_token" value="{{csrf_token()}}">

                        <div class="form-group">
                            <label for="inputState">Date and Time</label>
                            <select name="historyDate" value="{{old('historyDate')}}" id="inputState"
                                    class="form-control">
                                <option value="{{old('historyDate')}}">{{old('historyDate')}}</option>
                                @foreach($SearchResult as $key=>$data)
                                    <option value="{{$data->record_ID}}">{{$data->end_date}}</option>
                                @endforeach
                            </select>

                        </div>
                        <button name="confirm" class="btn btn-primary">Find</button>

                    </form>

                @endif
                @if($historyRecord)

                    <hr>
                    <table class="table table-bordered">
                        <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">E-mail</th>
                            <th scope="col">Contact No</th>
                            <th scope="col">Address</th>
                            <th scope="col">Price Current</th>
                            <th scope="col">Date Posted</th>
                            <th scope="col">Date Updated</th>
                        </tr>
                        </thead>
                        <tbody>

                        {{--                    @foreach ($SearchResult as $data)--}}
                        <tr>
                            <td>{{$historyRecord->hotelID}}</td>
                            <td>{{$historyRecord->propName}}</td>
                            <td>{{$historyRecord->propDesc}}</td>
                            <td>{{$historyRecord->hotelEmail}}</td>
                            <td>{{$historyRecord->propContact}}</td>
                            <td>{{$historyRecord->propAddress}}</td>
                            <td>{{$historyRecord->propPriceNew}}</td>
                            <td>{{$historyRecord->start_date}}</td>
                            <td>{{$historyRecord->end_date}}</td>
                        </tr>
                        <tr>
                        {{--                    @endforeach--}}
                        {{----}}
                        </tbody>
                    </table>
                    <div hidden>
                        {{ $currentHotelID = $historyRecord->hotelID}}
                    </div>

{{--                    <div hidden>--}}
{{--                        @if($historyRecord->status==1)--}}
{{--                            {{$buttonVal='UnPublish'}}--}}
{{--                        @else--}}
{{--                            {{$buttonVal='Publish'}}--}}
{{--                        @endif--}}
{{--                    </div>--}}

{{--                    <div>--}}
{{--                        <form method="post" action="{{route('unPublishHotel')}}">--}}
{{--                            <input type="hidden" name="_token" value="{{csrf_token()}}">--}}
{{--                            <input type="hidden" value="{{$currentHotelID}}" name="hotelId">--}}
{{--                            <input type="hidden" value="{{$buttonVal}}" name="updateStatus">--}}
{{--                            <button name="confirm" class="btn btn-primary">{{$buttonVal}}</button>--}}
{{--                        </form>--}}
{{--                    </div>--}}
                    <hr>
                    <label for="exampleInputEmail1">Post Thumbnail Image</label>
                    <div class="row">
                        <div class="column">
                            <img src="{{$historyRecord->propThumbImg}}" onclick="openThumb();showThumb({{0}})"
                                 class="hover-shadow"
                                 width="200" height="100">
                        </div>
                    </div>

                    <div id="thumbImg" class="modal">
                        <span class="close cursor" onclick="closeThumb()">&times</span>
                        <div class="modal-content">
                            <div class="thumbImgCurrent">
                                <img src="{{$historyRecord->propThumbImg}}" style="width:100%">
                            </div>
                        </div>

                    </div>
                    <hr>
                    <label for="exampleInputEmail1">Post Display Images</label>
                    <div class="row">
                        @foreach ($disImgArray as $key=>$data)
                            <div class="column">
                                <img src="{{$data}}" onclick="openModal();showSlides({{$key}})" class="hover-shadow"
                                     width="200" height="100">
                            </div>
                        @endforeach
                    </div>


                    <div id="myModal" class="modal">
                        <span class="close cursor" onclick="closeModal()">&times</span>
                        <div class="modal-content">
                            @foreach ($disImgArray as $data)
                                <div class="mySlides">
                                    <img src="{{$data}}" style="width:100%">
                                </div>
                            @endforeach
                        </div>

                    </div>

                    <hr>

                    <form method="post" action="{{ route('revertBack') }}" enctype="multipart/form-data">
                        <input type="hidden" name="_token" value="{{csrf_token()}}">

                        <input type="hidden" value="{{$currentHotelID}}" name="hotelId">
                        <input type="hidden" value="{{$historyRecord->record_ID}}" name="recordID">

                        <div class="form-group">
                            <label for="exampleInputEmail1">Description</label>
                            <textarea class="form-control" name="hotelDesc" id="exampleFormControlTextarea1"
                                      placeholder="Enter New Description" rows="3">{{$historyRecord->propDesc}}</textarea>
                            <medium id="emailHelp"
                                    class="form-text text-muted">{{ $errors->has('hotelDesc') ? $errors->first('hotelDesc') : ''}}</medium>
                        </div>

                        <div class="form-group">
                            <label for="exampleInputEmail1">E-mail</label>
                            <input type="text" name="hotelEmail" value="{{$historyRecord->hotelEmail}}" class="form-control"
                                   id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter New E-mail">
                            <medium id="emailHelp"
                                    class="form-text text-muted">{{ $errors->has('hotelEmail') ? $errors->first('hotelEmail') : ''}}</medium>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Contact No</label>
                            <input type="text" name="hotelContact" value="{{$historyRecord->propContact}}" class="form-control"
                                   id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter New Contact No">
                            <medium id="emailHelp"
                                    class="form-text text-muted">{{ $errors->has('hotelContact') ? $errors->first('hotelContact') : ''}}</medium>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Room Price</label>
                            <input type="text" name="hotelPrice" value="{{$historyRecord->propPriceNew}}" class="form-control"
                                   id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter New Price">
                            <medium id="emailHelp"
                                    class="form-text text-muted">{{ $errors->has('hotelPrice') ? $errors->first('hotelPrice') : ''}}</medium>
                        </div>
                        <input type="text" hidden name="thumbImage" value="{{$historyRecord->propThumbImg}}" class="custom-file-input" id="thumbImage"
                                           aria-describedby="inputGroupFileAddon01">

                        <input type="text" hidden name="displayImage" value="{{$historyRecord->propImages}}" class="custom-file-input"
                                           aria-describedby="inputGroupFileAddon01">

                        <button name="confirm" class="btn btn-primary">Revert Back</button>
                    </form>
                    <br>
                @endif
            </div>
        </div>
        <!-- /#page-content-wrapper -->
    </div>
</div>
<!-- /#wrapper -->

<!-- Bootstrap core JavaScript -->
<script src="../adminPanel/vendor/jquery/jquery.min.js"></script>
<script src="../adminPanel/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
<script src="../adminPanel/javascript-edit-hotel/hotel_image_viewer.js"></script>


<!-- Menu Toggle Script -->
<script>
    $("#menu-toggle").click(function (e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });
</script>

</body>

</html>
