<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Rapport extends Model
{
    protected $fillable = [
        'date', 'date_fin_intervention', 'action','description',
    ];
}
