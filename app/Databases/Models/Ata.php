<?php

namespace App\Databases\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Ata extends Model
{
    use SoftDeletes;

    protected $primaryKey = "id";
    protected $table = 'atas';
    public string $sequence = 'atas_id_seq';
    protected $guarded = [];


    public function arquivo(): HasOne
    {
        return $this->HasOne(Arquivo::class, 'chave', 'id')->where('tabela', '=', 'ata')->orderBy('id');
    }
}
