<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Guru;
use App\Models\Question;
use Illuminate\Support\Facades\Auth;

class GuruController extends Controller
{
    public function showLoginForm()
    {
        return view('guru.login');
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::guard('guru')->attempt($credentials)) {
            return redirect()->route('guru.questions');
        }

        return redirect()->back()->withErrors(['email' => 'Email or password is incorrect.']);
    }

    public function createQuestion()
    {
        return view('guru.create_question');
    }

    public function storeQuestion(Request $request)
    {
        $request->validate([
            'question' => 'required|string',
            'answers' => 'required|string',
            'correct_answer_index' => 'required|integer',
        ]);

        Question::create([
            'question' => $request->question,
            'answers' => $request->answers,
            'correct_answer_index' => $request->correct_answer_index,
        ]);

        return redirect()->route('guru.questions')->with('success', 'Question added successfully');
    }

    public function edit($id) {
    $question = Question::findOrFail($id);
    return view('guru.edit_questions', compact('question'));
    }

    public function showQuestions()
    {
        $questions = Question::all();
        return view('guru.questions', compact('questions'));
    }

    public function updateQuestion(Request $request, $id)
    {
        $question = Question::find($id);
        $question->question = $request->input('question');
        $question->answers = ($request->input('answers'));
        $question->correct_answer_index = $request->input('correct_answer_index');
        $question->save();

        return redirect()->route('guru.questions')->with('success', 'Question updated successfully.');
    }

    public function destroyQuestion($id)
    {
        $question = Question::findOrFail($id);
        $question->delete();

        return redirect()->route('guru.questions')->with('success', 'Question deleted successfully');
    }

    public function logout(Request $request)
    {
        Auth::guard('guru')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect()->route('guru.login');
    }
}

