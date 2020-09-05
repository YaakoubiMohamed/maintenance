<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Equipement extends Model
{
    protected $fillable = [
        'nom' , 'code', 'etat', 'date_acquisation','date_mise_en_service',
    ];
}
