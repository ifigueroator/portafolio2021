<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Empresa;
use App\Models\Comuna;
use App\Models\Ciudad;
use App\Models\User;
use App\Models\Estadoempresa;

use Illuminate\Support\Facades\Validator;

class EmpresaController extends Controller
{

public function __construct()
  {
      $this->middleware('auth');
  }

    public function v_empresas()
    {
  //  $request->user()->authorizeRoles(['user','admin']);  
      return view('empresas');
    }


    public function listar()
    {
    // $empresa = Empresa::all();
    $ciudad=Ciudad::all();
    $estadoempresa=Estadoempresa::all();
   $empresa = Empresa::select(
      'empresas.id',
      'empresas.nombre',
      'empresas.rut',
      'empresas.direccion',
      'empresas.ciudads_id', 
      'empresas.estadoempresas_id',  
      'empresas.telefono',
      'empresas.email',       
      'empresas.usuariocreador',     
      'ciudads.ciudad',     
      'estadoempresas.estadoempresa',
    )
    ->join('ciudads','empresas.ciudads_id','=','ciudads.id')
    ->join('estadoempresas','empresas.estadoempresas_id','=','estadoempresas.id') 
    
    
    ->get();
      return response()->json([
       'status'=>200,
       'empresa'=>$empresa,
      ]);
    }

    public function c_empresas()
    {
      return view('CrearEmpresa');
    }

    public function crear(Request $request)
    {
        $validator = Validator::make($request->all(),[
        'nombre'=>'required|max:200',
        'rut'=>'required|min:9|max:9|unique:empresas',
        'direccion'=>'required|max:200',
        'ciudads_id'=>'required|max:200',  
        'estadoempresas_id'=>'required|max:50',   
        'telefono'=>'required|max:14',
        'email'=>'required|email|max:50',      
      'usuariocreador'=>'required|max:100',

        ]);

        if($validator->fails())
        {
        return response()->json([
        'validate_err'=>$validator->messages(),
        ]);
        }
        else
        {
        $empresa = new Empresa;
        $empresa->nombre=$request->input('nombre');
        $empresa->rut=$request->input('rut');
        $empresa->direccion=$request->input('direccion');
        $empresa->ciudads_id=$request->input('ciudads_id');
        $empresa->estadoempresas_id=$request->input('estadoempresas_id');
        $empresa->telefono=$request->input('telefono');
        $empresa->email=$request->input('email');       
        $empresa->usuariocreador=$request->input('usuariocreador');

      //  $empresa->usuarioCreador=$request->input(auth()->user()->name);
        $empresa->save();
       return response()->json([
            'status'=>200,
            'message'=>'Empresa Creada',

        ]);    
        
        }
    }
  

   

 public function e_empresas($id)
    {
      $empresa=Empresa::find($id);
      if($empresa)
      {
        return response()->json([
          'status'=>200,
          'empresa'=>$empresa, 
        ]);

      }
      else
      {
        return response()->json([
          'status'=>404,
          'empresa'=>'Id no encontrado', 
        ]);

      }
          
    }

    public function ed_empresas(Request $request,$id)
    {
      
      $validator = Validator::make($request->all(),[
        'nombre'=>'required|max:200',
      //  'rut'=>'required|min:9|max:9|unique:empresas',
        'direccion'=>'required|max:200',
        'ciudads_id'=>'required|max:200',
        'estadoempresas_id'=>'required|max:50',
        'telefono'=>'required|max:14',
        'email'=>'required|max:50',    
        'usuariocreador'=>'required|max:100',
        ]);

        if($validator->fails())
        {
        return response()->json([
        'validate_err'=>$validator->messages(),
        ]);
        }
        else
        {
        $empresa = Empresa::find($id);
        if($empresa)
        {
        $empresa->nombre=$request->input('nombre');
        $empresa->rut=$request->input('rut');
        $empresa->direccion=$request->input('direccion');
        $empresa->ciudads_id=$request->input('ciudads_id');
        $empresa->estadoempresas_id=$request->input('estadoempresas_id');
        $empresa->telefono=$request->input('telefono');
        $empresa->email=$request->input('email');
       
        $empresa->usuariocreador=$request->input('usuariocreador');
        $empresa->update();

       return response()->json([
            'status'=>200,
            'message'=>'Empresa modificada',
        ]);    
      }
      else
      {
        return response()->json([
          'status'=>404,
          'empresa'=>'Id no encontrado', 
        ]);

      }
       
      }     
    }

    public function el_empresas($id)
    {
      $empresa = Empresa::find($id);
      $empresa ->delete();
      return response()->json([
        'status'=>200,
        'message'=>'Empresa Eliminada',

      ]);  


    }

    public function ciudad()
    {
      $ciudad=Ciudad::select('id','ciudad')->get();
      return  $ciudad;
     
    }

     public function estadoempresa()
    {
      $estadoempresa=Estadoempresa::select('id','estadoempresa')->get();
      return  $estadoempresa;
     
    }


    public function user()
    {
      $user=User::select('id','name')

      ->where('name',auth()->user()->name)
      
      ->get();
      return  $user;
     
    }

    
}
