<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GameController;

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

Route::get('/slideshow', function () {
    return view('slideshow');
})->name('slideshow');

Route::get('/gameplay', function () {
    return view('gameplay');
})->name('gameplay');

Route::get('/stage', function () {
    return view('stage');
})->name('stage');
