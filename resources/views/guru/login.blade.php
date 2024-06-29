<!-- resources/views/guru/login.blade.php -->
<!DOCTYPE html>
<html>
<head>
    <title>Guru Login</title>
    <link rel="stylesheet" type="text/css" href="{{ asset('css/login.css') }}">
    <style>
        .back-button {
            background-color: #6c757d;
        }
        .back-button:hover {
            background-color: #5a6268;
        }
    </style>
</head>
<body>
    <?php
// echo password_hash('password123', PASSWORD_DEFAULT);
?>
    @if ($errors->any())
        <div>
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif
    <div class="container">
        <div class="login-box">
            <h2>Login Guru</h2>
            <form method="POST" action="{{ route('guru.login.post') }}">
                @csrf
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password" required>
                </div>
                <button type="submit">Login</button>
            </form>
            <button onclick="window.location.href='{{ url('/game') }}'" class="back-button">Kembali</button>
        </div>
    </div>
</body>
</html>
