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
            <h1 class="mt-4">Update Hotel</h1>

            <form method="post" action="{{ route('adminSearch') }}" enctype="multipart/form-data">
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
                @if($SearchResult)
                    <br>
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
                            <th scope="col">Is Published</th>
                            <th scope="col">Date Posted</th>
                        </tr>
                        </thead>
                        <tbody>

                        {{--                    @foreach ($SearchResult as $data)--}}
                        <tr>
                            <td>{{$SearchResult->hotelID}}</td>
                            <td>{{$SearchResult->propName}}</td>
                            <td>{{$SearchResult->propDesc}}</td>
                            <td>{{$SearchResult->hotelEmail}}</td>
                            <td>{{$SearchResult->propContact}}</td>
                            <td>{{$SearchResult->propAddress}}</td>
                            <td>{{$SearchResult->propPriceNew}}</td>
                            <td>{{$SearchResult->status}}</td>
                            <td>{{$SearchResult->start_date}}</td>
                        </tr>
                        <tr>
                        {{--                    @endforeach--}}
                        {{----}}
                        </tbody>
                    </table>
                    <div hidden>
                        {{ $currentHotelID = $SearchResult->hotelID}}
                    </div>
                <div>
                    <img src="{{$SearchResult->propThumbImg}}">
                </div>
                <?php $SearchResult =null;
                $historyImgArray = explode(",", $SearchResult->propImages);
                dd($historyImgArray);
                ?>
                    <div hidden>
                        @if($SearchResult->status==1)
                            {{$buttonVal='UnPublish'}}
                        @else
                            {{$buttonVal='Publish'}}
                        @endif
                    </div>

                    <form method="post" action="{{route('unPublishHotel')}}">
                        <input type="hidden" name="_token" value="{{csrf_token()}}">
                        <input type="hidden" value="{{$currentHotelID}}" name="hotelId">
                        <input type="hidden" value="{{$buttonVal}}" name="updateStatus" >

                        <button name="confirm" class="btn btn-primary">{{$buttonVal}}</button>

                    </form>
                @endif
                <hr>
            </div>
            <form method="post" action="{{ route('updateData') }}" enctype="multipart/form-data">
                <input type="hidden" name="_token" value="{{csrf_token()}}">

                {{--                <div class="form-group">--}}
                {{--                    <label for="exampleInputEmail1">Name</label>--}}
                {{--                    <input type="text" name="hotelName" value="{{old('hotelName')}}" class="form-control"  id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Name">--}}
                {{--                    <medium id="emailHelp" class="form-text text-muted">{{ $errors->has('hotelName') ? $errors->first('hotelName') : ''}}</medium>--}}
                {{--                </div>--}}

                <input type="hidden" value="{{$currentHotelID}}" name="hotelId">
{{--                <input type="hidden" value="{{$SearchResult->start_date}}" name="dateCreated">--}}
                {{--                <medium id="emailHelp" class="form-text text-muted">{{ $errors->has('hotelId') ? $errors->first('hotelId') : ''}}</medium>--}}

                <div class="form-group">
                    <label for="exampleInputEmail1">Description</label>
                    <textarea class="form-control" name="hotelDesc" id="exampleFormControlTextarea1"
                              placeholder="Enter New Description" rows="3">{{old('hotelDesc')}}</textarea>
                    <medium id="emailHelp"
                            class="form-text text-muted">{{ $errors->has('hotelDesc') ? $errors->first('hotelDesc') : ''}}</medium>
                </div>
                {{--                <div class="form-group">--}}
                {{--                    <label for="exampleInputEmail1">Address</label>--}}
                {{--                    <input type="text" name="hotelAddress" value="{{old('hotelAddress')}}" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Address">--}}
                {{--                    <medium id="emailHelp" class="form-text text-muted">{{ $errors->has('hotelAddress') ? $errors->first('hotelAddress') : ''}}</medium>--}}
                {{--                </div>--}}
                <div class="form-group">
                    <label for="exampleInputEmail1">E-mail</label>
                    <input type="text" name="hotelEmail" value="{{old('hotelEmail')}}" class="form-control"
                           id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter New E-mail">
                    <medium id="emailHelp"
                            class="form-text text-muted">{{ $errors->has('hotelEmail') ? $errors->first('hotelEmail') : ''}}</medium>
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">Contact No</label>
                    <input type="text" name="hotelContact" value="{{old('hotelContact')}}" class="form-control"
                           id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter New Contact No">
                    <medium id="emailHelp"
                            class="form-text text-muted">{{ $errors->has('hotelContact') ? $errors->first('hotelContact') : ''}}</medium>
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">Room Price</label>
                    <input type="text" name="hotelPrice" value="{{old('hotelPrice')}}" class="form-control"
                           id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter New Price">
                    <medium id="emailHelp"
                            class="form-text text-muted">{{ $errors->has('hotelPrice') ? $errors->first('hotelPrice') : ''}}</medium>
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">Thumbnail Image</label>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroupFileAddon01">Upload</span>
                        </div>
                        <div class="custom-file">
                            <input type="file" name="thumbImage" class="custom-file-input" id="thumbImage"
                                   aria-describedby="inputGroupFileAddon01">
                            <label class="custom-file-label" for="inputGroupFile01">Choose new image for
                                Thumbnail</label>
                        </div>
                    </div>
                    <medium id="emailHelp"
                            class="form-text text-muted">{{ $errors->has('displayImage') ? $errors->first('displayImage') : ''}}</medium>
                </div>

                <div class="form-group">
                    <label for="exampleInputEmail1">Display Images</label>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroupFileAddon01">Upload</span>
                        </div>
                        <div class="custom-file">
                            <input type="file" name="displayImage[]" multiple class="custom-file-input"
                                   aria-describedby="inputGroupFileAddon01">
                            <label class="custom-file-label" for="inputGroupFile01">Choose new images for
                                display</label>
                        </div>
                    </div>
                    <medium id="emailHelp"
                            class="form-text text-muted">{{ $errors->has('displayImage') ? $errors->first('displayImage') : ''}}</medium>
                </div>

                <button name="confirm" class="btn btn-primary">Update</button>
            </form>
        </div>
    </div>
    <!-- /#page-content-wrapper -->

</div>
<!-- /#wrapper -->

<!-- Bootstrap core JavaScript -->
<script src="../adminPanel/vendor/jquery/jquery.min.js"></script>
<script src="../adminPanel/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

<!-- Menu Toggle Script -->
<script>
    $("#menu-toggle").click(function (e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });
</script>

</body>

</html>
