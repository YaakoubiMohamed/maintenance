<?php

namespace App\Http\Controllers\API;

use App\Piece;
use App\Equipement;
use App\Demande;
use DB;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;
        class Entree
        {
            public $month;
            public $entree;
        };
        class Sortie
        {
            public $month;
            public $sortie;
        };        

class StatistiqueController extends Controller
{
    public function index()
    {
        $statistique = DB::select("SELECT DISTINCT(date_format(CAST(date as DATE), '%M')) as date,
        eq.nom,COUNT(dm.id_equipement) as nbr 
        FROM `demandes` dm,equipements eq 
        WHERE dm.id_equipement=eq.id GROUP BY date");
        /*
        $statistique = DB::select('SELECT dm.date,eq.nom,COUNT(dm.id_equipement) as nbr
         FROM `demandes` dm,equipements eq 
         WHERE dm.id_equipement=eq.id GROUP BY date');
         */
       
        $foo = new Entree();
        $fo = new Sortie();
        $en = (array) $foo;
        $sor = (array) $fo;
        $entrees= DB::select("
        SELECT DISTINCT(date_format(CAST(date_entre as DATE), '%M')) as entree,
         nom,id,count(date_entre)as nbrentre 
         FROM `pieces` 
         GROUP BY date_format(CAST(date_entre as DATE), '%M') ");
         $sorties= DB::select("
        SELECT DISTINCT(date_format(CAST(date_sortie as DATE), '%M')) as sortie,
         nom, COUNT(date_sortie) as nbrsortie
          FROM `pieces` 
          GROUP BY date_format(CAST(date_sortie as DATE), '%M')");
         $months=['January', 'February', 'March', 'April', 'May', 'June', 'July',
         'August', 'September', 'October', 'November', 'December'];
         //dd($entrees);
         $i=1;
         //$ens = $entrees['entree'];
         //dd($ens);
         $found = false;
/*
        foreach ($months as $key_a => $val_a) {
            $found = false;
            foreach ($entrees as $key_b => $val_b) {
            if ($val_a == $val_b) {
                    echo '<br>'. $val_a .': check ';     
                    $found = true;
                    $val= $val_a;
                }     
            }
            if (!$found)
                echo '<br>'. $val_a .': chok ';
                $val= 0;
        }
        dd($val);
        */
         foreach($months as $month)
         {
             $tf=false;
            foreach($entrees as $entree)            
            {
                if($month == $entree->entree)
                {
                    $tf=true;
                    $cc= $entree->nbrentre;
                }                
            }
            if($tf)
            {
                $en[$i]= $cc;
            }
            if(!$tf)
            {
                    $en[$i] = 0;
            }
            $i++;
         }
         $j=1;
         foreach($months as $month)
         {
            $tf=false;
            foreach($sorties as $sortie)
            {
                if($month == $sortie->sortie)
                {
                    if($month == $sortie->sortie)
                    {
                        $tf=true;
                        $cc= $sortie->nbrsortie;
                    } 
                }                
            }
            if($tf)
            {
                $sor[$j]= $cc;
            }
            if(!$tf)
            {
                    $sor[$j] = 0;
            }
             $j++;
         }
         
         //$resultat=array_combine($sorties,$entrees);
         //dd($resultat);
        $statistique_pieces = DB::select("
        SELECT date_format(CAST(date_entre as DATE), '%M') as entree,
        date_format(CAST(date_sortie as DATE), '%M') as sortie,
        nom,count(date_entre)as nbrentre, COUNT(date_sortie) as nbrsortie FROM `pieces` 
        GROUP BY date_format(CAST(date_entre as DATE), '%M'),date_format(CAST(date_sortie as DATE), '%M')");
        return response()->json([
            'error' => false,
            'statistique'  => $statistique,
            'entrees'  => $en,
            'sorties'  => $sor,
        ], 200);
    }

    public function store(Request $request)
    {
        $validation = Validator::make($request->all(),[ 
            'code' => 'required',
            'nom' => 'required',
            'prix' => 'required',
            'date_entre' => 'required',
            'date_sortie' => 'required',

        ]);

        if($validation->fails()){
            return response()->json([
                'error' => true,
                'messages'  => $validation->errors(),
            ], 200);
        }
        else
        {
            $piece = new Piece;
            $piece->code = $request->input('code');
            $piece->nom = $request->input('nom');
            $piece->prix = $request->input('prix');
            $piece->date_entre = $request->input('date_entre');
            $piece->date_sortie = $request->input('date_sortie');

            $piece->save();
    
            return response()->json([
                'error' => false,
                'piece'  => $piece,
            ], 200);
        }
    }

    public function show($id)
    {
        $piece = Piece::find($id);

        if(is_null($piece)){
            return response()->json([
                'error' => true,
                'message'  => "Record with id # $id not found",
            ], 404);
        }

        return response()->json([
            'error' => false,
            'piece'  => $piece,
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $this->validate($request,[ 
            'code' => 'required',
            'nom' => 'required',
            'prix' => 'required',
            'date_entre' => 'required',
            'date_sortie' => 'required',
        ]);

            $piece = Piece::find($id);
            $piece->code = $request->input('code');
            $piece->nom = $request->input('nom');
            $piece->prix = $request->input('prix');
            $piece->date_entre = $request->input('date_entre');
            $piece->date_sortie = $request->input('date_sortie');

            $piece->save();
    
            return response()->json([
                'error' => false,
                'piece'  => $piece,
            ], 200);
        
    }

    public function destroy($id)
    {
        $piece = Piece::find($id);

        if(is_null($piece)){
            return response()->json([
                'error' => true,
                'message'  => "Record with id # $id not found",
            ], 404);
        }

        $piece->delete();
    
        return response()->json([
            'error' => false,
            'message'  => "Piece record successfully deleted id # $id",
        ], 200);
    }
}
