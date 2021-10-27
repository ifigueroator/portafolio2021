<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//Route::get('/', function () {return view('welcome');});

Route::get('/', function () {return view('../auth/login');});

Auth::routes();

Route::get('/dashboard', [App\Http\Controllers\HomeController::class, 'index'])->name('dashboard');
Route::get('empresas', 'App\Http\Controllers\EmpresaController@v_empresas')->name('empresas');
Route::get('CrearEmpresa', 'App\Http\Controllers\EmpresaController@c_empresas')->name('c_empresas');
Route::get('EditarEmpresa/{id}', 'App\Http\Controllers\EmpresaController@e_empresas')->name('e_empresas');
Route::put('editar-empresa/{id}', 'App\Http\Controllers\EmpresaController@ed_empresas')->name('ed_empresas');

Route::delete('eliminar-empresa/{id}', 'App\Http\Controllers\EmpresaController@el_empresas')->name('el_empresas');

Route::post('crear-empresa', 'App\Http\Controllers\EmpresaController@crear');

Route::get('listar-empresa', 'App\Http\Controllers\EmpresaController@listar');
Route::get('editar-empresa/{id}', 'App\Http\Controllers\EmpresaController@editar');
Route::get('ciudad','App\Http\Controllers\EmpresaController@ciudad');
Route::get('estadoempresa','App\Http\Controllers\EmpresaController@estadoempresa');


Route::get('ventas', 'App\Http\Controllers\VentaController@v_ventas')->name('ventas');
Route::get('creaventa/{id}', 'App\Http\Controllers\VentaController@crea_ventas')->name('creaventa');

Route::post('crear-venta', 'App\Http\Controllers\VentaController@crearventa');

Route::get('listar-planificador', 'App\Http\Controllers\VentaController@listar');

Route::get('listar-traking', 'App\Http\Controllers\VentaController@traking');

Route::get('user','App\Http\Controllers\EmpresaController@user');

Route::get('canalventa','App\Http\Controllers\VentaController@canalventa');
Route::get('tipopago','App\Http\Controllers\VentaController@tipopago');
Route::get('tipoventa','App\Http\Controllers\VentaController@tipoventa');

Route::get('datosov/{id}', 'App\Http\Controllers\VentaController@datosov');



