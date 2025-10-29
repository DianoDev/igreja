<?php

namespace App\Databases\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class RegimeInterno extends Model
{
    use SoftDeletes;

    protected $primaryKey = "id";
    protected $table = 'regime_interno';
    public string $sequence = 'regime_interno_id_seq';
    protected $guarded = [];

    public function arquivo(): HasOne
    {
        return $this->hasOne(Arquivo::class, 'chave', 'id')->where('tabela', '=', 'regime_interno')->orderBy('id');
    }
}
