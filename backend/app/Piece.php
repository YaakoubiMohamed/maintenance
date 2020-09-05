<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Piece extends Model
{
    //
    protected $fillable = [
        'code', 'nom', 'prix','date_entre','date_sortie'
    ];
}
