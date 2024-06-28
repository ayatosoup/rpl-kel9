<!-- resources/views/guru/create_question.blade.php -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Create Question</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="{{ asset('css/guru.css') }}">
    <style>
        .create-container {
            background-color: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
    </style>
</head>
<body>
    <div class="container mt-5">
        <div class="create-container">
            <h2 class="mb-4">Create New Question</h2>
            <form action="{{ route('guru.questions.store') }}" method="POST">
                @csrf
                <div class="form-group">
                    <label for="question">Question:</label>
                    <input type="text" class="form-control" id="question" name="question" required>
                </div>
                <div class="form-group">
                    <label for="answers">Answers (nb: ["Padi kapas", "Kepala banteng", "Bintang emon", "Primogems"]):</label>
                    <input type="text" class="form-control" id="answers" name="answers" required>
                </div>
                <div class="form-group">
                    <label for="correct_answer_index">Correct Answer Index (starting from 0):</label>
                    <input type="number" class="form-control" id="correct_answer_index" name="correct_answer_index" required>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
                <a href="{{ route('guru.questions') }}" class="btn btn-secondary">Back</a>
            </form>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.2/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>
</html>
