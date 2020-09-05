<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Demande extends Model
{
    protected $fillable = [
        'description_panne', 'date', 'prioite','etat','role',
    ];
}
