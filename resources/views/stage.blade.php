<!DOCTYPE html>
<html>
<head>
    <title>Stage</title>
    <link rel="stylesheet" type="text/css" href="{{ asset('css/stage.css') }}">
    <style>
        .image {
            position: absolute;
            cursor: pointer;
        }
        .image-top-left {
            top: -5%;
            left: 7%;
            width: 500px; 
            height: auto; 
        }
        .image-top-right {
            top: 0;
            right: 10%;
            width: 200px; 
            height: auto; 
        }
        .image-bottom-left {
            bottom: 19%;
            left: 10%;
            width: 200px; 
            height: auto; 
        }
        .image-bottom-right {
            bottom: 5%;
            right: 7%;
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
        .arrow {
            position: absolute;
            top: 10%;
            left: 50%;
            transform: translateX(-50%);
            width: 100px;
            height: auto;
            cursor: pointer;
            display: none; /* Initially hidden */
        }
    </style>
</head>
<body>
    <div class="container">
        <img src="{{ asset('images/rumah.png') }}" alt="Image 1" class="image image-top-left" onclick="goToSlideshow1()">
        <img src="{{ asset('images/map3.png') }}" alt="Image 2" class="image image-top-right" onclick="goToSlideshow2()">
        <img src="{{ asset('images/map2.png') }}" alt="Image 3" class="image image-bottom-left" onclick="goToSlideshow3()">
        <img src="{{ asset('images/map4.png') }}" alt="Image 4" class="image image-bottom-right" onclick="goToSlideshow4()">
        <img src="{{ asset('images/map5.png') }}" alt="Image 5" class="image image-center" onclick="goToSlideshow5()">
        <img src="{{ asset('images/rumah.png') }}" alt="Next Stage Arrow" class="arrow" id="nextStageArrow" onclick="goToGameplayLast()">
    </div>
    <script>
        // Retrieve clickCount from localStorage or initialize it
        let clickCount = localStorage.getItem('clickCount') ? parseInt(localStorage.getItem('clickCount')) : 0;

        // Show the next stage arrow if clickCount is greater than or equal to 1
        if (clickCount >= 1) {
            document.getElementById("nextStageArrow").style.display = "block";
        }

        function incrementClickCount() {
            clickCount++;
            localStorage.setItem('clickCount', clickCount); // Save clickCount to localStorage
            if (clickCount >= 1) {
                document.getElementById("nextStageArrow").style.display = "block";
            }
        }

        function goToSlideshow1() {
            incrementClickCount();
            window.location.href = "{{ route('slideshow') }}";
        }
        function goToSlideshow2() {
            incrementClickCount();
            window.location.href = "{{ route('slideshow2') }}";
        }
        function goToSlideshow3() {
            incrementClickCount();
            window.location.href = "{{ route('slideshow3') }}";
        }
        function goToSlideshow4() {
            incrementClickCount();
            window.location.href = "{{ route('slideshow4') }}";
        }
        function goToSlideshow5() {
            incrementClickCount();
            window.location.href = "{{ route('slideshow5') }}";
        }
        function goToGameplayLast() {
            window.location.href = "{{ route('gameplaylast') }}";
        }
    </script>
</body>
</html>
