<?php

namespace App\Http\Controllers\API;

use App\Rapport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class RapportController extends Controller
{
    public function index()
    {
        $rapports=DB::table('rapports')
        ->join('equipements','rapports.equipement_id','=','equipements.id')
        ->join('users','rapports.user_id','=','users.id')
        ->select('rapports.*','users.nom','users.prenom')
        ->get();

        return response()->json([
            'error' => false,
            'rapports'  => $rapports ,
        ], 200);
    }

    public function store(Request $request)
    {
        $validation = Validator::make($request->all(),[
            'date' => 'required',
            'date_fin_intervention' => 'required',
            'action' => 'required',
            'description' => 'required',
            'equipement_id' => 'required',
            'user_id' => 'required',


        ]);

        if($validation->fails()){
            return response()->json([
                'error' => true,
                'messages'  => $validation->errors(),
            ], 200);
        }
        else
        {
            $rapports = new Rapport;
            $rapports->date = $request->input('date');
            $rapports->date_fin_intervention = $request->input('date_fin_intervention');
            $rapports->action = $request->input('action');
            $rapports->description = $request->input('description');
            $rapports->equipement_id = $request->input('equipement_id');
            $rapports->user_id = $request->input('user_id');

            $rapports->save();

            return response()->json([
                'error' => false,
                'rapports'  => $rapports,
            ], 200);
        }
    }

    public function show($id)
    {
        $rapports = Rapport::find($id);

        if(is_null($rapports)){
            return response()->json([
                'error' => true,
                'message'  => "Record with id # $id not found",
            ], 404);
        }

        return response()->json([
            'error' => false,
            'rapports'  => $rapports,
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $validation = Validator::make($request->all(),[            
            'action' => 'required',
            'date_fin_intervention' => 'required',

        ]);

        if($validation->fails()){
            return response()->json([
                'error' => true,
                'messages'  => $validation->errors(),
            ], 200);
        }
        else
        {
            $rapports = Rapport::find($id);
            $rapports->action = $request->input('action');
            $rapports->date_fin_intervention = $request->input('date_fin_intervention');

            $rapports->save();

            return response()->json([
                'error' => false,
                'rapports'  => $rapports,
            ], 200);
        }
    }

    public function destroy($id)
    {
        $rapports = Rapport::find($id);

        if(is_null($rapports)){
            return response()->json([
                'error' => true,
                'message'  => "Record with id # $id not found",
            ], 404);
        }

        $rapports->delete();

        return response()->json([
            'error' => false,
            'message'  => "Rapport record successfully deleted id # $id",
        ], 200);
    }
}
