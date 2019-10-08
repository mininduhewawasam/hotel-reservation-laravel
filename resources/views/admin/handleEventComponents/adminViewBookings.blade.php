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
            <h1>Current Bookings</h1>
            <hr>
            <medium id="emailHelp"
                    class="form-text text-muted">{{ Session::has('Error') ? Session::get('Error') : ''}}</medium>

            <form method="post" action="{{route('searchBooking')}}" enctype="multipart/form-data">
                <input type="hidden" name="_token" value="{{csrf_token()}}">

                <div class="form-group">
                    <label for="exampleInputEmail1">ID of the Hotel</label>
                    <input type="text" name="hotelId" value="{{old('hotelId')}}" class="form-control"
                           id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Hotel Name">
                    <medium id="emailHelp"
                            class="form-text text-muted">{{ $errors->has('hotelId') ? $errors->first('hotelId') : ''}}</medium>
                </div>

                <div class="form-group">
                    <label for="inputState">Filter By</label>
                    <select name="FilterMethod" value="{{old('FilterMethod')}}" id="inputState" class="form-control">
                        <option value="{{old('FilterMethod')}}">{{old('FilterMethod')}}</option>
                        <option value="Sri Lanka">View All</option>
                        <option value="India">Current Bookings</option>
                        <option value="Bangaladesh">Approved</option>
                        <option value="Pakistan">Pending</option>
                        <option value="Pakistan">Cancelled</option>

                    </select>
                    <medium id="emailHelp" class="form-text text-muted">{{ $errors->has('FilterMethod') ? $errors->first('FilterMethod') : ''}}</medium>
                </div>
                <button name="confirm" class="btn btn-primary">search</button>

            </form>
            <hr>

            @if($bookingList)
                <table class="table table-bordered">
                    <thead>
                    <tr>
                        <th scope="col">Booking ref No</th>
                        <th scope="col">Guest Ref No</th>
                        <th scope="col">Hotel ID</th>
                        <th scope="col">Checkin Date</th>
                        <th scope="col">Checkout Date</th>
                        <th scope="col">Num of rooms</th>
                        <th scope="col">Adults</th>
                        <th scope="col">Children</th>
                        <th scope="col">Price</th>
                        <th scope="col">Guest Special Requests</th>
                        <th scope="col">Booking Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach ($bookingList as $booking)
                        <tr>
                            <td>{{$booking->booking_id}}</td>
                            <td>{{$booking->guest_user_ID}}</td>
                            <td>{{$booking->h_record_id}}</td>
                            <td>{{$booking->check_in_date}}</td>
                            <td>{{$booking->check_out_date}}</td>
                            <td>{{$booking->num_of_rooms}}</td>
                            <td>{{$booking->no_of_adults}}</td>
                            <td>{{$booking->no_of_children}}</td>
                            <td>{{$booking->total_price}}</td>
                            <td>{{$booking->client_sp_requests}}</td>
                            <td>{{$booking->booking_status}}
                                <button>Accept</button>
                            </td>
                        </tr>
                        <tr>
                    @endforeach

                    </tbody>
                </table>
            @endif

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
