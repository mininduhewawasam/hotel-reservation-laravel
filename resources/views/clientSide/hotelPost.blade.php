<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    {{--    <link href="../myCSS/homeStyles.css" rel="stylesheet">--}}
    <link href="../myCSS/postPageStyles.css" rel="stylesheet">


    <title>{{$hotelPost->propName}}</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">


</head>
<body>
<header>
    @include('components.header')
</header>
<div class="container">
    <div class="parentContainer">
        <div class="hotel_data">

            <h2 class="hotel_name">{{$hotelPost->propName}}</h2>
            <p class="hotel_rating">Rating 5/10</p>
            <div class="display_images">

            @foreach($disImgArray as $key=>$images)
                <!-- full size images of properties -->
                    <div class="mySlides">
                        <img src="{{$images}}" class="img-fluid">
                        <!-- Next and previous buttons -->
                        <div class="prev_area">
                            <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
                        </div>
                        <div class="next_area">
                            <a class="next" onclick="plusSlides(1)">&#10095;</a>
                        </div>

                    </div>
            @endforeach


            <!-- small size images -->
                <div class="row">
                @foreach($disImgArray as $key=>$images)
                    <!-- full size images of properties -->
                        <div class="column">
                            <img class="demo cursor small_img" src="{{$images}}" style="width:100%"
                                 onclick="currentSlide({{$key+1}})">
                        </div>
                    @endforeach
                </div>
            </div>
            <hr>
            <div class="hotel_content">
                <div class="hotel_Desc">
                    <p class="text-justify">{{$hotelPost->propDesc}}</p>
                </div>
                <hr>
                <div class="contact_details">
                    <table>
                        <tr>
                            <td><p>E mail :</p></td>
                            <td><p>{{$hotelPost->hotelEmail}}</p></td>
                        </tr>
                        <tr>
                            <td><p>Contact No :</p></td>
                            <td><p>{{$hotelPost->propContact}}</p></td>
                        </tr>
                        <tr>
                            <td><p>Address :</p></td>
                            <td><p>{{$hotelPost->propAddress}}</p></td>
                        </tr>
                    </table>
                </div>
                <hr>
                <div class="hotel_price">
                    <p>Price : {{$hotelPost->propPriceNew}}</p>
                </div>
            </div>

            <div class="booking_form">
                <div class="reserve_form">
                    <h3>Reserve Now</h3>
                    <hr>
                    @if(Session::has('contError'))
                        {{ Session::get('contError') }}
                    @endif

                    <form method="post" class="reserve_form" action="{{route('reserve_now')}}">
                        <input type="hidden" name="_token" value="{{csrf_token()}}">
                        <input type="hidden" name="hotel_record_ID" value="{{$hotelPost->record_ID}}">

                        <div class="form-group">
                            <label for="exampleInputEmail1">Check In Date</label>
                            <input type="date" name="checkInDate" value="{{old('checkInDate')}}" class="form-control"
                                   id="exampleInputEmail1" aria-describedby="emailHelp">
                            <medium id="emailHelp"
                                    class="form-text text-muted">{{ $errors->has('checkInDate') ? $errors->first('checkInDate') : ''}}</medium>
                        </div>

                        <div class="form-group">
                            <label for="exampleInputEmail1">Check Out Date</label>
                            <input type="date" name="checkOutDate" value="{{old('checkOutDate')}}" class="form-control"
                                   id="exampleInputEmail1" aria-describedby="emailHelp">
                            <medium id="emailHelp"
                                    class="form-text text-muted">{{ $errors->has('checkOutDate') ? $errors->first('checkOutDate') : ''}}</medium>
                        </div>

                        <div class="form-group">
                            <label for="exampleInputEmail1">No of Adults</label>
                            <input type="number" name="noOfAdults" value="{{old('noOfAdults')}}" min="1"
                                   class="form-control"
                                   id="exampleInputEmail1" aria-describedby="emailHelp"
                                   placeholder="Enter No of adults">
                            <medium id="emailHelp"
                                    class="form-text text-muted">{{ $errors->has('noOfAdults') ? $errors->first('noOfAdults') : ''}}</medium>
                        </div>

                        <div class="form-group">
                            <label for="exampleInputEmail1">No of Children</label>
                            <input type="number" name="noOfChildren" value="{{old('noOfChildren')}}" value min="0"
                                   class="form-control"
                                   id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="No of children">
                            <medium id="emailHelp"
                                    class="form-text text-muted">{{ $errors->has('noOfChildren') ? $errors->first('noOfChildren') : ''}}</medium>
                        </div>

                        <div class="form-group">
                            <label for="exampleInputEmail1">No of Rooms</label>
                            <input type="number" name="noOfRooms" value="{{old('noOfRooms')}}" min="1"
                                   class="form-control"
                                   id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="No of rooms">
                            <medium id="emailHelp"
                                    class="form-text text-muted">{{ $errors->has('noOfRooms') ? $errors->first('noOfRooms') : ''}}</medium>
                        </div>

                        <button name="confirm" class="btn btn-primary">Reserve</button>

                    </form>
                </div>
            </div>
                        <div class="similar_posts">
                            <h3>Similar Places</h3>
                            <div class="similar_post_container">
                                <p>
                                    similar_posts similar_postssimilar_postssimilar_
                                    postssimilar_postssimilar_postssimilar_postssimilar
                                    postssimilar_postssimilar_postssimilar_postssimilar
                                    postssimilar_postssimilar_postssimilar_postssimilar
                                    postssimilar_postssimilar_postssimilar_postssimilar
                                    postssimilar_postssimilar_postssimilar_postssimilar
                                    postssimilar_postssimilar_postssimilar_postssimilar
                                    postssimilar_postssimilar_posts
{{----}}
                                    postssimilar_postssimilar_postssimilar_postssimilar
                                    postssimilar_postssimilar_postssimilar_postssimilar
                                    postssimilar_postssimilar_postssimilar_postssimilar
                                    ostssimilar_postssimilar_posts
                                </p>
                            </div>
                        </div>


            <div class="user_reviews">
                <hr>
                <h5>Add Your Review</h5>
                <form method="post" action="" enctype="multipart/form-data">
                    <input type="hidden" name="_token" value="{{csrf_token()}}">

                    <div class="form-group">
                        <label for="exampleInputEmail1">Name</label>
                        <input type="text" name="checkIn        Date" value="{{old('checkInDate')}}"
                               class="form-control"
                               id="exampleInputEmail1" aria-describedby="emailHelp">
                        <medium id="emailHelp"
                                class="form-text text-muted">{{ $errors->has('checkInDate') ? $errors->first('checkInDate') : ''}}</medium>
                    </div>

                    <div class="form-group">
                        <label for="exampleInputEmail1">Review</label>
                        <textarea class="form-control" name="hotelDesc" id="exampleFormControlTextarea1"
                                  placeholder="Add your review here" rows="3">{{old('hotelDesc')}}</textarea>
                        <medium id="emailHelp"
                                class="form-text text-muted">{{ $errors->has('hotelDesc') ? $errors->first('hotelDesc') : ''}}</medium>
                    </div>

                    <button name="confirm" class="btn btn-primary">Post My Review</button>

                </form>
                <hr>
                <h5>Guest Reviews</h5>
                <hr>
                <article>Minindu hewawasam</article>
                <p class="text-justify">{{$hotelPost->propDesc}}</p>
                <p>Date : 2019.09.22 12:33.30</p>
                <hr>
                <article>Minindu hewawasam</article>
                <p class="text-justify">{{$hotelPost->propDesc}}</p>
                <p>Date : 2019.09.22 12:33.30</p>
                <hr>
                <article>Minindu hewawasam</article>
                <p class="text-justify">{{$hotelPost->propDesc}}</p>
                <p>Date : 2019.09.22 12:33.30</p>
            </div>

        </div>
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
