<?php

namespace App\Databases\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PessoaGrupoEvento extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'pessoas_grupo_evento';

    protected $fillable = [
        'id_grupo_evento',
        'id_pessoa',
    ];

    /**
     * Relacionamento com GrupoEvento
     */
    public function grupoEvento(): BelongsTo
    {
        return $this->belongsTo(GrupoEvento::class, 'id_grupo_evento');
    }

    /**
     * Relacionamento com Pessoa
     */
    public function pessoa(): BelongsTo
    {
        return $this->belongsTo(Pessoa::class, 'id_pessoa');
    }
}
