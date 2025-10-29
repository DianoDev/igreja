<?php

namespace App\Databases\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Eventos extends Model
{
    use SoftDeletes;

    protected $primaryKey = "id";
    protected $table = 'eventos';
    public string $sequence = 'eventos_id_seq';
    protected $guarded = [];
    protected $fillable = [
        'nome',
        'data',
        'hora',
        'valor_gasto',
        'valor_arrecadado',
    ];

    protected $casts = [
        'valor_gasto' => 'decimal:2',
        'valor_arrecadado' => 'decimal:2',
    ];

    /**
     * Relacionamento com fotos da galeria
     * Retorna todas as fotos associadas ao evento
     */
    public function fotos(): HasMany
    {
        return $this->hasMany(Arquivo::class, 'chave', 'id')
            ->where('tabela', '=', 'eventos')
            ->orderBy('created_at', 'desc');
    }

}
