<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Maintenance_preventive extends Model
{
    protected $fillable = [
        'date', 'action_a_realiser',
    ];
}
