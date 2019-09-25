<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Add New Hotel</title>

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

            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="container-fluid">

                <h1 class="mt-4">Add New Hotel</h1>

                        @if(Session::has('regError'))
                            {{ Session::get('regError') }}
                        @endif

                    <form method="post" action="{{ route('addNew') }}" enctype="multipart/form-data">
                        <input type="hidden" name="_token" value="{{csrf_token()}}">
                        <div class="form-group">
                            <label for="exampleInputEmail1">Name</label>
                            <input type="text" name="hotelName" value="{{old('hotelName')}}" class="form-control"  id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Name">
                            <medium id="emailHelp" class="form-text text-muted">{{ $errors->has('hotelName') ? $errors->first('hotelName') : ''}}</medium>
                        </div>

                        <div class="form-group">
                            <label for="exampleInputEmail1">Description</label>
                            <textarea class="form-control" name="hotelDesc" id="exampleFormControlTextarea1" placeholder="Enter Description" rows="3">{{old('hotelDesc')}}</textarea>
                            <medium id="emailHelp" class="form-text text-muted">{{ $errors->has('hotelDesc') ? $errors->first('hotelDesc') : ''}}</medium>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Address</label>
                            <input type="text" name="hotelAddress" value="{{old('hotelAddress')}}" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Address">
                            <medium id="emailHelp" class="form-text text-muted">{{ $errors->has('hotelAddress') ? $errors->first('hotelAddress') : ''}}</medium>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">E-mail</label>
                            <input type="text" name="hotelEmail" value="{{old('hotelEmail')}}" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter E-mail">
                            <medium id="emailHelp" class="form-text text-muted">{{ $errors->has('hotelEmail') ? $errors->first('hotelEmail') : ''}}</medium>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Contact No</label>
                            <input type="text" name="hotelContact" value="{{old('hotelContact')}}" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Contact No">
                            <medium id="emailHelp" class="form-text text-muted">{{ $errors->has('hotelContact') ? $errors->first('hotelContact') : ''}}</medium>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Room Price</label>
                            <input type="text" name="hotelPrice" value="{{old('hotelPrice')}}" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Price">
                            <medium id="emailHelp" class="form-text text-muted">{{ $errors->has('hotelPrice') ? $errors->first('hotelPrice') : ''}}</medium>
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
                                    <label class="custom-file-label" for="inputGroupFile01">Choose image for Thumbnail</label>
                                </div>
                            </div>
                            <medium id="emailHelp" class="form-text text-muted">{{ $errors->has('thumbImage') ? $errors->first('thumbImage') : ''}}</medium>
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
                                    <label class="custom-file-label" for="inputGroupFile01">Choose image for display</label>
                                </div>
                            </div>
                            <medium id="emailHelp" class="form-text text-muted">{{ $errors->has('displayImage[]') ? $errors->first('displayImage[]') : ''}}</medium>
                        </div>

                        <button name="confirm" class="btn btn-primary">Confirm</button>
                    </form>
                <br>



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
        $("#menu-toggle").click(function(e) {
            e.preventDefault();
            $("#wrapper").toggleClass("toggled");
        });
    </script>

</body>

</html>
