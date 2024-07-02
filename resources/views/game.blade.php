<!DOCTYPE html>
<html>
<head>
  <title>Makarovni</title>
  <link rel="stylesheet" type="text/css" href="{{ asset('css/styles.css') }}">
  <script>
        document.addEventListener("DOMContentLoaded", function() {
            // Clear localStorage when game.blade is loaded
            localStorage.clear();
        });
    </script>
</head>
<body>
  <button id="newGameBtn">New Game</button>
  <button id="loadGameBtn">Load Game</button>
  <button id="EditGameBtn">Edit Soal</button>

  <script>
    class Game {
      constructor() {
        document.getElementById('newGameBtn').addEventListener('click', this.startNewGame.bind(this));

        document.getElementById('loadGameBtn').addEventListener('click', this.loadGame.bind(this));

        document.getElementById('EditGameBtn').addEventListener('click', this.editGame.bind(this));
      }

      startNewGame() {
        window.location.href = "{{ route('slideshow') }}";
      }

      loadGame() {
        window.location.href = "{{ route('load') }}";
      }

      editGame() {
        window.location.href = "{{ route('guru.login') }}";
      }
    }

    const game = new Game();
  </script>
</body>
</html>
