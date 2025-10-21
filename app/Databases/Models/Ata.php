<?php

namespace App\Databases\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Ata extends Model
{
    use SoftDeletes;

    protected $primaryKey = "id";
    protected $table = 'atas';
    public string $sequence = 'atas_id_seq';
    protected $guarded = [];
}
