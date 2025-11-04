<?php

namespace App\Databases\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Avisos extends Model
{
    use SoftDeletes;

    protected $primaryKey = "id";
    protected $table = 'avisos';
    public string $sequence = 'avisos_id_seq';
    protected $guarded = [];
}
