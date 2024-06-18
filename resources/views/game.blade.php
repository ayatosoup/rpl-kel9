<!DOCTYPE html>
<html>
<head>
  <title>Makarovni</title>
  <link rel="stylesheet" type="text/css" href="{{ asset('css/styles.css') }}">
</head>
<body>
  <button id="newGameBtn">New Game</button>
  <button id="loadGameBtn">Load Game</button>

  <script>
    class Game {
      constructor() {
        document.getElementById('newGameBtn').addEventListener('click', this.startNewGame.bind(this));

        document.getElementById('loadGameBtn').addEventListener('click', this.loadGame.bind(this));
      }

      startNewGame() {
        window.location.href = "{{ route('slideshow') }}";
      }

      loadGame() {
        window.location.href = "{{ route('stage') }}";
      }
    }

    const game = new Game();
  </script>
</body>
</html>
