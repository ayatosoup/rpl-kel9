<!DOCTYPE html>
<html>
<head>
    <title>Load Game</title>
    <link rel="stylesheet" type="text/css" href="{{ asset('css/styles.css') }}">
    <style>
        .load-container {
            width: 70%;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ccc;
            background-color: #fff;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            margin-top: 100px;
        }
        .load-container h2 {
            text-align: center;
            margin-bottom: 20px;
            color: black;
        }
        .slot {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            margin-bottom: 10px;
            cursor: pointer;
        }
        .slot:hover {
            background-color: #f0f0f0;
        }
        .slot p {
            margin: 0;
        }
        .back-button {
            background-color: #6c757d;
            padding: 10px;
            color: white;
            text-align: center;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        .back-button:hover {
            background-color: #5a6268;
        }
    </style>
</head>
<body>
    <div class="load-container">
        <h2>Load Game</h2>
        <div class="slot" onclick="loadGame(1)">
            <p>Slot 1</p>
            <span>Save Data 1</span>
        </div>
        <div class="slot" onclick="loadGame(2)">
            <p>Slot 2</p>
            <span>Save Data 2</span>
        </div>
        <div class="slot" onclick="loadGame(3)">
            <p>Slot 3</p>
            <span>Save Data 3</span>
        </div>
        <button onclick="window.location.href='{{ url('/game') }}'" class="back-button">Kembali</button>
    </div>

    <script>
        function loadGame(slot) {
            // Implement your game loading logic here
            console.log('Load game from slot', slot);
            window.location.href = "{{ route('stage') }}";
            // Redirect or fetch save data based on slot number
        }
    </script>
</body>
</html>
