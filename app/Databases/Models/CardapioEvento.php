<?php

namespace App\Databases\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CardapioEvento extends Model
{
    use SoftDeletes;

    protected $primaryKey = "id";
    protected $table = 'cardapio_evento';
    public string $sequence = 'cardapio_evento_id_seq';
    protected $guarded = [];
    protected $fillable = [
        'id_evento',
        'id_cardapio',
    ];

    public function evento(): BelongsTo
    {
        return $this->belongsTo(Eventos::class, 'id_evento');
    }

    public function cardapio(): BelongsTo
    {
        return $this->belongsTo(Cardapio::class, 'id_cardapio');
    }
}
