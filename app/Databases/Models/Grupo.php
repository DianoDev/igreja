<?php

namespace App\Databases\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Grupo extends Model
{
    use SoftDeletes;

    protected $primaryKey = "id";
    protected $table = 'grupos';
    public string $sequence = 'grupos_id_seq';
    protected $guarded = [];
}
