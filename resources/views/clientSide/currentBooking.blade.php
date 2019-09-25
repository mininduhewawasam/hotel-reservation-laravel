<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    {{--    <link href="../myCSS/homeStyles.css" rel="stylesheet">--}}
    <link href="../myCSS/postPageStyles.css" rel="stylesheet">
    <link href="../myCSS/bookingPageStyles.css" rel="stylesheet">


{{--    <title>{{$hotelPost->propName}}</title>--}}

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">


</head>
<body>
<header>
    @include('components.header')
</header>
<div class="parentContainer">
    <div class="hotel_data">
        <h3>Current Booking Details</h3>
        <hr>
        <table>
            <tr>
                <td>Checkin Date : </td>
                <td>{{$checkinDate}}</td>
                <td>Checkout Date : </td>
                <td>{{$checkOutDate}}</td>
            </tr>
            <tr>
                <td>No Of Adults : </td>
                <td>{{$noOfAdults}}</td>
                @if($noOfChildren)
                    <td>No of Children : </td>
                    <td>{{$noOfChildren}}</td>
                @endif
            </tr>
            <tr>
                <td>No of Rooms : </td>
                <td>{{$noOfRooms}}</td>
            </tr>
        </table>
        <hr>
        <h5>Please Enter Your Details</h5>
        <form method="post" action="{{route('confirm_now')}}" enctype="multipart/form-data">
            <input type="hidden" name="_token" value="{{csrf_token()}}">

            <input type="hidden" name="checkInDate" value="{{$checkinDate}}">

            <input type="hidden" name="checkOutDate" value="{{$checkOutDate}}">

            <input type="hidden" name="noOfAdults" value="{{$noOfAdults}}">
            <input type="hidden" name="noOfChildren" value="{{$noOfChildren}}">
            <input type="hidden" name="noOfRooms" value="{{$noOfRooms}}">


            <div class="form-group">
                <label for="exampleInputEmail1">First Name</label>
                <input type="text" name="guestFirstName" value="{{old('guestFirstName')}}" class="form-control"
                       id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Guest First Name">
                <medium id="emailHelp"
                        class="form-text text-muted">{{ $errors->has('guestFirstName') ? $errors->first('guestFirstName') : ''}}</medium>
            </div>

            <div class="form-group">
                <label for="exampleInputEmail1">Last Name</label>
                <input type="text" name="GuestLastName" value="{{old('GuestLastName')}}" class="form-control"
                       id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Guest Last Name">
                <medium id="emailHelp"
                        class="form-text text-muted">{{ $errors->has('GuestLastName') ? $errors->first('GuestLastName') : ''}}</medium>
            </div>

            <div class="form-group">
                <label for="exampleInputEmail1">E-Mail</label>
                <input type="text" name="guestEmail" value="{{old('guestEmail')}}" class="form-control"
                       id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Guest E-mail">
                <medium id="emailHelp"
                        class="form-text text-muted">{{ $errors->has('guestEmail') ? $errors->first('guestEmail') : ''}}</medium>
            </div>

            <div class="form-group">
                <label for="exampleInputEmail1">Contact No</label>
                <input type="text" name="guestContactNo" value="{{old('guestContactNo')}}" class="form-control"
                       id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Guest Contact Number">
                <medium id="emailHelp"
                        class="form-text text-muted">{{ $errors->has('guestContactNo') ? $errors->first('guestContactNo') : ''}}</medium>
            </div>

            <div class="form-group">
                <label for="exampleInputEmail1">Special Requests</label>
                <textarea class="form-control" name="specialRequests" id="exampleFormControlTextarea1" placeholder="Please add special requests on your reservation here" rows="3">{{old('specialRequests')}}</textarea>
                <medium id="emailHelp" class="form-text text-muted">{{ $errors->has('specialRequests') ? $errors->first('specialRequests') : ''}}</medium>
            </div>




            <button name="confirm" class="btn btn-primary">Reserve</button>

        </form>
        <hr>
    </div>

</div>

<div class="booking_form">
    <div class="reserve_form">
        <h3>Booking Details</h3>
        <form method="post" class="reserve_form" action="{{route('reserve_now')}}" >
            <input type="hidden" name="_token" value="{{csrf_token()}}">

            <div class="form-group">
                <label for="exampleInputEmail1">Check In Date</label>
                <input type="date" name="checkInDate" value="{{$checkinDate}}" class="form-control"
                       id="exampleInputEmail1" aria-describedby="emailHelp">
                <medium id="emailHelp"
                        class="form-text text-muted">{{ $errors->has('checkInDate') ? $errors->first('checkInDate') : ''}}</medium>
            </div>

            <div class="form-group">
                <label for="exampleInputEmail1">Check Out Date</label>
                <input type="date" name="checkOutDate" value="{{$checkOutDate}}" class="form-control"
                       id="exampleInputEmail1" aria-describedby="emailHelp">
                <medium id="emailHelp"
                        class="form-text text-muted">{{ $errors->has('checkOutDate') ? $errors->first('checkOutDate') : ''}}</medium>
            </div>

            <div class="form-group">
                <label for="exampleInputEmail1">No of Adults</label>
                <input type="number" name="noOfAdults" value="{{$noOfAdults}}" min="1" class="form-control"
                       id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter No of adults">
                <medium id="emailHelp"
                        class="form-text text-muted">{{ $errors->has('noOfAdults') ? $errors->first('noOfAdults') : ''}}</medium>
            </div>

            <div class="form-group">
                <label for="exampleInputEmail1">No of Children</label>
                <input type="number" name="noOfChildren" value="{{$noOfChildren}}" value min="1" class="form-control"
                       id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="No of children">
                <medium id="emailHelp"
                        class="form-text text-muted">{{ $errors->has('noOfChildren') ? $errors->first('noOfChildren') : ''}}</medium>
            </div>

            <div class="form-group">
                <label for="exampleInputEmail1">No of Rooms</label>
                <input type="number" name="noOfRooms" value="{{$noOfRooms}}" min="1" class="form-control"
                       id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="No of rooms">
                <medium id="emailHelp"
                        class="form-text text-muted">{{ $errors->has('noOfRooms') ? $errors->first('noOfRooms') : ''}}</medium>
            </div>

            <button name="confirm" class="btn btn-primary">Update</button>

        </form>
        <hr>
    </div>
</div>

<script src="../adminPanel/javascript-edit-hotel/hotel_image_viewer.js"></script>

<script>
    $(function () {//function to load property description
        var output = "";
        output += data.properties[0].description
        output += "";
        document.getElementById("proprtyshrtDesc").innerHTML = output;
    });


    var slideIndex = 1;
    showSlides(slideIndex);

    // Next/previous controls
    function plusSlides(n) {
        showSlides(slideIndex += n);
    }


    // Thumbnail image controls
    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    function showSlides(n) {//function to load imagrs on click on the small image in slide show
        var i;
        var slides = document.getElementsByClassName("mySlides");
        var dots = document.getElementsByClassName("demo");
        if (n > slides.length) {
            slideIndex = 1
        }
        if (n < 1) {
            slideIndex = slides.length
        }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].className += " active";
    }

    const navbarToggler = document.querySelector(".navbar-toggler");
    const navbarMenu = document.querySelector(".navbar ul");
    const navbarLinks = document.querySelectorAll(".navbar a");

    navbarToggler.addEventListener("click", navbarTogglerClick);

    function navbarTogglerClick() {
        navbarToggler.classList.toggle("open-navbar-toggler");
        navbarMenu.classList.toggle("open");
    }

    navbarLinks.forEach(elem => elem.addEventListener("click", navbarLinkClick));

    function navbarLinkClick() {
        if (navbarMenu.classList.contains("open")) {
            navbarToggler.click();
        }
    }

    $(function () {
        $("#tabs-1").tabs();
    });
    $("#tabs-2").tabs({
            active: 0
        }
    );
    $("#tabs-2").tabs(
        {heightStyle: "auto"}
    );


    // Get the modal
    var modal = document.getElementById('myModal');

    // Get the image and insert it inside the modal - use its "alt" text as a caption
    var img = document.getElementById('myImg');
    var modalImg = document.getElementById("img01");
    img.onclick = function () {
        modal.style.display = "block";
        modalImg.src = this.src;
    }

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }
</script>

</body>
</html>
