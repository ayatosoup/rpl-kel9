<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Soal extends Model
{
    protected $table = 'soal';
    protected $fillable = ['id_paket', 'pertanyaan'];

    public function jawaban()
    {
        return $this->hasMany(Jawaban::class, 'id_soal');
    }

    public function paketSoal()
    {
        return $this->belongsTo(PaketSoal::class, 'id_paket');
    }
}
