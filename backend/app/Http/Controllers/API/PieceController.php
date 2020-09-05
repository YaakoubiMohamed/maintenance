<?php

namespace App\Http\Controllers\API;

use App\Piece;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class PieceController extends Controller
{
    public function index()
    {
        return response()->json([
            'error' => false,
            'pieces'  => Piece::all(),
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
