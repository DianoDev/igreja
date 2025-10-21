<?php

namespace App\Databases\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Ingrediente extends Model
{
    use SoftDeletes;

    protected $primaryKey = "id";
    protected $table = 'ingredientes';
    public string $sequence = 'ingrediente_id_seq';
    protected $guarded = [];
}
