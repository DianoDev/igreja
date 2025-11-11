<?php

namespace App\Databases\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CardapioEvento extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'cardapio_evento';

    protected $fillable = [
        'id_evento',
        'nome',
        'descricao',
        'valor_total',
        'id_pessoa',
    ];

    protected $casts = [
        'valor_total' => 'decimal:2',
    ];

    /**
     * Relacionamento com Evento
     */
    public function evento(): BelongsTo
    {
        return $this->belongsTo(Eventos::class, 'id_evento');
    }


    /**
     * Relacionamento com Pessoa
     */
    public function pessoa(): BelongsTo
    {
        return $this->belongsTo(Pessoa::class, 'id_pessoa');
    }

    /**
     * Relacionamento com Ingredientes
     */
    public function ingredientes(): HasMany
    {
        return $this->hasMany(IngredienteCardapioEvento::class, 'id_cardapio_evento');
    }
}
