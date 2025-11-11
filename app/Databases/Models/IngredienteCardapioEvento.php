<?php

namespace App\Databases\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class IngredienteCardapioEvento extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'ingredientes_cardapio_evento';

    protected $fillable = [
        'id_cardapio_evento',
        'id_ingrediente_original',
        'nome',
        'quantidade',
        'unidade_medida',
        'valor_unitario',
        'valor_total',
    ];

    protected $casts = [
        'quantidade' => 'decimal:2',
        'valor_unitario' => 'decimal:2',
        'valor_total' => 'decimal:2',
    ];

    /**
     * Relacionamento com CardapioEvento
     */
    public function cardapioEvento(): BelongsTo
    {
        return $this->belongsTo(CardapioEvento::class, 'id_cardapio_evento');
    }

    /**
     * Relacionamento com Ingrediente (modelo original)
     */
    public function ingredienteOriginal(): BelongsTo
    {
        return $this->belongsTo(Ingrediente::class, 'id_ingrediente_original');
    }
}
