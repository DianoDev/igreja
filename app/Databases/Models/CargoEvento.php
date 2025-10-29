<?php

namespace App\Databases\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CargoEvento extends Model
{
    use SoftDeletes;

    protected $primaryKey = "id";
    protected $table = 'cargo_evento';
    public string $sequence = 'cargo_evento_id_seq';
    protected $guarded = [];
    protected $fillable = [
        'id_evento',
        'id_pessoa',
        'id_cargo',
    ];

    public function evento(): BelongsTo
    {
        return $this->belongsTo(Eventos::class, 'id_evento');
    }

    public function pessoa(): BelongsTo
    {
        return $this->belongsTo(Pessoa::class, 'id_pessoa');
    }

    public function cargo(): BelongsTo
    {
        return $this->belongsTo(Cargo::class, 'id_cargo');
    }
}
