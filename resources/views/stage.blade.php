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
    </style>
</head>
<body>
    <div class="container">
        <img src="{{ asset('images/rumah.png') }}" alt="Image 1" class="image image-top-left" onclick="goToSlideshow1()">
        <img src="{{ asset('images/map3.png') }}" alt="Image 2" class="image image-top-right" onclick="goToSlideshow2()">
        <img src="{{ asset('images/map2.png') }}" alt="Image 3" class="image image-bottom-left" onclick="goToSlideshow3()">
        <img src="{{ asset('images/map4.png') }}" alt="Image 4" class="image image-bottom-right" onclick="goToSlideshow4()">
        <img src="{{ asset('images/map5.png') }}" alt="Image 5" class="image image-center" onclick="goToSlideshow5()">
    </div>
    <script>
        // Retrieve played slideshows from localStorage or initialize it
        let playedSlideshows = localStorage.getItem('playedSlideshows') ? JSON.parse(localStorage.getItem('playedSlideshows')) : [];

        function markAsPlayed(slideshow) {
            if (!playedSlideshows.includes(slideshow)) {
                playedSlideshows.push(slideshow);
                localStorage.setItem('playedSlideshows', JSON.stringify(playedSlideshows));
            }
            checkCompletion();
        }

        function checkCompletion() {
            if (playedSlideshows.length >= 5) {
                window.location.href = "{{ route('endslideshow') }}";
            }
        }

        function showAlert() {
            alert("Stage ini sudah dimainkan dan tidak bisa dimainkan lagi.");
        }

        function goToSlideshow1() {
            if (playedSlideshows.includes('slideshow1')) {
                showAlert();
            } else {
                markAsPlayed('slideshow1');
                window.location.href = "{{ route('slideshow') }}";
            }
        }
        function goToSlideshow2() {
            if (playedSlideshows.includes('slideshow2')) {
                showAlert();
            } else {
                markAsPlayed('slideshow2');
                window.location.href = "{{ route('slideshow2') }}";
            }
        }
        function goToSlideshow3() {
            if (playedSlideshows.includes('slideshow3')) {
                showAlert();
            } else {
                markAsPlayed('slideshow3');
                window.location.href = "{{ route('slideshow3') }}";
            }
        }
        function goToSlideshow4() {
            if (playedSlideshows.includes('slideshow4')) {
                showAlert();
            } else {
                markAsPlayed('slideshow4');
                window.location.href = "{{ route('slideshow4') }}";
            }
        }
        function goToSlideshow5() {
            if (playedSlideshows.includes('slideshow5')) {
                showAlert();
            } else {
                markAsPlayed('slideshow5');
                window.location.href = "{{ route('slideshow5') }}";
            }
        }

        // Check completion status on page load
        checkCompletion();
    </script>
</body>
</html>
