{{--<head>--}}
{{--    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">--}}
{{--    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>--}}
{{--    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>--}}
{{--    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>--}}
{{--</head>--}}
@if($allHotels)
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
    @foreach ($allHotels as $allHotel)
        <tr>
            <td>{{$allHotel->hotelID}}</td>
            <td>{{$allHotel->propName}}</td>
            <td>{{$allHotel->propDesc}}</td>
            <td>{{$allHotel->hotelEmail}}</td>
            <td>{{$allHotel->propContact}}</td>
            <td>{{$allHotel->propAddress}}</td>
            <td>{{$allHotel->propPriceNew}}</td>
            <td>{{$allHotel->status}}</td>
            <td>{{$allHotel->start_date}}</td>
        </tr>
        <tr>
    @endforeach

    </tbody>
</table>
    @endif