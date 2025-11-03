<?php

namespace App\Databases\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Comissao extends Model
{
    use SoftDeletes;

    protected $primaryKey = "id";
    protected $table = 'comissao';
    public string $sequence = 'comissao_id_seq';
    protected $guarded = [];
}
