<?php

namespace App\Databases\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class ComissaoPessoa extends Model
{
    use SoftDeletes;

    protected $table = 'comissao_pessoa';
    protected $guarded = [];

    /**
     * Relacionamento com a comissão
     */
    public function comissao(): BelongsTo
    {
        return $this->belongsTo(Comissao::class, 'id_comissao');
    }

    /**
     * Relacionamento com a pessoa
     */
    public function pessoa(): BelongsTo
    {
        return $this->belongsTo(Pessoa::class, 'id_pessoa');
    }

    /**
     * Relacionamento com o cargo
     */
    public function cargo(): BelongsTo
    {
        return $this->belongsTo(Cargo::class, 'id_cargo');
    }
}
