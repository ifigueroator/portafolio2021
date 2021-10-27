<?php

namespace App\Http\Controllers\API;
use Illuminate\Support\Facades\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Empresa;

class EmpresaController extends Controller
{
   /* public function __construct()
    {
        $this->middleware('auth');
    }*/

    public function listar()
    {
        $empresa=Empresa::all();
        return response()->json([
            'status'=>200,
            'empresas'=>$empresa

        ]);        

    }


    public function crear(Request $request)
    {
        $empresa = new Empresa;
        $empresa->nombre=$request->input('nombre');
        $empresa->rut=$request->input('rut');
        $empresa->direccion=$request->input('direccion');
        $empresa->ciudad=$request->input('ciudad');
        $empresa->ejecutivo=$request->input('ejecutivo');
        $empresa->estado=$request->input('estado');
        $empresa->save();

       return response()->json([
            'status'=>200,
            'message'=>'Empresa Creada',

        ]);        
    }


    public function e_empresas($id)
    {
      $empresa=Empresa::find($id);

      return response()->json([
        'status'=>200,
        'empresa'=>$empresa,
       ]);

    }




}
