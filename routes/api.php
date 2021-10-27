<?php

use App\Controllers\API\EmpresaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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
//Route::post('/crear-empresa',[EmpresaController::class,'crear']);
//Route::get('/listar',[EmpresaController::class,'listar']);


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

//Route::post('/crear-empresa', function() {return Crear::all();});

Route::post('crear-empresa', 'App\Http\Controllers\API\EmpresaController@crear');



//Route::get('/EditarEmpresa/{id}', 'App\Http\Controllers\API\EmpresaController@e_empresas')->name('e_empresas');