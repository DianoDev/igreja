<?php

namespace App\Databases\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DoacaoEvento extends Model
{
    use SoftDeletes;

    protected $primaryKey = "id";
    protected $table = 'doacao_evento';
    public string $sequence = 'doacao_evento_id_seq';
    protected $guarded = [];
    protected $fillable = [
        'id_pessoa',
        'id_evento',
        'valor',
    ];

    public function evento(): BelongsTo
    {
        return $this->belongsTo(Eventos::class, 'id_evento');
    }

    public function pessoa(): BelongsTo
    {
        return $this->belongsTo(Pessoa::class, 'id_pessoa');
    }
}
