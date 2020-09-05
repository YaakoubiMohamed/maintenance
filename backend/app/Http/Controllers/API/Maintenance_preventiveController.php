<?php

namespace App\Http\Controllers\API;

use App\Maintenance_preventive;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class Maintenance_preventiveController extends Controller
{
    public function index()
    {
        $maintenance_preventives=DB::table('maintenance_preventives')
        ->join('equipements','maintenance_preventives.equipement_id','=','equipements.id')
        ->join('users','maintenance_preventives.id_technicien','=','users.id')
        ->select('maintenance_preventives.*')
        ->get();

        return response()->json([
            'error' => false,
            'maintenance_preventives'  => $maintenance_preventives,
        ], 200);
    }

    public function store(Request $request)
    {
        $validation = Validator::make($request->all(),[ 

            'date' => 'required',
            'action' => 'required',
            'equipement_id' => 'required',
            'id_technicien' => 'required'
            

        ]);

        if($validation->fails()){
            return response()->json([
                'error' => true,
                'messages'  => $validation->errors(),
            ], 200);
        }
        else
        {
            $maintenance_preventives = new Maintenance_preventive;
            $maintenance_preventives->date = $request->input('date');
            $maintenance_preventives->action = $request->input('action');
            $maintenance_preventives->equipement_id = $request->input('equipement_id');
            $maintenance_preventives->id_technicien = $request->input('id_technicien');
            $maintenance_preventives->save();
    
            return response()->json([
                'error' => false,
                'maintenance_preventives'  => $maintenance_preventives,
            ], 200);
        }
    }

    public function show($id)
    {
        $maintenance_preventives = Maintenance_preventive::find($id);

        if(is_null($maintenance_preventives)){
            return response()->json([
                'error' => true,
                'message'  => "maintenance preventive with id # $id not found",
            ], 404);
        }

        return response()->json([
            'error' => false,
            'maintenance_preventives'  => $maintenance_preventives,
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $validation = Validator::make($request->all(),[ 
            'date' => 'required',
            'action' => 'required',
            
        ]);

        if($validation->fails()){
            return response()->json([
                'error' => true,
                'messages'  => $validation->errors(),
            ], 200);
        }
        else
        {
            $maintenance_preventives = Maintenance_preventive::find($id);
            $maintenance_preventives->date = $request->input('date');
            $maintenance_preventives->action = $request->input('action');
            $maintenance_preventives->equipement_id = $request->input('equipement_id');
            $maintenance_preventives->id_technicien = $request->input('id_technicien');            
            $maintenance_preventives->save();
    
            return response()->json([
                'error' => false,
                'maintenance_preventives'  => $maintenance_preventives,
            ], 200);
        }
    }

    public function destroy($id)
    {
        $maintenance_preventives = Maintenance_preventive::find($id);

        if(is_null($maintenance_preventives)){
            return response()->json([
                'error' => true,
                'message'  => "maintenance preventive with id # $id not found",
            ], 404);
        }

        $maintenance_preventives->delete();
    
        return response()->json([
            'error' => false,
            'message'  => "Maintenance_preventive record successfully deleted id # $id",
        ], 200);
    }
}