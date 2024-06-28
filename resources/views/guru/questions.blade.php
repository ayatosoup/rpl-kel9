<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Questions</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="{{ asset('css/guru.css') }}">
    <style>
        /* Tambahkan CSS khusus untuk tabel */
        .table td, .table th {
            background-color: white !important;
        }
        .action-container {
            background-color: white;
            padding: 15px;
            border-radius: 5px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
    </style>
</head>
<body>
     <div class="container mt-5">
        <div class="action-container mb-3">
            <div class="d-flex justify-content-between">
                <button class="btn btn-primary" onclick="window.location.href='{{ route('guru.questions.create') }}'">Tambah Pertanyaan</button>
                <button class="btn btn-danger" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">Logout</button>
                <form id="logout-form" action="{{ route('guru.logout') }}" method="POST" style="display: none;">
                    @csrf
                </form>
            </div>
            <table class="table table-bordered">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Nama Pertanyaan</th>
                    <th>Update</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                @foreach($questions as $index => $question)
                    <tr>
                        <td>{{ $index + 1 }}</td>
                        <td>{{ $question->question }}</td>
                        <td>
                            <a href="{{ route('guru.questions.edit', $question->id) }}" class="btn btn-warning btn-sm">Update</a>
                        </td>
                        <td>
                            <form action="{{ route('guru.questions.destroy', $question->id) }}" method="POST" onsubmit="return confirm('Are you sure you want to delete this question?');">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="btn btn-danger btn-sm">Delete</button>
                            </form>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
        </div>

       
    </div>

    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.2/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>
</html>
