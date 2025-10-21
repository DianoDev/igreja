<?php

namespace App\Databases\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Eventos extends Model
{
    use SoftDeletes;

    protected $primaryKey = "id";
    protected $table = 'eventos';
    public string $sequence = 'eventos_id_seq';
    protected $guarded = [];
}
