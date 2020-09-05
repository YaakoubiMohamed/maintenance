<?php

namespace App\Http\Controllers\API;

use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;




use Illuminate\Support\Facades\Validator;












use Illuminate\Database\Eloquent\ModelNotFoundException;

class UserController extends Controller
{
    public function index()
    {
        return response()->json([
            'error' => false,
            'users'  => User::all(),
        ], 200);
    }

    public function store(Request $request)
    {
        $validation = Validator::make($request->all(),[ 
            'nom' => 'required',
            'prenom' => 'required',
            'adresse' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required',
            'type' => 'required',

        ]);

        if($validation->fails()){
            return response()->json([
                'error' => true,
                'messages'  => $validation->errors(),
            ], 200);
        }
        else
        {
            $user = new User;
            $user->nom = $request->input('nom');
            $user->prenom = $request->input('prenom');
            $user->adresse = $request->input('adresse');
            $user->email = $request->input('email');
            $user->password = $request->input('password');
            $user->type = $request->input('type');

            $user->save();
    
            return response()->json([
                'error' => false,
                'user'  => $user,
            ], 200);
        }
    }

    public function show($id)
    {
        $user = User::find($id);

        if(is_null($user)){
            return response()->json([
                'error' => true,
                'message'  => "Record with id # $id not found",
            ], 404);
        }

        return response()->json([
            'error' => false,
            'user'  => $user,
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $this->validate($request,[ 
            'nom' => 'required',
            'prenom' => 'required',
            'adresse' => 'required',
            'email' => 'required|email',
            'type' => 'required',
        ]);

            $user = User::find($id);
            $user->nom = $request->input('nom');
            $user->prenom = $request->input('prenom');
            $user->adresse = $request->input('adresse');
            $user->email = $request->input('email');
            $user->type = $request->input('type');

            $user->save();
    
            return response()->json([
                'error' => false,
                'user'  => $user,
            ], 200);
        
    }

    public function destroy($id)
    {
        $user = User::find($id);

        if(is_null($user)){
            return response()->json([
                'error' => true,
                'message'  => "Record with id # $id not found",
            ], 404);
        }

        $user->delete();
    
        return response()->json([
            'error' => false,
            'message'  => "User record successfully deleted id # $id",
        ], 200);
    }
}