<?php

namespace App\Databases\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Estatuto extends Model
{
    use SoftDeletes;

    protected $primaryKey = "id";
    protected $table = 'estatuto';
    public string $sequence = 'estatuto_id_seq';
    protected $guarded = [];

    public function arquivo(): HasOne
    {
        return $this->hasOne(Arquivo::class, 'chave', 'id')->where('tabela', '=', 'estatuto')->orderBy('id');
    }
}
