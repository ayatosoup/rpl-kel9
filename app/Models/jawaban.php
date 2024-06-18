<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Jawaban extends Model
{
    protected $table = 'jawaban';
    protected $fillable = ['id_soal', 'jawaban', 'benar'];

    public function soal()
    {
        return $this->belongsTo(Soal::class, 'id_soal');
    }
}
