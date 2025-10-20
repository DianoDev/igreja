<?php

namespace App\Databases\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Pessoa extends Model
{
    use SoftDeletes;

    protected $primaryKey = "id";
    protected $table = 'pessoas';
    public string $sequence = 'pessoas_id_seq';
    protected $guarded = [];
    protected $fillable = [
        'nome',
        'cpf',
        'telefone',
    ];
}
