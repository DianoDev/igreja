<?php

namespace App\Databases\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Arquivo extends Model
{
    use SoftDeletes;

    protected $primaryKey = "id";
    protected $table = 'arquivo';
    public string $sequence = 'arquivo_id_seq';
    protected $guarded = [];
    protected $fillable = [
        'tabela',
        'chave',
        'titulo',
        'descricao',
        'nome',
        'tamanho',
        'content_type',
        'hash',
    ];
}
