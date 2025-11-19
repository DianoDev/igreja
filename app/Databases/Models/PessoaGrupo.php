<?php

namespace App\Databases\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PessoaGrupo extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'pessoa_grupo';

    protected $fillable = [
        'id_grupo',
        'id_pessoa',
    ];

    /**
     * Relacionamento com Grupo
     */
    public function grupo(): BelongsTo
    {
        return $this->belongsTo(Grupo::class, 'id_grupo');
    }

    /**
     * Relacionamento com Pessoa
     */
    public function pessoa(): BelongsTo
    {
        return $this->belongsTo(Pessoa::class, 'id_pessoa');
    }
}
