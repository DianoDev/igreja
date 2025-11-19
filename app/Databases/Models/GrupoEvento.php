<?php

namespace App\Databases\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class GrupoEvento extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'grupo_evento';

    protected $fillable = [
        'id_evento',
        'nome',
    ];

    /**
     * Relacionamento com Evento
     */
    public function evento(): BelongsTo
    {
        return $this->belongsTo(Eventos::class, 'id_evento');
    }

    /**
     * Relacionamento com Pessoas do Grupo
     */
    public function pessoas(): HasMany
    {
        return $this->hasMany(PessoaGrupoEvento::class, 'id_grupo_evento');
    }
}
