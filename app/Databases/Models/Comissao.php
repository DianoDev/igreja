<?php

namespace App\Databases\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Comissao extends Model
{
    use SoftDeletes;

    protected $primaryKey = "id";
    protected $table = 'comissao';
    public string $sequence = 'comissao_id_seq';
    protected $guarded = [];

    /**
     * Relacionamento com os integrantes da comissão
     */
    public function integrantes(): HasMany
    {
        return $this->hasMany(ComissaoPessoa::class, 'id_comissao');
    }
}
