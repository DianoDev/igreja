<?php

namespace App\Databases\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Estatuto extends Model
{
    use SoftDeletes;

    protected $primaryKey = "id";
    protected $table = 'estatuto';
    public string $sequence = 'estatuto_id_seq';
    protected $guarded = [];
}
