<?php

use Illuminate\Http\Request;
use App\Models\PaketSoal;

class GameController extends Controller
{
    public function index()
    {
        // Ambil data paket soal beserta soal dan jawaban
        $paketSoal = PaketSoal::with('soal.jawaban')->first();

        // Kirim data ke view
        return view('gameplay', ['paketSoal' => $paketSoal]);
    }
}
