<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaketSoal extends Model
{
    protected $table = 'paket_soal';
    protected $fillable = ['nama_paket', 'deskripsi'];

    public function soal()
    {
        return $this->hasMany(Soal::class, 'id_paket');
    }
}
