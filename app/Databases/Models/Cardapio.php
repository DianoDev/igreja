<?php

namespace App\Databases\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Cardapio extends Model
{
    use SoftDeletes;

    protected $primaryKey = "id";
    protected $table = 'cardapio';
    public string $sequence = 'cardapio_id_seq';
    protected $guarded = [];


    public function ingredientes(): HasMany
    {
        return $this->hasMany(Ingrediente::class, 'id_cardapio');
    }
}
