<!DOCTYPE html>
<html>
<head>
    <title>Stage</title>
    <link rel="stylesheet" type="text/css" href="{{ asset('css/stage.css') }}">
    <style>
        /* .container {
            position: relative;
            height: 400px;
        } */
        .image {
            position: absolute;
            /* width: 250px; 
            height: auto;  */
            cursor: pointer;
        }
        .image-top-left {
            top: 0;
            left: 15%;
            width: 250px; 
            height: auto; 
        }
        .image-top-right {
            top: 0;
            right: 10%;
            width: 250px; 
            height: auto; 
        }
        .image-bottom-left {
            bottom: 10%;
            left: -5%;
            width: 600px; 
            height: auto; 
        }
        .image-bottom-right {
            bottom: 0;
            right: 0;
            width: 250px; 
            height: auto; 
        }
        .image-center {
            top: 60%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 250px; 
            height: auto; 
        }
    </style>
</head>
<body>
    <div class="container">
        <img src="{{ asset('images/rumah.png') }}" alt="Image 1" class="image image-top-left" onclick="goToGameplay()">
        <img src="{{ asset('images/rumah.png') }}" alt="Image 2" class="image image-top-right" onclick="goToGameplay()">
        <img src="{{ asset('images/rumah.png') }}" alt="Image 3" class="image image-bottom-left" onclick="goToGameplay()">
        <img src="{{ asset('images/rumah.png') }}" alt="Image 4" class="image image-bottom-right" onclick="goToGameplay()">
        <img src="{{ asset('images/rumah.png') }}" alt="Image 5" class="image image-center" onclick="goToGameplay()">
    </div>
    <script>
        function goToGameplay() {
            window.location.href = "{{ route('gameplay') }}";
        }
    </script>
</body>
</html>
