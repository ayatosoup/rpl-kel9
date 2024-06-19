<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Question;

class QuestionController extends Controller
{
    public function getQuestions()
    {
        $questions = Question::all();
        return response()->json($questions);
    }
}