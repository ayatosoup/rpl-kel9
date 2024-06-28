<!-- resources/views/guru/edit_questions.blade.php -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Question</title>
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
        <h2>Edit Question</h2>
        <form action="{{ route('guru.questions.update', $question->id) }}" method="POST">
            @csrf
            @method('POST')

            <div class="form-group">
                <label for="question">Question:</label>
                <input type="text" class="form-control" id="question" name="question" value="{{ $question->question }}" required>
            </div>

            <div class="form-group">
                <label for="answers">Answers (nb: ["Padi kapas", "Kepala banteng", "Bintang emon", "Primogems"]):</label>
                <input type="text" class="form-control" id="answers" name="answers" value="{{ $question->answers }}" required>
            </div>

            <div class="form-group">
                <label for="correct_answer_index">Correct Answer Index:</label>
                <input type="number" class="form-control" id="correct_answer_index" name="correct_answer_index" value="{{ $question->correct_answer_index }}" required>
            </div>

            <button type="submit" class="btn btn-success">Update</button>
            <a href="{{ route('guru.questions') }}" class="btn btn-secondary">Cancel</a>
        </form>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.2/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>
</html>
