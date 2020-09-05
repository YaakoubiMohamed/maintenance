<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
/*
Route::middleware('jwt.auth')->get('users', function(Request $request) {
    return auth()->user();
});
Route::post('user/login', 'APILoginController@login');
*/
Route::group([

    'middleware' => 'api',
], function ($router) {

    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');

});


Route::group(['prefix' => 'v1','namespace' => 'API'], function(){
    Route::apiResource('users', 'UserController');
});

Route::group(['prefix' => 'v1','namespace' => 'API'], function(){
    Route::apiResource('equipements', 'EquipementController');
});

Route::group(['prefix' => 'v1','namespace' => 'API'], function(){
    Route::apiResource('pieces', 'PieceController');
});

Route::group(['prefix' => 'v1','namespace' => 'API'], function(){
    Route::apiResource('rapports', 'RapportController');
});

Route::group(['prefix' => 'v1','namespace' => 'API'], function(){
    Route::apiResource('demandes', 'DemandeController');
});

Route::group(['prefix' => 'v1','namespace' => 'API'], function(){
    Route::apiResource('maintenance_preventives', 'Maintenance_preventiveController');
});

Route::group(['prefix' => 'v1','namespace' => 'API'], function(){
    Route::apiResource('statistique', 'StatistiqueController');
});