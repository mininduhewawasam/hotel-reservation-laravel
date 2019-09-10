<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="../myCSS/homeStyles.css" rel="stylesheet">

    <title>Laravel</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">

    <!-- Styles -->
    <style>

    </style>
</head>
<body>
<header>
    @include('components.header')
</header>
<div class="flex-center position-ref full-height">
    <div class="content">
        <div class="title m-b-md">
            Welcome
        </div>
        <form method="post" action="">
            <input type="hidden" name="_token" value="{{csrf_token()}}">
            <input type="text" name="searchBar" placeholder="search">
            <button name="confirm" class="btn btn-primary">Search</button>
        </form>




    </div>
</div>
</body>
</html>
