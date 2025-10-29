<?php

namespace App\Databases\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Cargo extends Model
{
    use SoftDeletes;

    protected $primaryKey = "id";
    protected $table = 'cargo';
    public string $sequence = 'cargo_id_seq';
    protected $guarded = [];
}
