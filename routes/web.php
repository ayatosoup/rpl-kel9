<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GameController;
use App\Http\Controllers\GuruController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/game', function () {
    return view('game');
})->name('game');

Route::get('/load', function () {
    return view('load');
})->name('load');

Route::get('/slideshow', function () {
    return view('slideshow');
})->name('slideshow');

Route::get('/gameplay', function () {
    return view('gameplay');
})->name('gameplay');

Route::get('/stage', function () {
    return view('stage');
})->name('stage');
Route::get('/guru/login', [GuruController::class, 'showLoginForm'])->name('guru.login');
Route::post('/guru/login', [GuruController::class, 'login'])->name('guru.login.post');
Route::middleware(['auth:guru'])->group(function () {
    Route::get('/guru/questions', [GuruController::class, 'showQuestions'])->name('guru.questions');
    Route::get('/guru/questions/{id}/edit', [GuruController::class, 'edit'])->name('guru.questions.edit');
    Route::post('/guru/questions/{id}', [GuruController::class, 'updateQuestion'])->name('guru.questions.update');
    Route::delete('/guru/questions/{id}', [GuruController::class, 'destroyQuestion'])->name('guru.questions.destroy');
    Route::get('/guru/questions/create', [GuruController::class, 'createQuestion'])->name('guru.questions.create');
    Route::post('/guru/questions', [GuruController::class, 'storeQuestion'])->name('guru.questions.store');
    Route::post('/guru/logout', [GuruController::class, 'logout'])->name('guru.logout');
});

