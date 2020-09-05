<?php

namespace App\Http\Controllers\API;

use App\Equipement;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class EquipementController extends Controller
{
    public function index()
    {
        return response()->json([
            'error' => false,
            'equipements'  => Equipement::all(),
        ], 200);
    }

    public function store(Request $request)
    {
        $validation = Validator::make($request->all(),[ 
            'nom' => 'required',
            'code' => 'required',
            'etat' => 'required',
            'date_acquisition' => 'required',
            'date_mise_en_service' => 'required',
            

        ]);

        if($validation->fails()){
            return response()->json([
                'error' => true,
                'messages'  => $validation->errors(),
            ], 200);
        }
        else
        {
            $equipement = new Equipement;
            $equipement->nom = $request->input('nom');
            $equipement->code = $request->input('code');
            $equipement->etat = $request->input('etat');
            $equipement->date_acquisition = $request->input('date_acquisition');
            $equipement->date_mise_en_service = $request->input('date_mise_en_service');

            $equipement->save();
    
            return response()->json([
                'error' => false,
                'equipement'  => $equipement,
            ], 200);
        }
    }

    public function show($id)
    {
        $equipement = Equipement::find($id);

        if(is_null($equipement)){
            return response()->json([
                'error' => true,
                'message'  => "Equipement with id # $id not found",
            ], 404);
        }

        return response()->json([
            'error' => false,
            'equipement'  => $equipement,
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $validation = Validator::make($request->all(),[ 
            'nom' => 'required',
            'code' => 'required',
            'etat' => 'required',
            'date_acquisition' => 'required',
            'date_mise_en_service' => 'required',
            
        ]);

        if($validation->fails()){
            return response()->json([
                'error' => true,
                'messages'  => $validation->errors(),
            ], 200);
        }
        else
        {
            $equipement = Equipement::find($id);
            $equipement->nom = $request->input('nom');
            $equipement->code = $request->input('code');
            $equipement->etat = $request->input('etat');
            $equipement->date_acquisition = $request->input('date_acquisition');
            $equipement->date_mise_en_service = $request->input('date_mise_en_service');
            
            $equipement->save();
    
            return response()->json([
                'error' => false,
                'equipement'  => $equipement,
            ], 200);
        }
    }

    public function destroy($id)
    {
        $equipement = Equipement::find($id);

        if(is_null($equipement)){
            return response()->json([
                'error' => true,
                'message'  => "Equipement with id # $id not found",
            ], 404);
        }

        $equipement->delete();
    
        return response()->json([
            'error' => false,
            'message'  => "Equipement record successfully deleted id # $id",
        ], 200);
    }
}