<?php

namespace App\Http\Controllers\API;

use App\Demande;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class DemandeController extends Controller
{
    public function index()
    {
        $demande=DB::table('demandes')
        ->join('users','demandes.user_id','=','users.id')
        ->select('demandes.*','users.id AS uid','users.nom','users.prenom')
        ->get();

        return response()->json([
            'error' => false,
            'demandes'  => $demande,
        ], 200);
    }

    public function store(Request $request)
    {
        $validation = Validator::make($request->all(),[ 
            'description_panne' => 'required',
            'date' => 'required',
            'priorite' => 'required',
            'user_id' => 'required',
            'role' => 'required' ,
            'id_equipement' => 'required' ,

            

        ]);

        if($validation->fails()){
            return response()->json([
                'error' => true,
                'messages'  => $validation->errors(),
            ], 200);
        }
        else
        {
            $demande = new Demande;
            $demande->description_panne = $request->input('description_panne');
            $demande->date = $request->input('date');
            $demande->priorite = $request->input('priorite');
            $demande->user_id = $request->input('user_id');
            $demande->role = $request->input('role');
            $demande->id_equipement = $request->input('id_equipement');

            

            $demande->save();
    
            return response()->json([
                'error' => false,
                'demande'  => $demande,
            ], 200);
        }
    }

    public function show($id)
    {
        $demande = Demande::find($id);

        if(is_null($demande)){
            return response()->json([
                'error' => true,
                'message'  => "Demande with id # $id not found",
            ], 404);
        }

        return response()->json([
            'error' => false,
            'demande'  => $demande,
        ], 200);
    }

  

    public function update(Request $request, $id)
    {
        $validation = Validator::make($request->all(),[ 
            'description_panne' => '',
            'date' => '',
            'priorite' => '',
            'etat' => '',
            'user_id' => '',
            'role' => '' ,
            
        ]);

        if($validation->fails()){
            return response()->json([
                'error' => true,
                'messages'  => $validation->errors(),
            ], 200);
        }
        else
        {
            $demande = Demande::find($id);
            $demande->description_panne = $request->input('description_panne');
            $demande->date = $request->input('date');
            $demande->priorite = $request->input('priorite');
            $demande->etat = $request->input('etat');
            $demande->user_id = $request->input('user_id');
            $demande->role = $request->input('role');
            
            $demande->save();
    
            return response()->json([
                'error' => false,
                'demande'  => $demande,
            ], 200);
        }
    }

    public function destroy($id)
    {
        $demande = Demande::find($id);

        if(is_null($demande)){
            return response()->json([
                'error' => true,
                'message'  => "Demande with id # $id not found",
            ], 404);
        }

        $demande->delete();
    
        return response()->json([
            'error' => false,
            'message'  => "Demande record successfully deleted id # $id",
        ], 200);
    }
}